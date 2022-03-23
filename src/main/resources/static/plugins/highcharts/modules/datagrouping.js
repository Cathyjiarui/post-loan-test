/*
  Highcharts JS v7.1.2 (2019-06-03)

 Data grouping module

 (c) 2010-2019 Torstein Hnsi

 License: www.highcharts.com/license
*/
(function (e) {
    "object" === typeof module && module.exports ? (e["default"] = e, module.exports = e) : "function" === typeof define && define.amd ? define("highcharts/modules/datagrouping", ["highcharts"], function (p) {
        e(p);
        e.Highcharts = p;
        return e
    }) : e("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (e) {
    function p(d, e, p, y) {
        d.hasOwnProperty(e) || (d[e] = y.apply(null, p))
    }

    e = e ? e._modules : {};
    p(e, "parts/DataGrouping.js", [e["parts/Globals.js"]], function (d) {
        var e = d.addEvent, p = d.arrayMax, y = d.arrayMin, w = d.Axis, J = d.defaultPlotOptions,
            E = d.defined, K = d.extend, L = d.format, u = d.isNumber, F = d.merge, z = d.pick, M = d.Point,
            G = d.Series, N = d.Tooltip, h = d.approximations = {
                sum: function (a) {
                    var c = a.length, b;
                    if (!c && a.hasNulls) b = null; else if (c) for (b = 0; c--;) b += a[c];
                    return b
                }, average: function (a) {
                    var c = a.length;
                    a = h.sum(a);
                    u(a) && c && (a /= c);
                    return a
                }, averages: function () {
                    var a = [];
                    [].forEach.call(arguments, function (c) {
                        a.push(h.average(c))
                    });
                    return void 0 === a[0] ? void 0 : a
                }, open: function (a) {
                    return a.length ? a[0] : a.hasNulls ? null : void 0
                }, high: function (a) {
                    return a.length ?
                        p(a) : a.hasNulls ? null : void 0
                }, low: function (a) {
                    return a.length ? y(a) : a.hasNulls ? null : void 0
                }, close: function (a) {
                    return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0
                }, ohlc: function (a, c, b, t) {
                    a = h.open(a);
                    c = h.high(c);
                    b = h.low(b);
                    t = h.close(t);
                    if (u(a) || u(c) || u(b) || u(t)) return [a, c, b, t]
                }, range: function (a, c) {
                    a = h.low(a);
                    c = h.high(c);
                    if (u(a) || u(c)) return [a, c];
                    if (null === a && null === c) return null
                }
            }, H = function (a, c, b, t) {
                var f = this, d = f.data, e = f.options && f.options.data, r = [], l = [], x = [], m = a.length, g, B,
                    p = !!c, v = [], k = f.pointArrayMap,
                    w = k && k.length, A = ["x"].concat(k || ["y"]), C = 0, y = 0, z, q;
                t = "function" === typeof t ? t : h[t] ? h[t] : h[f.getDGApproximation && f.getDGApproximation() || "average"];
                w ? k.forEach(function () {
                    v.push([])
                }) : v.push([]);
                z = w || 1;
                for (q = 0; q <= m && !(a[q] >= b[0]); q++) ;
                for (q; q <= m; q++) {
                    for (; void 0 !== b[C + 1] && a[q] >= b[C + 1] || q === m;) {
                        g = b[C];
                        f.dataGroupInfo = {start: f.cropStart + y, length: v[0].length};
                        B = t.apply(f, v);
                        f.pointClass && !E(f.dataGroupInfo.options) && (f.dataGroupInfo.options = F(f.pointClass.prototype.optionsToObject.call({series: f}, f.options.data[f.cropStart +
                        y])), A.forEach(function (a) {
                            delete f.dataGroupInfo.options[a]
                        }));
                        void 0 !== B && (r.push(g), l.push(B), x.push(f.dataGroupInfo));
                        y = q;
                        for (g = 0; g < z; g++) v[g].length = 0, v[g].hasNulls = !1;
                        C += 1;
                        if (q === m) break
                    }
                    if (q === m) break;
                    if (k) {
                        g = f.cropStart + q;
                        B = d && d[g] || f.pointClass.prototype.applyOptions.apply({series: f}, [e[g]]);
                        var D;
                        for (g = 0; g < w; g++) D = B[k[g]], u(D) ? v[g].push(D) : null === D && (v[g].hasNulls = !0)
                    } else g = p ? c[q] : null, u(g) ? v[0].push(g) : null === g && (v[0].hasNulls = !0)
                }
                return {groupedXData: r, groupedYData: l, groupMap: x}
            }, O = {
                approximations: h,
                groupData: H
            }, k = G.prototype, P = k.processData, Q = k.generatePoints, A = {
                groupPixelWidth: 2, dateTimeLabelFormats: {
                    millisecond: ["%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L"],
                    second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"],
                    minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                    hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                    day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                    week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                    month: ["%B %Y", "%B", "-%B %Y"],
                    year: ["%Y", "%Y", "-%Y"]
                }
            }, I = {
                line: {},
                spline: {},
                area: {},
                areaspline: {},
                column: {groupPixelWidth: 10},
                columnrange: {groupPixelWidth: 10},
                candlestick: {groupPixelWidth: 10},
                ohlc: {groupPixelWidth: 5}
            },
            R = d.defaultDataGroupingUnits = [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1]], ["week", [1]], ["month", [1, 3, 6]], ["year", null]];
        k.getDGApproximation = function () {
            return d.seriesTypes.arearange && this instanceof d.seriesTypes.arearange ?
                "range" : d.seriesTypes.ohlc && this instanceof d.seriesTypes.ohlc ? "ohlc" : d.seriesTypes.column && this instanceof d.seriesTypes.column ? "sum" : "average"
        };
        k.groupData = H;
        k.processData = function () {
            var a = this.chart, c = this.options.dataGrouping,
                b = !1 !== this.allowDG && c && z(c.enabled, a.options.isStock),
                d = this.visible || !a.options.chart.ignoreHiddenSeries, f, e = this.currentDataGrouping, n, r = !1;
            this.forceCrop = b;
            this.groupPixelWidth = null;
            this.hasProcessed = !0;
            b && !this.requireSorting && (this.requireSorting = r = !0);
            b = !1 === P.apply(this,
                arguments) || !b;
            r && (this.requireSorting = !1);
            if (!b) {
                this.destroyGroupedData();
                var l, b = c.groupAll ? this.xData : this.processedXData,
                    x = c.groupAll ? this.yData : this.processedYData, m = a.plotSizeX, a = this.xAxis,
                    g = a.options.ordinal, h = this.groupPixelWidth = a.getGroupPixelWidth && a.getGroupPixelWidth();
                if (h) {
                    this.isDirty = f = !0;
                    this.points = null;
                    r = a.getExtremes();
                    n = r.min;
                    var r = r.max, g = g && a.getGroupIntervalFactor(n, r, this) || 1, h = h * (r - n) / m * g,
                        m = a.getTimeTicks(a.normalizeTimeTickInterval(h, c.units || R), Math.min(n, b[0]), Math.max(r,
                            b[b.length - 1]), a.options.startOfWeek, b, this.closestPointRange),
                        x = k.groupData.apply(this, [b, x, m, c.approximation]), b = x.groupedXData, g = x.groupedYData,
                        p = 0;
                    if (c.smoothed && b.length) {
                        l = b.length - 1;
                        for (b[l] = Math.min(b[l], r); l-- && 0 < l;) b[l] += h / 2;
                        b[0] = Math.max(b[0], n)
                    }
                    for (l = 1; l < m.length; l++) m.info.segmentStarts && -1 !== m.info.segmentStarts.indexOf(l) || (p = Math.max(m[l] - m[l - 1], p));
                    n = m.info;
                    n.gapSize = p;
                    this.closestPointRange = m.info.totalRange;
                    this.groupMap = x.groupMap;
                    if (E(b[0]) && b[0] < a.dataMin && d) {
                        if (!E(a.options.min) &&
                            a.min <= a.dataMin || a.min === a.dataMin) a.min = b[0];
                        a.dataMin = b[0]
                    }
                    c.groupAll && (c = this.cropData(b, g, a.min, a.max, 1), b = c.xData, g = c.yData);
                    this.processedXData = b;
                    this.processedYData = g
                } else this.groupMap = null;
                this.hasGroupedData = f;
                this.currentDataGrouping = n;
                this.preventGraphAnimation = (e && e.totalRange) !== (n && n.totalRange)
            }
        };
        k.destroyGroupedData = function () {
            var a = this.groupedData;
            (a || []).forEach(function (c, b) {
                c && (a[b] = c.destroy ? c.destroy() : null)
            });
            this.groupedData = null
        };
        k.generatePoints = function () {
            Q.apply(this);
            this.destroyGroupedData();
            this.groupedData = this.hasGroupedData ? this.points : null
        };
        e(M, "update", function () {
            if (this.dataGroup) return d.error(24, !1, this.series.chart), !1
        });
        e(N, "headerFormatter", function (a) {
            var c = this.chart.time, b = a.labelConfig, d = b.series, f = d.tooltipOptions, e = d.options.dataGrouping,
                n = f.xDateFormat, h, l = d.xAxis, k, m = f[(a.isFooter ? "footer" : "header") + "Format"];
            l && "datetime" === l.options.type && e && u(b.key) && (k = d.currentDataGrouping, e = e.dateTimeLabelFormats || A.dateTimeLabelFormats, k ? (f = e[k.unitName],
                1 === k.count ? n = f[0] : (n = f[1], h = f[2])) : !n && e && (n = this.getXDateFormat(b, f, l)), n = c.dateFormat(n, b.key), h && (n += c.dateFormat(h, b.key + k.totalRange - 1)), d.chart.styledMode && (m = this.styledModeFormat(m)), a.text = L(m, {
                point: K(b.point, {key: n}),
                series: d
            }, c), a.preventDefault())
        });
        e(G, "destroy", k.destroyGroupedData);
        e(G, "afterSetOptions", function (a) {
            a = a.options;
            var c = this.type, b = this.chart.options.plotOptions, d = J[c].dataGrouping,
                f = this.useCommonDataGrouping && A;
            if (I[c] || f) d || (d = F(A, I[c])), a.dataGrouping = F(f, d, b.series &&
                b.series.dataGrouping, b[c].dataGrouping, this.userOptions.dataGrouping)
        });
        e(w, "afterSetScale", function () {
            this.series.forEach(function (a) {
                a.hasProcessed = !1
            })
        });
        w.prototype.getGroupPixelWidth = function () {
            var a = this.series, c = a.length, b, d = 0, f = !1, e;
            for (b = c; b--;) (e = a[b].options.dataGrouping) && (d = Math.max(d, z(e.groupPixelWidth, A.groupPixelWidth)));
            for (b = c; b--;) (e = a[b].options.dataGrouping) && a[b].hasProcessed && (c = (a[b].processedXData || a[b].data).length, a[b].groupPixelWidth || c > this.chart.plotSizeX / d || c && e.forced) &&
            (f = !0);
            return f ? d : 0
        };
        w.prototype.setDataGrouping = function (a, c) {
            var b;
            c = z(c, !0);
            a || (a = {forced: !1, units: null});
            if (this instanceof w) for (b = this.series.length; b--;) this.series[b].update({dataGrouping: a}, !1); else this.chart.options.series.forEach(function (b) {
                b.dataGrouping = a
            }, !1);
            this.ordinalSlope = null;
            c && this.chart.redraw()
        };
        return d.dataGrouping = O
    });
    p(e, "masters/modules/datagrouping.src.js", [e["parts/DataGrouping.js"]], function (d) {
        return d
    })
});
//# sourceMappingURL=datagrouping.js.map
