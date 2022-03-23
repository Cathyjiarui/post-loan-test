/*
 Highcharts JS v7.1.2 (2019-06-03)

 Boost module

 (c) 2010-2019 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function (e) {
    "object" === typeof module && module.exports ? (e["default"] = e, module.exports = e) : "function" === typeof define && define.amd ? define("highcharts/modules/boost-canvas", ["highcharts"], function (k) {
        e(k);
        e.Highcharts = k;
        return e
    }) : e("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (e) {
    function k(c, e, k, v) {
        c.hasOwnProperty(e) || (c[e] = v.apply(null, k))
    }

    e = e ? e._modules : {};
    k(e, "modules/boost-canvas.src.js", [e["parts/Globals.js"]], function (c) {
        var e = c.win.document, k = function () {
            }, v = c.Color, w = c.Series,
            m = c.seriesTypes, x = c.extend, y = c.addEvent, da = c.fireEvent, ea = c.isNumber, fa = c.merge,
            ga = c.pick, z = c.wrap, J;
        c.initCanvasBoost = function () {
            c.seriesTypes.heatmap && c.wrap(c.seriesTypes.heatmap.prototype, "drawPoints", function () {
                var a = this.chart, b = this.getContext(), g = this.chart.inverted, c = this.xAxis, d = this.yAxis;
                b ? (this.points.forEach(function (e) {
                    var f = e.plotY;
                    void 0 === f || isNaN(f) || null === e.y || (f = e.shapeArgs, e = a.styledMode ? e.series.colorAttribs(e) : e.series.pointAttribs(e), b.fillStyle = e.fill, g ? b.fillRect(d.len -
                        f.y + c.left, c.len - f.x + d.top, -f.height, -f.width) : b.fillRect(f.x + c.left, f.y + d.top, f.width, f.height))
                }), this.canvasToSVG()) : this.chart.showLoading("Your browser doesn't support HTML5 canvas, \x3cbr\x3eplease use a modern browser")
            });
            c.extend(w.prototype, {
                getContext: function () {
                    var a = this.chart, b = a.chartWidth, g = a.chartHeight, c = a.seriesGroup || this.group, d = this,
                        k, f = function (a, d, g, b, c, e, f) {
                            a.call(this, g, d, b, c, e, f)
                        };
                    a.isChartSeriesBoosting() && (d = a, c = a.seriesGroup);
                    k = d.ctx;
                    d.canvas || (d.canvas = e.createElement("canvas"),
                        d.renderTarget = a.renderer.image("", 0, 0, b, g).addClass("highcharts-boost-canvas").add(c), d.ctx = k = d.canvas.getContext("2d"), a.inverted && ["moveTo", "lineTo", "rect", "arc"].forEach(function (a) {
                        z(k, a, f)
                    }), d.boostCopy = function () {
                        d.renderTarget.attr({href: d.canvas.toDataURL("image/png")})
                    }, d.boostClear = function () {
                        k.clearRect(0, 0, d.canvas.width, d.canvas.height);
                        d === this && d.renderTarget.attr({href: ""})
                    }, d.boostClipRect = a.renderer.clipRect(), d.renderTarget.clip(d.boostClipRect));
                    d.canvas.width !== b && (d.canvas.width =
                        b);
                    d.canvas.height !== g && (d.canvas.height = g);
                    d.renderTarget.attr({x: 0, y: 0, width: b, height: g, style: "pointer-events: none", href: ""});
                    d.boostClipRect.attr(a.getBoostClipRect(d));
                    return k
                }, canvasToSVG: function () {
                    this.chart.isChartSeriesBoosting() ? this.boostClear && this.boostClear() : (this.boostCopy || this.chart.boostCopy) && (this.boostCopy || this.chart.boostCopy)()
                }, cvsLineTo: function (a, b, g) {
                    a.lineTo(b, g)
                }, renderCanvas: function () {
                    var a = this, b = a.options, g = a.chart, e = this.xAxis, d = this.yAxis, m = (g.options.boost ||
                        {}).timeRendering || !1, f, p = 0, L = a.processedXData, w = a.processedYData, M = b.data,
                        l = e.getExtremes(), A = l.min, B = l.max, l = d.getExtremes(), z = l.min, ha = l.max, N = {},
                        C, ia = !!a.sampling, O, D = b.marker && b.marker.radius, P = this.cvsDrawPoint,
                        E = b.lineWidth ? this.cvsLineTo : !1,
                        Q = D && 1 >= D ? this.cvsMarkerSquare : this.cvsMarkerCircle, ja = this.cvsStrokeBatch || 1E3,
                        ka = !1 !== b.enableMouseTracking, R, l = b.threshold, q = d.getThreshold(l), S = ea(l), T = q,
                        la = this.fill, U = a.pointArrayMap && "low,high" === a.pointArrayMap.join(","),
                        V = !!b.stacking, W = a.cropStart ||
                        0, l = g.options.loading, ma = a.requireSorting, X, na = b.connectNulls, Y = !L, F, G, r, u, H,
                        n = V ? a.data : L || M,
                        oa = a.fillOpacity ? (new v(a.color)).setOpacity(ga(b.fillOpacity, .75)).get() : a.color,
                        Z = function () {
                            la ? (f.fillStyle = oa, f.fill()) : (f.strokeStyle = a.color, f.lineWidth = b.lineWidth, f.stroke())
                        }, ba = function (d, b, e, c) {
                            0 === p && (f.beginPath(), E && (f.lineJoin = "round"));
                            g.scroller && "highcharts-navigator-series" === a.options.className ? (b += g.scroller.top, e && (e += g.scroller.top)) : b += g.plotTop;
                            d += g.plotLeft;
                            X ? f.moveTo(d, b) : P ? P(f,
                                d, b, e, R) : E ? E(f, d, b) : Q && Q.call(a, f, d, b, D, c);
                            p += 1;
                            p === ja && (Z(), p = 0);
                            R = {clientX: d, plotY: b, yBottom: e}
                        }, pa = "x" === b.findNearestPointBy,
                        ca = this.xData || this.options.xData || this.processedXData || !1, I = function (a, b, c) {
                            H = pa ? a : a + "," + b;
                            ka && !N[H] && (N[H] = !0, g.inverted && (a = e.len - a, b = d.len - b), O.push({
                                x: ca ? ca[W + c] : !1,
                                clientX: a,
                                plotX: a,
                                plotY: b,
                                i: W + c
                            }))
                        };
                    this.renderTarget && this.renderTarget.attr({href: ""});
                    (this.points || this.graph) && this.destroyGraphics();
                    a.plotGroup("group", "series", a.visible ? "visible" : "hidden", b.zIndex,
                        g.seriesGroup);
                    a.markerGroup = a.group;
                    y(a, "destroy", function () {
                        a.markerGroup = null
                    });
                    O = this.points = [];
                    f = this.getContext();
                    a.buildKDTree = k;
                    this.boostClear && this.boostClear();
                    this.visible && (99999 < M.length && (g.options.loading = fa(l, {
                        labelStyle: {
                            backgroundColor: c.color("#ffffff").setOpacity(.75).get(),
                            padding: "1em",
                            borderRadius: "0.5em"
                        }, style: {backgroundColor: "none", opacity: 1}
                    }), c.clearTimeout(J), g.showLoading("Drawing..."), g.options.loading = l), m && console.time("canvas rendering"), c.eachAsync(n, function (b,
                                                                                                                                                                c) {
                        var f, h, k, m = !1, K = !1, l = !1, t = !1, p = "undefined" === typeof g.index, aa = !0;
                        if (!p) {
                            Y ? (f = b[0], h = b[1], n[c + 1] && (l = n[c + 1][0]), n[c - 1] && (t = n[c - 1][0])) : (f = b, h = w[c], n[c + 1] && (l = n[c + 1]), n[c - 1] && (t = n[c - 1]));
                            l && l >= A && l <= B && (m = !0);
                            t && t >= A && t <= B && (K = !0);
                            U ? (Y && (h = b.slice(1, 3)), k = h[0], h = h[1]) : V && (f = b.x, h = b.stackY, k = h - b.y);
                            b = null === h;
                            ma || (aa = h >= z && h <= ha);
                            if (!b && (f >= A && f <= B && aa || m || K)) if (f = Math.round(e.toPixels(f, !0)), ia) {
                                if (void 0 === r || f === C) {
                                    U || (k = h);
                                    if (void 0 === u || h > G) G = h, u = c;
                                    if (void 0 === r || k < F) F = k, r = c
                                }
                                f !== C && (void 0 !==
                                r && (h = d.toPixels(G, !0), q = d.toPixels(F, !0), ba(f, S ? Math.min(h, T) : h, S ? Math.max(q, T) : q, c), I(f, h, u), q !== h && I(f, q, r)), r = u = void 0, C = f)
                            } else h = Math.round(d.toPixels(h, !0)), ba(f, h, q, c), I(f, h, c);
                            X = b && !na;
                            0 === c % 5E4 && (a.boostCopy || a.chart.boostCopy) && (a.boostCopy || a.chart.boostCopy)()
                        }
                        return !p
                    }, function () {
                        var b = g.loadingDiv, d = g.loadingShown;
                        Z();
                        a.canvasToSVG();
                        m && console.timeEnd("canvas rendering");
                        da(a, "renderedCanvas");
                        d && (x(b.style, {
                            transition: "opacity 250ms",
                            opacity: 0
                        }), g.loadingShown = !1, J = setTimeout(function () {
                            b.parentNode &&
                            b.parentNode.removeChild(b);
                            g.loadingDiv = g.loadingSpan = null
                        }, 250));
                        delete a.buildKDTree;
                        a.buildKDTree()
                    }, g.renderer.forExport ? Number.MAX_VALUE : void 0))
                }
            });
            m.scatter.prototype.cvsMarkerCircle = function (a, b, c, e) {
                a.moveTo(b, c);
                a.arc(b, c, e, 0, 2 * Math.PI, !1)
            };
            m.scatter.prototype.cvsMarkerSquare = function (a, b, c, e) {
                a.rect(b - e, c - e, 2 * e, 2 * e)
            };
            m.scatter.prototype.fill = !0;
            m.bubble && (m.bubble.prototype.cvsMarkerCircle = function (a, b, c, e, d) {
                a.moveTo(b, c);
                a.arc(b, c, this.radii && this.radii[d], 0, 2 * Math.PI, !1)
            }, m.bubble.prototype.cvsStrokeBatch =
                1);
            x(m.area.prototype, {
                cvsDrawPoint: function (a, b, c, e, d) {
                    d && b !== d.clientX && (a.moveTo(d.clientX, d.yBottom), a.lineTo(d.clientX, d.plotY), a.lineTo(b, c), a.lineTo(b, e))
                }, fill: !0, fillOpacity: !0, sampling: !0
            });
            x(m.column.prototype, {
                cvsDrawPoint: function (a, b, c, e) {
                    a.rect(b - 1, c, 1, e - c)
                }, fill: !0, sampling: !0
            });
            c.Chart.prototype.callbacks.push(function (a) {
                y(a, "predraw", function () {
                    a.renderTarget && a.renderTarget.attr({href: ""});
                    a.canvas && a.canvas.getContext("2d").clearRect(0, 0, a.canvas.width, a.canvas.height)
                });
                y(a,
                    "render", function () {
                        a.boostCopy && a.boostCopy()
                    })
            })
        }
    });
    k(e, "masters/modules/boost-canvas.src.js", [], function () {
    })
});
//# sourceMappingURL=boost-canvas.js.map
