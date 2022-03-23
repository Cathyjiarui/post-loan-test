/*
 Highcharts JS v7.1.2 (2019-06-03)

 (c) 2009-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (c) {
    "object" === typeof module && module.exports ? (c["default"] = c, module.exports = c) : "function" === typeof define && define.amd ? define("highcharts/modules/broken-axis", ["highcharts"], function (g) {
        c(g);
        c.Highcharts = g;
        return c
    }) : c("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (c) {
    function g(c, k, m, g) {
        c.hasOwnProperty(k) || (c[k] = g.apply(null, m))
    }

    c = c ? c._modules : {};
    g(c, "modules/broken-axis.src.js", [c["parts/Globals.js"]], function (c) {
        var k = c.addEvent, m = c.pick, g = c.extend, v = c.isArray, w = c.find,
            r = c.fireEvent, n = c.Axis, t = c.Series, u = function (b, d) {
                return w(d, function (f) {
                    return f.from < b && b < f.to
                })
            };
        g(n.prototype, {
            isInBreak: function (b, d) {
                var f = b.repeat || Infinity, e = b.from, a = b.to - b.from;
                d = d >= e ? (d - e) % f : f - (e - d) % f;
                return b.inclusive ? d <= a : d < a && 0 !== d
            }, isInAnyBreak: function (b, d) {
                var f = this.options.breaks, e = f && f.length, a, c, h;
                if (e) {
                    for (; e--;) this.isInBreak(f[e], b) && (a = !0, c || (c = m(f[e].showPoints, !this.isXAxis)));
                    h = a && d ? a && !c : a
                }
                return h
            }
        });
        k(n, "afterInit", function () {
            "function" === typeof this.setBreaks && this.setBreaks(this.options.breaks,
                !1)
        });
        k(n, "afterSetTickPositions", function () {
            if (this.isBroken) {
                var b = this.tickPositions, c = this.tickPositions.info, f = [], e;
                for (e = 0; e < b.length; e++) this.isInAnyBreak(b[e]) || f.push(b[e]);
                this.tickPositions = f;
                this.tickPositions.info = c
            }
        });
        k(n, "afterSetOptions", function () {
            this.isBroken && (this.options.ordinal = !1)
        });
        n.prototype.setBreaks = function (b, c) {
            function f(b) {
                var c = b, d, f;
                for (f = 0; f < a.breakArray.length; f++) if (d = a.breakArray[f], d.to <= b) c -= d.len; else if (d.from >= b) break; else if (a.isInBreak(d, b)) {
                    c -= b - d.from;
                    break
                }
                return c
            }

            function e(b) {
                var c, d;
                for (d = 0; d < a.breakArray.length && !(c = a.breakArray[d], c.from >= b); d++) c.to < b ? b += c.len : a.isInBreak(c, b) && (b += c.len);
                return b
            }

            var a = this, d = v(b) && !!b.length;
            a.isDirty = a.isBroken !== d;
            a.isBroken = d;
            a.options.breaks = a.userOptions.breaks = b;
            a.forceRedraw = !0;
            d || a.val2lin !== f || (delete a.val2lin, delete a.lin2val);
            d && (a.userOptions.ordinal = !1, a.val2lin = f, a.lin2val = e, a.setExtremes = function (a, b, c, d, f) {
                if (this.isBroken) {
                    for (var e, h = this.options.breaks; e = u(a, h);) a = e.to;
                    for (; e = u(b,
                        h);) b = e.from;
                    b < a && (b = a)
                }
                n.prototype.setExtremes.call(this, a, b, c, d, f)
            }, a.setAxisTranslation = function (b) {
                n.prototype.setAxisTranslation.call(this, b);
                this.unitLength = null;
                if (this.isBroken) {
                    b = a.options.breaks;
                    var c = [], d = [], f = 0, e, h, g = a.userMin || a.min, k = a.userMax || a.max,
                        q = m(a.pointRangePadding, 0), l, p;
                    b.forEach(function (b) {
                        h = b.repeat || Infinity;
                        a.isInBreak(b, g) && (g += b.to % h - g % h);
                        a.isInBreak(b, k) && (k -= k % h - b.from % h)
                    });
                    b.forEach(function (a) {
                        l = a.from;
                        for (h = a.repeat || Infinity; l - h > g;) l -= h;
                        for (; l < g;) l += h;
                        for (p = l; p <
                        k; p += h) c.push({value: p, move: "in"}), c.push({
                            value: p + (a.to - a.from),
                            move: "out",
                            size: a.breakSize
                        })
                    });
                    c.sort(function (a, b) {
                        return a.value === b.value ? ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1) : a.value - b.value
                    });
                    e = 0;
                    l = g;
                    c.forEach(function (a) {
                        e += "in" === a.move ? 1 : -1;
                        1 === e && "in" === a.move && (l = a.value);
                        0 === e && (d.push({
                            from: l,
                            to: a.value,
                            len: a.value - l - (a.size || 0)
                        }), f += a.value - l - (a.size || 0))
                    });
                    a.breakArray = d;
                    a.unitLength = k - g - f + q;
                    r(a, "afterBreaks");
                    a.staticScale ? a.transA = a.staticScale : a.unitLength && (a.transA *= (k - a.min +
                        q) / a.unitLength);
                    q && (a.minPixelPadding = a.transA * a.minPointOffset);
                    a.min = g;
                    a.max = k
                }
            });
            m(c, !0) && this.chart.redraw()
        };
        k(t, "afterGeneratePoints", function () {
            var b = this.xAxis, c = this.yAxis, f = this.points, e, a = f.length, g = this.options.connectNulls, h;
            if (b && c && (b.options.breaks || c.options.breaks)) for (; a--;) e = f[a], h = null === e.y && !1 === g, h || !b.isInAnyBreak(e.x, !0) && !c.isInAnyBreak(e.y, !0) || (f.splice(a, 1), this.data[a] && this.data[a].destroyElements())
        });
        k(t, "afterRender", function () {
            this.drawBreaks(this.xAxis, ["x"]);
            this.drawBreaks(this.yAxis, m(this.pointArrayMap, ["y"]))
        });
        c.Series.prototype.drawBreaks = function (b, c) {
            var d = this, e = d.points, a, g, h, k;
            b && c.forEach(function (c) {
                a = b.breakArray || [];
                g = b.isXAxis ? b.min : m(d.options.threshold, b.min);
                e.forEach(function (d) {
                    k = m(d["stack" + c.toUpperCase()], d[c]);
                    a.forEach(function (a) {
                        h = !1;
                        if (g < a.from && k > a.to || g > a.from && k < a.from) h = "pointBreak"; else if (g < a.from && k > a.from && k < a.to || g > a.from && k > a.to && k < a.from) h = "pointInBreak";
                        h && r(b, h, {point: d, brk: a})
                    })
                })
            })
        };
        c.Series.prototype.gappedPath =
            function () {
                var b = this.currentDataGrouping, d = b && b.gapSize, b = this.options.gapSize, f = this.points.slice(),
                    e = f.length - 1, a = this.yAxis;
                if (b && 0 < e) for ("value" !== this.options.gapUnit && (b *= this.closestPointRange), d && d > b && (b = d); e--;) f[e + 1].x - f[e].x > b && (d = (f[e].x + f[e + 1].x) / 2, f.splice(e + 1, 0, {
                    isNull: !0,
                    x: d
                }), this.options.stacking && (d = a.stacks[this.stackKey][d] = new c.StackItem(a, a.options.stackLabels, !1, d, this.stack), d.total = 0));
                return this.getGraphPath(f)
            }
    });
    g(c, "masters/modules/broken-axis.src.js", [], function () {
    })
});
//# sourceMappingURL=broken-axis.js.map
