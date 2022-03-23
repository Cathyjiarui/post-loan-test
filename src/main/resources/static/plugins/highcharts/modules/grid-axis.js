/*
 Highcharts JS v7.1.2 (2019-06-03)

 GridAxis

 (c) 2016-2019 Lars A. V. Cabrera

 License: www.highcharts.com/license
*/
(function (e) {
    "object" === typeof module && module.exports ? (e["default"] = e, module.exports = e) : "function" === typeof define && define.amd ? define("highcharts/modules/grid-axis", ["highcharts"], function (q) {
        e(q);
        e.Highcharts = q;
        return e
    }) : e("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (e) {
    function q(g, e, q, f) {
        g.hasOwnProperty(e) || (g[e] = f.apply(null, q))
    }

    e = e ? e._modules : {};
    q(e, "parts-gantt/GridAxis.js", [e["parts/Globals.js"]], function (g) {
        var e = g.addEvent, q = g.dateFormat, f = g.defined, y = g.isArray, t = g.isNumber,
            p = function (a) {
                return g.isObject(a, !0)
            }, u = g.merge, v = g.pick, z = g.wrap, B = g.Chart, h = g.Axis, C = g.Tick, D = function (a) {
                var b = a.options, c = b && p(b.grid) ? b.grid : {}, d = 25 / 11,
                    k = a.chart.renderer.fontMetrics(b.labels.style.fontSize);
                b.labels || (b.labels = {});
                b.labels.align = v(b.labels.align, "center");
                a.categories || (b.showLastLabel = !1);
                a.horiz && (b.tickLength = c.cellHeight || k.h * d);
                a.labelRotation = 0;
                b.labels.rotation = 0
            }, w = {top: 0, right: 1, bottom: 2, left: 3, 0: "top", 1: "right", 2: "bottom", 3: "left"};
        h.prototype.isNavigatorAxis = function () {
            return /highcharts-navigator-[xy]axis/.test(this.options.className)
        };
        h.prototype.isOuterAxis = function () {
            var a = this, b = -1, c = !0;
            a.chart.axes.forEach(function (d, k) {
                d.side !== a.side || d.isNavigatorAxis() || (d === a ? b = k : 0 <= b && k > b && (c = !1))
            });
            c && t(a.columnIndex) && (c = (a.linkedParent && a.linkedParent.columns || a.columns).length === a.columnIndex);
            return c
        };
        h.prototype.getMaxLabelDimensions = function (a, b) {
            var c = {width: 0, height: 0};
            b.forEach(function (b) {
                b = a[b];
                var d;
                p(b) && (d = p(b.label) ? b.label : {}, b = d.getBBox ? d.getBBox().height : 0, d.textStr && !t(d.textPxLength) && (d.textPxLength = d.getBBox().width),
                    d = t(d.textPxLength) ? d.textPxLength : 0, c.height = Math.max(b, c.height), c.width = Math.max(d, c.width))
            });
            return c
        };
        g.dateFormats.W = function (a) {
            a = new Date(a);
            var b;
            a.setHours(0, 0, 0, 0);
            a.setDate(a.getDate() - (a.getDay() || 7));
            b = new Date(a.getFullYear(), 0, 1);
            return Math.ceil(((a - b) / 864E5 + 1) / 7)
        };
        g.dateFormats.E = function (a) {
            return q("%a", a, !0).charAt(0)
        };
        e(C, "afterGetLabelPosition", function (a) {
            var b = this.label, c = this.axis, d = c.reversed, k = c.chart, l = c.options,
                e = l && p(l.grid) ? l.grid : {}, l = c.options.labels, x = l.align,
                m = w[c.side], n = a.tickmarkOffset, r = c.tickPositions, g = this.pos - n,
                r = t(r[a.index + 1]) ? r[a.index + 1] - n : c.max + n, h = c.tickSize("tick", !0), n = y(h) ? h[0] : 0,
                h = h && h[1] / 2, f;
            !0 === e.enabled && ("top" === m ? (e = c.top + c.offset, f = e - n) : "bottom" === m ? (f = k.chartHeight - c.bottom + c.offset, e = f + n) : (e = c.top + c.len - c.translate(d ? r : g), f = c.top + c.len - c.translate(d ? g : r)), "right" === m ? (m = k.chartWidth - c.right + c.offset, d = m + n) : "left" === m ? (d = c.left + c.offset, m = d - n) : (m = Math.round(c.left + c.translate(d ? r : g)) - h, d = Math.round(c.left + c.translate(d ? g : r)) -
                h), this.slotWidth = d - m, a.pos.x = "left" === x ? m : "right" === x ? d : m + (d - m) / 2, a.pos.y = f + (e - f) / 2, k = k.renderer.fontMetrics(l.style.fontSize, b.element), b = b.getBBox().height, l.useHTML ? a.pos.y += k.b + -(b / 2) : (b = Math.round(b / k.h), a.pos.y += (k.b - (k.h - k.f)) / 2 + -((b - 1) * k.h / 2)), a.pos.x += c.horiz && l.x || 0)
        });
        e(h, "afterTickSize", function (a) {
            var b = this.maxLabelDimensions, c = this.options;
            !0 === (c && p(c.grid) ? c.grid : {}).enabled && (c = 2 * Math.abs(this.defaultLeftAxisOptions.labels.x), b = c + (this.horiz ? b.height : b.width), y(a.tickSize) ? a.tickSize[0] =
                b : a.tickSize = [b])
        });
        e(h, "afterGetTitlePosition", function (a) {
            var b = this.options;
            if (!0 === (b && p(b.grid) ? b.grid : {}).enabled) {
                var c = this.axisTitle, d = c && c.getBBox().width, k = this.horiz, e = this.left, g = this.top,
                    x = this.width, m = this.height, n = b.title, b = this.opposite, r = this.offset,
                    h = this.tickSize() || [0], f = n.x || 0, q = n.y || 0, t = v(n.margin, k ? 5 : 10),
                    c = this.chart.renderer.fontMetrics(n.style && n.style.fontSize, c).f,
                    h = (k ? g + m : e) + h[0] / 2 * (b ? -1 : 1) * (k ? 1 : -1) + (this.side === w.bottom ? c : 0);
                a.titlePosition.x = k ? e - d / 2 - t + f : h + (b ? x : 0) + r +
                    f;
                a.titlePosition.y = k ? h - (b ? m : 0) + (b ? c : -c) / 2 + r + q : g - t + q
            }
        });
        z(h.prototype, "unsquish", function (a) {
            var b = this.options;
            return !0 === (b && p(b.grid) ? b.grid : {}).enabled && this.categories ? this.tickInterval : a.apply(this, Array.prototype.slice.call(arguments, 1))
        });
        e(h, "afterSetOptions", function (a) {
            var b = this.options;
            a = a.userOptions;
            var c, d = b && p(b.grid) ? b.grid : {};
            !0 === d.enabled && (c = u(!0, {
                className: "highcharts-grid-axis " + (a.className || ""),
                dateTimeLabelFormats: {
                    hour: {list: ["%H:%M", "%H"]}, day: {
                        list: ["%A, %e. %B", "%a, %e. %b",
                            "%E"]
                    }, week: {list: ["Week %W", "W%W"]}, month: {list: ["%B", "%b", "%o"]}
                },
                grid: {borderWidth: 1},
                labels: {padding: 2, style: {fontSize: "13px"}},
                margin: 0,
                title: {text: null, reserveSpace: !1, rotation: 0},
                units: [["millisecond", [1, 10, 100]], ["second", [1, 10]], ["minute", [1, 5, 15]], ["hour", [1, 6]], ["day", [1]], ["week", [1]], ["month", [1]], ["year", null]]
            }, a), "xAxis" === this.coll && (f(a.linkedTo) && !f(a.tickPixelInterval) && (c.tickPixelInterval = 350), f(a.tickPixelInterval) || !f(a.linkedTo) || f(a.tickPositioner) || f(a.tickInterval) || (c.tickPositioner =
                function (a, b) {
                    var d = this.linkedParent && this.linkedParent.tickPositions && this.linkedParent.tickPositions.info;
                    if (d) {
                        var e, k, h, l, f = c.units;
                        for (l = 0; l < f.length; l++) if (f[l][0] === d.unitName) {
                            e = l;
                            break
                        }
                        if (f[e][1]) return f[e + 1] && (h = f[e + 1][0], k = (f[e + 1][1] || [1])[0]), d = g.timeUnits[h], this.tickInterval = d * k, this.getTimeTicks({
                            unitRange: d,
                            count: k,
                            unitName: h
                        }, a, b, this.options.startOfWeek)
                    }
                })), u(!0, this.options, c), this.horiz && (b.minPadding = v(a.minPadding, 0), b.maxPadding = v(a.maxPadding, 0)), t(b.grid.borderWidth) &&
            (b.tickWidth = b.lineWidth = d.borderWidth))
        });
        e(h, "afterSetAxisTranslation", function () {
            var a = this.options, b = a && p(a.grid) ? a.grid : {}, c = this.tickPositions && this.tickPositions.info,
                d = this.userOptions.labels || {};
            this.horiz && (!0 === b.enabled && this.series.forEach(function (a) {
                a.options.pointRange = 0
            }), c && (!1 === a.dateTimeLabelFormats[c.unitName].range || 1 < c.count) && !f(d.align) && (a.labels.align = "left", f(d.x) || (a.labels.x = 3)))
        });
        e(h, "trimTicks", function () {
            var a = this.options, b = a && p(a.grid) ? a.grid : {}, c = this.categories,
                d = this.tickPositions, e = d[0], l = d[d.length - 1],
                g = this.linkedParent && this.linkedParent.min || this.min,
                h = this.linkedParent && this.linkedParent.max || this.max, f = this.tickInterval;
            !0 !== b.enabled || c || !this.horiz && !this.isLinked || (e < g && e + f > g && !a.startOnTick && (d[0] = g), l > h && l - f < h && !a.endOnTick && (d[d.length - 1] = h))
        });
        e(h, "afterRender", function () {
            var a = this.options, b = a && p(a.grid) ? a.grid : {}, c, d, e, g, h, f, m = this.chart.renderer,
                n = this.horiz;
            if (!0 === b.enabled) {
                b = 2 * Math.abs(this.defaultLeftAxisOptions.labels.x);
                this.maxLabelDimensions =
                    this.getMaxLabelDimensions(this.ticks, this.tickPositions);
                b = this.maxLabelDimensions.width + b;
                c = a.lineWidth;
                this.rightWall && this.rightWall.destroy();
                d = this.axisGroup.getBBox();
                if (this.isOuterAxis() && this.axisLine && (n && (b = d.height - 1), c)) {
                    d = this.getLinePath(c);
                    h = d.indexOf("M") + 1;
                    f = d.indexOf("L") + 1;
                    e = d.indexOf("M") + 2;
                    g = d.indexOf("L") + 2;
                    if (this.side === w.top || this.side === w.left) b = -b;
                    n ? (d[e] += b, d[g] += b) : (d[h] += b, d[f] += b);
                    this.axisLineExtra ? this.axisLineExtra.animate({d: d}) : this.axisLineExtra = m.path(d).attr({
                        stroke: a.lineColor,
                        "stroke-width": c, zIndex: 7
                    }).addClass("highcharts-axis-line").add(this.axisGroup);
                    this.axisLine[this.showAxis ? "show" : "hide"](!0)
                }
                (this.columns || []).forEach(function (a) {
                    a.render()
                })
            }
        });
        var A = {
            afterGetOffset: function () {
                (this.columns || []).forEach(function (a) {
                    a.getOffset()
                })
            }, afterInit: function () {
                var a = this.chart, b = this.userOptions, c = this.options, c = c && p(c.grid) ? c.grid : {};
                c.enabled && (D(this), z(this, "labelFormatter", function (a) {
                    var b = this.axis, c = b.tickPositions, d = this.value, e = (b.isLinked ? b.linkedParent :
                        b).series[0], f = d === c[0], c = d === c[c.length - 1],
                        e = e && g.find(e.options.data, function (a) {
                            return a[b.isXAxis ? "x" : "y"] === d
                        });
                    this.isFirst = f;
                    this.isLast = c;
                    this.point = e;
                    return a.call(this)
                }));
                if (c.columns) for (var d = this.columns = [], e = this.columnIndex = 0; ++e < c.columns.length;) {
                    var f = u(b, c.columns[c.columns.length - e - 1], {linkedTo: 0, type: "category"});
                    delete f.grid.columns;
                    f = new h(this.chart, f, !0);
                    f.isColumn = !0;
                    f.columnIndex = e;
                    g.erase(a.axes, f);
                    g.erase(a[this.coll], f);
                    d.push(f)
                }
            }, afterSetOptions: function (a) {
                a = (a =
                    a.userOptions) && p(a.grid) ? a.grid : {};
                var b = a.columns;
                a.enabled && b && u(!0, this.options, b[b.length - 1])
            }, afterSetScale: function () {
                (this.columns || []).forEach(function (a) {
                    a.setScale()
                })
            }, destroy: function (a) {
                (this.columns || []).forEach(function (b) {
                    b.destroy(a.keepEvents)
                })
            }, init: function (a) {
                var b = (a = a.userOptions) && p(a.grid) ? a.grid : {};
                b.enabled && f(b.borderColor) && (a.tickColor = a.lineColor = b.borderColor)
            }
        };
        Object.keys(A).forEach(function (a) {
            e(h, a, A[a])
        });
        e(B, "afterSetChartSize", function () {
            this.axes.forEach(function (a) {
                (a.columns ||
                    []).forEach(function (a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                })
            })
        })
    });
    q(e, "masters/modules/grid-axis.src.js", [], function () {
    })
});
//# sourceMappingURL=grid-axis.js.map
