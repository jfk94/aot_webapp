(function() {
  var q = {html: {}};
  q.html.cookie = {};

  q.html.cookie.readCookie = function (name) {
    var cookie, cookies, nameSearchString, i, ii;
    nameSearchString = name + "=";
    cookies = document.cookie.split(';');
    for (i = 0, ii = cookies.length; i < ii; i += 1) {
      cookie = cookies[i].replace(/^\s+|\s+$/g, '');
      if (cookie.indexOf(nameSearchString) === 0) {
        cookie = unescape(cookie.substring(nameSearchString.length));
        if (cookie.length === 0) {
          return null;
        }
        return cookie;
      }
    }
    return null;
  };

  q.html.cookie.writeCookie = function (name, value, days, domain) {
    var date, expires, cookie;
    if (days) {
      date = new Date();
      date.setTime(date.getTime() + (days * 86400000));
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }
    cookie = escape(name) + "=" + escape(value) + expires + "; path=/;";
    if (domain) {
      cookie += " domain=" + domain;
    }
    document.cookie = cookie;
  };

  q.loadCoOpenTag = function () {
    if (document && document.body && document.getElementById) {
      var x = document.createElement("script");
      x.src = "//d3c3cq33003psk.cloudfront.net/opentag-7-64130.js";
      document.body.appendChild(x);
    } else {
      setTimeout(q.loadCoOpenTag, 100);
    }
  };
  q.loadComOpenTag = function () {
    if (document && document.body && document.getElementById) {
      var x = document.createElement("script");
      x.src = "//d3c3cq33003psk.cloudfront.net/opentag-7-58944.js";
      document.body.appendChild(x);
    } else {
      setTimeout(q.loadComOpenTag, 100);
    }
  };
  if (document.location.host.indexOf("bbc.com") >= 0) {
    q.loadComOpenTag();
  } else {
    var cookieName = "samplegrp"
    var sampleGrp = q.html.cookie.readCookie(cookieName);
    if (sampleGrp === "on") {
      //load opentag
      q.loadCoOpenTag();
    } else if (sampleGrp === "off") {
      //don't load opentag
    } else {
      var rate = 0.2;
      var on = Math.random() < rate;
      q.html.cookie.writeCookie(cookieName, on ? "on" : "off", 365);
      if (on) {
	q.loadCoOpenTag();
      }
    }
  }
}());
