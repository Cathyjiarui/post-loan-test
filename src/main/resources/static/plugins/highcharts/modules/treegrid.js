/*
 Highcharts JS v7.1.2 (2019-06-03)

 Tree Grid

 (c) 2016-2019 Jon Arild Nygard

 License: www.highcharts.com/license
*/
(function (k) {
    "object" === typeof module && module.exports ? (k["default"] = k, module.exports = k) : "function" === typeof define && define.amd ? define("highcharts/modules/treegrid", ["highcharts"], function (A) {
        k(A);
        k.Highcharts = A;
        return k
    }) : k("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (k) {
    function A(b, w, k, p) {
        b.hasOwnProperty(w) || (b[w] = p.apply(null, k))
    }

    k = k ? k._modules : {};
    A(k, "parts-gantt/GridAxis.js", [k["parts/Globals.js"]], function (b) {
        var w = b.addEvent, k = b.dateFormat, p = b.defined, B = b.isArray, y = b.isNumber,
            v = function (a) {
                return b.isObject(a, !0)
            }, m = b.merge, q = b.pick, h = b.wrap, f = b.Chart, d = b.Axis, n = b.Tick, l = function (a) {
                var e = a.options, g = e && v(e.grid) ? e.grid : {}, c = 25 / 11,
                    t = a.chart.renderer.fontMetrics(e.labels.style.fontSize);
                e.labels || (e.labels = {});
                e.labels.align = q(e.labels.align, "center");
                a.categories || (e.showLastLabel = !1);
                a.horiz && (e.tickLength = g.cellHeight || t.h * c);
                a.labelRotation = 0;
                e.labels.rotation = 0
            }, c = {top: 0, right: 1, bottom: 2, left: 3, 0: "top", 1: "right", 2: "bottom", 3: "left"};
        d.prototype.isNavigatorAxis = function () {
            return /highcharts-navigator-[xy]axis/.test(this.options.className)
        };
        d.prototype.isOuterAxis = function () {
            var a = this, e = -1, g = !0;
            a.chart.axes.forEach(function (c, t) {
                c.side !== a.side || c.isNavigatorAxis() || (c === a ? e = t : 0 <= e && t > e && (g = !1))
            });
            g && y(a.columnIndex) && (g = (a.linkedParent && a.linkedParent.columns || a.columns).length === a.columnIndex);
            return g
        };
        d.prototype.getMaxLabelDimensions = function (a, e) {
            var g = {width: 0, height: 0};
            e.forEach(function (e) {
                e = a[e];
                var c;
                v(e) && (c = v(e.label) ? e.label : {}, e = c.getBBox ? c.getBBox().height : 0, c.textStr && !y(c.textPxLength) && (c.textPxLength = c.getBBox().width),
                    c = y(c.textPxLength) ? c.textPxLength : 0, g.height = Math.max(e, g.height), g.width = Math.max(c, g.width))
            });
            return g
        };
        b.dateFormats.W = function (a) {
            a = new Date(a);
            var e;
            a.setHours(0, 0, 0, 0);
            a.setDate(a.getDate() - (a.getDay() || 7));
            e = new Date(a.getFullYear(), 0, 1);
            return Math.ceil(((a - e) / 864E5 + 1) / 7)
        };
        b.dateFormats.E = function (a) {
            return k("%a", a, !0).charAt(0)
        };
        w(n, "afterGetLabelPosition", function (a) {
            var e = this.label, g = this.axis, d = g.reversed, t = g.chart, f = g.options,
                b = f && v(f.grid) ? f.grid : {}, f = g.options.labels, n = f.align,
                h = c[g.side], m = a.tickmarkOffset, u = g.tickPositions, r = this.pos - m,
                u = y(u[a.index + 1]) ? u[a.index + 1] - m : g.max + m, x = g.tickSize("tick", !0), m = B(x) ? x[0] : 0,
                x = x && x[1] / 2, l;
            !0 === b.enabled && ("top" === h ? (b = g.top + g.offset, l = b - m) : "bottom" === h ? (l = t.chartHeight - g.bottom + g.offset, b = l + m) : (b = g.top + g.len - g.translate(d ? u : r), l = g.top + g.len - g.translate(d ? r : u)), "right" === h ? (h = t.chartWidth - g.right + g.offset, d = h + m) : "left" === h ? (d = g.left + g.offset, h = d - m) : (h = Math.round(g.left + g.translate(d ? u : r)) - x, d = Math.round(g.left + g.translate(d ? r : u)) -
                x), this.slotWidth = d - h, a.pos.x = "left" === n ? h : "right" === n ? d : h + (d - h) / 2, a.pos.y = l + (b - l) / 2, t = t.renderer.fontMetrics(f.style.fontSize, e.element), e = e.getBBox().height, f.useHTML ? a.pos.y += t.b + -(e / 2) : (e = Math.round(e / t.h), a.pos.y += (t.b - (t.h - t.f)) / 2 + -((e - 1) * t.h / 2)), a.pos.x += g.horiz && f.x || 0)
        });
        w(d, "afterTickSize", function (a) {
            var e = this.maxLabelDimensions, g = this.options;
            !0 === (g && v(g.grid) ? g.grid : {}).enabled && (g = 2 * Math.abs(this.defaultLeftAxisOptions.labels.x), e = g + (this.horiz ? e.height : e.width), B(a.tickSize) ? a.tickSize[0] =
                e : a.tickSize = [e])
        });
        w(d, "afterGetTitlePosition", function (a) {
            var e = this.options;
            if (!0 === (e && v(e.grid) ? e.grid : {}).enabled) {
                var g = this.axisTitle, d = g && g.getBBox().width, f = this.horiz, b = this.left, h = this.top,
                    n = this.width, m = this.height, l = e.title, e = this.opposite, u = this.offset,
                    r = this.tickSize() || [0], x = l.x || 0, G = l.y || 0, H = q(l.margin, f ? 5 : 10),
                    g = this.chart.renderer.fontMetrics(l.style && l.style.fontSize, g).f,
                    r = (f ? h + m : b) + r[0] / 2 * (e ? -1 : 1) * (f ? 1 : -1) + (this.side === c.bottom ? g : 0);
                a.titlePosition.x = f ? b - d / 2 - H + x : r + (e ? n : 0) + u +
                    x;
                a.titlePosition.y = f ? r - (e ? m : 0) + (e ? g : -g) / 2 + u + G : h - H + G
            }
        });
        h(d.prototype, "unsquish", function (a) {
            var e = this.options;
            return !0 === (e && v(e.grid) ? e.grid : {}).enabled && this.categories ? this.tickInterval : a.apply(this, Array.prototype.slice.call(arguments, 1))
        });
        w(d, "afterSetOptions", function (a) {
            var e = this.options;
            a = a.userOptions;
            var g, c = e && v(e.grid) ? e.grid : {};
            !0 === c.enabled && (g = m(!0, {
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
            }, a), "xAxis" === this.coll && (p(a.linkedTo) && !p(a.tickPixelInterval) && (g.tickPixelInterval = 350), p(a.tickPixelInterval) || !p(a.linkedTo) || p(a.tickPositioner) || p(a.tickInterval) || (g.tickPositioner =
                function (a, e) {
                    var c = this.linkedParent && this.linkedParent.tickPositions && this.linkedParent.tickPositions.info;
                    if (c) {
                        var d, f, h, u, r = g.units;
                        for (u = 0; u < r.length; u++) if (r[u][0] === c.unitName) {
                            d = u;
                            break
                        }
                        if (r[d][1]) return r[d + 1] && (h = r[d + 1][0], f = (r[d + 1][1] || [1])[0]), c = b.timeUnits[h], this.tickInterval = c * f, this.getTimeTicks({
                            unitRange: c,
                            count: f,
                            unitName: h
                        }, a, e, this.options.startOfWeek)
                    }
                })), m(!0, this.options, g), this.horiz && (e.minPadding = q(a.minPadding, 0), e.maxPadding = q(a.maxPadding, 0)), y(e.grid.borderWidth) &&
            (e.tickWidth = e.lineWidth = c.borderWidth))
        });
        w(d, "afterSetAxisTranslation", function () {
            var a = this.options, e = a && v(a.grid) ? a.grid : {}, c = this.tickPositions && this.tickPositions.info,
                d = this.userOptions.labels || {};
            this.horiz && (!0 === e.enabled && this.series.forEach(function (a) {
                a.options.pointRange = 0
            }), c && (!1 === a.dateTimeLabelFormats[c.unitName].range || 1 < c.count) && !p(d.align) && (a.labels.align = "left", p(d.x) || (a.labels.x = 3)))
        });
        w(d, "trimTicks", function () {
            var a = this.options, e = a && v(a.grid) ? a.grid : {}, c = this.categories,
                d = this.tickPositions, f = d[0], b = d[d.length - 1],
                h = this.linkedParent && this.linkedParent.min || this.min,
                n = this.linkedParent && this.linkedParent.max || this.max, l = this.tickInterval;
            !0 !== e.enabled || c || !this.horiz && !this.isLinked || (f < h && f + l > h && !a.startOnTick && (d[0] = h), b > n && b - l < n && !a.endOnTick && (d[d.length - 1] = n))
        });
        w(d, "afterRender", function () {
            var a = this.options, e = a && v(a.grid) ? a.grid : {}, g, d, f, h, b, n, l = this.chart.renderer,
                m = this.horiz;
            if (!0 === e.enabled) {
                e = 2 * Math.abs(this.defaultLeftAxisOptions.labels.x);
                this.maxLabelDimensions =
                    this.getMaxLabelDimensions(this.ticks, this.tickPositions);
                e = this.maxLabelDimensions.width + e;
                g = a.lineWidth;
                this.rightWall && this.rightWall.destroy();
                d = this.axisGroup.getBBox();
                if (this.isOuterAxis() && this.axisLine && (m && (e = d.height - 1), g)) {
                    d = this.getLinePath(g);
                    b = d.indexOf("M") + 1;
                    n = d.indexOf("L") + 1;
                    f = d.indexOf("M") + 2;
                    h = d.indexOf("L") + 2;
                    if (this.side === c.top || this.side === c.left) e = -e;
                    m ? (d[f] += e, d[h] += e) : (d[b] += e, d[n] += e);
                    this.axisLineExtra ? this.axisLineExtra.animate({d: d}) : this.axisLineExtra = l.path(d).attr({
                        stroke: a.lineColor,
                        "stroke-width": g, zIndex: 7
                    }).addClass("highcharts-axis-line").add(this.axisGroup);
                    this.axisLine[this.showAxis ? "show" : "hide"](!0)
                }
                (this.columns || []).forEach(function (a) {
                    a.render()
                })
            }
        });
        var C = {
            afterGetOffset: function () {
                (this.columns || []).forEach(function (a) {
                    a.getOffset()
                })
            }, afterInit: function () {
                var a = this.chart, e = this.userOptions, c = this.options, c = c && v(c.grid) ? c.grid : {};
                c.enabled && (l(this), h(this, "labelFormatter", function (a) {
                    var c = this.axis, e = c.tickPositions, d = this.value, g = (c.isLinked ? c.linkedParent :
                        c).series[0], r = d === e[0], e = d === e[e.length - 1],
                        g = g && b.find(g.options.data, function (a) {
                            return a[c.isXAxis ? "x" : "y"] === d
                        });
                    this.isFirst = r;
                    this.isLast = e;
                    this.point = g;
                    return a.call(this)
                }));
                if (c.columns) for (var f = this.columns = [], n = this.columnIndex = 0; ++n < c.columns.length;) {
                    var q = m(e, c.columns[c.columns.length - n - 1], {linkedTo: 0, type: "category"});
                    delete q.grid.columns;
                    q = new d(this.chart, q, !0);
                    q.isColumn = !0;
                    q.columnIndex = n;
                    b.erase(a.axes, q);
                    b.erase(a[this.coll], q);
                    f.push(q)
                }
            }, afterSetOptions: function (a) {
                a = (a =
                    a.userOptions) && v(a.grid) ? a.grid : {};
                var c = a.columns;
                a.enabled && c && m(!0, this.options, c[c.length - 1])
            }, afterSetScale: function () {
                (this.columns || []).forEach(function (a) {
                    a.setScale()
                })
            }, destroy: function (a) {
                (this.columns || []).forEach(function (c) {
                    c.destroy(a.keepEvents)
                })
            }, init: function (a) {
                var c = (a = a.userOptions) && v(a.grid) ? a.grid : {};
                c.enabled && p(c.borderColor) && (a.tickColor = a.lineColor = c.borderColor)
            }
        };
        Object.keys(C).forEach(function (a) {
            w(d, a, C[a])
        });
        w(f, "afterSetChartSize", function () {
            this.axes.forEach(function (a) {
                (a.columns ||
                    []).forEach(function (a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                })
            })
        })
    });
    A(k, "parts-gantt/Tree.js", [k["parts/Globals.js"]], function (b) {
        var w = b.extend, k = b.isNumber, p = b.pick, B = function (b, m) {
            var q = b.reduce(function (b, f) {
                var d = p(f.parent, "");
                void 0 === b[d] && (b[d] = []);
                b[d].push(f);
                return b
            }, {});
            Object.keys(q).forEach(function (b, f) {
                var d = q[b];
                "" !== b && -1 === m.indexOf(b) && (d.forEach(function (d) {
                    f[""].push(d)
                }), delete f[b])
            });
            return q
        }, y = function (b, m, q, h, f, d) {
            var n = 0, l = 0, c = d && d.after, C = d && d.before;
            m = {
                data: h, depth: q -
                    1, id: b, level: q, parent: m
            };
            var a, e;
            "function" === typeof C && C(m, d);
            C = (f[b] || []).map(function (c) {
                var g = y(c.id, b, q + 1, c, f, d), h = c.start;
                c = !0 === c.milestone ? h : c.end;
                a = !k(a) || h < a ? h : a;
                e = !k(e) || c > e ? c : e;
                n = n + 1 + g.descendants;
                l = Math.max(g.height + 1, l);
                return g
            });
            h && (h.start = p(h.start, a), h.end = p(h.end, e));
            w(m, {children: C, descendants: n, height: l});
            "function" === typeof c && c(m, d);
            return m
        };
        return {
            getListOfParents: B, getNode: y, getTree: function (b, m) {
                var q = b.map(function (b) {
                    return b.id
                });
                b = B(b, q);
                return y("", null, 1, null, b, m)
            }
        }
    });
    A(k, "mixins/tree-series.js", [k["parts/Globals.js"]], function (b) {
        var k = b.extend, z = b.isArray, p = b.isObject, B = b.isNumber, y = b.merge, v = b.pick;
        return {
            getColor: function (m, q) {
                var h = q.index, f = q.mapOptionsToLevel, d = q.parentColor, n = q.parentColorIndex, l = q.series,
                    c = q.colors, k = q.siblings, a = l.points, e = l.chart.options.chart, g, p, t, w;
                if (m) {
                    a = a[m.i];
                    m = f[m.level] || {};
                    if (f = a && m.colorByPoint) p = a.index % (c ? c.length : e.colorCount), g = c && c[p];
                    if (!l.chart.styledMode) {
                        c = a && a.options.color;
                        e = m && m.color;
                        if (t = d) t = (t = m && m.colorVariation) &&
                        "brightness" === t.key ? b.color(d).brighten(h / k * t.to).get() : d;
                        t = v(c, e, g, t, l.color)
                    }
                    w = v(a && a.options.colorIndex, m && m.colorIndex, p, n, q.colorIndex)
                }
                return {color: t, colorIndex: w}
            }, getLevelOptions: function (b) {
                var m = null, h, f, d, n;
                if (p(b)) for (m = {}, d = B(b.from) ? b.from : 1, n = b.levels, f = {}, h = p(b.defaults) ? b.defaults : {}, z(n) && (f = n.reduce(function (b, c) {
                    var f, a;
                    p(c) && B(c.level) && (a = y({}, c), f = "boolean" === typeof a.levelIsConstant ? a.levelIsConstant : h.levelIsConstant, delete a.levelIsConstant, delete a.level, c = c.level + (f ? 0 :
                        d - 1), p(b[c]) ? k(b[c], a) : b[c] = a);
                    return b
                }, {})), n = B(b.to) ? b.to : 1, b = 0; b <= n; b++) m[b] = y({}, h, p(f[b]) ? f[b] : {});
                return m
            }, setTreeValues: function q(b, f) {
                var d = f.before, n = f.idRoot, l = f.mapIdToNode[n], c = f.points[b.i], h = c && c.options || {},
                    a = 0, e = [];
                k(b, {
                    levelDynamic: b.level - (("boolean" === typeof f.levelIsConstant ? f.levelIsConstant : 1) ? 0 : l.level),
                    name: v(c && c.name, ""),
                    visible: n === b.id || ("boolean" === typeof f.visible ? f.visible : !1)
                });
                "function" === typeof d && (b = d(b, f));
                b.children.forEach(function (c, d) {
                    var g = k({}, f);
                    k(g,
                        {index: d, siblings: b.children.length, visible: b.visible});
                    c = q(c, g);
                    e.push(c);
                    c.visible && (a += c.val)
                });
                b.visible = 0 < a || b.visible;
                d = v(h.value, a);
                k(b, {children: e, childrenTotal: a, isLeaf: b.visible && !a, val: d});
                return b
            }, updateRootId: function (b) {
                var h;
                p(b) && (h = p(b.options) ? b.options : {}, h = v(b.rootNode, h.rootId, ""), p(b.userOptions) && (b.userOptions.rootId = h), b.rootNode = h);
                return h
            }
        }
    });
    A(k, "modules/broken-axis.src.js", [k["parts/Globals.js"]], function (b) {
        var k = b.addEvent, z = b.pick, p = b.extend, B = b.isArray, y = b.find,
            v = b.fireEvent, m = b.Axis, q = b.Series, h = function (b, d) {
                return y(d, function (d) {
                    return d.from < b && b < d.to
                })
            };
        p(m.prototype, {
            isInBreak: function (b, d) {
                var f = b.repeat || Infinity, l = b.from, c = b.to - b.from;
                d = d >= l ? (d - l) % f : f - (l - d) % f;
                return b.inclusive ? d <= c : d < c && 0 !== d
            }, isInAnyBreak: function (b, d) {
                var f = this.options.breaks, l = f && f.length, c, h, a;
                if (l) {
                    for (; l--;) this.isInBreak(f[l], b) && (c = !0, h || (h = z(f[l].showPoints, !this.isXAxis)));
                    a = c && d ? c && !h : c
                }
                return a
            }
        });
        k(m, "afterInit", function () {
            "function" === typeof this.setBreaks && this.setBreaks(this.options.breaks,
                !1)
        });
        k(m, "afterSetTickPositions", function () {
            if (this.isBroken) {
                var b = this.tickPositions, d = this.tickPositions.info, h = [], l;
                for (l = 0; l < b.length; l++) this.isInAnyBreak(b[l]) || h.push(b[l]);
                this.tickPositions = h;
                this.tickPositions.info = d
            }
        });
        k(m, "afterSetOptions", function () {
            this.isBroken && (this.options.ordinal = !1)
        });
        m.prototype.setBreaks = function (b, d) {
            function f(a) {
                var b = a, d, f;
                for (f = 0; f < c.breakArray.length; f++) if (d = c.breakArray[f], d.to <= a) b -= d.len; else if (d.from >= a) break; else if (c.isInBreak(d, a)) {
                    b -= a - d.from;
                    break
                }
                return b
            }

            function l(a) {
                var b, d;
                for (d = 0; d < c.breakArray.length && !(b = c.breakArray[d], b.from >= a); d++) b.to < a ? a += b.len : c.isInBreak(b, a) && (a += b.len);
                return a
            }

            var c = this, k = B(b) && !!b.length;
            c.isDirty = c.isBroken !== k;
            c.isBroken = k;
            c.options.breaks = c.userOptions.breaks = b;
            c.forceRedraw = !0;
            k || c.val2lin !== f || (delete c.val2lin, delete c.lin2val);
            k && (c.userOptions.ordinal = !1, c.val2lin = f, c.lin2val = l, c.setExtremes = function (a, b, c, d, f) {
                if (this.isBroken) {
                    for (var e, g = this.options.breaks; e = h(a, g);) a = e.to;
                    for (; e = h(b,
                        g);) b = e.from;
                    b < a && (b = a)
                }
                m.prototype.setExtremes.call(this, a, b, c, d, f)
            }, c.setAxisTranslation = function (a) {
                m.prototype.setAxisTranslation.call(this, a);
                this.unitLength = null;
                if (this.isBroken) {
                    a = c.options.breaks;
                    var b = [], d = [], f = 0, h, l, n = c.userMin || c.min, k = c.userMax || c.max,
                        q = z(c.pointRangePadding, 0), p, u;
                    a.forEach(function (a) {
                        l = a.repeat || Infinity;
                        c.isInBreak(a, n) && (n += a.to % l - n % l);
                        c.isInBreak(a, k) && (k -= k % l - a.from % l)
                    });
                    a.forEach(function (a) {
                        p = a.from;
                        for (l = a.repeat || Infinity; p - l > n;) p -= l;
                        for (; p < n;) p += l;
                        for (u = p; u <
                        k; u += l) b.push({value: u, move: "in"}), b.push({
                            value: u + (a.to - a.from),
                            move: "out",
                            size: a.breakSize
                        })
                    });
                    b.sort(function (a, b) {
                        return a.value === b.value ? ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1) : a.value - b.value
                    });
                    h = 0;
                    p = n;
                    b.forEach(function (a) {
                        h += "in" === a.move ? 1 : -1;
                        1 === h && "in" === a.move && (p = a.value);
                        0 === h && (d.push({
                            from: p,
                            to: a.value,
                            len: a.value - p - (a.size || 0)
                        }), f += a.value - p - (a.size || 0))
                    });
                    c.breakArray = d;
                    c.unitLength = k - n - f + q;
                    v(c, "afterBreaks");
                    c.staticScale ? c.transA = c.staticScale : c.unitLength && (c.transA *= (k - c.min +
                        q) / c.unitLength);
                    q && (c.minPixelPadding = c.transA * c.minPointOffset);
                    c.min = n;
                    c.max = k
                }
            });
            z(d, !0) && this.chart.redraw()
        };
        k(q, "afterGeneratePoints", function () {
            var b = this.xAxis, d = this.yAxis, h = this.points, l, c = h.length, k = this.options.connectNulls, a;
            if (b && d && (b.options.breaks || d.options.breaks)) for (; c--;) l = h[c], a = null === l.y && !1 === k, a || !b.isInAnyBreak(l.x, !0) && !d.isInAnyBreak(l.y, !0) || (h.splice(c, 1), this.data[c] && this.data[c].destroyElements())
        });
        k(q, "afterRender", function () {
            this.drawBreaks(this.xAxis, ["x"]);
            this.drawBreaks(this.yAxis, z(this.pointArrayMap, ["y"]))
        });
        b.Series.prototype.drawBreaks = function (b, d) {
            var f = this, h = f.points, c, k, a, e;
            b && d.forEach(function (d) {
                c = b.breakArray || [];
                k = b.isXAxis ? b.min : z(f.options.threshold, b.min);
                h.forEach(function (f) {
                    e = z(f["stack" + d.toUpperCase()], f[d]);
                    c.forEach(function (c) {
                        a = !1;
                        if (k < c.from && e > c.to || k > c.from && e < c.from) a = "pointBreak"; else if (k < c.from && e > c.from && e < c.to || k > c.from && e > c.to && e < c.from) a = "pointInBreak";
                        a && v(b, a, {point: f, brk: c})
                    })
                })
            })
        };
        b.Series.prototype.gappedPath =
            function () {
                var f = this.currentDataGrouping, d = f && f.gapSize, f = this.options.gapSize, h = this.points.slice(),
                    l = h.length - 1, c = this.yAxis;
                if (f && 0 < l) for ("value" !== this.options.gapUnit && (f *= this.closestPointRange), d && d > f && (f = d); l--;) h[l + 1].x - h[l].x > f && (d = (h[l].x + h[l + 1].x) / 2, h.splice(l + 1, 0, {
                    isNull: !0,
                    x: d
                }), this.options.stacking && (d = c.stacks[this.stackKey][d] = new b.StackItem(c, c.options.stackLabels, !1, d, this.stack), d.total = 0));
                return this.getGraphPath(h)
            }
    });
    A(k, "parts-gantt/TreeGrid.js", [k["parts/Globals.js"],
        k["parts-gantt/Tree.js"], k["mixins/tree-series.js"]], function (b, k, z) {
        var p = b.addEvent, w = function (a) {
                return Array.prototype.slice.call(a, 1)
            }, y = b.defined, v = b.extend, m = b.find, q = b.fireEvent, h = z.getLevelOptions, f = b.merge, d = b.isNumber,
            n = function (a) {
                return b.isObject(a, !0)
            }, l = b.isString, c = b.pick, A = b.wrap;
        z = b.Axis;
        var a = b.Tick, e = function (a, b) {
            var c, d;
            for (c in b) b.hasOwnProperty(c) && (d = b[c], A(a, c, d))
        }, g = function (a, b) {
            var c = a.collapseStart;
            a = a.collapseEnd;
            a >= b && (c -= .5);
            return {from: c, to: a, showPoints: !1}
        }, I =
            function (a) {
                return Object.keys(a.mapOfPosToGridNode).reduce(function (b, c) {
                    c = +c;
                    a.min <= c && a.max >= c && !a.isInAnyBreak(c) && b.push(c);
                    return b
                }, [])
            }, t = function (a, b) {
            var c = a.options.breaks || [], d = g(b, a.max);
            return c.some(function (a) {
                return a.from === d.from && a.to === d.to
            })
        }, D = function (a, b) {
            var c = a.options.breaks || [];
            a = g(b, a.max);
            c.push(a);
            return c
        }, E = function (a, b) {
            var c = a.options.breaks || [], d = g(b, a.max);
            return c.reduce(function (a, b) {
                b.to === d.to && b.from === d.from || a.push(b);
                return a
            }, [])
        }, J = function (a, d) {
            var e =
                    a.labelIcon, f = !e, h = d.renderer, g = d.xy, r = d.options, l = r.width, k = r.height,
                m = g.x - l / 2 - r.padding, g = g.y - k / 2, n = d.collapsed ? 90 : 180, u = d.show && b.isNumber(g);
            f && (a.labelIcon = e = h.path(h.symbols[r.type](r.x, r.y, l, k)).addClass("highcharts-label-icon").add(d.group));
            u || e.attr({y: -9999});
            h.styledMode || e.attr({"stroke-width": 1, fill: c(d.color, "#666666")}).css({
                cursor: "pointer",
                stroke: r.lineColor,
                strokeWidth: r.lineWidth
            });
            e[f ? "attr" : "animate"]({translateX: m, translateY: g, rotation: n})
        }, K = function (a, b, c) {
            var d = [], e = [], f =
                {}, g = {}, h = -1, r = "boolean" === typeof b ? b : !1;
            a = k.getTree(a, {
                after: function (a) {
                    a = g[a.pos];
                    var b = 0, c = 0;
                    a.children.forEach(function (a) {
                        c += a.descendants + 1;
                        b = Math.max(a.height + 1, b)
                    });
                    a.descendants = c;
                    a.height = b;
                    a.collapsed && e.push(a)
                }, before: function (a) {
                    var b = n(a.data) ? a.data : {}, c = l(b.name) ? b.name : "", e = f[a.parent],
                        e = n(e) ? g[e.pos] : null, k = function (a) {
                            return a.name === c
                        }, x;
                    r && n(e) && (x = m(e.children, k)) ? (k = x.pos, x.nodes.push(a)) : k = h++;
                    g[k] || (g[k] = x = {
                        depth: e ? e.depth + 1 : 0,
                        name: c,
                        nodes: [a],
                        children: [],
                        pos: k
                    }, -1 !== k &&
                    d.push(c), n(e) && e.children.push(x));
                    l(a.id) && (f[a.id] = a);
                    !0 === b.collapsed && (x.collapsed = !0);
                    a.pos = k
                }
            });
            g = function (a, b) {
                var c = function (a, d, e) {
                    var f = d + (-1 === d ? 0 : b - 1), g = (f - d) / 2, h = d + g;
                    a.nodes.forEach(function (a) {
                        var b = a.data;
                        n(b) && (b.y = d + b.seriesIndex, delete b.seriesIndex);
                        a.pos = h
                    });
                    e[h] = a;
                    a.pos = h;
                    a.tickmarkOffset = g + .5;
                    a.collapseStart = f + .5;
                    a.children.forEach(function (a) {
                        c(a, f + 1, e);
                        f = a.collapseEnd - .5
                    });
                    a.collapseEnd = f + .5;
                    return e
                };
                return c(a["-1"], -1, {})
            }(g, c);
            return {
                categories: d, mapOfIdToNode: f, mapOfPosToGridNode: g,
                collapsedNodes: e, tree: a
            }
        }, F = function (a) {
            a.target.axes.filter(function (a) {
                return "treegrid" === a.options.type
            }).forEach(function (c) {
                var d = c.options || {}, e = d.labels, g, k = d.uniqueNames, l = 0, r;
                c.series.some(function (a) {
                    return !a.hasRendered || a.isDirtyData || a.isDirty
                }) && (d = c.series.reduce(function (a, b) {
                    b.visible && (b.options.data.forEach(function (b) {
                        n(b) && (b.seriesIndex = l, a.push(b))
                    }), !0 === k && l++);
                    return a
                }, []), r = K(d, k, !0 === k ? l : 1), c.categories = r.categories, c.mapOfPosToGridNode = r.mapOfPosToGridNode, c.hasNames =
                    !0, c.tree = r.tree, c.series.forEach(function (a) {
                    var b = a.options.data.map(function (a) {
                        return n(a) ? f(a) : a
                    });
                    a.visible && a.setData(b, !1)
                }), c.mapOptionsToLevel = h({
                    defaults: e,
                    from: 1,
                    levels: e.levels,
                    to: c.tree.height
                }), "beforeRender" === a.type && (g = b.addEvent(c, "foundExtremes", function () {
                    r.collapsedNodes.forEach(function (a) {
                        a = D(c, a);
                        c.setBreaks(a, !1)
                    });
                    g()
                })))
            })
        };
        e(z.prototype, {
            init: function (a, b, c) {
                var d = "treegrid" === c.type;
                d && (p(b, "beforeRender", F), p(b, "beforeRedraw", F), c = f({
                    grid: {enabled: !0}, labels: {
                        align: "left",
                        levels: [{level: void 0}, {level: 1, style: {fontWeight: "bold"}}],
                        symbol: {type: "triangle", x: -5, y: -5, height: 10, width: 10, padding: 5}
                    }, uniqueNames: !1
                }, c, {reversed: !0, grid: {columns: void 0}}));
                a.apply(this, [b, c]);
                d && (this.hasNames = !0, this.options.showLastLabel = !0)
            }, getMaxLabelDimensions: function (a) {
                var b = this.options, c = b && b.labels, b = c && d(c.indentation) ? b.labels.indentation : 0,
                    c = a.apply(this, w(arguments)), e;
                "treegrid" === this.options.type && this.mapOfPosToGridNode && (e = this.mapOfPosToGridNode[-1].height, c.width +=
                    b * (e - 1));
                return c
            }, generateTick: function (b, c) {
                var d = n(this.mapOptionsToLevel) ? this.mapOptionsToLevel : {}, e = this.ticks, f = e[c], g, h;
                "treegrid" === this.options.type ? (h = this.mapOfPosToGridNode[c], (d = d[h.depth]) && (g = {labels: d}), f ? (f.parameters.category = h.name, f.options = g, f.addLabel()) : e[c] = new a(this, c, null, void 0, {
                    category: h.name,
                    tickmarkOffset: h.tickmarkOffset,
                    options: g
                })) : b.apply(this, w(arguments))
            }, setTickInterval: function (a) {
                var b = this.options;
                "treegrid" === b.type ? (this.min = c(this.userMin, b.min, this.dataMin),
                    this.max = c(this.userMax, b.max, this.dataMax), q(this, "foundExtremes"), this.setAxisTranslation(!0), this.tickmarkOffset = .5, this.tickInterval = 1, this.tickPositions = this.mapOfPosToGridNode ? I(this) : []) : a.apply(this, w(arguments))
            }
        });
        e(a.prototype, {
            getLabelPosition: function (a, b, e, f, g, h, k, l, m) {
                var r = c(this.options && this.options.labels, h);
                h = this.pos;
                var p = this.axis, q = "treegrid" === p.options.type;
                a = a.apply(this, [b, e, f, g, r, k, l, m]);
                q && (b = r && n(r.symbol) ? r.symbol : {}, r = r && d(r.indentation) ? r.indentation : 0, h = (h = (p = p.mapOfPosToGridNode) &&
                    p[h]) && h.depth || 1, a.x += b.width + 2 * b.padding + (h - 1) * r);
                return a
            }, renderLabel: function (a) {
                var d = this, e = d.pos, f = d.axis, g = d.label, h = f.mapOfPosToGridNode, k = f.options,
                    l = c(d.options && d.options.labels, k && k.labels), m = l && n(l.symbol) ? l.symbol : {},
                    p = (h = h && h[e]) && h.depth, k = "treegrid" === k.type, q = !(!g || !g.element),
                    u = -1 < f.tickPositions.indexOf(e), e = f.chart.styledMode;
                k && h && q && g.addClass("highcharts-treegrid-node-level-" + p);
                a.apply(d, w(arguments));
                k && h && q && 0 < h.descendants && (f = t(f, h), J(d, {
                    color: !e && g.styles.color, collapsed: f,
                    group: g.parentGroup, options: m, renderer: g.renderer, show: u, xy: g.xy
                }), m = "highcharts-treegrid-node-" + (f ? "expanded" : "collapsed"), g.addClass("highcharts-treegrid-node-" + (f ? "collapsed" : "expanded")).removeClass(m), e || g.css({cursor: "pointer"}), [g, d.labelIcon].forEach(function (a) {
                    a.attachedTreeGridEvents || (b.addEvent(a.element, "mouseover", function () {
                        var a = g;
                        a.addClass("highcharts-treegrid-node-active");
                        a.renderer.styledMode || a.css({textDecoration: "underline"})
                    }), b.addEvent(a.element, "mouseout", function () {
                        var a =
                            g, b = l, b = y(b.style) ? b.style : {};
                        a.removeClass("highcharts-treegrid-node-active");
                        a.renderer.styledMode || a.css({textDecoration: b.textDecoration})
                    }), b.addEvent(a.element, "click", function () {
                        d.toggleCollapse()
                    }), a.attachedTreeGridEvents = !0)
                }))
            }
        });
        v(a.prototype, {
            collapse: function (a) {
                var b = this.axis, d = D(b, b.mapOfPosToGridNode[this.pos]);
                b.setBreaks(d, c(a, !0))
            }, expand: function (a) {
                var b = this.axis, d = E(b, b.mapOfPosToGridNode[this.pos]);
                b.setBreaks(d, c(a, !0))
            }, toggleCollapse: function (a) {
                var b = this.axis, d;
                d = b.mapOfPosToGridNode[this.pos];
                d = t(b, d) ? E(b, d) : D(b, d);
                b.setBreaks(d, c(a, !0))
            }
        });
        z.prototype.utils = {getNode: k.getNode}
    });
    A(k, "masters/modules/treegrid.src.js", [], function () {
    })
});
//# sourceMappingURL=treegrid.js.map
