/**
 * @overview
 *
 * Implements link tracking via iStats.  Code imported from Barlesque v3 - barlesque.js
 * @exports istats-1
 *
 * @reviewed 07 June 2011
 *
 * @author Yavor Atanasov <yavor.atanasov@bbc.co.uk>
 * @author Michael Mathews <michael.mathews@bbc.co.uk>
 * @author Ian Pouncey <ian.pouncey@bbc.co.uk>
 * @author Nikos Tsouknidas <nikos.tsouknidas@bbc.co.uk>
 */

/**
    @namespace istats
    @description The value provided by the istats-1 module.
    @example
require('istats-1', function(istats) {
    // use istats here
});
*/
define('istats-1', [], function() {

	var exports = {},     // use name "exports" to make intention clear and also JSDoc work better
        istats = exports, // alias for internal use

        /**
         @name istats~trackingServiceUrl
         @private
         @type {string}
         @description The URL to the tracking service. This will be different
            on each of the runtime server environments we develop and test on.
        */
        trackingServiceUrl,

        /**
         @name istats~trackingCookie
         @private
         @description The name of the cookie used for internal tracking.
         @type {string}
        */
        trackingCookie = 'sa_labels',

        /**
         @name istats~notrackClass
         @private
         @description The class used to disable tracking on a link.
         @type {string}
        */
        notrackClass = 'istats-notrack',

        /**
         @name istats~instanceId
         @private
         @type {string}
         @description A unique module instance identifier. Used as the expando
            name we add to the DOM elements we attach events to.
        */
        instanceId = '_istats_' + Math.random(),

        /**
         @name istats~validLinkTypes
         @private
         @type {Object.<string>}
         @description A set of the valid link types to be tracked according to the iStats specification.
        */
        validLinkTypes = {internal:true, external:true, download:true, clickthrough:true, promoimage:true},

        /**
         @name istats~inspectTracking
         @private
         @description Contains a string for the type of tracking being done,
            and a string with the actual tracking Url.
         */
        inspectTracking = {type:'', url:''},

        /**
         @name istats~trackTimeout
         @private
         @type {number}
         @description The number of milliseconds to wait for istats to return
            its response before redirecting the user. Average time for an iStats
            tracking response according to spec is 200 ms
        */
        trackTimeout = 2000, // wait 2 seconds before giving up on iStats image

        /**
         @name istats~cookieExpiryTime
         @private
         @type {number}
         @description The number of milliseconds to wait before the internal
            tracking cookie expires
        */
        cookieExpiryTime = 10000,

        /**
         @name istats~duplicateClickTimeout
         @private
         @type {number}
         @description The minimum number of milliseconds required between successive clicks
            on the same element for each click to be handled.
        */
        duplicateClickTimeout = 500, // wait 0.5 seconds before giving up on iStats image

        /**
            @name istats~timeoutId
            @private
            @description Holds the timeout id returned from setTimeout as a reference so the timer can be cleared if necessary.
               note: We declare this var here rather than in the handling methods because we want to have a single reference/instance
               of the timeout so we can clear it and reinstantiate it if the user clicks consecutively on two (or more) links
        */
        timeoutId,

        /**
            @name istats~regex
            @private
            @type {Object.<string:RegExp>}
            @description A set of regular expressions used to match the different link types, fragment content and label types.
        */
        regex = {
            ignore: /.+\.(jpe?g|gif|png)$/i,
            webUrl: /^(\.\.?\/|\/|https?:\/\/|[^\/.:]+([\/.]|$))/i,
            pseudoProtocol: /^(mailto:|javascript:|about:|view-source:|data:)/i, // we should ignore these
            internalUrl: /^(?:\/\/|https?:\/\/)?(?:[^.]+\.)*(bbc(?:\.co\.uk|\.com)|doubleclick\.net)(:|\/|$)/i, // see unit test cases for examples of intended matches
            downloadUrl: /.+\.(pdf|te?xt|rtf|docx?|xlsx?|pptx?|od[tpsgbf]|mp[234]|m4a|mpeg|exe|dmg|zip|tgz)$/i,
            relativeUrl: /^(\.\.?\/|\/[^\/]|([^\/.:]+([\/.]|$)))/i,
            clickThrough: /^#sa-(.*?)(?:-sa(.*))?$/,
            hashLabels: /^ct_|ns_(fee|campaign|linkname|mchannel|source)=(.+?)$/,
            domain: /(bbc(?:\.co\.uk|\.com))$/i
        },

        /**
            @name istats~domEvents
            @private
            @namespace
            @description A set of DOM event related methods and properties.
        */
        domEvents = {},

        /**
            @name istats~customEvents
            @private
            @namespace
            @description A set of custom event related methods and properties.
        */
        customEvents = {
            types : {'trackingfail.istats': true, 'trackingsuccess.istats': true, 'redirect.istats': true, 'cookiecreated.istats': true}
        },

        /**
            @name istats~utils
            @private
            @namespace
            @description A set of utilities used for general operations (e.g. Array scanning, merging etc.)
        */
        utils = {},

        /**
            @name istats~trackers
            @private
            @namespace
            @description The set of tracking methods for the different types of links.
        */
        trackers = {},

        /**
            @name istats~customEventsRegistry
            @private
            @type {Array.<Object>}
            @description The array that will hold the custom events and callbacks
                for the different delegators. The delegator will only hold a reference
                key to the corresponding stack of callbacks here.
        */
        customEventsRegistry = [],

        /**
            @name istats~eventsTemplate
            @private
            @description Generate an empty template of the object that will hold
                the events-callbacks for a given delegator.
            @returns An object with the following structure - object[linkType][eventType][]
        */
        eventsTemplate = function() {
            var events = {};
            for (var type in customEvents.types){
                events[type] = [];
            }
            return events;
        },

        /**
            @name istats~cookieValue
            @private
            @description Contains the trackingCookie.
        */
        cookieValue = readCookie(trackingCookie);
	
	initConfig(window);
	
	//  Set global, used to prevent page tracking in addition to link tracking.
	if (cookieValue !== null) {
		(getConfig())._linkTracked = true;
	}

	if (checkTrackingEnabled()) {
		setTrackingServiceUrl();
	}

    eraseCookie(trackingCookie);
	
	/**
	    Initialise the istats configuration object, applying defaults for missing values.
	    @private
        @name istats.initConfig
        @function
        @param {DOMWindow} w The window whose configuration is to be initialised. 
        @returns {DOMWindow} A reference to the window that was initialised. This will have
        a configuration object attached to it named "istats".
     */
	function initConfig(w) {
	    // apply defaults
		( typeof w.istats === 'undefined' )         && ( w.istats = {} );
    	( typeof w.istats.enabled === 'undefined' ) && ( w.istats.enabled = true );
		
		return w;
	}
    
    /**
        Get a reference to the istas configuration object.
        
        The configuration object is attached to the DOMWindow and is named "istats". Setting valid
        properties on this object will affect the way istats works when it loads.
        
        Valid configuration properties are:
            enabled {boolean} - set this to false before the istats module loads to disable tracking
            _linkTracked {boolean} - private. indicates that an internal link was tracked
            
        @public
        @name istats.getConfig
        @function
        @param {DOMWindow} [w] A window provided as a dependency injection, or the current window by default. 
        @returns {Object} A hash of the current configuration values on the window, or an empty
        hash if no configuration values were ever set.
     */
    function getConfig(w) {
        return w? initConfig(w).istats : window.istats;
    }
    exports.getConfig = getConfig;

    /**
         @name istats~getLabelsFromCookie
         @private
         @function
         @description Gets the contents of the sa_labels cookie, erases the cookie, and sets tracking type 'internal'
         @returns {string|undefined} the string contents of the cookie if there are any.
     */
    function getLabelsFromCookie() {
        if(typeof cookieValue === 'string') {
            inspectTracking.type = 'internal';
            return cookieValue;
        }
    }

    /**
         @name istats~replaceHash
         @private
         @function
         @description Replaces the URI fragment of the page URL with the content after the #sa-...-sa
         @param {string} realHash The hash fragment that ends up in URL
     */
    function replaceHash(realHash) {
        if (history.replaceState) {
            history.replaceState({}, '', document.location.pathname + realHash );
        }
        else {
            document.location.hash = realHash;
        }
    }

    /**
         @name istats~getLabelsFromHashString
         @private
         @function
         @description Gets the contents of the hash, #sa-[...contents...]-sa, restores the real hash to the address and sets tracking type 'click through'
         @param {string} [urlHashString=document.location.hash] A hash fragment provided as a dependency injection, or the current window's hash by default.
         @returns {string|undefined} clickThrough The contents of the tracking part of the fragment
     */
    function getLabelsFromHashString(urlHashString) {
        urlHashString || (urlHashString = document.location.hash);
        
        // Take care of the hash bang ---> #sa-[labels]-sa[real hash]
        if (urlHashString !== '') {
            var parts = urlHashString.match(regex.clickThrough),
                clickThrough,
                realHash = '',
                labels = [];

            if (parts === null) {
                return;
            }

            if (parts[2]) {
               realHash = '#' + parts[2];
            }

            replaceHash(realHash);

            clickThrough = parts[1];

            if (clickThrough === '') {
                return;
            }

            inspectTracking.type = 'click through';

            labels = clickThrough.split('&');

            for (var i in labels ) {
                if ( labels.hasOwnProperty(i) && !regex.hashLabels.test(labels[i]) ){
                    labels[i] = 'ct_' + labels[i];
                }
            }

            clickThrough = labels.join('&');

            return clickThrough;
        }
    }

    /**
         @name istats~checkTrackingEnabled
         @private
         @function
         @description Check for the nedstat flagpole. The value of the config
            might change at any time, therefore this function is called whenever
            we need to check iStats is enabled.
         @returns {boolean} False if the flagpole is not enabled.
    */
    function checkTrackingEnabled() {
        var isEnabled = true,
            flagpoleDisabled = true,
            istatsConfigEnabled = (getConfig()).enabled;
		
		if (window.bbcFlagpoles_istats) {
            flagpoleDisabled = !(window.bbcFlagpoles_istats === 'ON'); // see https://admin.int.bbc.co.uk/flagadmin/flag/barlesque/nedstat
        }

        if (flagpoleDisabled || !istatsConfigEnabled) {
            isEnabled = false;
        }
        else {
            setTrackingServiceUrl();
        }

        return isEnabled;
    }

    /**
         @name istats~setTrackingServiceUrl
         @private
         @function
         @description Set the trackingServiceUrl to be the same as the istatsTrackingUrl.
            The global variable istatsTrackingUrl is set by the page tracking script
            and its value is baked in via PHP and is different depending on the
            environment (sandbox/int/test/live etc.)
    */
    function setTrackingServiceUrl() {
        if (!trackingServiceUrl && typeof istatsTrackingUrl !== 'undefined') {
            trackingServiceUrl = istatsTrackingUrl;
        }
        return trackingServiceUrl;
    }
    exports._setTrackingServiceUrl = setTrackingServiceUrl;
    exports._getTrackingServiceUrl = function() { return trackingServiceUrl; }

    /**
       @name istats.setCountername
       @description Set the countername. The countername is a page-wide string,
                    used in the tracking URL sent to the ComScore server, as a
                    way of identifying the name of the tracking counter (usually
                    derived from the URL-path to the page).
       @param {string} name - The name to set the countername to.
    */
    exports.setCountername = function(name) {
        // assumes setTrackingServiceUrl() has already been called
        trackingServiceUrl = trackingServiceUrl.replace(/([\?&]name=)[^&]*/ig, '$1' + name);
    }

    /**
       @name istats.getCountername
       @description Get the countername.
       @returns {string} The countername.
    */
    exports.getCountername = function() {
        // assumes setTrackingServiceUrl() has already been called
        var matches = trackingServiceUrl.match(/[\?&]name=([^&]*)/i);
        if (matches) { return matches[1]; }
    }

    /**
         @name istats~hasClass
         @private
         @function
         @description Determines if a node has a specific class name.
         @param {HTMLElement} node A DOM object to test the class of.
         @param {string} name The name of the class to test.
         @returns {boolean} True if node has class, otherwise false.
    */
    function hasClass(node, name) {
        if (!node.className) {
            return false;
        }
        return (' ' + node.className + ' ').indexOf(' ' + name + ' ') === -1 ? false : true;
    }

    /**
         @name istats~addClass
         @private
         @function
         @description Adds a class to a node.
         @param {HTMLElement} node A DOM object to add the class to.
         @param {string} name The name of the class to add.
    */
    function addClass(node, name) {
        var oldClasses = (node.className) ? node.className + ' ' : '';
        if (!hasClass(node, name)) {
            node.className = oldClasses + name;
        }
    }

    /**
         @name istats~removeClass
         @private
         @function
         @description Removes a class from a node.
         @param {HTMLElement} node A DOM object to remove the class to.
         @param {string} name The name of the class to remove.
    */
    function removeClass(node, name) {
        var oldClasses = node.className.split(' '),
            newClasses = [],
            i = oldClasses.length;
        while (i--) {
            if (oldClasses[i] !== name) {
                 newClasses.unshift(oldClasses[i]); // unshift to maintain original order
            }
        }
        node.className = (newClasses.length)? newClasses.join(' ') : '';
    }

    /**
         @name istats.track
         @method
         @description Apply trackers to links.
         @param {string} linkType
         @param {Object[]} [opts]
         @param {HTMLElement|HTMLElement[]|NodeList} [opts.region=document.body] A DOM object or array of DOM objects
            (could be a jQuery, Glow or DOM NodeList) that act as click delegates.
         @param {string} [opts.linkLocation] A label describing the location of the link on the page. E.g. "storybody", "footer" etc.
    */
    exports.track = function(linkType, opts) {
        if (!checkTrackingEnabled()) {
            return;
        }

        if (!validLinkTypes[linkType]) {
            throw('Given linkType, "'+linkType+'" is not valid.');
        }

        opts = opts || {};

        if (!opts.region) {
            opts.region = [document.body]; // default region
        }

        if (typeof opts.region.push === 'undefined') { // expect an array
            opts.region = [opts.region];
        }

        var i = opts.region.length;
        while (i--) {
            var regionElement = opts.region[i];

            setIstatsProperties(regionElement, linkType);

            var istatsProps = regionElement[instanceId];

            istatsProps.linkTypesTracked[linkType] = (opts || {});

            if (!istatsProps.trackerAttached) {
                (function(regionElement) {
                    domEvents.attach(regionElement, 'click', function(e) { // click handler
                        trackers.dispatch(regionElement, e);
                    });
                })(regionElement);

                istatsProps.trackerAttached = true;
            }
        }
    };

    /**
         @name istats.observe
         @method
         @description Binds a function to the specified event fired by the tracking module.
         @param {Array|NodeList} nodes An array of DOM objects (could be a jQuery, Glow or DOM NodeList).
         @param {string} eventType The name of the event to bind to.
         @param {Function} handler The callback function to execute when the event is fired.
    */
    exports.observe = function(nodes, eventType, handler) {
        if (! customEvents.types[eventType]) {
            throw('Cannot observe: Given eventType, "'+eventType+'" in unknown.');
        }

        if (typeof nodes.push === 'undefined') {
            nodes = [nodes];
        }

        var i = nodes.length;
        while (i--) {
            setIstatsProperties(nodes[i]);
            customEventsRegistry[ nodes[i][instanceId].eventsKey ][eventType].push(handler);
        }
    }

    /*  Protected API - exposed for testing */
    exports._isInternal = function(url) {
        return exports._isWebUrl(url) && ( regex.relativeUrl.test(url) || regex.internalUrl.test(url) );
    }

    exports._isExternal = function(url) {
        return exports._isWebUrl(url) && !istats._isInternal(url);
    }

    exports._isDownload = function(url) {
        return regex.webUrl.test(url) && regex.downloadUrl.test(url);
    }

    exports._isWebUrl = function(url) {
        return regex.webUrl.test(url) && !regex.ignore.test(url) && !regex.pseudoProtocol.test(url);
    }
    
    /**
        Used for setting the cookie to whatever the current BBC domain is.
        @param {string} the host to match against.
        @returns {string} the found domain.
     */
    exports._getDomainFromHost = getDomainFromHost;
    function getDomainFromHost(host) {
        var matches = host.match(regex.domain);
        return matches? matches[1] : host;
    }
    
    exports._getLabelsFromHashString = getLabelsFromHashString;
    exports._createCookie = createCookie;

    /**
         @name istats._inspectTracking
         @private
         @method
         @description Setter and Getter for private inspectTracking Object.
            Has the following properties: url (actual tracking url), type (tracking type)
         @param {Object} [value] Used to set the inspectTracking value.
         @returns {Object} The inspectTracking value.
     */
    exports._inspectTracking = function(value) {
        if (typeof value !== 'undefined') {
            inspectTracking = value;
        }

        return inspectTracking;
    }

    /**
         @name istats.log
         @method
         @description Log a dynamic user action that is not related to a specific link or set of links.
         @param {string} actionType
         @param {Object[]} name (...action_name or countername )
         @param {Object} opts Assosiative array of appended options. Keys and values should be unencoded.
         @param {function} callback The callback function defined by the user to run on load of the tracking image.
    */
    exports.log = function(actionType, name, opts, callback) {
        var optsString = '',
            trackUrl;

        if (!checkTrackingEnabled()) {
            return;
        }

        name = encodeURIComponent(name);
        actionType = encodeURIComponent(actionType);

        //run through the opts and make a string with ...&key=value&key=value...
        for (var i in opts){
            optsString += '&' + encodeURIComponent(i) + '=' + encodeURIComponent(opts[i]);
        }

        if (actionType.toLowerCase() === 'pageview') {
            //change countername in trackingServiceUrl
            exports.setCountername(name);
            trackUrl = trackingServiceUrl;
        } else {
            //set ns_type to hidden;
            trackUrl = trackingServiceUrl + '&ns_type=hidden' + '&action_type=' + actionType + '&action_name=' + name;
        }

        trackUrl += optsString;
        inspectTracking.type = 'logging actions';

        loadTrackingImage(trackUrl, callback);
    }

    /**
         @name istats.addNoTrack
         @method
         @description Adds the "istats-notrack" class to a link to disable tracking of that link.
         @param {HTMLElement} node A DOM object to add the "istats-notrack" class to.
    */
    exports.addNoTrack = function(node) {
        addClass(node, notrackClass);
    }


    /**
         @name istats.removeNoTrack
         @method
         @description Removes the "istats-notrack" class to a link to enable
            tracking of that link if it is within a region that is being tracked.
         @param {HTMLElement} node A DOM object to remove the "istats-notrack" class from.
    */
    exports.removeNoTrack = function(node) {
        removeClass(node, notrackClass);
    }

    /**
         @name istats~customEvents.notify
         @private
         @method
         @param {Object} node The DOM object to call the event on
         @param {string} eventType The name of the event to bind to
         @param {Object} e The event object
    
         @description Fire the set of custom events/callbacks
         @returns false if one of the callback functions returns
         false and stop the execution of the rest of the callbacks (if any)
    */
    customEvents.notify = function(node, eventType, e) {
        var handlers = customEventsRegistry[node[instanceId].eventsKey][eventType];

        for(var i = 0, length = handlers.length; i < length; i++) {
            if (typeof handlers[i] === 'function') {
                if(handlers[i](e)===false) {
                    return false;
                }
            }
        }
    }

    /**
         @name istats~domEvents.
         @private
         @method
         @param {DOM object} element The element to add the event handler to
         @param {string} type The type of the event e.g. "click"
         @param {function} handler The handler function. The handler function
            is passed the event object
    
         @description Add an event handler to a DOM element cross browser.
    */
    domEvents.attach = function(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    }

    /**
         @name istats~domEvents.detach
         @private
         @method
         @param {DOM object} element The element to remove the event handler from
         @param {string} type The type of the event e.g. "click"
         @param {function} handler The handler function to remove.
    
         @description Remove an event handler to a DOM element cross browser.
    */
    domEvents.detach = function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }

    /**
         @name istats~domEvents.getTarget
         @private
         @method
         @param {Object} e The event object to get the target of.
         @description Get the target of the event.
    */
    domEvents.getTarget = function(e){
        e = e || window.event;
        return e.target || e.srcElement;
    }

    /**
         @name istats~getNearestAnchorElement
         @private
         @method
         @param {Object} startNode The node to start the scan from
         @param {Object} endNode The node to end on
    
         @description Find the ancestor of startNode that is an anchor link
            (keeps searching up until the endNode)
    */
    function getNearestAnchorElement(startNode, endNode){
        var node = startNode;
        do {
            if (node.nodeName == 'A') return node;
            if (node === endNode) return false;
        }
        while(node = node.parentNode);
    }

    /**
         @name istats~getLinkType
         @private
         @method
         @param {string} href The node to start the scan from
         @return {string|undefined} The type of the link, like: external or download
    
         @description Given the value of a href, determine the iStat link type.
    */
    function getLinkType(href) {
        if (!istats._isWebUrl(href)) { return; }

        if (istats._isExternal(href)) {
            return 'external';
        }
        else if (istats._isDownload(href)) { // internal downloads only
            return 'download';
        }
        else if (istats._isInternal(href)) { // internal links only
            return 'internal';
        }
    }

    /**
         @name istats~addLinkInfoToEvent
         @private
         @method
         @description Populate the event object with information about the tracking.
    */
    function addLinkInfoToEvent(e, linkType, linkTrackerUrl, linkLocation, linkElement) {
        e.istats = {
            linkType:       linkType,
            linkTrackerUrl: linkTrackerUrl,
            linkLocation:   linkLocation,
            linkElement:    linkElement
        };
    }

    /**
         @name istats~trackers.dispatch
         @private
         @method
         @param {HTMLElement} regionElement The container element that the click was delegated to.
         @param {Object} e The event object
         @this {HTMLElement} The element that is the region the click event is being delgated to.
         @description A proxy to the more specific tracker functions.
    */
    trackers.dispatch = function(regionElement, e) {
        var linkElement = getNearestAnchorElement(domEvents.getTarget(e), this),
            linkType,
            linkTracker,
            linkTracked,
            currentTime,
            alreadyTracked;

        if (!linkElement || !linkElement.href) {
            return;
        }

        // link elements that have already been tracked by a inner tracker will have a recent timestamp
        currentTime = new Date().getTime();
        alreadyTracked = (linkElement.istatsTimestamp && (currentTime - linkElement.istatsTimestamp) < duplicateClickTimeout);

        // bail out early if this link/click has already been tracked or if link has "istats-notrack" class
        if (alreadyTracked || hasClass(linkElement, notrackClass)) {
            return;
        }

        // is there a tracker for this type of link?
        linkType = getLinkType(linkElement.href);
        linkTracker = trackers[linkType];
        linkTracked = regionElement[instanceId].linkTypesTracked[linkType];

        if (!linkType || !linkTracker || !linkTracked) {
            return;
        }

        // mark the link element as being already tracked
        linkElement.istatsTimestamp = currentTime;

        e.istats = e.istats || {};
        trackers[linkType](regionElement, linkElement, e);
    }

    /**
         @name istats~trackers.external
         @private
         @method
         @param {HTMLElement} regionElement The container element that the click was delegated to.
         @param {HTMLElement} anchorElement The anchor element that was clicked.
         @param {Object} e The event object
    
         @description Handle external tracking and redirect the user on success or timeout.
    */
    trackers.external = function(regionElement, anchorElement, e) {
        var opts         = regionElement[instanceId].linkTypesTracked.external || {},
            linkHref     = encodeURIComponent(anchorElement.href) || '',
            linkId       = anchorElement.id ? '&extlink_id=' + encodeURIComponent(anchorElement.id) : '',
            linkLocation = opts.linkLocation ? '&link_location=' + encodeURIComponent(opts.linkLocation) : '',
            trackUrl     = trackingServiceUrl + '&ns_type=hidden&action_type=extlink&extlink_url=' + linkHref + linkId + linkLocation;

        inspectTracking.type = 'external';
        addLinkInfoToEvent(e, 'external', trackUrl, opts.linkLocation, anchorElement);
        loadTrackingImageAndRedirect(trackUrl, regionElement, anchorElement, e);
    }

    /**
         @name istats~trackers.download
         @private
         @method
         @param {HTMLElement} regionElement The container element that the click was delegated to.
         @param {HTMLElement} anchorElement The anchor element that was clicked.
         @param {Object} e The event object
    
         @description Handle download tracking and redirect the user on success or timeout.
    */
    trackers.download = function(regionElement, anchorElement, e) {
        var opts         = regionElement[instanceId].linkTypesTracked.download || {},
            linkHref     = encodeURIComponent(anchorElement.href) || '',
            linkId       = anchorElement.id ? '&download_id=' + encodeURIComponent(anchorElement.id) : '',
            linkLocation = opts.linkLocation ? '&link_location=' + encodeURIComponent(opts.linkLocation) : '',
            trackUrl     = trackingServiceUrl + '&ns_type=hidden&action_type=download&download_url=' + linkHref + linkId + linkLocation;

        inspectTracking.type = 'download';
        addLinkInfoToEvent(e, 'download', trackUrl, opts.linkLocation, anchorElement);
        loadTrackingImageAndRedirect(trackUrl, regionElement, anchorElement, e);
    }

    /**
         @name istats~trackers.internal
         @private
         @method
         @param {HTMLElement} regionElement The container element that the click was delegated to.
         @param {HTMLElement} anchorElement The anchor element that was clicked.
         @param {Object} e The event object
    
         @description Handle internal tracking and redirect the user on success or timeout.
    */
    trackers.internal = function(regionElement, anchorElement, e) {
        var opts         = regionElement[instanceId].linkTypesTracked.internal || {},
            fromUrl      = 'intlink_from_url=' + encodeURIComponent(document.location.href),
            linkTs       = '&intlink_ts=' + new Date().getTime(),
            linkId       = anchorElement.id ? '&intlink_id=' + encodeURIComponent(anchorElement.id) : '',
            linktrack    = anchorElement.linktrack ? '&' + anchorElement.linktrack : '',
            linkLocation = opts.linkLocation ? '&link_location=' + encodeURIComponent(opts.linkLocation) : '',
            cookieValue  = fromUrl + linkTs + linkId + linktrack + linkLocation;
        createCookie(trackingCookie, cookieValue, cookieExpiryTime);
        customEvents.notify(regionElement, 'cookiecreated.istats', e);
    }

    /**
         @name istats~loadTrackingImageAndRedirect
         @private
         @method
         @param {string} trackUrl
         @param {HTMLElement} regionElement The container element that the click was delegated to.
         @param {HTMLElement} anchorElement The anchor element that was clicked.
         @param {Object} e The click event object.
    
         @description Handles redirection from the tracking page and calls
            loadTrackingImage for external and download links
     */
    function loadTrackingImageAndRedirect(trackUrl, regionElement, anchorElement, e) {
        var modifierKey = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey, // Modifier key pressed
            redirect = function() {};

        if (!modifierKey) { // If modifier key is pressed do not redirect or set timeout for tracking
            redirect = function() {
                if (customEvents.notify(regionElement, 'redirect.istats', e) !== false) {
                    window.location.href = anchorElement.href; // TODO is this safe frames
                }
            };
        }

        clearTimeout(timeoutId);
        timeoutId = setTimeout( // start the image onload fail timer
            function() {
                customEvents.notify(regionElement, 'trackingfail.istats', e);
                redirect();
            },
            trackTimeout
        );

        loadTrackingImage(trackUrl, function() {
            clearTimeout(timeoutId); // cancel the image onload fail timer
            // subscribers to this event can prevent the default action by returning false
            if (customEvents.notify(regionElement, 'trackingsuccess.istats', e) !== false) {
                redirect();
            }
        }, e);

        if (!modifierKey) { // If modifier key is pressed do not prevent default action
            if (e.preventDefault) {
                e.preventDefault();
            }
            else {
                event.returnValue = false;
            }
        }
    }

    /**
         @name istats~loadTrackingImage
         @private
         @method
         @param {string} trackUrl The tracking service URL.
         @param {function} [callback] Callback defined either by the user
            (logging actions) or by the script (internal, external, download)
            and triggered on image load.
         @param {object} [e] Event object defined by addLinkInfoToEvent.
         @description Loads the tracking image with trackUrl plus an appended
            timestamp and triggers the callback function on image load
    */
    function loadTrackingImage(trackUrl, callback, e) {

        var trackingImage;

        trackUrl += '&ns__t=' + (new Date().getTime());
        trackUrl += '&ns_jspageurl=' + escape(document.location && document.location.href ? document.location.href : document.URL);

        if (e && e.istats.linkTrackerUrl) {
            e.istats.linkTrackerUrl = trackUrl;
        }

        trackingImage = new Image();

        if (typeof callback === 'function') {
            trackingImage.onload = function() {
                callback();
            }
        }

        inspectTracking.url = trackUrl;

        // begin loading
        trackingImage.src = trackUrl;
    }

    /**
         @name istats~setIstatsProperties
         @private
         @method
         @method setIstatsProperties
         @param {HTMLElement} regionElement The DOM node to apply istats
            properties to.
         @description Apply the istats namespace to a node and create and
            register an events template for it in customEventsRegistry.
    */
    function setIstatsProperties(regionElement) {
        // avoid adding expando twice
        if (typeof regionElement[instanceId] !== 'undefined') {
            return;
        }

        regionElement[instanceId] = {
            eventsKey: customEventsRegistry.length,
            linkTypesTracked: {} // what types of links is this delegate interested in?
        };
        customEventsRegistry.push(eventsTemplate());
    }

    /**
        @name istats~createCookie
        @private
        @method
        @description creates a cookie
        @param {string} name The name of the cookie.
        @param {string} value The value of the cookie.
        @param {number} [expires=one year] How long the cookie will live (in ms).
        @returns The content of the cookie that was created.
     */
     function createCookie(name, value, expires) {
        var date = new Date(),
            defaultExpires = 365*24*60*60*1000,
            host = window.location.host,
            domain,
            expiresSegment,
            cookieValue;
        
        if (typeof expires === 'undefined') {
            expires = defaultExpires;
        }
        
        date.setTime(date.getTime() + expires);
        expiresSegment = '; expires=' + date.toGMTString();
        domain = getDomainFromHost(host);
        
        cookieValue = name + '=' + encodeURIComponent(value) + expiresSegment + '; domain=' + domain + '; path=/';
        document.cookie = cookieValue;
        
        return cookieValue;
    }

    /**
        @name istats~readCookie
        @private
        @method
        @description Read one cookie with a specific name and return its value.
        @param {string} name The name of the cookie to read the value from.
        @return {string|null} The value of the cookie with name 'name'.
    */
    function readCookie(name) {
        var nameEquals = name + '=',
            cookieCrumbs = document.cookie.split(';'),
            crumb;

        for(var i = 0, len = cookieCrumbs.length; i < len; i++) {
            crumb = cookieCrumbs[i];
            while (crumb.charAt(0) === ' ') {
                crumb = crumb.substring(1, crumb.length);
            }
            if (crumb.indexOf(nameEquals) === 0) {
                return decodeURIComponent( crumb.substring(nameEquals.length, crumb.length) );
            }
        }
        return null;
    }

    /**
        @name istats~eraseCookie
        @private
        @method
        @description Erases a cookie by setting it's expiry day to -1.
        @param {string} name The name of the cookie to delete.
    */
    function eraseCookie(name) {
        if (readCookie(name) !== null) { createCookie(name, '', -1); }
    }

    /**
        @name istats~onready
        @private
        @method
        @description Loads the labels from either the cookie or the #sa-...-sa part of the hash.
        @param {string|undefined} trackString Either 1. the contents of the cookie, 2. the contents
           of the hash , 3. undefined if neither exists.
        @exports {Object} trackingData This object contains information related to the
           internal link tracking mechanism if and after the tracking's success. It also
           works as flag to indicate the success of the internal link tracking in the
           target page.
    */
    function onready() {
        var labelsPassedIn;

        if (!checkTrackingEnabled() && typeof trackingServiceUrl !== 'string') {
            return;
        }

        labelsPassedIn = getLabelsFromCookie() || getLabelsFromHashString();
        
        if (labelsPassedIn) {
            // track the passed-in labels immediately
            loadTrackingImage(trackingServiceUrl + '&' + labelsPassedIn);

            // flag to prevent double tracking by any inline istats code
            (getConfig())._linkTracked = true;
        }
    }

    require.ready(onready); // TODO see API changes for this recent versions of RequireJS

    return exports;
});
