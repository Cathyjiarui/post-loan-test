/*
 Highcharts JS v7.1.2 (2019-06-03)

 Gantt series

 (c) 2016-2019 Lars A. V. Cabrera

 License: www.highcharts.com/license
*/
(function (z) {
    "object" === typeof module && module.exports ? (z["default"] = z, module.exports = z) : "function" === typeof define && define.amd ? define("highcharts/modules/gantt", ["highcharts"], function (I) {
        z(I);
        z.Highcharts = I;
        return z
    }) : z("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (z) {
    function I(b, w, f, u) {
        b.hasOwnProperty(w) || (b[w] = u.apply(null, f))
    }

    z = z ? z._modules : {};
    I(z, "parts-gantt/CurrentDateIndicator.js", [z["parts/Globals.js"]], function (b) {
        var w = b.addEvent, f = b.PlotLineOrBand, u = b.merge, r = {
            currentDateIndicator: !0,
            color: "#ccd6eb",
            width: 2,
            label: {format: "%a, %b %d %Y, %H:%M", formatter: void 0, rotation: 0, style: {fontSize: "10px"}}
        };
        w(b.Axis, "afterSetOptions", function () {
            var b = this.options, f = b.currentDateIndicator;
            f && ("object" === typeof f ? (f.label && f.label.format && (f.label.formatter = void 0), f = u(r, f)) : f = u(r), f.value = new Date, b.plotLines || (b.plotLines = []), b.plotLines.push(f))
        });
        w(f, "render", function () {
            var f = this.options, u, m;
            f.currentDateIndicator && f.label && (u = f.label.format, m = f.label.formatter, f.value = new Date, f.label.text =
                "function" === typeof m ? m(this) : b.dateFormat(u, new Date), this.label && this.label.attr({text: f.label.text}))
        })
    });
    I(z, "parts-gantt/GridAxis.js", [z["parts/Globals.js"]], function (b) {
        var w = b.addEvent, f = b.dateFormat, u = b.defined, r = b.isArray, x = b.isNumber, A = function (c) {
            return b.isObject(c, !0)
        }, m = b.merge, H = b.pick, B = b.wrap, p = b.Chart, l = b.Axis, D = b.Tick, C = function (c) {
            var a = c.options, d = a && A(a.grid) ? a.grid : {}, e = 25 / 11,
                k = c.chart.renderer.fontMetrics(a.labels.style.fontSize);
            a.labels || (a.labels = {});
            a.labels.align = H(a.labels.align,
                "center");
            c.categories || (a.showLastLabel = !1);
            c.horiz && (a.tickLength = d.cellHeight || k.h * e);
            c.labelRotation = 0;
            a.labels.rotation = 0
        }, h = {top: 0, right: 1, bottom: 2, left: 3, 0: "top", 1: "right", 2: "bottom", 3: "left"};
        l.prototype.isNavigatorAxis = function () {
            return /highcharts-navigator-[xy]axis/.test(this.options.className)
        };
        l.prototype.isOuterAxis = function () {
            var c = this, a = -1, d = !0;
            c.chart.axes.forEach(function (e, k) {
                e.side !== c.side || e.isNavigatorAxis() || (e === c ? a = k : 0 <= a && k > a && (d = !1))
            });
            d && x(c.columnIndex) && (d = (c.linkedParent &&
                c.linkedParent.columns || c.columns).length === c.columnIndex);
            return d
        };
        l.prototype.getMaxLabelDimensions = function (c, a) {
            var d = {width: 0, height: 0};
            a.forEach(function (a) {
                a = c[a];
                var e;
                A(a) && (e = A(a.label) ? a.label : {}, a = e.getBBox ? e.getBBox().height : 0, e.textStr && !x(e.textPxLength) && (e.textPxLength = e.getBBox().width), e = x(e.textPxLength) ? e.textPxLength : 0, d.height = Math.max(a, d.height), d.width = Math.max(e, d.width))
            });
            return d
        };
        b.dateFormats.W = function (c) {
            c = new Date(c);
            var a;
            c.setHours(0, 0, 0, 0);
            c.setDate(c.getDate() -
                (c.getDay() || 7));
            a = new Date(c.getFullYear(), 0, 1);
            return Math.ceil(((c - a) / 864E5 + 1) / 7)
        };
        b.dateFormats.E = function (c) {
            return f("%a", c, !0).charAt(0)
        };
        w(D, "afterGetLabelPosition", function (c) {
            var a = this.label, d = this.axis, e = d.reversed, k = d.chart, b = d.options,
                g = b && A(b.grid) ? b.grid : {}, b = d.options.labels, n = b.align, q = h[d.side],
                y = c.tickmarkOffset, E = d.tickPositions, v = this.pos - y,
                E = x(E[c.index + 1]) ? E[c.index + 1] - y : d.max + y, J = d.tickSize("tick", !0), y = r(J) ? J[0] : 0,
                J = J && J[1] / 2, F;
            !0 === g.enabled && ("top" === q ? (g = d.top + d.offset,
                F = g - y) : "bottom" === q ? (F = k.chartHeight - d.bottom + d.offset, g = F + y) : (g = d.top + d.len - d.translate(e ? E : v), F = d.top + d.len - d.translate(e ? v : E)), "right" === q ? (q = k.chartWidth - d.right + d.offset, e = q + y) : "left" === q ? (e = d.left + d.offset, q = e - y) : (q = Math.round(d.left + d.translate(e ? E : v)) - J, e = Math.round(d.left + d.translate(e ? v : E)) - J), this.slotWidth = e - q, c.pos.x = "left" === n ? q : "right" === n ? e : q + (e - q) / 2, c.pos.y = F + (g - F) / 2, k = k.renderer.fontMetrics(b.style.fontSize, a.element), a = a.getBBox().height, b.useHTML ? c.pos.y += k.b + -(a / 2) : (a = Math.round(a /
                k.h), c.pos.y += (k.b - (k.h - k.f)) / 2 + -((a - 1) * k.h / 2)), c.pos.x += d.horiz && b.x || 0)
        });
        w(l, "afterTickSize", function (c) {
            var a = this.maxLabelDimensions, d = this.options;
            !0 === (d && A(d.grid) ? d.grid : {}).enabled && (d = 2 * Math.abs(this.defaultLeftAxisOptions.labels.x), a = d + (this.horiz ? a.height : a.width), r(c.tickSize) ? c.tickSize[0] = a : c.tickSize = [a])
        });
        w(l, "afterGetTitlePosition", function (c) {
            var a = this.options;
            if (!0 === (a && A(a.grid) ? a.grid : {}).enabled) {
                var d = this.axisTitle, e = d && d.getBBox().width, k = this.horiz, b = this.left, g = this.top,
                    n = this.width, q = this.height, y = a.title, a = this.opposite, E = this.offset,
                    v = this.tickSize() || [0], J = y.x || 0, F = y.y || 0, l = H(y.margin, k ? 5 : 10),
                    d = this.chart.renderer.fontMetrics(y.style && y.style.fontSize, d).f,
                    v = (k ? g + q : b) + v[0] / 2 * (a ? -1 : 1) * (k ? 1 : -1) + (this.side === h.bottom ? d : 0);
                c.titlePosition.x = k ? b - e / 2 - l + J : v + (a ? n : 0) + E + J;
                c.titlePosition.y = k ? v - (a ? q : 0) + (a ? d : -d) / 2 + E + F : g - l + F
            }
        });
        B(l.prototype, "unsquish", function (c) {
            var a = this.options;
            return !0 === (a && A(a.grid) ? a.grid : {}).enabled && this.categories ? this.tickInterval : c.apply(this,
                Array.prototype.slice.call(arguments, 1))
        });
        w(l, "afterSetOptions", function (c) {
            var a = this.options;
            c = c.userOptions;
            var d, e = a && A(a.grid) ? a.grid : {};
            !0 === e.enabled && (d = m(!0, {
                className: "highcharts-grid-axis " + (c.className || ""),
                dateTimeLabelFormats: {
                    hour: {list: ["%H:%M", "%H"]},
                    day: {list: ["%A, %e. %B", "%a, %e. %b", "%E"]},
                    week: {list: ["Week %W", "W%W"]},
                    month: {list: ["%B", "%b", "%o"]}
                },
                grid: {borderWidth: 1},
                labels: {padding: 2, style: {fontSize: "13px"}},
                margin: 0,
                title: {text: null, reserveSpace: !1, rotation: 0},
                units: [["millisecond",
                    [1, 10, 100]], ["second", [1, 10]], ["minute", [1, 5, 15]], ["hour", [1, 6]], ["day", [1]], ["week", [1]], ["month", [1]], ["year", null]]
            }, c), "xAxis" === this.coll && (u(c.linkedTo) && !u(c.tickPixelInterval) && (d.tickPixelInterval = 350), u(c.tickPixelInterval) || !u(c.linkedTo) || u(c.tickPositioner) || u(c.tickInterval) || (d.tickPositioner = function (a, c) {
                var g = this.linkedParent && this.linkedParent.tickPositions && this.linkedParent.tickPositions.info;
                if (g) {
                    var e, k, t, h, v = d.units;
                    for (h = 0; h < v.length; h++) if (v[h][0] === g.unitName) {
                        e = h;
                        break
                    }
                    if (v[e][1]) return v[e +
                    1] && (t = v[e + 1][0], k = (v[e + 1][1] || [1])[0]), g = b.timeUnits[t], this.tickInterval = g * k, this.getTimeTicks({
                        unitRange: g,
                        count: k,
                        unitName: t
                    }, a, c, this.options.startOfWeek)
                }
            })), m(!0, this.options, d), this.horiz && (a.minPadding = H(c.minPadding, 0), a.maxPadding = H(c.maxPadding, 0)), x(a.grid.borderWidth) && (a.tickWidth = a.lineWidth = e.borderWidth))
        });
        w(l, "afterSetAxisTranslation", function () {
            var a = this.options, t = a && A(a.grid) ? a.grid : {}, d = this.tickPositions && this.tickPositions.info,
                e = this.userOptions.labels || {};
            this.horiz && (!0 ===
            t.enabled && this.series.forEach(function (a) {
                a.options.pointRange = 0
            }), d && (!1 === a.dateTimeLabelFormats[d.unitName].range || 1 < d.count) && !u(e.align) && (a.labels.align = "left", u(e.x) || (a.labels.x = 3)))
        });
        w(l, "trimTicks", function () {
            var a = this.options, t = a && A(a.grid) ? a.grid : {}, d = this.categories, e = this.tickPositions,
                k = e[0], h = e[e.length - 1], g = this.linkedParent && this.linkedParent.min || this.min,
                n = this.linkedParent && this.linkedParent.max || this.max, q = this.tickInterval;
            !0 !== t.enabled || d || !this.horiz && !this.isLinked ||
            (k < g && k + q > g && !a.startOnTick && (e[0] = g), h > n && h - q < n && !a.endOnTick && (e[e.length - 1] = n))
        });
        w(l, "afterRender", function () {
            var a = this.options, t = a && A(a.grid) ? a.grid : {}, d, e, k, b, g, n, q = this.chart.renderer,
                y = this.horiz;
            if (!0 === t.enabled) {
                t = 2 * Math.abs(this.defaultLeftAxisOptions.labels.x);
                this.maxLabelDimensions = this.getMaxLabelDimensions(this.ticks, this.tickPositions);
                t = this.maxLabelDimensions.width + t;
                d = a.lineWidth;
                this.rightWall && this.rightWall.destroy();
                e = this.axisGroup.getBBox();
                if (this.isOuterAxis() && this.axisLine &&
                    (y && (t = e.height - 1), d)) {
                    e = this.getLinePath(d);
                    g = e.indexOf("M") + 1;
                    n = e.indexOf("L") + 1;
                    k = e.indexOf("M") + 2;
                    b = e.indexOf("L") + 2;
                    if (this.side === h.top || this.side === h.left) t = -t;
                    y ? (e[k] += t, e[b] += t) : (e[g] += t, e[n] += t);
                    this.axisLineExtra ? this.axisLineExtra.animate({d: e}) : this.axisLineExtra = q.path(e).attr({
                        stroke: a.lineColor,
                        "stroke-width": d,
                        zIndex: 7
                    }).addClass("highcharts-axis-line").add(this.axisGroup);
                    this.axisLine[this.showAxis ? "show" : "hide"](!0)
                }
                (this.columns || []).forEach(function (a) {
                    a.render()
                })
            }
        });
        var a =
            {
                afterGetOffset: function () {
                    (this.columns || []).forEach(function (a) {
                        a.getOffset()
                    })
                }, afterInit: function () {
                    var a = this.chart, t = this.userOptions, d = this.options, d = d && A(d.grid) ? d.grid : {};
                    d.enabled && (C(this), B(this, "labelFormatter", function (a) {
                        var c = this.axis, g = c.tickPositions, d = this.value,
                            e = (c.isLinked ? c.linkedParent : c).series[0], k = d === g[0], g = d === g[g.length - 1],
                            e = e && b.find(e.options.data, function (a) {
                                return a[c.isXAxis ? "x" : "y"] === d
                            });
                        this.isFirst = k;
                        this.isLast = g;
                        this.point = e;
                        return a.call(this)
                    }));
                    if (d.columns) for (var e =
                        this.columns = [], k = this.columnIndex = 0; ++k < d.columns.length;) {
                        var h = m(t, d.columns[d.columns.length - k - 1], {linkedTo: 0, type: "category"});
                        delete h.grid.columns;
                        h = new l(this.chart, h, !0);
                        h.isColumn = !0;
                        h.columnIndex = k;
                        b.erase(a.axes, h);
                        b.erase(a[this.coll], h);
                        e.push(h)
                    }
                }, afterSetOptions: function (a) {
                    a = (a = a.userOptions) && A(a.grid) ? a.grid : {};
                    var c = a.columns;
                    a.enabled && c && m(!0, this.options, c[c.length - 1])
                }, afterSetScale: function () {
                    (this.columns || []).forEach(function (a) {
                        a.setScale()
                    })
                }, destroy: function (a) {
                    (this.columns ||
                        []).forEach(function (c) {
                        c.destroy(a.keepEvents)
                    })
                }, init: function (a) {
                    var c = (a = a.userOptions) && A(a.grid) ? a.grid : {};
                    c.enabled && u(c.borderColor) && (a.tickColor = a.lineColor = c.borderColor)
                }
            };
        Object.keys(a).forEach(function (c) {
            w(l, c, a[c])
        });
        w(p, "afterSetChartSize", function () {
            this.axes.forEach(function (a) {
                (a.columns || []).forEach(function (a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                })
            })
        })
    });
    I(z, "modules/static-scale.src.js", [z["parts/Globals.js"]], function (b) {
        var w = b.Chart, f = b.pick;
        b.addEvent(b.Axis, "afterSetOptions",
            function () {
                var f = this.chart.options && this.chart.options.chart;
                !this.horiz && b.isNumber(this.options.staticScale) && (!f.height || f.scrollablePlotArea && f.scrollablePlotArea.minHeight) && (this.staticScale = this.options.staticScale)
            });
        w.prototype.adjustHeight = function () {
            "adjustHeight" !== this.redrawTrigger && ((this.axes || []).forEach(function (u) {
                var r = u.chart, w = !!r.initiatedScale && r.options.animation, A = u.options.staticScale, m;
                u.staticScale && b.defined(u.min) && (m = f(u.unitLength, u.max + u.tickInterval - u.min) * A, m =
                    Math.max(m, A), A = m - r.plotHeight, 1 <= Math.abs(A) && (r.plotHeight = m, r.redrawTrigger = "adjustHeight", r.setSize(void 0, r.chartHeight + A, w)), u.series.forEach(function (b) {
                    (b = b.sharedClipKey && r[b.sharedClipKey]) && b.attr({height: r.plotHeight})
                }))
            }), this.initiatedScale = !0);
            this.redrawTrigger = null
        };
        b.addEvent(w, "render", w.prototype.adjustHeight)
    });
    I(z, "parts-gantt/Tree.js", [z["parts/Globals.js"]], function (b) {
        var w = b.extend, f = b.isNumber, u = b.pick, r = function (b, m) {
            var f = b.reduce(function (b, p) {
                var l = u(p.parent, "");
                void 0 ===
                b[l] && (b[l] = []);
                b[l].push(p);
                return b
            }, {});
            Object.keys(f).forEach(function (b, p) {
                var l = f[b];
                "" !== b && -1 === m.indexOf(b) && (l.forEach(function (b) {
                    p[""].push(b)
                }), delete p[b])
            });
            return f
        }, x = function (b, m, r, B, p, l) {
            var D = 0, C = 0, h = l && l.after, a = l && l.before;
            m = {data: B, depth: r - 1, id: b, level: r, parent: m};
            var c, t;
            "function" === typeof a && a(m, l);
            a = (p[b] || []).map(function (a) {
                var d = x(a.id, b, r + 1, a, p, l), k = a.start;
                a = !0 === a.milestone ? k : a.end;
                c = !f(c) || k < c ? k : c;
                t = !f(t) || a > t ? a : t;
                D = D + 1 + d.descendants;
                C = Math.max(d.height + 1, C);
                return d
            });
            B && (B.start = u(B.start, c), B.end = u(B.end, t));
            w(m, {children: a, descendants: D, height: C});
            "function" === typeof h && h(m, l);
            return m
        };
        return {
            getListOfParents: r, getNode: x, getTree: function (b, m) {
                var f = b.map(function (b) {
                    return b.id
                });
                b = r(b, f);
                return x("", null, 1, null, b, m)
            }
        }
    });
    I(z, "mixins/tree-series.js", [z["parts/Globals.js"]], function (b) {
        var w = b.extend, f = b.isArray, u = b.isObject, r = b.isNumber, x = b.merge, A = b.pick;
        return {
            getColor: function (m, f) {
                var B = f.index, p = f.mapOptionsToLevel, l = f.parentColor, D = f.parentColorIndex,
                    C = f.series, h = f.colors, a = f.siblings, c = C.points, t = C.chart.options.chart, d, e, k, G;
                if (m) {
                    c = c[m.i];
                    m = p[m.level] || {};
                    if (p = c && m.colorByPoint) e = c.index % (h ? h.length : t.colorCount), d = h && h[e];
                    if (!C.chart.styledMode) {
                        h = c && c.options.color;
                        t = m && m.color;
                        if (k = l) k = (k = m && m.colorVariation) && "brightness" === k.key ? b.color(l).brighten(B / a * k.to).get() : l;
                        k = A(h, t, d, k, C.color)
                    }
                    G = A(c && c.options.colorIndex, m && m.colorIndex, e, D, f.colorIndex)
                }
                return {color: k, colorIndex: G}
            }, getLevelOptions: function (b) {
                var m = null, B, p, l, D;
                if (u(b)) for (m =
                                   {}, l = r(b.from) ? b.from : 1, D = b.levels, p = {}, B = u(b.defaults) ? b.defaults : {}, f(D) && (p = D.reduce(function (b, h) {
                    var a, c;
                    u(h) && r(h.level) && (c = x({}, h), a = "boolean" === typeof c.levelIsConstant ? c.levelIsConstant : B.levelIsConstant, delete c.levelIsConstant, delete c.level, h = h.level + (a ? 0 : l - 1), u(b[h]) ? w(b[h], c) : b[h] = c);
                    return b
                }, {})), D = r(b.to) ? b.to : 1, b = 0; b <= D; b++) m[b] = x({}, B, u(p[b]) ? p[b] : {});
                return m
            }, setTreeValues: function H(b, p) {
                var l = p.before, f = p.idRoot, B = p.mapIdToNode[f], h = p.points[b.i], a = h && h.options || {},
                    c = 0, t = [];
                w(b, {
                    levelDynamic: b.level - (("boolean" === typeof p.levelIsConstant ? p.levelIsConstant : 1) ? 0 : B.level),
                    name: A(h && h.name, ""),
                    visible: f === b.id || ("boolean" === typeof p.visible ? p.visible : !1)
                });
                "function" === typeof l && (b = l(b, p));
                b.children.forEach(function (a, e) {
                    var d = w({}, p);
                    w(d, {index: e, siblings: b.children.length, visible: b.visible});
                    a = H(a, d);
                    t.push(a);
                    a.visible && (c += a.val)
                });
                b.visible = 0 < c || b.visible;
                l = A(a.value, c);
                w(b, {children: t, childrenTotal: c, isLeaf: b.visible && !c, val: l});
                return b
            }, updateRootId: function (b) {
                var f;
                u(b) && (f = u(b.options) ? b.options : {}, f = A(b.rootNode, f.rootId, ""), u(b.userOptions) && (b.userOptions.rootId = f), b.rootNode = f);
                return f
            }
        }
    });
    I(z, "modules/broken-axis.src.js", [z["parts/Globals.js"]], function (b) {
        var w = b.addEvent, f = b.pick, u = b.extend, r = b.isArray, x = b.find, A = b.fireEvent, m = b.Axis,
            H = b.Series, B = function (b, l) {
                return x(l, function (l) {
                    return l.from < b && b < l.to
                })
            };
        u(m.prototype, {
            isInBreak: function (b, l) {
                var f = b.repeat || Infinity, p = b.from, h = b.to - b.from;
                l = l >= p ? (l - p) % f : f - (p - l) % f;
                return b.inclusive ? l <= h : l < h &&
                    0 !== l
            }, isInAnyBreak: function (b, l) {
                var p = this.options.breaks, m = p && p.length, h, a, c;
                if (m) {
                    for (; m--;) this.isInBreak(p[m], b) && (h = !0, a || (a = f(p[m].showPoints, !this.isXAxis)));
                    c = h && l ? h && !a : h
                }
                return c
            }
        });
        w(m, "afterInit", function () {
            "function" === typeof this.setBreaks && this.setBreaks(this.options.breaks, !1)
        });
        w(m, "afterSetTickPositions", function () {
            if (this.isBroken) {
                var b = this.tickPositions, l = this.tickPositions.info, f = [], m;
                for (m = 0; m < b.length; m++) this.isInAnyBreak(b[m]) || f.push(b[m]);
                this.tickPositions = f;
                this.tickPositions.info =
                    l
            }
        });
        w(m, "afterSetOptions", function () {
            this.isBroken && (this.options.ordinal = !1)
        });
        m.prototype.setBreaks = function (b, l) {
            function p(a) {
                var c = a, d, e;
                for (e = 0; e < h.breakArray.length; e++) if (d = h.breakArray[e], d.to <= a) c -= d.len; else if (d.from >= a) break; else if (h.isInBreak(d, a)) {
                    c -= a - d.from;
                    break
                }
                return c
            }

            function C(a) {
                var c, d;
                for (d = 0; d < h.breakArray.length && !(c = h.breakArray[d], c.from >= a); d++) c.to < a ? a += c.len : h.isInBreak(c, a) && (a += c.len);
                return a
            }

            var h = this, a = r(b) && !!b.length;
            h.isDirty = h.isBroken !== a;
            h.isBroken = a;
            h.options.breaks = h.userOptions.breaks = b;
            h.forceRedraw = !0;
            a || h.val2lin !== p || (delete h.val2lin, delete h.lin2val);
            a && (h.userOptions.ordinal = !1, h.val2lin = p, h.lin2val = C, h.setExtremes = function (a, b, d, e, k) {
                if (this.isBroken) {
                    for (var c, g = this.options.breaks; c = B(a, g);) a = c.to;
                    for (; c = B(b, g);) b = c.from;
                    b < a && (b = a)
                }
                m.prototype.setExtremes.call(this, a, b, d, e, k)
            }, h.setAxisTranslation = function (a) {
                m.prototype.setAxisTranslation.call(this, a);
                this.unitLength = null;
                if (this.isBroken) {
                    a = h.options.breaks;
                    var c = [], d = [], e = 0, b,
                        G, g = h.userMin || h.min, n = h.userMax || h.max, q = f(h.pointRangePadding, 0), y, E;
                    a.forEach(function (a) {
                        G = a.repeat || Infinity;
                        h.isInBreak(a, g) && (g += a.to % G - g % G);
                        h.isInBreak(a, n) && (n -= n % G - a.from % G)
                    });
                    a.forEach(function (a) {
                        y = a.from;
                        for (G = a.repeat || Infinity; y - G > g;) y -= G;
                        for (; y < g;) y += G;
                        for (E = y; E < n; E += G) c.push({value: E, move: "in"}), c.push({
                            value: E + (a.to - a.from),
                            move: "out",
                            size: a.breakSize
                        })
                    });
                    c.sort(function (a, g) {
                        return a.value === g.value ? ("in" === a.move ? 0 : 1) - ("in" === g.move ? 0 : 1) : a.value - g.value
                    });
                    b = 0;
                    y = g;
                    c.forEach(function (a) {
                        b +=
                            "in" === a.move ? 1 : -1;
                        1 === b && "in" === a.move && (y = a.value);
                        0 === b && (d.push({
                            from: y,
                            to: a.value,
                            len: a.value - y - (a.size || 0)
                        }), e += a.value - y - (a.size || 0))
                    });
                    h.breakArray = d;
                    h.unitLength = n - g - e + q;
                    A(h, "afterBreaks");
                    h.staticScale ? h.transA = h.staticScale : h.unitLength && (h.transA *= (n - h.min + q) / h.unitLength);
                    q && (h.minPixelPadding = h.transA * h.minPointOffset);
                    h.min = g;
                    h.max = n
                }
            });
            f(l, !0) && this.chart.redraw()
        };
        w(H, "afterGeneratePoints", function () {
            var b = this.xAxis, l = this.yAxis, f = this.points, m, h = f.length, a = this.options.connectNulls,
                c;
            if (b && l && (b.options.breaks || l.options.breaks)) for (; h--;) m = f[h], c = null === m.y && !1 === a, c || !b.isInAnyBreak(m.x, !0) && !l.isInAnyBreak(m.y, !0) || (f.splice(h, 1), this.data[h] && this.data[h].destroyElements())
        });
        w(H, "afterRender", function () {
            this.drawBreaks(this.xAxis, ["x"]);
            this.drawBreaks(this.yAxis, f(this.pointArrayMap, ["y"]))
        });
        b.Series.prototype.drawBreaks = function (b, l) {
            var m = this, p = m.points, h, a, c, t;
            b && l.forEach(function (d) {
                h = b.breakArray || [];
                a = b.isXAxis ? b.min : f(m.options.threshold, b.min);
                p.forEach(function (e) {
                    t =
                        f(e["stack" + d.toUpperCase()], e[d]);
                    h.forEach(function (d) {
                        c = !1;
                        if (a < d.from && t > d.to || a > d.from && t < d.from) c = "pointBreak"; else if (a < d.from && t > d.from && t < d.to || a > d.from && t > d.to && t < d.from) c = "pointInBreak";
                        c && A(b, c, {point: e, brk: d})
                    })
                })
            })
        };
        b.Series.prototype.gappedPath = function () {
            var f = this.currentDataGrouping, l = f && f.gapSize, f = this.options.gapSize, m = this.points.slice(),
                B = m.length - 1, h = this.yAxis;
            if (f && 0 < B) for ("value" !== this.options.gapUnit && (f *= this.closestPointRange), l && l > f && (f = l); B--;) m[B + 1].x - m[B].x > f && (l =
                (m[B].x + m[B + 1].x) / 2, m.splice(B + 1, 0, {
                isNull: !0,
                x: l
            }), this.options.stacking && (l = h.stacks[this.stackKey][l] = new b.StackItem(h, h.options.stackLabels, !1, l, this.stack), l.total = 0));
            return this.getGraphPath(m)
        }
    });
    I(z, "parts-gantt/TreeGrid.js", [z["parts/Globals.js"], z["parts-gantt/Tree.js"], z["mixins/tree-series.js"]], function (b, w, f) {
        var u = b.addEvent, r = function (a) {
                return Array.prototype.slice.call(a, 1)
            }, x = b.defined, A = b.extend, m = b.find, H = b.fireEvent, B = f.getLevelOptions, p = b.merge, l = b.isNumber,
            D = function (a) {
                return b.isObject(a,
                    !0)
            }, C = b.isString, h = b.pick, a = b.wrap;
        f = b.Axis;
        var c = b.Tick, t = function (g, c) {
                var d, b;
                for (d in c) c.hasOwnProperty(d) && (b = c[d], a(g, d, b))
            }, d = function (a, g) {
                var c = a.collapseStart;
                a = a.collapseEnd;
                a >= g && (c -= .5);
                return {from: c, to: a, showPoints: !1}
            }, e = function (a) {
                return Object.keys(a.mapOfPosToGridNode).reduce(function (g, c) {
                    c = +c;
                    a.min <= c && a.max >= c && !a.isInAnyBreak(c) && g.push(c);
                    return g
                }, [])
            }, k = function (a, c) {
                var g = a.options.breaks || [], b = d(c, a.max);
                return g.some(function (a) {
                    return a.from === b.from && a.to === b.to
                })
            },
            G = function (a, c) {
                var g = a.options.breaks || [];
                a = d(c, a.max);
                g.push(a);
                return g
            }, g = function (a, c) {
                var g = a.options.breaks || [], b = d(c, a.max);
                return g.reduce(function (a, c) {
                    c.to === b.to && c.from === b.from || a.push(c);
                    return a
                }, [])
            }, n = function (a, c) {
                var g = a.labelIcon, d = !g, e = c.renderer, n = c.xy, k = c.options, q = k.width, v = k.height,
                    t = n.x - q / 2 - k.padding, n = n.y - v / 2, E = c.collapsed ? 90 : 180, y = c.show && b.isNumber(n);
                d && (a.labelIcon = g = e.path(e.symbols[k.type](k.x, k.y, q, v)).addClass("highcharts-label-icon").add(c.group));
                y || g.attr({y: -9999});
                e.styledMode || g.attr({"stroke-width": 1, fill: h(c.color, "#666666")}).css({
                    cursor: "pointer",
                    stroke: k.lineColor,
                    strokeWidth: k.lineWidth
                });
                g[d ? "attr" : "animate"]({translateX: t, translateY: n, rotation: E})
            }, q = function (a, c, g) {
                var d = [], b = [], e = {}, n = {}, k = -1, h = "boolean" === typeof c ? c : !1;
                a = w.getTree(a, {
                    after: function (a) {
                        a = n[a.pos];
                        var c = 0, g = 0;
                        a.children.forEach(function (a) {
                            g += a.descendants + 1;
                            c = Math.max(a.height + 1, c)
                        });
                        a.descendants = g;
                        a.height = c;
                        a.collapsed && b.push(a)
                    }, before: function (a) {
                        var c = D(a.data) ? a.data : {},
                            g = C(c.name) ? c.name : "", b = e[a.parent], b = D(b) ? n[b.pos] : null, q = function (a) {
                                return a.name === g
                            }, v;
                        h && D(b) && (v = m(b.children, q)) ? (q = v.pos, v.nodes.push(a)) : q = k++;
                        n[q] || (n[q] = v = {
                            depth: b ? b.depth + 1 : 0,
                            name: g,
                            nodes: [a],
                            children: [],
                            pos: q
                        }, -1 !== q && d.push(g), D(b) && b.children.push(v));
                        C(a.id) && (e[a.id] = a);
                        !0 === c.collapsed && (v.collapsed = !0);
                        a.pos = q
                    }
                });
                n = function (a, c) {
                    var g = function (a, d, b) {
                        var e = d + (-1 === d ? 0 : c - 1), n = (e - d) / 2, k = d + n;
                        a.nodes.forEach(function (a) {
                            var c = a.data;
                            D(c) && (c.y = d + c.seriesIndex, delete c.seriesIndex);
                            a.pos = k
                        });
                        b[k] = a;
                        a.pos = k;
                        a.tickmarkOffset = n + .5;
                        a.collapseStart = e + .5;
                        a.children.forEach(function (a) {
                            g(a, e + 1, b);
                            e = a.collapseEnd - .5
                        });
                        a.collapseEnd = e + .5;
                        return b
                    };
                    return g(a["-1"], -1, {})
                }(n, g);
                return {categories: d, mapOfIdToNode: e, mapOfPosToGridNode: n, collapsedNodes: b, tree: a}
            }, y = function (a) {
                a.target.axes.filter(function (a) {
                    return "treegrid" === a.options.type
                }).forEach(function (c) {
                    var g = c.options || {}, d = g.labels, e, n = g.uniqueNames, k = 0, h;
                    c.series.some(function (a) {
                        return !a.hasRendered || a.isDirtyData || a.isDirty
                    }) &&
                    (g = c.series.reduce(function (a, c) {
                        c.visible && (c.options.data.forEach(function (c) {
                            D(c) && (c.seriesIndex = k, a.push(c))
                        }), !0 === n && k++);
                        return a
                    }, []), h = q(g, n, !0 === n ? k : 1), c.categories = h.categories, c.mapOfPosToGridNode = h.mapOfPosToGridNode, c.hasNames = !0, c.tree = h.tree, c.series.forEach(function (a) {
                        var c = a.options.data.map(function (a) {
                            return D(a) ? p(a) : a
                        });
                        a.visible && a.setData(c, !1)
                    }), c.mapOptionsToLevel = B({
                        defaults: d,
                        from: 1,
                        levels: d.levels,
                        to: c.tree.height
                    }), "beforeRender" === a.type && (e = b.addEvent(c, "foundExtremes",
                        function () {
                            h.collapsedNodes.forEach(function (a) {
                                a = G(c, a);
                                c.setBreaks(a, !1)
                            });
                            e()
                        })))
                })
            };
        t(f.prototype, {
            init: function (a, c, g) {
                var d = "treegrid" === g.type;
                d && (u(c, "beforeRender", y), u(c, "beforeRedraw", y), g = p({
                    grid: {enabled: !0},
                    labels: {
                        align: "left",
                        levels: [{level: void 0}, {level: 1, style: {fontWeight: "bold"}}],
                        symbol: {type: "triangle", x: -5, y: -5, height: 10, width: 10, padding: 5}
                    },
                    uniqueNames: !1
                }, g, {reversed: !0, grid: {columns: void 0}}));
                a.apply(this, [c, g]);
                d && (this.hasNames = !0, this.options.showLastLabel = !0)
            }, getMaxLabelDimensions: function (a) {
                var c =
                        this.options, g = c && c.labels, c = g && l(g.indentation) ? c.labels.indentation : 0,
                    g = a.apply(this, r(arguments)), d;
                "treegrid" === this.options.type && this.mapOfPosToGridNode && (d = this.mapOfPosToGridNode[-1].height, g.width += c * (d - 1));
                return g
            }, generateTick: function (a, g) {
                var d = D(this.mapOptionsToLevel) ? this.mapOptionsToLevel : {}, b = this.ticks, e = b[g], n, k;
                "treegrid" === this.options.type ? (k = this.mapOfPosToGridNode[g], (d = d[k.depth]) && (n = {labels: d}), e ? (e.parameters.category = k.name, e.options = n, e.addLabel()) : b[g] = new c(this,
                    g, null, void 0, {
                        category: k.name,
                        tickmarkOffset: k.tickmarkOffset,
                        options: n
                    })) : a.apply(this, r(arguments))
            }, setTickInterval: function (a) {
                var c = this.options;
                "treegrid" === c.type ? (this.min = h(this.userMin, c.min, this.dataMin), this.max = h(this.userMax, c.max, this.dataMax), H(this, "foundExtremes"), this.setAxisTranslation(!0), this.tickmarkOffset = .5, this.tickInterval = 1, this.tickPositions = this.mapOfPosToGridNode ? e(this) : []) : a.apply(this, r(arguments))
            }
        });
        t(c.prototype, {
            getLabelPosition: function (a, c, g, d, b, e, n, k, q) {
                var t =
                    h(this.options && this.options.labels, e);
                e = this.pos;
                var v = this.axis, y = "treegrid" === v.options.type;
                a = a.apply(this, [c, g, d, b, t, n, k, q]);
                y && (c = t && D(t.symbol) ? t.symbol : {}, t = t && l(t.indentation) ? t.indentation : 0, e = (e = (v = v.mapOfPosToGridNode) && v[e]) && e.depth || 1, a.x += c.width + 2 * c.padding + (e - 1) * t);
                return a
            }, renderLabel: function (a) {
                var c = this, g = c.pos, d = c.axis, e = c.label, q = d.mapOfPosToGridNode, t = d.options,
                    y = h(c.options && c.options.labels, t && t.labels), E = y && D(y.symbol) ? y.symbol : {},
                    G = (q = q && q[g]) && q.depth, t = "treegrid" ===
                    t.type, f = !(!e || !e.element), l = -1 < d.tickPositions.indexOf(g), g = d.chart.styledMode;
                t && q && f && e.addClass("highcharts-treegrid-node-level-" + G);
                a.apply(c, r(arguments));
                t && q && f && 0 < q.descendants && (d = k(d, q), n(c, {
                    color: !g && e.styles.color,
                    collapsed: d,
                    group: e.parentGroup,
                    options: E,
                    renderer: e.renderer,
                    show: l,
                    xy: e.xy
                }), E = "highcharts-treegrid-node-" + (d ? "expanded" : "collapsed"), e.addClass("highcharts-treegrid-node-" + (d ? "collapsed" : "expanded")).removeClass(E), g || e.css({cursor: "pointer"}), [e, c.labelIcon].forEach(function (a) {
                    a.attachedTreeGridEvents ||
                    (b.addEvent(a.element, "mouseover", function () {
                        var a = e;
                        a.addClass("highcharts-treegrid-node-active");
                        a.renderer.styledMode || a.css({textDecoration: "underline"})
                    }), b.addEvent(a.element, "mouseout", function () {
                        var a = e, c = y, c = x(c.style) ? c.style : {};
                        a.removeClass("highcharts-treegrid-node-active");
                        a.renderer.styledMode || a.css({textDecoration: c.textDecoration})
                    }), b.addEvent(a.element, "click", function () {
                        c.toggleCollapse()
                    }), a.attachedTreeGridEvents = !0)
                }))
            }
        });
        A(c.prototype, {
            collapse: function (a) {
                var c = this.axis,
                    g = G(c, c.mapOfPosToGridNode[this.pos]);
                c.setBreaks(g, h(a, !0))
            }, expand: function (a) {
                var c = this.axis, d = g(c, c.mapOfPosToGridNode[this.pos]);
                c.setBreaks(d, h(a, !0))
            }, toggleCollapse: function (a) {
                var c = this.axis, d;
                d = c.mapOfPosToGridNode[this.pos];
                d = k(c, d) ? g(c, d) : G(c, d);
                c.setBreaks(d, h(a, !0))
            }
        });
        f.prototype.utils = {getNode: w.getNode}
    });
    I(z, "parts-gantt/PathfinderAlgorithms.js", [z["parts/Globals.js"]], function (b) {
        function w(b, f, l) {
            l = l || 0;
            var m = b.length - 1;
            f -= 1e-7;
            for (var p, h; l <= m;) if (p = m + l >> 1, h = f - b[p].xMin, 0 < h) l =
                p + 1; else if (0 > h) m = p - 1; else return p;
            return 0 < l ? l - 1 : 0
        }

        function f(b, f) {
            for (var l = w(b, f.x + 1) + 1; l--;) {
                var m;
                if (m = b[l].xMax >= f.x) m = b[l], m = f.x <= m.xMax && f.x >= m.xMin && f.y <= m.yMax && f.y >= m.yMin;
                if (m) return l
            }
            return -1
        }

        function u(b) {
            var f = [];
            if (b.length) {
                f.push("M", b[0].start.x, b[0].start.y);
                for (var m = 0; m < b.length; ++m) f.push("L", b[m].end.x, b[m].end.y)
            }
            return f
        }

        function r(b, f) {
            b.yMin = A(b.yMin, f.yMin);
            b.yMax = x(b.yMax, f.yMax);
            b.xMin = A(b.xMin, f.xMin);
            b.xMax = x(b.xMax, f.xMax)
        }

        var x = Math.min, A = Math.max, m = Math.abs, H =
            b.pick;
        return {
            straight: function (b, f) {
                return {path: ["M", b.x, b.y, "L", f.x, f.y], obstacles: [{start: b, end: f}]}
            }, simpleConnect: b.extend(function (b, p, l) {
                function r(a, c, g, d, b) {
                    a = {x: a.x, y: a.y};
                    a[c] = g[d || c] + (b || 0);
                    return a
                }

                function w(a, c, g) {
                    var d = m(c[g] - a[g + "Min"]) > m(c[g] - a[g + "Max"]);
                    return r(c, g, a, g + (d ? "Max" : "Min"), d ? 1 : -1)
                }

                var h = [], a, c = H(l.startDirectionX, m(p.x - b.x) > m(p.y - b.y)) ? "x" : "y", t = l.chartObstacles,
                    d = f(t, b);
                l = f(t, p);
                var e;
                -1 < l ? (a = t[l], l = w(a, p, c), a = {start: l, end: p}, e = l) : e = p;
                -1 < d && (t = t[d], l = w(t, b, c), h.push({
                    start: b,
                    end: l
                }), l[c] >= b[c] === l[c] >= e[c] && (c = "y" === c ? "x" : "y", p = b[c] < p[c], h.push({
                    start: l,
                    end: r(l, c, t, c + (p ? "Max" : "Min"), p ? 1 : -1)
                }), c = "y" === c ? "x" : "y"));
                b = h.length ? h[h.length - 1].end : b;
                l = r(b, c, e);
                h.push({start: b, end: l});
                c = r(l, "y" === c ? "x" : "y", e);
                h.push({start: l, end: c});
                h.push(a);
                return {path: u(h), obstacles: h}
            }, {requiresObstacles: !0}), fastAvoid: b.extend(function (b, p, l) {
                function B(a, c, g) {
                    var d, b, e, n, k, q = a.x < c.x ? 1 : -1;
                    a.x < c.x ? (d = a, b = c) : (d = c, b = a);
                    a.y < c.y ? (n = a, e = c) : (n = c, e = a);
                    for (k = 0 > q ? x(w(v, b.x), v.length - 1) : 0; v[k] && (0 <
                        q && v[k].xMin <= b.x || 0 > q && v[k].xMax >= d.x);) {
                        if (v[k].xMin <= b.x && v[k].xMax >= d.x && v[k].yMin <= e.y && v[k].yMax >= n.y) return g ? {
                            y: a.y,
                            x: a.x < c.x ? v[k].xMin - 1 : v[k].xMax + 1,
                            obstacle: v[k]
                        } : {x: a.x, y: a.y < c.y ? v[k].yMin - 1 : v[k].yMax + 1, obstacle: v[k]};
                        k += q
                    }
                    return c
                }

                function C(a, c, g, d, b) {
                    var e = b.soft, n = b.hard, k = d ? "x" : "y", q = {x: c.x, y: c.y}, h = {x: c.x, y: c.y};
                    b = a[k + "Max"] >= e[k + "Max"];
                    var e = a[k + "Min"] <= e[k + "Min"], t = a[k + "Max"] >= n[k + "Max"],
                        n = a[k + "Min"] <= n[k + "Min"], y = m(a[k + "Min"] - c[k]), f = m(a[k + "Max"] - c[k]);
                    g = 10 > m(y - f) ? c[k] < g[k] : f <
                        y;
                    h[k] = a[k + "Min"];
                    q[k] = a[k + "Max"];
                    a = B(c, h, d)[k] !== h[k];
                    c = B(c, q, d)[k] !== q[k];
                    g = a ? c ? g : !0 : c ? !1 : g;
                    g = e ? b ? g : !0 : b ? !1 : g;
                    return n ? t ? g : !0 : t ? !1 : g
                }

                function h(a, c, g) {
                    if (a.x === c.x && a.y === c.y) return [];
                    var d = g ? "x" : "y", b, e, k, t, m = l.obstacleOptions.margin;
                    b = {soft: {xMin: n, xMax: q, yMin: y, yMax: E}, hard: l.hardBounds};
                    e = f(v, a);
                    -1 < e ? (e = v[e], b = C(e, a, c, g, b), r(e, l.hardBounds), t = g ? {
                        y: a.y,
                        x: e[b ? "xMax" : "xMin"] + (b ? 1 : -1)
                    } : {
                        x: a.x,
                        y: e[b ? "yMax" : "yMin"] + (b ? 1 : -1)
                    }, k = f(v, t), -1 < k && (k = v[k], r(k, l.hardBounds), t[d] = b ? A(e[d + "Max"] - m + 1, (k[d + "Min"] +
                        e[d + "Max"]) / 2) : x(e[d + "Min"] + m - 1, (k[d + "Max"] + e[d + "Min"]) / 2), a.x === t.x && a.y === t.y ? (G && (t[d] = b ? A(e[d + "Max"], k[d + "Max"]) + 1 : x(e[d + "Min"], k[d + "Min"]) - 1), G = !G) : G = !1), a = [{
                        start: a,
                        end: t
                    }]) : (d = B(a, {x: g ? c.x : a.x, y: g ? a.y : c.y}, g), a = [{
                        start: a,
                        end: {x: d.x, y: d.y}
                    }], d[g ? "x" : "y"] !== c[g ? "x" : "y"] && (b = C(d.obstacle, d, c, !g, b), r(d.obstacle, l.hardBounds), b = {
                        x: g ? d.x : d.obstacle[b ? "xMax" : "xMin"] + (b ? 1 : -1),
                        y: g ? d.obstacle[b ? "yMax" : "yMin"] + (b ? 1 : -1) : d.y
                    }, g = !g, a = a.concat(h({x: d.x, y: d.y}, b, g))));
                    return a = a.concat(h(a[a.length - 1].end,
                        c, !g))
                }

                function a(a, c, g) {
                    var d = x(a.xMax - c.x, c.x - a.xMin) < x(a.yMax - c.y, c.y - a.yMin);
                    g = C(a, c, g, d, {soft: l.hardBounds, hard: l.hardBounds});
                    return d ? {y: c.y, x: a[g ? "xMax" : "xMin"] + (g ? 1 : -1)} : {
                        x: c.x,
                        y: a[g ? "yMax" : "yMin"] + (g ? 1 : -1)
                    }
                }

                var c = H(l.startDirectionX, m(p.x - b.x) > m(p.y - b.y)), t = c ? "x" : "y", d, e, k = [], G = !1,
                    g = l.obstacleMetrics, n = x(b.x, p.x) - g.maxWidth - 10, q = A(b.x, p.x) + g.maxWidth + 10,
                    y = x(b.y, p.y) - g.maxHeight - 10, E = A(b.y, p.y) + g.maxHeight + 10, v = l.chartObstacles;
                d = w(v, n);
                g = w(v, q);
                v = v.slice(d, g + 1);
                -1 < (g = f(v, p)) && (e = a(v[g],
                    p, b), k.push({end: p, start: e}), p = e);
                for (; -1 < (g = f(v, p));) d = 0 > p[t] - b[t], e = {
                    x: p.x,
                    y: p.y
                }, e[t] = v[g][d ? t + "Max" : t + "Min"] + (d ? 1 : -1), k.push({end: p, start: e}), p = e;
                b = h(b, p, c);
                b = b.concat(k.reverse());
                return {path: u(b), obstacles: b}
            }, {requiresObstacles: !0})
        }
    });
    I(z, "parts-gantt/ArrowSymbols.js", [z["parts/Globals.js"]], function (b) {
        b.SVGRenderer.prototype.symbols.arrow = function (b, f, u, r) {
            return ["M", b, f + r / 2, "L", b + u, f, "L", b, f + r / 2, "L", b + u, f + r]
        };
        b.SVGRenderer.prototype.symbols["arrow-half"] = function (w, f, u, r) {
            return b.SVGRenderer.prototype.symbols.arrow(w,
                f, u / 2, r)
        };
        b.SVGRenderer.prototype.symbols["triangle-left"] = function (b, f, u, r) {
            return ["M", b + u, f, "L", b, f + r / 2, "L", b + u, f + r, "Z"]
        };
        b.SVGRenderer.prototype.symbols["arrow-filled"] = b.SVGRenderer.prototype.symbols["triangle-left"];
        b.SVGRenderer.prototype.symbols["triangle-left-half"] = function (w, f, u, r) {
            return b.SVGRenderer.prototype.symbols["triangle-left"](w, f, u / 2, r)
        };
        b.SVGRenderer.prototype.symbols["arrow-filled-half"] = b.SVGRenderer.prototype.symbols["triangle-left-half"]
    });
    I(z, "parts-gantt/Pathfinder.js",
        [z["parts/Globals.js"], z["parts-gantt/PathfinderAlgorithms.js"]], function (b, w) {
            function f(a) {
                var c = a.shapeArgs;
                return c ? {
                    xMin: c.x,
                    xMax: c.x + c.width,
                    yMin: c.y,
                    yMax: c.y + c.height
                } : (c = a.graphic && a.graphic.getBBox()) ? {
                    xMin: a.plotX - c.width / 2,
                    xMax: a.plotX + c.width / 2,
                    yMin: a.plotY - c.height / 2,
                    yMax: a.plotY + c.height / 2
                } : null
            }

            function u(a) {
                for (var c = a.length, b = 0, d, e, k = [], f = function (a, c, d) {
                    d = D(d, 10);
                    var g = a.yMax + d > c.yMin - d && a.yMin - d < c.yMax + d,
                        b = a.xMax + d > c.xMin - d && a.xMin - d < c.xMax + d,
                        e = g ? a.xMin > c.xMax ? a.xMin - c.xMax : c.xMin -
                            a.xMax : Infinity, k = b ? a.yMin > c.yMax ? a.yMin - c.yMax : c.yMin - a.yMax : Infinity;
                    return b && g ? d ? f(a, c, Math.floor(d / 2)) : Infinity : h(e, k)
                }; b < c; ++b) for (d = b + 1; d < c; ++d) e = f(a[b], a[d]), 80 > e && k.push(e);
                k.push(80);
                return C(Math.floor(k.sort(function (a, c) {
                    return a - c
                })[Math.floor(k.length / 10)] / 2 - 1), 1)
            }

            function r(a, c, b) {
                this.init(a, c, b)
            }

            function x(a) {
                this.init(a)
            }

            function A(a) {
                if (a.options.pathfinder || a.series.reduce(function (a, b) {
                    b.options && l(!0, b.options.connectors = b.options.connectors || {}, b.options.pathfinder);
                    return a ||
                        b.options && b.options.pathfinder
                }, !1)) l(!0, a.options.connectors = a.options.connectors || {}, a.options.pathfinder), b.error('WARNING: Pathfinder options have been renamed. Use "chart.connectors" or "series.connectors" instead.')
            }

            var m = b.defined, H = b.deg2rad, B = b.extend, p = b.addEvent, l = b.merge, D = b.pick, C = Math.max,
                h = Math.min;
            B(b.defaultOptions, {
                connectors: {
                    type: "straight",
                    lineWidth: 1,
                    marker: {enabled: !1, align: "center", verticalAlign: "middle", inside: !1, lineWidth: 1},
                    startMarker: {symbol: "diamond"},
                    endMarker: {symbol: "arrow-filled"}
                }
            });
            r.prototype = {
                init: function (a, c, b) {
                    this.fromPoint = a;
                    this.toPoint = c;
                    this.options = b;
                    this.chart = a.series.chart;
                    this.pathfinder = this.chart.pathfinder
                }, renderPath: function (a, c, b) {
                    var d = this.chart, e = d.styledMode, k = d.pathfinder, h = !d.options.chart.forExport && !1 !== b,
                        g = this.graphics && this.graphics.path;
                    k.group || (k.group = d.renderer.g().addClass("highcharts-pathfinder-group").attr({zIndex: -1}).add(d.seriesGroup));
                    k.group.translate(d.plotLeft, d.plotTop);
                    g && g.renderer || (g = d.renderer.path().add(k.group), e || g.attr({opacity: 0}));
                    g.attr(c);
                    a = {d: a};
                    e || (a.opacity = 1);
                    g[h ? "animate" : "attr"](a, b);
                    this.graphics = this.graphics || {};
                    this.graphics.path = g
                }, addMarker: function (a, c, b) {
                    var d = this.fromPoint.series.chart, e = d.pathfinder, d = d.renderer,
                        k = "start" === a ? this.fromPoint : this.toPoint, h = k.getPathfinderAnchorPoint(c), g, n;
                    c.enabled && (b = "start" === a ? {x: b[4], y: b[5]} : {
                        x: b[b.length - 5],
                        y: b[b.length - 4]
                    }, b = k.getRadiansToVector(b, h), h = k.getMarkerVector(b, c.radius, h), b = -b / H, c.width && c.height ? (g = c.width, n = c.height) : g = n = 2 * c.radius, this.graphics = this.graphics ||
                        {}, h = {
                        x: h.x - g / 2,
                        y: h.y - n / 2,
                        width: g,
                        height: n,
                        rotation: b,
                        rotationOriginX: h.x,
                        rotationOriginY: h.y
                    }, this.graphics[a] ? this.graphics[a].animate(h) : (this.graphics[a] = d.symbol(c.symbol).addClass("highcharts-point-connecting-path-" + a + "-marker").attr(h).add(e.group), d.styledMode || this.graphics[a].attr({
                        fill: c.color || this.fromPoint.color,
                        stroke: c.lineColor,
                        "stroke-width": c.lineWidth,
                        opacity: 0
                    }).animate({opacity: 1}, k.series.options.animation)))
                }, getPath: function (a) {
                    var c = this.pathfinder, h = this.chart, d = c.algorithms[a.type],
                        e = c.chartObstacles;
                    if ("function" !== typeof d) b.error('"' + a.type + '" is not a Pathfinder algorithm.'); else return d.requiresObstacles && !e && (e = c.chartObstacles = c.getChartObstacles(a), h.options.connectors.algorithmMargin = a.algorithmMargin, c.chartObstacleMetrics = c.getObstacleMetrics(e)), d(this.fromPoint.getPathfinderAnchorPoint(a.startMarker), this.toPoint.getPathfinderAnchorPoint(a.endMarker), l({
                        chartObstacles: e,
                        lineObstacles: c.lineObstacles || [],
                        obstacleMetrics: c.chartObstacleMetrics,
                        hardBounds: {
                            xMin: 0,
                            xMax: h.plotWidth, yMin: 0, yMax: h.plotHeight
                        },
                        obstacleOptions: {margin: a.algorithmMargin},
                        startDirectionX: c.getAlgorithmStartDirection(a.startMarker)
                    }, a))
                }, render: function () {
                    var a = this.fromPoint, c = a.series, b = c.chart, d = b.pathfinder,
                        e = l(b.options.connectors, c.options.connectors, a.options.connectors, this.options), k = {};
                    b.styledMode || (k.stroke = e.lineColor || a.color, k["stroke-width"] = e.lineWidth, e.dashStyle && (k.dashstyle = e.dashStyle));
                    k.class = "highcharts-point-connecting-path highcharts-color-" + a.colorIndex;
                    e = l(k, e);
                    m(e.marker.radius) || (e.marker.radius = h(C(Math.ceil((e.algorithmMargin || 8) / 2) - 1, 1), 5));
                    a = this.getPath(e);
                    b = a.path;
                    a.obstacles && (d.lineObstacles = d.lineObstacles || [], d.lineObstacles = d.lineObstacles.concat(a.obstacles));
                    this.renderPath(b, k, c.options.animation);
                    this.addMarker("start", l(e.marker, e.startMarker), b);
                    this.addMarker("end", l(e.marker, e.endMarker), b)
                }, destroy: function () {
                    this.graphics && (b.objectEach(this.graphics, function (a) {
                        a.destroy()
                    }), delete this.graphics)
                }
            };
            x.prototype = {
                algorithms: w,
                init: function (a) {
                    this.chart = a;
                    this.connections = [];
                    p(a, "redraw", function () {
                        this.pathfinder.update()
                    })
                }, update: function (a) {
                    var c = this.chart, h = this, d = h.connections;
                    h.connections = [];
                    c.series.forEach(function (a) {
                        a.visible && a.points.forEach(function (a) {
                            var d, g = a.options && a.options.connect && b.splat(a.options.connect);
                            a.visible && !1 !== a.isInside && g && g.forEach(function (g) {
                                d = c.get("string" === typeof g ? g : g.to);
                                d instanceof b.Point && d.series.visible && d.visible && !1 !== d.isInside && h.connections.push(new r(a, d, "string" ===
                                typeof g ? {} : g))
                            })
                        })
                    });
                    for (var e = 0, k, f, g = d.length, n = h.connections.length; e < g; ++e) {
                        f = !1;
                        for (k = 0; k < n; ++k) if (d[e].fromPoint === h.connections[k].fromPoint && d[e].toPoint === h.connections[k].toPoint) {
                            h.connections[k].graphics = d[e].graphics;
                            f = !0;
                            break
                        }
                        f || d[e].destroy()
                    }
                    delete this.chartObstacles;
                    delete this.lineObstacles;
                    h.renderConnections(a)
                }, renderConnections: function (a) {
                    a ? this.chart.series.forEach(function (a) {
                        var c = function () {
                            var c = a.chart.pathfinder;
                            (c && c.connections || []).forEach(function (c) {
                                c.fromPoint &&
                                c.fromPoint.series === a && c.render()
                            });
                            a.pathfinderRemoveRenderEvent && (a.pathfinderRemoveRenderEvent(), delete a.pathfinderRemoveRenderEvent)
                        };
                        !1 === a.options.animation ? c() : a.pathfinderRemoveRenderEvent = p(a, "afterAnimate", c)
                    }) : this.connections.forEach(function (a) {
                        a.render()
                    })
                }, getChartObstacles: function (a) {
                    for (var c = [], b = this.chart.series, d = D(a.algorithmMargin, 0), e, k = 0, h = b.length; k < h; ++k) if (b[k].visible) for (var g = 0, n = b[k].points.length, q; g < n; ++g) q = b[k].points[g], q.visible && (q = f(q)) && c.push({
                        xMin: q.xMin -
                            d, xMax: q.xMax + d, yMin: q.yMin - d, yMax: q.yMax + d
                    });
                    c = c.sort(function (a, c) {
                        return a.xMin - c.xMin
                    });
                    m(a.algorithmMargin) || (e = a.algorithmMargin = u(c), c.forEach(function (a) {
                        a.xMin -= e;
                        a.xMax += e;
                        a.yMin -= e;
                        a.yMax += e
                    }));
                    return c
                }, getObstacleMetrics: function (a) {
                    for (var c = 0, b = 0, d, e, k = a.length; k--;) d = a[k].xMax - a[k].xMin, e = a[k].yMax - a[k].yMin, c < d && (c = d), b < e && (b = e);
                    return {maxHeight: b, maxWidth: c}
                }, getAlgorithmStartDirection: function (a) {
                    var c = "top" !== a.verticalAlign && "bottom" !== a.verticalAlign;
                    return "left" !== a.align &&
                    "right" !== a.align ? c ? void 0 : !1 : c ? !0 : void 0
                }
            };
            b.Connection = r;
            b.Pathfinder = x;
            B(b.Point.prototype, {
                getPathfinderAnchorPoint: function (a) {
                    var c = f(this), b, d;
                    switch (a.align) {
                        case "right":
                            b = "xMax";
                            break;
                        case "left":
                            b = "xMin"
                    }
                    switch (a.verticalAlign) {
                        case "top":
                            d = "yMin";
                            break;
                        case "bottom":
                            d = "yMax"
                    }
                    return {x: b ? c[b] : (c.xMin + c.xMax) / 2, y: d ? c[d] : (c.yMin + c.yMax) / 2}
                }, getRadiansToVector: function (a, c) {
                    m(c) || (c = f(this), c = {x: (c.xMin + c.xMax) / 2, y: (c.yMin + c.yMax) / 2});
                    return Math.atan2(c.y - a.y, a.x - c.x)
                }, getMarkerVector: function (a,
                                              c, b) {
                    for (var d = 2 * Math.PI, e = f(this), k = e.xMax - e.xMin, h = e.yMax - e.yMin, g = Math.atan2(h, k), n = !1, k = k / 2, q = h / 2, t = e.xMin + k, e = e.yMin + q, m = t, v = e, l = {}, F = 1, p = 1; a < -Math.PI;) a += d;
                    for (; a > Math.PI;) a -= d;
                    d = Math.tan(a);
                    a > -g && a <= g ? (p = -1, n = !0) : a > g && a <= Math.PI - g ? p = -1 : a > Math.PI - g || a <= -(Math.PI - g) ? (F = -1, n = !0) : F = -1;
                    n ? (m += F * k, v += p * k * d) : (m += h / (2 * d) * F, v += p * q);
                    b.x !== t && (m = b.x);
                    b.y !== e && (v = b.y);
                    l.x = m + c * Math.cos(a);
                    l.y = v - c * Math.sin(a);
                    return l
                }
            });
            b.Chart.prototype.callbacks.push(function (a) {
                !1 !== a.options.connectors.enabled && (A(a),
                    this.pathfinder = new x(this), this.pathfinder.update(!0))
            })
        });
    I(z, "modules/xrange.src.js", [z["parts/Globals.js"]], function (b) {
        var w = b.addEvent, f = b.defined, u = b.Color, r = b.seriesTypes.column, x = b.correctFloat, A = b.isNumber,
            m = b.isObject, H = b.merge, B = b.pick, p = b.seriesType, l = b.Axis, D = b.Point, C = b.Series;
        p("xrange", "column", {
            colorByPoint: !0, dataLabels: {
                formatter: function () {
                    var b = this.point.partialFill;
                    m(b) && (b = b.amount);
                    if (A(b) && 0 < b) return x(100 * b) + "%"
                }, inside: !0, verticalAlign: "middle"
            }, tooltip: {
                headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.x} - {point.x2}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.yCategory}\x3c/b\x3e\x3cbr/\x3e'
            }, borderRadius: 3, pointRange: 0
        }, {
            type: "xrange",
            parallelArrays: ["x", "x2", "y"],
            requireSorting: !1,
            animate: b.seriesTypes.line.prototype.animate,
            cropShoulder: 1,
            getExtremesFromAll: !0,
            autoIncrement: b.noop,
            buildKDTree: b.noop,
            getColumnMetrics: function () {
                function b() {
                    c.series.forEach(function (a) {
                        var c = a.xAxis;
                        a.xAxis = a.yAxis;
                        a.yAxis = c
                    })
                }

                var a, c = this.chart;
                b();
                a = r.prototype.getColumnMetrics.call(this);
                b();
                return a
            },
            cropData: function (b, a, c, f) {
                a = C.prototype.cropData.call(this, this.x2Data, a, c, f);
                a.xData = b.slice(a.start, a.end);
                return a
            },
            findPointIndex: function (h) {
                var a = this.data, c = this.points, f = h.id, d, e;
                f && (e = (d = b.find(a, function (a) {
                    return a.id === f
                })) ? d.index : void 0);
                void 0 === e && (e = (d = b.find(a, function (a) {
                    return a.x === h.x && a.x2 === h.x2 && !(c[e] && c[e].touched)
                })) ? d.index : void 0);
                this.cropped && e >= this.cropStart && (e -= this.cropStart);
                return e
            },
            translatePoint: function (b) {
                var a = this.xAxis, c = this.yAxis, h = this.columnMetrics,
                    d = this.options, e = d.minPointLength || 0, k = b.plotX, l = B(b.x2, b.x + (b.len || 0)),
                    g = a.translate(l, 0, 0, 0, 1), l = Math.abs(g - k), n = this.chart.inverted,
                    q = B(d.borderWidth, 1) % 2 / 2, y = h.offset, E = Math.round(h.width);
                e && (e -= l, 0 > e && (e = 0), k -= e / 2, g += e / 2);
                k = Math.max(k, -10);
                g = Math.min(Math.max(g, -10), a.len + 10);
                f(b.options.pointWidth) && (y -= (Math.ceil(b.options.pointWidth) - E) / 2, E = Math.ceil(b.options.pointWidth));
                d.pointPlacement && A(b.plotY) && c.categories && (b.plotY = c.translate(b.y, 0, 1, 0, 1, d.pointPlacement));
                b.shapeArgs = {
                    x: Math.floor(Math.min(k,
                        g)) + q,
                    y: Math.floor(b.plotY + y) + q,
                    width: Math.round(Math.abs(g - k)),
                    height: E,
                    r: this.options.borderRadius
                };
                d = b.shapeArgs.x;
                e = d + b.shapeArgs.width;
                0 > d || e > a.len ? (d = Math.min(a.len, Math.max(0, d)), e = Math.max(0, Math.min(e, a.len)), g = e - d, b.dlBox = H(b.shapeArgs, {
                    x: d,
                    width: e - d,
                    centerX: g ? g / 2 : null
                })) : b.dlBox = null;
                n ? (b.tooltipPos[1] += l / 2 * (a.reversed ? 1 : -1), b.tooltipPos[0] += h.width / 2, b.tooltipPos[1] = Math.max(Math.min(b.tooltipPos[1], a.len - 1), 0), b.tooltipPos[0] = Math.max(Math.min(b.tooltipPos[0], c.len - 1), 0)) : (b.tooltipPos[0] +=
                    l / 2 * (a.reversed ? -1 : 1), b.tooltipPos[1] -= h.width / 2, b.tooltipPos[0] = Math.max(Math.min(b.tooltipPos[0], a.len - 1), 0), b.tooltipPos[1] = Math.max(Math.min(b.tooltipPos[1], c.len - 1), 0));
                if (c = b.partialFill) m(c) && (c = c.amount), A(c) || (c = 0), a = b.shapeArgs, b.partShapeArgs = {
                    x: a.x,
                    y: a.y,
                    width: a.width,
                    height: a.height,
                    r: this.options.borderRadius
                }, b.clipRectArgs = {
                    x: a.x,
                    y: a.y,
                    width: Math.max(Math.round(l * c + (b.plotX - k)), 0),
                    height: a.height
                }
            },
            translate: function () {
                r.prototype.translate.apply(this, arguments);
                this.points.forEach(function (b) {
                        this.translatePoint(b)
                    },
                    this)
            },
            drawPoint: function (b, a) {
                var c = this.options, h = this.chart.renderer, d = b.graphic, e = b.shapeType, k = b.shapeArgs,
                    f = b.partShapeArgs, g = b.clipRectArgs, n = b.partialFill, q = c.stacking && !c.borderRadius,
                    y = b.state, l = c.states[y || "normal"] || {}, v = void 0 === y ? "attr" : a,
                    y = this.pointAttribs(b, y), l = B(this.chart.options.chart.animation, l.animation);
                if (b.isNull) d && (b.graphic = d.destroy()); else {
                    if (d) b.graphicOriginal[a](k); else b.graphic = d = h.g("point").addClass(b.getClassName()).add(b.group || this.group), b.graphicOriginal =
                        h[e](H(k)).addClass(b.getClassName()).addClass("highcharts-partfill-original").add(d);
                    f && (b.graphicOverlay ? (b.graphicOverlay[a](H(f)), b.clipRect[a](H(g))) : (b.clipRect = h.clipRect(g.x, g.y, g.width, g.height), b.graphicOverlay = h[e](f).addClass("highcharts-partfill-overlay").add(d).clip(b.clipRect)));
                    this.chart.styledMode || (b.graphicOriginal[a](y, l).shadow(c.shadow, null, q), f && (m(n) || (n = {}), m(c.partialFill) && (n = H(n, c.partialFill)), a = n.fill || u(y.fill).brighten(-.3).get() || u(b.color || this.color).brighten(-.3).get(),
                        y.fill = a, b.graphicOverlay[v](y, l).shadow(c.shadow, null, q)))
                }
            },
            drawPoints: function () {
                var b = this, a = b.getAnimationVerb();
                b.points.forEach(function (c) {
                    b.drawPoint(c, a)
                })
            },
            getAnimationVerb: function () {
                return this.chart.pointCount < (this.options.animationLimit || 250) ? "animate" : "attr"
            }
        }, {
            resolveColor: function () {
                var b, a = this.series;
                if (a.options.colorByPoint && !this.options.color) {
                    b = a.options.colors || a.chart.options.colors;
                    var c = this.y % (b ? b.length : a.chart.options.chart.colorCount);
                    b = b && b[c];
                    a.chart.styledMode ||
                    (this.color = b);
                    this.options.colorIndex || (this.colorIndex = c)
                } else this.color || (this.color = a.color)
            }, init: function () {
                D.prototype.init.apply(this, arguments);
                this.y || (this.y = 0);
                return this
            }, setState: function () {
                D.prototype.setState.apply(this, arguments);
                this.series.drawPoint(this, this.series.getAnimationVerb())
            }, getLabelConfig: function () {
                var b = D.prototype.getLabelConfig.call(this), a = this.series.yAxis.categories;
                b.x2 = this.x2;
                b.yCategory = this.yCategory = a && a[this.y];
                return b
            }, tooltipDateKeys: ["x", "x2"], isValid: function () {
                return "number" ===
                    typeof this.x && "number" === typeof this.x2
            }
        });
        w(l, "afterGetSeriesExtremes", function () {
            var b = this.series, a, c;
            this.isXAxis && (a = B(this.dataMax, -Number.MAX_VALUE), b.forEach(function (b) {
                b.x2Data && b.x2Data.forEach(function (b) {
                    b > a && (a = b, c = !0)
                })
            }), c && (this.dataMax = a))
        })
    });
    I(z, "parts-gantt/GanttSeries.js", [z["parts/Globals.js"]], function (b) {
        var w = b.dateFormat, f = b.isNumber, u = b.merge, r = b.pick, x = b.seriesType, A = b.seriesTypes.xrange;
        x("gantt", "xrange", {
            grouping: !1,
            dataLabels: {enabled: !0},
            tooltip: {
                headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: null, pointFormatter: function () {
                    var f = this.series, r = f.chart.tooltip, u = f.xAxis, p = f.tooltipOptions.dateTimeLabelFormats,
                        l = u.options.startOfWeek, A = f.tooltipOptions, x = A.xDateFormat, f = this.options.milestone,
                        h = "\x3cb\x3e" + (this.name || this.yCategory) + "\x3c/b\x3e";
                    if (A.pointFormat) return this.tooltipFormatter(A.pointFormat);
                    x || (x = b.splat(r.getDateFormat(u.closestPointRange, this.start, l, p))[0]);
                    r = w(x, this.start);
                    u = w(x, this.end);
                    h += "\x3cbr/\x3e";
                    return f ? h + (r + "\x3cbr/\x3e") : h + ("Start: " + r + "\x3cbr/\x3e") +
                        ("End: " + u + "\x3cbr/\x3e")
                }
            },
            connectors: {
                type: "simpleConnect",
                animation: {reversed: !0},
                startMarker: {enabled: !0, symbol: "arrow-filled", radius: 4, fill: "#fa0", align: "left"},
                endMarker: {enabled: !1, align: "right"}
            }
        }, {
            pointArrayMap: ["start", "end", "y"], keyboardMoveVertical: !1, translatePoint: function (b) {
                var f, m;
                A.prototype.translatePoint.call(this, b);
                b.options.milestone && (f = b.shapeArgs, m = f.height, b.shapeArgs = {
                    x: f.x - m / 2,
                    y: f.y,
                    width: m,
                    height: m
                })
            }, drawPoint: function (b, r) {
                var m = this.options, p = this.chart.renderer, l =
                        b.shapeArgs, u = b.plotY, w = b.graphic, h = b.selected && "select",
                    a = m.stacking && !m.borderRadius;
                if (b.options.milestone) if (f(u) && null !== b.y) {
                    l = p.symbols.diamond(l.x, l.y, l.width, l.height);
                    if (w) w[r]({d: l}); else b.graphic = p.path(l).addClass(b.getClassName(), !0).add(b.group || this.group);
                    this.chart.styledMode || b.graphic.attr(this.pointAttribs(b, h)).shadow(m.shadow, null, a)
                } else w && (b.graphic = w.destroy()); else A.prototype.drawPoint.call(this, b, r)
            }, setData: b.Series.prototype.setData, setGanttPointAliases: function (b) {
                function f(f,
                           m) {
                    void 0 !== m && (b[f] = m)
                }

                f("x", r(b.start, b.x));
                f("x2", r(b.end, b.x2));
                f("partialFill", r(b.completed, b.partialFill));
                f("connect", r(b.dependency, b.connect))
            }
        }, u(A.prototype.pointClass.prototype, {
            applyOptions: function (f, r) {
                f = u(f);
                b.seriesTypes.gantt.prototype.setGanttPointAliases(f);
                return f = A.prototype.pointClass.prototype.applyOptions.call(this, f, r)
            }, isValid: function () {
                return ("number" === typeof this.start || "number" === typeof this.x) && ("number" === typeof this.end || "number" === typeof this.x2 || this.milestone)
            }
        }))
    });
    I(z, "parts-gantt/GanttChart.js", [z["parts/Globals.js"]], function (b) {
        var w = b.merge, f = b.splat, u = b.Chart;
        b.ganttChart = function (r, x, A) {
            var m = "string" === typeof r || r.nodeName, z = x.series, B = b.getOptions(), p, l = x;
            x = arguments[m ? 1 : 0];
            b.isArray(x.xAxis) || (x.xAxis = [x.xAxis || {}, {}]);
            x.xAxis = x.xAxis.map(function (b, f) {
                1 === f && (p = 0);
                return w(B.xAxis, {grid: {enabled: !0}, opposite: !0, linkedTo: p}, b, {type: "datetime"})
            });
            x.yAxis = f(x.yAxis || {}).map(function (b) {
                return w(B.yAxis, {
                    grid: {enabled: !0}, staticScale: 50, reversed: !0,
                    type: b.categories ? b.type : "treegrid"
                }, b)
            });
            x.series = null;
            x = w(!0, {chart: {type: "gantt"}, title: {text: null}, legend: {enabled: !1}}, x, {isGantt: !0});
            x.series = l.series = z;
            x.series.forEach(function (f) {
                f.data.forEach(function (f) {
                    b.seriesTypes.gantt.prototype.setGanttPointAliases(f)
                })
            });
            return m ? new u(r, x, A) : new u(x, x)
        }
    });
    I(z, "parts/Scrollbar.js", [z["parts/Globals.js"]], function (b) {
        function w(a, b, f) {
            this.init(a, b, f)
        }

        var f = b.addEvent, u = b.Axis, r = b.correctFloat, x = b.defaultOptions, A = b.defined,
            m = b.destroyObjectProperties,
            z = b.fireEvent, B = b.hasTouch, p = b.merge, l = b.pick, D = b.removeEvent, C, h = {
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
        x.scrollbar = p(!0, h, x.scrollbar);
        b.swapXY =
            C = function (a, b) {
                var c = a.length, d;
                if (b) for (b = 0; b < c; b += 3) d = a[b + 1], a[b + 1] = a[b + 2], a[b + 2] = d;
                return a
            };
        w.prototype = {
            init: function (a, b, f) {
                this.scrollbarButtons = [];
                this.renderer = a;
                this.userOptions = b;
                this.options = p(h, b);
                this.chart = f;
                this.size = l(this.options.size, this.options.height);
                b.enabled && (this.render(), this.initEvents(), this.addEvents())
            }, render: function () {
                var a = this.renderer, b = this.options, f = this.size, d = this.chart.styledMode, e;
                this.group = e = a.g("scrollbar").attr({zIndex: b.zIndex, translateY: -99999}).add();
                this.track = a.rect().addClass("highcharts-scrollbar-track").attr({
                    x: 0,
                    r: b.trackBorderRadius || 0,
                    height: f,
                    width: f
                }).add(e);
                d || this.track.attr({
                    fill: b.trackBackgroundColor,
                    stroke: b.trackBorderColor,
                    "stroke-width": b.trackBorderWidth
                });
                this.trackBorderWidth = this.track.strokeWidth();
                this.track.attr({y: -this.trackBorderWidth % 2 / 2});
                this.scrollbarGroup = a.g().add(e);
                this.scrollbar = a.rect().addClass("highcharts-scrollbar-thumb").attr({
                    height: f,
                    width: f,
                    r: b.barBorderRadius || 0
                }).add(this.scrollbarGroup);
                this.scrollbarRifles =
                    a.path(C(["M", -3, f / 4, "L", -3, 2 * f / 3, "M", 0, f / 4, "L", 0, 2 * f / 3, "M", 3, f / 4, "L", 3, 2 * f / 3], b.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);
                d || (this.scrollbar.attr({
                    fill: b.barBackgroundColor,
                    stroke: b.barBorderColor,
                    "stroke-width": b.barBorderWidth
                }), this.scrollbarRifles.attr({stroke: b.rifleColor, "stroke-width": 1}));
                this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
                this.scrollbarGroup.translate(-this.scrollbarStrokeWidth % 2 / 2, -this.scrollbarStrokeWidth % 2 / 2);
                this.drawScrollbarButton(0);
                this.drawScrollbarButton(1)
            }, position: function (a, b, f, d) {
                var c = this.options.vertical, k = 0, h = this.rendered ? "animate" : "attr";
                this.x = a;
                this.y = b + this.trackBorderWidth;
                this.width = f;
                this.xOffset = this.height = d;
                this.yOffset = k;
                c ? (this.width = this.yOffset = f = k = this.size, this.xOffset = b = 0, this.barWidth = d - 2 * f, this.x = a += this.options.margin) : (this.height = this.xOffset = d = b = this.size, this.barWidth = f - 2 * d, this.y += this.options.margin);
                this.group[h]({translateX: a, translateY: this.y});
                this.track[h]({width: f, height: d});
                this.scrollbarButtons[1][h]({
                    translateX: c ?
                        0 : f - b, translateY: c ? d - k : 0
                })
            }, drawScrollbarButton: function (a) {
                var b = this.renderer, f = this.scrollbarButtons, d = this.options, e = this.size, k;
                k = b.g().add(this.group);
                f.push(k);
                k = b.rect().addClass("highcharts-scrollbar-button").add(k);
                this.chart.styledMode || k.attr({
                    stroke: d.buttonBorderColor,
                    "stroke-width": d.buttonBorderWidth,
                    fill: d.buttonBackgroundColor
                });
                k.attr(k.crisp({
                    x: -.5,
                    y: -.5,
                    width: e + 1,
                    height: e + 1,
                    r: d.buttonBorderRadius
                }, k.strokeWidth()));
                k = b.path(C(["M", e / 2 + (a ? -1 : 1), e / 2 - 3, "L", e / 2 + (a ? -1 : 1), e / 2 + 3, "L",
                    e / 2 + (a ? 2 : -2), e / 2], d.vertical)).addClass("highcharts-scrollbar-arrow").add(f[a]);
                this.chart.styledMode || k.attr({fill: d.buttonArrowColor})
            }, setRange: function (a, b) {
                var c = this.options, d = c.vertical, e = c.minWidth, k = this.barWidth, f, g,
                    n = !this.rendered || this.hasDragged || this.chart.navigator && this.chart.navigator.hasDragged ? "attr" : "animate";
                A(k) && (a = Math.max(a, 0), f = Math.ceil(k * a), this.calculatedWidth = g = r(k * Math.min(b, 1) - f), g < e && (f = (k - e + g) * a, g = e), e = Math.floor(f + this.xOffset + this.yOffset), k = g / 2 - .5, this.from = a,
                    this.to = b, d ? (this.scrollbarGroup[n]({translateY: e}), this.scrollbar[n]({height: g}), this.scrollbarRifles[n]({translateY: k}), this.scrollbarTop = e, this.scrollbarLeft = 0) : (this.scrollbarGroup[n]({translateX: e}), this.scrollbar[n]({width: g}), this.scrollbarRifles[n]({translateX: k}), this.scrollbarLeft = e, this.scrollbarTop = 0), 12 >= g ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0), !1 === c.showFull && (0 >= a && 1 <= b ? this.group.hide() : this.group.show()), this.rendered = !0)
            }, initEvents: function () {
                var a = this;
                a.mouseMoveHandler =
                    function (b) {
                        var c = a.chart.pointer.normalize(b), d = a.options.vertical ? "chartY" : "chartX",
                            e = a.initPositions;
                        !a.grabbedCenter || b.touches && 0 === b.touches[0][d] || (c = a.cursorToScrollbarPosition(c)[d], d = a[d], d = c - d, a.hasDragged = !0, a.updatePosition(e[0] + d, e[1] + d), a.hasDragged && z(a, "changed", {
                            from: a.from,
                            to: a.to,
                            trigger: "scrollbar",
                            DOMType: b.type,
                            DOMEvent: b
                        }))
                    };
                a.mouseUpHandler = function (b) {
                    a.hasDragged && z(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMType: b.type,
                        DOMEvent: b
                    });
                    a.grabbedCenter = a.hasDragged =
                        a.chartX = a.chartY = null
                };
                a.mouseDownHandler = function (b) {
                    b = a.chart.pointer.normalize(b);
                    b = a.cursorToScrollbarPosition(b);
                    a.chartX = b.chartX;
                    a.chartY = b.chartY;
                    a.initPositions = [a.from, a.to];
                    a.grabbedCenter = !0
                };
                a.buttonToMinClick = function (b) {
                    var c = r(a.to - a.from) * a.options.step;
                    a.updatePosition(r(a.from - c), r(a.to - c));
                    z(a, "changed", {from: a.from, to: a.to, trigger: "scrollbar", DOMEvent: b})
                };
                a.buttonToMaxClick = function (b) {
                    var c = (a.to - a.from) * a.options.step;
                    a.updatePosition(a.from + c, a.to + c);
                    z(a, "changed", {
                        from: a.from,
                        to: a.to, trigger: "scrollbar", DOMEvent: b
                    })
                };
                a.trackClick = function (b) {
                    var c = a.chart.pointer.normalize(b), d = a.to - a.from, e = a.y + a.scrollbarTop,
                        k = a.x + a.scrollbarLeft;
                    a.options.vertical && c.chartY > e || !a.options.vertical && c.chartX > k ? a.updatePosition(a.from + d, a.to + d) : a.updatePosition(a.from - d, a.to - d);
                    z(a, "changed", {from: a.from, to: a.to, trigger: "scrollbar", DOMEvent: b})
                }
            }, cursorToScrollbarPosition: function (a) {
                var b = this.options, b = b.minWidth > this.calculatedWidth ? b.minWidth : 0;
                return {
                    chartX: (a.chartX - this.x - this.xOffset) /
                        (this.barWidth - b), chartY: (a.chartY - this.y - this.yOffset) / (this.barWidth - b)
                }
            }, updatePosition: function (a, b) {
                1 < b && (a = r(1 - r(b - a)), b = 1);
                0 > a && (b = r(b - a), a = 0);
                this.from = a;
                this.to = b
            }, update: function (a) {
                this.destroy();
                this.init(this.chart.renderer, p(!0, this.options, a), this.chart)
            }, addEvents: function () {
                var a = this.options.inverted ? [1, 0] : [0, 1], b = this.scrollbarButtons,
                    h = this.scrollbarGroup.element, d = this.mouseDownHandler, e = this.mouseMoveHandler,
                    k = this.mouseUpHandler, a = [[b[a[0]].element, "click", this.buttonToMinClick],
                        [b[a[1]].element, "click", this.buttonToMaxClick], [this.track.element, "click", this.trackClick], [h, "mousedown", d], [h.ownerDocument, "mousemove", e], [h.ownerDocument, "mouseup", k]];
                B && a.push([h, "touchstart", d], [h.ownerDocument, "touchmove", e], [h.ownerDocument, "touchend", k]);
                a.forEach(function (a) {
                    f.apply(null, a)
                });
                this._events = a
            }, removeEvents: function () {
                this._events.forEach(function (a) {
                    D.apply(null, a)
                });
                this._events.length = 0
            }, destroy: function () {
                var a = this.chart.scroller;
                this.removeEvents();
                ["track", "scrollbarRifles",
                    "scrollbar", "scrollbarGroup", "group"].forEach(function (a) {
                    this[a] && this[a].destroy && (this[a] = this[a].destroy())
                }, this);
                a && this === a.scrollbar && (a.scrollbar = null, m(a.scrollbarButtons))
            }
        };
        b.Scrollbar || (f(u, "afterInit", function () {
            var a = this;
            a.options && a.options.scrollbar && a.options.scrollbar.enabled && (a.options.scrollbar.vertical = !a.horiz, a.options.startOnTick = a.options.endOnTick = !1, a.scrollbar = new w(a.chart.renderer, a.options.scrollbar, a.chart), f(a.scrollbar, "changed", function (c) {
                var f = Math.min(l(a.options.min,
                    a.min), a.min, a.dataMin), d = Math.max(l(a.options.max, a.max), a.max, a.dataMax) - f, e;
                a.horiz && !a.reversed || !a.horiz && a.reversed ? (e = f + d * this.to, f += d * this.from) : (e = f + d * (1 - this.from), f += d * (1 - this.to));
                l(this.options.liveRedraw, b.svg && !b.isTouchDevice && !this.chart.isBoosting) || "mouseup" === c.DOMType || !A(c.DOMType) ? a.setExtremes(f, e, !0, "mousemove" !== c.DOMType, c) : this.setRange(this.from, this.to)
            }))
        }), f(u, "afterRender", function () {
            var a = Math.min(l(this.options.min, this.min), this.min, l(this.dataMin, this.min)), b =
                    Math.max(l(this.options.max, this.max), this.max, l(this.dataMax, this.max)), f = this.scrollbar,
                d = this.axisTitleMargin + (this.titleOffset || 0), e = this.chart.scrollbarsOffsets,
                k = this.options.margin || 0;
            f && (this.horiz ? (this.opposite || (e[1] += d), f.position(this.left, this.top + this.height + 2 + e[1] - (this.opposite ? k : 0), this.width, this.height), this.opposite || (e[1] += k), d = 1) : (this.opposite && (e[0] += d), f.position(this.left + this.width + 2 + e[0] - (this.opposite ? 0 : k), this.top, this.width, this.height), this.opposite && (e[0] += k), d = 0),
                e[d] += f.size + f.options.margin, isNaN(a) || isNaN(b) || !A(this.min) || !A(this.max) || this.min === this.max ? f.setRange(0, 1) : (e = (this.min - a) / (b - a), a = (this.max - a) / (b - a), this.horiz && !this.reversed || !this.horiz && this.reversed ? f.setRange(e, a) : f.setRange(1 - a, 1 - e)))
        }), f(u, "afterGetOffset", function () {
            var a = this.horiz ? 2 : 1, b = this.scrollbar;
            b && (this.chart.scrollbarsOffsets = [0, 0], this.chart.axisOffset[a] += b.size + b.options.margin)
        }), b.Scrollbar = w)
    });
    I(z, "parts/RangeSelector.js", [z["parts/Globals.js"]], function (b) {
        function w(a) {
            this.init(a)
        }

        var f = b.addEvent, u = b.Axis, r = b.Chart, x = b.css, A = b.createElement, m = b.defaultOptions,
            z = b.defined, B = b.destroyObjectProperties, p = b.discardElement, l = b.extend, D = b.fireEvent,
            C = b.isNumber, h = b.merge, a = b.pick, c = b.pInt, t = b.splat;
        l(m, {
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
        m.lang = h(m.lang, {
            rangeSelectorZoom: "Zoom", rangeSelectorFrom: "From",
            rangeSelectorTo: "To"
        });
        w.prototype = {
            clickButton: function (b, c) {
                var d = this.chart, e = this.buttonOptions[b], g = d.xAxis[0],
                    n = d.scroller && d.scroller.getUnionExtremes() || g || {}, q = n.dataMin, h = n.dataMax, l,
                    v = g && Math.round(Math.min(g.max, a(h, g.max))), m = e.type, F, n = e._range, p, r, w,
                    S = e.dataGrouping;
                if (null !== q && null !== h) {
                    d.fixedRange = n;
                    S && (this.forcedDataGrouping = !0, u.prototype.setDataGrouping.call(g || {chart: this.chart}, S, !1), this.frozenStates = e.preserveDataGrouping);
                    if ("month" === m || "year" === m) g ? (m = {
                        range: e, max: v,
                        chart: d, dataMin: q, dataMax: h
                    }, l = g.minFromRange.call(m), C(m.newMax) && (v = m.newMax)) : n = e; else if (n) l = Math.max(v - n, q), v = Math.min(l + n, h); else if ("ytd" === m) if (g) void 0 === h && (q = Number.MAX_VALUE, h = Number.MIN_VALUE, d.series.forEach(function (a) {
                        a = a.xData;
                        q = Math.min(a[0], q);
                        h = Math.max(a[a.length - 1], h)
                    }), c = !1), v = this.getYTDExtremes(h, q, d.time.useUTC), l = p = v.min, v = v.max; else {
                        this.deferredYTDClick = b;
                        return
                    } else "all" === m && g && (l = q, v = h);
                    l += e._offsetMin;
                    v += e._offsetMax;
                    this.setSelected(b);
                    g ? g.setExtremes(l, v, a(c, 1),
                        null, {
                            trigger: "rangeSelectorButton",
                            rangeSelectorButton: e
                        }) : (F = t(d.options.xAxis)[0], w = F.range, F.range = n, r = F.min, F.min = p, f(d, "load", function () {
                        F.range = w;
                        F.min = r
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
                var b = this, c = a.options.rangeSelector, d = c.buttons || [].concat(b.defaultButtons),
                    g = c.selected, n = function () {
                        var a = b.minInput, c = b.maxInput;
                        a && a.blur && D(a, "blur");
                        c && c.blur && D(c, "blur")
                    };
                b.chart = a;
                b.options = c;
                b.buttons = [];
                b.buttonOptions = d;
                this.unMouseDown = f(a.container, "mousedown", n);
                this.unResize = f(a, "resize", n);
                d.forEach(b.computeButtonRange);
                void 0 !== g && d[g] && this.clickButton(g, !1);
                f(a, "load", function () {
                    a.xAxis && a.xAxis[0] && f(a.xAxis[0], "setExtremes", function (c) {
                        this.max - this.min !== a.fixedRange && "rangeSelectorButton" !== c.trigger && "updatedData" !== c.trigger && b.forcedDataGrouping &&
                        !b.frozenStates && this.setDataGrouping(!1, !1)
                    })
                })
            },
            updateButtonStates: function () {
                var a = this, b = this.chart, c = b.xAxis[0], f = Math.round(c.max - c.min), g = !c.hasVisibleSeries,
                    n = b.scroller && b.scroller.getUnionExtremes() || c, q = n.dataMin, h = n.dataMax,
                    b = a.getYTDExtremes(h, q, b.time.useUTC), l = b.min, v = b.max, m = a.selected, F = C(m),
                    p = a.options.allButtonsEnabled, r = a.buttons;
                a.buttonOptions.forEach(function (b, d) {
                    var e = b._range, k = b.type, n = b.count || 1, y = r[d], E = 0, G = b._offsetMax - b._offsetMin;
                    b = d === m;
                    var J = e > h - q, t = e < c.minRange,
                        u = !1, w = !1, e = e === f;
                    ("month" === k || "year" === k) && f + 36E5 >= 864E5 * {
                        month: 28,
                        year: 365
                    }[k] * n - G && f - 36E5 <= 864E5 * {
                        month: 31,
                        year: 366
                    }[k] * n + G ? e = !0 : "ytd" === k ? (e = v - l + G === f, u = !b) : "all" === k && (e = c.max - c.min >= h - q, w = !b && F && e);
                    k = !p && (J || t || w || g);
                    n = b && e || e && !F && !u || b && a.frozenStates;
                    k ? E = 3 : n && (F = !0, E = 2);
                    y.state !== E && (y.setState(E), 0 === E && m === d && a.setSelected(null))
                })
            },
            computeButtonRange: function (b) {
                var c = b.type, d = b.count || 1,
                    f = {millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5};
                if (f[c]) b._range = f[c] * d; else if ("month" ===
                    c || "year" === c) b._range = 864E5 * {month: 30, year: 365}[c] * d;
                b._offsetMin = a(b.offsetMin, 0);
                b._offsetMax = a(b.offsetMax, 0);
                b._range += b._offsetMax - b._offsetMin
            },
            setInputValue: function (a, b) {
                var c = this.chart.options.rangeSelector, d = this.chart.time, g = this[a + "Input"];
                z(b) && (g.previousValue = g.HCTime, g.HCTime = b);
                g.value = d.dateFormat(c.inputEditDateFormat || "%Y-%m-%d", g.HCTime);
                this[a + "DateBox"].attr({text: d.dateFormat(c.inputDateFormat || "%b %e, %Y", g.HCTime)})
            },
            showInput: function (a) {
                var b = this.inputGroup, c = this[a +
                "DateBox"];
                x(this[a + "Input"], {
                    left: b.translateX + c.x + "px",
                    top: b.translateY + "px",
                    width: c.width - 2 + "px",
                    height: c.height - 2 + "px",
                    border: "2px solid silver"
                })
            },
            hideInput: function (a) {
                x(this[a + "Input"], {border: 0, width: "1px", height: "1px"});
                this.setInputValue(a)
            },
            drawInput: function (a) {
                function d() {
                    var a = v.value, b = (q.inputDateParser || Date.parse)(a), g = f.xAxis[0],
                        d = f.scroller && f.scroller.xAxis ? f.scroller.xAxis : g, e = d.dataMin, d = d.dataMax;
                    b !== v.previousValue && (v.previousValue = b, C(b) || (b = a.split("-"), b = Date.UTC(c(b[0]),
                        c(b[1]) - 1, c(b[2]))), C(b) && (f.time.useUTC || (b += 6E4 * (new Date).getTimezoneOffset()), E ? b > k.maxInput.HCTime ? b = void 0 : b < e && (b = e) : b < k.minInput.HCTime ? b = void 0 : b > d && (b = d), void 0 !== b && g.setExtremes(E ? b : g.min, E ? g.max : b, void 0, void 0, {trigger: "rangeSelectorInput"})))
                }

                var k = this, f = k.chart, g = f.renderer.style || {}, n = f.renderer, q = f.options.rangeSelector,
                    y = k.div, E = "min" === a, v, p, F = this.inputGroup;
                this[a + "Label"] = p = n.label(m.lang[E ? "rangeSelectorFrom" : "rangeSelectorTo"], this.inputGroup.offset).addClass("highcharts-range-label").attr({padding: 2}).add(F);
                F.offset += p.width + 5;
                this[a + "DateBox"] = n = n.label("", F.offset).addClass("highcharts-range-input").attr({
                    padding: 2,
                    width: q.inputBoxWidth || 90,
                    height: q.inputBoxHeight || 17,
                    "text-align": "center"
                }).on("click", function () {
                    k.showInput(a);
                    k[a + "Input"].focus()
                });
                f.styledMode || n.attr({stroke: q.inputBoxBorderColor || "#cccccc", "stroke-width": 1});
                n.add(F);
                F.offset += n.width + (E ? 10 : 0);
                this[a + "Input"] = v = A("input", {
                    name: a,
                    className: "highcharts-range-selector",
                    type: "text"
                }, {top: f.plotTop + "px"}, y);
                f.styledMode || (p.css(h(g,
                    q.labelStyle)), n.css(h({color: "#333333"}, g, q.inputStyle)), x(v, l({
                    position: "absolute",
                    border: 0,
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    textAlign: "center",
                    fontSize: g.fontSize,
                    fontFamily: g.fontFamily,
                    top: "-9999em"
                }, q.inputStyle)));
                v.onfocus = function () {
                    k.showInput(a)
                };
                v.onblur = function () {
                    v === b.doc.activeElement && d();
                    k.hideInput(a);
                    v.blur()
                };
                v.onchange = d;
                v.onkeypress = function (a) {
                    13 === a.keyCode && d()
                }
            },
            getPosition: function () {
                var a = this.chart, b = a.options.rangeSelector,
                    a = "top" === b.verticalAlign ? a.plotTop - a.axisOffset[0] :
                        0;
                return {buttonTop: a + b.buttonPosition.y, inputTop: a + b.inputPosition.y - 10}
            },
            getYTDExtremes: function (a, b, c) {
                var d = this.chart.time, g = new d.Date(a), e = d.get("FullYear", g);
                c = c ? d.Date.UTC(e, 0, 1) : +new d.Date(e, 0, 1);
                b = Math.max(b || 0, c);
                g = g.getTime();
                return {max: Math.min(a || g, g), min: b}
            },
            render: function (b, c) {
                var d = this, e = d.chart, g = e.renderer, n = e.container, f = e.options,
                    h = f.exporting && !1 !== f.exporting.enabled && f.navigation && f.navigation.buttonOptions,
                    l = m.lang, v = d.div, p = f.rangeSelector, F = a(f.chart.style && f.chart.style.zIndex,
                    0) + 1, f = p.floating, r = d.buttons, v = d.inputGroup, t = p.buttonTheme, u = p.buttonPosition,
                    w = p.inputPosition, x = p.inputEnabled, z = t && t.states, B = e.plotLeft, C, D = d.buttonGroup, H;
                H = d.rendered;
                var I = d.options.verticalAlign, O = e.legend, P = O && O.options, Q = u.y, N = w.y, R = H || !1,
                    T = R ? "animate" : "attr", M = 0, K = 0, L;
                if (!1 !== p.enabled) {
                    H || (d.group = H = g.g("range-selector-group").attr({zIndex: 7}).add(), d.buttonGroup = D = g.g("range-selector-buttons").add(H), d.zoomText = g.text(l.rangeSelectorZoom, 0, 15).add(D), e.styledMode || (d.zoomText.css(p.labelStyle),
                        t["stroke-width"] = a(t["stroke-width"], 0)), d.buttonOptions.forEach(function (a, b) {
                        r[b] = g.button(a.text, 0, 0, function (c) {
                            var g = a.events && a.events.click, e;
                            g && (e = g.call(a, c));
                            !1 !== e && d.clickButton(b);
                            d.isActive = !0
                        }, t, z && z.hover, z && z.select, z && z.disabled).attr({"text-align": "center"}).add(D)
                    }), !1 !== x && (d.div = v = A("div", null, {
                        position: "relative",
                        height: 0,
                        zIndex: F
                    }), n.parentNode.insertBefore(v, n), d.inputGroup = v = g.g("input-group").add(H), v.offset = 0, d.drawInput("min"), d.drawInput("max")));
                    d.zoomText[T]({
                        x: a(B +
                            u.x, B)
                    });
                    C = a(B + u.x, B) + d.zoomText.getBBox().width + 5;
                    d.buttonOptions.forEach(function (b, c) {
                        r[c][T]({x: C});
                        C += r[c].width + a(p.buttonSpacing, 5)
                    });
                    B = e.plotLeft - e.spacing[3];
                    d.updateButtonStates();
                    h && this.titleCollision(e) && "top" === I && "right" === u.align && u.y + D.getBBox().height - 12 < (h.y || 0) + h.height && (M = -40);
                    "left" === u.align ? L = u.x - e.spacing[3] : "right" === u.align && (L = u.x + M - e.spacing[1]);
                    D.align({y: u.y, width: D.getBBox().width, align: u.align, x: L}, !0, e.spacingBox);
                    d.group.placed = R;
                    d.buttonGroup.placed = R;
                    !1 !== x &&
                    (M = h && this.titleCollision(e) && "top" === I && "right" === w.align && w.y - v.getBBox().height - 12 < (h.y || 0) + h.height + e.spacing[0] ? -40 : 0, "left" === w.align ? L = B : "right" === w.align && (L = -Math.max(e.axisOffset[1], -M)), v.align({
                        y: w.y,
                        width: v.getBBox().width,
                        align: w.align,
                        x: w.x + L - 2
                    }, !0, e.spacingBox), n = v.alignAttr.translateX + v.alignOptions.x - M + v.getBBox().x + 2, h = v.alignOptions.width, l = D.alignAttr.translateX + D.getBBox().x, L = D.getBBox().width + 20, (w.align === u.align || l + L > n && n + h > l && Q < N + v.getBBox().height) && v.attr({
                        translateX: v.alignAttr.translateX +
                            (e.axisOffset[1] >= -M ? 0 : -M),
                        translateY: v.alignAttr.translateY + D.getBBox().height + 10
                    }), d.setInputValue("min", b), d.setInputValue("max", c), d.inputGroup.placed = R);
                    d.group.align({verticalAlign: I}, !0, e.spacingBox);
                    b = d.group.getBBox().height + 20;
                    c = d.group.alignAttr.translateY;
                    "bottom" === I && (O = P && "bottom" === P.verticalAlign && P.enabled && !P.floating ? O.legendHeight + a(P.margin, 10) : 0, b = b + O - 20, K = c - b - (f ? 0 : p.y) - 10);
                    if ("top" === I) f && (K = 0), e.titleOffset && (K = e.titleOffset + e.options.title.margin), K += e.margin[0] - e.spacing[0] ||
                        0; else if ("middle" === I) if (N === Q) K = 0 > N ? c + void 0 : c; else if (N || Q) K = 0 > N || 0 > Q ? K - Math.min(N, Q) : c - b + NaN;
                    d.group.translate(p.x, p.y + Math.floor(K));
                    !1 !== x && (d.minInput.style.marginTop = d.group.translateY + "px", d.maxInput.style.marginTop = d.group.translateY + "px");
                    d.rendered = !0
                }
            },
            getHeight: function () {
                var a = this.options, b = this.group, c = a.y, f = a.buttonPosition.y, g = a.inputPosition.y;
                if (a.height) return a.height;
                a = b ? b.getBBox(!0).height + 13 + c : 0;
                b = Math.min(g, f);
                if (0 > g && 0 > f || 0 < g && 0 < f) a += Math.abs(b);
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
                var a = this, c = a.minInput, f = a.maxInput;
                a.unMouseDown();
                a.unResize();
                B(a.buttons);
                c && (c.onfocus = c.onblur = c.onchange = null);
                f && (f.onfocus = f.onblur = f.onchange = null);
                b.objectEach(a, function (b, c) {
                    b && "chart" !== c && (b.destroy ? b.destroy() : b.nodeType && p(this[c]));
                    b !== w.prototype[c] && (a[c] = null)
                }, this)
            }
        };
        u.prototype.minFromRange = function () {
            var b =
                    this.range, c = {month: "Month", year: "FullYear"}[b.type], f, h = this.max, g, n, q = this.chart.time,
                l = function (a, b) {
                    var g = new q.Date(a), d = q.get(c, g);
                    q.set(c, g, d + b);
                    d === q.get(c, g) && q.set("Date", g, 0);
                    return g.getTime() - a
                };
            C(b) ? (f = h - b, n = b) : (f = h + l(h, -b.count), this.chart && (this.chart.fixedRange = h - f));
            g = a(this.dataMin, Number.MIN_VALUE);
            C(f) || (f = g);
            f <= g && (f = g, void 0 === n && (n = l(f, b.count)), this.newMax = Math.min(f + n, this.dataMax));
            C(h) || (f = void 0);
            return f
        };
        b.RangeSelector || (f(r, "afterGetContainer", function () {
            this.options.rangeSelector.enabled &&
            (this.rangeSelector = new w(this))
        }), f(r, "beforeRender", function () {
            var a = this.axes, b = this.rangeSelector;
            b && (C(b.deferredYTDClick) && (b.clickButton(b.deferredYTDClick), delete b.deferredYTDClick), a.forEach(function (a) {
                a.updateNames();
                a.setScale()
            }), this.getAxisMargins(), b.render(), a = b.options.verticalAlign, b.options.floating || ("bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0)))
        }), f(r, "update", function (a) {
            var b = a.options.rangeSelector;
            a = this.rangeSelector;
            var c = this.extraBottomMargin,
                d = this.extraTopMargin;
            b && b.enabled && !z(a) && (this.options.rangeSelector.enabled = !0, this.rangeSelector = new w(this));
            this.extraTopMargin = this.extraBottomMargin = !1;
            a && (a.render(), b = b && b.verticalAlign || a.options && a.options.verticalAlign, a.options.floating || ("bottom" === b ? this.extraBottomMargin = !0 : "middle" !== b && (this.extraTopMargin = !0)), this.extraBottomMargin !== c || this.extraTopMargin !== d) && (this.isDirtyBox = !0)
        }), f(r, "render", function () {
            var a = this.rangeSelector;
            a && !a.options.floating && (a.render(), a = a.options.verticalAlign,
                "bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0))
        }), f(r, "getMargins", function () {
            var a = this.rangeSelector;
            a && (a = a.getHeight(), this.extraTopMargin && (this.plotTop += a), this.extraBottomMargin && (this.marginBottom += a))
        }), r.prototype.callbacks.push(function (a) {
            function b() {
                c = a.xAxis[0].getExtremes();
                C(c.min) && d.render(c.min, c.max)
            }

            var c, d = a.rangeSelector, g, n;
            d && (n = f(a.xAxis[0], "afterSetExtremes", function (a) {
                d.render(a.min, a.max)
            }), g = f(a, "redraw", b), b());
            f(a, "destroy", function () {
                d &&
                (g(), n())
            })
        }), b.RangeSelector = w)
    });
    I(z, "parts/Navigator.js", [z["parts/Globals.js"]], function (b) {
        function w(a) {
            this.init(a)
        }

        var f = b.addEvent, u = b.Axis, r = b.Chart, x = b.color, A = b.defaultOptions, m = b.defined,
            z = b.destroyObjectProperties, B = b.erase, p = b.extend, l = b.hasTouch, D = b.isArray, C = b.isNumber,
            h = b.isTouchDevice, a = b.merge, c = b.pick, t = b.removeEvent, d = b.Scrollbar, e = b.Series, k,
            G = function (a) {
                var b = [].filter.call(arguments, C);
                if (b.length) return Math[a].apply(0, b)
            };
        k = void 0 === b.seriesTypes.areaspline ? "line" : "areaspline";
        p(A, {
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
                maskFill: x("#6685c2").setOpacity(.3).get(),
                outlineColor: "#cccccc",
                outlineWidth: 1,
                series: {
                    type: k,
                    fillOpacity: .05,
                    lineWidth: 1,
                    compare: null,
                    dataGrouping: {
                        approximation: "average",
                        enabled: !0,
                        groupPixelWidth: 2,
                        smoothed: !0,
                        units: [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute",
                            [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2, 3, 4]], ["week", [1, 2, 3]], ["month", [1, 3, 6]], ["year", null]]
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
        b.Renderer.prototype.symbols["navigator-handle"] = function (a, b, c, d, e) {
            a = e.width / 2;
            b = Math.round(a / 3) + .5;
            e = e.height;
            return ["M", -a - 1, .5, "L", a, .5, "L", a, e + .5, "L", -a - 1, e + .5, "L", -a - 1, .5, "M", -b, 4, "L", -b, e - 3, "M", b - 1, 4, "L", b - 1, e - 3]
        };
        u.prototype.toFixedRange = function (a, b, d, e) {
            var g = this.chart && this.chart.fixedRange;
            a = c(d, this.translate(a, !0, !this.horiz));
            b = c(e,
                this.translate(b, !0, !this.horiz));
            d = g && (b - a) / g;
            .7 < d && 1.3 > d && (e ? a = b - g : b = a + g);
            C(a) && C(b) || (a = b = void 0);
            return {min: a, max: b}
        };
        w.prototype = {
            drawHandle: function (a, b, c, d) {
                var g = this.navigatorOptions.handles.height;
                this.handles[b][d](c ? {
                    translateX: Math.round(this.left + this.height / 2),
                    translateY: Math.round(this.top + parseInt(a, 10) + .5 - g)
                } : {
                    translateX: Math.round(this.left + parseInt(a, 10)),
                    translateY: Math.round(this.top + this.height / 2 - g / 2 - 1)
                })
            }, drawOutline: function (a, b, c, d) {
                var g = this.navigatorOptions.maskInside,
                    e = this.outline.strokeWidth(), f = e / 2, e = e % 2 / 2, n = this.outlineHeight,
                    h = this.scrollbarHeight, k = this.size, q = this.left - h, l = this.top;
                c ? (q -= f, c = l + b + e, b = l + a + e, a = ["M", q + n, l - h - e, "L", q + n, c, "L", q, c, "L", q, b, "L", q + n, b, "L", q + n, l + k + h].concat(g ? ["M", q + n, c - f, "L", q + n, b + f] : [])) : (a += q + h - e, b += q + h - e, l += f, a = ["M", q, l, "L", a, l, "L", a, l + n, "L", b, l + n, "L", b, l, "L", q + k + 2 * h, l].concat(g ? ["M", a - f, l, "L", b + f, l] : []));
                this.outline[d]({d: a})
            }, drawMasks: function (a, b, c, d) {
                var g = this.left, e = this.top, f = this.height, n, h, k, q;
                c ? (k = [g, g, g], q = [e, e + a,
                    e + b], h = [f, f, f], n = [a, b - a, this.size - b]) : (k = [g, g + a, g + b], q = [e, e, e], h = [a, b - a, this.size - b], n = [f, f, f]);
                this.shades.forEach(function (a, b) {
                    a[d]({x: k[b], y: q[b], width: h[b], height: n[b]})
                })
            }, renderElements: function () {
                var a = this, b = a.navigatorOptions, c = b.maskInside, d = a.chart, e = d.renderer, f,
                    h = {cursor: d.inverted ? "ns-resize" : "ew-resize"};
                a.navigatorGroup = f = e.g("navigator").attr({zIndex: 8, visibility: "hidden"}).add();
                [!c, c, !c].forEach(function (c, g) {
                    a.shades[g] = e.rect().addClass("highcharts-navigator-mask" + (1 === g ? "-inside" :
                        "-outside")).add(f);
                    d.styledMode || a.shades[g].attr({fill: c ? b.maskFill : "rgba(0,0,0,0)"}).css(1 === g && h)
                });
                a.outline = e.path().addClass("highcharts-navigator-outline").add(f);
                d.styledMode || a.outline.attr({"stroke-width": b.outlineWidth, stroke: b.outlineColor});
                b.handles.enabled && [0, 1].forEach(function (c) {
                    b.handles.inverted = d.inverted;
                    a.handles[c] = e.symbol(b.handles.symbols[c], -b.handles.width / 2 - 1, 0, b.handles.width, b.handles.height, b.handles);
                    a.handles[c].attr({zIndex: 7 - c}).addClass("highcharts-navigator-handle highcharts-navigator-handle-" +
                        ["left", "right"][c]).add(f);
                    if (!d.styledMode) {
                        var g = b.handles;
                        a.handles[c].attr({
                            fill: g.backgroundColor,
                            stroke: g.borderColor,
                            "stroke-width": g.lineWidth
                        }).css(h)
                    }
                })
            }, update: function (b) {
                (this.series || []).forEach(function (a) {
                    a.baseSeries && delete a.baseSeries.navigatorSeries
                });
                this.destroy();
                a(!0, this.chart.options.navigator, this.options, b);
                this.init(this.chart)
            }, render: function (a, d, e, f) {
                var g = this.chart, h, n, k = this.scrollbarHeight, q, l = this.xAxis;
                h = l.fake ? g.xAxis[0] : l;
                var p = this.navigatorEnabled, y, r = this.rendered;
                n = g.inverted;
                var t, u = g.xAxis[0].minRange, w = g.xAxis[0].options.maxRange;
                if (!this.hasDragged || m(e)) {
                    if (!C(a) || !C(d)) if (r) e = 0, f = c(l.width, h.width); else return;
                    this.left = c(l.left, g.plotLeft + k + (n ? g.plotWidth : 0));
                    this.size = y = q = c(l.len, (n ? g.plotHeight : g.plotWidth) - 2 * k);
                    g = n ? k : q + 2 * k;
                    e = c(e, l.toPixels(a, !0));
                    f = c(f, l.toPixels(d, !0));
                    C(e) && Infinity !== Math.abs(e) || (e = 0, f = g);
                    a = l.toValue(e, !0);
                    d = l.toValue(f, !0);
                    t = Math.abs(b.correctFloat(d - a));
                    t < u ? this.grabbedLeft ? e = l.toPixels(d - u, !0) : this.grabbedRight && (f = l.toPixels(a +
                        u, !0)) : m(w) && t > w && (this.grabbedLeft ? e = l.toPixels(d - w, !0) : this.grabbedRight && (f = l.toPixels(a + w, !0)));
                    this.zoomedMax = Math.min(Math.max(e, f, 0), y);
                    this.zoomedMin = Math.min(Math.max(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(e, f), 0), y);
                    this.range = this.zoomedMax - this.zoomedMin;
                    y = Math.round(this.zoomedMax);
                    e = Math.round(this.zoomedMin);
                    p && (this.navigatorGroup.attr({visibility: "visible"}), r = r && !this.hasDragged ? "animate" : "attr", this.drawMasks(e, y, n, r), this.drawOutline(e, y, n, r), this.navigatorOptions.handles.enabled &&
                    (this.drawHandle(e, 0, n, r), this.drawHandle(y, 1, n, r)));
                    this.scrollbar && (n ? (n = this.top - k, h = this.left - k + (p || !h.opposite ? 0 : (h.titleOffset || 0) + h.axisTitleMargin), k = q + 2 * k) : (n = this.top + (p ? this.height : -k), h = this.left - k), this.scrollbar.position(h, n, g, k), this.scrollbar.setRange(this.zoomedMin / (q || 1), this.zoomedMax / (q || 1)));
                    this.rendered = !0
                }
            }, addMouseEvents: function () {
                var a = this, b = a.chart, c = b.container, d = [], e, h;
                a.mouseMoveHandler = e = function (b) {
                    a.onMouseMove(b)
                };
                a.mouseUpHandler = h = function (b) {
                    a.onMouseUp(b)
                };
                d = a.getPartsEvents("mousedown");
                d.push(f(c, "mousemove", e), f(c.ownerDocument, "mouseup", h));
                l && (d.push(f(c, "touchmove", e), f(c.ownerDocument, "touchend", h)), d.concat(a.getPartsEvents("touchstart")));
                a.eventsToUnbind = d;
                a.series && a.series[0] && d.push(f(a.series[0].xAxis, "foundExtremes", function () {
                    b.navigator.modifyNavigatorAxisExtremes()
                }))
            }, getPartsEvents: function (a) {
                var b = this, c = [];
                ["shades", "handles"].forEach(function (d) {
                    b[d].forEach(function (g, e) {
                        c.push(f(g.element, a, function (a) {
                            b[d + "Mousedown"](a, e)
                        }))
                    })
                });
                return c
            }, shadesMousedown: function (a, b) {
                a = this.chart.pointer.normalize(a);
                var c = this.chart, d = this.xAxis, g = this.zoomedMin, e = this.left, f = this.size, h = this.range,
                    n = a.chartX, k, l;
                c.inverted && (n = a.chartY, e = this.top);
                1 === b ? (this.grabbedCenter = n, this.fixedWidth = h, this.dragOffset = n - g) : (a = n - e - h / 2, 0 === b ? a = Math.max(0, a) : 2 === b && a + h >= f && (a = f - h, this.reversedExtremes ? (a -= h, l = this.getUnionExtremes().dataMin) : k = this.getUnionExtremes().dataMax), a !== g && (this.fixedWidth = h, b = d.toFixedRange(a, a + h, l, k), m(b.min) && c.xAxis[0].setExtremes(Math.min(b.min,
                    b.max), Math.max(b.min, b.max), !0, null, {trigger: "navigator"})))
            }, handlesMousedown: function (a, b) {
                this.chart.pointer.normalize(a);
                a = this.chart;
                var c = a.xAxis[0], d = this.reversedExtremes;
                0 === b ? (this.grabbedLeft = !0, this.otherHandlePos = this.zoomedMax, this.fixedExtreme = d ? c.min : c.max) : (this.grabbedRight = !0, this.otherHandlePos = this.zoomedMin, this.fixedExtreme = d ? c.max : c.min);
                a.fixedRange = null
            }, onMouseMove: function (a) {
                var d = this, g = d.chart, e = d.left, f = d.navigatorSize, k = d.range, l = d.dragOffset,
                    m = g.inverted;
                a.touches &&
                0 === a.touches[0].pageX || (a = g.pointer.normalize(a), g = a.chartX, m && (e = d.top, g = a.chartY), d.grabbedLeft ? (d.hasDragged = !0, d.render(0, 0, g - e, d.otherHandlePos)) : d.grabbedRight ? (d.hasDragged = !0, d.render(0, 0, d.otherHandlePos, g - e)) : d.grabbedCenter && (d.hasDragged = !0, g < l ? g = l : g > f + l - k && (g = f + l - k), d.render(0, 0, g - l, g - l + k)), d.hasDragged && d.scrollbar && c(d.scrollbar.options.liveRedraw, b.svg && !h && !this.chart.isBoosting) && (a.DOMType = a.type, setTimeout(function () {
                    d.onMouseUp(a)
                }, 0)))
            }, onMouseUp: function (a) {
                var b = this.chart,
                    c = this.xAxis, d = this.scrollbar, g, e, f = a.DOMEvent || a;
                (!this.hasDragged || d && d.hasDragged) && "scrollbar" !== a.trigger || (d = this.getUnionExtremes(), this.zoomedMin === this.otherHandlePos ? g = this.fixedExtreme : this.zoomedMax === this.otherHandlePos && (e = this.fixedExtreme), this.zoomedMax === this.size && (e = this.reversedExtremes ? d.dataMin : d.dataMax), 0 === this.zoomedMin && (g = this.reversedExtremes ? d.dataMax : d.dataMin), c = c.toFixedRange(this.zoomedMin, this.zoomedMax, g, e), m(c.min) && b.xAxis[0].setExtremes(Math.min(c.min, c.max),
                    Math.max(c.min, c.max), !0, this.hasDragged ? !1 : null, {
                        trigger: "navigator",
                        triggerOp: "navigator-drag",
                        DOMEvent: f
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
                a[0] && (!1 !== this.navigatorOptions.adaptToUpdatedData && a.forEach(function (a) {
                    t(a, "updatedData", this.updatedDataHandler)
                }, this), a[0].xAxis && t(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes))
            }, init: function (b) {
                var g = b.options, e = g.navigator, h = e.enabled, k = g.scrollbar, l = k.enabled, g = h ? e.height : 0,
                    m = l ? k.height : 0;
                this.handles = [];
                this.shades = [];
                this.chart = b;
                this.setBaseSeries();
                this.height = g;
                this.scrollbarHeight = m;
                this.scrollbarEnabled = l;
                this.navigatorEnabled = h;
                this.navigatorOptions = e;
                this.scrollbarOptions =
                    k;
                this.outlineHeight = g + m;
                this.opposite = c(e.opposite, !h && b.inverted);
                var p = this, h = p.baseSeries, k = b.xAxis.length, l = b.yAxis.length,
                    r = h && h[0] && h[0].xAxis || b.xAxis[0] || {options: {}};
                b.isDirtyBox = !0;
                p.navigatorEnabled ? (p.xAxis = new u(b, a({
                    breaks: r.options.breaks,
                    ordinal: r.options.ordinal
                }, e.xAxis, {
                    id: "navigator-x-axis",
                    yAxis: "navigator-y-axis",
                    isX: !0,
                    type: "datetime",
                    index: k,
                    isInternal: !0,
                    offset: 0,
                    keepOrdinalPadding: !0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: 0,
                    maxPadding: 0,
                    zoomEnabled: !1
                }, b.inverted ? {
                    offsets: [m,
                        0, -m, 0], width: g
                } : {offsets: [0, -m, 0, m], height: g})), p.yAxis = new u(b, a(e.yAxis, {
                    id: "navigator-y-axis",
                    alignTicks: !1,
                    offset: 0,
                    index: l,
                    isInternal: !0,
                    zoomEnabled: !1
                }, b.inverted ? {width: g} : {height: g})), h || e.series.data ? p.updateNavigatorSeries(!1) : 0 === b.series.length && (p.unbindRedraw = f(b, "beforeRedraw", function () {
                    0 < b.series.length && !p.series && (p.setBaseSeries(), p.unbindRedraw())
                })), p.reversedExtremes = b.inverted && !p.xAxis.reversed || !b.inverted && p.xAxis.reversed, p.renderElements(), p.addMouseEvents()) : p.xAxis =
                    {
                        translate: function (a, c) {
                            var d = b.xAxis[0], g = d.getExtremes(), e = d.len - 2 * m,
                                f = G("min", d.options.min, g.dataMin), d = G("max", d.options.max, g.dataMax) - f;
                            return c ? a * d / e + f : e * (a - f) / d
                        }, toPixels: function (a) {
                            return this.translate(a)
                        }, toValue: function (a) {
                            return this.translate(a, !0)
                        }, toFixedRange: u.prototype.toFixedRange, fake: !0
                    };
                b.options.scrollbar.enabled && (b.scrollbar = p.scrollbar = new d(b.renderer, a(b.options.scrollbar, {
                    margin: p.navigatorEnabled ? 0 : 10,
                    vertical: b.inverted
                }), b), f(p.scrollbar, "changed", function (a) {
                    var c =
                        p.size, d = c * this.to, c = c * this.from;
                    p.hasDragged = p.scrollbar.hasDragged;
                    p.render(0, 0, c, d);
                    (b.options.scrollbar.liveRedraw || "mousemove" !== a.DOMType && "touchmove" !== a.DOMType) && setTimeout(function () {
                        p.onMouseUp(a)
                    })
                }));
                p.addBaseSeriesEvents();
                p.addChartEvents()
            }, getUnionExtremes: function (a) {
                var b = this.chart.xAxis[0], d = this.xAxis, g = d.options, e = b.options, f;
                a && null === b.dataMin || (f = {
                    dataMin: c(g && g.min, G("min", e.min, b.dataMin, d.dataMin, d.min)),
                    dataMax: c(g && g.max, G("max", e.max, b.dataMax, d.dataMax, d.max))
                });
                return f
            },
            setBaseSeries: function (a, c) {
                var d = this.chart, g = this.baseSeries = [];
                a = a || d.options && d.options.navigator.baseSeries || (d.series.length ? b.find(d.series, function (a) {
                    return !a.options.isInternal
                }).index : 0);
                (d.series || []).forEach(function (b, c) {
                    b.options.isInternal || !b.options.showInNavigator && (c !== a && b.options.id !== a || !1 === b.options.showInNavigator) || g.push(b)
                });
                this.xAxis && !this.xAxis.fake && this.updateNavigatorSeries(!0, c)
            }, updateNavigatorSeries: function (c, d) {
                var g = this, e = g.chart, f = g.baseSeries, h, k, l = g.navigatorOptions.series,
                    n, m = {
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
                    }, r = g.series = (g.series || []).filter(function (a) {
                        var b = a.baseSeries;
                        return 0 > f.indexOf(b) ? (b && (t(b, "updatedData", g.updatedDataHandler), delete b.navigatorSeries), a.chart && a.destroy(), !1) : !0
                    });
                f && f.length && f.forEach(function (b) {
                    var c = b.navigatorSeries, q = p({color: b.color, visible: b.visible}, D(l) ? A.navigator.series :
                        l);
                    c && !1 === g.navigatorOptions.adaptToUpdatedData || (m.name = "Navigator " + f.length, h = b.options || {}, n = h.navigatorOptions || {}, k = a(h, m, q, n), q = n.data || q.data, g.hasNavigatorData = g.hasNavigatorData || !!q, k.data = q || h.data && h.data.slice(0), c && c.options ? c.update(k, d) : (b.navigatorSeries = e.initSeries(k), b.navigatorSeries.baseSeries = b, r.push(b.navigatorSeries)))
                });
                if (l.data && (!f || !f.length) || D(l)) g.hasNavigatorData = !1, l = b.splat(l), l.forEach(function (b, c) {
                    m.name = "Navigator " + (r.length + 1);
                    k = a(A.navigator.series, {
                        color: e.series[c] &&
                            !e.series[c].options.isInternal && e.series[c].color || e.options.colors[c] || e.options.colors[0]
                    }, m, b);
                    k.data = b.data;
                    k.data && (g.hasNavigatorData = !0, r.push(e.initSeries(k)))
                });
                c && this.addBaseSeriesEvents()
            }, addBaseSeriesEvents: function () {
                var a = this, b = a.baseSeries || [];
                b[0] && b[0].xAxis && f(b[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes);
                b.forEach(function (b) {
                    f(b, "show", function () {
                        this.navigatorSeries && this.navigatorSeries.setVisible(!0, !1)
                    });
                    f(b, "hide", function () {
                        this.navigatorSeries && this.navigatorSeries.setVisible(!1,
                            !1)
                    });
                    !1 !== this.navigatorOptions.adaptToUpdatedData && b.xAxis && f(b, "updatedData", this.updatedDataHandler);
                    f(b, "remove", function () {
                        this.navigatorSeries && (B(a.series, this.navigatorSeries), m(this.navigatorSeries.options) && this.navigatorSeries.remove(!1), delete this.navigatorSeries)
                    })
                }, this)
            }, getBaseSeriesMin: function (a) {
                return this.baseSeries.reduce(function (a, b) {
                    return Math.min(a, b.xData ? b.xData[0] : a)
                }, a)
            }, modifyNavigatorAxisExtremes: function () {
                var a = this.xAxis, b;
                a.getExtremes && (!(b = this.getUnionExtremes(!0)) ||
                    b.dataMin === a.min && b.dataMax === a.max || (a.min = b.dataMin, a.max = b.dataMax))
            }, modifyBaseAxisExtremes: function () {
                var a = this.chart.navigator, b = this.getExtremes(), d = b.dataMin, e = b.dataMax, b = b.max - b.min,
                    f = a.stickToMin, h = a.stickToMax, k = c(this.options.overscroll, 0), l, m,
                    p = a.series && a.series[0], r = !!this.setExtremes;
                this.eventArgs && "rangeSelectorButton" === this.eventArgs.trigger || (f && (m = d, l = m + b), h && (l = e + k, f || (m = Math.max(l - b, a.getBaseSeriesMin(p && p.xData ? p.xData[0] : -Number.MAX_VALUE)))), r && (f || h) && C(m) && (this.min =
                    this.userMin = m, this.max = this.userMax = l));
                a.stickToMin = a.stickToMax = null
            }, updatedDataHandler: function () {
                var a = this.chart.navigator, b = this.navigatorSeries, c = a.getBaseSeriesMin(this.xData[0]);
                a.stickToMax = a.reversedExtremes ? 0 === Math.round(a.zoomedMin) : Math.round(a.zoomedMax) >= Math.round(a.size);
                a.stickToMin = C(this.xAxis.min) && this.xAxis.min <= c && (!this.chart.fixedRange || !a.stickToMax);
                b && !a.hasNavigatorData && (b.options.pointStart = this.xData[0], b.setData(this.options.data, !1, null, !1))
            }, addChartEvents: function () {
                this.eventsToUnbind ||
                (this.eventsToUnbind = []);
                this.eventsToUnbind.push(f(this.chart, "redraw", function () {
                    var a = this.navigator,
                        b = a && (a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis || a.scrollbar && this.xAxis[0]);
                    b && a.render(b.min, b.max)
                }), f(this.chart, "getMargins", function () {
                    var a = this.navigator, b = a.opposite ? "plotTop" : "marginBottom";
                    this.inverted && (b = a.opposite ? "marginRight" : "plotLeft");
                    this[b] = (this[b] || 0) + (a.navigatorEnabled || !this.inverted ? a.outlineHeight : 0) + a.navigatorOptions.margin
                }))
            }, destroy: function () {
                this.removeEvents();
                this.xAxis && (B(this.chart.xAxis, this.xAxis), B(this.chart.axes, this.xAxis));
                this.yAxis && (B(this.chart.yAxis, this.yAxis), B(this.chart.axes, this.yAxis));
                (this.series || []).forEach(function (a) {
                    a.destroy && a.destroy()
                });
                "series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" ").forEach(function (a) {
                    this[a] && this[a].destroy && this[a].destroy();
                    this[a] = null
                }, this);
                [this.handles].forEach(function (a) {
                    z(a)
                }, this)
            }
        };
        b.Navigator || (b.Navigator = w,
            f(u, "zoom", function (a) {
                var b = this.chart.options, c = b.chart.zoomType, d = b.chart.pinchType, e = b.navigator,
                    b = b.rangeSelector;
                this.isXAxis && (e && e.enabled || b && b.enabled) && ("y" === c ? a.zoomed = !1 : (!h && "xy" === c || h && "xy" === d) && this.options.range && (c = this.previousZoom, m(a.newMin) ? this.previousZoom = [this.min, this.max] : c && (a.newMin = c[0], a.newMax = c[1], delete this.previousZoom)));
                void 0 !== a.zoomed && a.preventDefault()
            }), f(r, "beforeShowResetZoom", function () {
            var a = this.options, b = a.navigator, c = a.rangeSelector;
            if ((b && b.enabled ||
                c && c.enabled) && (!h && "x" === a.chart.zoomType || h && "x" === a.chart.pinchType)) return !1
        }), f(r, "beforeRender", function () {
            var a = this.options;
            if (a.navigator.enabled || a.scrollbar.enabled) this.scroller = this.navigator = new w(this)
        }), f(r, "afterSetChartSize", function () {
            var a = this.legend, b = this.navigator, d, e, f, h;
            b && (e = a && a.options, f = b.xAxis, h = b.yAxis, d = b.scrollbarHeight, this.inverted ? (b.left = b.opposite ? this.chartWidth - d - b.height : this.spacing[3] + d, b.top = this.plotTop + d) : (b.left = this.plotLeft + d, b.top = b.navigatorOptions.top ||
                this.chartHeight - b.height - d - this.spacing[2] - (this.rangeSelector && this.extraBottomMargin ? this.rangeSelector.getHeight() : 0) - (e && "bottom" === e.verticalAlign && e.enabled && !e.floating ? a.legendHeight + c(e.margin, 10) : 0)), f && h && (this.inverted ? f.options.left = h.options.left = b.left : f.options.top = h.options.top = b.top, f.setAxisSize(), h.setAxisSize()))
        }), f(r, "update", function (b) {
            var c = b.options.navigator || {}, d = b.options.scrollbar || {};
            this.navigator || this.scroller || !c.enabled && !d.enabled || (a(!0, this.options.navigator,
                c), a(!0, this.options.scrollbar, d), delete b.options.navigator, delete b.options.scrollbar)
        }), f(r, "afterUpdate", function (a) {
            this.navigator || this.scroller || !this.options.navigator.enabled && !this.options.scrollbar.enabled || (this.scroller = this.navigator = new w(this), c(a.redraw, !0) && this.redraw(a.animation))
        }), f(r, "afterAddSeries", function () {
            this.navigator && this.navigator.setBaseSeries(null, !1)
        }), f(e, "afterUpdate", function () {
            this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(null,
                !1)
        }), r.prototype.callbacks.push(function (a) {
            var b = a.navigator;
            b && a.xAxis[0] && (a = a.xAxis[0].getExtremes(), b.render(a.min, a.max))
        }))
    });
    I(z, "masters/modules/gantt.src.js", [], function () {
    })
});
//# sourceMappingURL=gantt.js.map
