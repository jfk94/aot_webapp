/*
PluginDetect v0.8.0
www.pinlady.net/PluginDetect/license/
[ getVersion isMinVersion onWindowLoaded onDetectionDone ]
[ AdobeReader PDFreader(OTF & NOTF) ]
*/
var PluginDetect = {
    version: "0.8.0",
    name: "PluginDetect",
    openTag: "<",
    isDefined: function (b) {
        return typeof b != "undefined"
    },
    isArray: function (b) {
        return (/array/i).test(Object.prototype.toString.call(b))
    },
    isFunc: function (b) {
        return typeof b == "function"
    },
    isString: function (b) {
        return typeof b == "string"
    },
    isNum: function (b) {
        return typeof b == "number"
    },
    isStrNum: function (b) {
        return (typeof b == "string" && (/\d/).test(b))
    },
    getNumRegx: /[\d][\d\.\_,-]*/,
    splitNumRegx: /[\.\_,-]/g,
    getNum: function (b, c) {
        var d = this,
            a = d.isStrNum(b) ? (d.isDefined(c) ? new RegExp(c) : d.getNumRegx).exec(b) : null;
        return a ? a[0] : null
    },
    compareNums: function (h, f, d) {
        var e = this,
            c, b, a, g = parseInt;
        if (e.isStrNum(h) && e.isStrNum(f)) {
            if (e.isDefined(d) && d.compareNums) {
                return d.compareNums(h, f)
            }
            c = h.split(e.splitNumRegx);
            b = f.split(e.splitNumRegx);
            for (a = 0; a < Math.min(c.length, b.length); a++) {
                if (g(c[a], 10) > g(b[a], 10)) {
                    return 1
                }
                if (g(c[a], 10) < g(b[a], 10)) {
                    return -1
                }
            }
        }
        return 0
    },
    formatNum: function (b, c) {
        var d = this,
            a, e;
        if (!d.isStrNum(b)) {
            return null
        }
        if (!d.isNum(c)) {
            c = 4
        }
        c--;
        e = b.replace(/\s/g, "").split(d.splitNumRegx).concat(["0", "0", "0", "0"]);
        for (a = 0; a < 4; a++) {
            if (/^(0+)(.+)$/.test(e[a])) {
                e[a] = RegExp.$2
            }
            if (a > c || !(/\d/).test(e[a])) {
                e[a] = "0"
            }
        }
        return e.slice(0, 4).join(",")
    },
    $$hasMimeType: function (a) {
        return function (c) {
            if (!a.isIE && c) {
                var f, e, b, d = a.isArray(c) ? c : (a.isString(c) ? [c] : []);
                for (b = 0; b < d.length; b++) {
                    if (a.isString(d[b]) && /[^\s]/.test(d[b])) {
                        f = navigator.mimeTypes[d[b]];
                        e = f ? f.enabledPlugin : 0;
                        if (e && (e.name || e.description)) {
                            return f
                        }
                    }
                }
            }
            return null
        }
    },
    getPROP: function (d, b, a) {
        var c;
        try {
            if (d) {
                a = d[b]
            }
        } catch (c) {}
        return a
    },
    isEnabled: {
        $: 1,
        IEPluginSecurityPopup: function () {
            var a = this,
                b = a.$;
            return b.isIE && b.verIE >= 7 ? 1 : 0
        },
        objectProperty: function (d) {
            var c = this,
                e = c.$,
                b, a = 0;
            if (e.isIE && e.verIE >= 7) {
                b = e.getPROP(d, "object");
                if (e.isDefined(b)) {
                    a = b ? 1 : -1
                }
            }
            return a
        }
    },
    findNavPlugin: function (l, e, c) {
        var j = this,
            h = new RegExp(l, "i"),
            d = (!j.isDefined(e) || e) ? /\d/ : 0,
            k = c ? new RegExp(c, "i") : 0,
            a = navigator.plugins,
            g = "",
            f, b, m;
        for (f = 0; f < a.length; f++) {
            m = a[f].description || g;
            b = a[f].name || g;
            if ((h.test(m) && (!d || d.test(RegExp.leftContext + RegExp.rightContext))) || (h.test(b) && (!d || d.test(RegExp.leftContext + RegExp.rightContext)))) {
                if (!k || !(k.test(m) || k.test(b))) {
                    return a[f]
                }
            }
        }
        return null
    },
    getMimeEnabledPlugin: function (k, m, c) {
        var e = this,
            f, b = new RegExp(m, "i"),
            h = "",
            g = c ? new RegExp(c, "i") : 0,
            a, l, d, j = e.isString(k) ? [k] : k;
        for (d = 0; d < j.length; d++) {
            if ((f = e.hasMimeType(j[d])) && (f = f.enabledPlugin)) {
                l = f.description || h;
                a = f.name || h;
                if (b.test(l) || b.test(a)) {
                    if (!g || !(g.test(l) || g.test(a))) {
                        return f
                    }
                }
            }
        }
        return 0
    },
    init: function (d) {
        var c = this,
            b, d, a = {
                status: -3,
                plugin: 0
            };
        if (!c.isString(d)) {
            return a
        }
        if (d.length == 1) {
            c.getVersionDelimiter = d;
            return a
        }
        d = d.toLowerCase().replace(/\s/g, "");
        b = c.Plugins[d];
        if (!b || !b.getVersion) {
            return a
        }
        a.plugin = b;
        if (!c.isDefined(b.installed)) {
            b.installed = null;
            b.version = null;
            b.version0 = null;
            b.getVersionDone = null;
            b.pluginName = d
        }
        if (c.isIE && !c.ActiveXEnabled && d !== "java") {
            a.status = -2;
            return a
        }
        a.status = 1;
        return a
    },
    getPluginFileVersion: function (f, b) {
        var h = this,
            e, d, g, a, c = -1;
        if (h.OS > 2 || !f || !f.version || !(e = h.getNum(f.version))) {
            return b
        }
        if (!b) {
            return e
        }
        e = h.formatNum(e);
        b = h.formatNum(b);
        d = b.split(h.splitNumRegx);
        g = e.split(h.splitNumRegx);
        for (a = 0; a < d.length; a++) {
            if (c > -1 && a > c && d[a] != "0") {
                return b
            }
            if (g[a] != d[a]) {
                if (c == -1) {
                    c = a
                }
                if (d[a] != "0") {
                    return b
                }
            }
        }
        return e
    },
    AXO: window.ActiveXObject,
    getAXO: function (a) {
        var d = null,
            c, b = this;
        try {
            d = new b.AXO(a)
        } catch (c) {};
        return d
    },
    convertFuncs: function (f) {
        var a, g, d, b = /^[\$][\$]/,
            c = this;
        for (a in f) {
            if (b.test(a)) {
                try {
                    g = a.slice(2);
                    if (g.length > 0 && !f[g]) {
                        f[g] = f[a](f);
                        delete f[a]
                    }
                } catch (d) {}
            }
        }
    },
    initObj: function (e, b, d) {
        var a, c;
        if (e) {
            if (e[b[0]] == 1 || d) {
                for (a = 0; a < b.length; a = a + 2) {
                    e[b[a]] = b[a + 1]
                }
            }
            for (a in e) {
                c = e[a];
                if (c && c[b[0]] == 1) {
                    this.initObj(c, b)
                }
            }
        }
    },
    initScript: function () {
        var $ = this,
            nav = navigator,
            x, doc = document,
            userAgent = nav.userAgent || "",
            vendor = nav.vendor || "",
            platform = nav.platform || "",
            product = nav.product || "";
        $.initObj($, ["$", $]);
        for (x in $.Plugins) {
            if ($.Plugins[x]) {
                $.initObj($.Plugins[x], ["$", $, "$$", $.Plugins[x]], 1)
            }
        }
        $.convertFuncs($);
        $.OS = 100;
        if (platform) {
            var data_plat = ["Win", 1, "Mac", 2, "Linux", 3, "FreeBSD", 4, "iPhone", 21.1, "iPod", 21.2, "iPad", 21.3, "Win.*CE", 22.1, "Win.*Mobile", 22.2, "Pocket\\s*PC", 22.3, "", 100];
            for (x = data_plat.length - 2; x >= 0; x = x - 2) {
                if (data_plat[x] && new RegExp(data_plat[x], "i").test(platform)) {
                    $.OS = data_plat[x + 1];
                    break
                }
            }
        };
        $.head = doc.getElementsByTagName("head")[0] || doc.getElementsByTagName("body")[0] || doc.body || null;
        $.isIE = eval("/*@cc_on!@*/!1");
        $.verIE = $.isIE ? ((/MSIE\s*(\d+\.?\d*)/i).test(userAgent) ? parseFloat(RegExp.$1, 10) : 7) : null;
        $.ActiveXEnabled = false;
        if ($.isIE) {
            var x, progid = ["Msxml2.XMLHTTP", "Msxml2.DOMDocument", "Microsoft.XMLDOM", "ShockwaveFlash.ShockwaveFlash", "TDCCtl.TDCCtl", "Shell.UIHelper", "Scripting.Dictionary", "wmplayer.ocx"];
            for (x = 0; x < progid.length; x++) {
                if ($.getAXO(progid[x])) {
                    $.ActiveXEnabled = true;
                    break
                }
            }
            userAgent = ""
        };
        $.isGecko = (/Gecko/i).test(product) && (/Gecko\s*\/\s*\d/i).test(userAgent);
        $.verGecko = $.isGecko ? $.formatNum((/rv\s*\:\s*([\.\,\d]+)/i).test(userAgent) ? RegExp.$1 : "0.9") : null;
        $.isChrome = (/Chrome\s*\/\s*(\d[\d\.]*)/i).test(userAgent);
        $.verChrome = $.isChrome ? $.formatNum(RegExp.$1) : null;
        $.isSafari = ((/Apple/i).test(vendor) || (!vendor && !$.isChrome)) && (/Safari\s*\/\s*(\d[\d\.]*)/i).test(userAgent);
        $.verSafari = $.isSafari && (/Version\s*\/\s*(\d[\d\.]*)/i).test(userAgent) ? $.formatNum(RegExp.$1) : null;
        $.isOpera = (/Opera\s*[\/]?\s*(\d+\.?\d*)/i).test(userAgent);
        $.verOpera = $.isOpera && ((/Version\s*\/\s*(\d+\.?\d*)/i).test(userAgent) || 1) ? parseFloat(RegExp.$1, 10) : null;
        $.addWinEvent("load", $.handler($.runWLfuncs, $))
    },
    handler: function (c, b, a) {
        return function () {
            c(b, a)
        }
    },
    fPush: function (b, a) {
        var c = this;
        if (c.isArray(a) && (c.isFunc(b) || (c.isArray(b) && b.length > 0 && c.isFunc(b[0])))) {
            a.push(b)
        }
    },
    callArray: function (b) {
        var c = this,
            a, d;
        if (c.isArray(b)) {
            d = [].concat(b);
            for (a = 0; a < d.length; a++) {
                c.call(d[a]);
                b.splice(0, 1)
            }
        }
    },
    call: function (c) {
        var b = this,
            a = b.isArray(c) ? c.length : -1;
        if (a > 0 && b.isFunc(c[0])) {
            c[0](b, a > 1 ? c[1] : 0, a > 2 ? c[2] : 0, a > 3 ? c[3] : 0)
        } else {
            if (b.isFunc(c)) {
                c(b)
            }
        }
    },
    $$isMinVersion: function (a) {
        return function (h, g, d, c) {
            var e = a.init(h),
                f, b = -1;
            if (e.status < 0) {
                return e.status
            }
            f = e.plugin;
            g = a.formatNum(a.isNum(g) ? g.toString() : (a.isStrNum(g) ? a.getNum(g) : "0"));
            if (f.getVersionDone != 1) {
                f.getVersion(g, d, c);
                if (f.getVersionDone === null) {
                    f.getVersionDone = 1
                }
            }
            if (f.installed !== null) {
                b = f.installed <= 0.5 ? f.installed : (f.installed == 0.7 ? 1 : (f.version === null ? 0 : (a.compareNums(f.version, g, f) >= 0 ? 1 : -0.1)))
            };
            return b
        }
    },
    getVersionDelimiter: ",",
    $$getVersion: function (a) {
        return function (g, d, c) {
            var e = a.init(g),
                f, b;
            if (e.status < 0) {
                return null
            };
            f = e.plugin;
            if (f.getVersionDone != 1) {
                f.getVersion(null, d, c);
                if (f.getVersionDone === null) {
                    f.getVersionDone = 1
                }
            }
            b = (f.version || f.version0);
            b = b ? b.replace(a.splitNumRegx, a.getVersionDelimiter) : b;
            return b
        }
    },
    addWinEvent: function (d, c) {
        var e = this,
            a = window,
            b;
        if (e.isFunc(c)) {
            if (a.addEventListener) {
                a.addEventListener(d, c, false)
            } else {
                if (a.attachEvent) {
                    a.attachEvent("on" + d, c)
                } else {
                    b = a["on" + d];
                    a["on" + d] = e.winHandler(c, b)
                }
            }
        }
    },
    winHandler: function (d, c) {
        return function () {
            d();
            if (typeof c == "function") {
                c()
            }
        }
    },
    WLfuncs0: [],
    WLfuncs: [],
    runWLfuncs: function (a) {
        a.winLoaded = true;
        a.callArray(a.WLfuncs0);
        a.callArray(a.WLfuncs);
        if (a.DOM) {
            a.DOM.onDoneEmptyDiv()
        }
    },
    winLoaded: false,
    $$onWindowLoaded: function (a) {
        return function (b) {
            if (a.winLoaded) {
                a.call(b)
            } else {
                a.fPush(b, a.WLfuncs)
            }
        }
    },
    $$onDetectionDone: function (a) {
        return function (h, g, c, b) {
            var d = a.init(h),
                j, e;
            if (d.status == -3) {
                return -1
            }
            e = d.plugin;
            if (!a.isArray(e.funcs)) {
                e.funcs = []
            };
            if (e.getVersionDone != 1) {
                j = a.getVersion ? a.getVersion(h, c, b) : a.isMinVersion(h, "0", c, b)
            }
            if (e.installed != -0.5 && e.installed != 0.5) {
                a.call(g);
                return 1
            }
            if (e.NOTF) {
                a.fPush(g, e.funcs);
                return 0
            }
            return 1
        }
    },
    DOM: {
        $: 1,
        div: null,
        divID: "plugindetect",
        divWidth: 50,
        pluginSize: 1,
        altHTML: "&nbsp;&nbsp;&nbsp;&nbsp;",
        emptyNode: function (c) {
            var b = this,
                d = b.$,
                a, f;
            if (c && c.childNodes) {
                for (a = c.childNodes.length - 1; a >= 0; a--) {
                    try {
                        if (d.isIE) {
                            c.childNodes[a].style.display = "none"
                        }
                    } catch (f) {}
                }
                try {
                    c.innerHTML = ""
                } catch (f) {}
            }
        },
        LASTfuncs: [],
        onDoneEmptyDiv: function () {
            var f = this,
                g = f.$,
                b, d, c, a, h;
            if (!g.winLoaded || g.WLfuncs0.length || g.WLfuncs.length) {
                return
            }
            for (b in g.Plugins) {
                d = g.Plugins[b];
                if (d) {
                    if (d.OTF == 3 || (d.funcs && d.funcs.length)) {
                        return
                    }
                }
            }
            g.callArray(f.LASTfuncs);
            if (f.div && f.div.childNodes) {
                for (b = f.div.childNodes.length - 1; b >= 0; b--) {
                    c = f.div.childNodes[b];
                    f.emptyNode(c)
                }
                try {
                    f.div.innerHTML = ""
                } catch (h) {}
            }
            if (!f.div) {
                a = document.getElementById(f.divID);
                if (a) {
                    f.div = a
                }
            }
            if (f.div && f.div.parentNode) {
                try {
                    f.div.parentNode.removeChild(f.div)
                } catch (h) {}
                f.div = null
            }
        },
        width: function () {
            var e = this,
                c = e.DOM,
                d = c.$,
                a = -1,
                b = e.span;
            return b ? (d.isNum(b.scrollWidth) ? b.scrollWidth : (d.isNum(b.offsetWidth) ? b.offsetWidth : a)) : a
        },
        obj: function (b) {
            var g = this,
                d = g.DOM,
                c = g.span,
                f, a = c && c.firstChild ? c.firstChild : null;
            try {
                if (a && b) {
                    d.div.focus()
                }
            } catch (f) {}
            return a
        },
        getTagStatus: function (i, g, a, b) {
            if (!i || !g || !a) {
                return -2
            }
            var j = this,
                c = j.$,
                f, d = i.width(),
                k = a.width(),
                h = g.width();
            if (!a.span || !g.span || !i.obj()) {
                return -2
            }
            if (d < 0 || k < 0 || h < 0 || h <= j.pluginSize || k < h) {
                return 0
            }
            if (d >= h) {
                return -1
            }
            try {
                if (d == j.pluginSize && (!c.isIE || c.getPROP(i.obj(), "readyState") == 4)) {
                    if (!i.winLoaded && c.winLoaded) {
                        return 1
                    }
                    if (i.winLoaded && c.isNum(b)) {
                        if (!c.isNum(i.count)) {
                            i.count = b
                        }
                        if (b - i.count >= 10) {
                            return 1
                        }
                    }
                }
            } catch (f) {}
            return 0
        },
        setStyle: function (b, h) {
            var c = this,
                d = c.$,
                g = b.style,
                a, f;
            if (g && h) {
                for (a = 0; a < h.length; a = a + 2) {
                    try {
                        g[h[a]] = h[a + 1]
                    } catch (f) {}
                }
            }
        },
        insertDivInBody: function (a, h) {
            var j = this,
                d = j.$,
                g, b = "pd33993399",
                c = null,
                i = h ? window.top.document : window.document,
                f = i.getElementsByTagName("body")[0] || i.body;
            if (!f) {
                try {
                    i.write('<div id="' + b + '">.' + d.openTag + "/div>");
                    c = i.getElementById(b)
                } catch (g) {}
            }
            f = i.getElementsByTagName("body")[0] || i.body;
            if (f) {
                f.insertBefore(a, f.firstChild);
                if (c) {
                    f.removeChild(c)
                }
            }
        },
        insert: function (f, b, g, a, k) {
            var p = this,
                j = p.$,
                l, m = document,
                r, q, o = m.createElement("span"),
                n, i, c = ["outlineStyle", "none", "borderStyle", "none", "padding", "0px", "margin", "0px", "visibility", "visible"],
                h = "outline-style:none;border-style:none;padding:0px;margin:0px;visibility:visible;";
            if (!j.isDefined(a)) {
                a = ""
            }
            if (j.isString(f) && (/[^\s]/).test(f)) {
                f = f.toLowerCase().replace(/\s/g, "");
                r = j.openTag + f + ' width="' + p.pluginSize + '" height="' + p.pluginSize + '" ';
                r += 'style="' + h + 'display:inline;" ';
                for (n = 0; n < b.length; n = n + 2) {
                    if (/[^\s]/.test(b[n + 1])) {
                        r += b[n] + '="' + b[n + 1] + '" '
                    }
                }
                r += ">";
                for (n = 0; n < g.length; n = n + 2) {
                    if (/[^\s]/.test(g[n + 1])) {
                        r += j.openTag + 'param name="' + g[n] + '" value="' + g[n + 1] + '" />'
                    }
                }
                r += a + j.openTag + "/" + f + ">"
            } else {
                f = "";
                r = a
            }
            if (!p.div) {
                i = m.getElementById(p.divID);
                if (i) {
                    p.div = i
                } else {
                    p.div = m.createElement("div");
                    p.div.id = p.divID
                }
                p.setStyle(p.div, c.concat(["width", p.divWidth + "px", "height", (p.pluginSize + 3) + "px", "fontSize", (p.pluginSize + 3) + "px", "lineHeight", (p.pluginSize + 3) + "px", "verticalAlign", "baseline", "display", "block"]));
                if (!i) {
                    p.setStyle(p.div, ["position", "absolute", "right", "0px", "top", "0px"]);
                    p.insertDivInBody(p.div)
                }
            }
            q = {
                span: null,
                winLoaded: j.winLoaded,
                tagName: f,
                outerHTML: r,
                DOM: p,
                width: p.width,
                obj: p.obj
            };
            if (p.div && p.div.parentNode) {
                p.setStyle(o, c.concat(["fontSize", (p.pluginSize + 3) + "px", "lineHeight", (p.pluginSize + 3) + "px", "verticalAlign", "baseline", "display", "inline"]));
                p.div.appendChild(o);
                try {
                    o.innerHTML = r
                } catch (l) {};
                q.span = o;
                q.winLoaded = j.winLoaded
            }
            return q
        }
    },
    file: {
        $: 1,
        any: "fileStorageAny999",
        valid: "fileStorageValid999",
        save: function (d, f, c) {
            var b = this,
                e = b.$,
                a;
            if (d && e.isDefined(c)) {
                if (!d[b.any]) {
                    d[b.any] = []
                }
                if (!d[b.valid]) {
                    d[b.valid] = []
                }
                d[b.any].push(c);
                a = b.split(f, c);
                if (a) {
                    d[b.valid].push(a)
                }
            }
        },
        getValidLength: function (a) {
            return a && a[this.valid] ? a[this.valid].length : 0
        },
        getAnyLength: function (a) {
            return a && a[this.any] ? a[this.any].length : 0
        },
        getValid: function (c, a) {
            var b = this;
            return c && c[b.valid] ? b.get(c[b.valid], a) : null
        },
        getAny: function (c, a) {
            var b = this;
            return c && c[b.any] ? b.get(c[b.any], a) : null
        },
        get: function (d, a) {
            var c = d.length - 1,
                b = this.$.isNum(a) ? a : c;
            return (b < 0 || b > c) ? null : d[b]
        },
        split: function (g, c) {
            var b = this,
                e = b.$,
                f = null,
                a, d;
            g = g ? g.replace(".", "\\.") : "";
            d = new RegExp("^(.*[^\\/])(" + g + "\\s*)$");
            if (e.isString(c) && d.test(c)) {
                a = (RegExp.$1).split("/");
                f = {
                    name: a[a.length - 1],
                    ext: RegExp.$2,
                    full: c
                };
                a[a.length - 1] = "";
                f.path = a.join("/")
            }
            return f
        },
        z: 0
    },
    Plugins: {
        adobereader: {
            mimeType: "application/pdf",
            navPluginObj: null,
            progID: ["AcroPDF.PDF", "PDF.PdfCtrl"],
            classID: "clsid:CA8A9780-280D-11CF-A24D-444553540000",
            INSTALLED: {},
            pluginHasMimeType: function (d, c, f) {
                var b = this,
                    e = b.$,
                    a;
                for (a in d) {
                    if (d[a] && d[a].type && d[a].type == c) {
                        return 1
                    }
                }
                if (e.getMimeEnabledPlugin(c, f)) {
                    return 1
                }
                return 0
            },
            getVersion: function (l, j) {
                var g = this,
                    d = g.$,
                    i, f, m, n, b = null,
                    h = null,
                    k = g.mimeType,
                    a, c;
                if (d.isString(j)) {
                    j = j.replace(/\s/g, "");
                    if (j) {
                        k = j
                    }
                } else {
                    j = null
                }
                if (d.isDefined(g.INSTALLED[k])) {
                    g.installed = g.INSTALLED[k];
                    return
                }
                if (!d.isIE) {
                    a = "Adobe.*PDF.*Plug-?in|Adobe.*Acrobat.*Plug-?in|Adobe.*Reader.*Plug-?in";
                    if (g.getVersionDone !== 0) {
                        g.getVersionDone = 0;
                        b = d.getMimeEnabledPlugin(g.mimeType, a);
                        if (!j) {
                            n = b
                        }
                        if (!b && d.hasMimeType(g.mimeType)) {
                            b = d.findNavPlugin(a, 0)
                        }
                        if (b) {
                            g.navPluginObj = b;
                            h = d.getNum(b.description) || d.getNum(b.name);
                            h = d.getPluginFileVersion(b, h);
                            if (!h && d.OS == 1) {
                                if (g.pluginHasMimeType(b, "application/vnd.adobe.pdfxml", a)) {
                                    h = "9"
                                } else {
                                    if (g.pluginHasMimeType(b, "application/vnd.adobe.x-mars", a)) {
                                        h = "8"
                                    }
                                }
                            }
                        }
                    } else {
                        h = g.version
                    }
                    if (!d.isDefined(n)) {
                        n = d.getMimeEnabledPlugin(k, a)
                    }
                    g.installed = n && h ? 1 : (n ? 0 : (g.navPluginObj ? -0.2 : -1))
                } else {
                    b = d.getAXO(g.progID[0]) || d.getAXO(g.progID[1]);
                    c = /=\s*([\d\.]+)/g;
                    try {
                        f = (b || d.DOM.insert("object", ["classid", g.classID], ["src", ""], "", g).obj()).GetVersions();
                        for (m = 0; m < 5; m++) {
                            if (c.test(f) && (!h || RegExp.$1 > h)) {
                                h = RegExp.$1
                            }
                        }
                    } catch (i) {}
                    g.installed = h ? 1 : (b ? 0 : -1)
                }
                if (!g.version) {
                    g.version = d.formatNum(h)
                }
                g.INSTALLED[k] = g.installed
            }
        },
        pdfreader: {
            mimeType: "application/pdf",
            progID: ["AcroPDF.PDF", "PDF.PdfCtrl"],
            classID: "clsid:CA8A9780-280D-11CF-A24D-444553540000",
            OTF: null,
            fileUsed: 0,
            fileEnabled: 1,
            setPluginStatus: function (c, b) {
                var a = this,
                    d = a.$;
                a.version = null;
                if (a.installed !== 0 && a.installed != 1) {
                    if (b == 3) {
                        a.installed = -0.5
                    } else {
                        a.installed = c ? 0 : (d.isIE ? -1.5 : -1)
                    }
                }
                if (a.verify && a.verify.isEnabled()) {
                    a.getVersionDone = 0
                } else {
                    if (a.getVersionDone != 1) {
                        a.getVersionDone = b < 2 && a.fileEnabled && a.installed <= -1 ? 0 : 1
                    }
                }
            },
            getVersion: function (l, f, b) {
                var g = this,
                    c = g.$,
                    i = false,
                    d, a, j, h = g.NOTF,
                    m = g.doc,
                    k = g.verify;
                if (b !== true) {
                    b = false
                }
                if (g.getVersionDone === null) {
                    g.OTF = 0;
                    if (k) {
                        k.begin()
                    }
                }
                if (((c.isGecko && c.compareNums(c.verGecko, "2,0,0,0") <= 0 && c.OS <= 4) || (c.isOpera && c.verOpera <= 11 && c.OS <= 4) || (c.isChrome && c.compareNums(c.verChrome, "10,0,0,0") < 0 && c.OS <= 4) || 0) && !b) {
                    g.fileEnabled = 0
                }
                c.file.save(g, ".pdf", f);
                if (g.getVersionDone === 0) {
                    if (g.OTF < 2 && (g.installed < 0 || b)) {
                        if (m.insertHTMLQuery(b) > 0) {
                            i = true
                        }
                        g.setPluginStatus(i, g.OTF)
                    }
                    return
                }
                if (!b) {
                    if (!c.isIE) {
                        if (c.hasMimeType(g.mimeType)) {
                            i = true
                        }
                    } else {
                        try {
                            if ((c.getAXO(g.progID[0]) || c.getAXO(g.progID[1])).GetVersions()) {
                                i = true
                            }
                        } catch (j) {}
                    }
                }
                if (g.OTF < 2 && (!i || b)) {
                    if (m.insertHTMLQuery(b) > 0) {
                        i = true
                    }
                }
                g.setPluginStatus(i, g.OTF)
            },
            doc: {
                $: 1,
                HTML: 0,
                DummyObjTagHTML: 0,
                DummySpanTagHTML: 0,
                queryObject: function (c) {
                    var g = this,
                        d = g.$,
                        b = g.$$,
                        a;
                    if (d.isIE) {
                        a = -1;
                        try {
                            if (g.HTML.obj().GetVersions()) {
                                a = 1
                            }
                        } catch (f) {}
                    } else {
                        a = d.DOM.getTagStatus(g.HTML, g.DummySpanTagHTML, g.DummyObjTagHTML, c)
                    };
                    return a
                },
                insertHTMLQuery: function (c) {
                    var h = this,
                        d = h.$,
                        f = h.$$,
                        i, b = f.pdf,
                        e = d.file.getValid(f),
                        a = d.DOM.altHTML;
                    if (e) {
                        e = e.full
                    }
                    if (d.isIE) {
                        if (c && (!e || !f.fileEnabled)) {
                            return 0
                        }
                        if (!h.HTML) {
                            h.HTML = d.DOM.insert("object", ["classid", f.classID], ["src", c && e ? e : ""], a, f)
                        }
                        if (c) {
                            f.fileUsed = 1
                        }
                    } else {
                        if (!e || !f.fileEnabled) {
                            return 0
                        }
                        if (!h.HTML) {
                            h.HTML = d.DOM.insert("object", ["type", f.mimeType, "data", e], ["src", e], a, f)
                        }
                        f.fileUsed = 1
                    }
                    if (f.OTF < 2) {
                        f.OTF = 2
                    }
                    if (!h.DummyObjTagHTML) {
                        h.DummyObjTagHTML = d.DOM.insert("object", [], [], a)
                    }
                    if (!h.DummySpanTagHTML) {
                        h.DummySpanTagHTML = d.DOM.insert("", [], [], a)
                    }
                    i = h.queryObject();
                    if (i !== 0) {
                        return i
                    }
                    var g = f.NOTF;
                    if (f.OTF < 3 && h.HTML && g) {
                        f.OTF = 3;
                        g.onIntervalQuery = d.handler(g.$$onIntervalQuery, g);
                        if (!d.winLoaded) {
                            d.WLfuncs0.push([g.winOnLoadQuery, g])
                        }
                        setTimeout(g.onIntervalQuery, g.intervalLength)
                    }
                    return i
                }
            },
            NOTF: {
                $: 1,
                count: 0,
                countMax: 25,
                intervalLength: 250,
                $$onIntervalQuery: function (e) {
                    var c = e.$,
                        b = e.$$,
                        d = b.doc,
                        a;
                    if (b.OTF == 3) {
                        a = d.queryObject(e.count);
                        if (a > 0 || a < 0 || (c.winLoaded && e.count > e.countMax)) {
                            e.queryCompleted(a)
                        }
                    }
                    e.count++;
                    if (b.OTF == 3) {
                        setTimeout(e.onIntervalQuery, e.intervalLength)
                    }
                },
                winOnLoadQuery: function (c, e) {
                    var b = e.$$,
                        d = b.doc,
                        a;
                    if (b.OTF == 3) {
                        a = d.queryObject(e.count);
                        e.queryCompleted(a)
                    }
                },
                queryCompleted: function (b) {
                    var d = this,
                        c = d.$,
                        a = d.$$;
                    if (a.OTF == 4) {
                        return
                    }
                    a.OTF = 4;
                    a.setPluginStatus(b > 0 ? true : false, a.OTF);
                    if (a.funcs) {
                        c.callArray(a.funcs)
                    }
                    if (c.DOM) {
                        c.DOM.onDoneEmptyDiv()
                    }
                }
            },
            zz: 0
        },
        zz: 0
    }
};
PluginDetect.initScript();