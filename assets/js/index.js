//
// SmoothScroll for websites v1.3.8 (Balazs Galambosi)
// Licensed under the terms of the MIT license.
//
!function () {
    function e() {
        M.keyboardSupport && m("keydown", a)
    }

    function t() {
        if (!z && document.body) {
            z = !0;
            var t = document.body, o = document.documentElement;
            window.innerHeight, t.scrollHeight;
            H = document.compatMode.indexOf("CSS") >= 0 ? o : t, S = t, e(), top != self && (C = !0), M.fixedBackground || T || (t.style.backgroundAttachment = "scroll", o.style.backgroundAttachment = "scroll")
        }
    }

    function o(e, t, o) {
        if (w(t, o), 1 != M.accelerationMax) {
            var n = Date.now(), a = n - L;
            if (a < M.accelerationDelta) {
                var r = (1 + 50 / a) / 2;
                r > 1 && (r = Math.min(r, M.accelerationMax), t *= r, o *= r)
            }
            L = Date.now()
        }
        if (A.push({x: t, y: o, lastX: 0 > t ? .99 : -.99, lastY: 0 > o ? .99 : -.99, start: Date.now()}), !K) {
            var l = e === document.body, i = function (n) {
                for (var a = Date.now(), r = 0, c = 0, u = 0; u < A.length; u++) {
                    var d = A[u], s = a - d.start, m = s >= M.animationTime, f = m ? 1 : s / M.animationTime;
                    M.pulseAlgorithm && (f = g(f));
                    var w = d.x * f - d.lastX >> 0, p = d.y * f - d.lastY >> 0;
                    r += w, c += p, d.lastX += w, d.lastY += p, m && (A.splice(u, 1), u--)
                }
                l ? window.scrollBy(r, c) : (r && (e.scrollLeft += r), c && (e.scrollTop += c)), t || o || (A = []), A.length ? R(i, e, 1e3 / M.frameRate + 1) : K = !1
            };
            R(i, e, 0), K = !0
        }
    }

    function n(e) {
        z || t();
        var n = e.target, a = c(n);
        if (!a || e.defaultPrevented || e.ctrlKey) return !0;
        if (f(S, "embed") || f(n, "embed") && /\.pdf/i.test(n.src) || f(S, "object")) return !0;
        var r = -e.wheelDeltaX || e.deltaX || 0, i = -e.wheelDeltaY || e.deltaY || 0;
        return Y && (e.wheelDeltaX && h(e.wheelDeltaX, 120) && (r = -120 * (e.wheelDeltaX / Math.abs(e.wheelDeltaX))), e.wheelDeltaY && h(e.wheelDeltaY, 120) && (i = -120 * (e.wheelDeltaY / Math.abs(e.wheelDeltaY)))), r || i || (i = -e.wheelDelta || 0), 1 === e.deltaMode && (r *= 40, i *= 40), !M.touchpadSupport && p(i) ? !0 : (Math.abs(r) > 1.2 && (r *= M.stepSize / 120), Math.abs(i) > 1.2 && (i *= M.stepSize / 120), o(a, r, i), e.preventDefault(), void l())
    }

    function a(e) {
        var t = e.target, n = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== B.spacebar;
        document.contains(S) || (S = document.activeElement);
        var a = /^(textarea|select|embed|object)$/i, r = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (a.test(t.nodeName) || f(t, "input") && !r.test(t.type) || f(S, "video") || v(e) || t.isContentEditable || e.defaultPrevented || n) return !0;
        if ((f(t, "button") || f(t, "input") && r.test(t.type)) && e.keyCode === B.spacebar) return !0;
        var i, u = 0, d = 0, s = c(S), m = s.clientHeight;
        switch (s == document.body && (m = window.innerHeight), e.keyCode) {
            case B.up:
                d = -M.arrowScroll;
                break;
            case B.down:
                d = M.arrowScroll;
                break;
            case B.spacebar:
                i = e.shiftKey ? 1 : -1, d = -i * m * .9;
                break;
            case B.pageup:
                d = .9 * -m;
                break;
            case B.pagedown:
                d = .9 * m;
                break;
            case B.home:
                d = -s.scrollTop;
                break;
            case B.end:
                var w = s.scrollHeight - s.scrollTop - m;
                d = w > 0 ? w + 10 : 0;
                break;
            case B.left:
                u = -M.arrowScroll;
                break;
            case B.right:
                u = M.arrowScroll;
                break;
            default:
                return !0
        }
        o(s, u, d), e.preventDefault(), l()
    }

    function r(e) {
        S = e.target
    }

    function l() {
        clearTimeout(k), k = setInterval(function () {
            q = {}
        }, 1e3)
    }

    function i(e, t) {
        for (var o = e.length; o--;) q[N(e[o])] = t;
        return t
    }

    function c(e) {
        var t = [], o = document.body, n = H.scrollHeight;
        do {
            var a = q[N(e)];
            if (a) return i(t, a);
            if (t.push(e), n === e.scrollHeight) {
                var r = d(H) && d(o), l = r || s(H);
                if (C && u(H) || !C && l) return i(t, P())
            } else if (u(e) && s(e)) return i(t, e)
        } while (e = e.parentElement)
    }

    function u(e) {
        return e.clientHeight + 10 < e.scrollHeight
    }

    function d(e) {
        var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
        return "hidden" !== t
    }

    function s(e) {
        var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
        return "scroll" === t || "auto" === t
    }

    function m(e, t) {
        window.addEventListener(e, t, !1)
    }

    function f(e, t) {
        return (e.nodeName || "").toLowerCase() === t.toLowerCase()
    }

    function w(e, t) {
        e = e > 0 ? 1 : -1, t = t > 0 ? 1 : -1, (E.x !== e || E.y !== t) && (E.x = e, E.y = t, A = [], L = 0)
    }

    function p(e) {
        return e ? (X.length || (X = [e, e, e]), e = Math.abs(e), X.push(e), X.shift(), clearTimeout(D), D = setTimeout(function () {
            window.localStorage && (localStorage.SS_deltaBuffer = X.join(","))
        }, 1e3), !b(120) && !b(100)) : void 0
    }

    function h(e, t) {
        return Math.floor(e / t) == e / t
    }

    function b(e) {
        return h(X[0], e) && h(X[1], e) && h(X[2], e)
    }

    function v(e) {
        var t = e.target, o = !1;
        if (-1 != document.URL.indexOf("www.youtube.com/watch")) do if (o = t.classList && t.classList.contains("html5-video-controls")) break; while (t = t.parentNode);
        return o
    }

    function y(e) {
        var t, o, n;
        return e *= M.pulseScale, 1 > e ? t = e - (1 - Math.exp(-e)) : (o = Math.exp(-1), e -= 1, n = 1 - Math.exp(-e), t = o + n * (1 - o)), t * M.pulseNormalize
    }

    function g(e) {
        return e >= 1 ? 1 : 0 >= e ? 0 : (1 == M.pulseNormalize && (M.pulseNormalize /= y(1)), y(e))
    }

    var S, k, D, x = {
            frameRate: 150,
            animationTime: 600,
            stepSize: 150,
            pulseAlgorithm: !0,
            pulseScale: 6,
            pulseNormalize: 1,
            accelerationDelta: 20,
            accelerationMax: 1,
            keyboardSupport: !0,
            arrowScroll: 50,
            touchpadSupport: !0,
            fixedBackground: !0,
            excluded: ""
        }, M = x, T = !1, C = !1, E = {x: 0, y: 0}, z = !1, H = document.documentElement, X = [120, 120, 120],
        Y = /^Mac/.test(navigator.platform),
        B = {left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36}, M = x,
        A = [], K = !1, L = Date.now(), N = function () {
            var e = 0;
            return function (t) {
                return t.uniqueID || (t.uniqueID = e++)
            }
        }(), q = {};
    window.localStorage && localStorage.SS_deltaBuffer && (X = localStorage.SS_deltaBuffer.split(","));
    var O, R = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (e, t, o) {
            window.setTimeout(e, o || 1e3 / 60)
        }
    }(), P = (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, function () {
        var e;
        return function () {
            if (!e) {
                var t = document.createElement("div");
                t.style.cssText = "height:10000px;width:1px;", document.body.appendChild(t);
                var o = document.body.scrollTop;
                document.documentElement.scrollTop;
                window.scrollBy(0, 1), e = document.body.scrollTop != o ? document.body : document.documentElement, window.scrollBy(0, -1), document.body.removeChild(t)
            }
            return e
        }
    }());
    "onwheel" in document.createElement("div") ? O = "wheel" : "onmousewheel" in document.createElement("div") && (O = "mousewheel"), O && (m(O, n), m("mousedown", r), m("load", t))
}();


/*!
 * SlickNav Responsive Mobile Menu v1.0.6
 * (c) 2015 Josh Cope
 * licensed under MIT
 */
!function (e, n, t) {
    function a(n, t) {
        this.element = n, this.settings = e.extend({}, i, t), this._defaults = i, this._name = s, this.init()
    }

    var i = {
        label: "MENU",
        duplicate: !0,
        duration: 200,
        easingOpen: "swing",
        easingClose: "swing",
        closedSymbol: "&#9658;",
        openedSymbol: "&#9660;",
        prependTo: "body",
        appendTo: "",
        parentTag: "a",
        closeOnClick: !1,
        allowParentLinks: !1,
        nestedParentLinks: !0,
        showChildren: !1,
        removeIds: !1,
        removeClasses: !1,
        removeStyles: !1,
        brand: "",
        init: function () {
        },
        beforeOpen: function () {
        },
        beforeClose: function () {
        },
        afterOpen: function () {
        },
        afterClose: function () {
        }
    }, s = "slicknav", l = "slicknav";
    a.prototype.init = function () {
        var t, a, i = this, s = e(this.element), o = this.settings;
        if (o.duplicate ? (i.mobileNav = s.clone(), i.mobileNav.removeAttr("id"), i.mobileNav.find("*").each(function (n, t) {
            e(t).removeAttr("id")
        })) : (i.mobileNav = s, i.mobileNav.removeAttr("id"), i.mobileNav.find("*").each(function (n, t) {
            e(t).removeAttr("id")
        })), o.removeClasses && (i.mobileNav.removeAttr("class"), i.mobileNav.find("*").each(function (n, t) {
            e(t).removeAttr("class")
        })), o.removeStyles && (i.mobileNav.removeAttr("style"), i.mobileNav.find("*").each(function (n, t) {
            e(t).removeAttr("style")
        })), t = l + "_icon", "" === o.label && (t += " " + l + "_no-text"), "a" == o.parentTag && (o.parentTag = 'a href="#"'), i.mobileNav.attr("class", l + "_nav"), a = e('<div class="' + l + '_menu"></div>'), "" !== o.brand) {
            var r = e('<div class="' + l + '_brand">' + o.brand + "</div>");
            e(a).append(r)
        }
        i.btn = e(["<" + o.parentTag + ' aria-haspopup="true" tabindex="0" class="' + l + "_btn " + l + '_collapsed">', '<span class="' + l + '_menutxt">' + o.label + "</span>", '<span class="' + t + '">', '<span class="' + l + '_icon-bar"></span>', '<span class="' + l + '_icon-bar"></span>', '<span class="' + l + '_icon-bar"></span>', "</span>", "</" + o.parentTag + ">"].join("")), e(a).append(i.btn), "" !== o.appendTo ? e(o.appendTo).append(a) : e(o.prependTo).prepend(a), a.append(i.mobileNav);
        var d = i.mobileNav.find("li");
        e(d).each(function () {
            var n = e(this), t = {};
            if (t.children = n.children("ul").attr("role", "menu"), n.data("menu", t), t.children.length > 0) {
                var a = n.contents(), s = !1, r = [];
                e(a).each(function () {
                    return e(this).is("ul") ? !1 : (r.push(this), void (e(this).is("a") && (s = !0)))
                });
                var d = e("<" + o.parentTag + ' role="menuitem" aria-haspopup="true" tabindex="-1" class="' + l + '_item"/>');
                if (o.allowParentLinks && !o.nestedParentLinks && s) e(r).wrapAll('<span class="' + l + "_parent-link " + l + '_row"/>').parent(); else {
                    var c = e(r).wrapAll(d).parent();
                    c.addClass(l + "_row")
                }
                o.showChildren ? n.addClass(l + "_open") : n.addClass(l + "_collapsed"), n.addClass(l + "_parent");
                var p = e('<span class="' + l + '_arrow">' + (o.showChildren ? o.openedSymbol : o.closedSymbol) + "</span>");
                o.allowParentLinks && !o.nestedParentLinks && s && (p = p.wrap(d).parent()), e(r).last().after(p)
            } else 0 === n.children().length && n.addClass(l + "_txtnode");
            n.children("a").attr("role", "menuitem").click(function (n) {
                o.closeOnClick && !e(n.target).parent().closest("li").hasClass(l + "_parent") && e(i.btn).click()
            }), o.closeOnClick && o.allowParentLinks && (n.children("a").children("a").click(function (n) {
                e(i.btn).click()
            }), n.find("." + l + "_parent-link a:not(." + l + "_item)").click(function (n) {
                e(i.btn).click()
            }))
        }), e(d).each(function () {
            var n = e(this).data("menu");
            o.showChildren || i._visibilityToggle(n.children, null, !1, null, !0)
        }), i._visibilityToggle(i.mobileNav, null, !1, "init", !0), i.mobileNav.attr("role", "menu"), e(n).mousedown(function () {
            i._outlines(!1)
        }), e(n).keyup(function () {
            i._outlines(!0)
        }), e(i.btn).click(function (e) {
            e.preventDefault(), i._menuToggle()
        }), i.mobileNav.on("click", "." + l + "_item", function (n) {
            n.preventDefault(), i._itemClick(e(this))
        }), e(i.btn).keydown(function (e) {
            var n = e || event;
            13 == n.keyCode && (e.preventDefault(), i._menuToggle())
        }), i.mobileNav.on("keydown", "." + l + "_item", function (n) {
            var t = n || event;
            13 == t.keyCode && (n.preventDefault(), i._itemClick(e(n.target)))
        }), o.allowParentLinks && o.nestedParentLinks && e("." + l + "_item a").click(function (e) {
            e.stopImmediatePropagation()
        })
    }, a.prototype._menuToggle = function (e) {
        var n = this, t = n.btn, a = n.mobileNav;
        t.hasClass(l + "_collapsed") ? (t.removeClass(l + "_collapsed"), t.addClass(l + "_open")) : (t.removeClass(l + "_open"), t.addClass(l + "_collapsed")), t.addClass(l + "_animating"), n._visibilityToggle(a, t.parent(), !0, t)
    }, a.prototype._itemClick = function (e) {
        var n = this, t = n.settings, a = e.data("menu");
        a || (a = {}, a.arrow = e.children("." + l + "_arrow"), a.ul = e.next("ul"), a.parent = e.parent(), a.parent.hasClass(l + "_parent-link") && (a.parent = e.parent().parent(), a.ul = e.parent().next("ul")), e.data("menu", a)), a.parent.hasClass(l + "_collapsed") ? (a.arrow.html(t.openedSymbol), a.parent.removeClass(l + "_collapsed"), a.parent.addClass(l + "_open"), a.parent.addClass(l + "_animating"), n._visibilityToggle(a.ul, a.parent, !0, e)) : (a.arrow.html(t.closedSymbol), a.parent.addClass(l + "_collapsed"), a.parent.removeClass(l + "_open"), a.parent.addClass(l + "_animating"), n._visibilityToggle(a.ul, a.parent, !0, e))
    }, a.prototype._visibilityToggle = function (n, t, a, i, s) {
        var o = this, r = o.settings, d = o._getActionItems(n), c = 0;
        a && (c = r.duration), n.hasClass(l + "_hidden") ? (n.removeClass(l + "_hidden"), s || r.beforeOpen(i), n.slideDown(c, r.easingOpen, function () {
            e(i).removeClass(l + "_animating"), e(t).removeClass(l + "_animating"), s || r.afterOpen(i)
        }), n.attr("aria-hidden", "false"), d.attr("tabindex", "0"), o._setVisAttr(n, !1)) : (n.addClass(l + "_hidden"), s || r.beforeClose(i), n.slideUp(c, this.settings.easingClose, function () {
            n.attr("aria-hidden", "true"), d.attr("tabindex", "-1"), o._setVisAttr(n, !0), n.hide(), e(i).removeClass(l + "_animating"), e(t).removeClass(l + "_animating"), s ? "init" == i && r.init() : r.afterClose(i)
        }))
    }, a.prototype._setVisAttr = function (n, t) {
        var a = this, i = n.children("li").children("ul").not("." + l + "_hidden");
        t ? i.each(function () {
            var n = e(this);
            n.attr("aria-hidden", "true");
            var i = a._getActionItems(n);
            i.attr("tabindex", "-1"), a._setVisAttr(n, t)
        }) : i.each(function () {
            var n = e(this);
            n.attr("aria-hidden", "false");
            var i = a._getActionItems(n);
            i.attr("tabindex", "0"), a._setVisAttr(n, t)
        })
    }, a.prototype._getActionItems = function (e) {
        var n = e.data("menu");
        if (!n) {
            n = {};
            var t = e.children("li"), a = t.find("a");
            n.links = a.add(t.find("." + l + "_item")), e.data("menu", n)
        }
        return n.links
    }, a.prototype._outlines = function (n) {
        n ? e("." + l + "_item, ." + l + "_btn").css("outline", "") : e("." + l + "_item, ." + l + "_btn").css("outline", "none")
    }, a.prototype.toggle = function () {
        var e = this;
        e._menuToggle()
    }, a.prototype.open = function () {
        var e = this;
        e.btn.hasClass(l + "_collapsed") && e._menuToggle()
    }, a.prototype.close = function () {
        var e = this;
        e.btn.hasClass(l + "_open") && e._menuToggle()
    }, e.fn[s] = function (n) {
        var t = arguments;
        if (void 0 === n || "object" == typeof n) return this.each(function () {
            e.data(this, "plugin_" + s) || e.data(this, "plugin_" + s, new a(this, n))
        });
        if ("string" == typeof n && "_" !== n[0] && "init" !== n) {
            var i;
            return this.each(function () {
                var l = e.data(this, "plugin_" + s);
                l instanceof a && "function" == typeof l[n] && (i = l[n].apply(l, Array.prototype.slice.call(t, 1)))
            }), void 0 !== i ? i : this
        }
    }
}(jQuery, document, window);


/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-mq-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr = function (a, b, c) {
    function D(a) {
        j.cssText = a
    }

    function E(a, b) {
        return D(n.join(a + ";") + (b || ""))
    }

    function F(a, b) {
        return typeof a === b
    }

    function G(a, b) {
        return !!~("" + a).indexOf(b)
    }

    function H(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!G(e, "-") && j[e] !== c) return b == "pfx" ? e : !0
        }
        return !1
    }

    function I(a, b, d) {
        for (var e in a) {
            var f = b[a[e]];
            if (f !== c) return d === !1 ? a[e] : F(f, "function") ? f.bind(d || b) : f
        }
        return !1
    }

    function J(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1), e = (a + " " + p.join(d + " ") + d).split(" ");
        return F(b, "string") || F(b, "undefined") ? H(e, b) : (e = (a + " " + q.join(d + " ") + d).split(" "), I(e, b, c))
    }

    function K() {
        e.input = function (c) {
            for (var d = 0, e = c.length; d < e; d++) u[c[d]] = c[d] in k;
            return u.list && (u.list = !!b.createElement("datalist") && !!a.HTMLDataListElement), u
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), e.inputtypes = function (a) {
            for (var d = 0, e, f, h, i = a.length; d < i; d++) k.setAttribute("type", f = a[d]), e = k.type !== "text", e && (k.value = l, k.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(f) && k.style.WebkitAppearance !== c ? (g.appendChild(k), h = b.defaultView, e = h.getComputedStyle && h.getComputedStyle(k, null).WebkitAppearance !== "textfield" && k.offsetHeight !== 0, g.removeChild(k)) : /^(search|tel)$/.test(f) || (/^(url|email)$/.test(f) ? e = k.checkValidity && k.checkValidity() === !1 : e = k.value != l)), t[a[d]] = !!e;
            return t
        }("search tel url email datetime date month week time datetime-local number range color".split(" "))
    }

    var d = "2.6.2", e = {}, f = !0, g = b.documentElement, h = "modernizr", i = b.createElement(h), j = i.style,
        k = b.createElement("input"), l = ":)", m = {}.toString, n = " -webkit- -moz- -o- -ms- ".split(" "),
        o = "Webkit Moz O ms", p = o.split(" "), q = o.toLowerCase().split(" "),
        r = {svg: "http://www.w3.org/2000/svg"}, s = {}, t = {}, u = {}, v = [], w = v.slice, x,
        y = function (a, c, d, e) {
            var f, i, j, k, l = b.createElement("div"), m = b.body, n = m || b.createElement("body");
            if (parseInt(d, 10)) while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
            return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i
        }, z = function (b) {
            var c = a.matchMedia || a.msMatchMedia;
            if (c) return c(b).matches;
            var d;
            return y("@media " + b + " { #" + h + " { position: absolute; } }", function (b) {
                d = (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle)["position"] == "absolute"
            }), d
        }, A = function () {
            function d(d, e) {
                e = e || b.createElement(a[d] || "div"), d = "on" + d;
                var f = d in e;
                return f || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(d, ""), f = F(e[d], "function"), F(e[d], "undefined") || (e[d] = c), e.removeAttribute(d))), e = null, f
            }

            var a = {
                select: "input",
                change: "input",
                submit: "form",
                reset: "form",
                error: "img",
                load: "img",
                abort: "img"
            };
            return d
        }(), B = {}.hasOwnProperty, C;
    !F(B, "undefined") && !F(B.call, "undefined") ? C = function (a, b) {
        return B.call(a, b)
    } : C = function (a, b) {
        return b in a && F(a.constructor.prototype[b], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function (b) {
        var c = this;
        if (typeof c != "function") throw new TypeError;
        var d = w.call(arguments, 1), e = function () {
            if (this instanceof e) {
                var a = function () {
                };
                a.prototype = c.prototype;
                var f = new a, g = c.apply(f, d.concat(w.call(arguments)));
                return Object(g) === g ? g : f
            }
            return c.apply(b, d.concat(w.call(arguments)))
        };
        return e
    }), s.flexbox = function () {
        return J("flexWrap")
    }, s.canvas = function () {
        var a = b.createElement("canvas");
        return !!a.getContext && !!a.getContext("2d")
    }, s.canvastext = function () {
        return !!e.canvas && !!F(b.createElement("canvas").getContext("2d").fillText, "function")
    }, s.webgl = function () {
        return !!a.WebGLRenderingContext
    }, s.touch = function () {
        var c;
        return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : y(["@media (", n.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (a) {
            c = a.offsetTop === 9
        }), c
    }, s.geolocation = function () {
        return "geolocation" in navigator
    }, s.postmessage = function () {
        return !!a.postMessage
    }, s.websqldatabase = function () {
        return !!a.openDatabase
    }, s.indexedDB = function () {
        return !!J("indexedDB", a)
    }, s.hashchange = function () {
        return A("hashchange", a) && (b.documentMode === c || b.documentMode > 7)
    }, s.history = function () {
        return !!a.history && !!history.pushState
    }, s.draganddrop = function () {
        var a = b.createElement("div");
        return "draggable" in a || "ondragstart" in a && "ondrop" in a
    }, s.websockets = function () {
        return "WebSocket" in a || "MozWebSocket" in a
    }, s.rgba = function () {
        return D("background-color:rgba(150,255,150,.5)"), G(j.backgroundColor, "rgba")
    }, s.hsla = function () {
        return D("background-color:hsla(120,40%,100%,.5)"), G(j.backgroundColor, "rgba") || G(j.backgroundColor, "hsla")
    }, s.multiplebgs = function () {
        return D("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(j.background)
    }, s.backgroundsize = function () {
        return J("backgroundSize")
    }, s.borderimage = function () {
        return J("borderImage")
    }, s.borderradius = function () {
        return J("borderRadius")
    }, s.boxshadow = function () {
        return J("boxShadow")
    }, s.textshadow = function () {
        return b.createElement("div").style.textShadow === ""
    }, s.opacity = function () {
        return E("opacity:.55"), /^0.55$/.test(j.opacity)
    }, s.cssanimations = function () {
        return J("animationName")
    }, s.csscolumns = function () {
        return J("columnCount")
    }, s.cssgradients = function () {
        var a = "background-image:", b = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
            c = "linear-gradient(left top,#9f9, white);";
        return D((a + "-webkit- ".split(" ").join(b + a) + n.join(c + a)).slice(0, -a.length)), G(j.backgroundImage, "gradient")
    }, s.cssreflections = function () {
        return J("boxReflect")
    }, s.csstransforms = function () {
        return !!J("transform")
    }, s.csstransforms3d = function () {
        var a = !!J("perspective");
        return a && "webkitPerspective" in g.style && y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function (b, c) {
            a = b.offsetLeft === 9 && b.offsetHeight === 3
        }), a
    }, s.csstransitions = function () {
        return J("transition")
    }, s.fontface = function () {
        var a;
        return y('@font-face {font-family:"font";src:url("https://")}', function (c, d) {
            var e = b.getElementById("smodernizr"), f = e.sheet || e.styleSheet,
                g = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "";
            a = /src/i.test(g) && g.indexOf(d.split(" ")[0]) === 0
        }), a
    }, s.generatedcontent = function () {
        var a;
        return y(["#", h, "{font:0/0 a}#", h, ':after{content:"', l, '";visibility:hidden;font:3px/1 a}'].join(""), function (b) {
            a = b.offsetHeight >= 3
        }), a
    }, s.video = function () {
        var a = b.createElement("video"), c = !1;
        try {
            if (c = !!a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "")
        } catch (d) {
        }
        return c
    }, s.audio = function () {
        var a = b.createElement("audio"), c = !1;
        try {
            if (c = !!a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""), c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, "")
        } catch (d) {
        }
        return c
    }, s.localstorage = function () {
        try {
            return localStorage.setItem(h, h), localStorage.removeItem(h), !0
        } catch (a) {
            return !1
        }
    }, s.sessionstorage = function () {
        try {
            return sessionStorage.setItem(h, h), sessionStorage.removeItem(h), !0
        } catch (a) {
            return !1
        }
    }, s.webworkers = function () {
        return !!a.Worker
    }, s.applicationcache = function () {
        return !!a.applicationCache
    }, s.svg = function () {
        return !!b.createElementNS && !!b.createElementNS(r.svg, "svg").createSVGRect
    }, s.inlinesvg = function () {
        var a = b.createElement("div");
        return a.innerHTML = "<svg/>", (a.firstChild && a.firstChild.namespaceURI) == r.svg
    }, s.smil = function () {
        return !!b.createElementNS && /SVGAnimate/.test(m.call(b.createElementNS(r.svg, "animate")))
    }, s.svgclippaths = function () {
        return !!b.createElementNS && /SVGClipPath/.test(m.call(b.createElementNS(r.svg, "clipPath")))
    };
    for (var L in s) C(s, L) && (x = L.toLowerCase(), e[x] = s[L](), v.push((e[x] ? "" : "no-") + x));
    return e.input || K(), e.addTest = function (a, b) {
        if (typeof a == "object") for (var d in a) C(a, d) && e.addTest(d, a[d]); else {
            a = a.toLowerCase();
            if (e[a] !== c) return e;
            b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b
        }
        return e
    }, D(""), i = k = null, function (a, b) {
        function k(a, b) {
            var c = a.createElement("p"), d = a.getElementsByTagName("head")[0] || a.documentElement;
            return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
        }

        function l() {
            var a = r.elements;
            return typeof a == "string" ? a.split(" ") : a
        }

        function m(a) {
            var b = i[a[g]];
            return b || (b = {}, h++, a[g] = h, i[h] = b), b
        }

        function n(a, c, f) {
            c || (c = b);
            if (j) return c.createElement(a);
            f || (f = m(c));
            var g;
            return f.cache[a] ? g = f.cache[a].cloneNode() : e.test(a) ? g = (f.cache[a] = f.createElem(a)).cloneNode() : g = f.createElem(a), g.canHaveChildren && !d.test(a) ? f.frag.appendChild(g) : g
        }

        function o(a, c) {
            a || (a = b);
            if (j) return a.createDocumentFragment();
            c = c || m(a);
            var d = c.frag.cloneNode(), e = 0, f = l(), g = f.length;
            for (; e < g; e++) d.createElement(f[e]);
            return d
        }

        function p(a, b) {
            b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function (c) {
                return r.shivMethods ? n(c, a, b) : b.createElem(c)
            }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + l().join().replace(/\w+/g, function (a) {
                return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
            }) + ");return n}")(r, b.frag)
        }

        function q(a) {
            a || (a = b);
            var c = m(a);
            return r.shivCSS && !f && !c.hasCSS && (c.hasCSS = !!k(a, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), j || p(a, c), a
        }

        var c = a.html5 || {}, d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
            e = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
            f, g = "_html5shiv", h = 0, i = {}, j;
        (function () {
            try {
                var a = b.createElement("a");
                a.innerHTML = "<xyz></xyz>", f = "hidden" in a, j = a.childNodes.length == 1 || function () {
                    b.createElement("a");
                    var a = b.createDocumentFragment();
                    return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined"
                }()
            } catch (c) {
                f = !0, j = !0
            }
        })();
        var r = {
            elements: c.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
            shivCSS: c.shivCSS !== !1,
            supportsUnknownElements: j,
            shivMethods: c.shivMethods !== !1,
            type: "default",
            shivDocument: q,
            createElement: n,
            createDocumentFragment: o
        };
        a.html5 = r, q(b)
    }(this, b), e._version = d, e._prefixes = n, e._domPrefixes = q, e._cssomPrefixes = p, e.mq = z, e.hasEvent = A, e.testProp = function (a) {
        return H([a])
    }, e.testAllProps = J, e.testStyles = y, e.prefixed = function (a, b, c) {
        return b ? J(a, b, c) : J(a, "pfx")
    }, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + v.join(" ") : ""), e
}(this, this.document), function (a, b, c) {
    function d(a) {
        return "[object Function]" == o.call(a)
    }

    function e(a) {
        return "string" == typeof a
    }

    function f() {
    }

    function g(a) {
        return !a || "loaded" == a || "complete" == a || "uninitialized" == a
    }

    function h() {
        var a = p.shift();
        q = 1, a ? a.t ? m(function () {
            ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
        }, 0) : (a(), h()) : q = 0
    }

    function i(a, c, d, e, f, i, j) {
        function k(b) {
            if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
                "img" != a && m(function () {
                    t.removeChild(l)
                }, 50);
                for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload()
            }
        }

        var j = j || B.errorTimeout, l = b.createElement(a), o = 0, r = 0, u = {t: d, s: c, e: f, a: i, x: j};
        1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function () {
            k.call(this, r)
        }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l))
    }

    function j(a, b, c, d, f) {
        return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this
    }

    function k() {
        var a = B;
        return a.loader = {load: j, i: 0}, a
    }

    var l = b.documentElement, m = a.setTimeout, n = b.getElementsByTagName("script")[0], o = {}.toString, p = [],
        q = 0, r = "MozAppearance" in l.style, s = r && !!b.createRange().compareNode, t = s ? l : n.parentNode,
        l = a.opera && "[object Opera]" == o.call(a.opera), l = !!b.attachEvent && !l,
        u = r ? "object" : l ? "script" : "img", v = l ? "script" : u, w = Array.isArray || function (a) {
            return "[object Array]" == o.call(a)
        }, x = [], y = {}, z = {
            timeout: function (a, b) {
                return b.length && (a.timeout = b[0]), a
            }
        }, A, B;
    B = function (a) {
        function b(a) {
            var a = a.split("!"), b = x.length, c = a.pop(), d = a.length, c = {url: c, origUrl: c, prefixes: a}, e, f,
                g;
            for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
            for (f = 0; f < b; f++) c = x[f](c);
            return c
        }

        function g(a, e, f, g, h) {
            var i = b(a), j = i.autoCallback;
            i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function () {
                k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2
            })))
        }

        function h(a, b) {
            function c(a, c) {
                if (a) {
                    if (e(a)) c || (j = function () {
                        var a = [].slice.call(arguments);
                        k.apply(this, a), l()
                    }), g(a, j, b, 0, h); else if (Object(a) === a) for (n in m = function () {
                        var b = 0, c;
                        for (c in a) a.hasOwnProperty(c) && b++;
                        return b
                    }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function () {
                        var a = [].slice.call(arguments);
                        k.apply(this, a), l()
                    } : j[n] = function (a) {
                        return function () {
                            var b = [].slice.call(arguments);
                            a && a.apply(this, b), l()
                        }
                    }(k[n])), g(a[n], j, b, n, h))
                } else !c && l()
            }

            var h = !!a.test, i = a.load || a.both, j = a.callback || f, k = j, l = a.complete || f, m, n;
            c(h ? a.yep : a.nope, !!i), i && c(i)
        }

        var i, j, l = this.yepnope.loader;
        if (e(a)) g(a, 0, l, 0); else if (w(a)) for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l); else Object(a) === a && h(a, l)
    }, B.addPrefix = function (a, b) {
        z[a] = b
    }, B.addFilter = function (a) {
        x.push(a)
    }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function () {
        b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete"
    }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function (a, c, d, e, i, j) {
        var k = b.createElement("script"), l, o, e = e || B.errorTimeout;
        k.src = a;
        for (o in d) k.setAttribute(o, d[o]);
        c = j ? h : c || f, k.onreadystatechange = k.onload = function () {
            !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null)
        }, m(function () {
            l || (l = 1, c(1))
        }, e), i ? k.onload() : n.parentNode.insertBefore(k, n)
    }, a.yepnope.injectCss = function (a, c, d, e, g, i) {
        var e = b.createElement("link"), j, c = i ? h : c || f;
        e.href = a, e.rel = "stylesheet", e.type = "text/css";
        for (j in d) e.setAttribute(j, d[j]);
        g || (n.parentNode.insertBefore(e, n), m(c, 0))
    }
}(this, document), Modernizr.load = function () {
    yepnope.apply(window, [].slice.call(arguments, 0))
};


/**
 * Main JS file
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        if ($('#back-to-top').length) {
            var scrollTrigger = 100, // px
                backToTop = function () {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > scrollTrigger) {
                        $('#back-to-top').addClass('show');
                    } else {
                        $('#back-to-top').removeClass('show');
                    }
                };
            backToTop();
            $(window).on('scroll', function () {
                backToTop();
            });
            $('#back-to-top').on('click', function (e) {
                e.preventDefault();
                $('html,body').animate({
                    scrollTop: 0
                }, 700);
            });
        }

        $('.scrolltocomments').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: $("#disqus_thread").offset().top
            }, 700);
        });

        $('#menu').slicknav();

        // site preloader -- also uncomment the div in the header and the css style for #preloader
        $(window).load(function () {
            $('#preloader').fadeOut('fast', function () {
                $(this).remove();
            });
        });


    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
                elem: $(this),
                speed: 500
            },

            allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove)}, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove}, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top)}, allOptions.speed);
            }
        });

    };
})(jQuery);
