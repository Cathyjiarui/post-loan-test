/*
 Highcharts JS v7.1.2 (2019-06-03)

 Highcharts funnel module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (b) {
    "object" === typeof module && module.exports ? (b["default"] = b, module.exports = b) : "function" === typeof define && define.amd ? define("highcharts/modules/funnel", ["highcharts"], function (d) {
        b(d);
        b.Highcharts = d;
        return b
    }) : b("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (b) {
    function d(b, d, x, C) {
        b.hasOwnProperty(d) || (b[d] = C.apply(null, x))
    }

    b = b ? b._modules : {};
    d(b, "modules/funnel.src.js", [b["parts/Globals.js"]], function (b) {
        var d = b.seriesType, x = b.seriesTypes, C = b.noop, H = b.pick;
        d("funnel", "pie",
            {
                animation: !1,
                center: ["50%", "50%"],
                width: "90%",
                neckWidth: "30%",
                height: "100%",
                neckHeight: "25%",
                reversed: !1,
                size: !0,
                dataLabels: {connectorWidth: 1},
                states: {select: {color: "#cccccc", borderColor: "#000000"}}
            }, {
                animate: C, translate: function () {
                    var a = function (b, a) {
                            return /%$/.test(b) ? a * parseInt(b, 10) / 100 : parseInt(b, 10)
                        }, b = 0, f = this.chart, e = this.options, h = e.reversed, l = e.ignoreHiddenPoint,
                        c = f.plotWidth, f = f.plotHeight, d = 0, q = e.center, g = a(q[0], c), k = a(q[1], f),
                        x = a(e.width, c), r, y, t = a(e.height, f), z = a(e.neckWidth, c), G = a(e.neckHeight,
                        f), A = k - t / 2 + t - G, a = this.data, D, E, I = "left" === e.dataLabels.position ? 1 : 0, B,
                        m, F, u, n, w, p;
                    this.getWidthAt = y = function (b) {
                        var a = k - t / 2;
                        return b > A || t === G ? z : z + (x - z) * (1 - (b - a) / (t - G))
                    };
                    this.getX = function (b, a, c) {
                        return g + (a ? -1 : 1) * (y(h ? 2 * k - b : b) / 2 + c.labelDistance)
                    };
                    this.center = [g, k, t];
                    this.centerX = g;
                    a.forEach(function (a) {
                        l && !1 === a.visible || (b += a.y)
                    });
                    a.forEach(function (a) {
                        p = null;
                        E = b ? a.y / b : 0;
                        m = k - t / 2 + d * t;
                        n = m + E * t;
                        r = y(m);
                        B = g - r / 2;
                        F = B + r;
                        r = y(n);
                        u = g - r / 2;
                        w = u + r;
                        m > A ? (B = u = g - z / 2, F = w = g + z / 2) : n > A && (p = n, r = y(A), u = g - r / 2, w = u + r, n = A);
                        h &&
                        (m = 2 * k - m, n = 2 * k - n, null !== p && (p = 2 * k - p));
                        D = ["M", B, m, "L", F, m, w, n];
                        null !== p && D.push(w, p, u, p);
                        D.push(u, n, "Z");
                        a.shapeType = "path";
                        a.shapeArgs = {d: D};
                        a.percentage = 100 * E;
                        a.plotX = g;
                        a.plotY = (m + (p || n)) / 2;
                        a.tooltipPos = [g, a.plotY];
                        a.dlBox = {x: u, y: m, topWidth: F - B, bottomWidth: w - u, height: Math.abs(H(n, p) - m)};
                        a.slice = C;
                        a.half = I;
                        l && !1 === a.visible || (d += E)
                    })
                }, sortByAngle: function (a) {
                    a.sort(function (a, b) {
                        return a.plotY - b.plotY
                    })
                }, drawDataLabels: function () {
                    var a = this.data, b = this.options.dataLabels.distance, f, e, h, d = a.length,
                        c, v;
                    for (this.center[2] -= 2 * b; d--;) h = a[d], e = (f = h.half) ? 1 : -1, v = h.plotY, h.labelDistance = H(h.options.dataLabels && h.options.dataLabels.distance, b), this.maxLabelDistance = Math.max(h.labelDistance, this.maxLabelDistance || 0), c = this.getX(v, f, h), h.labelPosition = {
                        natural: {
                            x: 0,
                            y: v
                        },
                        "final": {},
                        alignment: f ? "right" : "left",
                        connectorPosition: {
                            breakAt: {x: c + (h.labelDistance - 5) * e, y: v},
                            touchingSliceAt: {x: c + h.labelDistance * e, y: v}
                        }
                    };
                    x[this.options.dataLabels.inside ? "column" : "pie"].prototype.drawDataLabels.call(this)
                }, alignDataLabel: function (a,
                                             d, f, e, h) {
                    var l = a.series;
                    e = l.options.reversed;
                    var c = a.dlBox || a.shapeArgs, v = f.align, q = f.verticalAlign, g = l.center[1],
                        l = l.getWidthAt((e ? 2 * g - a.plotY : a.plotY) - c.height / 2 + d.height),
                        l = "middle" === q ? (c.topWidth - c.bottomWidth) / 4 : (l - c.bottomWidth) / 2, g = c.y,
                        k = c.x;
                    "middle" === q ? g = c.y - c.height / 2 + d.height / 2 : "top" === q && (g = c.y - c.height + d.height + f.padding);
                    if ("top" === q && !e || "bottom" === q && e || "middle" === q) "right" === v ? k = c.x - f.padding + l : "left" === v && (k = c.x + f.padding - l);
                    e = {x: k, y: e ? g - c.height : g, width: c.bottomWidth, height: c.height};
                    f.verticalAlign = "bottom";
                    b.Series.prototype.alignDataLabel.call(this, a, d, f, e, h);
                    a.isLabelJustified && a.contrastColor && d.css({color: a.contrastColor})
                }
            });
        d("pyramid", "funnel", {neckWidth: "0%", neckHeight: "0%", reversed: !0})
    });
    d(b, "masters/modules/funnel.src.js", [], function () {
    })
});
//# sourceMappingURL=funnel.js.map
