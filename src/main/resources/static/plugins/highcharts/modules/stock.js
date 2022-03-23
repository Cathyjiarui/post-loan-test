/*
 Highcharts JS v7.1.2 (2019-06-03)

 Highstock as a plugin for Highcharts

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (t) {
    "object" === typeof module && module.exports ? (t["default"] = t, module.exports = t) : "function" === typeof define && define.amd ? define("highcharts/modules/stock", ["highcharts"], function (E) {
        t(E);
        t.Highcharts = E;
        return t
    }) : t("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (t) {
    function E(b, z, q, t) {
        b.hasOwnProperty(z) || (b[z] = t.apply(null, q))
    }

    t = t ? t._modules : {};
    E(t, "parts/Scrollbar.js", [t["parts/Globals.js"]], function (b) {
        function z(a, l, w) {
            this.init(a, l, w)
        }

        var q = b.addEvent, t = b.Axis, u = b.correctFloat,
            D = b.defaultOptions, B = b.defined, v = b.destroyObjectProperties, A = b.fireEvent, C = b.hasTouch,
            m = b.merge, e = b.pick, r = b.removeEvent, p, h = {
                height: b.isTouchDevice ? 20 : 14,
                barBorderRadius: 0,
                buttonBorderRadius: 0,
                liveRedraw: void 0,
                margin: 10,
                minWidth: 6,
                step: .2,
                zIndex: 3,
                barBackgroundColor: "#cccccc",
                barBorderWidth: 1,
                barBorderColor: "#cccccc",
                buttonArrowColor: "#333333",
                buttonBackgroundColor: "#e6e6e6",
                buttonBorderColor: "#cccccc",
                buttonBorderWidth: 1,
                rifleColor: "#333333",
                trackBackgroundColor: "#f2f2f2",
                trackBorderColor: "#f2f2f2",
                trackBorderWidth: 1
            };
        D.scrollbar = m(!0, h, D.scrollbar);
        b.swapXY = p = function (a, l) {
            var w = a.length, c;
            if (l) for (l = 0; l < w; l += 3) c = a[l + 1], a[l + 1] = a[l + 2], a[l + 2] = c;
            return a
        };
        z.prototype = {
            init: function (a, l, w) {
                this.scrollbarButtons = [];
                this.renderer = a;
                this.userOptions = l;
                this.options = m(h, l);
                this.chart = w;
                this.size = e(this.options.size, this.options.height);
                l.enabled && (this.render(), this.initEvents(), this.addEvents())
            }, render: function () {
                var a = this.renderer, l = this.options, w = this.size, c = this.chart.styledMode, k;
                this.group =
                    k = a.g("scrollbar").attr({zIndex: l.zIndex, translateY: -99999}).add();
                this.track = a.rect().addClass("highcharts-scrollbar-track").attr({
                    x: 0,
                    r: l.trackBorderRadius || 0,
                    height: w,
                    width: w
                }).add(k);
                c || this.track.attr({
                    fill: l.trackBackgroundColor,
                    stroke: l.trackBorderColor,
                    "stroke-width": l.trackBorderWidth
                });
                this.trackBorderWidth = this.track.strokeWidth();
                this.track.attr({y: -this.trackBorderWidth % 2 / 2});
                this.scrollbarGroup = a.g().add(k);
                this.scrollbar = a.rect().addClass("highcharts-scrollbar-thumb").attr({
                    height: w,
                    width: w, r: l.barBorderRadius || 0
                }).add(this.scrollbarGroup);
                this.scrollbarRifles = a.path(p(["M", -3, w / 4, "L", -3, 2 * w / 3, "M", 0, w / 4, "L", 0, 2 * w / 3, "M", 3, w / 4, "L", 3, 2 * w / 3], l.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);
                c || (this.scrollbar.attr({
                    fill: l.barBackgroundColor,
                    stroke: l.barBorderColor,
                    "stroke-width": l.barBorderWidth
                }), this.scrollbarRifles.attr({stroke: l.rifleColor, "stroke-width": 1}));
                this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
                this.scrollbarGroup.translate(-this.scrollbarStrokeWidth %
                    2 / 2, -this.scrollbarStrokeWidth % 2 / 2);
                this.drawScrollbarButton(0);
                this.drawScrollbarButton(1)
            }, position: function (a, l, w, c) {
                var k = this.options.vertical, n = 0, b = this.rendered ? "animate" : "attr";
                this.x = a;
                this.y = l + this.trackBorderWidth;
                this.width = w;
                this.xOffset = this.height = c;
                this.yOffset = n;
                k ? (this.width = this.yOffset = w = n = this.size, this.xOffset = l = 0, this.barWidth = c - 2 * w, this.x = a += this.options.margin) : (this.height = this.xOffset = c = l = this.size, this.barWidth = w - 2 * c, this.y += this.options.margin);
                this.group[b]({
                    translateX: a,
                    translateY: this.y
                });
                this.track[b]({width: w, height: c});
                this.scrollbarButtons[1][b]({translateX: k ? 0 : w - l, translateY: k ? c - n : 0})
            }, drawScrollbarButton: function (a) {
                var l = this.renderer, b = this.scrollbarButtons, c = this.options, k = this.size, n;
                n = l.g().add(this.group);
                b.push(n);
                n = l.rect().addClass("highcharts-scrollbar-button").add(n);
                this.chart.styledMode || n.attr({
                    stroke: c.buttonBorderColor,
                    "stroke-width": c.buttonBorderWidth,
                    fill: c.buttonBackgroundColor
                });
                n.attr(n.crisp({x: -.5, y: -.5, width: k + 1, height: k + 1, r: c.buttonBorderRadius},
                    n.strokeWidth()));
                n = l.path(p(["M", k / 2 + (a ? -1 : 1), k / 2 - 3, "L", k / 2 + (a ? -1 : 1), k / 2 + 3, "L", k / 2 + (a ? 2 : -2), k / 2], c.vertical)).addClass("highcharts-scrollbar-arrow").add(b[a]);
                this.chart.styledMode || n.attr({fill: c.buttonArrowColor})
            }, setRange: function (a, l) {
                var b = this.options, c = b.vertical, k = b.minWidth, n = this.barWidth, h, g,
                    d = !this.rendered || this.hasDragged || this.chart.navigator && this.chart.navigator.hasDragged ? "attr" : "animate";
                B(n) && (a = Math.max(a, 0), h = Math.ceil(n * a), this.calculatedWidth = g = u(n * Math.min(l, 1) - h), g < k &&
                (h = (n - k + g) * a, g = k), k = Math.floor(h + this.xOffset + this.yOffset), n = g / 2 - .5, this.from = a, this.to = l, c ? (this.scrollbarGroup[d]({translateY: k}), this.scrollbar[d]({height: g}), this.scrollbarRifles[d]({translateY: n}), this.scrollbarTop = k, this.scrollbarLeft = 0) : (this.scrollbarGroup[d]({translateX: k}), this.scrollbar[d]({width: g}), this.scrollbarRifles[d]({translateX: n}), this.scrollbarLeft = k, this.scrollbarTop = 0), 12 >= g ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0), !1 === b.showFull && (0 >= a && 1 <= l ? this.group.hide() :
                    this.group.show()), this.rendered = !0)
            }, initEvents: function () {
                var a = this;
                a.mouseMoveHandler = function (l) {
                    var b = a.chart.pointer.normalize(l), c = a.options.vertical ? "chartY" : "chartX",
                        k = a.initPositions;
                    !a.grabbedCenter || l.touches && 0 === l.touches[0][c] || (b = a.cursorToScrollbarPosition(b)[c], c = a[c], c = b - c, a.hasDragged = !0, a.updatePosition(k[0] + c, k[1] + c), a.hasDragged && A(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMType: l.type,
                        DOMEvent: l
                    }))
                };
                a.mouseUpHandler = function (l) {
                    a.hasDragged && A(a, "changed", {
                        from: a.from,
                        to: a.to, trigger: "scrollbar", DOMType: l.type, DOMEvent: l
                    });
                    a.grabbedCenter = a.hasDragged = a.chartX = a.chartY = null
                };
                a.mouseDownHandler = function (l) {
                    l = a.chart.pointer.normalize(l);
                    l = a.cursorToScrollbarPosition(l);
                    a.chartX = l.chartX;
                    a.chartY = l.chartY;
                    a.initPositions = [a.from, a.to];
                    a.grabbedCenter = !0
                };
                a.buttonToMinClick = function (l) {
                    var b = u(a.to - a.from) * a.options.step;
                    a.updatePosition(u(a.from - b), u(a.to - b));
                    A(a, "changed", {from: a.from, to: a.to, trigger: "scrollbar", DOMEvent: l})
                };
                a.buttonToMaxClick = function (l) {
                    var b =
                        (a.to - a.from) * a.options.step;
                    a.updatePosition(a.from + b, a.to + b);
                    A(a, "changed", {from: a.from, to: a.to, trigger: "scrollbar", DOMEvent: l})
                };
                a.trackClick = function (l) {
                    var b = a.chart.pointer.normalize(l), c = a.to - a.from, k = a.y + a.scrollbarTop,
                        n = a.x + a.scrollbarLeft;
                    a.options.vertical && b.chartY > k || !a.options.vertical && b.chartX > n ? a.updatePosition(a.from + c, a.to + c) : a.updatePosition(a.from - c, a.to - c);
                    A(a, "changed", {from: a.from, to: a.to, trigger: "scrollbar", DOMEvent: l})
                }
            }, cursorToScrollbarPosition: function (a) {
                var l = this.options,
                    l = l.minWidth > this.calculatedWidth ? l.minWidth : 0;
                return {
                    chartX: (a.chartX - this.x - this.xOffset) / (this.barWidth - l),
                    chartY: (a.chartY - this.y - this.yOffset) / (this.barWidth - l)
                }
            }, updatePosition: function (a, l) {
                1 < l && (a = u(1 - u(l - a)), l = 1);
                0 > a && (l = u(l - a), a = 0);
                this.from = a;
                this.to = l
            }, update: function (a) {
                this.destroy();
                this.init(this.chart.renderer, m(!0, this.options, a), this.chart)
            }, addEvents: function () {
                var a = this.options.inverted ? [1, 0] : [0, 1], l = this.scrollbarButtons,
                    b = this.scrollbarGroup.element, c = this.mouseDownHandler,
                    k = this.mouseMoveHandler, n = this.mouseUpHandler,
                    a = [[l[a[0]].element, "click", this.buttonToMinClick], [l[a[1]].element, "click", this.buttonToMaxClick], [this.track.element, "click", this.trackClick], [b, "mousedown", c], [b.ownerDocument, "mousemove", k], [b.ownerDocument, "mouseup", n]];
                C && a.push([b, "touchstart", c], [b.ownerDocument, "touchmove", k], [b.ownerDocument, "touchend", n]);
                a.forEach(function (a) {
                    q.apply(null, a)
                });
                this._events = a
            }, removeEvents: function () {
                this._events.forEach(function (a) {
                    r.apply(null, a)
                });
                this._events.length =
                    0
            }, destroy: function () {
                var a = this.chart.scroller;
                this.removeEvents();
                ["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"].forEach(function (a) {
                    this[a] && this[a].destroy && (this[a] = this[a].destroy())
                }, this);
                a && this === a.scrollbar && (a.scrollbar = null, v(a.scrollbarButtons))
            }
        };
        b.Scrollbar || (q(t, "afterInit", function () {
            var a = this;
            a.options && a.options.scrollbar && a.options.scrollbar.enabled && (a.options.scrollbar.vertical = !a.horiz, a.options.startOnTick = a.options.endOnTick = !1, a.scrollbar = new z(a.chart.renderer,
                a.options.scrollbar, a.chart), q(a.scrollbar, "changed", function (l) {
                var h = Math.min(e(a.options.min, a.min), a.min, a.dataMin),
                    c = Math.max(e(a.options.max, a.max), a.max, a.dataMax) - h, k;
                a.horiz && !a.reversed || !a.horiz && a.reversed ? (k = h + c * this.to, h += c * this.from) : (k = h + c * (1 - this.from), h += c * (1 - this.to));
                e(this.options.liveRedraw, b.svg && !b.isTouchDevice && !this.chart.isBoosting) || "mouseup" === l.DOMType || !B(l.DOMType) ? a.setExtremes(h, k, !0, "mousemove" !== l.DOMType, l) : this.setRange(this.from, this.to)
            }))
        }), q(t, "afterRender",
            function () {
                var a = Math.min(e(this.options.min, this.min), this.min, e(this.dataMin, this.min)),
                    l = Math.max(e(this.options.max, this.max), this.max, e(this.dataMax, this.max)),
                    b = this.scrollbar, c = this.axisTitleMargin + (this.titleOffset || 0),
                    k = this.chart.scrollbarsOffsets, n = this.options.margin || 0;
                b && (this.horiz ? (this.opposite || (k[1] += c), b.position(this.left, this.top + this.height + 2 + k[1] - (this.opposite ? n : 0), this.width, this.height), this.opposite || (k[1] += n), c = 1) : (this.opposite && (k[0] += c), b.position(this.left + this.width +
                    2 + k[0] - (this.opposite ? 0 : n), this.top, this.width, this.height), this.opposite && (k[0] += n), c = 0), k[c] += b.size + b.options.margin, isNaN(a) || isNaN(l) || !B(this.min) || !B(this.max) || this.min === this.max ? b.setRange(0, 1) : (k = (this.min - a) / (l - a), a = (this.max - a) / (l - a), this.horiz && !this.reversed || !this.horiz && this.reversed ? b.setRange(k, a) : b.setRange(1 - a, 1 - k)))
            }), q(t, "afterGetOffset", function () {
            var a = this.horiz ? 2 : 1, b = this.scrollbar;
            b && (this.chart.scrollbarsOffsets = [0, 0], this.chart.axisOffset[a] += b.size + b.options.margin)
        }),
            b.Scrollbar = z)
    });
    E(t, "parts/Navigator.js", [t["parts/Globals.js"]], function (b) {
        function z(g) {
            this.init(g)
        }

        var q = b.addEvent, t = b.Axis, u = b.Chart, D = b.color, B = b.defaultOptions, v = b.defined,
            A = b.destroyObjectProperties, C = b.erase, m = b.extend, e = b.hasTouch, r = b.isArray, p = b.isNumber,
            h = b.isTouchDevice, a = b.merge, l = b.pick, w = b.removeEvent, c = b.Scrollbar, k = b.Series, n,
            x = function (g) {
                var d = [].filter.call(arguments, p);
                if (d.length) return Math[g].apply(0, d)
            };
        n = void 0 === b.seriesTypes.areaspline ? "line" : "areaspline";
        m(B, {
            navigator: {
                height: 40,
                margin: 25,
                maskInside: !0,
                handles: {
                    width: 7,
                    height: 15,
                    symbols: ["navigator-handle", "navigator-handle"],
                    enabled: !0,
                    lineWidth: 1,
                    backgroundColor: "#f2f2f2",
                    borderColor: "#999999"
                },
                maskFill: D("#6685c2").setOpacity(.3).get(),
                outlineColor: "#cccccc",
                outlineWidth: 1,
                series: {
                    type: n,
                    fillOpacity: .05,
                    lineWidth: 1,
                    compare: null,
                    dataGrouping: {
                        approximation: "average",
                        enabled: !0,
                        groupPixelWidth: 2,
                        smoothed: !0,
                        units: [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour",
                            [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2, 3, 4]], ["week", [1, 2, 3]], ["month", [1, 3, 6]], ["year", null]]
                    },
                    dataLabels: {enabled: !1, zIndex: 2},
                    id: "highcharts-navigator-series",
                    className: "highcharts-navigator-series",
                    lineColor: null,
                    marker: {enabled: !1},
                    pointRange: 0,
                    threshold: null
                },
                xAxis: {
                    overscroll: 0,
                    className: "highcharts-navigator-xaxis",
                    tickLength: 0,
                    lineWidth: 0,
                    gridLineColor: "#e6e6e6",
                    gridLineWidth: 1,
                    tickPixelInterval: 200,
                    labels: {align: "left", style: {color: "#999999"}, x: 3, y: -4},
                    crosshair: !1
                },
                yAxis: {
                    className: "highcharts-navigator-yaxis",
                    gridLineWidth: 0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: .1,
                    maxPadding: .1,
                    labels: {enabled: !1},
                    crosshair: !1,
                    title: {text: null},
                    tickLength: 0,
                    tickWidth: 0
                }
            }
        });
        b.Renderer.prototype.symbols["navigator-handle"] = function (g, d, f, a, c) {
            g = c.width / 2;
            d = Math.round(g / 3) + .5;
            c = c.height;
            return ["M", -g - 1, .5, "L", g, .5, "L", g, c + .5, "L", -g - 1, c + .5, "L", -g - 1, .5, "M", -d, 4, "L", -d, c - 3, "M", d - 1, 4, "L", d - 1, c - 3]
        };
        t.prototype.toFixedRange = function (g, d, f, a) {
            var c = this.chart && this.chart.fixedRange;
            g = l(f, this.translate(g, !0, !this.horiz));
            d = l(a,
                this.translate(d, !0, !this.horiz));
            f = c && (d - g) / c;
            .7 < f && 1.3 > f && (a ? g = d - c : d = g + c);
            p(g) && p(d) || (g = d = void 0);
            return {min: g, max: d}
        };
        z.prototype = {
            drawHandle: function (g, d, f, a) {
                var c = this.navigatorOptions.handles.height;
                this.handles[d][a](f ? {
                    translateX: Math.round(this.left + this.height / 2),
                    translateY: Math.round(this.top + parseInt(g, 10) + .5 - c)
                } : {
                    translateX: Math.round(this.left + parseInt(g, 10)),
                    translateY: Math.round(this.top + this.height / 2 - c / 2 - 1)
                })
            }, drawOutline: function (g, d, f, a) {
                var c = this.navigatorOptions.maskInside,
                    y = this.outline.strokeWidth(), b = y / 2, y = y % 2 / 2, k = this.outlineHeight,
                    l = this.scrollbarHeight, n = this.size, h = this.left - l, e = this.top;
                f ? (h -= b, f = e + d + y, d = e + g + y, g = ["M", h + k, e - l - y, "L", h + k, f, "L", h, f, "L", h, d, "L", h + k, d, "L", h + k, e + n + l].concat(c ? ["M", h + k, f - b, "L", h + k, d + b] : [])) : (g += h + l - y, d += h + l - y, e += b, g = ["M", h, e, "L", g, e, "L", g, e + k, "L", d, e + k, "L", d, e, "L", h + n + 2 * l, e].concat(c ? ["M", g - b, e, "L", d + b, e] : []));
                this.outline[a]({d: g})
            }, drawMasks: function (g, d, f, a) {
                var c = this.left, y = this.top, b = this.height, k, l, n, h;
                f ? (n = [c, c, c], h = [y, y + g,
                    y + d], l = [b, b, b], k = [g, d - g, this.size - d]) : (n = [c, c + g, c + d], h = [y, y, y], l = [g, d - g, this.size - d], k = [b, b, b]);
                this.shades.forEach(function (f, d) {
                    f[a]({x: n[d], y: h[d], width: l[d], height: k[d]})
                })
            }, renderElements: function () {
                var g = this, d = g.navigatorOptions, f = d.maskInside, a = g.chart, c = a.renderer, b,
                    k = {cursor: a.inverted ? "ns-resize" : "ew-resize"};
                g.navigatorGroup = b = c.g("navigator").attr({zIndex: 8, visibility: "hidden"}).add();
                [!f, f, !f].forEach(function (f, y) {
                    g.shades[y] = c.rect().addClass("highcharts-navigator-mask" + (1 === y ? "-inside" :
                        "-outside")).add(b);
                    a.styledMode || g.shades[y].attr({fill: f ? d.maskFill : "rgba(0,0,0,0)"}).css(1 === y && k)
                });
                g.outline = c.path().addClass("highcharts-navigator-outline").add(b);
                a.styledMode || g.outline.attr({"stroke-width": d.outlineWidth, stroke: d.outlineColor});
                d.handles.enabled && [0, 1].forEach(function (f) {
                    d.handles.inverted = a.inverted;
                    g.handles[f] = c.symbol(d.handles.symbols[f], -d.handles.width / 2 - 1, 0, d.handles.width, d.handles.height, d.handles);
                    g.handles[f].attr({zIndex: 7 - f}).addClass("highcharts-navigator-handle highcharts-navigator-handle-" +
                        ["left", "right"][f]).add(b);
                    if (!a.styledMode) {
                        var y = d.handles;
                        g.handles[f].attr({
                            fill: y.backgroundColor,
                            stroke: y.borderColor,
                            "stroke-width": y.lineWidth
                        }).css(k)
                    }
                })
            }, update: function (g) {
                (this.series || []).forEach(function (d) {
                    d.baseSeries && delete d.baseSeries.navigatorSeries
                });
                this.destroy();
                a(!0, this.chart.options.navigator, this.options, g);
                this.init(this.chart)
            }, render: function (g, d, f, a) {
                var c = this.chart, y, k, n = this.scrollbarHeight, h, e = this.xAxis;
                y = e.fake ? c.xAxis[0] : e;
                var m = this.navigatorEnabled, x, w = this.rendered;
                k = c.inverted;
                var r, q = c.xAxis[0].minRange, u = c.xAxis[0].options.maxRange;
                if (!this.hasDragged || v(f)) {
                    if (!p(g) || !p(d)) if (w) f = 0, a = l(e.width, y.width); else return;
                    this.left = l(e.left, c.plotLeft + n + (k ? c.plotWidth : 0));
                    this.size = x = h = l(e.len, (k ? c.plotHeight : c.plotWidth) - 2 * n);
                    c = k ? n : h + 2 * n;
                    f = l(f, e.toPixels(g, !0));
                    a = l(a, e.toPixels(d, !0));
                    p(f) && Infinity !== Math.abs(f) || (f = 0, a = c);
                    g = e.toValue(f, !0);
                    d = e.toValue(a, !0);
                    r = Math.abs(b.correctFloat(d - g));
                    r < q ? this.grabbedLeft ? f = e.toPixels(d - q, !0) : this.grabbedRight && (a = e.toPixels(g +
                        q, !0)) : v(u) && r > u && (this.grabbedLeft ? f = e.toPixels(d - u, !0) : this.grabbedRight && (a = e.toPixels(g + u, !0)));
                    this.zoomedMax = Math.min(Math.max(f, a, 0), x);
                    this.zoomedMin = Math.min(Math.max(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(f, a), 0), x);
                    this.range = this.zoomedMax - this.zoomedMin;
                    x = Math.round(this.zoomedMax);
                    f = Math.round(this.zoomedMin);
                    m && (this.navigatorGroup.attr({visibility: "visible"}), w = w && !this.hasDragged ? "animate" : "attr", this.drawMasks(f, x, k, w), this.drawOutline(f, x, k, w), this.navigatorOptions.handles.enabled &&
                    (this.drawHandle(f, 0, k, w), this.drawHandle(x, 1, k, w)));
                    this.scrollbar && (k ? (k = this.top - n, y = this.left - n + (m || !y.opposite ? 0 : (y.titleOffset || 0) + y.axisTitleMargin), n = h + 2 * n) : (k = this.top + (m ? this.height : -n), y = this.left - n), this.scrollbar.position(y, k, c, n), this.scrollbar.setRange(this.zoomedMin / (h || 1), this.zoomedMax / (h || 1)));
                    this.rendered = !0
                }
            }, addMouseEvents: function () {
                var g = this, d = g.chart, f = d.container, a = [], c, k;
                g.mouseMoveHandler = c = function (f) {
                    g.onMouseMove(f)
                };
                g.mouseUpHandler = k = function (f) {
                    g.onMouseUp(f)
                };
                a = g.getPartsEvents("mousedown");
                a.push(q(f, "mousemove", c), q(f.ownerDocument, "mouseup", k));
                e && (a.push(q(f, "touchmove", c), q(f.ownerDocument, "touchend", k)), a.concat(g.getPartsEvents("touchstart")));
                g.eventsToUnbind = a;
                g.series && g.series[0] && a.push(q(g.series[0].xAxis, "foundExtremes", function () {
                    d.navigator.modifyNavigatorAxisExtremes()
                }))
            }, getPartsEvents: function (g) {
                var d = this, f = [];
                ["shades", "handles"].forEach(function (a) {
                    d[a].forEach(function (c, y) {
                        f.push(q(c.element, g, function (f) {
                            d[a + "Mousedown"](f, y)
                        }))
                    })
                });
                return f
            }, shadesMousedown: function (g, d) {
                g = this.chart.pointer.normalize(g);
                var f = this.chart, a = this.xAxis, c = this.zoomedMin, k = this.left, b = this.size, n = this.range,
                    l = g.chartX, h, e;
                f.inverted && (l = g.chartY, k = this.top);
                1 === d ? (this.grabbedCenter = l, this.fixedWidth = n, this.dragOffset = l - c) : (g = l - k - n / 2, 0 === d ? g = Math.max(0, g) : 2 === d && g + n >= b && (g = b - n, this.reversedExtremes ? (g -= n, e = this.getUnionExtremes().dataMin) : h = this.getUnionExtremes().dataMax), g !== c && (this.fixedWidth = n, d = a.toFixedRange(g, g + n, e, h), v(d.min) && f.xAxis[0].setExtremes(Math.min(d.min,
                    d.max), Math.max(d.min, d.max), !0, null, {trigger: "navigator"})))
            }, handlesMousedown: function (g, d) {
                this.chart.pointer.normalize(g);
                g = this.chart;
                var f = g.xAxis[0], a = this.reversedExtremes;
                0 === d ? (this.grabbedLeft = !0, this.otherHandlePos = this.zoomedMax, this.fixedExtreme = a ? f.min : f.max) : (this.grabbedRight = !0, this.otherHandlePos = this.zoomedMin, this.fixedExtreme = a ? f.max : f.min);
                g.fixedRange = null
            }, onMouseMove: function (g) {
                var d = this, f = d.chart, a = d.left, c = d.navigatorSize, k = d.range, n = d.dragOffset,
                    e = f.inverted;
                g.touches &&
                0 === g.touches[0].pageX || (g = f.pointer.normalize(g), f = g.chartX, e && (a = d.top, f = g.chartY), d.grabbedLeft ? (d.hasDragged = !0, d.render(0, 0, f - a, d.otherHandlePos)) : d.grabbedRight ? (d.hasDragged = !0, d.render(0, 0, d.otherHandlePos, f - a)) : d.grabbedCenter && (d.hasDragged = !0, f < n ? f = n : f > c + n - k && (f = c + n - k), d.render(0, 0, f - n, f - n + k)), d.hasDragged && d.scrollbar && l(d.scrollbar.options.liveRedraw, b.svg && !h && !this.chart.isBoosting) && (g.DOMType = g.type, setTimeout(function () {
                    d.onMouseUp(g)
                }, 0)))
            }, onMouseUp: function (a) {
                var d = this.chart,
                    f = this.xAxis, g = this.scrollbar, c, k, n = a.DOMEvent || a;
                (!this.hasDragged || g && g.hasDragged) && "scrollbar" !== a.trigger || (g = this.getUnionExtremes(), this.zoomedMin === this.otherHandlePos ? c = this.fixedExtreme : this.zoomedMax === this.otherHandlePos && (k = this.fixedExtreme), this.zoomedMax === this.size && (k = this.reversedExtremes ? g.dataMin : g.dataMax), 0 === this.zoomedMin && (c = this.reversedExtremes ? g.dataMax : g.dataMin), f = f.toFixedRange(this.zoomedMin, this.zoomedMax, c, k), v(f.min) && d.xAxis[0].setExtremes(Math.min(f.min, f.max),
                    Math.max(f.min, f.max), !0, this.hasDragged ? !1 : null, {
                        trigger: "navigator",
                        triggerOp: "navigator-drag",
                        DOMEvent: n
                    }));
                "mousemove" !== a.DOMType && (this.grabbedLeft = this.grabbedRight = this.grabbedCenter = this.fixedWidth = this.fixedExtreme = this.otherHandlePos = this.hasDragged = this.dragOffset = null)
            }, removeEvents: function () {
                this.eventsToUnbind && (this.eventsToUnbind.forEach(function (a) {
                    a()
                }), this.eventsToUnbind = void 0);
                this.removeBaseSeriesEvents()
            }, removeBaseSeriesEvents: function () {
                var a = this.baseSeries || [];
                this.navigatorEnabled &&
                a[0] && (!1 !== this.navigatorOptions.adaptToUpdatedData && a.forEach(function (d) {
                    w(d, "updatedData", this.updatedDataHandler)
                }, this), a[0].xAxis && w(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes))
            }, init: function (g) {
                var d = g.options, f = d.navigator, k = f.enabled, n = d.scrollbar, b = n.enabled, d = k ? f.height : 0,
                    h = b ? n.height : 0;
                this.handles = [];
                this.shades = [];
                this.chart = g;
                this.setBaseSeries();
                this.height = d;
                this.scrollbarHeight = h;
                this.scrollbarEnabled = b;
                this.navigatorEnabled = k;
                this.navigatorOptions = f;
                this.scrollbarOptions =
                    n;
                this.outlineHeight = d + h;
                this.opposite = l(f.opposite, !k && g.inverted);
                var e = this, k = e.baseSeries, n = g.xAxis.length, b = g.yAxis.length,
                    m = k && k[0] && k[0].xAxis || g.xAxis[0] || {options: {}};
                g.isDirtyBox = !0;
                e.navigatorEnabled ? (e.xAxis = new t(g, a({
                    breaks: m.options.breaks,
                    ordinal: m.options.ordinal
                }, f.xAxis, {
                    id: "navigator-x-axis",
                    yAxis: "navigator-y-axis",
                    isX: !0,
                    type: "datetime",
                    index: n,
                    isInternal: !0,
                    offset: 0,
                    keepOrdinalPadding: !0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: 0,
                    maxPadding: 0,
                    zoomEnabled: !1
                }, g.inverted ? {
                    offsets: [h,
                        0, -h, 0], width: d
                } : {offsets: [0, -h, 0, h], height: d})), e.yAxis = new t(g, a(f.yAxis, {
                    id: "navigator-y-axis",
                    alignTicks: !1,
                    offset: 0,
                    index: b,
                    isInternal: !0,
                    zoomEnabled: !1
                }, g.inverted ? {width: d} : {height: d})), k || f.series.data ? e.updateNavigatorSeries(!1) : 0 === g.series.length && (e.unbindRedraw = q(g, "beforeRedraw", function () {
                    0 < g.series.length && !e.series && (e.setBaseSeries(), e.unbindRedraw())
                })), e.reversedExtremes = g.inverted && !e.xAxis.reversed || !g.inverted && e.xAxis.reversed, e.renderElements(), e.addMouseEvents()) : e.xAxis =
                    {
                        translate: function (f, d) {
                            var a = g.xAxis[0], c = a.getExtremes(), k = a.len - 2 * h,
                                n = x("min", a.options.min, c.dataMin), a = x("max", a.options.max, c.dataMax) - n;
                            return d ? f * a / k + n : k * (f - n) / a
                        }, toPixels: function (f) {
                            return this.translate(f)
                        }, toValue: function (f) {
                            return this.translate(f, !0)
                        }, toFixedRange: t.prototype.toFixedRange, fake: !0
                    };
                g.options.scrollbar.enabled && (g.scrollbar = e.scrollbar = new c(g.renderer, a(g.options.scrollbar, {
                    margin: e.navigatorEnabled ? 0 : 10,
                    vertical: g.inverted
                }), g), q(e.scrollbar, "changed", function (f) {
                    var a =
                        e.size, d = a * this.to, a = a * this.from;
                    e.hasDragged = e.scrollbar.hasDragged;
                    e.render(0, 0, a, d);
                    (g.options.scrollbar.liveRedraw || "mousemove" !== f.DOMType && "touchmove" !== f.DOMType) && setTimeout(function () {
                        e.onMouseUp(f)
                    })
                }));
                e.addBaseSeriesEvents();
                e.addChartEvents()
            }, getUnionExtremes: function (a) {
                var d = this.chart.xAxis[0], f = this.xAxis, c = f.options, g = d.options, k;
                a && null === d.dataMin || (k = {
                    dataMin: l(c && c.min, x("min", g.min, d.dataMin, f.dataMin, f.min)),
                    dataMax: l(c && c.max, x("max", g.max, d.dataMax, f.dataMax, f.max))
                });
                return k
            },
            setBaseSeries: function (a, d) {
                var f = this.chart, c = this.baseSeries = [];
                a = a || f.options && f.options.navigator.baseSeries || (f.series.length ? b.find(f.series, function (f) {
                    return !f.options.isInternal
                }).index : 0);
                (f.series || []).forEach(function (f, d) {
                    f.options.isInternal || !f.options.showInNavigator && (d !== a && f.options.id !== a || !1 === f.options.showInNavigator) || c.push(f)
                });
                this.xAxis && !this.xAxis.fake && this.updateNavigatorSeries(!0, d)
            }, updateNavigatorSeries: function (c, d) {
                var f = this, g = f.chart, k = f.baseSeries, n, l, h = f.navigatorOptions.series,
                    e, x = {
                        enableMouseTracking: !1,
                        index: null,
                        linkedTo: null,
                        group: "nav",
                        padXAxis: !1,
                        xAxis: "navigator-x-axis",
                        yAxis: "navigator-y-axis",
                        showInLegend: !1,
                        stacking: !1,
                        isInternal: !0,
                        states: {inactive: {opacity: 1}}
                    }, p = f.series = (f.series || []).filter(function (a) {
                        var d = a.baseSeries;
                        return 0 > k.indexOf(d) ? (d && (w(d, "updatedData", f.updatedDataHandler), delete d.navigatorSeries), a.chart && a.destroy(), !1) : !0
                    });
                k && k.length && k.forEach(function (c) {
                    var b = c.navigatorSeries, y = m({color: c.color, visible: c.visible}, r(h) ? B.navigator.series :
                        h);
                    b && !1 === f.navigatorOptions.adaptToUpdatedData || (x.name = "Navigator " + k.length, n = c.options || {}, e = n.navigatorOptions || {}, l = a(n, x, y, e), y = e.data || y.data, f.hasNavigatorData = f.hasNavigatorData || !!y, l.data = y || n.data && n.data.slice(0), b && b.options ? b.update(l, d) : (c.navigatorSeries = g.initSeries(l), c.navigatorSeries.baseSeries = c, p.push(c.navigatorSeries)))
                });
                if (h.data && (!k || !k.length) || r(h)) f.hasNavigatorData = !1, h = b.splat(h), h.forEach(function (d, c) {
                    x.name = "Navigator " + (p.length + 1);
                    l = a(B.navigator.series, {
                        color: g.series[c] &&
                            !g.series[c].options.isInternal && g.series[c].color || g.options.colors[c] || g.options.colors[0]
                    }, x, d);
                    l.data = d.data;
                    l.data && (f.hasNavigatorData = !0, p.push(g.initSeries(l)))
                });
                c && this.addBaseSeriesEvents()
            }, addBaseSeriesEvents: function () {
                var a = this, d = a.baseSeries || [];
                d[0] && d[0].xAxis && q(d[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes);
                d.forEach(function (f) {
                    q(f, "show", function () {
                        this.navigatorSeries && this.navigatorSeries.setVisible(!0, !1)
                    });
                    q(f, "hide", function () {
                        this.navigatorSeries && this.navigatorSeries.setVisible(!1,
                            !1)
                    });
                    !1 !== this.navigatorOptions.adaptToUpdatedData && f.xAxis && q(f, "updatedData", this.updatedDataHandler);
                    q(f, "remove", function () {
                        this.navigatorSeries && (C(a.series, this.navigatorSeries), v(this.navigatorSeries.options) && this.navigatorSeries.remove(!1), delete this.navigatorSeries)
                    })
                }, this)
            }, getBaseSeriesMin: function (a) {
                return this.baseSeries.reduce(function (a, f) {
                    return Math.min(a, f.xData ? f.xData[0] : a)
                }, a)
            }, modifyNavigatorAxisExtremes: function () {
                var a = this.xAxis, d;
                a.getExtremes && (!(d = this.getUnionExtremes(!0)) ||
                    d.dataMin === a.min && d.dataMax === a.max || (a.min = d.dataMin, a.max = d.dataMax))
            }, modifyBaseAxisExtremes: function () {
                var a = this.chart.navigator, d = this.getExtremes(), f = d.dataMin, c = d.dataMax, d = d.max - d.min,
                    k = a.stickToMin, n = a.stickToMax, b = l(this.options.overscroll, 0), h, e,
                    m = a.series && a.series[0], x = !!this.setExtremes;
                this.eventArgs && "rangeSelectorButton" === this.eventArgs.trigger || (k && (e = f, h = e + d), n && (h = c + b, k || (e = Math.max(h - d, a.getBaseSeriesMin(m && m.xData ? m.xData[0] : -Number.MAX_VALUE)))), x && (k || n) && p(e) && (this.min =
                    this.userMin = e, this.max = this.userMax = h));
                a.stickToMin = a.stickToMax = null
            }, updatedDataHandler: function () {
                var a = this.chart.navigator, d = this.navigatorSeries, f = a.getBaseSeriesMin(this.xData[0]);
                a.stickToMax = a.reversedExtremes ? 0 === Math.round(a.zoomedMin) : Math.round(a.zoomedMax) >= Math.round(a.size);
                a.stickToMin = p(this.xAxis.min) && this.xAxis.min <= f && (!this.chart.fixedRange || !a.stickToMax);
                d && !a.hasNavigatorData && (d.options.pointStart = this.xData[0], d.setData(this.options.data, !1, null, !1))
            }, addChartEvents: function () {
                this.eventsToUnbind ||
                (this.eventsToUnbind = []);
                this.eventsToUnbind.push(q(this.chart, "redraw", function () {
                    var a = this.navigator,
                        d = a && (a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis || a.scrollbar && this.xAxis[0]);
                    d && a.render(d.min, d.max)
                }), q(this.chart, "getMargins", function () {
                    var a = this.navigator, d = a.opposite ? "plotTop" : "marginBottom";
                    this.inverted && (d = a.opposite ? "marginRight" : "plotLeft");
                    this[d] = (this[d] || 0) + (a.navigatorEnabled || !this.inverted ? a.outlineHeight : 0) + a.navigatorOptions.margin
                }))
            }, destroy: function () {
                this.removeEvents();
                this.xAxis && (C(this.chart.xAxis, this.xAxis), C(this.chart.axes, this.xAxis));
                this.yAxis && (C(this.chart.yAxis, this.yAxis), C(this.chart.axes, this.yAxis));
                (this.series || []).forEach(function (a) {
                    a.destroy && a.destroy()
                });
                "series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" ").forEach(function (a) {
                    this[a] && this[a].destroy && this[a].destroy();
                    this[a] = null
                }, this);
                [this.handles].forEach(function (a) {
                    A(a)
                }, this)
            }
        };
        b.Navigator || (b.Navigator = z,
            q(t, "zoom", function (a) {
                var d = this.chart.options, f = d.chart.zoomType, c = d.chart.pinchType, g = d.navigator,
                    d = d.rangeSelector;
                this.isXAxis && (g && g.enabled || d && d.enabled) && ("y" === f ? a.zoomed = !1 : (!h && "xy" === f || h && "xy" === c) && this.options.range && (f = this.previousZoom, v(a.newMin) ? this.previousZoom = [this.min, this.max] : f && (a.newMin = f[0], a.newMax = f[1], delete this.previousZoom)));
                void 0 !== a.zoomed && a.preventDefault()
            }), q(u, "beforeShowResetZoom", function () {
            var a = this.options, d = a.navigator, f = a.rangeSelector;
            if ((d && d.enabled ||
                f && f.enabled) && (!h && "x" === a.chart.zoomType || h && "x" === a.chart.pinchType)) return !1
        }), q(u, "beforeRender", function () {
            var a = this.options;
            if (a.navigator.enabled || a.scrollbar.enabled) this.scroller = this.navigator = new z(this)
        }), q(u, "afterSetChartSize", function () {
            var a = this.legend, d = this.navigator, f, c, k, n;
            d && (c = a && a.options, k = d.xAxis, n = d.yAxis, f = d.scrollbarHeight, this.inverted ? (d.left = d.opposite ? this.chartWidth - f - d.height : this.spacing[3] + f, d.top = this.plotTop + f) : (d.left = this.plotLeft + f, d.top = d.navigatorOptions.top ||
                this.chartHeight - d.height - f - this.spacing[2] - (this.rangeSelector && this.extraBottomMargin ? this.rangeSelector.getHeight() : 0) - (c && "bottom" === c.verticalAlign && c.enabled && !c.floating ? a.legendHeight + l(c.margin, 10) : 0)), k && n && (this.inverted ? k.options.left = n.options.left = d.left : k.options.top = n.options.top = d.top, k.setAxisSize(), n.setAxisSize()))
        }), q(u, "update", function (c) {
            var d = c.options.navigator || {}, f = c.options.scrollbar || {};
            this.navigator || this.scroller || !d.enabled && !f.enabled || (a(!0, this.options.navigator,
                d), a(!0, this.options.scrollbar, f), delete c.options.navigator, delete c.options.scrollbar)
        }), q(u, "afterUpdate", function (a) {
            this.navigator || this.scroller || !this.options.navigator.enabled && !this.options.scrollbar.enabled || (this.scroller = this.navigator = new z(this), l(a.redraw, !0) && this.redraw(a.animation))
        }), q(u, "afterAddSeries", function () {
            this.navigator && this.navigator.setBaseSeries(null, !1)
        }), q(k, "afterUpdate", function () {
            this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(null,
                !1)
        }), u.prototype.callbacks.push(function (a) {
            var c = a.navigator;
            c && a.xAxis[0] && (a = a.xAxis[0].getExtremes(), c.render(a.min, a.max))
        }))
    });
    E(t, "parts/OrdinalAxis.js", [t["parts/Globals.js"]], function (b) {
        var z = b.addEvent, q = b.Axis, t = b.Chart, u = b.css, D = b.defined, B = b.extend, v = b.noop, A = b.pick,
            C = b.timeUnits;
        z(b.Series, "updatedData", function () {
            var b = this.xAxis;
            b && b.options.ordinal && delete b.ordinalIndex
        });
        q.prototype.getTimeTicks = function (b, e, r, p, h, a, l) {
            var m = 0, c, k, n = {}, x, g, d, f = [], y = -Number.MAX_VALUE, G = this.options.tickPixelInterval,
                F = this.chart.time, H = [];
            if (!this.options.ordinal && !this.options.breaks || !h || 3 > h.length || void 0 === e) return F.getTimeTicks.apply(F, arguments);
            g = h.length;
            for (c = 0; c < g; c++) {
                d = c && h[c - 1] > r;
                h[c] < e && (m = c);
                if (c === g - 1 || h[c + 1] - h[c] > 5 * a || d) {
                    if (h[c] > y) {
                        for (k = F.getTimeTicks(b, h[m], h[c], p); k.length && k[0] <= y;) k.shift();
                        k.length && (y = k[k.length - 1]);
                        H.push(f.length);
                        f = f.concat(k)
                    }
                    m = c + 1
                }
                if (d) break
            }
            k = k.info;
            if (l && k.unitRange <= C.hour) {
                c = f.length - 1;
                for (m = 1; m < c; m++) F.dateFormat("%d", f[m]) !== F.dateFormat("%d", f[m - 1]) && (n[f[m]] =
                    "day", x = !0);
                x && (n[f[0]] = "day");
                k.higherRanks = n
            }
            k.segmentStarts = H;
            f.info = k;
            if (l && D(G)) {
                m = H = f.length;
                x = [];
                for (var q, F = []; m--;) c = this.translate(f[m]), q && (F[m] = q - c), x[m] = q = c;
                F.sort();
                F = F[Math.floor(F.length / 2)];
                F < .6 * G && (F = null);
                m = f[H - 1] > r ? H - 1 : H;
                for (q = void 0; m--;) c = x[m], H = Math.abs(q - c), q && H < .8 * G && (null === F || H < .8 * F) ? (n[f[m]] && !n[f[m + 1]] ? (H = m + 1, q = c) : H = m, f.splice(H, 1)) : q = c
            }
            return f
        };
        B(q.prototype, {
            beforeSetTickPositions: function () {
                var b, e = [], r, p = !1, h, a = this.getExtremes(), l = a.min, w = a.max, c, k = this.isXAxis &&
                    !!this.options.breaks, a = this.options.ordinal, n = Number.MAX_VALUE,
                    x = this.chart.options.chart.ignoreHiddenSeries, g;
                if (a || k) {
                    this.series.forEach(function (a, f) {
                        r = [];
                        if (!(x && !1 === a.visible || !1 === a.takeOrdinalPosition && !k) && (e = e.concat(a.processedXData), b = e.length, e.sort(function (a, f) {
                            return a - f
                        }), n = Math.min(n, A(a.closestPointRange, n)), b)) {
                            for (f = 0; f < b - 1;) e[f] !== e[f + 1] && r.push(e[f + 1]), f++;
                            r[0] !== e[0] && r.unshift(e[0]);
                            e = r
                        }
                        a.isSeriesBoosting && (g = !0)
                    });
                    g && (e.length = 0);
                    b = e.length;
                    if (2 < b) {
                        h = e[1] - e[0];
                        for (c = b -
                            1; c-- && !p;) e[c + 1] - e[c] !== h && (p = !0);
                        !this.options.keepOrdinalPadding && (e[0] - l > h || w - e[e.length - 1] > h) && (p = !0)
                    } else this.options.overscroll && (2 === b ? n = e[1] - e[0] : 1 === b ? (n = this.options.overscroll, e = [e[0], e[0] + n]) : n = this.overscrollPointsRange);
                    p ? (this.options.overscroll && (this.overscrollPointsRange = n, e = e.concat(this.getOverscrollPositions())), this.ordinalPositions = e, h = this.ordinal2lin(Math.max(l, e[0]), !0), c = Math.max(this.ordinal2lin(Math.min(w, e[e.length - 1]), !0), 1), this.ordinalSlope = w = (w - l) / (c - h), this.ordinalOffset =
                        l - h * w) : (this.overscrollPointsRange = A(this.closestPointRange, this.overscrollPointsRange), this.ordinalPositions = this.ordinalSlope = this.ordinalOffset = void 0)
                }
                this.isOrdinal = a && p;
                this.groupIntervalFactor = null
            }, val2lin: function (b, e) {
                var m = this.ordinalPositions;
                if (m) {
                    var p = m.length, h, a;
                    for (h = p; h--;) if (m[h] === b) {
                        a = h;
                        break
                    }
                    for (h = p - 1; h--;) if (b > m[h] || 0 === h) {
                        b = (b - m[h]) / (m[h + 1] - m[h]);
                        a = h + b;
                        break
                    }
                    e = e ? a : this.ordinalSlope * (a || 0) + this.ordinalOffset
                } else e = b;
                return e
            }, lin2val: function (b, e) {
                var m = this.ordinalPositions;
                if (m) {
                    var p = this.ordinalSlope, h = this.ordinalOffset, a = m.length - 1, l;
                    if (e) 0 > b ? b = m[0] : b > a ? b = m[a] : (a = Math.floor(b), l = b - a); else for (; a--;) if (e = p * a + h, b >= e) {
                        p = p * (a + 1) + h;
                        l = (b - e) / (p - e);
                        break
                    }
                    return void 0 !== l && void 0 !== m[a] ? m[a] + (l ? l * (m[a + 1] - m[a]) : 0) : b
                }
                return b
            }, getExtendedPositions: function () {
                var b = this, e = b.chart, r = b.series[0].currentDataGrouping, p = b.ordinalIndex,
                    h = r ? r.count + r.unitName : "raw", a = b.options.overscroll, l = b.getExtremes(), w, c;
                p || (p = b.ordinalIndex = {});
                p[h] || (w = {
                    series: [], chart: e, getExtremes: function () {
                        return {
                            min: l.dataMin,
                            max: l.dataMax + a
                        }
                    }, options: {ordinal: !0}, val2lin: q.prototype.val2lin, ordinal2lin: q.prototype.ordinal2lin
                }, b.series.forEach(function (a) {
                    c = {xAxis: w, xData: a.xData.slice(), chart: e, destroyGroupedData: v};
                    c.xData = c.xData.concat(b.getOverscrollPositions());
                    c.options = {
                        dataGrouping: r ? {
                            enabled: !0,
                            forced: !0,
                            approximation: "open",
                            units: [[r.unitName, [r.count]]]
                        } : {enabled: !1}
                    };
                    a.processData.apply(c);
                    w.series.push(c)
                }), b.beforeSetTickPositions.apply(w), p[h] = w.ordinalPositions);
                return p[h]
            }, getOverscrollPositions: function () {
                var m =
                    this.options.overscroll, e = this.overscrollPointsRange, r = [], p = this.dataMax;
                if (b.defined(e)) for (r.push(p); p <= this.dataMax + m;) p += e, r.push(p);
                return r
            }, getGroupIntervalFactor: function (b, e, r) {
                var m;
                r = r.processedXData;
                var h = r.length, a = [];
                m = this.groupIntervalFactor;
                if (!m) {
                    for (m = 0; m < h - 1; m++) a[m] = r[m + 1] - r[m];
                    a.sort(function (a, b) {
                        return a - b
                    });
                    a = a[Math.floor(h / 2)];
                    b = Math.max(b, r[0]);
                    e = Math.min(e, r[h - 1]);
                    this.groupIntervalFactor = m = h * a / (e - b)
                }
                return m
            }, postProcessTickInterval: function (b) {
                var e = this.ordinalSlope;
                return e ? this.options.breaks ? this.closestPointRange || b : b / (e / this.closestPointRange) : b
            }
        });
        q.prototype.ordinal2lin = q.prototype.val2lin;
        z(t, "pan", function (b) {
            var e = this.xAxis[0], m = e.options.overscroll, p = b.originalEvent.chartX, h = !1;
            if (e.options.ordinal && e.series.length) {
                var a = this.mouseDownX, l = e.getExtremes(), w = l.dataMax, c = l.min, k = l.max, n = this.hoverPoints,
                    x = e.closestPointRange || e.overscrollPointsRange,
                    a = (a - p) / (e.translationSlope * (e.ordinalSlope || x)),
                    g = {ordinalPositions: e.getExtendedPositions()}, x = e.lin2val,
                    d = e.val2lin, f;
                g.ordinalPositions ? 1 < Math.abs(a) && (n && n.forEach(function (a) {
                    a.setState()
                }), 0 > a ? (n = g, f = e.ordinalPositions ? e : g) : (n = e.ordinalPositions ? e : g, f = g), g = f.ordinalPositions, w > g[g.length - 1] && g.push(w), this.fixedRange = k - c, a = e.toFixedRange(null, null, x.apply(n, [d.apply(n, [c, !0]) + a, !0]), x.apply(f, [d.apply(f, [k, !0]) + a, !0])), a.min >= Math.min(l.dataMin, c) && a.max <= Math.max(w, k) + m && e.setExtremes(a.min, a.max, !0, !1, {trigger: "pan"}), this.mouseDownX = p, u(this.container, {cursor: "move"})) : h = !0
            } else h = !0;
            h ? m && (e.max =
                e.dataMax + m) : b.preventDefault()
        });
        z(q, "foundExtremes", function () {
            this.isXAxis && D(this.options.overscroll) && this.max === this.dataMax && (!this.chart.mouseIsDown || this.isInternal) && (!this.eventArgs || this.eventArgs && "navigator" !== this.eventArgs.trigger) && (this.max += this.options.overscroll, !this.isInternal && D(this.userMin) && (this.min += this.options.overscroll))
        });
        z(q, "afterSetScale", function () {
            this.horiz && !this.isDirty && (this.isDirty = this.isOrdinal && this.chart.navigator && !this.chart.navigator.adaptToUpdatedData)
        })
    });
    E(t, "modules/broken-axis.src.js", [t["parts/Globals.js"]], function (b) {
        var z = b.addEvent, q = b.pick, t = b.extend, u = b.isArray, D = b.find, B = b.fireEvent, v = b.Axis,
            A = b.Series, C = function (b, e) {
                return D(e, function (e) {
                    return e.from < b && b < e.to
                })
            };
        t(v.prototype, {
            isInBreak: function (b, e) {
                var m = b.repeat || Infinity, p = b.from, h = b.to - b.from;
                e = e >= p ? (e - p) % m : m - (p - e) % m;
                return b.inclusive ? e <= h : e < h && 0 !== e
            }, isInAnyBreak: function (b, e) {
                var m = this.options.breaks, p = m && m.length, h, a, l;
                if (p) {
                    for (; p--;) this.isInBreak(m[p], b) && (h = !0, a || (a = q(m[p].showPoints,
                        !this.isXAxis)));
                    l = h && e ? h && !a : h
                }
                return l
            }
        });
        z(v, "afterInit", function () {
            "function" === typeof this.setBreaks && this.setBreaks(this.options.breaks, !1)
        });
        z(v, "afterSetTickPositions", function () {
            if (this.isBroken) {
                var b = this.tickPositions, e = this.tickPositions.info, r = [], p;
                for (p = 0; p < b.length; p++) this.isInAnyBreak(b[p]) || r.push(b[p]);
                this.tickPositions = r;
                this.tickPositions.info = e
            }
        });
        z(v, "afterSetOptions", function () {
            this.isBroken && (this.options.ordinal = !1)
        });
        v.prototype.setBreaks = function (b, e) {
            function m(a) {
                var b =
                    a, c, k;
                for (k = 0; k < h.breakArray.length; k++) if (c = h.breakArray[k], c.to <= a) b -= c.len; else if (c.from >= a) break; else if (h.isInBreak(c, a)) {
                    b -= a - c.from;
                    break
                }
                return b
            }

            function p(a) {
                var b, c;
                for (c = 0; c < h.breakArray.length && !(b = h.breakArray[c], b.from >= a); c++) b.to < a ? a += b.len : h.isInBreak(b, a) && (a += b.len);
                return a
            }

            var h = this, a = u(b) && !!b.length;
            h.isDirty = h.isBroken !== a;
            h.isBroken = a;
            h.options.breaks = h.userOptions.breaks = b;
            h.forceRedraw = !0;
            a || h.val2lin !== m || (delete h.val2lin, delete h.lin2val);
            a && (h.userOptions.ordinal =
                !1, h.val2lin = m, h.lin2val = p, h.setExtremes = function (a, b, c, k, n) {
                if (this.isBroken) {
                    for (var h, g = this.options.breaks; h = C(a, g);) a = h.to;
                    for (; h = C(b, g);) b = h.from;
                    b < a && (b = a)
                }
                v.prototype.setExtremes.call(this, a, b, c, k, n)
            }, h.setAxisTranslation = function (a) {
                v.prototype.setAxisTranslation.call(this, a);
                this.unitLength = null;
                if (this.isBroken) {
                    a = h.options.breaks;
                    var b = [], c = [], k = 0, n, e, g = h.userMin || h.min, d = h.userMax || h.max,
                        f = q(h.pointRangePadding, 0), y, l;
                    a.forEach(function (a) {
                        e = a.repeat || Infinity;
                        h.isInBreak(a, g) && (g += a.to %
                            e - g % e);
                        h.isInBreak(a, d) && (d -= d % e - a.from % e)
                    });
                    a.forEach(function (a) {
                        y = a.from;
                        for (e = a.repeat || Infinity; y - e > g;) y -= e;
                        for (; y < g;) y += e;
                        for (l = y; l < d; l += e) b.push({value: l, move: "in"}), b.push({
                            value: l + (a.to - a.from),
                            move: "out",
                            size: a.breakSize
                        })
                    });
                    b.sort(function (a, f) {
                        return a.value === f.value ? ("in" === a.move ? 0 : 1) - ("in" === f.move ? 0 : 1) : a.value - f.value
                    });
                    n = 0;
                    y = g;
                    b.forEach(function (a) {
                        n += "in" === a.move ? 1 : -1;
                        1 === n && "in" === a.move && (y = a.value);
                        0 === n && (c.push({
                            from: y,
                            to: a.value,
                            len: a.value - y - (a.size || 0)
                        }), k += a.value - y - (a.size ||
                            0))
                    });
                    h.breakArray = c;
                    h.unitLength = d - g - k + f;
                    B(h, "afterBreaks");
                    h.staticScale ? h.transA = h.staticScale : h.unitLength && (h.transA *= (d - h.min + f) / h.unitLength);
                    f && (h.minPixelPadding = h.transA * h.minPointOffset);
                    h.min = g;
                    h.max = d
                }
            });
            q(e, !0) && this.chart.redraw()
        };
        z(A, "afterGeneratePoints", function () {
            var b = this.xAxis, e = this.yAxis, r = this.points, p, h = r.length, a = this.options.connectNulls, l;
            if (b && e && (b.options.breaks || e.options.breaks)) for (; h--;) p = r[h], l = null === p.y && !1 === a, l || !b.isInAnyBreak(p.x, !0) && !e.isInAnyBreak(p.y,
                !0) || (r.splice(h, 1), this.data[h] && this.data[h].destroyElements())
        });
        z(A, "afterRender", function () {
            this.drawBreaks(this.xAxis, ["x"]);
            this.drawBreaks(this.yAxis, q(this.pointArrayMap, ["y"]))
        });
        b.Series.prototype.drawBreaks = function (b, e) {
            var m = this, p = m.points, h, a, l, w;
            b && e.forEach(function (c) {
                h = b.breakArray || [];
                a = b.isXAxis ? b.min : q(m.options.threshold, b.min);
                p.forEach(function (k) {
                    w = q(k["stack" + c.toUpperCase()], k[c]);
                    h.forEach(function (c) {
                        l = !1;
                        if (a < c.from && w > c.to || a > c.from && w < c.from) l = "pointBreak"; else if (a <
                            c.from && w > c.from && w < c.to || a > c.from && w > c.to && w < c.from) l = "pointInBreak";
                        l && B(b, l, {point: k, brk: c})
                    })
                })
            })
        };
        b.Series.prototype.gappedPath = function () {
            var m = this.currentDataGrouping, e = m && m.gapSize, m = this.options.gapSize, r = this.points.slice(),
                p = r.length - 1, h = this.yAxis;
            if (m && 0 < p) for ("value" !== this.options.gapUnit && (m *= this.closestPointRange), e && e > m && (m = e); p--;) r[p + 1].x - r[p].x > m && (e = (r[p].x + r[p + 1].x) / 2, r.splice(p + 1, 0, {
                isNull: !0,
                x: e
            }), this.options.stacking && (e = h.stacks[this.stackKey][e] = new b.StackItem(h, h.options.stackLabels,
                !1, e, this.stack), e.total = 0));
            return this.getGraphPath(r)
        }
    });
    E(t, "masters/modules/broken-axis.src.js", [], function () {
    });
    E(t, "parts/DataGrouping.js", [t["parts/Globals.js"]], function (b) {
        var z = b.addEvent, q = b.arrayMax, t = b.arrayMin, u = b.Axis, D = b.defaultPlotOptions, B = b.defined,
            v = b.extend, A = b.format, C = b.isNumber, m = b.merge, e = b.pick, r = b.Point, p = b.Series,
            h = b.Tooltip, a = b.approximations = {
                sum: function (a) {
                    var f = a.length, c;
                    if (!f && a.hasNulls) c = null; else if (f) for (c = 0; f--;) c += a[f];
                    return c
                }, average: function (f) {
                    var c =
                        f.length;
                    f = a.sum(f);
                    C(f) && c && (f /= c);
                    return f
                }, averages: function () {
                    var f = [];
                    [].forEach.call(arguments, function (c) {
                        f.push(a.average(c))
                    });
                    return void 0 === f[0] ? void 0 : f
                }, open: function (a) {
                    return a.length ? a[0] : a.hasNulls ? null : void 0
                }, high: function (a) {
                    return a.length ? q(a) : a.hasNulls ? null : void 0
                }, low: function (a) {
                    return a.length ? t(a) : a.hasNulls ? null : void 0
                }, close: function (a) {
                    return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0
                }, ohlc: function (c, d, b, k) {
                    c = a.open(c);
                    d = a.high(d);
                    b = a.low(b);
                    k = a.close(k);
                    if (C(c) ||
                        C(d) || C(b) || C(k)) return [c, d, b, k]
                }, range: function (c, d) {
                    c = a.low(c);
                    d = a.high(d);
                    if (C(c) || C(d)) return [c, d];
                    if (null === c && null === d) return null
                }
            }, l = function (c, d, b, k) {
                var f = this, g = f.data, n = f.options && f.options.data, h = [], e = [], l = [], y = c.length, p, x,
                    F = !!d, G = [], r = f.pointArrayMap, w = r && r.length, q = ["x"].concat(r || ["y"]), u = 0, A = 0, D,
                    v;
                k = "function" === typeof k ? k : a[k] ? a[k] : a[f.getDGApproximation && f.getDGApproximation() || "average"];
                w ? r.forEach(function () {
                    G.push([])
                }) : G.push([]);
                D = w || 1;
                for (v = 0; v <= y && !(c[v] >= b[0]); v++) ;
                for (v; v <=
                y; v++) {
                    for (; void 0 !== b[u + 1] && c[v] >= b[u + 1] || v === y;) {
                        p = b[u];
                        f.dataGroupInfo = {start: f.cropStart + A, length: G[0].length};
                        x = k.apply(f, G);
                        f.pointClass && !B(f.dataGroupInfo.options) && (f.dataGroupInfo.options = m(f.pointClass.prototype.optionsToObject.call({series: f}, f.options.data[f.cropStart + A])), q.forEach(function (a) {
                            delete f.dataGroupInfo.options[a]
                        }));
                        void 0 !== x && (h.push(p), e.push(x), l.push(f.dataGroupInfo));
                        A = v;
                        for (p = 0; p < D; p++) G[p].length = 0, G[p].hasNulls = !1;
                        u += 1;
                        if (v === y) break
                    }
                    if (v === y) break;
                    if (r) {
                        p = f.cropStart +
                            v;
                        x = g && g[p] || f.pointClass.prototype.applyOptions.apply({series: f}, [n[p]]);
                        var t;
                        for (p = 0; p < w; p++) t = x[r[p]], C(t) ? G[p].push(t) : null === t && (G[p].hasNulls = !0)
                    } else p = F ? d[v] : null, C(p) ? G[0].push(p) : null === p && (G[0].hasNulls = !0)
                }
                return {groupedXData: h, groupedYData: e, groupMap: l}
            }, w = {approximations: a, groupData: l}, c = p.prototype, k = c.processData, n = c.generatePoints, x = {
                groupPixelWidth: 2, dateTimeLabelFormats: {
                    millisecond: ["%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L"],
                    second: ["%A, %b %e, %H:%M:%S",
                        "%A, %b %e, %H:%M:%S", "-%H:%M:%S"],
                    minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                    hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                    day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                    week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                    month: ["%B %Y", "%B", "-%B %Y"],
                    year: ["%Y", "%Y", "-%Y"]
                }
            }, g = {
                line: {},
                spline: {},
                area: {},
                areaspline: {},
                column: {groupPixelWidth: 10},
                columnrange: {groupPixelWidth: 10},
                candlestick: {groupPixelWidth: 10},
                ohlc: {groupPixelWidth: 5}
            }, d = b.defaultDataGroupingUnits =
                [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1]], ["week", [1]], ["month", [1, 3, 6]], ["year", null]];
        c.getDGApproximation = function () {
            return b.seriesTypes.arearange && this instanceof b.seriesTypes.arearange ? "range" : b.seriesTypes.ohlc && this instanceof b.seriesTypes.ohlc ? "ohlc" : b.seriesTypes.column && this instanceof b.seriesTypes.column ? "sum" : "average"
        };
        c.groupData = l;
        c.processData = function () {
            var a = this.chart, b = this.options.dataGrouping,
                g = !1 !== this.allowDG && b && e(b.enabled, a.options.isStock),
                n = this.visible || !a.options.chart.ignoreHiddenSeries, h, l = this.currentDataGrouping, p, x = !1;
            this.forceCrop = g;
            this.groupPixelWidth = null;
            this.hasProcessed = !0;
            g && !this.requireSorting && (this.requireSorting = x = !0);
            g = !1 === k.apply(this, arguments) || !g;
            x && (this.requireSorting = !1);
            if (!g) {
                this.destroyGroupedData();
                var m, g = b.groupAll ? this.xData : this.processedXData,
                    r = b.groupAll ? this.yData : this.processedYData, w = a.plotSizeX, a = this.xAxis,
                    q = a.options.ordinal, u = this.groupPixelWidth =
                    a.getGroupPixelWidth && a.getGroupPixelWidth();
                if (u) {
                    this.isDirty = h = !0;
                    this.points = null;
                    x = a.getExtremes();
                    p = x.min;
                    var x = x.max, q = q && a.getGroupIntervalFactor(p, x, this) || 1, u = u * (x - p) / w * q,
                        w = a.getTimeTicks(a.normalizeTimeTickInterval(u, b.units || d), Math.min(p, g[0]), Math.max(x, g[g.length - 1]), a.options.startOfWeek, g, this.closestPointRange),
                        r = c.groupData.apply(this, [g, r, w, b.approximation]), g = r.groupedXData, q = r.groupedYData,
                        v = 0;
                    if (b.smoothed && g.length) {
                        m = g.length - 1;
                        for (g[m] = Math.min(g[m], x); m-- && 0 < m;) g[m] += u /
                            2;
                        g[0] = Math.max(g[0], p)
                    }
                    for (m = 1; m < w.length; m++) w.info.segmentStarts && -1 !== w.info.segmentStarts.indexOf(m) || (v = Math.max(w[m] - w[m - 1], v));
                    p = w.info;
                    p.gapSize = v;
                    this.closestPointRange = w.info.totalRange;
                    this.groupMap = r.groupMap;
                    if (B(g[0]) && g[0] < a.dataMin && n) {
                        if (!B(a.options.min) && a.min <= a.dataMin || a.min === a.dataMin) a.min = g[0];
                        a.dataMin = g[0]
                    }
                    b.groupAll && (b = this.cropData(g, q, a.min, a.max, 1), g = b.xData, q = b.yData);
                    this.processedXData = g;
                    this.processedYData = q
                } else this.groupMap = null;
                this.hasGroupedData = h;
                this.currentDataGrouping =
                    p;
                this.preventGraphAnimation = (l && l.totalRange) !== (p && p.totalRange)
            }
        };
        c.destroyGroupedData = function () {
            var a = this.groupedData;
            (a || []).forEach(function (c, f) {
                c && (a[f] = c.destroy ? c.destroy() : null)
            });
            this.groupedData = null
        };
        c.generatePoints = function () {
            n.apply(this);
            this.destroyGroupedData();
            this.groupedData = this.hasGroupedData ? this.points : null
        };
        z(r, "update", function () {
            if (this.dataGroup) return b.error(24, !1, this.series.chart), !1
        });
        z(h, "headerFormatter", function (a) {
            var c = this.chart.time, d = a.labelConfig, f = d.series,
                b = f.tooltipOptions, g = f.options.dataGrouping, k = b.xDateFormat, n, h = f.xAxis, e,
                l = b[(a.isFooter ? "footer" : "header") + "Format"];
            h && "datetime" === h.options.type && g && C(d.key) && (e = f.currentDataGrouping, g = g.dateTimeLabelFormats || x.dateTimeLabelFormats, e ? (b = g[e.unitName], 1 === e.count ? k = b[0] : (k = b[1], n = b[2])) : !k && g && (k = this.getXDateFormat(d, b, h)), k = c.dateFormat(k, d.key), n && (k += c.dateFormat(n, d.key + e.totalRange - 1)), f.chart.styledMode && (l = this.styledModeFormat(l)), a.text = A(l, {
                point: v(d.point, {key: k}),
                series: f
            }, c), a.preventDefault())
        });
        z(p, "destroy", c.destroyGroupedData);
        z(p, "afterSetOptions", function (a) {
            a = a.options;
            var c = this.type, d = this.chart.options.plotOptions, f = D[c].dataGrouping,
                b = this.useCommonDataGrouping && x;
            if (g[c] || b) f || (f = m(x, g[c])), a.dataGrouping = m(b, f, d.series && d.series.dataGrouping, d[c].dataGrouping, this.userOptions.dataGrouping)
        });
        z(u, "afterSetScale", function () {
            this.series.forEach(function (a) {
                a.hasProcessed = !1
            })
        });
        u.prototype.getGroupPixelWidth = function () {
            var a = this.series, c = a.length, d, b = 0, k = !1, g;
            for (d = c; d--;) (g = a[d].options.dataGrouping) &&
            (b = Math.max(b, e(g.groupPixelWidth, x.groupPixelWidth)));
            for (d = c; d--;) (g = a[d].options.dataGrouping) && a[d].hasProcessed && (c = (a[d].processedXData || a[d].data).length, a[d].groupPixelWidth || c > this.chart.plotSizeX / b || c && g.forced) && (k = !0);
            return k ? b : 0
        };
        u.prototype.setDataGrouping = function (a, c) {
            var d;
            c = e(c, !0);
            a || (a = {forced: !1, units: null});
            if (this instanceof u) for (d = this.series.length; d--;) this.series[d].update({dataGrouping: a}, !1); else this.chart.options.series.forEach(function (c) {
                c.dataGrouping = a
            }, !1);
            this.ordinalSlope =
                null;
            c && this.chart.redraw()
        };
        return b.dataGrouping = w
    });
    E(t, "parts/OHLCSeries.js", [t["parts/Globals.js"]], function (b) {
        var t = b.Point, q = b.seriesType, E = b.seriesTypes;
        q("ohlc", "column", {
                lineWidth: 1,
                tooltip: {pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eOpen: {point.open}\x3cbr/\x3eHigh: {point.high}\x3cbr/\x3eLow: {point.low}\x3cbr/\x3eClose: {point.close}\x3cbr/\x3e'},
                threshold: null,
                states: {hover: {lineWidth: 3}},
                stickyTracking: !0
            },
            {
                directTouch: !1,
                pointArrayMap: ["open", "high", "low", "close"],
                toYData: function (b) {
                    return [b.open, b.high, b.low, b.close]
                },
                pointValKey: "close",
                pointAttrToOptions: {stroke: "color", "stroke-width": "lineWidth"},
                init: function () {
                    E.column.prototype.init.apply(this, arguments);
                    this.options.stacking = !1
                },
                pointAttribs: function (b, q) {
                    q = E.column.prototype.pointAttribs.call(this, b, q);
                    var u = this.options;
                    delete q.fill;
                    !b.options.color && u.upColor && b.open < b.close && (q.stroke = u.upColor);
                    return q
                },
                translate: function () {
                    var b = this,
                        q = b.yAxis, B = !!b.modifyValue,
                        v = ["plotOpen", "plotHigh", "plotLow", "plotClose", "yBottom"];
                    E.column.prototype.translate.apply(b);
                    b.points.forEach(function (u) {
                        [u.open, u.high, u.low, u.close, u.low].forEach(function (A, m) {
                            null !== A && (B && (A = b.modifyValue(A)), u[v[m]] = q.toPixels(A, !0))
                        });
                        u.tooltipPos[1] = u.plotHigh + q.pos - b.chart.plotTop
                    })
                },
                drawPoints: function () {
                    var b = this, q = b.chart;
                    b.points.forEach(function (u) {
                        var v, A, t, m, e = u.graphic, r, p = !e;
                        void 0 !== u.plotY && (e || (u.graphic = e = q.renderer.path().add(b.group)), q.styledMode ||
                        e.attr(b.pointAttribs(u, u.selected && "select")), A = e.strokeWidth() % 2 / 2, r = Math.round(u.plotX) - A, t = Math.round(u.shapeArgs.width / 2), m = ["M", r, Math.round(u.yBottom), "L", r, Math.round(u.plotHigh)], null !== u.open && (v = Math.round(u.plotOpen) + A, m.push("M", r, v, "L", r - t, v)), null !== u.close && (v = Math.round(u.plotClose) + A, m.push("M", r, v, "L", r + t, v)), e[p ? "attr" : "animate"]({d: m}).addClass(u.getClassName(), !0))
                    })
                },
                animate: null
            }, {
                getClassName: function () {
                    return t.prototype.getClassName.call(this) + (this.open < this.close ? " highcharts-point-up" :
                        " highcharts-point-down")
                }
            })
    });
    E(t, "parts/CandlestickSeries.js", [t["parts/Globals.js"]], function (b) {
        var t = b.defaultPlotOptions, q = b.merge, E = b.seriesType, u = b.seriesTypes;
        E("candlestick", "ohlc", q(t.column, {
            states: {hover: {lineWidth: 2}},
            tooltip: t.ohlc.tooltip,
            threshold: null,
            lineColor: "#000000",
            lineWidth: 1,
            upColor: "#ffffff",
            stickyTracking: !0
        }), {
            pointAttribs: function (b, q) {
                var v = u.column.prototype.pointAttribs.call(this, b, q), t = this.options, z = b.open < b.close,
                    m = t.lineColor || this.color;
                v["stroke-width"] = t.lineWidth;
                v.fill = b.options.color || (z ? t.upColor || this.color : this.color);
                v.stroke = b.lineColor || (z ? t.upLineColor || m : m);
                q && (b = t.states[q], v.fill = b.color || v.fill, v.stroke = b.lineColor || v.stroke, v["stroke-width"] = b.lineWidth || v["stroke-width"]);
                return v
            }, drawPoints: function () {
                var b = this, q = b.chart, u = b.yAxis.reversed;
                b.points.forEach(function (v) {
                    var t = v.graphic, m, e, r, p, h, a, l, w = !t;
                    void 0 !== v.plotY && (t || (v.graphic = t = q.renderer.path().add(b.group)), b.chart.styledMode || t.attr(b.pointAttribs(v, v.selected && "select")).shadow(b.options.shadow),
                        h = t.strokeWidth() % 2 / 2, a = Math.round(v.plotX) - h, m = v.plotOpen, e = v.plotClose, r = Math.min(m, e), m = Math.max(m, e), l = Math.round(v.shapeArgs.width / 2), e = u ? m !== v.yBottom : Math.round(r) !== Math.round(v.plotHigh), p = u ? Math.round(r) !== Math.round(v.plotHigh) : m !== v.yBottom, r = Math.round(r) + h, m = Math.round(m) + h, h = [], h.push("M", a - l, m, "L", a - l, r, "L", a + l, r, "L", a + l, m, "Z", "M", a, r, "L", a, e ? Math.round(u ? v.yBottom : v.plotHigh) : r, "M", a, m, "L", a, p ? Math.round(u ? v.plotHigh : v.yBottom) : m), t[w ? "attr" : "animate"]({d: h}).addClass(v.getClassName(),
                        !0))
                })
            }
        })
    });
    E(t, "mixins/on-series.js", [t["parts/Globals.js"]], function (b) {
        var t = b.defined, q = b.seriesTypes, E = b.stableSort;
        return {
            getPlotBox: function () {
                return b.Series.prototype.getPlotBox.call(this.options.onSeries && this.chart.get(this.options.onSeries) || this)
            }, translate: function () {
                q.column.prototype.translate.apply(this);
                var b = this, z = b.options, B = b.chart, v = b.points, A = v.length - 1, C, m = z.onSeries,
                    m = m && B.get(m), z = z.onKey || "y", e = m && m.options.step, r = m && m.points,
                    p = r && r.length, h = B.inverted, a = b.xAxis, l = b.yAxis,
                    w = 0, c, k, n, x;
                if (m && m.visible && p) for (w = (m.pointXOffset || 0) + (m.barW || 0) / 2, B = m.currentDataGrouping, k = r[p - 1].x + (B ? B.totalRange : 0), E(v, function (a, c) {
                    return a.x - c.x
                }), z = "plot" + z[0].toUpperCase() + z.substr(1); p-- && v[A] && !(c = r[p], B = v[A], B.y = c.y, c.x <= B.x && void 0 !== c[z] && (B.x <= k && (B.plotY = c[z], c.x < B.x && !e && (n = r[p + 1]) && void 0 !== n[z] && (x = (B.x - c.x) / (n.x - c.x), B.plotY += x * (n[z] - c[z]), B.y += x * (n.y - c.y))), A--, p++, 0 > A));) ;
                v.forEach(function (c, d) {
                    var f;
                    c.plotX += w;
                    if (void 0 === c.plotY || h) 0 <= c.plotX && c.plotX <= a.len ? h ? (c.plotY =
                        a.translate(c.x, 0, 1, 0, 1), c.plotX = t(c.y) ? l.translate(c.y, 0, 0, 0, 1) : 0) : c.plotY = (a.opposite ? 0 : b.yAxis.len) + a.offset : c.shapeArgs = {};
                    (C = v[d - 1]) && C.plotX === c.plotX && (void 0 === C.stackIndex && (C.stackIndex = 0), f = C.stackIndex + 1);
                    c.stackIndex = f
                });
                this.onSeries = m
            }
        }
    });
    E(t, "parts/FlagsSeries.js", [t["parts/Globals.js"], t["mixins/on-series.js"]], function (b, t) {
        function q(b) {
            r[b + "pin"] = function (h, a, e, p, c) {
                var k = c && c.anchorX;
                c = c && c.anchorY;
                var n;
                "circle" === b && p > e && (h -= Math.round((p - e) / 2), e = p);
                n = r[b](h, a, e, p);
                k && c && (n.push("M",
                    "circle" === b ? h + e / 2 : n[1] + n[4] / 2, a > c ? a : a + p, "L", k, c), n = n.concat(r.circle(k - 1, c - 1, 2, 2)));
                return n
            }
        }

        var z = b.addEvent, u = b.merge, D = b.noop, B = b.defined, v = b.Renderer, A = b.Series, C = b.seriesType,
            m = b.TrackerMixin, e = b.VMLRenderer, r = b.SVGRenderer.prototype.symbols;
        C("flags", "column", {
            pointRange: 0,
            allowOverlapX: !1,
            shape: "flag",
            stackDistance: 12,
            textAlign: "center",
            tooltip: {pointFormat: "{point.text}\x3cbr/\x3e"},
            threshold: null,
            y: -30,
            fillColor: "#ffffff",
            lineWidth: 1,
            states: {hover: {lineColor: "#000000", fillColor: "#ccd6eb"}},
            style: {fontSize: "11px", fontWeight: "bold"}
        }, {
            sorted: !1,
            noSharedTooltip: !0,
            allowDG: !1,
            takeOrdinalPosition: !1,
            trackerGroups: ["markerGroup"],
            forceCrop: !0,
            init: A.prototype.init,
            pointAttribs: function (b, e) {
                var a = this.options, h = b && b.color || this.color, p = a.lineColor, c = b && b.lineWidth;
                b = b && b.fillColor || a.fillColor;
                e && (b = a.states[e].fillColor, p = a.states[e].lineColor, c = a.states[e].lineWidth);
                return {fill: b || h, stroke: p || h, "stroke-width": c || a.lineWidth || 0}
            },
            translate: t.translate,
            getPlotBox: t.getPlotBox,
            drawPoints: function () {
                var e =
                        this.points, h = this.chart, a = h.renderer, l, m, c = h.inverted, k = this.options, n = k.y, x, g,
                    d, f, y, q, F = this.yAxis, r = {}, v = [], t;
                for (g = e.length; g--;) d = e[g], q = (c ? d.plotY : d.plotX) > this.xAxis.len, l = d.plotX, f = d.stackIndex, x = d.options.shape || k.shape, m = d.plotY, void 0 !== m && (m = d.plotY + n - (void 0 !== f && f * k.stackDistance)), d.anchorX = f ? void 0 : d.plotX, y = f ? void 0 : d.plotY, t = "flag" !== x, f = d.graphic, void 0 !== m && 0 <= l && !q ? (f || (f = d.graphic = a.label("", null, null, x, null, null, k.useHTML), h.styledMode || f.attr(this.pointAttribs(d)).css(u(k.style,
                    d.style)), f.attr({
                    align: t ? "center" : "left",
                    width: k.width,
                    height: k.height,
                    "text-align": k.textAlign
                }).addClass("highcharts-point").add(this.markerGroup), d.graphic.div && (d.graphic.div.point = d), h.styledMode || f.shadow(k.shadow), f.isNew = !0), 0 < l && (l -= f.strokeWidth() % 2), x = {
                    y: m,
                    anchorY: y
                }, k.allowOverlapX && (x.x = l, x.anchorX = d.anchorX), f.attr({text: d.options.title || k.title || "A"})[f.isNew ? "attr" : "animate"](x), k.allowOverlapX || (r[d.plotX] ? r[d.plotX].size = Math.max(r[d.plotX].size, f.width) : r[d.plotX] = {
                    align: t ? .5 :
                        0, size: f.width, target: l, anchorX: l
                }), d.tooltipPos = [l, m + F.pos - h.plotTop]) : f && (d.graphic = f.destroy());
                k.allowOverlapX || (b.objectEach(r, function (a) {
                    a.plotX = a.anchorX;
                    v.push(a)
                }), b.distribute(v, c ? F.len : this.xAxis.len, 100), e.forEach(function (a) {
                    var c = a.graphic && r[a.plotX];
                    c && (a.graphic[a.graphic.isNew ? "attr" : "animate"]({
                        x: c.pos + c.align * c.size,
                        anchorX: a.anchorX
                    }), B(c.pos) ? a.graphic.isNew = !1 : (a.graphic.attr({
                        x: -9999,
                        anchorX: -9999
                    }), a.graphic.isNew = !0))
                }));
                k.useHTML && b.wrap(this.markerGroup, "on", function (a) {
                    return b.SVGElement.prototype.on.apply(a.apply(this,
                        [].slice.call(arguments, 1)), [].slice.call(arguments, 1))
                })
            },
            drawTracker: function () {
                var b = this.points;
                m.drawTrackerPoint.apply(this);
                b.forEach(function (e) {
                    var a = e.graphic;
                    a && z(a.element, "mouseover", function () {
                        0 < e.stackIndex && !e.raised && (e._y = a.y, a.attr({y: e._y - 8}), e.raised = !0);
                        b.forEach(function (a) {
                            a !== e && a.raised && a.graphic && (a.graphic.attr({y: a._y}), a.raised = !1)
                        })
                    })
                })
            },
            animate: function (b) {
                b ? this.setClip() : this.animate = null
            },
            setClip: function () {
                A.prototype.setClip.apply(this, arguments);
                !1 !== this.options.clip &&
                this.sharedClipKey && this.markerGroup.clip(this.chart[this.sharedClipKey])
            },
            buildKDTree: D,
            invertGroups: D
        }, {
            isValid: function () {
                return b.isNumber(this.y) || void 0 === this.y
            }
        });
        r.flag = function (b, e, a, l, m) {
            var c = m && m.anchorX || b;
            m = m && m.anchorY || e;
            return r.circle(c - 1, m - 1, 2, 2).concat(["M", c, m, "L", b, e + l, b, e, b + a, e, b + a, e + l, b, e + l, "Z"])
        };
        q("circle");
        q("square");
        v === e && ["flag", "circlepin", "squarepin"].forEach(function (b) {
            e.prototype.symbols[b] = r[b]
        })
    });
    E(t, "parts/RangeSelector.js", [t["parts/Globals.js"]], function (b) {
        function t(a) {
            this.init(a)
        }

        var q = b.addEvent, E = b.Axis, u = b.Chart, D = b.css, B = b.createElement, v = b.defaultOptions,
            A = b.defined, C = b.destroyObjectProperties, m = b.discardElement, e = b.extend, r = b.fireEvent,
            p = b.isNumber, h = b.merge, a = b.pick, l = b.pInt, w = b.splat;
        e(v, {
            rangeSelector: {
                verticalAlign: "top",
                buttonTheme: {width: 28, height: 18, padding: 2, zIndex: 7},
                floating: !1,
                x: 0,
                y: 0,
                height: void 0,
                inputPosition: {align: "right", x: 0, y: 0},
                buttonPosition: {align: "left", x: 0, y: 0},
                labelStyle: {color: "#666666"}
            }
        });
        v.lang = h(v.lang, {
            rangeSelectorZoom: "Zoom", rangeSelectorFrom: "From",
            rangeSelectorTo: "To"
        });
        t.prototype = {
            clickButton: function (c, b) {
                var k = this.chart, e = this.buttonOptions[c], g = k.xAxis[0],
                    d = k.scroller && k.scroller.getUnionExtremes() || g || {}, f = d.dataMin, h = d.dataMax, l,
                    m = g && Math.round(Math.min(g.max, a(h, g.max))), r = e.type, v, d = e._range, t, u, z,
                    B = e.dataGrouping;
                if (null !== f && null !== h) {
                    k.fixedRange = d;
                    B && (this.forcedDataGrouping = !0, E.prototype.setDataGrouping.call(g || {chart: this.chart}, B, !1), this.frozenStates = e.preserveDataGrouping);
                    if ("month" === r || "year" === r) g ? (r = {
                        range: e, max: m,
                        chart: k, dataMin: f, dataMax: h
                    }, l = g.minFromRange.call(r), p(r.newMax) && (m = r.newMax)) : d = e; else if (d) l = Math.max(m - d, f), m = Math.min(l + d, h); else if ("ytd" === r) if (g) void 0 === h && (f = Number.MAX_VALUE, h = Number.MIN_VALUE, k.series.forEach(function (a) {
                        a = a.xData;
                        f = Math.min(a[0], f);
                        h = Math.max(a[a.length - 1], h)
                    }), b = !1), m = this.getYTDExtremes(h, f, k.time.useUTC), l = t = m.min, m = m.max; else {
                        this.deferredYTDClick = c;
                        return
                    } else "all" === r && g && (l = f, m = h);
                    l += e._offsetMin;
                    m += e._offsetMax;
                    this.setSelected(c);
                    g ? g.setExtremes(l, m, a(b, 1),
                        null, {
                            trigger: "rangeSelectorButton",
                            rangeSelectorButton: e
                        }) : (v = w(k.options.xAxis)[0], z = v.range, v.range = d, u = v.min, v.min = t, q(k, "load", function () {
                        v.range = z;
                        v.min = u
                    }))
                }
            },
            setSelected: function (a) {
                this.selected = this.options.selected = a
            },
            defaultButtons: [{type: "month", count: 1, text: "1m"}, {
                type: "month",
                count: 3,
                text: "3m"
            }, {type: "month", count: 6, text: "6m"}, {type: "ytd", text: "YTD"}, {
                type: "year",
                count: 1,
                text: "1y"
            }, {type: "all", text: "All"}],
            init: function (a) {
                var b = this, c = a.options.rangeSelector, e = c.buttons || [].concat(b.defaultButtons),
                    g = c.selected, d = function () {
                        var a = b.minInput, c = b.maxInput;
                        a && a.blur && r(a, "blur");
                        c && c.blur && r(c, "blur")
                    };
                b.chart = a;
                b.options = c;
                b.buttons = [];
                b.buttonOptions = e;
                this.unMouseDown = q(a.container, "mousedown", d);
                this.unResize = q(a, "resize", d);
                e.forEach(b.computeButtonRange);
                void 0 !== g && e[g] && this.clickButton(g, !1);
                q(a, "load", function () {
                    a.xAxis && a.xAxis[0] && q(a.xAxis[0], "setExtremes", function (c) {
                        this.max - this.min !== a.fixedRange && "rangeSelectorButton" !== c.trigger && "updatedData" !== c.trigger && b.forcedDataGrouping &&
                        !b.frozenStates && this.setDataGrouping(!1, !1)
                    })
                })
            },
            updateButtonStates: function () {
                var a = this, b = this.chart, e = b.xAxis[0], h = Math.round(e.max - e.min), g = !e.hasVisibleSeries,
                    d = b.scroller && b.scroller.getUnionExtremes() || e, f = d.dataMin, l = d.dataMax,
                    b = a.getYTDExtremes(l, f, b.time.useUTC), m = b.min, r = b.max, q = a.selected, v = p(q),
                    t = a.options.allButtonsEnabled, u = a.buttons;
                a.buttonOptions.forEach(function (b, c) {
                    var d = b._range, k = b.type, n = b.count || 1, p = u[c], y = 0, x = b._offsetMax - b._offsetMin;
                    b = c === q;
                    var F = d > l - f, w = d < e.minRange,
                        G = !1, z = !1, d = d === h;
                    ("month" === k || "year" === k) && h + 36E5 >= 864E5 * {
                        month: 28,
                        year: 365
                    }[k] * n - x && h - 36E5 <= 864E5 * {
                        month: 31,
                        year: 366
                    }[k] * n + x ? d = !0 : "ytd" === k ? (d = r - m + x === h, G = !b) : "all" === k && (d = e.max - e.min >= l - f, z = !b && v && d);
                    k = !t && (F || w || z || g);
                    n = b && d || d && !v && !G || b && a.frozenStates;
                    k ? y = 3 : n && (v = !0, y = 2);
                    p.state !== y && (p.setState(y), 0 === y && q === c && a.setSelected(null))
                })
            },
            computeButtonRange: function (b) {
                var c = b.type, e = b.count || 1,
                    h = {millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5};
                if (h[c]) b._range = h[c] * e; else if ("month" ===
                    c || "year" === c) b._range = 864E5 * {month: 30, year: 365}[c] * e;
                b._offsetMin = a(b.offsetMin, 0);
                b._offsetMax = a(b.offsetMax, 0);
                b._range += b._offsetMax - b._offsetMin
            },
            setInputValue: function (a, b) {
                var c = this.chart.options.rangeSelector, k = this.chart.time, e = this[a + "Input"];
                A(b) && (e.previousValue = e.HCTime, e.HCTime = b);
                e.value = k.dateFormat(c.inputEditDateFormat || "%Y-%m-%d", e.HCTime);
                this[a + "DateBox"].attr({text: k.dateFormat(c.inputDateFormat || "%b %e, %Y", e.HCTime)})
            },
            showInput: function (a) {
                var b = this.inputGroup, c = this[a +
                "DateBox"];
                D(this[a + "Input"], {
                    left: b.translateX + c.x + "px",
                    top: b.translateY + "px",
                    width: c.width - 2 + "px",
                    height: c.height - 2 + "px",
                    border: "2px solid silver"
                })
            },
            hideInput: function (a) {
                D(this[a + "Input"], {border: 0, width: "1px", height: "1px"});
                this.setInputValue(a)
            },
            drawInput: function (a) {
                function c() {
                    var a = q.value, b = (f.inputDateParser || Date.parse)(a), c = m.xAxis[0],
                        d = m.scroller && m.scroller.xAxis ? m.scroller.xAxis : c, e = d.dataMin, d = d.dataMax;
                    b !== q.previousValue && (q.previousValue = b, p(b) || (b = a.split("-"), b = Date.UTC(l(b[0]),
                        l(b[1]) - 1, l(b[2]))), p(b) && (m.time.useUTC || (b += 6E4 * (new Date).getTimezoneOffset()), r ? b > n.maxInput.HCTime ? b = void 0 : b < e && (b = e) : b < n.minInput.HCTime ? b = void 0 : b > d && (b = d), void 0 !== b && c.setExtremes(r ? b : c.min, r ? c.max : b, void 0, void 0, {trigger: "rangeSelectorInput"})))
                }

                var n = this, m = n.chart, g = m.renderer.style || {}, d = m.renderer, f = m.options.rangeSelector,
                    y = n.div, r = "min" === a, q, t, u = this.inputGroup;
                this[a + "Label"] = t = d.label(v.lang[r ? "rangeSelectorFrom" : "rangeSelectorTo"], this.inputGroup.offset).addClass("highcharts-range-label").attr({padding: 2}).add(u);
                u.offset += t.width + 5;
                this[a + "DateBox"] = d = d.label("", u.offset).addClass("highcharts-range-input").attr({
                    padding: 2,
                    width: f.inputBoxWidth || 90,
                    height: f.inputBoxHeight || 17,
                    "text-align": "center"
                }).on("click", function () {
                    n.showInput(a);
                    n[a + "Input"].focus()
                });
                m.styledMode || d.attr({stroke: f.inputBoxBorderColor || "#cccccc", "stroke-width": 1});
                d.add(u);
                u.offset += d.width + (r ? 10 : 0);
                this[a + "Input"] = q = B("input", {
                    name: a,
                    className: "highcharts-range-selector",
                    type: "text"
                }, {top: m.plotTop + "px"}, y);
                m.styledMode || (t.css(h(g,
                    f.labelStyle)), d.css(h({color: "#333333"}, g, f.inputStyle)), D(q, e({
                    position: "absolute",
                    border: 0,
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    textAlign: "center",
                    fontSize: g.fontSize,
                    fontFamily: g.fontFamily,
                    top: "-9999em"
                }, f.inputStyle)));
                q.onfocus = function () {
                    n.showInput(a)
                };
                q.onblur = function () {
                    q === b.doc.activeElement && c();
                    n.hideInput(a);
                    q.blur()
                };
                q.onchange = c;
                q.onkeypress = function (a) {
                    13 === a.keyCode && c()
                }
            },
            getPosition: function () {
                var a = this.chart, b = a.options.rangeSelector,
                    a = "top" === b.verticalAlign ? a.plotTop - a.axisOffset[0] :
                        0;
                return {buttonTop: a + b.buttonPosition.y, inputTop: a + b.inputPosition.y - 10}
            },
            getYTDExtremes: function (a, b, e) {
                var c = this.chart.time, g = new c.Date(a), d = c.get("FullYear", g);
                e = e ? c.Date.UTC(d, 0, 1) : +new c.Date(d, 0, 1);
                b = Math.max(b || 0, e);
                g = g.getTime();
                return {max: Math.min(a || g, g), min: b}
            },
            render: function (b, e) {
                var c = this, k = c.chart, g = k.renderer, d = k.container, f = k.options,
                    h = f.exporting && !1 !== f.exporting.enabled && f.navigation && f.navigation.buttonOptions,
                    l = v.lang, m = c.div, p = f.rangeSelector, r = a(f.chart.style && f.chart.style.zIndex,
                    0) + 1, f = p.floating, q = c.buttons, m = c.inputGroup, t = p.buttonTheme, u = p.buttonPosition,
                    w = p.inputPosition, z = p.inputEnabled, A = t && t.states, C = k.plotLeft, E, D = c.buttonGroup, L;
                L = c.rendered;
                var M = c.options.verticalAlign, O = k.legend, P = O && O.options, Q = u.y, N = w.y, R = L || !1,
                    S = R ? "animate" : "attr", K = 0, I = 0, J;
                if (!1 !== p.enabled) {
                    L || (c.group = L = g.g("range-selector-group").attr({zIndex: 7}).add(), c.buttonGroup = D = g.g("range-selector-buttons").add(L), c.zoomText = g.text(l.rangeSelectorZoom, 0, 15).add(D), k.styledMode || (c.zoomText.css(p.labelStyle),
                        t["stroke-width"] = a(t["stroke-width"], 0)), c.buttonOptions.forEach(function (a, b) {
                        q[b] = g.button(a.text, 0, 0, function (d) {
                            var f = a.events && a.events.click, e;
                            f && (e = f.call(a, d));
                            !1 !== e && c.clickButton(b);
                            c.isActive = !0
                        }, t, A && A.hover, A && A.select, A && A.disabled).attr({"text-align": "center"}).add(D)
                    }), !1 !== z && (c.div = m = B("div", null, {
                        position: "relative",
                        height: 0,
                        zIndex: r
                    }), d.parentNode.insertBefore(m, d), c.inputGroup = m = g.g("input-group").add(L), m.offset = 0, c.drawInput("min"), c.drawInput("max")));
                    c.zoomText[S]({
                        x: a(C +
                            u.x, C)
                    });
                    E = a(C + u.x, C) + c.zoomText.getBBox().width + 5;
                    c.buttonOptions.forEach(function (b, c) {
                        q[c][S]({x: E});
                        E += q[c].width + a(p.buttonSpacing, 5)
                    });
                    C = k.plotLeft - k.spacing[3];
                    c.updateButtonStates();
                    h && this.titleCollision(k) && "top" === M && "right" === u.align && u.y + D.getBBox().height - 12 < (h.y || 0) + h.height && (K = -40);
                    "left" === u.align ? J = u.x - k.spacing[3] : "right" === u.align && (J = u.x + K - k.spacing[1]);
                    D.align({y: u.y, width: D.getBBox().width, align: u.align, x: J}, !0, k.spacingBox);
                    c.group.placed = R;
                    c.buttonGroup.placed = R;
                    !1 !== z &&
                    (K = h && this.titleCollision(k) && "top" === M && "right" === w.align && w.y - m.getBBox().height - 12 < (h.y || 0) + h.height + k.spacing[0] ? -40 : 0, "left" === w.align ? J = C : "right" === w.align && (J = -Math.max(k.axisOffset[1], -K)), m.align({
                        y: w.y,
                        width: m.getBBox().width,
                        align: w.align,
                        x: w.x + J - 2
                    }, !0, k.spacingBox), d = m.alignAttr.translateX + m.alignOptions.x - K + m.getBBox().x + 2, h = m.alignOptions.width, l = D.alignAttr.translateX + D.getBBox().x, J = D.getBBox().width + 20, (w.align === u.align || l + J > d && d + h > l && Q < N + m.getBBox().height) && m.attr({
                        translateX: m.alignAttr.translateX +
                            (k.axisOffset[1] >= -K ? 0 : -K),
                        translateY: m.alignAttr.translateY + D.getBBox().height + 10
                    }), c.setInputValue("min", b), c.setInputValue("max", e), c.inputGroup.placed = R);
                    c.group.align({verticalAlign: M}, !0, k.spacingBox);
                    b = c.group.getBBox().height + 20;
                    e = c.group.alignAttr.translateY;
                    "bottom" === M && (O = P && "bottom" === P.verticalAlign && P.enabled && !P.floating ? O.legendHeight + a(P.margin, 10) : 0, b = b + O - 20, I = e - b - (f ? 0 : p.y) - 10);
                    if ("top" === M) f && (I = 0), k.titleOffset && (I = k.titleOffset + k.options.title.margin), I += k.margin[0] - k.spacing[0] ||
                        0; else if ("middle" === M) if (N === Q) I = 0 > N ? e + void 0 : e; else if (N || Q) I = 0 > N || 0 > Q ? I - Math.min(N, Q) : e - b + NaN;
                    c.group.translate(p.x, p.y + Math.floor(I));
                    !1 !== z && (c.minInput.style.marginTop = c.group.translateY + "px", c.maxInput.style.marginTop = c.group.translateY + "px");
                    c.rendered = !0
                }
            },
            getHeight: function () {
                var a = this.options, b = this.group, e = a.y, h = a.buttonPosition.y, g = a.inputPosition.y;
                if (a.height) return a.height;
                a = b ? b.getBBox(!0).height + 13 + e : 0;
                b = Math.min(g, h);
                if (0 > g && 0 > h || 0 < g && 0 < h) a += Math.abs(b);
                return a
            },
            titleCollision: function (a) {
                return !(a.options.title.text ||
                    a.options.subtitle.text)
            },
            update: function (a) {
                var b = this.chart;
                h(!0, b.options.rangeSelector, a);
                this.destroy();
                this.init(b);
                b.rangeSelector.render()
            },
            destroy: function () {
                var a = this, e = a.minInput, h = a.maxInput;
                a.unMouseDown();
                a.unResize();
                C(a.buttons);
                e && (e.onfocus = e.onblur = e.onchange = null);
                h && (h.onfocus = h.onblur = h.onchange = null);
                b.objectEach(a, function (b, c) {
                    b && "chart" !== c && (b.destroy ? b.destroy() : b.nodeType && m(this[c]));
                    b !== t.prototype[c] && (a[c] = null)
                }, this)
            }
        };
        E.prototype.minFromRange = function () {
            var b =
                    this.range, e = {month: "Month", year: "FullYear"}[b.type], h, l = this.max, g, d, f = this.chart.time,
                m = function (a, b) {
                    var c = new f.Date(a), d = f.get(e, c);
                    f.set(e, c, d + b);
                    d === f.get(e, c) && f.set("Date", c, 0);
                    return c.getTime() - a
                };
            p(b) ? (h = l - b, d = b) : (h = l + m(l, -b.count), this.chart && (this.chart.fixedRange = l - h));
            g = a(this.dataMin, Number.MIN_VALUE);
            p(h) || (h = g);
            h <= g && (h = g, void 0 === d && (d = m(h, b.count)), this.newMax = Math.min(h + d, this.dataMax));
            p(l) || (h = void 0);
            return h
        };
        b.RangeSelector || (q(u, "afterGetContainer", function () {
            this.options.rangeSelector.enabled &&
            (this.rangeSelector = new t(this))
        }), q(u, "beforeRender", function () {
            var a = this.axes, b = this.rangeSelector;
            b && (p(b.deferredYTDClick) && (b.clickButton(b.deferredYTDClick), delete b.deferredYTDClick), a.forEach(function (a) {
                a.updateNames();
                a.setScale()
            }), this.getAxisMargins(), b.render(), a = b.options.verticalAlign, b.options.floating || ("bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0)))
        }), q(u, "update", function (a) {
            var b = a.options.rangeSelector;
            a = this.rangeSelector;
            var c = this.extraBottomMargin,
                e = this.extraTopMargin;
            b && b.enabled && !A(a) && (this.options.rangeSelector.enabled = !0, this.rangeSelector = new t(this));
            this.extraTopMargin = this.extraBottomMargin = !1;
            a && (a.render(), b = b && b.verticalAlign || a.options && a.options.verticalAlign, a.options.floating || ("bottom" === b ? this.extraBottomMargin = !0 : "middle" !== b && (this.extraTopMargin = !0)), this.extraBottomMargin !== c || this.extraTopMargin !== e) && (this.isDirtyBox = !0)
        }), q(u, "render", function () {
            var a = this.rangeSelector;
            a && !a.options.floating && (a.render(), a = a.options.verticalAlign,
                "bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0))
        }), q(u, "getMargins", function () {
            var a = this.rangeSelector;
            a && (a = a.getHeight(), this.extraTopMargin && (this.plotTop += a), this.extraBottomMargin && (this.marginBottom += a))
        }), u.prototype.callbacks.push(function (a) {
            function b() {
                c = a.xAxis[0].getExtremes();
                p(c.min) && e.render(c.min, c.max)
            }

            var c, e = a.rangeSelector, g, d;
            e && (d = q(a.xAxis[0], "afterSetExtremes", function (a) {
                e.render(a.min, a.max)
            }), g = q(a, "redraw", b), b());
            q(a, "destroy", function () {
                e &&
                (g(), d())
            })
        }), b.RangeSelector = t)
    });
    E(t, "parts/StockChart.js", [t["parts/Globals.js"]], function (b) {
        var t = b.addEvent, q = b.arrayMax, E = b.arrayMin, u = b.Axis, D = b.Chart, B = b.defined, v = b.extend,
            A = b.format, C = b.isNumber, m = b.isString, e = b.merge, r = b.pick, p = b.Point, h = b.Renderer,
            a = b.Series, l = b.splat, w = b.SVGRenderer, c = b.VMLRenderer, k = a.prototype, n = k.init,
            x = k.processData, g = p.prototype.tooltipFormatter;
        b.StockChart = b.stockChart = function (a, c, g) {
            var d = m(a) || a.nodeName, f = arguments[d ? 1 : 0], h = f, k = f.series, n = b.getOptions(), p,
                q = r(f.navigator && f.navigator.enabled, n.navigator.enabled, !0),
                y = q ? {startOnTick: !1, endOnTick: !1} : null;
            f.xAxis = l(f.xAxis || {}).map(function (a, b) {
                return e({
                    minPadding: 0,
                    maxPadding: 0,
                    overscroll: 0,
                    ordinal: !0,
                    title: {text: null},
                    labels: {overflow: "justify"},
                    showLastLabel: !0
                }, n.xAxis, n.xAxis && n.xAxis[b], a, {type: "datetime", categories: null}, y)
            });
            f.yAxis = l(f.yAxis || {}).map(function (a, b) {
                p = r(a.opposite, !0);
                return e({
                    labels: {y: -2},
                    opposite: p,
                    showLastLabel: !(!a.categories && "category" !== a.type),
                    title: {text: null}
                }, n.yAxis,
                    n.yAxis && n.yAxis[b], a)
            });
            f.series = null;
            f = e({
                chart: {panning: !0, pinchType: "x"},
                navigator: {enabled: q},
                scrollbar: {enabled: r(n.scrollbar.enabled, !0)},
                rangeSelector: {enabled: r(n.rangeSelector.enabled, !0)},
                title: {text: null},
                tooltip: {split: r(n.tooltip.split, !0), crosshairs: !0},
                legend: {enabled: !1}
            }, f, {isStock: !0});
            f.series = h.series = k;
            return d ? new D(a, f, g) : new D(f, c)
        };
        t(a, "setOptions", function (a) {
            function c(a) {
                return b.seriesTypes[a] && d instanceof b.seriesTypes[a]
            }

            var d = this, g;
            this.chart.options.isStock && (c("column") ||
            c("columnrange") ? g = {
                borderWidth: 0,
                shadow: !1
            } : !c("line") || c("scatter") || c("sma") || (g = {
                marker: {
                    enabled: !1,
                    radius: 2
                }
            }), g && (a.plotOptions[this.type] = e(a.plotOptions[this.type], g)))
        });
        t(u, "autoLabelAlign", function (a) {
            var b = this.chart, c = this.options, b = b._labelPanes = b._labelPanes || {}, d = this.options.labels;
            this.chart.options.isStock && "yAxis" === this.coll && (c = c.top + "," + c.height, !b[c] && d.enabled && (15 === d.x && (d.x = 0), void 0 === d.align && (d.align = "right"), b[c] = this, a.align = "right", a.preventDefault()))
        });
        t(u, "destroy",
            function () {
                var a = this.chart, b = this.options && this.options.top + "," + this.options.height;
                b && a._labelPanes && a._labelPanes[b] === this && delete a._labelPanes[b]
            });
        t(u, "getPlotLinePath", function (a) {
            function c(a) {
                var b = "xAxis" === a ? "yAxis" : "xAxis";
                a = d.options[b];
                return C(a) ? [g[b][a]] : m(a) ? [g.get(a)] : e.map(function (a) {
                    return a[b]
                })
            }

            var d = this, e = this.isLinked && !this.series ? this.linkedParent.series : this.series, g = d.chart,
                h = g.renderer, k = d.left, l = d.top, n, p, q, t, u = [], v = [], w, x, z = a.translatedValue,
                A = a.value, D = a.force,
                E;
            if (g.options.isStock && !1 !== a.acrossPanes && "xAxis" === d.coll || "yAxis" === d.coll) a.preventDefault(), v = c(d.coll), w = d.isXAxis ? g.yAxis : g.xAxis, w.forEach(function (a) {
                if (B(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1) {
                    var b = a.isXAxis ? "yAxis" : "xAxis", b = B(a.options[b]) ? g[b][a.options[b]] : g[b][0];
                    d === b && v.push(a)
                }
            }), x = v.length ? [] : [d.isXAxis ? g.yAxis[0] : g.xAxis[0]], v.forEach(function (a) {
                -1 !== x.indexOf(a) || b.find(x, function (b) {
                    return b.pos === a.pos && b.len === a.len
                }) || x.push(a)
            }), E = r(z, d.translate(A, null,
                null, a.old)), C(E) && (d.horiz ? x.forEach(function (a) {
                var b;
                p = a.pos;
                t = p + a.len;
                n = q = Math.round(E + d.transB);
                "pass" !== D && (n < k || n > k + d.width) && (D ? n = q = Math.min(Math.max(k, n), k + d.width) : b = !0);
                b || u.push("M", n, p, "L", q, t)
            }) : x.forEach(function (a) {
                var b;
                n = a.pos;
                q = n + a.len;
                p = t = Math.round(l + d.height - E);
                "pass" !== D && (p < l || p > l + d.height) && (D ? p = t = Math.min(Math.max(l, p), d.top + d.height) : b = !0);
                b || u.push("M", n, p, "L", q, t)
            })), a.path = 0 < u.length ? h.crispPolyLine(u, a.lineWidth || 1) : null
        });
        w.prototype.crispPolyLine = function (a, b) {
            var c;
            for (c = 0; c < a.length; c += 6) a[c + 1] === a[c + 4] && (a[c + 1] = a[c + 4] = Math.round(a[c + 1]) - b % 2 / 2), a[c + 2] === a[c + 5] && (a[c + 2] = a[c + 5] = Math.round(a[c + 2]) + b % 2 / 2);
            return a
        };
        h === c && (c.prototype.crispPolyLine = w.prototype.crispPolyLine);
        t(u, "afterHideCrosshair", function () {
            this.crossLabel && (this.crossLabel = this.crossLabel.hide())
        });
        t(u, "afterDrawCrosshair", function (a) {
            var b, c;
            if (B(this.crosshair.label) && this.crosshair.label.enabled && this.cross) {
                var d = this.chart, e = this.options.crosshair.label, g = this.horiz;
                b = this.opposite;
                c =
                    this.left;
                var h = this.top, k = this.crossLabel, l = e.format, m = "", n = "inside" === this.options.tickPosition,
                    p = !1 !== this.crosshair.snap, q = 0, t = a.e || this.cross && this.cross.e, u = a.point;
                a = this.lin2log;
                var w, x;
                this.isLog ? (w = a(this.min), x = a(this.max)) : (w = this.min, x = this.max);
                a = g ? "center" : b ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center";
                k || (k = this.crossLabel = d.renderer.label(null, null, null, e.shape || "callout").addClass("highcharts-crosshair-label" + (this.series[0] && " highcharts-color-" +
                    this.series[0].colorIndex)).attr({
                    align: e.align || a,
                    padding: r(e.padding, 8),
                    r: r(e.borderRadius, 3),
                    zIndex: 2
                }).add(this.labelGroup), d.styledMode || k.attr({
                    fill: e.backgroundColor || this.series[0] && this.series[0].color || "#666666",
                    stroke: e.borderColor || "",
                    "stroke-width": e.borderWidth || 0
                }).css(v({color: "#ffffff", fontWeight: "normal", fontSize: "11px", textAlign: "center"}, e.style)));
                g ? (a = p ? u.plotX + c : t.chartX, h += b ? 0 : this.height) : (a = b ? this.width + c : 0, h = p ? u.plotY + h : t.chartY);
                l || e.formatter || (this.isDatetimeAxis && (m =
                    "%b %d, %Y"), l = "{value" + (m ? ":" + m : "") + "}");
                m = p ? u[this.isXAxis ? "x" : "y"] : this.toValue(g ? t.chartX : t.chartY);
                k.attr({
                    text: l ? A(l, {value: m}, d.time) : e.formatter.call(this, m),
                    x: a,
                    y: h,
                    visibility: m < w || m > x ? "hidden" : "visible"
                });
                e = k.getBBox();
                if (g) {
                    if (n && !b || !n && b) h = k.y - e.height
                } else h = k.y - e.height / 2;
                g ? (b = c - e.x, c = c + this.width - e.x) : (b = "left" === this.labelAlign ? c : 0, c = "right" === this.labelAlign ? c + this.width : d.chartWidth);
                k.translateX < b && (q = b - k.translateX);
                k.translateX + e.width >= c && (q = -(k.translateX + e.width - c));
                k.attr({
                    x: a +
                        q,
                    y: h,
                    anchorX: g ? a : this.opposite ? 0 : d.chartWidth,
                    anchorY: g ? this.opposite ? d.chartHeight : 0 : h + e.height / 2
                })
            }
        });
        k.init = function () {
            n.apply(this, arguments);
            this.setCompare(this.options.compare)
        };
        k.setCompare = function (a) {
            this.modifyValue = "value" === a || "percent" === a ? function (b, c) {
                var d = this.compareValue;
                if (void 0 !== b && void 0 !== d) return b = "value" === a ? b - d : b / d * 100 - (100 === this.options.compareBase ? 0 : 100), c && (c.change = b), b
            } : null;
            this.userOptions.compare = a;
            this.chart.hasRendered && (this.isDirty = !0)
        };
        k.processData = function () {
            var a,
                b = -1, c, e, g = !0 === this.options.compareStart ? 0 : 1, h, k;
            x.apply(this, arguments);
            if (this.xAxis && this.processedYData) for (c = this.processedXData, e = this.processedYData, h = e.length, this.pointArrayMap && (b = this.pointArrayMap.indexOf(this.options.pointValKey || this.pointValKey || "y")), a = 0; a < h - g; a++) if (k = e[a] && -1 < b ? e[a][b] : e[a], C(k) && c[a + g] >= this.xAxis.min && 0 !== k) {
                this.compareValue = k;
                break
            }
        };
        t(a, "afterGetExtremes", function () {
            if (this.modifyValue) {
                var a = [this.modifyValue(this.dataMin), this.modifyValue(this.dataMax)];
                this.dataMin = E(a);
                this.dataMax = q(a)
            }
        });
        u.prototype.setCompare = function (a, b) {
            this.isXAxis || (this.series.forEach(function (b) {
                b.setCompare(a)
            }), r(b, !0) && this.chart.redraw())
        };
        p.prototype.tooltipFormatter = function (a) {
            a = a.replace("{point.change}", (0 < this.change ? "+" : "") + b.numberFormat(this.change, r(this.series.tooltipOptions.changeDecimals, 2)));
            return g.apply(this, [a])
        };
        t(a, "render", function () {
            var a;
            this.chart.is3d && this.chart.is3d() || this.chart.polar || !this.xAxis || this.xAxis.isRadial || (a = this.yAxis.len -
                (this.xAxis.axisLine ? Math.floor(this.xAxis.axisLine.strokeWidth() / 2) : 0), !this.clipBox && this.animate ? (this.clipBox = e(this.chart.clipBox), this.clipBox.width = this.xAxis.len, this.clipBox.height = a) : this.chart[this.sharedClipKey] && (this.chart[this.sharedClipKey].animate({
                width: this.xAxis.len,
                height: a
            }), this.chart[this.sharedClipKey + "m"] && this.chart[this.sharedClipKey + "m"].animate({width: this.xAxis.len})))
        });
        t(D, "update", function (a) {
            a = a.options;
            "scrollbar" in a && this.navigator && (e(!0, this.options.scrollbar,
                a.scrollbar), this.navigator.update({}, !1), delete a.scrollbar)
        })
    });
    E(t, "masters/modules/stock.src.js", [], function () {
    })
});
//# sourceMappingURL=stock.js.map
