/*
 Highcharts JS v7.1.2 (2019-06-03)

 Pathfinder

 (c) 2016-2019 ystein Moseng

 License: www.highcharts.com/license
*/
(function (k) {
    "object" === typeof module && module.exports ? (k["default"] = k, module.exports = k) : "function" === typeof define && define.amd ? define("highcharts/modules/pathfinder", ["highcharts"], function (r) {
        k(r);
        k.Highcharts = r;
        return k
    }) : k("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (k) {
    function r(h, t, m, k) {
        h.hasOwnProperty(t) || (h[t] = k.apply(null, m))
    }

    k = k ? k._modules : {};
    r(k, "parts-gantt/PathfinderAlgorithms.js", [k["parts/Globals.js"]], function (h) {
        function t(d, c, g) {
            g = g || 0;
            var h = d.length - 1;
            c -= 1e-7;
            for (var m, k; g <= h;) if (m = h + g >> 1, k = c - d[m].xMin, 0 < k) g = m + 1; else if (0 > k) h = m - 1; else return m;
            return 0 < g ? g - 1 : 0
        }

        function m(d, c) {
            for (var g = t(d, c.x + 1) + 1; g--;) {
                var h;
                if (h = d[g].xMax >= c.x) h = d[g], h = c.x <= h.xMax && c.x >= h.xMin && c.y <= h.yMax && c.y >= h.yMin;
                if (h) return g
            }
            return -1
        }

        function k(d) {
            var c = [];
            if (d.length) {
                c.push("M", d[0].start.x, d[0].start.y);
                for (var g = 0; g < d.length; ++g) c.push("L", d[g].end.x, d[g].end.y)
            }
            return c
        }

        function p(d, c) {
            d.yMin = z(d.yMin, c.yMin);
            d.yMax = q(d.yMax, c.yMax);
            d.xMin = z(d.xMin, c.xMin);
            d.xMax = q(d.xMax,
                c.xMax)
        }

        var q = Math.min, z = Math.max, u = Math.abs, r = h.pick;
        return {
            straight: function (d, c) {
                return {path: ["M", d.x, d.y, "L", c.x, c.y], obstacles: [{start: d, end: c}]}
            }, simpleConnect: h.extend(function (d, c, g) {
                function h(b, a, e, f, l) {
                    b = {x: b.x, y: b.y};
                    b[a] = e[f || a] + (l || 0);
                    return b
                }

                function t(b, a, e) {
                    var f = u(a[e] - b[e + "Min"]) > u(a[e] - b[e + "Max"]);
                    return h(a, e, b, e + (f ? "Max" : "Min"), f ? 1 : -1)
                }

                var p = [], a, b = r(g.startDirectionX, u(c.x - d.x) > u(c.y - d.y)) ? "x" : "y", e = g.chartObstacles,
                    l = m(e, d);
                g = m(e, c);
                var f;
                -1 < g ? (a = e[g], g = t(a, c, b), a = {
                    start: g,
                    end: c
                }, f = g) : f = c;
                -1 < l && (e = e[l], g = t(e, d, b), p.push({
                    start: d,
                    end: g
                }), g[b] >= d[b] === g[b] >= f[b] && (b = "y" === b ? "x" : "y", c = d[b] < c[b], p.push({
                    start: g,
                    end: h(g, b, e, b + (c ? "Max" : "Min"), c ? 1 : -1)
                }), b = "y" === b ? "x" : "y"));
                d = p.length ? p[p.length - 1].end : d;
                g = h(d, b, f);
                p.push({start: d, end: g});
                b = h(g, "y" === b ? "x" : "y", f);
                p.push({start: g, end: b});
                p.push(a);
                return {path: k(p), obstacles: p}
            }, {requiresObstacles: !0}), fastAvoid: h.extend(function (d, c, g) {
                function h(b, a, e) {
                    var f, l, h, d, g, c = b.x < a.x ? 1 : -1;
                    b.x < a.x ? (f = b, l = a) : (f = a, l = b);
                    b.y < a.y ? (d = b, h =
                        a) : (d = a, h = b);
                    for (g = 0 > c ? q(t(n, l.x), n.length - 1) : 0; n[g] && (0 < c && n[g].xMin <= l.x || 0 > c && n[g].xMax >= f.x);) {
                        if (n[g].xMin <= l.x && n[g].xMax >= f.x && n[g].yMin <= h.y && n[g].yMax >= d.y) return e ? {
                            y: b.y,
                            x: b.x < a.x ? n[g].xMin - 1 : n[g].xMax + 1,
                            obstacle: n[g]
                        } : {x: b.x, y: b.y < a.y ? n[g].yMin - 1 : n[g].yMax + 1, obstacle: n[g]};
                        g += c
                    }
                    return a
                }

                function A(b, a, e, f, l) {
                    var g = l.soft, d = l.hard, c = f ? "x" : "y", w = {x: a.x, y: a.y}, v = {x: a.x, y: a.y};
                    l = b[c + "Max"] >= g[c + "Max"];
                    var g = b[c + "Min"] <= g[c + "Min"], F = b[c + "Max"] >= d[c + "Max"],
                        d = b[c + "Min"] <= d[c + "Min"], n = u(b[c + "Min"] -
                        a[c]), m = u(b[c + "Max"] - a[c]);
                    e = 10 > u(n - m) ? a[c] < e[c] : m < n;
                    v[c] = b[c + "Min"];
                    w[c] = b[c + "Max"];
                    b = h(a, v, f)[c] !== v[c];
                    a = h(a, w, f)[c] !== w[c];
                    e = b ? a ? e : !0 : a ? !1 : e;
                    e = g ? l ? e : !0 : l ? !1 : e;
                    return d ? F ? e : !0 : F ? !1 : e
                }

                function x(b, a, e) {
                    if (b.x === a.x && b.y === a.y) return [];
                    var f = e ? "x" : "y", c, l, d, w, v = g.obstacleOptions.margin;
                    c = {soft: {xMin: E, xMax: y, yMin: H, yMax: I}, hard: g.hardBounds};
                    l = m(n, b);
                    -1 < l ? (l = n[l], c = A(l, b, a, e, c), p(l, g.hardBounds), w = e ? {
                        y: b.y,
                        x: l[c ? "xMax" : "xMin"] + (c ? 1 : -1)
                    } : {x: b.x, y: l[c ? "yMax" : "yMin"] + (c ? 1 : -1)}, d = m(n, w), -1 < d && (d = n[d],
                        p(d, g.hardBounds), w[f] = c ? z(l[f + "Max"] - v + 1, (d[f + "Min"] + l[f + "Max"]) / 2) : q(l[f + "Min"] + v - 1, (d[f + "Max"] + l[f + "Min"]) / 2), b.x === w.x && b.y === w.y ? (B && (w[f] = c ? z(l[f + "Max"], d[f + "Max"]) + 1 : q(l[f + "Min"], d[f + "Min"]) - 1), B = !B) : B = !1), b = [{
                        start: b,
                        end: w
                    }]) : (f = h(b, {x: e ? a.x : b.x, y: e ? b.y : a.y}, e), b = [{
                        start: b,
                        end: {x: f.x, y: f.y}
                    }], f[e ? "x" : "y"] !== a[e ? "x" : "y"] && (c = A(f.obstacle, f, a, !e, c), p(f.obstacle, g.hardBounds), c = {
                        x: e ? f.x : f.obstacle[c ? "xMax" : "xMin"] + (c ? 1 : -1),
                        y: e ? f.obstacle[c ? "yMax" : "yMin"] + (c ? 1 : -1) : f.y
                    }, e = !e, b = b.concat(x({
                        x: f.x,
                        y: f.y
                    }, c, e))));
                    return b = b.concat(x(b[b.length - 1].end, a, !e))
                }

                function a(b, a, e) {
                    var f = q(b.xMax - a.x, a.x - b.xMin) < q(b.yMax - a.y, a.y - b.yMin);
                    e = A(b, a, e, f, {soft: g.hardBounds, hard: g.hardBounds});
                    return f ? {y: a.y, x: b[e ? "xMax" : "xMin"] + (e ? 1 : -1)} : {
                        x: a.x,
                        y: b[e ? "yMax" : "yMin"] + (e ? 1 : -1)
                    }
                }

                var b = r(g.startDirectionX, u(c.x - d.x) > u(c.y - d.y)), e = b ? "x" : "y", l, f, w = [], B = !1,
                    v = g.obstacleMetrics, E = q(d.x, c.x) - v.maxWidth - 10, y = z(d.x, c.x) + v.maxWidth + 10,
                    H = q(d.y, c.y) - v.maxHeight - 10, I = z(d.y, c.y) + v.maxHeight + 10, n = g.chartObstacles;
                l = t(n, E);
                v = t(n, y);
                n = n.slice(l, v + 1);
                -1 < (v = m(n, c)) && (f = a(n[v], c, d), w.push({end: c, start: f}), c = f);
                for (; -1 < (v = m(n, c));) l = 0 > c[e] - d[e], f = {
                    x: c.x,
                    y: c.y
                }, f[e] = n[v][l ? e + "Max" : e + "Min"] + (l ? 1 : -1), w.push({end: c, start: f}), c = f;
                d = x(d, c, b);
                d = d.concat(w.reverse());
                return {path: k(d), obstacles: d}
            }, {requiresObstacles: !0})
        }
    });
    r(k, "parts-gantt/ArrowSymbols.js", [k["parts/Globals.js"]], function (h) {
        h.SVGRenderer.prototype.symbols.arrow = function (h, m, k, p) {
            return ["M", h, m + p / 2, "L", h + k, m, "L", h, m + p / 2, "L", h + k, m + p]
        };
        h.SVGRenderer.prototype.symbols["arrow-half"] =
            function (k, m, A, p) {
                return h.SVGRenderer.prototype.symbols.arrow(k, m, A / 2, p)
            };
        h.SVGRenderer.prototype.symbols["triangle-left"] = function (h, m, k, p) {
            return ["M", h + k, m, "L", h, m + p / 2, "L", h + k, m + p, "Z"]
        };
        h.SVGRenderer.prototype.symbols["arrow-filled"] = h.SVGRenderer.prototype.symbols["triangle-left"];
        h.SVGRenderer.prototype.symbols["triangle-left-half"] = function (k, m, r, p) {
            return h.SVGRenderer.prototype.symbols["triangle-left"](k, m, r / 2, p)
        };
        h.SVGRenderer.prototype.symbols["arrow-filled-half"] = h.SVGRenderer.prototype.symbols["triangle-left-half"]
    });
    r(k, "parts-gantt/Pathfinder.js", [k["parts/Globals.js"], k["parts-gantt/PathfinderAlgorithms.js"]], function (h, k) {
        function m(a) {
            var b = a.shapeArgs;
            return b ? {
                xMin: b.x,
                xMax: b.x + b.width,
                yMin: b.y,
                yMax: b.y + b.height
            } : (b = a.graphic && a.graphic.getBBox()) ? {
                xMin: a.plotX - b.width / 2,
                xMax: a.plotX + b.width / 2,
                yMin: a.plotY - b.height / 2,
                yMax: a.plotY + b.height / 2
            } : null
        }

        function r(a) {
            for (var b = a.length, e = 0, c, f, g = [], d = function (b, a, e) {
                e = C(e, 10);
                var f = b.yMax + e > a.yMin - e && b.yMin - e < a.yMax + e,
                    c = b.xMax + e > a.xMin - e && b.xMin - e < a.xMax + e, l =
                        f ? b.xMin > a.xMax ? b.xMin - a.xMax : a.xMin - b.xMax : Infinity,
                    g = c ? b.yMin > a.yMax ? b.yMin - a.yMax : a.yMin - b.yMax : Infinity;
                return c && f ? e ? d(b, a, Math.floor(e / 2)) : Infinity : x(l, g)
            }; e < b; ++e) for (c = e + 1; c < b; ++c) f = d(a[e], a[c]), 80 > f && g.push(f);
            g.push(80);
            return D(Math.floor(g.sort(function (b, a) {
                return b - a
            })[Math.floor(g.length / 10)] / 2 - 1), 1)
        }

        function p(a, b, e) {
            this.init(a, b, e)
        }

        function q(a) {
            this.init(a)
        }

        function t(a) {
            if (a.options.pathfinder || a.series.reduce(function (b, a) {
                a.options && g(!0, a.options.connectors = a.options.connectors ||
                    {}, a.options.pathfinder);
                return b || a.options && a.options.pathfinder
            }, !1)) g(!0, a.options.connectors = a.options.connectors || {}, a.options.pathfinder), h.error('WARNING: Pathfinder options have been renamed. Use "chart.connectors" or "series.connectors" instead.')
        }

        var u = h.defined, G = h.deg2rad, d = h.extend, c = h.addEvent, g = h.merge, C = h.pick, D = Math.max,
            x = Math.min;
        d(h.defaultOptions, {
            connectors: {
                type: "straight",
                lineWidth: 1,
                marker: {enabled: !1, align: "center", verticalAlign: "middle", inside: !1, lineWidth: 1},
                startMarker: {symbol: "diamond"},
                endMarker: {symbol: "arrow-filled"}
            }
        });
        p.prototype = {
            init: function (a, b, e) {
                this.fromPoint = a;
                this.toPoint = b;
                this.options = e;
                this.chart = a.series.chart;
                this.pathfinder = this.chart.pathfinder
            }, renderPath: function (a, b, e) {
                var c = this.chart, f = c.styledMode, g = c.pathfinder, d = !c.options.chart.forExport && !1 !== e,
                    h = this.graphics && this.graphics.path;
                g.group || (g.group = c.renderer.g().addClass("highcharts-pathfinder-group").attr({zIndex: -1}).add(c.seriesGroup));
                g.group.translate(c.plotLeft, c.plotTop);
                h && h.renderer || (h = c.renderer.path().add(g.group),
                f || h.attr({opacity: 0}));
                h.attr(b);
                a = {d: a};
                f || (a.opacity = 1);
                h[d ? "animate" : "attr"](a, e);
                this.graphics = this.graphics || {};
                this.graphics.path = h
            }, addMarker: function (a, b, e) {
                var c = this.fromPoint.series.chart, f = c.pathfinder, c = c.renderer,
                    g = "start" === a ? this.fromPoint : this.toPoint, d = g.getPathfinderAnchorPoint(b), h, k;
                b.enabled && (e = "start" === a ? {x: e[4], y: e[5]} : {
                    x: e[e.length - 5],
                    y: e[e.length - 4]
                }, e = g.getRadiansToVector(e, d), d = g.getMarkerVector(e, b.radius, d), e = -e / G, b.width && b.height ? (h = b.width, k = b.height) : h = k = 2 * b.radius,
                    this.graphics = this.graphics || {}, d = {
                    x: d.x - h / 2,
                    y: d.y - k / 2,
                    width: h,
                    height: k,
                    rotation: e,
                    rotationOriginX: d.x,
                    rotationOriginY: d.y
                }, this.graphics[a] ? this.graphics[a].animate(d) : (this.graphics[a] = c.symbol(b.symbol).addClass("highcharts-point-connecting-path-" + a + "-marker").attr(d).add(f.group), c.styledMode || this.graphics[a].attr({
                    fill: b.color || this.fromPoint.color,
                    stroke: b.lineColor,
                    "stroke-width": b.lineWidth,
                    opacity: 0
                }).animate({opacity: 1}, g.series.options.animation)))
            }, getPath: function (a) {
                var b = this.pathfinder,
                    e = this.chart, c = b.algorithms[a.type], f = b.chartObstacles;
                if ("function" !== typeof c) h.error('"' + a.type + '" is not a Pathfinder algorithm.'); else return c.requiresObstacles && !f && (f = b.chartObstacles = b.getChartObstacles(a), e.options.connectors.algorithmMargin = a.algorithmMargin, b.chartObstacleMetrics = b.getObstacleMetrics(f)), c(this.fromPoint.getPathfinderAnchorPoint(a.startMarker), this.toPoint.getPathfinderAnchorPoint(a.endMarker), g({
                    chartObstacles: f,
                    lineObstacles: b.lineObstacles || [],
                    obstacleMetrics: b.chartObstacleMetrics,
                    hardBounds: {xMin: 0, xMax: e.plotWidth, yMin: 0, yMax: e.plotHeight},
                    obstacleOptions: {margin: a.algorithmMargin},
                    startDirectionX: b.getAlgorithmStartDirection(a.startMarker)
                }, a))
            }, render: function () {
                var a = this.fromPoint, b = a.series, e = b.chart, c = e.pathfinder,
                    f = g(e.options.connectors, b.options.connectors, a.options.connectors, this.options), d = {};
                e.styledMode || (d.stroke = f.lineColor || a.color, d["stroke-width"] = f.lineWidth, f.dashStyle && (d.dashstyle = f.dashStyle));
                d.class = "highcharts-point-connecting-path highcharts-color-" +
                    a.colorIndex;
                f = g(d, f);
                u(f.marker.radius) || (f.marker.radius = x(D(Math.ceil((f.algorithmMargin || 8) / 2) - 1, 1), 5));
                a = this.getPath(f);
                e = a.path;
                a.obstacles && (c.lineObstacles = c.lineObstacles || [], c.lineObstacles = c.lineObstacles.concat(a.obstacles));
                this.renderPath(e, d, b.options.animation);
                this.addMarker("start", g(f.marker, f.startMarker), e);
                this.addMarker("end", g(f.marker, f.endMarker), e)
            }, destroy: function () {
                this.graphics && (h.objectEach(this.graphics, function (a) {
                    a.destroy()
                }), delete this.graphics)
            }
        };
        q.prototype =
            {
                algorithms: k, init: function (a) {
                    this.chart = a;
                    this.connections = [];
                    c(a, "redraw", function () {
                        this.pathfinder.update()
                    })
                }, update: function (a) {
                    var b = this.chart, e = this, c = e.connections;
                    e.connections = [];
                    b.series.forEach(function (a) {
                        a.visible && a.points.forEach(function (a) {
                            var c, f = a.options && a.options.connect && h.splat(a.options.connect);
                            a.visible && !1 !== a.isInside && f && f.forEach(function (f) {
                                c = b.get("string" === typeof f ? f : f.to);
                                c instanceof h.Point && c.series.visible && c.visible && !1 !== c.isInside && e.connections.push(new p(a,
                                    c, "string" === typeof f ? {} : f))
                            })
                        })
                    });
                    for (var f = 0, d, g, k = c.length, m = e.connections.length; f < k; ++f) {
                        g = !1;
                        for (d = 0; d < m; ++d) if (c[f].fromPoint === e.connections[d].fromPoint && c[f].toPoint === e.connections[d].toPoint) {
                            e.connections[d].graphics = c[f].graphics;
                            g = !0;
                            break
                        }
                        g || c[f].destroy()
                    }
                    delete this.chartObstacles;
                    delete this.lineObstacles;
                    e.renderConnections(a)
                }, renderConnections: function (a) {
                    a ? this.chart.series.forEach(function (b) {
                        var a = function () {
                            var a = b.chart.pathfinder;
                            (a && a.connections || []).forEach(function (a) {
                                a.fromPoint &&
                                a.fromPoint.series === b && a.render()
                            });
                            b.pathfinderRemoveRenderEvent && (b.pathfinderRemoveRenderEvent(), delete b.pathfinderRemoveRenderEvent)
                        };
                        !1 === b.options.animation ? a() : b.pathfinderRemoveRenderEvent = c(b, "afterAnimate", a)
                    }) : this.connections.forEach(function (a) {
                        a.render()
                    })
                }, getChartObstacles: function (a) {
                    for (var b = [], c = this.chart.series, d = C(a.algorithmMargin, 0), f, g = 0, h = c.length; g < h; ++g) if (c[g].visible) for (var k = 0, p = c[g].points.length, y; k < p; ++k) y = c[g].points[k], y.visible && (y = m(y)) && b.push({
                        xMin: y.xMin -
                            d, xMax: y.xMax + d, yMin: y.yMin - d, yMax: y.yMax + d
                    });
                    b = b.sort(function (a, b) {
                        return a.xMin - b.xMin
                    });
                    u(a.algorithmMargin) || (f = a.algorithmMargin = r(b), b.forEach(function (a) {
                        a.xMin -= f;
                        a.xMax += f;
                        a.yMin -= f;
                        a.yMax += f
                    }));
                    return b
                }, getObstacleMetrics: function (a) {
                    for (var b = 0, c = 0, d, f, g = a.length; g--;) d = a[g].xMax - a[g].xMin, f = a[g].yMax - a[g].yMin, b < d && (b = d), c < f && (c = f);
                    return {maxHeight: c, maxWidth: b}
                }, getAlgorithmStartDirection: function (a) {
                    var b = "top" !== a.verticalAlign && "bottom" !== a.verticalAlign;
                    return "left" !== a.align &&
                    "right" !== a.align ? b ? void 0 : !1 : b ? !0 : void 0
                }
            };
        h.Connection = p;
        h.Pathfinder = q;
        d(h.Point.prototype, {
            getPathfinderAnchorPoint: function (a) {
                var b = m(this), c, d;
                switch (a.align) {
                    case "right":
                        c = "xMax";
                        break;
                    case "left":
                        c = "xMin"
                }
                switch (a.verticalAlign) {
                    case "top":
                        d = "yMin";
                        break;
                    case "bottom":
                        d = "yMax"
                }
                return {x: c ? b[c] : (b.xMin + b.xMax) / 2, y: d ? b[d] : (b.yMin + b.yMax) / 2}
            }, getRadiansToVector: function (a, b) {
                u(b) || (b = m(this), b = {x: (b.xMin + b.xMax) / 2, y: (b.yMin + b.yMax) / 2});
                return Math.atan2(b.y - a.y, a.x - b.x)
            }, getMarkerVector: function (a,
                                          b, c) {
                for (var d = 2 * Math.PI, f = m(this), e = f.xMax - f.xMin, g = f.yMax - f.yMin, h = Math.atan2(g, e), k = !1, e = e / 2, p = g / 2, r = f.xMin + e, f = f.yMin + p, q = r, n = f, u = {}, t = 1, x = 1; a < -Math.PI;) a += d;
                for (; a > Math.PI;) a -= d;
                d = Math.tan(a);
                a > -h && a <= h ? (x = -1, k = !0) : a > h && a <= Math.PI - h ? x = -1 : a > Math.PI - h || a <= -(Math.PI - h) ? (t = -1, k = !0) : t = -1;
                k ? (q += t * e, n += x * e * d) : (q += g / (2 * d) * t, n += x * p);
                c.x !== r && (q = c.x);
                c.y !== f && (n = c.y);
                u.x = q + b * Math.cos(a);
                u.y = n - b * Math.sin(a);
                return u
            }
        });
        h.Chart.prototype.callbacks.push(function (a) {
            !1 !== a.options.connectors.enabled && (t(a),
                this.pathfinder = new q(this), this.pathfinder.update(!0))
        })
    });
    r(k, "masters/modules/pathfinder.src.js", [], function () {
    })
});
//# sourceMappingURL=pathfinder.js.map
