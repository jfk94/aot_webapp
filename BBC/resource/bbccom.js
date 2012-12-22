gloader.load(["glow","1","glow.dom","glow.anim","glow.events","glow.embed"],{
    onLoad: function(glow){
        window.googletag = window.googletag || {};
        googletag.cmd = googletag.cmd || [];
        BBC.adverts = function () {
            var
            UNDEFINED = "undefined",
            KEY_VALUES = "keyValues",
            SLOTS = "slots",
            ADS = "ads",
            TILE = 0,
            EMPTY = "",
            SLASH = "/",
            SEMI = ";",
            EQUALS = "=",
            DISPLAY_NONE = "bbccom_display_none",
            SCRIPT_START = "<script type=\"text/javascript\" src=\"",
            SCRIPT_END = "\"></script>",
            SCRIPT_ROOT = "/",
            IMG_ROOT = "/",
            JS = ".js",
            LOCATION = "location",
            DOMAIN = "domain",
            ADS_BLOCKED = false,
            ZONE_VERSION = "zoneVersion",
            ZONE_OVERRIDE = "zoneOverride",
            REFERRER = "zoneReferrer",
            YES = "yes",
            NO = "no",
            ID_START = "bbccom_",
            BBC_ORD = "&ord=",
            DC_BASE = "http://ad.doubleclick.net/adj/",
            DC_BASE_STANDARD = "http://ad.doubleclick.net/ad/",
            DC_BASE_STANDARD_ANCHOR = "http://ad.doubleclick.net/jump/",
            DC_BASE_IFRAME = "http://ad.doubleclick.net/adi/",
            DC_BASE_X = "http://ad.doubleclick.net/adx/",
            DC_BASE_COMPANION = "http://ad.doubleclick.net/pfadx/bbccom.live.site.news/;tile=6;sz=512x288;dcgzip=0",
            DC_PREROLL_BASE = "http://ad.doubleclick.net/pfadx/",
            DC_CLOSE_CREATIVE = "817-grey.gif",
            DC_SLOT = ";slot=",
            DC_SZ = ";sz=",
            DC_TILE = ";tile=",
            DC_INTERSTITIAL = ";dcopt=ist",
            DC_ORD = ";ord=",
            DC_IS_IFRAME = ";iframe=yes",
            DC_IS_REFRESH = ";iframe_refresh=yes",
            DC_END = "?",
            BODY_CLASS_PREFIX = "bbccom_slot_",
            BODY = undefined,
            DISABLE_WIDE_ADVERT_CLASS = "disable-wide-advert",
            CPS_SITE_NAME_META_URL_MAP = {
                newsonline: "/2/hi",
                bbc_news: "/2/hi",
                refresh: "/news"
            },
            BBC_FMTJ_PAGE_JS_URL_MAP = {
                news: {
                    old: "/2/hi",
                    refresh: "/news"
                },
                sport: {
                    old: "/sport2/hi",
                    refresh: "/sport"
                }
            },
            AD_LABEL = "<div class=\"bbccom_text\"><a href=\"http://faq.external.bbc.co.uk/questions/bbc_online/adverts_general\">Advertisement</a></div>",
            AD_INFO = {
                leaderboard: {
                    size: "728x90,970x66,970x90",
                    oid: "ldb"
                },
                skyscraper: {
                    size: "120x600,160x600",
                    oid: "sky"

                },
                bottom: {
                    size: "468x60",
                    oid: "bot"
                },
                mpu: {
                    photo_gallery    : "300x250",
                    media_asset      : "300x250,336x280",
                    live_event       : "300x250,336x280",
                    full_width_page  : "300x250,336x280",
                    size             : "300x250,300x600,300x1050",
                    medium_size      : "160x600,300x250,300x600,300x1050,336x700,336x850,336x280",
                    wide_size        : "160x600,300x250,300x600,300x1050,336x700,336x850,336x280,468x648",
                    oid: "mpu"
                },
                "mpu_bottom":{
                    size:"300x251",
                    oid: "mpb"
                },
                button: {
                    size: "120x240",
                    oid: "but"
                },
                wallpaper: {
                    size: "1x1",
                    oid: "wpp"
                },
                video: {
                    size: "1x1",
                    oid: "vid"
                },
                preroll:{
                    size: "512x288",
                    oid: "pre"
                },
                companion: {
                    size: "300x60",
                    oid: "cpn"
                },
                storyprintsponsorship: {
                    size: "88x31",
                    oid: "sps"
                },
                halfbanner: {
                    size: "234x60",
                    oid: "hbn"
                },
                printableversionsponsorship: {
                    size: "120x60,215x60",
                    oid: "pvs"
                },
                sponsor_1: {
                    size: "88x31",
                    oid: "sp1"
                },
                sponsor_2: {
                    size: "88x31",
                    oid: "sp2"
                },
                sponsor_3: {
                    size: "88x31",
                    oid: "sp3"
                },
                sponsor_4: {
                    size: "88x31",
                    oid: "sp4"
                },
                sponsor_section: {
                    size: "88x31",
                    oid: "sct"
                },
                sponsor_section_news: {
                    size: "88x31",
                    oid: "ssn"
                },
                partner_button1: {
                    size: "120x30",
                    oid: "pb1"
                },
                partner_button2: {
                    size: "120x30",
                    oid: "pb2"
                },
                partner_button3: {
                    size: "120x30",
                    oid: "pb3"
                },
                partner_button4: {
                    size: "120x30",
                    oid: "pb4"
                },
                partner_button5: {
                    size: "120x30",
                    oid: "pb5"
                },
                partner_button6: {
                    size: "120x30",
                    oid: "pb6"
                },
                partner_button7: {
                    size: "120x30",
                    oid: "pb7"
                },
                partner_button8: {
                    size: "120x30",
                    oid: "pb8"
                },
                adsense_middle: {
                    size: "",
                    oid: "amd"
                },
                adsense_mpu: {
                    size: "amp"
                },
                promo_feature: {
                    size: "336x224",
                    oid: "pf{1}"
                },  // Promo Feature catch-all (
                tv_promo: {
                    size: "336x350",
                    oid: "tvp"},  // TV page promo (
                sponsor: {
                    size: "88x31",
                    oid: "sp{1}"
                },  // Promo Feature catch-all (
                module: {
                    size: "88x31",
                    oid: "m{2}"
                },    // Homepage modules catch-all (module_*)
                "module_page-bookmark-links-top" : 
                    {size: "205x31",
                    oid: "pbl"
                },
                "rectangle300x100" : {
                    size: "300x100",
                    oid: "rct"
                },
                not_found          : {size: ""}
            };
            var
            adSlotsRegistered = [],
            moveAdCallback,
            ord = EMPTY,
            config = {},
            zoneData = {},
            ordLength = 14,
            isV6Gvl3 = false,
            isGvl3 = false,
            pageVersion = undefined,
            SITEVERSION = "4",
            cssPostFix = ["_v4", "_v3_5", "_v3"],
            mastHeadPresent = false,
            sectionUrl = '',
            contentMetaData = '',
            adKeyword = '',
            adKeywordValue = '',
            uidString = '',
            predicateString = '',
            predicateKeyValues = [],
            predicates = [
                {
                    key:"airline",
                    rules:[
                        {
                            match:[
                                /air|plane|flight|jet|aviation/g,    // each line is an AND
                                /ash|bomb|crash|dead|detonat|disaster|disrupt|emergenc|fire|incident|injur|kill|package|passenger|crew|score|strand|strike|volcan|wreck/g // each line is an AND
                            ],
                            value:"!e"
                        },
                        {
                            match:[
                                /osama|bin laden|twin towers|9\/11|september 11|11 september|wtc|world trade center|al-qaeda|al qaeda/g
                            ],
                            value:"!e"
                        }
                    ]
                },
                {
                    key:"violence",
                    rules:[
                        {
                            match:[
                                /riot|violen|loot|unrest|unruly|attack|disturbance|shot|disorder|anarch|chaotic|chaos|unruliness|mindless|stealing|stolen|thiev|theft|arson|crisis|disarray|discord|lawlessness|criminal|vandal|thug|engulf|flame|burn/g
                            ],
                            value:"!e"
                        }
                    ]
                }
            ],
            slotNameLookupTable = [
              {
                adId:"hp_module_entertainment_arts",
                slotId:"module_0002l"
              },
              {
                adId:"hp_module_spotlight",
                slotId:"module_0000i"
              },
              {
                adId:"hp_module_weather",
                slotId:"module_0001k"
              },
              {
                adId:"hp_module_most_popular",
                slotId:"module_00029"
              },
              {
                adId:"hp_module_travel",
                slotId:"module_0001f"
              },
              {
                adId:"hp_module_sport",
                slotId:"module_00008"
              },
              {
                adId:"share_tool_top",
                slotId:"module_page-bookmark-links-top"
              },
              {
                adId:"share_tool_bottom",
                slotId:"module_page-bookmark-links"
              },
              {
                adId:"module_elsewhere",
                slotId:"module_hyper-promotional-content"
              }
            ],
            keywordZoneOverrides = {
                royalwedding: 'news_royalwedding_content'
            },
            /* not sure whether these are used anymore */
            companion_classes = {
                mpu: {
                    'def': 'mpu',
                    720: '',
                    160: 'mpu_skyscraper',
                    468: 'xxl',
                    336: 'mpu336'
                },
                leaderboard: {
                    'def': 'leaderboard',
                    300: '',
                    970: 'leaderboard970'
                }
            },
            // companionSlots defines which slots should be filled when companion ads are loaded.
            companionSlots = {
               	companion: {
            		slot: 'companion',
            		size: '300x60',
            		type: 'adi',
            		domId: 'bbccom_companion'
            	},
            	mpu: {
            		slot: 'mpu',
            		size: '300x250',
            		type: 'adi',
            		domId: 'bbccom_mpu'
            	}
        	},
        	// companionPages defines which pages should have which companion slots.
            companionPages = {
                'media_asset': [
                	companionSlots.companion,
                	companionSlots.mpu
                ],
            	'default': [
            		companionSlots.companion
            	]
            },
            movable=[],
            refreshTimestamp=0,
            refreshTTL=3,
            googleGPTSDKLoaded = false;

            while (ordLength--) ord += (Math.floor(Math.random() * 10));
            var getCustomKeyValues = function (slotKeyValues) {
                var customKeyValues = [];
                var len = 0;
                if (zoneData.keyValues) {
                    for (var key in zoneData.keyValues) {
                        customKeyValues[len] = SEMI;
                        customKeyValues[len + 1] = key;
                        customKeyValues[len + 2] = EQUALS;
                        customKeyValues[len + 3] = zoneData.keyValues[key];
                        len += 4;
                    }
                }
                // Match some dom values in the markup
                if (zoneData.domValues) {
                    for (var domKey in zoneData.domValues) {
                        var domValue = glow.dom.get(zoneData.domValues[domKey]);
                        if("undefined" !== typeof(domValue[0])) {
                            customKeyValues[len] = SEMI;
                            customKeyValues[len + 1] = domKey;
                            customKeyValues[len + 2] = EQUALS;
                            customKeyValues[len + 3] = escape(domValue[0].innerHTML.split(' ').join('_'));
                            len += 4;
                        }
                    }
                }
                if (slotKeyValues) {
                    for (var slotKey in slotKeyValues) {
                        customKeyValues[len] = SEMI;
                        customKeyValues[len + 1] = slotKey;
                        customKeyValues[len + 2] = EQUALS;
                        customKeyValues[len + 3] = slotKeyValues[slotKey];
                        len += 4;
                    }
                }
                if (isJsObject() && "undefined" !== bbc.fmtj.page.assetType) {
                    customKeyValues[len] = SEMI;
                    customKeyValues[len + 1] = 'asset_type';
                    customKeyValues[len + 2] = EQUALS;
                    var isIndex = getUrl().match(/\/$|\/default.stm$/);
                    if ( null === bbc.fmtj.page.assetType && isIndex ) {
                        customKeyValues[len + 3] = 'index';
                    } else {
                        customKeyValues[len + 3] = bbc.fmtj.page.assetType;
                    }
                    len += 4;
                }
                if (isJsObject() && "undefined" !== bbc.fmtj.page.storyId) {
                    customKeyValues[len] = SEMI;
                    customKeyValues[len + 1] = 'story_id';
                    customKeyValues[len + 2] = EQUALS;
                    customKeyValues[len + 3] = bbc.fmtj.page.storyId;
                    len += 4;
                }
                return customKeyValues.join(EMPTY);
            };
            var incrementTile = function () {
                TILE++;
                return TILE;
            };
            
            /**
             * Write an ad slot to the page.
             */
            var write = function (slot, showLabel, slotKeyValues, type) {
                if (ADS_BLOCKED === false && zoneData.ads) {
                    if((!zoneData.slots || (zoneData.slots[slot] != false)) && config[slot] !== NO) {
                        adSlotsRegistered.push(slot);
                        config[slot] = YES;
                        if (typeof(slotKeyValues) == 'object') {
                            slotKeyValues.is_module = "true";
                        } else {
                            slotKeyValues = {};
                        }
                        if (slot.indexOf('_') !== -1) {
                            // Add "is_sponsor=true" when slot is equal sponsor_*
                            slotKeyValues['is_'+slot.slice(0,slot.lastIndexOf('_'))] = "true";
                        }
                        getBody().addClass(BODY_CLASS_PREFIX + slot);

                        if (showLabel || typeof(showLabel) == "undefined") {
                            document.write(AD_LABEL + getAdvertTag(slot,slotKeyValues,type));
                        } else {
                            document.write(getAdvertTag(slot,slotKeyValues,type));
                        }
                        changeLabel(slot);
                    }
                    else hide(slot);
                }
                else hide(slot);
            };
            
            
            // type - used by Sharing Tools to render an iFrame
            // dependentSlot - used by Sharing Tools to determine if Share This Page has advert
            var getAdvertTag = function (slot, slotKeyValues, type, dependentSlot) {
                if (typeof(dependentSlot) == "undefined" || config[dependentSlot] !== NO) {
                    var tile = incrementTile();
                    var slot_size = getAdvertSize(slot);
                    if (slot_size == '') return '';
//                    slot = lookupSlot(slot);  // BBCCOM-1097
                    if (type == "standardUri") {
                        return [DC_BASE_STANDARD, zoneData.site, SLASH, zoneData.zone, DC_SLOT, slot, DC_SZ, slot_size, getCustomKeyValues(slotKeyValues), getPredicates(), getAdKeywordValue(), uidString, DC_TILE, tile, DC_ORD, ord, DC_END].join(EMPTY);
                    } else if (type == "iframeRefresh") {
                        return [DC_BASE_IFRAME, zoneData.site, SLASH, zoneData.zone, DC_SLOT, slot, DC_SZ, slot_size, getCustomKeyValues(slotKeyValues), getPredicates(), getAdKeywordValue(), uidString, DC_TILE, tile, DC_ORD, ord, DC_IS_IFRAME, DC_IS_REFRESH, DC_END].join(EMPTY);
                    } else if (slot == "preroll") {
                        return [DC_PREROLL_BASE, zoneData.site, SLASH, zoneData.zone, DC_SLOT, slot, DC_SZ, slot_size, getCustomKeyValues(slotKeyValues), getPredicates(), getAdKeywordValue(), uidString, DC_TILE, 1].join(EMPTY);
                    } else if (slot == "wallpaper") {
                        // return [SCRIPT_START, DC_BASE_X, zoneData.site, SLASH, zoneData.zone, DC_SLOT, slot, DC_SZ, slot_size, getCustomKeyValues(slotKeyValues), getPredicates(), getAdKeywordValue(), uidString, DC_TILE, tile, DC_ORD, ord, DC_END, SCRIPT_END].join(EMPTY);
                    } else if (type == "iframe" || isRefreshSlot(slot)) {
                        if (slot_size.indexOf(',') !== -1) {
                            // Supports multiple slot sizes - picks the first one.
                            slot_size = slot_size.slice(0,slot_size.indexOf(','));
                        }
                        var width = slot_size.slice(0,slot_size.indexOf('x'));
                        var height = slot_size.slice(slot_size.indexOf('x')+1);
                        var cl = isRefreshSlot(slot) ? "bbccom_refresh" : "";
                        return ['<iframe id="'+ID_START+slot+'_iframe" width="', width, '" height="', height, '" class="', cl, '" frameborder="0" scrolling="no" src="', DC_BASE_IFRAME, zoneData.site, SLASH, zoneData.zone, DC_SLOT, slot, DC_SZ, slot_size, getCustomKeyValues(slotKeyValues), getPredicates(), getAdKeywordValue(), uidString, DC_TILE, tile, DC_ORD, ord, DC_IS_IFRAME, DC_END, '"></iframe>'].join(EMPTY);
                    }
                    return [SCRIPT_START, DC_BASE, zoneData.site, SLASH, zoneData.zone, DC_SLOT, slot, DC_SZ, slot_size, getCustomKeyValues(slotKeyValues), getPredicates(), getAdKeywordValue(), uidString, DC_TILE, tile, getInterstitialKeyValue(slot), DC_ORD, ord, DC_END, SCRIPT_END].join(EMPTY);
                } else {
                    return '<!-- bbccom: dependent slot closed -->';
                }
            };
            var getInterstitialKeyValue = function (slot) {
                return slot == 'leaderboard' ? DC_INTERSTITIAL : '';
            };
            var hide = function (slot,overrideMpu) {
                config[slot] = NO;
                glow.dom.get('#' + ID_START + slot).addClass(DISPLAY_NONE);
                // TODO get mpus to have id="bbccom_mpu" ONLY !! not _high etc, then remove the bad boy below !!
                // this is for multiple companion and XXL mpus
                if (overrideMpu && slot == 'mpu'){
                    slot = 'mpu_high';
                    hide(slot);
                }
            };
            var loadZonefile = function () {
                var src = config[ZONE_OVERRIDE] === true ? config[ZONE_VERSION] : SCRIPT_ROOT + config[ZONE_VERSION] + JS;
                var str = [SCRIPT_START, src, SCRIPT_END].join(EMPTY);
                document.write(str);
            };
            var getAdvertSize = function (slot) {
                if (!zoneData.slotSize || (typeof(zoneData.slotSize[slot]) == "undefined")) {
                    var slotInfo = getAdInfo(slot);
                    // Size is defined for an asset type
                    if (isV6Gvl3 && typeof(slotInfo[bbc.fmtj.page.assetType]) != "undefined") {
                        return slotInfo[bbc.fmtj.page.assetType];
                    // On sport need to restrict the height of mpu ads where they are not in right hand column
                    } else if (typeof(slotInfo.full_width_page) != "undefined" &&  336 < glow.dom.get('#bbccom_mpu').parent().width()) {
                        return slotInfo.full_width_page;
                    // Size is defined for 336px wide ads (medium size) and wide ads are disabled
                    } else if ( (isGvl3 || isV6Gvl3 || isPalGvl3()) && getBody().hasClass(DISABLE_WIDE_ADVERT_CLASS)
                        && typeof(slotInfo.medium_size) != "undefined") {
                        return slotInfo.medium_size;
                    // Wide adverts are defined
                    } else if ( (isGvl3 || isV6Gvl3 || isPalGvl3()) && typeof(slotInfo.wide_size) != "undefined") {
                        return slotInfo.wide_size;
                    }
                    return slotInfo.size;
                } else {
                    return zoneData.slotSize[slot];
                }
            };
            var getAdvertLabel = function(slot) {
                if (typeof(zoneData.labels) != 'undefined') {
                    if (typeof(zoneData.labels[slot]) != "undefined") {
                        // The MPU will get the label 'Sponsored by' : labels : { mpu : 'Sponsored by' }
                        return zoneData.labels[slot];
                    } else {
                        // All sponsor tables will get the label 'Sponsored by' : labels : { 'sponsor_table*' : 'Sponsor Table' }
                        var label;
                        for (var labelSlot in zoneData.labels) {
                            label = zoneData.labels[labelSlot];
                            if (labelSlot.indexOf('*') != -1) {
                                label = labelSlot.substring(0,(labelSlot.length - 1));
                                if (slot.indexOf(label) != -1) {
                                    // found label partial in slot name
                                    return zoneData.labels[labelSlot];
                                }
                            }
                        }
                    }
                }
                return false;
            };
            var changeLabel = function(slot) {
                var label = getAdvertLabel(slot);
                if (label) {
                    glow.dom.get("#" + ID_START + slot + ' .bbccom_text').html(label);
                }
            };
            /**
             * Is V6 CPS News and Sport Page
             */
            var setV6Gvl3 = function () {
                if (isJsObject() && 
                    null != bbc.fmtj.page.siteVersion &&
                    'undefined' != typeof(bbc.fmtj.page.siteVersion)  &&
                    ('cream' == bbc.fmtj.page.siteVersion || 'sport' == bbc.fmtj.page.siteVersion.toLowerCase())
                   ) {
                    isV6Gvl3 = true;
                }
            };

            /**
             * Used to read <body> to see if PAL Gvl3 page (allows 336px MPU).
             * <body> cannot be checked as part of BBC.adverts.init() as this is called before page load
             */
            var isPalGvl3 = function() {
                if (getBody().hasClass('sos2012')) {
                    // London 2012 Olympics PAL page
                    return true;
                }
                return false;
            };

            /**
             * Using metadata (meta tags) or url
             */
            var isMetadata = function () {
                if(document.getElementsByName('CPS_ASSET_TYPE').length != 0){
                    return true;
                }
                return false;
            };

            /**
             * JS Object with cream data present
             */
            var isJsObject = function () {
                if ('undefined' != typeof(bbc) &&
                    'undefined' != typeof(bbc.fmtj) &&
                    'undefined' != typeof(bbc.fmtj.page) &&
                    '(none)' != bbc.fmtj.page.sectionPath &&
                    null != bbc.fmtj.page.sectionPath){
                    return true;
                }
                return false;
            };

            /**
             * This is used by getUrl as a Feature Index (FIX) has the wrong section path
             */
            var isFeatureIndexAssetType = function () {
                var cpsMetaTags = getMetaTags(['CPS_ASSET_TYPE']);
                return cpsMetaTags.CPS_ASSET_TYPE == 'fix' ? true : false;
            };

            /**
             *
             * ANALYTICS
             *
             **/
            /**
             * Pre-url change
             */
            var getSectionsFromUrl = function () {
                var sections = [];
                var urlParts = window.location.pathname.replace(/^\/*/, "").replace(/\/*$/, "").split('/');
                for ( var key in urlParts ) {
                    if ( urlParts[key].search("\.stm") == -1 ) {
                       sections.push(urlParts[key]);
                    }
                }
                return sections;
            };
            /**
             * Post-url change
             */
            var getSectionsFromMeta = function () {
                var metaTags = getMetaTags(['CPS_SECTION_PATH']);
                return metaTags['CPS_SECTION_PATH'].replace(/^\/*/, "").replace(/\/*$/, "").split('/');
            };
            /**
             *
             * END ANALYTICS
             *
             **/

            var getUrl = function () {
                if (sectionUrl.length == 0) {
                    if(isJsObject() && !isFeatureIndexAssetType()) {
                        // New CPS, use JS object in page
                        var storyId = ('index' !== bbc.fmtj.page.assetType && '-' !== bbc.fmtj.page.storyId && null !== bbc.fmtj.page.storyId) ? bbc.fmtj.page.storyId : 'default.stm';
                        // Forwardslash denotes an index page on V3-V5 pages.
                        var sectionPath = ('/' !== bbc.fmtj.page.sectionPath) ? bbc.fmtj.page.sectionPath.toLowerCase().replace(/ /g, "_") : '';
                        var urlPrefix = '/' + bbc.fmtj.page.siteToServe;
                        /** This is applicable for sites that are not /news/ or /sport/ such as London 2012 */
                        for(siteToServe in BBC_FMTJ_PAGE_JS_URL_MAP) {
                            if (siteToServe == bbc.fmtj.page.siteToServe) {
                                urlPrefix = BBC_FMTJ_PAGE_JS_URL_MAP[siteToServe].old;
                                continue;
                            }
                        }
                        sectionUrl = urlPrefix + sectionPath + '/' + storyId;
                    } else if(isMetadata()) {
                        // Old CPS, use <meta>
                        var cpsMetaTags = getMetaTags(['CPS_ID', 'CPS_SITE_NAME', 'CPS_SECTION_PATH', 'CPS_ASSET_TYPE'])
                        var urlPrefix = ("undefined" != CPS_SITE_NAME_META_URL_MAP[cpsMetaTags.CPS_SITE_NAME]) ? CPS_SITE_NAME_META_URL_MAP[cpsMetaTags.CPS_SITE_NAME] : '';
                        var storyId = ('IDX' !== cpsMetaTags.CPS_ASSET_TYPE) ? cpsMetaTags.CPS_ID : 'default.stm';
                        var sectionPath = cpsMetaTags.CPS_SECTION_PATH.replace('frontpage', ''); // Repalce the meta data front page
                        sectionUrl = ('' !== sectionPath && '/' !== sectionPath) ? urlPrefix + '/' + sectionPath + '/' + storyId : urlPrefix;
                    } else {
                        // PAL pages, use Url
                        sectionUrl = config[LOCATION];
                        // Replace /sport/ -> /sport2/hi and /news/ -> /news/2/hi
                        for(siteToServe in BBC_FMTJ_PAGE_JS_URL_MAP) {
                            sectionUrl = sectionUrl.replace(BBC_FMTJ_PAGE_JS_URL_MAP[siteToServe].refresh, BBC_FMTJ_PAGE_JS_URL_MAP[siteToServe].old);
                        }
                    }
                }
                return sectionUrl;
            };

            /**
             *
             * Usage:
             *  var tags = ['CPS_ID','CPS_SXbox 360 premium (HDMI model) 20 GB, 5 games
Item Number  290596909291ITE_NAME','CPS_SECTION_PATH','CPS_ASSET_TYPE',
             *              'CPS_PLATFORM','CPS_AUDIENCE'];
             * getMetaTags(tags);
             */
            var getMetaTags = function (tags) {
                var metaTags = {};
                for (key in tags) {
                    if (document.getElementsByName(tags[key]).length != 0 &&
                        document.getElementsByName(tags[key])[0].getAttribute('content') !== null){
                        metaTags[tags[key]] = document.getElementsByName(tags[key])[0].getAttribute('content').toLowerCase().replace(/ /g, "_");
                    }
                }
                return metaTags;
            };

            var getPageTitle = function () {
                if (document.getElementsByTagName('title').length != 0){
                    return document.getElementsByTagName('title')[0].innerHTML.toLowerCase() + ' ';
                }
                return '';
            };

            var setAdKeyword = function () {
                var cpsMetaTags = getMetaTags(['ad_keyword','Slug']);
                if(cpsMetaTags.ad_keyword) {
                    adKeyword = cpsMetaTags.ad_keyword;
                }
                else if(cpsMetaTags.Slug) {
                    adKeyword = cpsMetaTags.Slug;
                }
                adKeywordValue = SEMI + 'keyword=' + adKeyword;
            }

            var getAdKeyword = function () {
                return adKeyword;
            }

            var getAdKeywordValue = function () {
                return adKeywordValue;
            }

            /**
             * Set the predicate string
             */
            var setPredicates = function () {
                for(var x in predicates) {
                    for(var n in predicates[x].rules) {
                        var numberOfMatches = -1;
                        var numberOfLists = predicates[x].rules[n].match.length - 1;
                        for (var j=0; j<=numberOfLists; j++) {
                            if (predicates[x].rules[n].match[j].test(contentMetaData)) {
                                numberOfMatches++;
                            } else {
                                // Must match each list as it's an AND operator
                                continue;
                            }
                        }
                        if (numberOfMatches == numberOfLists) {
                            if('!e' == predicates[x].rules[n].value) {
                                predicateKeyValues[predicates[x].key] = '!e=' + predicates[x].key;
                            } else {
                                predicateKeyValues[predicates[x].key] = predicates[x].key + '=yes';
                            }
                        }
                    }
                }
                for(var key in predicateKeyValues) {
                    predicateString += ';' + predicateKeyValues[key];
                }
            };
            
            var lookupSlot = function(slotName){
                var i = 0,
                    len = slotNameLookupTable.length,
                    slot = null;
                for(i; i<len; i++){
                    if(slotName === slotNameLookupTable[i]['slotId']){
                        slot = slotNameLookupTable[i]['adId'];
                    }
                }
                if (slot !== null) {
                    var module = document.getElementById(ID_START+slotName);
                    if (module !== null) {
                        module.id = ID_START+slot;
                        return slot;
                    }
                }
                return slotName;
            };

            /**
             * Set the uid string
             */
            var setUid = function () {
                var uid = /[?|&]zone=preview&uid=([0-9a-fxA-FX]{26})/.test(window.location.search);
                if(uid) {
                    uidString = ';uid=' + RegExp.$1;
                    if ('3pt_zone_file' == config[ZONE_VERSION] || 'test_zone' == config[ZONE_VERSION]) {
                        config[ZONE_VERSION] = 'preview';
                    } else {
                        config[ZONE_VERSION] += '_preview';
                    }
                    glow.ready(function(){
                        var filteredLinks = glow.dom.get('a').filter(function(i){
                            return (this.href && this.href.indexOf('#') != 1 && this.href.indexOf('bbc.co') != -1);
                        });
                        glow.events.addListener(filteredLinks, 'click', previewClickHandler);
                    });
                }
            };

            // Built to overwrite zone with royal wedding zone BBCCOM-373
            // Add additional keyword overrides to the keywordZoneOverrides {}
            var setKeywordOverrideZones = function() {
                for (var key in keywordZoneOverrides) {
                    if(key === getAdKeyword()) {
                        zoneData.zone = keywordZoneOverrides[key];
                    }
                }
            };

            var previewClickHandler = function(e){
                e.stopPropagation();
                var location = e.attachedTo.href;
                var uid = 'zone=preview&' + uidString.split(';')[1];
                if(location.indexOf('?') == -1){
                    location += '?' + uid;
                } else {
                    if(location.indexOf('#') != -1) {
                        location = location.substring(0, location.indexOf('#')) + '&' + uid + location.substring(location.indexOf('#'))
                    } else {
                        location += '&' + uid;
                    }
                }
                window.location = location;
                return false;
            };

            var loadGPTSDK = function(){
                // Load the library, asynchronously.
                var gads = document.createElement('script');
                gads.async = true;
                gads.type = 'text/javascript';
                gads.src = 'http://www.googletagservices.com/tag/js/gpt.js';
                var node = document.getElementsByTagName('script')[0];
                node.parentNode.insertBefore(gads, node);
                googleGPTSDKLoaded = true;
            };

            /**
             * Get the predicate string
             */
            var getPredicates = function () {
                return predicateString;
            };

            var configure = function (data) {
                for (var id in data) config[id] = data[id];
            };

            var getBody = function () {
                if (BODY == undefined) {
                    BODY = glow.dom.get("body");
                }
                return BODY;
            };

            var getAdInfo = function (slot) {
                if (typeof(AD_INFO[slot]) != "undefined") {
                    // Standard lookup
                    return AD_INFO[slot];
                } else if (slot.indexOf('_') !== -1) {
                    // Wildcard catch-all eg module_1234 ==> module
                    return AD_INFO[slot.slice(0,slot.lastIndexOf('_'))];
                } else {
                    // Slot not found - close slot
                    config[slot] = NO;
                    return AD_INFO['not_found'];
                }
            };

            var loadInterstitial = function (bodyClass) {
                config['interstitial'] = YES;
                // Add class to body tag to hide the top mast for IE6
                BBC.adverts.addBodyClass('slot_interstitial');
                BBC.adverts.addBodyClass('slot_interstitial_' + bodyClass);
                // Show the interstitial ad
                glow.dom.get('#'+ID_START+'int_container').removeClass(DISPLAY_NONE);
                // Add event listener and set the timeout to close the ad
                glow.events.addListener('#'+ID_START+'int_link', 'click', BBC.adverts.closeInterstitial);
                setTimeout(closeInterstitial, 8000);  // 7 sec + 1 sec preparation
            };

            var closeInterstitial = function () {
                if (isCloseCreative('leaderboard')) {  // BBCCOM-1564 & BBCCOM-2214
                    // Only close leaderboard div if no leaderboard returned
                    BBC.adverts.close('leaderboard');
                } else {
                    // Leaderboard is present, hide interstitial
                    glow.dom.get('#'+ID_START+'int_container').addClass(DISPLAY_NONE);
                }
                BBC.adverts.close('interstitial');  // remove IE6 hack (see above)
            };

            var isRefreshSlot = function (slot) {
                return (typeof(zoneData.refresh) != 'undefined' && typeof(zoneData.refresh[slot]) != 'undefined' && zoneData.refresh[slot]) ? true : false;
            };

            var isCloseCreative = function (slot) {
                var img = glow.dom.get('#' + ID_START + slot + ' img');
                if (typeof(img) == 'undefined' || img === null) {
                    return false;
                }
                var imgSrc = img.attr('src');
                if (typeof(imgSrc) != 'undefined' && imgSrc !== null && imgSrc.match(DC_CLOSE_CREATIVE)) {
                    return true;
                }
                return false;
            };

            var arrayContains = function(a, obj) {
                var i = a.length;
                while (i--) {
                   if (a[i] === obj) {
                       return true;
                   }
                }
                return false;
            };

            var customCreatives = {
                'firstperson': {
                      imgUri:'http://'+document.domain+'/shared/img/bbccom/creative_first_person.jpg',
                      url :'/news/magazine-14633099'
                },
                'picturethis': {
                      imgUri:'http://'+document.domain+'/shared/img/bbccom/creative_picture_this.jpg',
                      url :'/news/magazine-14760628'
                },
                'livingonline': {
                      imgUri:'http://'+document.domain+'/shared/img/bbccom/creative_living_online.jpg',
                      url :'/news/magazine-14760626'
                },
                'alteredstates': {
                      imgUri:'http://'+document.domain+'/shared/img/bbccom/creative_altered_states.jpg',
                      url :'/news/magazine-14760627'
                },
                'uselection': {
                	imgUri:'http://'+document.domain+'/news/special/world/us_and_canada/11/us_election_banner/img/branding_uselections_976x48_4.gif',
                	url :'/news/world-us-canada-15949569'
                }
            };
            
            var writeCustomBranding = function(slot){

                var keyword = getAdKeyword(),
                    contentElement,
                    contentWrapper,
                    brandingElement,
                    anchor,
                    image,
                    creative,
                    brandUrl;

                switch(zoneData.zone)
                {
                    case "news_alteredstates_index":
                      keyword = (keyword=='') ? 'alteredstates' : '';
                      break;
                    case "news_firstperson_index":
                      keyword = (keyword=='') ? 'firstperson' : '';
                      break;
                    case "news_livingonline_index":
                      keyword = (keyword=='') ? 'livingonline' : '';
                      break;
                    case "news_picturethis_index":
                      keyword = (keyword=='') ? 'picturethis' : '';
                      break;
                }

                if(keyword !== '' && customCreatives.hasOwnProperty(keyword)) {
                    creative = customCreatives[keyword]['imgUri'];
                    brandUrl = customCreatives[keyword]['url'];
                    anchor = document.createElement("a");
                    anchor.href = brandUrl;
                    brandingElement = document.createElement("div");
                    brandingElement.className = "bbccom_custom_branding";
                    image = document.createElement("img");
                    image.src = creative;
                    anchor.appendChild(image);
                    brandingElement.appendChild(anchor);

                    if(bbc.fmtj.page.assetType == 'media_asset' && slot == 'mpu'){
                        contentWrapper = document.getElementById('content-wrapper');
                        contentElement = document.getElementById('main-content');
                        contentWrapper.insertBefore(brandingElement,contentElement);
                    } else if (slot == 'leaderboard') {
                        if(bbc.fmtj.page.siteVersion == "4"){
                            return false;
                        } else {
                            document.write('<div class="bbccom_custom_branding"><a href="'+brandUrl+'"><img src="'+creative+'"/></a></div>');
                        }
                    }
                }

            };
            
            /**
             * Get the companion slots that should be loaded when an 
             * EMP player triggers companion ads.
             * 
             * Takes the companionId to augment the companion Dom Id.
             * 
             * Uses the assetType from bbc.fmtj.page to decide.
             * @param string companionId
             * @return array
             */
            var getCompanionSlots = function (companionId) 
            {
            	var slots = null;
            	// We need a copy of the companionPages object rather than a reference.
            	// A simple function to copy an array of ad slots.
            	var copy = function (companionSlots){
            		result = [];
            		for(var i = 0; i < companionSlots.length; i++) {
            			result[i] = {};
            			result[i].slot = companionSlots[i].slot;
            			result[i].size = companionSlots[i].size;
            			result[i].type = companionSlots[i].type;
            			result[i].domId = companionSlots[i].domId;
            		}
            		return result;
            	};
            	if (isJsObject() && 'undefined' != typeof(bbc.fmtj.page.assetType)) {
            		if ('undefined' != typeof(companionPages[bbc.fmtj.page.assetType])) {
            			slots = copy(companionPages[bbc.fmtj.page.assetType]);
            		} else {
            			slots = copy(companionPages['default']);
            		}
            	} else {
            		slots = copy(companionPages['default']);
            	}
            	// Now we have the companion slots append the companionId to the div.
            	if ('undefined' != companionId) {
            		// loop throught the slots and find the correct index
            		for(var i = 0; i < slots.length; i++) {
            			if (slots[i].slot == 'companion') {
            				slots[i].domId = slots[i].domId + '_' + companionId;
            			}
            		}
            	}
            	return slots;
            };
            
            /**
             *  Encode the companion slots as text
             *  @param array companionSlots
             *  @return string
             */
            var encodeCompanionSlots = function (companionSlots) {
            	var companionVars = '';
            	for(var i = 0; i < companionSlots.length; i++) {
            		var str = '';
            		str += 'slot:' + companionSlots[i].slot + '|';
             		str += 'size:' + companionSlots[i].size + '|';
            		str += 'type:' + companionSlots[i].type + '|';
            		str += 'domId:' + companionSlots[i].domId + ';';
            		companionVars += str;
            	}
            	return companionVars;
            };
            /**
             * decode the companion slots
             * @param string companionVars
             * @return array
             */
            var decodeCompanionSlots = function (companionVars) {
            	var companionSlots = [];
            	var slots = companionVars.split(';');
            	for(var i = 0; i < slots.length; i++){
    	        	if ('' != slots[i]) {
    		        	companionSlots[i] = {};
    		        	var vars = slots[i].split('|');
    		        	for (var j = 0; j < vars.length; j++) {
    		        	   var tmp = vars[j].split(':');
    		        	   companionSlots[i][tmp[0]] = tmp[1];
    		        	}
    	        	}
            	}
            	return companionSlots;
            };

            /**
             * Define the companion slots for an EMP player. 
             * Called before the player is written to the page.
             * This overwrites the existing tag and calls defineGoogleSlot
             * @param array slots
             */
            var defineCompanionSlots = function (slots)
            {
            	for (var i = 0; i < slots.length; i++) {
            		var slot = slots[i].slot;
            		var domId = slots[i].domId;
            		var opts = {
            		    slotDomId: domId
            		};
            		var element = glow.dom.get('#' + domId);
            		// Make sure that the dom element is present and we only have 1...
            		if (element.length == 1) {
	            		// Reset the slots that we need.
	            		resetAdSlot(slot, opts);
	            		// Write the ad label
	            		writeAdLabel(slot, opts);
	            		// Definte the google slot.
	            		defineGoogleSlot(slot, opts);
            		}
            	}
            };
            
            /**
             * Define an ad slot to work with Google Publisher Tag.
             * Get the slot and add an inner div to hold an iframe.
             * @param string slot
             * @param object opts
             */
            var defineGoogleSlot = function(slot, opts){
            	var domId = opts.slotDomId;
        		
        		if(typeof window.googletag != 'undefined'){

                    var slot_size = getAdvertSize(slot);
                    var width = parseFloat(slot_size.slice(0,slot_size.indexOf('x')));
                    var height = parseFloat(slot_size.slice(slot_size.indexOf('x')+1));
                    
                    // The dom element for the slot.
                    var element = glow.dom.get('#' + domId);
                    // Make sure we only have one element
                    if (element.length == 1) {
	                    var innerSlotId = domId + "_inner";
	                    
	                    // This inner div holds the iframe.
	                    var companionHolderDiv = glow.dom.create("<div></div>");
	                    companionHolderDiv.attr("id", innerSlotId);
	                    companionHolderDiv.attr("class", "bbccom_companion_inner");
	                    element.append(companionHolderDiv);
	
	                    googletag.cmd.push(function(){
	                        var googleSlot = googletag.defineSlot('/%network%/%unit-path%',[width, height],innerSlotId);
	                        googleSlot.addService(googletag.companionAds());
	                        googletag.enableServices();
	                        googletag.display(innerSlotId);
	                    });
                    }
                }
            };
            
            /**
             * Given a slot this method will remove all content, so an ad can then be reinserted
             * Used with the companion MPU.
             * @param string slot
             * @param object opts
             */
            var resetAdSlot = function (slot, opts)
            {
            	var domId = opts.slotDomId;
            	// get the dom element for the slot.
            	var element = glow.dom.get('#' + domId);
            	// remove the content from the dom.
            	element.empty();
            	// Clear all the classes from the slot
            	element.removeAttr('class');
            	element.addClass(ID_START + slot);
            	element.addClass('bbccom-advert');
            	element.addClass('bbccom_display_none');
            	// then remove any extra classes from the body tag.
            	if (slot == 'mpu') {
            		getBody().removeClass('bbcdotcomAdvertsResetMpu');
            	}
            };
            
            /**
             * Write the advertisement label to the top of the ad slot.
             * @param string slot
             * @param object opts
             */
            var writeAdLabel = function (slot, opts)
            {
            	var domId = opts.slotDomId;
            	var element = glow.dom.get('#'+ domId);
            	var adLabel = glow.dom.create(AD_LABEL);
            	element.append(adLabel);
            };
            
            /**
             * Checks to see whether the contents of a companion slot element have been modified.
             * @param DomNode element
             * @param object companionSlot
             */
            var checkForDomChanged = function(element, companionSlot){
                var el = element,
                    initialMarkup = element.innerHTML,
                    threshold = {cur:0,max:50},
                    slideFunc = function(){
                	// 'this' is the element, as this call back uses .apply()
                    	BBC.adverts.slideCompanion(element, companionSlot);
                	},
                    intervalFunc = function(el){
                        if(initialMarkup != el.innerHTML){
                        	// Call the slide function
                            slideFunc();
                            // Cancel the interval
                            clearInterval(interval);
                        } else {
                            // increment the cur counter until the threshold, then cancel the interval
                            (threshold.cur != threshold.max) ? threshold.cur ++ : clearInterval(interval);
                        }
                    },
                    interval = setInterval(function(){intervalFunc(element);},500);
                    
                if(typeof BBC.adverts.domContentsChanged == 'undefined' || typeof BBC.adverts.domContentsChanged != 'Array'){
                    BBC.adverts.domContentsChanged = [];
                }

                BBC.adverts.domContentsChanged.push({
                    "element" : el,
                    "threshold" : threshold
                });
            };
            
            /**
             * Slide open a companion slot after the ad has loaded.
             * @param DomNode element
             * @param object opts
             */
            var slideCompanion = function(element, companionSlot){
            	var dimensions = companionSlot.size.split('x');
            	var height = parseInt(dimensions[1]) + 24;
                if ('undefined' == typeof(height)) {
                	height = 84;
                }
                // Add the class to the body
                getBody().addClass(BODY_CLASS_PREFIX + companionSlot.slot);
                
                // Now add the classes to the slot 
                var el = glow.dom.get(element);
                el.removeClass('bbccom_display_none');
                el.addClass('bbccom_visibility_show');
                
                // animate the slot opening.
                glow.anim.css(
                    el,0.5,
                    {
                        height: {from:0, to:height}
                    },
                    {
                        tween: glow.tweens.easeOut()
                    }
                ).start();
            };
            
            /**
             * Attach > IE9 Pinned site bar
             */
            var attachIEPinBar = function () {
            	if (typeof(window.external) === 'undefined' && typeof(window.external.msIsSiteMode) === 'undefined') { return };
                var body = document.getElementsByName('body');

                glow.ready(function(){
            		if (typeof window.external.msIsSiteMode !== 'undefined' && !window.external.msIsSiteMode() && BBC.adverts.readCookie('hideIePinnedSite') !== '1' ) {
		                var bar = document.createElement('div');
		        	    bar.id = 'iePinnedSiteBar';
		        	    var barHTML = '<div id="iePinWrap"><p>Pin BBC to your taskbar by dragging this icon <img class="msPinSite" width="64" height="64" src="' + BBC.adverts.getImgRoot() + 'bbc_icon_64px.gif" alt="BBC logo" /> to the bottom of the screen</p><a id="iePinClose">Close<span></span></a></div>';
		        	    bar.innerHTML = barHTML;
		        	    document.body.insertBefore(bar, document.body.firstChild);
		        	    var closeSpan = document.getElementById('iePinClose');
		        	    glow.events.addListener(closeSpan, 'click', function () {
		        	        document.getElementById('iePinnedSiteBar').parentNode.removeChild(document.getElementById('iePinnedSiteBar'));
		        	        BBC.adverts.createCookie('hideIePinnedSite', '1', 365);
		        	    });
	                }
            	});
            };

            return {
                init: function (data) {
                    configure(data);
                    var metaData = getMetaTags(['Headline','Description']);
                    contentMetaData = getPageTitle() + metaData.Headline + ' ' + metaData.Description;
                    setPredicates();
                    setUid();
                    setAdKeyword();
                    setV6Gvl3();
                    //BBC.adverts.setAutoAdRefresh();
                    loadZonefile();
                    attachIEPinBar();
                },
                
                /*
                 * setAutoAdRefresh refreshes the ads on the page with new ones
                 */
                setAutoAdRefresh: function () {
                    var slot = glow.dom.get('#bbccom_mpu');
                    if(0 < slot.length) {
                        //alert(slot.width() + 'x' + slot.height());
                    }
                    slot = glow.dom.get('#bbccom_leaderboard');
                    if(0 < slot.length) {
                        //alert(slot.width() + 'x' + slot.height());
                    }
                    setTimeout("BBC.adverts.setAutoAdRefresh()", 10000);
                },
                setGvl3: function (gvl3) {
                    isGvl3 = gvl3;
                },
                setAdsBlocked: function (adsBlocked) {
                    ADS_BLOCKED = adsBlocked;
                },
                getConfig: function (key) {
                    return config[key];
                },
                getZoneData: function () {
                    return zoneData;
                },
                getAdvertTag: function (slot,keyValues,type,dependentSlot) {
                    return getAdvertTag(slot,keyValues,type,dependentSlot);
                },
                getAdvertLabel: function (slot) {
                    return getAdvertLabel(slot);
                },
                getAdKeyword: function() {
                    return getAdKeyword();
                },
                getMetaData: function (zoneMeta) {
                    var meta_object, meta_value, meta_data = {};
                    for (var i = 0; i < zoneMeta.length; i++) {
                        if ((meta_object = window[ID_START + zoneMeta[i]])) {
                            for (var key in meta_object) {
                                meta_value = escape(meta_object[key].replace(/\s+/g, ''));
                                if (meta_value.length > 0 && meta_value.length <= 64) {
                                    meta_data[zoneMeta[i] + "_" + key] = meta_value;
                                }
                            }
                        }
                    }
                    return meta_data;
                },
                getSectionPath: function () {
                    // Change news URL used for zone targeting to news section
                    var path = sectionUrl.replace(BBC_FMTJ_PAGE_JS_URL_MAP.news.old, BBC_FMTJ_PAGE_JS_URL_MAP.news.refresh);
                    // Change sport URL used for zone targeting to sport section
                    path = path.replace(BBC_FMTJ_PAGE_JS_URL_MAP.sport.old, BBC_FMTJ_PAGE_JS_URL_MAP.sport.refresh);
                    return path.substring(1).replace(/\/[0-9]*$/, "");
                },
                setZone: function (zones) {
                    var url = getUrl();
                    var site = config[DOMAIN];
                    var referrer = config[REFERRER];
                    var data = {
                        keyValues: {},
                        slots: {}
                    };
                    var process = function (base, level) {
                        for (var key in level.data) {
                            if (key === KEY_VALUES) {
                                for (var kw in level.data.keyValues) {
                                    data.keyValues[kw] = level.data.keyValues[kw];
                                }
                            } else if (key == SLOTS) {
                                for (var slot in level.data.slots) {
                                    data.slots[slot] = level.data.slots[slot];
                                }
                            } else {
                                data[key] = level.data[key];
                            }
                        }
                        if (level.zones) {
                            var ct = level.zones.length;
                            var pattern;
                            while (ct--) {
                                pattern = new RegExp(base+level.zones[ct].uri, "g");
                                if (pattern.test(url)) {
                                    return process(base + level.zones[ct].uri, level.zones[ct]);
                                }
                            }
                        }
                        return data;
                    }
                    if (site.indexOf('.external.') !== -1) {
                        // External eg winterolympics.external.bbc.co.uk
                        url = '/'+site+url;
                    } else if (site.indexOf('bbcearth.com') !== -1) {
                        // BBCEarth.com  /www.bbcearth.com/widget/
                        url = '/'+site+url;
                    } else if ((url == '/')
                        || url.indexOf('/wwhomepage/') !== -1
                        || url.indexOf('/wwhomepageus/') !== -1
                        || url.indexOf('/wwhomepageinternational/') !== -1
                        || url.indexOf('/internationalhomepage/') !== -1) {
                        // V3 Homepage.  Supports live, stage, test, int and sandbox.
                        url = '/home/';
                    }
                    zoneData = zones.process(process(EMPTY, zones.zones), site, url, referrer);
                    setKeywordOverrideZones();
                },
                addKeyValue: function(key, value) {
                    zoneData.keyValues[key] = value;
                },                
                checkWrite: function (slot) {
                    if (ADS_BLOCKED === false && zoneData.ads) {
                        if((!zoneData.slots || (zoneData.slots[slot] != false)) && config[slot] !== NO) {
                            config[slot] = YES;
                            return true;
                        }
                        else hide(slot);
                        return false;
                    }
                    else hide(slot);
                    return false;
                },
                writeAttr: function (elementAttr, elementId) {
                    if (ADS_BLOCKED === false && zoneData.ads) {
                        if (!zoneData.styles || (typeof(zoneData.styles[elementId]) == "undefined")) {
                            return false;
                        }
                        return zoneData.styles[elementId][elementAttr];
                    }
                    return false;
                },
                hasStyles: function () {
                    if (!zoneData.styles || (typeof(zoneData.styles) == "undefined")) {
                        return false;
                    }
                    return true;
                },
                show: function (slot, companionId, newClass) {
                    if (moveAdCallback !== undefined) {
                        moveAdCallback();
                        moveAdCallback = undefined;
                    }

                    writeCustomBranding(slot);

                    if (config[slot] === YES) {
                        if (isCloseCreative(slot)) {  // BBCCOM-1564
                            if (slot == 'leaderboard' && config['interstitial'] === YES) {   // BBCCOM-2214
                                // When slot is a leaderboard and there is an interstitial, do not close, ensure leaderboard open.
                            } else {
                                BBC.adverts.close(slot);
                                return false;
                            }
                        }
                        if (mastHeadPresent && pageVersion === SITEVERSION) {
                            newClass = slot + cssPostFix[0];
                        } else if (mastHeadPresent && pageVersion !== SITEVERSION) {
                            newClass = slot + cssPostFix[1];
                        } else {
                            newClass = slot + cssPostFix[2];
                        }
                        var id;
                        if (companionId == undefined) {
                            id = ID_START + slot;
                        } else {
                            id = companionId;
                        }
                        if(document.getElementById(id) !== null && 'undefined' != document.getElementById(id)){
                            // Remove 'hide' class and append new class.  Note if getElementById(id)=undefined then moveAd() must have been run.
                            if( 'bbccom_visibility_show' != document.getElementById(id).className) {
                                document.getElementById(id).className = document.getElementById(id).className.replace(DISPLAY_NONE,'')+' '+newClass;
                            } else {
                                document.getElementById(id).className = document.getElementById(id).className + ' ' + newClass;
                            }
                        }
                        // v2 Homepage - adding comment to pull static deployment
                        var regMatch = slot.match(/^module_([a-z]+)$/);
                        if(regMatch && document.getElementById(ID_START + id) != null) {
                            document.getElementById(ID_START + id).className = "bbccom_module";
                        }
                        return true;
                    }
                    return false;
                },
                close: function (slot) {
                    config[slot] = NO;
                    hide(slot);  // BBCCOM-1118 refreshAds()
                    getBody().removeClass(BODY_CLASS_PREFIX + slot);

                    // Homepage
                    var adHideClass;
                    switch(slot) {
                        case "leaderboard":
                            adHideClass = "bbcdotcomAdvertsResetTop";
                            break;
                        case "bottom":
                            adHideClass = "bbcdotcomAdvertsResetBottom";
                            break;
                        case "mpu":
                            adHideClass = "bbcdotcomAdvertsResetMpu";
                            break;
                        default:
                            adHideClass = "";
                    }
                    getBody().addClass(adHideClass);
                },
                addBodyClass: function (value) {
                    getBody().addClass(ID_START + value);
                },
                moveAd: function (slot,moveTo) {
                    moveAdCallback = function(){
                        if (glow.dom.get("#" + ID_START + moveTo).length > 0) {
                            var source = glow.dom.get('#' + ID_START + slot);
                            var dest = glow.dom.get('#' + ID_START + moveTo);
                            var dcScript = glow.dom.get('#' + ID_START + slot + ' script');
                            source.get("script").remove();
                            dest.removeClass(DISPLAY_NONE);
                            if(typeof(dcScript) != 'undefined' && typeof(dcScript[1]) != 'undefined') {
                                dest.html(source.html()+'<span class="bbccom_display_none bbccom_script_url">'+dcScript[1].getAttribute('src')+'</span>');
                            } else {
                                dest.html(source.html());
                            }
                            glow.dom.get('#' + ID_START + slot).remove();
                        }
                    }
                    if(null != document.getElementById(slot)){
                        if(this.adIsmovable(slot)){
                            moveAdCallback();
                        }
                    } else {
                        var zoneData = this.getZoneData();
                        if(this.adIsmovable(slot)){
                            hide(slot);
                            movable.push({source:slot, destination:moveTo});
                        }
                    }
                },
                moveCallback:function(slot){
                    var len = movable.length,
                        i = 0;
                    for(i;i<len;i++){
                        if(movable[i].destination == slot){
                            this.moveAd(movable[i].source, movable[i].destination);
                        }
                    }
                },
                adIsmovable:function(slot){
                    var movable = false;
                    if(typeof zoneData.movable != 'undefined' && typeof zoneData.movable.leaderboard != 'undefined'){
                        if(zoneData.movable[slot] == true){
                            movable = true;
                        }
                    }
                    return movable;
                },

                /**
                 * Triggered by page event
                 */
                refreshAds: function (slots) {
                    var timestamp = Math.round(new Date().getTime()/1000);
                    if (timestamp < (refreshTimestamp + refreshTTL)) {
                        return false;
                    }
                    if (typeof(slots) == 'undefined' && typeof(zoneData.refresh) != "undefined" ) {
                        slots = [];
                        for(var s in zoneData.refresh) {
                            slots.push(s);
                        }
                    }
                    var iframe;
                    if (typeof(slots) == 'undefined' || slots.length == 0) {
                        return false;
                    }
                    ord = '',
                    ordLength = 14;
                    while (ordLength--) ord += (Math.floor(Math.random() * 10));
                    for(var s in slots) {
                        if (isRefreshSlot([slots[s]])) {
                            // Ad slot is permitted to be refreshed
                            config[slots[s]] = YES;  // reset status of slot
                            BBC.adverts.show(slots[s]);  // reset status of slot
                            iframe = glow.dom.get('#'+ID_START+slots[s]+'_iframe');
                            iframe.attr('src', getAdvertTag(slots[s], {}, 'iframeRefresh'));
                        }
                    }
                    refreshTimestamp = timestamp;
                    return true;
                },
                sponsorSharetools: function (sharetools, ids) {
                    if(!(typeof sharetools === 'object' && sharetools.hasOwnProperty('VERSION') && parseFloat(sharetools.VERSION) >= 1) || typeof ids === 'undefined' || ids.length === 0) {
                        return;
                    }
                    sharetools.onReady = function() {
                        if(!(sharetools.hasOwnProperty('sharePanel') && sharetools.hasOwnProperty('toolbars'))) {
                            return;
                        }
                        var footer = glow.dom.get(sharetools.sharePanel.getFooter());
                        if(!footer) {
                            return;
                        }
                        sharetools.sharePanel.onShow = function () {
                            var toolbars = sharetools.toolbars,
                            toolbarId,
                            iframeAd,
                            toolbarDom,
                            prop;
                            for (prop in toolbars) {
                                if(arrayContains(ids, prop) && toolbars[prop].isPanelShowing) {
                                    toolbarId = toolbars[prop].id;
                                    break;
                                }
                            }
                            if(!toolbarId) {
                                return;
                            }
                            toolbarDom = glow.dom.get('#'+toolbarId);
                            if(!(iframeAd = toolbarDom.data('sponsor'))) {
                                switch(toolbarId) {
                                    case ids[0]:
                                        iframeAd= getAdvertTag("module_page-bookmark-links-top", {
                                            is_module: "true",
                                            module: "page-bookmark-links-top"
                                        }, "iframe", "module_page-bookmark-links-top");
                                        break;
                                    case ids[1]:
                                        iframeAd= getAdvertTag("module_page-bookmark-links", {
                                            is_module: "true",
                                            module: "module_page-bookmark-links"
                                        }, "iframe", "module_page-bookmark-links-footer");
                                        break;
                                }
                                toolbarDom.data('sponsor', iframeAd);
                            }
                            footer.html(iframeAd );
                        };
                        sharetools.sharePanel.onAfterHide = function () {
                            footer.empty();
                        };
                    };
                },
                setPageVersion: function (version) {
                    mastHeadPresent = true;
                    if (version === "4") {
                        pageVersion = version;
                    }
                },
                getPageVersion: function () {
                    return pageVersion;
                },
                empCompanion: function () {
                    var prerollURL = getAdvertTag("preroll");
                    return prerollURL;
                },
                /* Deprecated since VAST upgrade */
                empCompanionResponse: function (src, companionId) {
                    if (companionId == undefined) {
                        companionId = "bbccom_companion";
                    }
                    var slot = "companion";
                    config[slot] = YES;
                    var companionHolderDiv = document.createElement("div");
                    companionHolderDiv.setAttribute("class", "comp_banner_holder");
                    var companionHolder = document.createElement("iframe");
                    companionHolder.setAttribute("width", "300");
                    companionHolder.setAttribute("height","60");
                    companionHolder.setAttribute("scrolling", "no");
                    companionHolder.setAttribute("frameBorder", "no");
                    companionHolder.setAttribute("src", src);
                    var parentDiv = document.getElementById(companionId);
                    parentDiv.className = "bbccom_companion bbccom_display_none";
                    companionHolderDiv.appendChild(companionHolder);
                    parentDiv.appendChild(companionHolderDiv);
                    glow.anim.slideDown(parentDiv, 0.5,{onComplete:function(el){
                        parentDiv.className = "bbccom_companion bbccom_visibility_show";
                    }
                    });
                  
                },
                createElement: function(element,attributes) {
                    element = document.createElement(element);
                    for (var x in attributes){
                        element.setAttribute(x,attributes[x]);
                    }
                    return element;
                },
                /* Deprecated. We are using Google GPT and VAST now. */
                empSlideCompanionResponse: function (src, companionId) {
                    if (companionId == undefined) {
                        companionId = "bbccom_companion";
                    }
                    // wrapper for iframe
                    var companionHolderDiv = this.createElement("div",{'class':"comp_banner_holder"});
                    var attributes = {
                        width:300,
                        height:60,
                        scrolling:"no",
                        frameBorder:"no",
                        src:src
                    };
                    // Ad iframe
                    var companionHolder = this.createElement("iframe",attributes);
                    // still hidden companion is now ready
                    companionHolderDiv.appendChild(companionHolder);
                    // change parent's class
                    var parentDiv = document.getElementById(companionId);
                    parentDiv.className = "companion_parent bbccom_visibility_show";
                    // define slideDown
                    var slideDown = glow.anim.css(parentDiv,0.5,{height: {from:0, to:84}}, {tween: glow.tweens.easeOut()});
                    // onComplete of slideDown attach ready companion
                    glow.events.addListener(slideDown,"complete", function(event){
                        parentDiv.appendChild(companionHolderDiv);
                    });
                    // slide the wrapper
                    slideDown.start();
                },
                adTextWrapper: function(){
                    var div = document.createElement("div");
                    div.className = "bbccom_text";
                    div.innerHTML = "Advertisement";
                    return div;
                },
                removeCompanionBodyClasses: function(slot,width){
                    for (var x in companion_classes[slot]){
                        var className = BODY_CLASS_PREFIX + companion_classes[slot][x];
                        if (width==0 || (x != width && x!='def')){
                            if (getBody().hasClass(className)){
                                getBody().removeClass(className);
                            }
                        }
                    }
                },
                replaceAd: function(slot,src){
                    //TODO GET EMP to deliver size separately not as part of src
                    // parse the slot size from EMP response
                    var sz_start = src.indexOf('sz');
                    var tmp_str = src.slice(sz_start);
                    var sz_end = sz_start + tmp_str.indexOf(';');
                    var sz = src.slice(sz_start,sz_end);
                    var slot_size = sz.slice(3);

                    // check element on the page
                    var elId = "bbccom_"+slot;
                    var element =document.getElementById(elId);
                    var width = slot_size.slice(0,slot_size.indexOf('x'));
                    var height = slot_size.slice(slot_size.indexOf('x')+1);

                    var success = this.tryReplaceAd(slot,src,element,width,height);
                    //TODO get rid of _high from dom structure, MPU should be all the time bbccom_mpu
                    if (!success && slot == 'mpu') {
                        var elId = "bbccom_"+slot+'_high';
                        var element =document.getElementById(elId);
                        this.tryReplaceAd(slot,src,element,width,height);
                    }
                },
                tryReplaceAd: function (slot,src,element,width,height){
                    if (element !== null){
                        if ((width == 0) && (height == 0)) {
                            // Close all 0x0 slots
                            // second parameter is to override mpu_high
                            hide(slot,true);
                            this.removeCompanionBodyClasses(slot,width);
                        } else {
                            // remove all possible classes for the current slot
                            this.removeCompanionBodyClasses(slot,width);
                            // add class based on width of slot
                            if (companion_classes[slot][width] != '' && !getBody().hasClass(BODY_CLASS_PREFIX + companion_classes[slot][width])){
                                getBody().addClass(BODY_CLASS_PREFIX + companion_classes[slot][width]);
                            }
                            var attributes = {
                                width:width,
                                height:height,
                                scrolling:"no",
                                frameBorder:"no",
                                src:src
                            };
                            var companionHolder = this.createElement("iframe",attributes);
                            element.innerHTML="";
                            element.appendChild(this.adTextWrapper());
                            element.appendChild(companionHolder);
                        }
                        return true;
                    } else return false;
                },
                setScriptRoot: function(scriptRoot){
                    SCRIPT_ROOT = scriptRoot;
                },
                setImgRoot: function(imgRoot){
                    IMG_ROOT = imgRoot;
                },
                setVideoAds: function(jsonObject){
                    var videoTag = this.createElement("video",{'controls':"controls",'src':jsonObject});
                    var parentDiv = document.getElementById('bbccom_video');
                    parentDiv.appendChild(videoTag);
                },
                getNewsGvl3: function() {
                    return isV6Gvl3;
                },
                getV6Gvl3: function() {
                    return isV6Gvl3;
                },
                getScriptRoot: function(){
                    return SCRIPT_ROOT;
                },
                getImgRoot: function(){
                    return IMG_ROOT;
                },
                getPredicates: function () {
                    return getPredicates();
                },
                getSectionUrl: function () {
                    return sectionUrl;
                },
                getConfig: function () {
                    return config;
                },
                getAdSlotsRegistered: function () {
                    return adSlotsRegistered;
                },
                getAdOids: function() {
                    var oidArray = [];
                    for(var i=0, n = adSlotsRegistered.length; i < n; i++) {
                        var slot = adSlotsRegistered[i];
                        var oid = getAdInfo(slot).oid;
                        var regEx = new RegExp(/.*{([0-9])}.*/);
                        var suffixLength = regEx.exec(oid);
                        if (null !== suffixLength) {
                            oid = oid.replace(/{[0-9]+}/, slot.substring(slot.length - suffixLength[1]));
                        }
                        oidArray.push(oid);
                    }
                    return oidArray.join('|');
                },

                createCookie: function (name,value,days) {
                	if (days) {
                		var date = new Date();
                		date.setTime(date.getTime()+(days*24*60*60*1000));
                		var expires = "; expires="+date.toGMTString();
                	}
                	else var expires = "";
                	document.cookie = name+"="+value+expires+"; path=/";
                },

                readCookie: function (name) {
                	var nameEQ = name + "=";
                	var ca = document.cookie.split(';');
                	for(var i=0;i < ca.length;i++) {
                		var c = ca[i];
                		while (c.charAt(0)==' ') c = c.substring(1,c.length);
                		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
                	}
                	return null;
                },

                eraseCookie: function (name) {
                	BBC.adverts.createCookie(name,"",-1);
                }, 

                write: write,
                loadGPTSDK: loadGPTSDK,
                getCompanionSlots: getCompanionSlots,
                encodeCompanionSlots: encodeCompanionSlots,
                decodeCompanionSlots: decodeCompanionSlots,
                defineCompanionSlots: defineCompanionSlots,
                defineGoogleSlot: defineGoogleSlot,
                // for back compatibility
                defineGoogleUnit: defineGoogleSlot,
                resetAdSlot: resetAdSlot,
                checkForDomChanged: checkForDomChanged,
      			slideCompanion: slideCompanion,
                loadInterstitial: loadInterstitial,
                closeInterstitial: closeInterstitial
            };
        }();
    }
});

bbcdotcom.av = {};


bbcdotcom.av.emp = {
    configureAll:function() {
        // STUBBING OUT TO MAKE WAY FOR NEW WAY TO SET UP
        // When this has been released raise a ticket with emp to remove this call in emp_load_sjson.inc file
    }
};

bbcdotcom.av.emp.adverts = {
    companion: {
        getCompanionId:function(empId){
            var parts = empId.split('-'),
            companionId = '';
            if(parts.length == 1){
                parts = empId.split('_');
            }
            if(parts.length >= 2){
                companionId = parts[1];
            } else {
                companionId = null;
            }
            return companionId;
        },
        // sets the player vars so we can check for changes then the playlist starts
        setFlashVars: function (playerInstance, companionSlots) {
        	if ('undefined' != typeof(companionSlots) && companionSlots.length > 0) {
        		var companionFlashVars = BBC.adverts.encodeCompanionSlots(companionSlots);
        		playerInstance.set('companions', companionFlashVars);
        		for(var i = 0; i < companionSlots.length; i++) {
        			playerInstance.set('companion' + (i+1) + 'Size', companionSlots[i].size);
        	        playerInstance.set('companion' + (i+1) + 'Type', companionSlots[i].type);
        	        playerInstance.set('companion' + (i+1) + 'Id', companionSlots[i].domId);
        		}
        	}
        }
    },
    
    playerBeforeEachWrite:  function(playerInstance){
        var companionId = bbcdotcom.av.emp.adverts.companion.getCompanionId(playerInstance.getDomId());
        // define the flash vars in the EMP player
        playerInstance.set('preroll', BBC.adverts.empCompanion());
        // Define the companion slots for the player
        var companionSlots = BBC.adverts.getCompanionSlots(companionId);
        bbcdotcom.av.emp.adverts.companion.setFlashVars(playerInstance, companionSlots);
        // Set the companion slots up.
        BBC.adverts.defineCompanionSlots(companionSlots);
    }
};

if('undefined' != typeof embeddedMedia && 'undefined' != typeof embeddedMedia.eachWrite) {
    embeddedMedia.eachWrite(bbcdotcom.av.emp.adverts.playerBeforeEachWrite);
}

bbcdotcom.av.emp.events = {
    register:{
        onPlaybackProgress:function(evt){
            // this has to act as the play event because
            // most of the metadata that we need isn't actually
            // known when the media is initially played
            if(this.evLock){
                this.evLock = false;
                // get the media kind from the item
                this.call('getItem', [this.domId], "getItemKind");

                this.metadata.mediaLength = evt.duration;
                this.metadata.mediaId = this.attrs.id;
                this.metadata.adId = null;

                //call mediaStarted event here
                bbcdotcom.av.emp.analytics.callback("mediaStarted", this.metadata);

                //now we have to call the mediaPlaying event
                this.metadata.mediaOffset = 0;
                // call the mediaPlaying
                bbcdotcom.av.emp.analytics.callback("mediaPlaying", this.metadata);

            } else {
                // refresh the item kind
                this.metadata.mediaOffset = evt.progress;
                // call on playback progress
            }

        },
        onPlaylistStarted:function(evt){
            this.metadata.mediaName = evt.title;
            this.metadata.mediaPlayerName = evt.version;
            // This might be better as a loop reading from the config at the top but we only have two companions at the moment.
            if ('undefined' != this.vars.companions) {
            	var companionSlots = BBC.adverts.decodeCompanionSlots(unescape(this.vars.companions));
            	if ('undefined' != companionSlots && companionSlots.length > 0) {
            		for(var i = 0; i < companionSlots.length; i++) {
            			var element = document.getElementById(companionSlots[i].domId);
            			var companionSlot = companionSlots[i];
            			BBC.adverts.checkForDomChanged(element, companionSlot);
            		} 
            	}
            }
        },
        onPlaylistCompleted:function(evt){
            // call playlist completed
            bbcdotcom.av.emp.analytics.callback("playlistCompleted", this.metadata);
        },
        onMediaCompleted:function(evt){
            // once the media item is complete
            // we have to lock the event again
            this.evLock = true;
            bbcdotcom.av.emp.analytics.callback("mediaCompleted", this.metadata);
        },
        cueItem:function(evt){
            // refresh the item kind
            this.call('getItem', [this.domId], "getItemKind");
        }
    },
    playerBeforeEachWrite:function(playerInstance){
      playerInstance.onMediaPlayerInitialised = function(){
          for(var event in bbcdotcom.av.emp.events.register){
              playerInstance.evLock = true;
              playerInstance.register(event);
              playerInstance[event] = bbcdotcom.av.emp.events.register[event];
              playerInstance.getItemKind = function(item){this.metadata.mediaType = item.item.kind;};
              playerInstance.metadata = {};
          }
      };
    }
};

if('undefined' != typeof embeddedMedia && 'undefined' != typeof embeddedMedia.eachWrite) {
    embeddedMedia.eachWrite(bbcdotcom.av.emp.events.playerBeforeEachWrite);
}

bbcdotcom.av.emp.analytics = {
    callback:function(type, data){
        switch(type) {
            case "mediaStarted":
                startMovie(data);
                break;
            case "mediaPlaying":
                playMovie(data);
                break;
            case "mediaCompleted":
                stopMovie(data);
                break;
            case "playlistCompleted":
                endMovie(data);
                break;
        }
    }
};
