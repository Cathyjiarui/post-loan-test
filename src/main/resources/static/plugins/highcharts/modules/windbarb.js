/*
  Highcharts JS v7.1.2 (2019-06-03)

 Wind barb series module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (a) {
    "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/modules/windbarb", ["highcharts"], function (g) {
        a(g);
        a.Highcharts = g;
        return a
    }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (a) {
    function g(l, a, g, m) {
        l.hasOwnProperty(a) || (l[a] = m.apply(null, g))
    }

    a = a ? a._modules : {};
    g(a, "mixins/on-series.js", [a["parts/Globals.js"]], function (a) {
        var l = a.defined, g = a.seriesTypes, m = a.stableSort;
        return {
            getPlotBox: function () {
                return a.Series.prototype.getPlotBox.call(this.options.onSeries &&
                    this.chart.get(this.options.onSeries) || this)
            }, translate: function () {
                g.column.prototype.translate.apply(this);
                var a = this, b = a.options, e = a.chart, f = a.points, c = f.length - 1, d, h = b.onSeries,
                    h = h && e.get(h), b = b.onKey || "y", y = h && h.options.step, p = h && h.points,
                    n = p && p.length, r = e.inverted, t = a.xAxis, x = a.yAxis, v = 0, k, w, q, u;
                if (h && h.visible && n) for (v = (h.pointXOffset || 0) + (h.barW || 0) / 2, e = h.currentDataGrouping, w = p[n - 1].x + (e ? e.totalRange : 0), m(f, function (b, c) {
                    return b.x - c.x
                }), b = "plot" + b[0].toUpperCase() + b.substr(1); n-- && f[c] &&
                                              !(k = p[n], e = f[c], e.y = k.y, k.x <= e.x && void 0 !== k[b] && (e.x <= w && (e.plotY = k[b], k.x < e.x && !y && (q = p[n + 1]) && void 0 !== q[b] && (u = (e.x - k.x) / (q.x - k.x), e.plotY += u * (q[b] - k[b]), e.y += u * (q.y - k.y))), c--, n++, 0 > c));) ;
                f.forEach(function (b, c) {
                    var e;
                    b.plotX += v;
                    if (void 0 === b.plotY || r) 0 <= b.plotX && b.plotX <= t.len ? r ? (b.plotY = t.translate(b.x, 0, 1, 0, 1), b.plotX = l(b.y) ? x.translate(b.y, 0, 0, 0, 1) : 0) : b.plotY = (t.opposite ? 0 : a.yAxis.len) + t.offset : b.shapeArgs = {};
                    (d = f[c - 1]) && d.plotX === b.plotX && (void 0 === d.stackIndex && (d.stackIndex = 0), e = d.stackIndex +
                        1);
                    b.stackIndex = e
                });
                this.onSeries = h
            }
        }
    });
    g(a, "modules/windbarb.src.js", [a["parts/Globals.js"], a["mixins/on-series.js"]], function (a, g) {
        function l() {
            a.approximations && !a.approximations.windbarb && (a.approximations.windbarb = function (b, e) {
                var f = 0, c = 0, d, h = b.length;
                for (d = 0; d < h; d++) f += b[d] * Math.cos(e[d] * a.deg2rad), c += b[d] * Math.sin(e[d] * a.deg2rad);
                return [b.reduce(function (b, c) {
                    return b + c
                }, 0) / b.length, Math.atan2(c, f) / a.deg2rad]
            })
        }

        var m = a.noop, r = a.seriesType;
        l();
        r("windbarb", "column", {
            dataGrouping: {
                enabled: !0,
                approximation: "windbarb", groupPixelWidth: 30
            },
            lineWidth: 2,
            onSeries: null,
            states: {hover: {lineWidthPlus: 0}},
            tooltip: {pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.value}\x3c/b\x3e ({point.beaufort})\x3cbr/\x3e'},
            vectorLength: 20,
            yOffset: -20,
            xOffset: 0
        }, {
            pointArrayMap: ["value", "direction"],
            parallelArrays: ["x", "value", "direction"],
            beaufortName: "Calm;Light air;Light breeze;Gentle breeze;Moderate breeze;Fresh breeze;Strong breeze;Near gale;Gale;Strong gale;Storm;Violent storm;Hurricane".split(";"),
            beaufortFloor: [0, .3, 1.6, 3.4, 5.5, 8, 10.8, 13.9, 17.2, 20.8, 24.5, 28.5, 32.7],
            trackerGroups: ["markerGroup"],
            init: function (b, e) {
                l();
                a.Series.prototype.init.call(this, b, e)
            },
            pointAttribs: function (b, a) {
                var e = this.options;
                b = b.color || this.color;
                var c = this.options.lineWidth;
                a && (b = e.states[a].color || b, c = (e.states[a].lineWidth || c) + (e.states[a].lineWidthPlus || 0));
                return {stroke: b, "stroke-width": c}
            },
            markerAttribs: function () {
            },
            getPlotBox: g.getPlotBox,
            windArrow: function (b) {
                var a = 1.943844 * b.value, f, c = this.options.vectorLength /
                    20, d = -10;
                if (b.isNull) return [];
                if (0 === b.beaufortLevel) return this.chart.renderer.symbols.circle(-10 * c, -10 * c, 20 * c, 20 * c);
                b = ["M", 0, 7 * c, "L", -1.5 * c, 7 * c, 0, 10 * c, 1.5 * c, 7 * c, 0, 7 * c, 0, -10 * c];
                f = (a - a % 50) / 50;
                if (0 < f) for (; f--;) b.push(-10 === d ? "L" : "M", 0, d * c, "L", 5 * c, d * c + 2, "L", 0, d * c + 4), a -= 50, d += 7;
                f = (a - a % 10) / 10;
                if (0 < f) for (; f--;) b.push(-10 === d ? "L" : "M", 0, d * c, "L", 7 * c, d * c), a -= 10, d += 3;
                f = (a - a % 5) / 5;
                if (0 < f) for (; f--;) b.push(-10 === d ? "L" : "M", 0, d * c, "L", 4 * c, d * c), a -= 5, d += 3;
                return b
            },
            translate: function () {
                var b = this.beaufortFloor, a = this.beaufortName;
                g.translate.call(this);
                this.points.forEach(function (e) {
                    for (var c = 0; c < b.length && !(b[c] > e.value); c++) ;
                    e.beaufortLevel = c - 1;
                    e.beaufort = a[c - 1]
                })
            },
            drawPoints: function () {
                var b = this.chart, a = this.yAxis, f = b.inverted, c = this.options.vectorLength / 2;
                this.points.forEach(function (d) {
                    var e = d.plotX, g = d.plotY;
                    !1 === this.options.clip || b.isInsidePlot(e, 0, !1) ? (d.graphic || (d.graphic = this.chart.renderer.path().add(this.markerGroup)), d.graphic.attr({
                        d: this.windArrow(d),
                        translateX: e + this.options.xOffset,
                        translateY: g + this.options.yOffset,
                        rotation: d.direction
                    }).attr(this.pointAttribs(d))) : d.graphic && (d.graphic = d.graphic.destroy());
                    d.tooltipPos = [e + this.options.xOffset + (f && !this.onSeries ? c : 0), g + this.options.yOffset - (f ? 0 : c + a.pos - b.plotTop)]
                }, this)
            },
            animate: function (b) {
                b ? this.markerGroup.attr({opacity: .01}) : (this.markerGroup.animate({opacity: 1}, a.animObject(this.options.animation)), this.animate = null)
            },
            invertGroups: m,
            getExtremes: m
        }, {
            isValid: function () {
                return a.isNumber(this.value) && 0 <= this.value
            }
        })
    });
    g(a, "masters/modules/windbarb.src.js",
        [], function () {
        })
});
//# sourceMappingURL=windbarb.js.map
