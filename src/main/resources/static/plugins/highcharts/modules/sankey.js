/*
  Highcharts JS v7.1.2 (2019-06-03)

 Sankey diagram module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (d) {
    "object" === typeof module && module.exports ? (d["default"] = d, module.exports = d) : "function" === typeof define && define.amd ? define("highcharts/modules/sankey", ["highcharts"], function (n) {
        d(n);
        d.Highcharts = n;
        return d
    }) : d("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (d) {
    function n(e, d, t, h) {
        e.hasOwnProperty(d) || (e[d] = h.apply(null, t))
    }

    d = d ? d._modules : {};
    n(d, "mixins/nodes.js", [d["parts/Globals.js"]], function (e) {
        var d = e.pick, t = e.defined, h = e.Point;
        e.NodesMixin = {
            createNode: function (k) {
                function h(b,
                           c) {
                    return e.find(b, function (b) {
                        return b.id === c
                    })
                }

                var a = h(this.nodes, k), q = this.pointClass, b;
                a || (b = this.options.nodes && h(this.options.nodes, k), a = (new q).init(this, e.extend({
                    className: "highcharts-node",
                    isNode: !0,
                    id: k,
                    y: 1
                }, b)), a.linksTo = [], a.linksFrom = [], a.formatPrefix = "node", a.name = a.name || a.options.id, a.mass = d(a.options.mass, a.options.marker && a.options.marker.radius, this.options.marker && this.options.marker.radius, 4), a.getSum = function () {
                    var b = 0, c = 0;
                    a.linksTo.forEach(function (c) {
                        b += c.weight
                    });
                    a.linksFrom.forEach(function (b) {
                        c +=
                            b.weight
                    });
                    return Math.max(b, c)
                }, a.offset = function (b, c) {
                    for (var g = 0, f = 0; f < a[c].length; f++) {
                        if (a[c][f] === b) return g;
                        g += a[c][f].weight
                    }
                }, a.hasShape = function () {
                    var b = 0;
                    a.linksTo.forEach(function (c) {
                        c.outgoing && b++
                    });
                    return !a.linksTo.length || b !== a.linksTo.length
                }, this.nodes.push(a));
                return a
            }, generatePoints: function () {
                var k = {}, h = this.chart;
                e.Series.prototype.generatePoints.call(this);
                this.nodes || (this.nodes = []);
                this.colorCounter = 0;
                this.nodes.forEach(function (a) {
                    a.linksFrom.length = 0;
                    a.linksTo.length = 0;
                    a.level = void 0
                });
                this.points.forEach(function (a) {
                    t(a.from) && (k[a.from] || (k[a.from] = this.createNode(a.from)), k[a.from].linksFrom.push(a), a.fromNode = k[a.from], h.styledMode ? a.colorIndex = d(a.options.colorIndex, k[a.from].colorIndex) : a.color = a.options.color || k[a.from].color);
                    t(a.to) && (k[a.to] || (k[a.to] = this.createNode(a.to)), k[a.to].linksTo.push(a), a.toNode = k[a.to]);
                    a.name = a.name || a.id
                }, this);
                this.nodeLookup = k
            }, setData: function () {
                this.nodes && (this.nodes.forEach(function (e) {
                    e.destroy()
                }), this.nodes.length =
                    0);
                e.Series.prototype.setData.apply(this, arguments)
            }, destroy: function () {
                this.data = [].concat(this.points || [], this.nodes);
                return e.Series.prototype.destroy.apply(this, arguments)
            }, setNodeState: function () {
                var e = arguments;
                (this.isNode ? this.linksTo.concat(this.linksFrom) : [this.fromNode, this.toNode]).forEach(function (d) {
                    d.series && (h.prototype.setState.apply(d, e), d.isNode || (d.fromNode.graphic && h.prototype.setState.apply(d.fromNode, e), d.toNode.graphic && h.prototype.setState.apply(d.toNode, e)))
                });
                h.prototype.setState.apply(this,
                    e)
            }
        }
    });
    n(d, "mixins/tree-series.js", [d["parts/Globals.js"]], function (e) {
        var d = e.extend, t = e.isArray, h = e.isObject, k = e.isNumber, n = e.merge, a = e.pick;
        return {
            getColor: function (d, b) {
                var g = b.index, c = b.mapOptionsToLevel, p = b.parentColor, f = b.parentColorIndex, u = b.series,
                    m = b.colors, l = b.siblings, v = u.points, h = u.chart.options.chart, k, q, r, n;
                if (d) {
                    v = v[d.i];
                    d = c[d.level] || {};
                    if (c = v && d.colorByPoint) q = v.index % (m ? m.length : h.colorCount), k = m && m[q];
                    if (!u.chart.styledMode) {
                        m = v && v.options.color;
                        h = d && d.color;
                        if (r = p) r = (r = d && d.colorVariation) &&
                        "brightness" === r.key ? e.color(p).brighten(g / l * r.to).get() : p;
                        r = a(m, h, k, r, u.color)
                    }
                    n = a(v && v.options.colorIndex, d && d.colorIndex, q, f, b.colorIndex)
                }
                return {color: r, colorIndex: n}
            }, getLevelOptions: function (a) {
                var b = null, g, c, p, f;
                if (h(a)) for (b = {}, p = k(a.from) ? a.from : 1, f = a.levels, c = {}, g = h(a.defaults) ? a.defaults : {}, t(f) && (c = f.reduce(function (b, c) {
                    var a, f;
                    h(c) && k(c.level) && (f = n({}, c), a = "boolean" === typeof f.levelIsConstant ? f.levelIsConstant : g.levelIsConstant, delete f.levelIsConstant, delete f.level, c = c.level + (a ? 0 :
                        p - 1), h(b[c]) ? d(b[c], f) : b[c] = f);
                    return b
                }, {})), f = k(a.to) ? a.to : 1, a = 0; a <= f; a++) b[a] = n({}, g, h(c[a]) ? c[a] : {});
                return b
            }, setTreeValues: function b(g, c) {
                var p = c.before, f = c.idRoot, u = c.mapIdToNode[f], m = c.points[g.i], l = m && m.options || {},
                    e = 0, h = [];
                d(g, {
                    levelDynamic: g.level - (("boolean" === typeof c.levelIsConstant ? c.levelIsConstant : 1) ? 0 : u.level),
                    name: a(m && m.name, ""),
                    visible: f === g.id || ("boolean" === typeof c.visible ? c.visible : !1)
                });
                "function" === typeof p && (g = p(g, c));
                g.children.forEach(function (a, f) {
                    var p = d({}, c);
                    d(p,
                        {index: f, siblings: g.children.length, visible: g.visible});
                    a = b(a, p);
                    h.push(a);
                    a.visible && (e += a.val)
                });
                g.visible = 0 < e || g.visible;
                p = a(l.value, e);
                d(g, {children: h, childrenTotal: e, isLeaf: g.visible && !e, val: p});
                return g
            }, updateRootId: function (b) {
                var g;
                h(b) && (g = h(b.options) ? b.options : {}, g = a(b.rootNode, g.rootId, ""), h(b.userOptions) && (b.userOptions.rootId = g), b.rootNode = g);
                return g
            }
        }
    });
    n(d, "modules/sankey.src.js", [d["parts/Globals.js"], d["mixins/tree-series.js"]], function (e, d) {
        var n = d.getLevelOptions, h = e.defined,
            k = e.isObject, I = e.merge;
        d = e.seriesType;
        var a = e.pick, q = e.Point;
        d("sankey", "column", {
            borderWidth: 0,
            colorByPoint: !0,
            curveFactor: .33,
            dataLabels: {
                enabled: !0,
                backgroundColor: "none",
                crop: !1,
                nodeFormat: void 0,
                nodeFormatter: function () {
                    return this.point.name
                },
                format: void 0,
                formatter: function () {
                },
                inside: !0
            },
            inactiveOtherPoints: !0,
            linkOpacity: .5,
            nodeWidth: 20,
            nodePadding: 10,
            showInLegend: !1,
            states: {hover: {linkOpacity: 1}, inactive: {linkOpacity: .1, opacity: .1, animation: {duration: 50}}},
            tooltip: {
                followPointer: !0,
                headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "{point.fromNode.name} \u2192 {point.toNode.name}: \x3cb\x3e{point.weight}\x3c/b\x3e\x3cbr/\x3e",
                nodeFormat: "{point.name}: \x3cb\x3e{point.sum}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, {
            isCartesian: !1,
            invertable: !0,
            forceDL: !0,
            orderNodes: !0,
            createNode: e.NodesMixin.createNode,
            setData: e.NodesMixin.setData,
            destroy: e.NodesMixin.destroy,
            getNodePadding: function () {
                return this.options.nodePadding
            },
            createNodeColumn: function () {
                var b = this.chart, a = [], c = this.getNodePadding();
                a.sum = function () {
                    return this.reduce(function (c,
                                                 b) {
                        return c + b.getSum()
                    }, 0)
                };
                a.offset = function (b, f) {
                    for (var g = 0, d, p = 0; p < a.length; p++) {
                        d = a[p].getSum() * f + c;
                        if (a[p] === b) return {relativeTop: g + e.relativeLength(b.options.offset || 0, d)};
                        g += d
                    }
                };
                a.top = function (a) {
                    var f = this.reduce(function (b, f) {
                        0 < b && (b += c);
                        return b += f.getSum() * a
                    }, 0);
                    return (b.plotSizeY - f) / 2
                };
                return a
            },
            createNodeColumns: function () {
                var b = [];
                this.nodes.forEach(function (c) {
                    var a = -1, f, g, d;
                    if (!e.defined(c.options.column)) if (0 === c.linksTo.length) c.column = 0; else {
                        for (g = 0; g < c.linksTo.length; g++) d = c.linksTo[0],
                        d.fromNode.column > a && (f = d.fromNode, a = f.column);
                        c.column = a + 1;
                        "hanging" === f.options.layout && (c.hangsFrom = f, c.column += f.linksFrom.findIndex(function (b) {
                            return b.toNode === c
                        }))
                    }
                    b[c.column] || (b[c.column] = this.createNodeColumn());
                    b[c.column].push(c)
                }, this);
                for (var a = 0; a < b.length; a++) void 0 === b[a] && (b[a] = this.createNodeColumn());
                return b
            },
            hasData: function () {
                return !!this.processedXData.length
            },
            pointAttribs: function (b, g) {
                var c = this.mapOptionsToLevel[(b.isNode ? b.level : b.fromNode.level) || 0] || {}, d = b.options, f =
                    c.states && c.states[g] || {};
                g = ["colorByPoint", "borderColor", "borderWidth", "linkOpacity"].reduce(function (b, g) {
                    b[g] = a(f[g], d[g], c[g]);
                    return b
                }, {});
                var u = a(f.color, d.color, g.colorByPoint ? b.color : c.color);
                return b.isNode ? {
                    fill: u,
                    stroke: g.borderColor,
                    "stroke-width": g.borderWidth
                } : {fill: e.color(u).setOpacity(g.linkOpacity).get()}
            },
            generatePoints: function () {
                function b(a, c) {
                    void 0 === a.level && (a.level = c, a.linksFrom.forEach(function (a) {
                        b(a.toNode, c + 1)
                    }))
                }

                e.NodesMixin.generatePoints.apply(this, arguments);
                this.orderNodes &&
                (this.nodes.filter(function (b) {
                    return 0 === b.linksTo.length
                }).forEach(function (a) {
                    b(a, 0)
                }), e.stableSort(this.nodes, function (b, a) {
                    return b.level - a.level
                }))
            },
            translateNode: function (b, d) {
                var c = this.translationFactor, g = this.chart, f = this.options, e = b.getSum(), m = Math.round(e * c),
                    l = Math.round(f.borderWidth) % 2 / 2, h = d.offset(b, c);
                d = Math.floor(a(h.absoluteTop, d.top(c) + h.relativeTop)) + l;
                l = Math.floor(this.colDistance * b.column + f.borderWidth / 2) + l;
                l = g.inverted ? g.plotSizeX - l : l;
                c = Math.round(this.nodeWidth);
                b.sum = e;
                b.shapeType =
                    "rect";
                b.nodeX = l;
                b.nodeY = d;
                b.shapeArgs = g.inverted ? {
                    x: l - c,
                    y: g.plotSizeY - d - m,
                    width: b.options.height || f.height || c,
                    height: b.options.width || f.width || m
                } : {x: l, y: d, width: b.options.width || f.width || c, height: b.options.height || f.height || m};
                b.shapeArgs.display = b.hasShape() ? "" : "none";
                g = this.mapOptionsToLevel[b.level];
                f = b.options;
                f = k(f) ? f.dataLabels : {};
                g = k(g) ? g.dataLabels : {};
                g = I({style: {}}, g, f);
                b.dlOptions = g;
                b.plotY = 1
            },
            translateLink: function (b) {
                var a = b.fromNode, c = b.toNode, d = this.chart, f = this.translationFactor, e =
                    b.weight * f, m = this.options, l = a.offset(b, "linksFrom") * f,
                    h = (d.inverted ? -this.colDistance : this.colDistance) * m.curveFactor, l = a.nodeY + l,
                    m = a.nodeX,
                    f = this.nodeColumns[c.column].top(f) + c.offset(b, "linksTo") * f + this.nodeColumns[c.column].offset(c, f).relativeTop,
                    k = this.nodeWidth, c = c.column * this.colDistance, n = b.outgoing, q = c > m;
                d.inverted && (l = d.plotSizeY - l, f = d.plotSizeY - f, c = d.plotSizeX - c, k = -k, e = -e, q = m > c);
                b.shapeType = "path";
                b.linkBase = [l, l + e, f, f + e];
                if (q) b.shapeArgs = {
                    d: ["M", m + k, l, "C", m + k + h, l, c - h, f, c, f, "L", c + (n ? k :
                        0), f + e / 2, "L", c, f + e, "C", c - h, f + e, m + k + h, l + e, m + k, l + e, "z"]
                }; else {
                    var h = c - 20 - e, n = c - 20, q = c, r = m + k, x = r + 20, t = x + e, D = l, y = l + e,
                        B = y + 20, d = B + (d.plotHeight - l - e), w = d + 20, A = w + e, C = f, z = C + e, E = z + 20,
                        F = w + .7 * e, G = q - .7 * e, H = r + .7 * e;
                    b.shapeArgs = {d: ["M", r, D, "C", H, D, t, y - .7 * e, t, B, "L", t, d, "C", t, F, H, A, r, A, "L", q, A, "C", G, A, h, F, h, d, "L", h, E, "C", h, z - .7 * e, G, C, q, C, "L", q, z, "C", n, z, n, z, n, E, "L", n, d, "C", n, w, n, w, q, w, "L", r, w, "C", x, w, x, w, x, d, "L", x, B, "C", x, y, x, y, r, y, "z"]}
                }
                b.dlBox = {x: m + (c - m + k) / 2, y: l + (f - l) / 2, height: e, width: 0};
                b.y = b.plotY = 1;
                b.color || (b.color =
                    a.color)
            },
            translate: function () {
                this.processedXData || this.processData();
                this.generatePoints();
                this.nodeColumns = this.createNodeColumns();
                this.nodeWidth = e.relativeLength(this.options.nodeWidth, this.chart.plotSizeX);
                var b = this, a = this.chart, c = this.options, d = this.nodeWidth, f = this.nodeColumns,
                    h = this.getNodePadding();
                this.translationFactor = f.reduce(function (b, d) {
                    return Math.min(b, (a.plotSizeY - c.borderWidth - (d.length - 1) * h) / d.sum())
                }, Infinity);
                this.colDistance = (a.plotSizeX - d - c.borderWidth) / (f.length - 1);
                b.mapOptionsToLevel =
                    n({
                        from: 1,
                        levels: c.levels,
                        to: f.length - 1,
                        defaults: {
                            borderColor: c.borderColor,
                            borderRadius: c.borderRadius,
                            borderWidth: c.borderWidth,
                            color: b.color,
                            colorByPoint: c.colorByPoint,
                            levelIsConstant: !0,
                            linkColor: c.linkColor,
                            linkLineWidth: c.linkLineWidth,
                            linkOpacity: c.linkOpacity,
                            states: c.states
                        }
                    });
                f.forEach(function (a) {
                    a.forEach(function (c) {
                        b.translateNode(c, a)
                    })
                }, this);
                this.nodes.forEach(function (a) {
                    a.linksFrom.forEach(function (a) {
                        b.translateLink(a);
                        a.allowShadow = !1
                    })
                })
            },
            render: function () {
                var a = this.points;
                this.points = this.points.concat(this.nodes || []);
                e.seriesTypes.column.prototype.render.call(this);
                this.points = a
            },
            animate: e.Series.prototype.animate
        }, {
            applyOptions: function (a, d) {
                q.prototype.applyOptions.call(this, a, d);
                h(this.options.level) && (this.options.column = this.column = this.options.level);
                return this
            }, setState: e.NodesMixin.setNodeState, getClassName: function () {
                return (this.isNode ? "highcharts-node " : "highcharts-link ") + q.prototype.getClassName.call(this)
            }, isValid: function () {
                return this.isNode || "number" ===
                    typeof this.weight
            }
        })
    });
    n(d, "masters/modules/sankey.src.js", [], function () {
    })
});
//# sourceMappingURL=sankey.js.map
