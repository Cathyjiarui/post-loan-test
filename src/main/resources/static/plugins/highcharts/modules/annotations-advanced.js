/*
 Highcharts JS v7.1.2 (2019-06-03)

 Annotations module

 (c) 2009-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (k) {
    "object" === typeof module && module.exports ? (k["default"] = k, module.exports = k) : "function" === typeof define && define.amd ? define("highcharts/modules/annotations-advanced", ["highcharts"], function (q) {
        k(q);
        k.Highcharts = q;
        return k
    }) : k("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (k) {
    function q(e, g, c, a) {
        e.hasOwnProperty(g) || (e[g] = a.apply(null, c))
    }

    k = k ? k._modules : {};
    q(k, "annotations/eventEmitterMixin.js", [k["parts/Globals.js"]], function (e) {
        var g = e.fireEvent;
        return {
            addEvents: function () {
                var c =
                    this;
                e.addEvent(c.graphic.element, "mousedown", function (a) {
                    c.onMouseDown(a)
                });
                e.objectEach(c.options.events, function (a, d) {
                    var h = function (b) {
                        "click" === d && c.cancelClick || a.call(c, c.chart.pointer.normalize(b), c.target)
                    };
                    if (-1 === e.inArray(d, c.nonDOMEvents || [])) c.graphic.on(d, h); else e.addEvent(c, d, h)
                });
                c.options.draggable && (e.addEvent(c, "drag", c.onDrag), c.graphic.renderer.styledMode || c.graphic.css({
                    cursor: {
                        x: "ew-resize",
                        y: "ns-resize",
                        xy: "move"
                    }[c.options.draggable]
                }));
                c.isUpdating || g(c, "add")
            }, removeDocEvents: function () {
                this.removeDrag &&
                (this.removeDrag = this.removeDrag());
                this.removeMouseUp && (this.removeMouseUp = this.removeMouseUp())
            }, onMouseDown: function (c) {
                var a = this, d = a.chart.pointer, h, b;
                c.preventDefault && c.preventDefault();
                2 !== c.button && (c.stopPropagation(), c = d.normalize(c), h = c.chartX, b = c.chartY, a.cancelClick = !1, a.removeDrag = e.addEvent(e.doc, "mousemove", function (f) {
                    a.hasDragged = !0;
                    f = d.normalize(f);
                    f.prevChartX = h;
                    f.prevChartY = b;
                    g(a, "drag", f);
                    h = f.chartX;
                    b = f.chartY
                }), a.removeMouseUp = e.addEvent(e.doc, "mouseup", function (b) {
                    a.cancelClick =
                        a.hasDragged;
                    a.hasDragged = !1;
                    g(e.pick(a.target, a), "afterUpdate");
                    a.onMouseUp(b)
                }))
            }, onMouseUp: function () {
                var c = this.chart, a = this.target || this, d = c.options.annotations, c = c.annotations.indexOf(a);
                this.removeDocEvents();
                d[c] = a.options
            }, onDrag: function (c) {
                if (this.chart.isInsidePlot(c.chartX - this.chart.plotLeft, c.chartY - this.chart.plotTop)) {
                    var a = this.mouseMoveToTranslation(c);
                    "x" === this.options.draggable && (a.y = 0);
                    "y" === this.options.draggable && (a.x = 0);
                    this.points.length ? this.translate(a.x, a.y) : (this.shapes.forEach(function (d) {
                        d.translate(a.x,
                            a.y)
                    }), this.labels.forEach(function (d) {
                        d.translate(a.x, a.y)
                    }));
                    this.redraw(!1)
                }
            }, mouseMoveToRadians: function (c, a, d) {
                var h = c.prevChartY - d, b = c.prevChartX - a;
                d = c.chartY - d;
                c = c.chartX - a;
                this.chart.inverted && (a = b, b = h, h = a, a = c, c = d, d = a);
                return Math.atan2(d, c) - Math.atan2(h, b)
            }, mouseMoveToTranslation: function (c) {
                var a = c.chartX - c.prevChartX;
                c = c.chartY - c.prevChartY;
                var d;
                this.chart.inverted && (d = c, c = a, a = d);
                return {x: a, y: c}
            }, mouseMoveToScale: function (c, a, d) {
                a = (c.chartX - a || 1) / (c.prevChartX - a || 1);
                c = (c.chartY - d || 1) /
                    (c.prevChartY - d || 1);
                this.chart.inverted && (d = c, c = a, a = d);
                return {x: a, y: c}
            }, destroy: function () {
                this.removeDocEvents();
                e.removeEvent(this);
                this.hcEvents = null
            }
        }
    });
    q(k, "annotations/ControlPoint.js", [k["parts/Globals.js"], k["annotations/eventEmitterMixin.js"]], function (e, g) {
        function c(a, d, h, b) {
            this.chart = a;
            this.target = d;
            this.options = h;
            this.index = e.pick(h.index, b)
        }

        e.extend(c.prototype, g);
        c.prototype.nonDOMEvents = ["drag"];
        c.prototype.setVisibility = function (a) {
            this.graphic.attr("visibility", a ? "visible" : "hidden");
            this.options.visible = a
        };
        c.prototype.render = function () {
            var a = this.chart, d = this.options;
            this.graphic = a.renderer.symbol(d.symbol, 0, 0, d.width, d.height).add(a.controlPointsGroup).css(d.style);
            this.setVisibility(d.visible);
            this.addEvents()
        };
        c.prototype.redraw = function (a) {
            this.graphic[a ? "animate" : "attr"](this.options.positioner.call(this, this.target))
        };
        c.prototype.destroy = function () {
            g.destroy.call(this);
            this.graphic && (this.graphic = this.graphic.destroy());
            this.options = this.target = this.chart = null
        };
        c.prototype.update =
            function (a) {
                var d = this.chart, h = this.target, b = this.index;
                a = e.merge(!0, this.options, a);
                this.destroy();
                this.constructor(d, h, a, b);
                this.render(d.controlPointsGroup);
                this.redraw()
            };
        return c
    });
    q(k, "annotations/MockPoint.js", [k["parts/Globals.js"]], function (e) {
        function g(c, a, d) {
            this.series = {visible: !0, chart: c, getPlotBox: e.Series.prototype.getPlotBox};
            this.target = a || null;
            this.options = d;
            this.applyOptions(this.getOptions())
        }

        g.fromPoint = function (c) {
            return new g(c.series.chart, null, {
                x: c.x, y: c.y, xAxis: c.series.xAxis,
                yAxis: c.series.yAxis
            })
        };
        g.pointToPixels = function (c, a) {
            var d = c.series, h = d.chart, b = c.plotX, f = c.plotY;
            h.inverted && (c.mock ? (b = c.plotY, f = c.plotX) : (b = h.plotWidth - c.plotY, f = h.plotHeight - c.plotX));
            d && !a && (c = d.getPlotBox(), b += c.translateX, f += c.translateY);
            return {x: b, y: f}
        };
        g.pointToOptions = function (c) {
            return {x: c.x, y: c.y, xAxis: c.series.xAxis, yAxis: c.series.yAxis}
        };
        e.extend(g.prototype, {
            mock: !0, hasDynamicOptions: function () {
                return "function" === typeof this.options
            }, getOptions: function () {
                return this.hasDynamicOptions() ?
                    this.options(this.target) : this.options
            }, applyOptions: function (c) {
                this.command = c.command;
                this.setAxis(c, "x");
                this.setAxis(c, "y");
                this.refresh()
            }, setAxis: function (c, a) {
                a += "Axis";
                c = c[a];
                var d = this.series.chart;
                this.series[a] = c instanceof e.Axis ? c : e.defined(c) ? d[a][c] || d.get(c) : null
            }, toAnchor: function () {
                var c = [this.plotX, this.plotY, 0, 0];
                this.series.chart.inverted && (c[0] = this.plotY, c[1] = this.plotX);
                return c
            }, getLabelConfig: function () {
                return {x: this.x, y: this.y, point: this}
            }, isInsidePane: function () {
                var c =
                    this.plotX, a = this.plotY, d = this.series.xAxis, h = this.series.yAxis, b = !0;
                d && (b = e.defined(c) && 0 <= c && c <= d.len);
                h && (b = b && e.defined(a) && 0 <= a && a <= h.len);
                return b
            }, refresh: function () {
                var c = this.series, a = c.xAxis, c = c.yAxis, d = this.getOptions();
                a ? (this.x = d.x, this.plotX = a.toPixels(d.x, !0)) : (this.x = null, this.plotX = d.x);
                c ? (this.y = d.y, this.plotY = c.toPixels(d.y, !0)) : (this.y = null, this.plotY = d.y);
                this.isInside = this.isInsidePane()
            }, translate: function (c, a, d, h) {
                this.hasDynamicOptions() || (this.plotX += d, this.plotY += h, this.refreshOptions())
            },
            scale: function (c, a, d, h) {
                if (!this.hasDynamicOptions()) {
                    var b = this.plotY * h;
                    this.plotX = (1 - d) * c + this.plotX * d;
                    this.plotY = (1 - h) * a + b;
                    this.refreshOptions()
                }
            }, rotate: function (c, a, d) {
                if (!this.hasDynamicOptions()) {
                    var h = Math.cos(d);
                    d = Math.sin(d);
                    var b = this.plotX, f = this.plotY, b = b - c, f = f - a;
                    this.plotX = b * h - f * d + c;
                    this.plotY = b * d + f * h + a;
                    this.refreshOptions()
                }
            }, refreshOptions: function () {
                var c = this.series, a = c.xAxis, c = c.yAxis;
                this.x = this.options.x = a ? this.options.x = a.toValue(this.plotX, !0) : this.plotX;
                this.y = this.options.y =
                    c ? c.toValue(this.plotY, !0) : this.plotY
            }
        });
        return g
    });
    q(k, "annotations/controllable/controllableMixin.js", [k["parts/Globals.js"], k["annotations/ControlPoint.js"], k["annotations/MockPoint.js"]], function (e, g, c) {
        return {
            init: function (a, d, h) {
                this.annotation = a;
                this.chart = a.chart;
                this.options = d;
                this.points = [];
                this.controlPoints = [];
                this.index = h;
                this.linkPoints();
                this.addControlPoints()
            }, attr: function () {
                this.graphic.attr.apply(this.graphic, arguments)
            }, getPointsOptions: function () {
                var a = this.options;
                return a.points ||
                    a.point && e.splat(a.point)
            }, attrsFromOptions: function (a) {
                var d = this.constructor.attrsMap, h = {}, b, f, c = this.chart.styledMode;
                for (b in a) f = d[b], !f || c && -1 !== ["fill", "stroke", "stroke-width"].indexOf(f) || (h[f] = a[b]);
                return h
            }, anchor: function (a) {
                var d = a.series.getPlotBox();
                a = a.mock ? a.toAnchor() : e.Tooltip.prototype.getAnchor.call({chart: a.series.chart}, a);
                a = {
                    x: a[0] + (this.options.x || 0),
                    y: a[1] + (this.options.y || 0),
                    height: a[2] || 0,
                    width: a[3] || 0
                };
                return {
                    relativePosition: a, absolutePosition: e.merge(a, {
                        x: a.x + d.translateX,
                        y: a.y + d.translateY
                    })
                }
            }, point: function (a, d) {
                if (a && a.series) return a;
                d && null !== d.series || (e.isObject(a) ? d = new c(this.chart, this, a) : e.isString(a) ? d = this.chart.get(a) || null : "function" === typeof a && (d = a.call(d, this), d = d.series ? d : new c(this.chart, this, a)));
                return d
            }, linkPoints: function () {
                var a = this.getPointsOptions(), d = this.points, h = a && a.length || 0, b, f;
                for (b = 0; b < h; b++) {
                    f = this.point(a[b], d[b]);
                    if (!f) {
                        d.length = 0;
                        return
                    }
                    f.mock && f.refresh();
                    d[b] = f
                }
                return d
            }, addControlPoints: function () {
                var a = this.options.controlPoints;
                (a || []).forEach(function (d, h) {
                    d = e.merge(this.options.controlPointOptions, d);
                    d.index || (d.index = h);
                    a[h] = d;
                    this.controlPoints.push(new g(this.chart, this, d))
                }, this)
            }, shouldBeDrawn: function () {
                return !!this.points.length
            }, render: function () {
                this.controlPoints.forEach(function (a) {
                    a.render()
                })
            }, redraw: function (a) {
                this.controlPoints.forEach(function (d) {
                    d.redraw(a)
                })
            }, transform: function (a, d, h, b, f) {
                if (this.chart.inverted) {
                    var c = d;
                    d = h;
                    h = c
                }
                this.points.forEach(function (c, l) {
                    this.transformPoint(a, d, h, b, f, l)
                }, this)
            },
            transformPoint: function (a, d, h, b, f, e) {
                var p = this.points[e];
                p.mock || (p = this.points[e] = c.fromPoint(p));
                p[a](d, h, b, f)
            }, translate: function (a, d) {
                this.transform("translate", null, null, a, d)
            }, translatePoint: function (a, d, h) {
                this.transformPoint("translate", null, null, a, d, h)
            }, translateShape: function (a, d) {
                var h = this.annotation.chart, b = this.annotation.userOptions,
                    f = h.annotations.indexOf(this.annotation), h = h.options.annotations[f];
                this.translatePoint(a, d, 0);
                h[this.collection][this.index].point = this.options.point;
                b[this.collection][this.index].point = this.options.point
            }, rotate: function (a, d, h) {
                this.transform("rotate", a, d, h)
            }, scale: function (a, d, h, b) {
                this.transform("scale", a, d, h, b)
            }, setControlPointsVisibility: function (a) {
                this.controlPoints.forEach(function (d) {
                    d.setVisibility(a)
                })
            }, destroy: function () {
                this.graphic && (this.graphic = this.graphic.destroy());
                this.tracker && (this.tracker = this.tracker.destroy());
                this.controlPoints.forEach(function (a) {
                    a.destroy()
                });
                this.options = this.controlPoints = this.points = this.chart = null;
                this.annotation && (this.annotation = null)
            }, update: function (a) {
                var d = this.annotation;
                a = e.merge(!0, this.options, a);
                var h = this.graphic.parentGroup;
                this.destroy();
                this.constructor(d, a);
                this.render(h);
                this.redraw()
            }
        }
    });
    q(k, "annotations/controllable/markerMixin.js", [k["parts/Globals.js"]], function (e) {
        var g = {
            arrow: {
                tagName: "marker",
                render: !1,
                id: "arrow",
                refY: 5,
                refX: 9,
                markerWidth: 10,
                markerHeight: 10,
                children: [{tagName: "path", d: "M 0 0 L 10 5 L 0 10 Z", strokeWidth: 0}]
            }, "reverse-arrow": {
                tagName: "marker",
                render: !1,
                id: "reverse-arrow",
                refY: 5,
                refX: 1,
                markerWidth: 10,
                markerHeight: 10,
                children: [{tagName: "path", d: "M 0 5 L 10 0 L 10 10 Z", strokeWidth: 0}]
            }
        };
        e.SVGRenderer.prototype.addMarker = function (a, d) {
            var h = {id: a}, b = {stroke: d.color || "none", fill: d.color || "rgba(0, 0, 0, 0.75)"};
            h.children = d.children.map(function (f) {
                return e.merge(b, f)
            });
            d = this.definition(e.merge(!0, {
                markerWidth: 20,
                markerHeight: 20,
                refX: 0,
                refY: 0,
                orient: "auto"
            }, d, h));
            d.id = a;
            return d
        };
        var c = function (a) {
            return function (d) {
                this.attr(a, "url(#" + d + ")")
            }
        }, c = {
            markerEndSetter: c("marker-end"),
            markerStartSetter: c("marker-start"), setItemMarkers: function (a) {
                var d = a.options, h = a.chart, b = h.options.defs, f = d.fill,
                    c = e.defined(f) && "none" !== f ? f : d.stroke;
                ["markerStart", "markerEnd"].forEach(function (f) {
                    var l = d[f], m, p, x;
                    if (l) {
                        for (x in b) if (m = b[x], l === m.id && "marker" === m.tagName) {
                            p = m;
                            break
                        }
                        p && (l = a[f] = h.renderer.addMarker((d.id || e.uniqueKey()) + "-" + p.id, e.merge(p, {color: c})), a.attr(f, l.attr("id")))
                    }
                })
            }
        };
        e.SVGRenderer.prototype.definition = function (a) {
            function d(b, f) {
                var a;
                e.splat(b).forEach(function (b) {
                    var l =
                        h.createElement(b.tagName), c = {};
                    e.objectEach(b, function (b, f) {
                        "tagName" !== f && "children" !== f && "textContent" !== f && (c[f] = b)
                    });
                    l.attr(c);
                    l.add(f || h.defs);
                    b.textContent && l.element.appendChild(e.doc.createTextNode(b.textContent));
                    d(b.children || [], l);
                    a = l
                });
                return a
            }

            var h = this;
            return d(a)
        };
        e.addEvent(e.Chart, "afterGetContainer", function () {
            this.options.defs = e.merge(g, this.options.defs || {});
            e.objectEach(this.options.defs, function (a) {
                "marker" === a.tagName && !1 !== a.render && this.renderer.addMarker(a.id, a)
            }, this)
        });
        return c
    });
    q(k, "annotations/controllable/ControllablePath.js", [k["parts/Globals.js"], k["annotations/controllable/controllableMixin.js"], k["annotations/controllable/markerMixin.js"]], function (e, g, c) {
        function a(d, b, f) {
            this.init(d, b, f);
            this.collection = "shapes"
        }

        var d = "rgba(192,192,192," + (e.svg ? .0001 : .002) + ")";
        a.attrsMap = {
            dashStyle: "dashstyle",
            strokeWidth: "stroke-width",
            stroke: "stroke",
            fill: "fill",
            zIndex: "zIndex"
        };
        e.merge(!0, a.prototype, g, {
            type: "path", setMarkers: c.setItemMarkers, toD: function () {
                var d = this.options.d;
                if (d) return "function" === typeof d ? d.call(this) : d;
                for (var b = this.points, f = b.length, a = f, c = b[0], l = a && this.anchor(c).absolutePosition, m = 0, e = 2, d = l && ["M", l.x, l.y]; ++m < f && a;) c = b[m], a = c.command || "L", l = this.anchor(c).absolutePosition, "Z" === a ? d[++e] = a : (a !== b[m - 1].command && (d[++e] = a), d[++e] = l.x, d[++e] = l.y), a = c.series.visible;
                return a ? this.chart.renderer.crispLine(d, this.graphic.strokeWidth()) : null
            }, shouldBeDrawn: function () {
                return g.shouldBeDrawn.call(this) || !!this.options.d
            }, render: function (a) {
                var b = this.options,
                    f = this.attrsFromOptions(b);
                this.graphic = this.annotation.chart.renderer.path(["M", 0, 0]).attr(f).add(a);
                b.className && this.graphic.addClass(b.className);
                this.tracker = this.annotation.chart.renderer.path(["M", 0, 0]).addClass("highcharts-tracker-line").attr({zIndex: 2}).add(a);
                this.annotation.chart.styledMode || this.tracker.attr({
                    "stroke-linejoin": "round",
                    stroke: d,
                    fill: d,
                    "stroke-width": this.graphic.strokeWidth() + 2 * b.snap
                });
                g.render.call(this);
                e.extend(this.graphic, {markerStartSetter: c.markerStartSetter, markerEndSetter: c.markerEndSetter});
                this.setMarkers(this)
            }, redraw: function (d) {
                var b = this.toD(), f = d ? "animate" : "attr";
                b ? (this.graphic[f]({d: b}), this.tracker[f]({d: b})) : (this.graphic.attr({d: "M 0 -9000000000"}), this.tracker.attr({d: "M 0 -9000000000"}));
                this.graphic.placed = this.tracker.placed = !!b;
                g.redraw.call(this, d)
            }
        });
        return a
    });
    q(k, "annotations/controllable/ControllableRect.js", [k["parts/Globals.js"], k["annotations/controllable/controllableMixin.js"], k["annotations/controllable/ControllablePath.js"]], function (e, g, c) {
        function a(d, a,
                   b) {
            this.init(d, a, b);
            this.collection = "shapes"
        }

        a.attrsMap = e.merge(c.attrsMap, {width: "width", height: "height"});
        e.merge(!0, a.prototype, g, {
            type: "rect", translate: g.translateShape, render: function (d) {
                var a = this.attrsFromOptions(this.options);
                this.graphic = this.annotation.chart.renderer.rect(0, -9E9, 0, 0).attr(a).add(d);
                g.render.call(this)
            }, redraw: function (d) {
                var a = this.anchor(this.points[0]).absolutePosition;
                if (a) this.graphic[d ? "animate" : "attr"]({
                    x: a.x,
                    y: a.y,
                    width: this.options.width,
                    height: this.options.height
                });
                else this.attr({x: 0, y: -9E9});
                this.graphic.placed = !!a;
                g.redraw.call(this, d)
            }
        });
        return a
    });
    q(k, "annotations/controllable/ControllableCircle.js", [k["parts/Globals.js"], k["annotations/controllable/controllableMixin.js"], k["annotations/controllable/ControllablePath.js"]], function (e, g, c) {
        function a(d, a, b) {
            this.init(d, a, b);
            this.collection = "shapes"
        }

        a.attrsMap = e.merge(c.attrsMap, {r: "r"});
        e.merge(!0, a.prototype, g, {
            type: "circle", translate: g.translateShape, render: function (d) {
                var a = this.attrsFromOptions(this.options);
                this.graphic = this.annotation.chart.renderer.circle(0, -9E9, 0).attr(a).add(d);
                g.render.call(this)
            }, redraw: function (d) {
                var a = this.anchor(this.points[0]).absolutePosition;
                if (a) this.graphic[d ? "animate" : "attr"]({
                    x: a.x,
                    y: a.y,
                    r: this.options.r
                }); else this.graphic.attr({x: 0, y: -9E9});
                this.graphic.placed = !!a;
                g.redraw.call(this, d)
            }, setRadius: function (d) {
                this.options.r = d
            }
        });
        return a
    });
    q(k, "annotations/controllable/ControllableLabel.js", [k["parts/Globals.js"], k["annotations/controllable/controllableMixin.js"], k["annotations/MockPoint.js"]],
        function (e, g, c) {
            function a(d, a, b) {
                this.init(d, a, b);
                this.collection = "labels"
            }

            a.shapesWithoutBackground = ["connector"];
            a.alignedPosition = function (a, c) {
                var b = a.align, f = a.verticalAlign, d = (c.x || 0) + (a.x || 0), h = (c.y || 0) + (a.y || 0), l, e;
                "right" === b ? l = 1 : "center" === b && (l = 2);
                l && (d += (c.width - (a.width || 0)) / l);
                "bottom" === f ? e = 1 : "middle" === f && (e = 2);
                e && (h += (c.height - (a.height || 0)) / e);
                return {x: Math.round(d), y: Math.round(h)}
            };
            a.justifiedOptions = function (a, c, b, f) {
                var d = b.align, e = b.verticalAlign, l = c.box ? 0 : c.padding || 0, h = c.getBBox();
                c = {align: d, verticalAlign: e, x: b.x, y: b.y, width: c.width, height: c.height};
                b = f.x - a.plotLeft;
                var g = f.y - a.plotTop;
                f = b + l;
                0 > f && ("right" === d ? c.align = "left" : c.x = -f);
                f = b + h.width - l;
                f > a.plotWidth && ("left" === d ? c.align = "right" : c.x = a.plotWidth - f);
                f = g + l;
                0 > f && ("bottom" === e ? c.verticalAlign = "top" : c.y = -f);
                f = g + h.height - l;
                f > a.plotHeight && ("top" === e ? c.verticalAlign = "bottom" : c.y = a.plotHeight - f);
                return c
            };
            a.attrsMap = {
                backgroundColor: "fill",
                borderColor: "stroke",
                borderWidth: "stroke-width",
                zIndex: "zIndex",
                borderRadius: "r",
                padding: "padding"
            };
            e.merge(!0, a.prototype, g, {
                translatePoint: function (a, c) {
                    g.translatePoint.call(this, a, c, 0)
                }, translate: function (a, c) {
                    var b = this.annotation.chart, f = this.annotation.userOptions,
                        d = b.annotations.indexOf(this.annotation), b = b.options.annotations[d];
                    this.options.x += a;
                    this.options.y += c;
                    b[this.collection][this.index].x = this.options.x;
                    b[this.collection][this.index].y = this.options.y;
                    f[this.collection][this.index].x = this.options.x;
                    f[this.collection][this.index].y = this.options.y
                }, render: function (d) {
                    var c = this.options,
                        b = this.attrsFromOptions(c), f = c.style;
                    this.graphic = this.annotation.chart.renderer.label("", 0, -9999, c.shape, null, null, c.useHTML, null, "annotation-label").attr(b).add(d);
                    this.annotation.chart.styledMode || ("contrast" === f.color && (f.color = this.annotation.chart.renderer.getContrast(-1 < a.shapesWithoutBackground.indexOf(c.shape) ? "#FFFFFF" : c.backgroundColor)), this.graphic.css(c.style).shadow(c.shadow));
                    c.className && this.graphic.addClass(c.className);
                    this.graphic.labelrank = c.labelrank;
                    g.render.call(this)
                }, redraw: function (a) {
                    var c =
                        this.options, b = this.text || c.format || c.text, f = this.graphic, d = this.points[0];
                    f.attr({text: b ? e.format(b, d.getLabelConfig(), this.annotation.chart.time) : c.formatter.call(d, this)});
                    c = this.anchor(d);
                    (b = this.position(c)) ? (f.alignAttr = b, b.anchorX = c.absolutePosition.x, b.anchorY = c.absolutePosition.y, f[a ? "animate" : "attr"](b)) : f.attr({
                        x: 0,
                        y: -9999
                    });
                    f.placed = !!b;
                    g.redraw.call(this, a)
                }, anchor: function () {
                    var a = g.anchor.apply(this, arguments), c = this.options.x || 0, b = this.options.y || 0;
                    a.absolutePosition.x -= c;
                    a.absolutePosition.y -=
                        b;
                    a.relativePosition.x -= c;
                    a.relativePosition.y -= b;
                    return a
                }, position: function (d) {
                    var h = this.graphic, b = this.annotation.chart, f = this.points[0], p = this.options,
                        x = d.absolutePosition, l = d.relativePosition, m;
                    if (d = f.series.visible && c.prototype.isInsidePane.call(f)) p.distance ? m = e.Tooltip.prototype.getPosition.call({
                        chart: b,
                        distance: e.pick(p.distance, 16)
                    }, h.width, h.height, {
                        plotX: l.x,
                        plotY: l.y,
                        negative: f.negative,
                        ttBelow: f.ttBelow,
                        h: l.height || l.width
                    }) : p.positioner ? m = p.positioner.call(this) : (f = {
                        x: x.x, y: x.y, width: 0,
                        height: 0
                    }, m = a.alignedPosition(e.extend(p, {
                        width: h.width,
                        height: h.height
                    }), f), "justify" === this.options.overflow && (m = a.alignedPosition(a.justifiedOptions(b, h, p, m), f))), p.crop && (p = m.x - b.plotLeft, f = m.y - b.plotTop, d = b.isInsidePlot(p, f) && b.isInsidePlot(p + h.width, f + h.height));
                    return d ? m : null
                }
            });
            e.SVGRenderer.prototype.symbols.connector = function (a, c, b, f, p) {
                var d = p && p.anchorX;
                p = p && p.anchorY;
                var l, m, h = b / 2;
                e.isNumber(d) && e.isNumber(p) && (l = ["M", d, p], m = c - p, 0 > m && (m = -f - m), m < b && (h = d < a + b / 2 ? m : b - m), p > c + f ? l.push("L",
                    a + h, c + f) : p < c ? l.push("L", a + h, c) : d < a ? l.push("L", a, c + f / 2) : d > a + b && l.push("L", a + b, c + f / 2));
                return l || []
            };
            return a
        });
    q(k, "annotations/controllable/ControllableImage.js", [k["parts/Globals.js"], k["annotations/controllable/controllableMixin.js"], k["annotations/controllable/ControllableLabel.js"]], function (e, g, c) {
        function a(a, c, b) {
            this.init(a, c, b);
            this.collection = "shapes"
        }

        a.attrsMap = {width: "width", height: "height", zIndex: "zIndex"};
        e.merge(!0, a.prototype, g, {
            type: "image", translate: g.translateShape, render: function (a) {
                var c =
                    this.attrsFromOptions(this.options), b = this.options;
                this.graphic = this.annotation.chart.renderer.image(b.src, 0, -9E9, b.width, b.height).attr(c).add(a);
                this.graphic.width = b.width;
                this.graphic.height = b.height;
                g.render.call(this)
            }, redraw: function (a) {
                var d = this.anchor(this.points[0]);
                if (d = c.prototype.position.call(this, d)) this.graphic[a ? "animate" : "attr"]({
                    x: d.x,
                    y: d.y
                }); else this.graphic.attr({x: 0, y: -9E9});
                this.graphic.placed = !!d;
                g.redraw.call(this, a)
            }
        });
        return a
    });
    q(k, "annotations/annotations.src.js", [k["parts/Globals.js"],
        k["annotations/controllable/controllableMixin.js"], k["annotations/controllable/ControllableRect.js"], k["annotations/controllable/ControllableCircle.js"], k["annotations/controllable/ControllablePath.js"], k["annotations/controllable/ControllableImage.js"], k["annotations/controllable/ControllableLabel.js"], k["annotations/eventEmitterMixin.js"], k["annotations/MockPoint.js"], k["annotations/ControlPoint.js"]], function (e, g, c, a, d, h, b, f, p, x) {
        var l = e.merge, m = e.addEvent, u = e.fireEvent, t = e.defined, n = e.erase, r =
                e.find, w = e.isString, A = e.pick, y = e.reduce, k = e.splat, z = e.destroyObjectProperties,
            q = e.Chart.prototype, v = e.Annotation = function (b, a) {
                var c;
                this.chart = b;
                this.points = [];
                this.controlPoints = [];
                this.coll = "annotations";
                this.labels = [];
                this.shapes = [];
                this.options = a;
                this.userOptions = l(!0, {}, a);
                c = this.getLabelsAndShapesOptions(this.userOptions, a);
                this.userOptions.labels = c.labels;
                this.userOptions.shapes = c.shapes;
                this.init(b, a)
            };
        l(!0, v.prototype, g, f, {
            nonDOMEvents: ["add", "afterUpdate", "remove"], defaultOptions: {
                visible: !0,
                draggable: "xy",
                labelOptions: {
                    align: "center",
                    allowOverlap: !1,
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    borderColor: "black",
                    borderRadius: 3,
                    borderWidth: 1,
                    className: "",
                    crop: !1,
                    formatter: function () {
                        return t(this.y) ? this.y : "Annotation label"
                    },
                    overflow: "justify",
                    padding: 5,
                    shadow: !1,
                    shape: "callout",
                    style: {fontSize: "11px", fontWeight: "normal", color: "contrast"},
                    useHTML: !1,
                    verticalAlign: "bottom",
                    x: 0,
                    y: -16
                },
                shapeOptions: {
                    stroke: "rgba(0, 0, 0, 0.75)",
                    strokeWidth: 1,
                    fill: "rgba(0, 0, 0, 0.75)",
                    r: 0,
                    snap: 2
                },
                controlPointOptions: {
                    symbol: "circle",
                    width: 10,
                    height: 10,
                    style: {stroke: "black", "stroke-width": 2, fill: "white"},
                    visible: !1,
                    events: {}
                },
                events: {},
                zIndex: 6
            }, init: function () {
                this.linkPoints();
                this.addControlPoints();
                this.addShapes();
                this.addLabels();
                this.addClipPaths();
                this.setLabelCollector()
            }, getLabelsAndShapesOptions: function (b, a) {
                var c = {};
                ["labels", "shapes"].forEach(function (f) {
                    b[f] && (c[f] = k(a[f]).map(function (a, c) {
                        return l(b[f][c], a)
                    }))
                });
                return c
            }, addShapes: function () {
                (this.options.shapes || []).forEach(this.initShape, this)
            }, addLabels: function () {
                (this.options.labels ||
                    []).forEach(this.initLabel, this)
            }, addClipPaths: function () {
                this.setClipAxes();
                this.clipXAxis && this.clipYAxis && (this.clipRect = this.chart.renderer.clipRect(this.getClipBox()))
            }, setClipAxes: function () {
                var b = this.chart.xAxis, a = this.chart.yAxis,
                    c = y((this.options.labels || []).concat(this.options.shapes || []), function (c, f) {
                        return [b[f && f.point && f.point.xAxis] || c[0], a[f && f.point && f.point.yAxis] || c[1]]
                    }, []);
                this.clipXAxis = c[0];
                this.clipYAxis = c[1]
            }, getClipBox: function () {
                return {
                    x: this.clipXAxis.left, y: this.clipYAxis.top,
                    width: this.clipXAxis.width, height: this.clipYAxis.height
                }
            }, setLabelCollector: function () {
                var b = this;
                b.labelCollector = function () {
                    return b.labels.reduce(function (b, a) {
                        a.options.allowOverlap || b.push(a.graphic);
                        return b
                    }, [])
                };
                b.chart.labelCollectors.push(b.labelCollector)
            }, setOptions: function (b) {
                this.options = l(this.defaultOptions, b)
            }, redraw: function (b) {
                this.linkPoints();
                this.graphic || this.render();
                this.clipRect && this.clipRect.animate(this.getClipBox());
                this.redrawItems(this.shapes, b);
                this.redrawItems(this.labels,
                    b);
                g.redraw.call(this, b)
            }, redrawItems: function (b, a) {
                for (var c = b.length; c--;) this.redrawItem(b[c], a)
            }, render: function () {
                var b = this.chart.renderer;
                this.graphic = b.g("annotation").attr({
                    zIndex: this.options.zIndex,
                    visibility: this.options.visible ? "visible" : "hidden"
                }).add();
                this.shapesGroup = b.g("annotation-shapes").add(this.graphic).clip(this.chart.plotBoxClip);
                this.labelsGroup = b.g("annotation-labels").attr({translateX: 0, translateY: 0}).add(this.graphic);
                this.clipRect && this.graphic.clip(this.clipRect);
                this.addEvents();
                g.render.call(this)
            }, setVisibility: function (b) {
                var a = this.options;
                b = A(b, !a.visible);
                this.graphic.attr("visibility", b ? "visible" : "hidden");
                b || this.setControlPointsVisibility(!1);
                a.visible = b
            }, setControlPointsVisibility: function (b) {
                var a = function (a) {
                    a.setControlPointsVisibility(b)
                };
                g.setControlPointsVisibility.call(this, b);
                this.shapes.forEach(a);
                this.labels.forEach(a)
            }, destroy: function () {
                var b = this.chart, a = function (b) {
                    b.destroy()
                };
                this.labels.forEach(a);
                this.shapes.forEach(a);
                this.clipYAxis = this.clipXAxis =
                    null;
                n(b.labelCollectors, this.labelCollector);
                f.destroy.call(this);
                g.destroy.call(this);
                z(this, b)
            }, remove: function () {
                return this.chart.removeAnnotation(this)
            }, update: function (b) {
                var a = this.chart, c = this.getLabelsAndShapesOptions(this.userOptions, b),
                    f = a.annotations.indexOf(this);
                b = e.merge(!0, this.userOptions, b);
                b.labels = c.labels;
                b.shapes = c.shapes;
                this.destroy();
                this.constructor(a, b);
                a.options.annotations[f] = b;
                this.isUpdating = !0;
                this.redraw();
                this.isUpdating = !1;
                u(this, "afterUpdate")
            }, initShape: function (b,
                                    a) {
                b = l(this.options.shapeOptions, {controlPointOptions: this.options.controlPointOptions}, b);
                a = new v.shapesMap[b.type](this, b, a);
                a.itemType = "shape";
                this.shapes.push(a);
                return a
            }, initLabel: function (a, c) {
                a = l(this.options.labelOptions, {controlPointOptions: this.options.controlPointOptions}, a);
                c = new b(this, a, c);
                c.itemType = "label";
                this.labels.push(c);
                return c
            }, redrawItem: function (b, a) {
                b.linkPoints();
                b.shouldBeDrawn() ? (b.graphic || this.renderItem(b), b.redraw(e.pick(a, !0) && b.graphic.placed), b.points.length &&
                this.adjustVisibility(b)) : this.destroyItem(b)
            }, adjustVisibility: function (b) {
                var a = !1, c = b.graphic;
                b.points.forEach(function (b) {
                    !1 !== b.series.visible && !1 !== b.visible && (a = !0)
                });
                a ? "hidden" === c.visibility && c.show() : c.hide()
            }, destroyItem: function (b) {
                n(this[b.itemType + "s"], b);
                b.destroy()
            }, renderItem: function (b) {
                b.render("label" === b.itemType ? this.labelsGroup : this.shapesGroup)
            }
        });
        v.shapesMap = {rect: c, circle: a, path: d, image: h};
        v.types = {};
        v.MockPoint = p;
        v.ControlPoint = x;
        e.extendAnnotation = function (b, a, c, f) {
            a = a ||
                v;
            l(!0, b.prototype, a.prototype, c);
            b.prototype.defaultOptions = l(b.prototype.defaultOptions, f || {})
        };
        e.extend(q, {
            initAnnotation: function (b) {
                var a = v.types[b.type] || v;
                b = e.merge(a.prototype.defaultOptions, b);
                a = new a(this, b);
                this.annotations.push(a);
                return a
            }, addAnnotation: function (b, a) {
                b = this.initAnnotation(b);
                this.options.annotations.push(b.options);
                A(a, !0) && b.redraw();
                return b
            }, removeAnnotation: function (b) {
                var a = this.annotations, c = w(b) ? r(a, function (a) {
                    return a.options.id === b
                }) : b;
                c && (u(c, "remove"), n(this.options.annotations,
                    c.options), n(a, c), c.destroy())
            }, drawAnnotations: function () {
                this.plotBoxClip.attr(this.plotBox);
                this.annotations.forEach(function (b) {
                    b.redraw()
                })
            }
        });
        q.collectionsWithUpdate.push("annotations");
        q.collectionsWithInit.annotations = [q.addAnnotation];
        q.callbacks.push(function (b) {
            b.annotations = [];
            b.options.annotations || (b.options.annotations = []);
            b.plotBoxClip = this.renderer.clipRect(this.plotBox);
            b.controlPointsGroup = b.renderer.g("control-points").attr({zIndex: 99}).clip(b.plotBoxClip).add();
            b.options.annotations.forEach(function (a,
                                                    c) {
                a = b.initAnnotation(a);
                b.options.annotations[c] = a.options
            });
            b.drawAnnotations();
            m(b, "redraw", b.drawAnnotations);
            m(b, "destroy", function () {
                b.plotBoxClip.destroy();
                b.controlPointsGroup.destroy()
            })
        })
    });
    q(k, "annotations/types/CrookedLine.js", [k["parts/Globals.js"]], function (e) {
        function g() {
            c.apply(this, arguments)
        }

        var c = e.Annotation, a = c.MockPoint, d = c.ControlPoint;
        e.extendAnnotation(g, null, {
            setClipAxes: function () {
                this.clipXAxis = this.chart.xAxis[this.options.typeOptions.xAxis];
                this.clipYAxis = this.chart.yAxis[this.options.typeOptions.yAxis]
            },
            getPointsOptions: function () {
                var a = this.options.typeOptions;
                return a.points.map(function (b) {
                    b.xAxis = a.xAxis;
                    b.yAxis = a.yAxis;
                    return b
                })
            }, getControlPointsOptions: function () {
                return this.getPointsOptions()
            }, addControlPoints: function () {
                this.getControlPointsOptions().forEach(function (a, b) {
                    b = new d(this.chart, this, e.merge(this.options.controlPointOptions, a.controlPoint), b);
                    this.controlPoints.push(b);
                    a.controlPoint = b.options
                }, this)
            }, addShapes: function () {
                var a = this.options.typeOptions, b = this.initShape(e.merge(a.line,
                    {
                        type: "path", points: this.points.map(function (b, a) {
                            return function (b) {
                                return b.annotation.points[a]
                            }
                        })
                    }), !1);
                a.line = b.options
            }
        }, {
            typeOptions: {xAxis: 0, yAxis: 0, line: {fill: "none"}}, controlPointOptions: {
                positioner: function (c) {
                    var b = this.graphic;
                    c = a.pointToPixels(c.points[this.index]);
                    return {x: c.x - b.width / 2, y: c.y - b.height / 2}
                }, events: {
                    drag: function (a, b) {
                        b.chart.isInsidePlot(a.chartX - b.chart.plotLeft, a.chartY - b.chart.plotTop) && (a = this.mouseMoveToTranslation(a), b.translatePoint(a.x, a.y, this.index), b.options.typeOptions.points[this.index].x =
                            b.points[this.index].x, b.options.typeOptions.points[this.index].y = b.points[this.index].y, b.redraw(!1))
                    }
                }
            }
        });
        return c.types.crookedLine = g
    });
    q(k, "annotations/types/ElliottWave.js", [k["parts/Globals.js"]], function (e) {
        function g() {
            a.apply(this, arguments)
        }

        var c = e.Annotation, a = c.types.crookedLine;
        e.extendAnnotation(g, a, {
            addLabels: function () {
                this.getPointsOptions().forEach(function (a, c) {
                    var b = this.initLabel(e.merge(a.label, {
                            text: this.options.typeOptions.labels[c],
                            point: function (b) {
                                return b.annotation.points[c]
                            }
                        }),
                        !1);
                    a.label = b.options
                }, this)
            }
        }, {
            typeOptions: {labels: "(0) (A) (B) (C) (D) (E)".split(" "), line: {strokeWidth: 1}},
            labelOptions: {
                align: "center",
                allowOverlap: !0,
                crop: !0,
                overflow: "none",
                type: "rect",
                backgroundColor: "none",
                borderWidth: 0,
                y: -5
            }
        });
        return c.types.elliottWave = g
    });
    q(k, "annotations/types/Tunnel.js", [k["parts/Globals.js"]], function (e) {
        function g() {
            a.apply(this, arguments)
        }

        var c = e.Annotation, a = c.types.crookedLine, d = c.ControlPoint, h = c.MockPoint;
        e.extendAnnotation(g, a, {
            getPointsOptions: function () {
                var b =
                    a.prototype.getPointsOptions.call(this);
                b[2] = this.heightPointOptions(b[1]);
                b[3] = this.heightPointOptions(b[0]);
                return b
            }, getControlPointsOptions: function () {
                return this.getPointsOptions().slice(0, 2)
            }, heightPointOptions: function (b) {
                b = e.merge(b);
                b.y += this.options.typeOptions.height;
                return b
            }, addControlPoints: function () {
                a.prototype.addControlPoints.call(this);
                var b = this.options,
                    c = new d(this.chart, this, e.merge(b.controlPointOptions, b.typeOptions.heightControlPoint), 2);
                this.controlPoints.push(c);
                b.typeOptions.heightControlPoint =
                    c.options
            }, addShapes: function () {
                this.addLine();
                this.addBackground()
            }, addLine: function () {
                var b = this.initShape(e.merge(this.options.typeOptions.line, {
                    type: "path",
                    points: [this.points[0], this.points[1], function (b) {
                        b = h.pointToOptions(b.annotation.points[2]);
                        b.command = "M";
                        return b
                    }, this.points[3]]
                }), !1);
                this.options.typeOptions.line = b.options
            }, addBackground: function () {
                var b = this.initShape(e.merge(this.options.typeOptions.background, {
                    type: "path",
                    points: this.points.slice()
                }));
                this.options.typeOptions.background =
                    b.options
            }, translateSide: function (b, a, c) {
                c = Number(c);
                var f = 0 === c ? 3 : 2;
                this.translatePoint(b, a, c);
                this.translatePoint(b, a, f)
            }, translateHeight: function (b) {
                this.translatePoint(0, b, 2);
                this.translatePoint(0, b, 3);
                this.options.typeOptions.height = this.points[3].y - this.points[0].y
            }
        }, {
            typeOptions: {
                xAxis: 0,
                yAxis: 0,
                background: {fill: "rgba(130, 170, 255, 0.4)", strokeWidth: 0},
                line: {strokeWidth: 1},
                height: -2,
                heightControlPoint: {
                    positioner: function (b) {
                        var a = h.pointToPixels(b.points[2]);
                        b = h.pointToPixels(b.points[3]);
                        var c = (a.x + b.x) / 2;
                        return {
                            x: c - this.graphic.width / 2,
                            y: (b.y - a.y) / (b.x - a.x) * (c - a.x) + a.y - this.graphic.height / 2
                        }
                    }, events: {
                        drag: function (b, a) {
                            a.chart.isInsidePlot(b.chartX - a.chart.plotLeft, b.chartY - a.chart.plotTop) && (a.translateHeight(this.mouseMoveToTranslation(b).y), a.redraw(!1))
                        }
                    }
                }
            }, controlPointOptions: {
                events: {
                    drag: function (b, a) {
                        a.chart.isInsidePlot(b.chartX - a.chart.plotLeft, b.chartY - a.chart.plotTop) && (b = this.mouseMoveToTranslation(b), a.translateSide(b.x, b.y, this.index), a.redraw(!1))
                    }
                }
            }
        });
        return c.types.tunnel =
            g
    });
    q(k, "annotations/types/InfinityLine.js", [k["parts/Globals.js"]], function (e) {
        function g() {
            d.apply(this, arguments)
        }

        var c = e.Annotation, a = c.MockPoint, d = c.types.crookedLine;
        g.findEdgeCoordinate = function (b, a, c, d) {
            var f = "x" === c ? "y" : "x";
            return (a[c] - b[c]) * (d - b[f]) / (a[f] - b[f]) + b[c]
        };
        g.findEdgePoint = function (b, c) {
            var f = b.series.xAxis, d = c.series.yAxis, l = a.pointToPixels(b), e = a.pointToPixels(c), h = e.x - l.x,
                t = e.y - l.y;
            c = f.left;
            var n = c + f.width, f = d.top, d = f + d.height, r = 0 > h ? c : n, w = 0 > t ? f : d, n = {
                x: 0 === h ? l.x : r, y: 0 === t ? l.y :
                    w
            };
            0 !== h && 0 !== t && (h = g.findEdgeCoordinate(l, e, "y", r), l = g.findEdgeCoordinate(l, e, "x", w), h >= f && h <= d ? (n.x = r, n.y = h) : (n.x = l, n.y = w));
            n.x -= c;
            n.y -= f;
            b.series.chart.inverted && (b = n.x, n.x = n.y, n.y = b);
            return n
        };
        var h = function (b, c) {
            return function (f) {
                f = f.annotation;
                var d = f.points, l = f.options.typeOptions.type;
                "horizontalLine" === l ? d = [d[0], new a(f.chart, d[0].target, {
                    x: d[0].x + 1,
                    y: d[0].y,
                    xAxis: d[0].options.xAxis,
                    yAxis: d[0].options.yAxis
                })] : "verticalLine" === l && (d = [d[0], new a(f.chart, d[0].target, {
                    x: d[0].x, y: d[0].y + 1, xAxis: d[0].options.xAxis,
                    yAxis: d[0].options.yAxis
                })]);
                return g.findEdgePoint(d[b], d[c])
            }
        };
        g.endEdgePoint = h(0, 1);
        g.startEdgePoint = h(1, 0);
        e.extendAnnotation(g, d, {
            addShapes: function () {
                var b = this.options.typeOptions, a = [this.points[0], g.endEdgePoint];
                b.type.match(/Line/g) && (a[0] = g.startEdgePoint);
                a = this.initShape(e.merge(b.line, {type: "path", points: a}), !1);
                b.line = a.options
            }
        });
        return c.types.infinityLine = g
    });
    q(k, "annotations/types/Fibonacci.js", [k["parts/Globals.js"]], function (e) {
        function g() {
            this.startRetracements = [];
            this.endRetracements =
                [];
            d.apply(this, arguments)
        }

        var c = e.Annotation, a = c.MockPoint, d = c.types.tunnel, h = function (b, a) {
            return function () {
                var c = this.annotation, f = this.anchor(c.startRetracements[b]).absolutePosition,
                    d = this.anchor(c.endRetracements[b]).absolutePosition,
                    f = ["M", Math.round(f.x), Math.round(f.y), "L", Math.round(d.x), Math.round(d.y)];
                a && (d = this.anchor(c.endRetracements[b - 1]).absolutePosition, c = this.anchor(c.startRetracements[b - 1]).absolutePosition, f.push("L", Math.round(d.x), Math.round(d.y), "L", Math.round(c.x), Math.round(c.y)));
                return f
            }
        };
        g.levels = [0, .236, .382, .5, .618, .786, 1];
        e.extendAnnotation(g, d, {
            linkPoints: function () {
                d.prototype.linkPoints.call(this);
                this.linkRetracementsPoints()
            }, linkRetracementsPoints: function () {
                var b = this.points, a = b[0].y - b[3].y, c = b[1].y - b[2].y, d = b[0].x, l = b[1].x;
                g.levels.forEach(function (f, e) {
                    var m = b[1].y - c * f;
                    this.linkRetracementPoint(e, d, b[0].y - a * f, this.startRetracements);
                    this.linkRetracementPoint(e, l, m, this.endRetracements)
                }, this)
            }, linkRetracementPoint: function (b, c, d, e) {
                var f = e[b], m = this.options.typeOptions;
                f ? (f.options.x = c, f.options.y = d, f.refresh()) : e[b] = new a(this.chart, this, {
                    x: c,
                    y: d,
                    xAxis: m.xAxis,
                    yAxis: m.yAxis
                })
            }, addShapes: function () {
                g.levels.forEach(function (b, a) {
                    this.initShape({type: "path", d: h(a)}, !1);
                    0 < a && this.initShape({
                        type: "path",
                        fill: this.options.typeOptions.backgroundColors[a - 1],
                        strokeWidth: 0,
                        d: h(a, !0)
                    })
                }, this)
            }, addLabels: function () {
                g.levels.forEach(function (b, c) {
                    var d = this.options.typeOptions;
                    b = this.initLabel(e.merge(d.labels[c], {
                        point: function (b) {
                            return a.pointToOptions(b.annotation.startRetracements[c])
                        },
                        text: b.toString()
                    }));
                    d.labels[c] = b.options
                }, this)
            }
        }, {
            typeOptions: {
                height: 2,
                backgroundColors: "rgba(130, 170, 255, 0.4);rgba(139, 191, 216, 0.4);rgba(150, 216, 192, 0.4);rgba(156, 229, 161, 0.4);rgba(162, 241, 130, 0.4);rgba(169, 255, 101, 0.4)".split(";"),
                lineColor: "grey",
                lineColors: [],
                labels: []
            },
            labelOptions: {
                allowOverlap: !0,
                align: "right",
                backgroundColor: "none",
                borderWidth: 0,
                crop: !1,
                overflow: "none",
                shape: "rect",
                style: {color: "grey"},
                verticalAlign: "middle",
                y: 0
            }
        });
        return c.types.fibonacci = g
    });
    q(k, "annotations/types/Pitchfork.js",
        [k["parts/Globals.js"]], function (e) {
            function g() {
                d.apply(this, arguments)
            }

            var c = e.Annotation, a = c.MockPoint, d = c.types.infinityLine;
            g.findEdgePoint = function (b, a, c) {
                a = Math.atan2(c.plotY - a.plotY, c.plotX - a.plotX);
                return {x: b.plotX + 1E7 * Math.cos(a), y: b.plotY + 1E7 * Math.sin(a)}
            };
            g.middleLineEdgePoint = function (b) {
                var c = b.annotation;
                return d.findEdgePoint(c.points[0], new a(c.chart, b, c.midPointOptions()))
            };
            var h = function (b) {
                return function (c) {
                    var d = c.annotation, f = d.points;
                    return g.findEdgePoint(f[b], f[0], new a(d.chart,
                        c, d.midPointOptions()))
                }
            };
            g.topLineEdgePoint = h(1);
            g.bottomLineEdgePoint = h(0);
            e.extendAnnotation(g, d, {
                midPointOptions: function () {
                    var b = this.points;
                    return {
                        x: (b[1].x + b[2].x) / 2,
                        y: (b[1].y + b[2].y) / 2,
                        xAxis: b[0].series.xAxis,
                        yAxis: b[0].series.yAxis
                    }
                }, addShapes: function () {
                    this.addLines();
                    this.addBackgrounds()
                }, addLines: function () {
                    this.initShape({type: "path", points: [this.points[0], g.middleLineEdgePoint]}, !1);
                    this.initShape({type: "path", points: [this.points[1], g.topLineEdgePoint]}, !1);
                    this.initShape({
                        type: "path",
                        points: [this.points[2], g.bottomLineEdgePoint]
                    }, !1)
                }, addBackgrounds: function () {
                    var b = this.shapes, a = this.options.typeOptions, c = this.initShape(e.merge(a.innerBackground, {
                        type: "path", points: [function (b) {
                            var a = b.annotation;
                            b = a.points;
                            a = a.midPointOptions();
                            return {x: (b[1].x + a.x) / 2, y: (b[1].y + a.y) / 2, xAxis: a.xAxis, yAxis: a.yAxis}
                        }, b[1].points[1], b[2].points[1], function (b) {
                            var a = b.annotation;
                            b = a.points;
                            a = a.midPointOptions();
                            return {x: (a.x + b[2].x) / 2, y: (a.y + b[2].y) / 2, xAxis: a.xAxis, yAxis: a.yAxis}
                        }]
                    })), b = this.initShape(e.merge(a.outerBackground,
                        {type: "path", points: [this.points[1], b[1].points[1], b[2].points[1], this.points[2]]}));
                    a.innerBackground = c.options;
                    a.outerBackground = b.options
                }
            }, {
                typeOptions: {
                    innerBackground: {fill: "rgba(130, 170, 255, 0.4)", strokeWidth: 0},
                    outerBackground: {fill: "rgba(156, 229, 161, 0.4)", strokeWidth: 0}
                }
            });
            return c.types.pitchfork = g
        });
    q(k, "annotations/types/VerticalLine.js", [k["parts/Globals.js"]], function (e) {
        function g() {
            e.Annotation.apply(this, arguments)
        }

        var c = e.Annotation, a = c.MockPoint;
        g.connectorFirstPoint = function (c) {
            c =
                c.annotation;
            var d = c.points[0], b = a.pointToPixels(d, !0), f = b.y, e = c.options.typeOptions.label.offset;
            c.chart.inverted && (f = b.x);
            return {x: d.x, xAxis: d.series.xAxis, y: f + e}
        };
        g.connectorSecondPoint = function (c) {
            var d = c.annotation;
            c = d.options.typeOptions;
            var b = d.points[0], f = c.yOffset, d = a.pointToPixels(b, !0)[d.chart.inverted ? "x" : "y"];
            0 > c.label.offset && (f *= -1);
            return {x: b.x, xAxis: b.series.xAxis, y: d + f}
        };
        e.extendAnnotation(g, null, {
            getPointsOptions: function () {
                return [this.options.typeOptions.point]
            }, addShapes: function () {
                var a =
                    this.options.typeOptions, c = this.initShape(e.merge(a.connector, {
                    type: "path",
                    points: [g.connectorFirstPoint, g.connectorSecondPoint]
                }), !1);
                a.connector = c.options
            }, addLabels: function () {
                var a = this.options.typeOptions, c = a.label, b = 0, f = c.offset, g = 0 > c.offset ? "bottom" : "top",
                    k = "center";
                this.chart.inverted && (b = c.offset, f = 0, g = "middle", k = 0 > c.offset ? "right" : "left");
                c = this.initLabel(e.merge(c, {verticalAlign: g, align: k, x: b, y: f}));
                a.label = c.options
            }
        }, {
            typeOptions: {
                yOffset: 10, label: {
                    offset: -40,
                    point: function (a) {
                        return a.annotation.points[0]
                    },
                    allowOverlap: !0,
                    backgroundColor: "none",
                    borderWidth: 0,
                    crop: !0,
                    overflow: "none",
                    shape: "rect",
                    text: "{y:.2f}"
                }, connector: {strokeWidth: 1, markerEnd: "arrow"}
            }
        });
        return c.types.verticalLine = g
    });
    q(k, "annotations/types/Measure.js", [k["parts/Globals.js"]], function (e) {
        function g() {
            c.apply(this, arguments)
        }

        var c = e.Annotation, a = c.ControlPoint, d = e.merge, h = e.isNumber;
        c.types.measure = g;
        e.extendAnnotation(g, null, {
            init: function () {
                c.prototype.init.apply(this, arguments);
                this.resizeY = this.resizeX = this.offsetY = this.offsetX =
                    0;
                this.calculations.init.call(this);
                this.addValues();
                this.addShapes()
            }, setClipAxes: function () {
                this.clipXAxis = this.chart.xAxis[this.options.typeOptions.xAxis];
                this.clipYAxis = this.chart.yAxis[this.options.typeOptions.yAxis]
            }, pointsOptions: function () {
                return this.options.options.points
            }, shapePointsOptions: function () {
                var b = this.options.typeOptions, a = b.xAxis, b = b.yAxis;
                return [{x: this.xAxisMin, y: this.yAxisMin, xAxis: a, yAxis: b}, {
                    x: this.xAxisMax,
                    y: this.yAxisMin,
                    xAxis: a,
                    yAxis: b
                }, {
                    x: this.xAxisMax, y: this.yAxisMax,
                    xAxis: a, yAxis: b
                }, {x: this.xAxisMin, y: this.yAxisMax, xAxis: a, yAxis: b}]
            }, addControlPoints: function () {
                var b = this.options.typeOptions.selectType, c;
                c = new a(this.chart, this, this.options.controlPointOptions, 0);
                this.controlPoints.push(c);
                "xy" !== b && (c = new a(this.chart, this, this.options.controlPointOptions, 1), this.controlPoints.push(c))
            }, addValues: function (b) {
                var a = this.options.typeOptions, c = a.label.formatter, d = this.options.typeOptions, l = this.chart,
                    m = l.options.chart.inverted, g = l.xAxis[d.xAxis], h = l.yAxis[d.yAxis];
                this.calculations.recalculate.call(this, b);
                a.label.enabled && (0 < this.labels.length ? this.labels[0].text = c && c.call(this) || this.calculations.defaultFormatter.call(this) : this.initLabel(e.extend({
                        shape: "rect",
                        backgroundColor: "none",
                        color: "black",
                        borderWidth: 0,
                        dashStyle: "dash",
                        overflow: "none",
                        align: "left",
                        vertical: "top",
                        crop: !0,
                        point: function (b) {
                            b = b.annotation;
                            var a = l.plotTop, c = l.plotLeft;
                            return {
                                x: (m ? a : 10) + g.toPixels(b.xAxisMin, !m),
                                y: (m ? -c + 10 : a) + h.toPixels(b.yAxisMin)
                            }
                        },
                        text: c && c.call(this) || this.calculations.defaultFormatter.call(this)
                    },
                    a.label)))
            }, addShapes: function () {
                this.addCrosshairs();
                this.addBackground()
            }, addBackground: function () {
                void 0 !== this.shapePointsOptions()[0].x && this.initShape(e.extend({
                    type: "path",
                    points: this.shapePointsOptions()
                }, this.options.typeOptions.background), !1)
            }, addCrosshairs: function () {
                var b = this.chart, a = this.options.typeOptions, c = this.options.typeOptions.point,
                    g = b.xAxis[a.xAxis], l = b.yAxis[a.yAxis], m = b.options.chart.inverted,
                    h = g.toPixels(this.xAxisMin), k = g.toPixels(this.xAxisMax), n = l.toPixels(this.yAxisMin),
                    r = l.toPixels(this.yAxisMax), w = {point: c, type: "path"}, c = [], b = [];
                m && (h = l.toPixels(this.yAxisMin), k = l.toPixels(this.yAxisMax), n = g.toPixels(this.xAxisMin), r = g.toPixels(this.xAxisMax));
                a.crosshairX.enabled && (c = ["M", h, n + (r - n) / 2, "L", k, n + (r - n) / 2]);
                a.crosshairY.enabled && (b = ["M", h + (k - h) / 2, n, "L", h + (k - h) / 2, r]);
                0 < this.shapes.length ? (this.shapes[0].options.d = c, this.shapes[1].options.d = b) : (g = d(w, a.crosshairX), a = d(w, a.crosshairY), this.initShape(e.extend({d: c}, g), !1), this.initShape(e.extend({d: b}, a), !1))
            }, onDrag: function (b) {
                var a =
                    this.mouseMoveToTranslation(b), c = this.options.typeOptions.selectType;
                b = "y" === c ? 0 : a.x;
                a = "x" === c ? 0 : a.y;
                this.translate(b, a);
                this.offsetX += b;
                this.offsetY += a;
                this.redraw(!1, !1, !0)
            }, resize: function (b, a, c, d) {
                var f = this.shapes[2];
                "x" === d ? 0 === c ? (f.translatePoint(b, 0, 0), f.translatePoint(b, a, 3)) : (f.translatePoint(b, 0, 1), f.translatePoint(b, a, 2)) : "y" === d ? 0 === c ? (f.translatePoint(0, a, 0), f.translatePoint(0, a, 1)) : (f.translatePoint(0, a, 2), f.translatePoint(0, a, 3)) : (f.translatePoint(b, 0, 1), f.translatePoint(b, a, 2), f.translatePoint(0,
                    a, 3));
                this.calculations.updateStartPoints.call(this, !1, !0, c, b, a);
                this.options.typeOptions.background.height = Math.abs(this.startYMax - this.startYMin);
                this.options.typeOptions.background.width = Math.abs(this.startXMax - this.startXMin)
            }, redraw: function (b, a, c) {
                this.linkPoints();
                this.graphic || this.render();
                c && this.calculations.updateStartPoints.call(this, !0, !1);
                this.addValues(a);
                this.addCrosshairs();
                this.redrawItems(this.shapes, b);
                this.redrawItems(this.labels, b);
                this.controlPoints.forEach(function (b) {
                    b.redraw()
                })
            },
            translate: function (b, a) {
                this.shapes.forEach(function (c) {
                    c.translate(b, a)
                });
                this.options.typeOptions.point.x = this.startXMin;
                this.options.typeOptions.point.y = this.startYMin
            }, calculations: {
                init: function () {
                    var b = this.options.typeOptions, a = this.chart, c = this.calculations.getPointPos,
                        d = a.options.chart.inverted, e = a.xAxis[b.xAxis], m = a.yAxis[b.yAxis], g = b.background,
                        k = d ? g.height : g.width, d = d ? g.width : g.height, g = b.selectType, n = a.plotTop,
                        r = a.plotLeft;
                    this.startXMin = b.point.x;
                    this.startYMin = b.point.y;
                    h(k) ? this.startXMax =
                        this.startXMin + k : this.startXMax = c(e, this.startXMin, parseFloat(k));
                    h(d) ? this.startYMax = this.startYMin - d : this.startYMax = c(m, this.startYMin, parseFloat(d));
                    "x" === g ? (this.startYMin = m.toValue(n), this.startYMax = m.toValue(n + a.plotHeight)) : "y" === g && (this.startXMin = e.toValue(r), this.startXMax = e.toValue(r + a.plotWidth))
                }, recalculate: function (a) {
                    var b = this.calculations, c = this.options.typeOptions, d = this.chart.xAxis[c.xAxis],
                        c = this.chart.yAxis[c.yAxis], e = this.calculations.getPointPos, m = this.offsetX,
                        g = this.offsetY;
                    this.xAxisMin = e(d, this.startXMin, m);
                    this.xAxisMax = e(d, this.startXMax, m);
                    this.yAxisMin = e(c, this.startYMin, g);
                    this.yAxisMax = e(c, this.startYMax, g);
                    this.min = b.min.call(this);
                    this.max = b.max.call(this);
                    this.average = b.average.call(this);
                    this.bins = b.bins.call(this);
                    a && this.resize(0, 0)
                }, getPointPos: function (a, c, d) {
                    return a.toValue(a.toPixels(c) + d)
                }, updateStartPoints: function (a, c, d, e, l) {
                    var b = this.options.typeOptions, f = b.selectType, g = this.chart.xAxis[b.xAxis],
                        b = this.chart.yAxis[b.yAxis], n = this.calculations.getPointPos,
                        r = this.startXMin, h = this.startXMax, k = this.startYMin, y = this.startYMax,
                        p = this.offsetX, z = this.offsetY;
                    c && ("x" === f ? 0 === d ? this.startXMin = n(g, r, e) : this.startXMax = n(g, h, e) : "y" === f ? 0 === d ? this.startYMin = n(b, k, l) : this.startYMax = n(b, y, l) : (this.startXMax = n(g, h, e), this.startYMax = n(b, y, l)));
                    a && (this.startXMin = n(g, r, p), this.startXMax = n(g, h, p), this.startYMin = n(b, k, z), this.startYMax = n(b, y, z), this.offsetY = this.offsetX = 0)
                }, defaultFormatter: function () {
                    return "Min: " + this.min + "\x3cbr\x3eMax: " + this.max + "\x3cbr\x3eAverage: " +
                        this.average + "\x3cbr\x3eBins: " + this.bins
                }, getExtremes: function (a, c, d, e) {
                    return {
                        xAxisMin: Math.min(c, a),
                        xAxisMax: Math.max(c, a),
                        yAxisMin: Math.min(e, d),
                        yAxisMax: Math.max(e, d)
                    }
                }, min: function () {
                    var a = Infinity, c = this.chart.series,
                        d = this.calculations.getExtremes(this.xAxisMin, this.xAxisMax, this.yAxisMin, this.yAxisMax),
                        e = !1;
                    c.forEach(function (b) {
                        b.visible && "highcharts-navigator-series" !== b.options.id && b.points.forEach(function (b) {
                            !b.isNull && b.y < a && b.x > d.xAxisMin && b.x <= d.xAxisMax && b.y > d.yAxisMin && b.y <= d.yAxisMax &&
                            (a = b.y, e = !0)
                        })
                    });
                    e || (a = "");
                    return a
                }, max: function () {
                    var a = -Infinity, c = this.chart.series,
                        d = this.calculations.getExtremes(this.xAxisMin, this.xAxisMax, this.yAxisMin, this.yAxisMax),
                        e = !1;
                    c.forEach(function (b) {
                        b.visible && "highcharts-navigator-series" !== b.options.id && b.points.forEach(function (b) {
                            !b.isNull && b.y > a && b.x > d.xAxisMin && b.x <= d.xAxisMax && b.y > d.yAxisMin && b.y <= d.yAxisMax && (a = b.y, e = !0)
                        })
                    });
                    e || (a = "");
                    return a
                }, average: function () {
                    var a = "";
                    "" !== this.max && "" !== this.min && (a = (this.max + this.min) / 2);
                    return a
                },
                bins: function () {
                    var a = 0, c = this.chart.series,
                        d = this.calculations.getExtremes(this.xAxisMin, this.xAxisMax, this.yAxisMin, this.yAxisMax),
                        e = !1;
                    c.forEach(function (b) {
                        b.visible && "highcharts-navigator-series" !== b.options.id && b.points.forEach(function (b) {
                            !b.isNull && b.x > d.xAxisMin && b.x <= d.xAxisMax && b.y > d.yAxisMin && b.y <= d.yAxisMax && (a++, e = !0)
                        })
                    });
                    e || (a = "");
                    return a
                }
            }
        }, {
            typeOptions: {
                selectType: "xy",
                xAxis: 0,
                yAxis: 0,
                background: {fill: "rgba(130, 170, 255, 0.4)", strokeWidth: 0, stroke: void 0},
                crosshairX: {
                    enabled: !0,
                    zIndex: 6, dashStyle: "Dash", markerEnd: "arrow"
                },
                crosshairY: {enabled: !0, zIndex: 6, dashStyle: "Dash", markerEnd: "arrow"},
                label: {enabled: !0, style: {fontSize: "11px", color: "#666666"}, formatter: void 0}
            }, controlPointOptions: {
                positioner: function (a) {
                    var b = this.index, c = a.chart, d = a.options, e = d.typeOptions, g = e.selectType,
                        d = d.controlPointOptions, h = c.options.chart.inverted, k = c.xAxis[e.xAxis],
                        c = c.yAxis[e.yAxis], e = a.xAxisMax, n = a.yAxisMax,
                        r = a.calculations.getExtremes(a.xAxisMin, a.xAxisMax, a.yAxisMin, a.yAxisMax);
                    "x" === g &&
                    (n = (r.yAxisMax - r.yAxisMin) / 2, 0 === b && (e = a.xAxisMin));
                    "y" === g && (e = r.xAxisMin + (r.xAxisMax - r.xAxisMin) / 2, 0 === b && (n = a.yAxisMin));
                    h ? (a = c.toPixels(n), b = k.toPixels(e)) : (a = k.toPixels(e), b = c.toPixels(n));
                    return {x: a - d.width / 2, y: b - d.height / 2}
                }, events: {
                    drag: function (a, c) {
                        var b = this.mouseMoveToTranslation(a);
                        a = c.options.typeOptions.selectType;
                        var d = "y" === a ? 0 : b.x, b = "x" === a ? 0 : b.y;
                        c.resize(d, b, this.index, a);
                        c.resizeX += d;
                        c.resizeY += b;
                        c.redraw(!1, !0)
                    }
                }
            }
        });
        return c.types.measure = g
    });
    q(k, "mixins/navigation.js", [], function () {
        return {
            initUpdate: function (e) {
                e.navigation ||
                (e.navigation = {
                    updates: [], update: function (e, c) {
                        this.updates.forEach(function (a) {
                            a.update.call(a.context, e, c)
                        })
                    }
                })
            }, addUpdate: function (e, g) {
                g.navigation || this.initUpdate(g);
                g.navigation.updates.push({update: e, context: g})
            }
        }
    });
    q(k, "annotations/navigationBindings.js", [k["parts/Globals.js"], k["mixins/navigation.js"]], function (e, g) {
        function c(a) {
            var b = a.prototype.defaultOptions.events && a.prototype.defaultOptions.events.click;
            e.merge(!0, a.prototype.defaultOptions.events, {
                click: function (a) {
                    var c = this, d = c.chart.navigationBindings,
                        e = d.activeAnnotation;
                    b && b.click.call(c, a);
                    e !== c ? (d.deselectAnnotation(), d.activeAnnotation = c, c.setControlPointsVisibility(!0), l(d, "showPopup", {
                        annotation: c,
                        formType: "annotation-toolbar",
                        options: d.annotationToFields(c),
                        onSubmit: function (a) {
                            var b = {};
                            "remove" === a.actionType ? (d.activeAnnotation = !1, d.chart.removeAnnotation(c)) : (d.fieldsToOptions(a.fields, b), d.deselectAnnotation(), a = b.typeOptions, "measure" === c.options.type && (a.crosshairY.enabled = 0 !== a.crosshairY.strokeWidth, a.crosshairX.enabled = 0 !== a.crosshairX.strokeWidth),
                                c.update(b))
                        }
                    })) : (d.deselectAnnotation(), l(d, "closePopup"));
                    a.activeAnnotation = !0
                }
            })
        }

        var a = e.doc, d = e.win, h = e.addEvent, b = e.pick, f = e.merge, k = e.extend, q = e.isNumber,
            l = e.fireEvent, m = e.isArray, u = e.isObject, t = e.objectEach;
        e.NavigationBindings = function (b, c) {
            this.chart = b;
            this.options = c;
            this.eventsToUnbind = [];
            this.container = a.getElementsByClassName(this.options.bindingsClassName)
        };
        e.NavigationBindings.annotationsEditable = {
            nestedOptions: {
                labelOptions: ["style", "format", "backgroundColor"],
                labels: ["style"],
                label: ["style"],
                style: ["fontSize", "color"],
                background: ["fill", "strokeWidth", "stroke"],
                innerBackground: ["fill", "strokeWidth", "stroke"],
                outerBackground: ["fill", "strokeWidth", "stroke"],
                shapeOptions: ["fill", "strokeWidth", "stroke"],
                shapes: ["fill", "strokeWidth", "stroke"],
                line: ["strokeWidth", "stroke"],
                backgroundColors: [!0],
                connector: ["fill", "strokeWidth", "stroke"],
                crosshairX: ["strokeWidth", "stroke"],
                crosshairY: ["strokeWidth", "stroke"]
            },
            circle: ["shapes"],
            verticalLine: [],
            label: ["labelOptions"],
            measure: ["background", "crosshairY",
                "crosshairX"],
            fibonacci: [],
            tunnel: ["background", "line", "height"],
            pitchfork: ["innerBackground", "outerBackground"],
            rect: ["shapes"],
            crookedLine: []
        };
        e.NavigationBindings.annotationsNonEditable = {rectangle: ["crosshairX", "crosshairY", "label"]};
        k(e.NavigationBindings.prototype, {
            initEvents: function () {
                var a = this, b = a.chart, c = a.container, d = a.options;
                a.boundClassNames = {};
                t(d.bindings, function (b) {
                    a.boundClassNames[b.className] = b
                });
                [].forEach.call(c, function (b) {
                    a.eventsToUnbind.push(h(b, "click", function (b) {
                        var d =
                            a.getButtonEvents(c, b);
                        d && a.bindingsButtonClick(d.button, d.events, b)
                    }))
                });
                t(d.events || {}, function (b, c) {
                    e.isFunction(b) && a.eventsToUnbind.push(h(a, c, b))
                });
                a.eventsToUnbind.push(h(b.container, "click", function (c) {
                    !b.cancelClick && b.isInsidePlot(c.chartX - b.plotLeft, c.chartY - b.plotTop) && a.bindingsChartClick(this, c)
                }));
                a.eventsToUnbind.push(h(b.container, "mousemove", function (b) {
                    a.bindingsContainerMouseMove(this, b)
                }))
            }, initUpdate: function () {
                var a = this;
                g.addUpdate(function (b) {
                    a.update(b)
                }, this.chart)
            }, bindingsButtonClick: function (a,
                                              b, c) {
                var d = this.chart;
                this.selectedButtonElement && (l(this, "deselectButton", {button: this.selectedButtonElement}), this.nextEvent && (this.currentUserDetails && "annotations" === this.currentUserDetails.coll && d.removeAnnotation(this.currentUserDetails), this.mouseMoveEvent = this.nextEvent = !1));
                this.selectedButton = b;
                this.selectedButtonElement = a;
                l(this, "selectButton", {button: a});
                b.init && b.init.call(this, a, c);
                (b.start || b.steps) && d.renderer.boxWrapper.addClass("highcharts-draw-mode")
            }, bindingsChartClick: function (a,
                                             b) {
                a = this.selectedButton;
                var c = this.chart.renderer.boxWrapper, e;
                if (e = this.activeAnnotation && !b.activeAnnotation && b.target.parentNode) {
                    a:{
                        e = b.target;
                        var f = d.Element.prototype, g = f.matches || f.msMatchesSelector || f.webkitMatchesSelector,
                            m = null;
                        if (f.closest) m = f.closest.call(e, ".highcharts-popup"); else {
                            do {
                                if (g.call(e, ".highcharts-popup")) break a;
                                e = e.parentElement || e.parentNode
                            } while (null !== e && 1 === e.nodeType)
                        }
                        e = m
                    }
                    e = !e
                }
                e && (l(this, "closePopup"), this.deselectAnnotation());
                a && a.start && (this.nextEvent ? (this.nextEvent(b,
                    this.currentUserDetails), this.steps && (this.stepIndex++, a.steps[this.stepIndex] ? this.mouseMoveEvent = this.nextEvent = a.steps[this.stepIndex] : (l(this, "deselectButton", {button: this.selectedButtonElement}), c.removeClass("highcharts-draw-mode"), a.end && a.end.call(this, b, this.currentUserDetails), this.mouseMoveEvent = this.nextEvent = !1, this.selectedButton = null))) : (this.currentUserDetails = a.start.call(this, b), a.steps ? (this.stepIndex = 0, this.steps = !0, this.mouseMoveEvent = this.nextEvent = a.steps[this.stepIndex]) : (l(this,
                    "deselectButton", {button: this.selectedButtonElement}), c.removeClass("highcharts-draw-mode"), this.steps = !1, this.selectedButton = null, a.end && a.end.call(this, b, this.currentUserDetails))))
            }, bindingsContainerMouseMove: function (a, b) {
                this.mouseMoveEvent && this.mouseMoveEvent(b, this.currentUserDetails)
            }, fieldsToOptions: function (a, c) {
                t(a, function (a, d) {
                    var e = parseFloat(a), f = d.split("."), l = c, g = f.length - 1;
                    !q(e) || a.match(/px/g) || d.match(/format/g) || (a = e);
                    "" !== a && "undefined" !== a && f.forEach(function (c, d) {
                        var e = b(f[d +
                        1], "");
                        g === d ? l[c] = a : (l[c] || (l[c] = e.match(/\d/g) ? [] : {}), l = l[c])
                    })
                });
                return c
            }, deselectAnnotation: function () {
                this.activeAnnotation && (this.activeAnnotation.setControlPointsVisibility(!1), this.activeAnnotation = !1)
            }, annotationToFields: function (a) {
                function c(b, d, f, h) {
                    var k;
                    f && -1 === n.indexOf(d) && (0 <= (f.indexOf && f.indexOf(d)) || f[d] || !0 === f) && (m(b) ? (h[d] = [], b.forEach(function (a, b) {
                        u(a) ? (h[d][b] = {}, t(a, function (a, e) {
                            c(a, e, l[d], h[d][b])
                        })) : c(a, 0, l[d], h[d])
                    })) : u(b) ? (k = {}, m(h) ? (h.push(k), k[d] = {}, k = k[d]) : h[d] =
                        k, t(b, function (a, b) {
                        c(a, b, 0 === d ? f : l[d], k)
                    })) : "format" === d ? h[d] = [e.format(b, a.labels[0].points[0]).toString(), "text"] : m(h) ? h.push([b, g(b)]) : h[d] = [b, g(b)])
                }

                var d = a.options, f = e.NavigationBindings.annotationsEditable, l = f.nestedOptions,
                    g = this.utils.getFieldType,
                    h = b(d.type, d.shapes && d.shapes[0] && d.shapes[0].type, d.labels && d.labels[0] && d.labels[0].itemType, "label"),
                    n = e.NavigationBindings.annotationsNonEditable[d.langKey] || [], k = {langKey: d.langKey, type: h};
                t(d, function (a, b) {
                    "typeOptions" === b ? (k[b] = {}, t(d[b],
                        function (a, d) {
                            c(a, d, l, k[b], !0)
                        })) : c(a, b, f[h], k)
                });
                return k
            }, getClickedClassNames: function (a, b) {
                var c = b.target;
                b = [];
                for (var d; c && ((d = e.attr(c, "class")) && (b = b.concat(d.split(" ").map(function (a) {
                    return [a, c]
                }))), c = c.parentNode, c !== a);) ;
                return b
            }, getButtonEvents: function (a, b) {
                var c = this, d;
                this.getClickedClassNames(a, b).forEach(function (a) {
                    c.boundClassNames[a[0]] && !d && (d = {events: c.boundClassNames[a[0]], button: a[1]})
                });
                return d
            }, update: function (a) {
                this.options = f(!0, this.options, a);
                this.removeEvents();
                this.initEvents()
            },
            removeEvents: function () {
                this.eventsToUnbind.forEach(function (a) {
                    a()
                })
            }, destroy: function () {
                this.removeEvents()
            }, utils: {
                updateRectSize: function (a, b) {
                    var c = b.options.typeOptions, d = this.chart.xAxis[0].toValue(a.chartX);
                    a = this.chart.yAxis[0].toValue(a.chartY);
                    b.update({typeOptions: {background: {width: d - c.point.x, height: c.point.y - a}}})
                }, getFieldType: function (a) {
                    return {string: "text", number: "number", "boolean": "checkbox"}[typeof a]
                }
            }
        });
        e.Chart.prototype.initNavigationBindings = function () {
            var a = this.options;
            a && a.navigation && a.navigation.bindings && (this.navigationBindings = new e.NavigationBindings(this, a.navigation), this.navigationBindings.initEvents(), this.navigationBindings.initUpdate())
        };
        h(e.Chart, "load", function () {
            this.initNavigationBindings()
        });
        h(e.Chart, "destroy", function () {
            this.navigationBindings && this.navigationBindings.destroy()
        });
        h(e.NavigationBindings, "deselectButton", function () {
            this.selectedButtonElement = null
        });
        e.Annotation && (c(e.Annotation), e.objectEach(e.Annotation.types, function (a) {
            c(a)
        }));
        e.setOptions({
            lang: {
                navigation: {
                    popup: {
                        simpleShapes: "Simple shapes",
                        lines: "Lines",
                        circle: "Circle",
                        rectangle: "Rectangle",
                        label: "Label",
                        shapeOptions: "Shape options",
                        typeOptions: "Details",
                        fill: "Fill",
                        format: "Text",
                        strokeWidth: "Line width",
                        stroke: "Line color",
                        title: "Title",
                        name: "Name",
                        labelOptions: "Label options",
                        labels: "Labels",
                        backgroundColor: "Background color",
                        backgroundColors: "Background colors",
                        borderColor: "Border color",
                        borderRadius: "Border radius",
                        borderWidth: "Border width",
                        style: "Style",
                        padding: "Padding",
                        fontSize: "Font size",
                        color: "Color",
                        height: "Height",
                        shapes: "Shape options"
                    }
                }
            }, navigation: {
                bindingsClassName: "highcharts-bindings-container", bindings: {
                    circleAnnotation: {
                        className: "highcharts-circle-annotation", start: function (a) {
                            var b = this.chart.xAxis[0].toValue(a.chartX);
                            a = this.chart.yAxis[0].toValue(a.chartY);
                            var c = this.chart.options.navigation, d = c && c.bindings;
                            return this.chart.addAnnotation(f({
                                langKey: "circle", shapes: [{
                                    type: "circle", point: {xAxis: 0, yAxis: 0, x: b, y: a}, r: 5, controlPoints: [{
                                        positioner: function (a) {
                                            var b =
                                                e.Annotation.MockPoint.pointToPixels(a.points[0]);
                                            a = a.options.r;
                                            return {
                                                x: b.x + a * Math.cos(Math.PI / 4) - this.graphic.width / 2,
                                                y: b.y + a * Math.sin(Math.PI / 4) - this.graphic.height / 2
                                            }
                                        }, events: {
                                            drag: function (a, b) {
                                                var c = b.annotation;
                                                a = this.mouseMoveToTranslation(a);
                                                b.setRadius(Math.max(b.options.r + a.y / Math.sin(Math.PI / 4), 5));
                                                c.options.shapes[0] = c.userOptions.shapes[0] = b.options;
                                                b.redraw(!1)
                                            }
                                        }
                                    }]
                                }]
                            }, c.annotationsOptions, d.circle && d.circle.annotationsOptions))
                        }, steps: [function (a, b) {
                            var c = b.options.shapes[0].point,
                                d = this.chart.xAxis[0].toPixels(c.x), c = this.chart.yAxis[0].toPixels(c.y);
                            b.update({shapes: [{r: Math.max(Math.sqrt(Math.pow(d - a.chartX, 2) + Math.pow(c - a.chartY, 2)), 5)}]})
                        }]
                    }, rectangleAnnotation: {
                        className: "highcharts-rectangle-annotation", start: function (a) {
                            var b = this.chart.xAxis[0].toValue(a.chartX);
                            a = this.chart.yAxis[0].toValue(a.chartY);
                            var c = this.chart.options.navigation, d = c && c.bindings;
                            return this.chart.addAnnotation(f({
                                langKey: "rectangle", shapes: [{
                                    type: "rect", point: {x: b, y: a, xAxis: 0, yAxis: 0}, width: 5,
                                    height: 5, controlPoints: [{
                                        positioner: function (a) {
                                            var b = e.Annotation.MockPoint.pointToPixels(a.points[0]);
                                            return {x: b.x + a.options.width - 4, y: b.y + a.options.height - 4}
                                        }, events: {
                                            drag: function (a, b) {
                                                var c = b.annotation;
                                                a = this.mouseMoveToTranslation(a);
                                                b.options.width = Math.max(b.options.width + a.x, 5);
                                                b.options.height = Math.max(b.options.height + a.y, 5);
                                                c.options.shapes[0] = b.options;
                                                c.userOptions.shapes[0] = b.options;
                                                b.redraw(!1)
                                            }
                                        }
                                    }]
                                }]
                            }, c.annotationsOptions, d.rect && d.rect.annotationsOptions))
                        }, steps: [function (a, b) {
                            var c =
                                    this.chart.yAxis[0], d = b.options.shapes[0].point,
                                e = this.chart.xAxis[0].toPixels(d.x), c = c.toPixels(d.y);
                            b.update({
                                shapes: [{
                                    width: Math.max(a.chartX - e, 5),
                                    height: Math.max(a.chartY - c, 5),
                                    point: {x: d.x, y: d.y}
                                }]
                            })
                        }]
                    }, labelAnnotation: {
                        className: "highcharts-label-annotation", start: function (a) {
                            var b = this.chart.xAxis[0].toValue(a.chartX);
                            a = this.chart.yAxis[0].toValue(a.chartY);
                            var c = this.chart.options.navigation, d = c && c.bindings;
                            this.chart.addAnnotation(f({
                                langKey: "label", labelOptions: {format: "{y:.2f}"}, labels: [{
                                    point: {
                                        x: b,
                                        y: a, xAxis: 0, yAxis: 0
                                    }, controlPoints: [{
                                        symbol: "triangle-down", positioner: function (a) {
                                            if (!a.graphic.placed) return {x: 0, y: -9E7};
                                            a = e.Annotation.MockPoint.pointToPixels(a.points[0]);
                                            return {x: a.x - this.graphic.width / 2, y: a.y - this.graphic.height / 2}
                                        }, events: {
                                            drag: function (a, b) {
                                                a = this.mouseMoveToTranslation(a);
                                                b.translatePoint(a.x, a.y);
                                                b.annotation.labels[0].options = b.options;
                                                b.redraw(!1)
                                            }
                                        }
                                    }, {
                                        symbol: "square", positioner: function (a) {
                                            return a.graphic.placed ? {
                                                x: a.graphic.alignAttr.x - this.graphic.width / 2,
                                                y: a.graphic.alignAttr.y -
                                                    this.graphic.height / 2
                                            } : {x: 0, y: -9E7}
                                        }, events: {
                                            drag: function (a, b) {
                                                a = this.mouseMoveToTranslation(a);
                                                b.translate(a.x, a.y);
                                                b.annotation.labels[0].options = b.options;
                                                b.redraw(!1)
                                            }
                                        }
                                    }], overflow: "none", crop: !0
                                }]
                            }, c.annotationsOptions, d.label && d.label.annotationsOptions))
                        }
                    }
                }, events: {}, annotationsOptions: {}
            }
        })
    });
    q(k, "annotations/popup.js", [k["parts/Globals.js"]], function (e) {
        var g = e.addEvent, c = e.createElement, a = e.objectEach, d = e.pick, h = e.wrap, b = e.isString,
            f = e.isObject, k = e.isArray, q = /\d/g;
        h(e.Pointer.prototype,
            "onContainerMouseDown", function (a, c) {
                var d = c.target && c.target.className;
                b(d) && 0 <= d.indexOf("highcharts-popup-field") || a.apply(this, Array.prototype.slice.call(arguments, 1))
            });
        e.Popup = function (a) {
            this.init(a)
        };
        e.Popup.prototype = {
            init: function (a) {
                this.container = c("div", {className: "highcharts-popup"}, null, a);
                this.lang = this.getLangpack();
                this.addCloseBtn()
            }, addCloseBtn: function () {
                var a = this, b;
                b = c("div", {className: "highcharts-popup-close"}, null, this.container);
                ["click", "touchstart"].forEach(function (c) {
                    g(b,
                        c, function () {
                            a.closePopup()
                        })
                })
            }, addColsContainer: function (a) {
                var b;
                b = c("div", {className: "highcharts-popup-lhs-col"}, null, a);
                a = c("div", {className: "highcharts-popup-rhs-col"}, null, a);
                c("div", {className: "highcharts-popup-rhs-col-wrapper"}, null, a);
                return {lhsCol: b, rhsCol: a}
            }, addInput: function (a, b, d, e) {
                var f = a.split("."), f = f[f.length - 1], l = this.lang;
                b = "highcharts-" + b + "-" + f;
                b.match(q) || c("label", {innerHTML: l[f] || f, htmlFor: b}, null, d);
                c("input", {name: b, value: e[0], type: e[1], className: "highcharts-popup-field"},
                    null, d).setAttribute("highcharts-data-name", a)
            }, addButton: function (a, b, d, e, f) {
                var l = this, h = this.closePopup, m = this.getFields, k;
                k = c("button", {innerHTML: b}, null, a);
                ["click", "touchstart"].forEach(function (a) {
                    g(k, a, function () {
                        h.call(l);
                        return e(m(f, d))
                    })
                });
                return k
            }, getFields: function (a, b) {
                var c = a.querySelectorAll("input"),
                    d = a.querySelectorAll("#highcharts-select-series \x3e option:checked")[0];
                a = a.querySelectorAll("#highcharts-select-volume \x3e option:checked")[0];
                var e, f, l;
                l = {
                    actionType: b, linkedTo: d &&
                        d.getAttribute("value"), fields: {}
                };
                [].forEach.call(c, function (a) {
                    f = a.getAttribute("highcharts-data-name");
                    (e = a.getAttribute("highcharts-data-series-id")) ? l.seriesId = a.value : f ? l.fields[f] = a.value : l.type = a.value
                });
                a && (l.fields["params.volumeSeriesID"] = a.getAttribute("value"));
                return l
            }, showPopup: function () {
                var a = this.container, b = a.querySelectorAll(".highcharts-popup-close")[0];
                a.innerHTML = "";
                0 <= a.className.indexOf("highcharts-annotation-toolbar") && (a.classList.remove("highcharts-annotation-toolbar"),
                    a.removeAttribute("style"));
                a.appendChild(b);
                a.style.display = "block"
            }, closePopup: function () {
                this.popup.container.style.display = "none"
            }, showForm: function (a, b, c, d) {
                this.popup = b.navigationBindings.popup;
                this.showPopup();
                "indicators" === a && this.indicators.addForm.call(this, b, c, d);
                "annotation-toolbar" === a && this.annotations.addToolbar.call(this, b, c, d);
                "annotation-edit" === a && this.annotations.addForm.call(this, b, c, d);
                "flag" === a && this.annotations.addForm.call(this, b, c, d, !0)
            }, getLangpack: function () {
                return e.getOptions().lang.navigation.popup
            },
            annotations: {
                addToolbar: function (a, b, e) {
                    var f = this, l = this.lang, g = this.popup.container, h = this.showForm, k;
                    -1 === g.className.indexOf("highcharts-annotation-toolbar") && (g.className += " highcharts-annotation-toolbar");
                    g.style.top = a.plotTop + 10 + "px";
                    c("span", {innerHTML: d(l[b.langKey] || b.langKey, b.shapes && b.shapes[0].type)}, null, g);
                    k = this.addButton(g, l.removeButton || "remove", "remove", e, g);
                    k.className += " highcharts-annotation-remove-button";
                    k = this.addButton(g, l.editButton || "edit", "edit", function () {
                        h.call(f,
                            "annotation-edit", a, b, e)
                    }, g);
                    k.className += " highcharts-annotation-edit-button"
                }, addForm: function (a, b, d, e) {
                    var f = this.popup.container, g = this.lang, l, h;
                    c("h2", {innerHTML: g[b.langKey] || b.langKey, className: "highcharts-popup-main-title"}, null, f);
                    h = c("div", {className: "highcharts-popup-lhs-col highcharts-popup-lhs-full"}, null, f);
                    l = c("div", {className: "highcharts-popup-bottom-row"}, null, f);
                    this.annotations.addFormFields.call(this, h, a, "", b, [], !0);
                    this.addButton(l, e ? g.addButton || "add" : g.saveButton || "save", e ?
                        "add" : "save", d, f)
                }, addFormFields: function (b, d, e, g, h, r) {
                    var l = this, m = this.annotations.addFormFields, n = this.addInput, u = this.lang, t, p;
                    a(g, function (a, c) {
                        t = "" !== e ? e + "." + c : c;
                        f(a) && (!k(a) || k(a) && f(a[0]) ? (p = u[c] || c, p.match(q) || h.push([!0, p, b]), m.call(l, b, d, t, a, h, !1)) : h.push([l, t, "annotation", b, a]))
                    });
                    r && (h = h.sort(function (a) {
                        return a[1].match(/format/g) ? -1 : 1
                    }), h.forEach(function (a) {
                        !0 === a[0] ? c("span", {
                            className: "highcharts-annotation-title",
                            innerHTML: a[1]
                        }, null, a[2]) : n.apply(a[0], a.splice(1))
                    }))
                }
            }, indicators: {
                addForm: function (a,
                                   b, c) {
                    var d = this.indicators, e = this.lang, f;
                    this.tabs.init.call(this, a);
                    b = this.popup.container.querySelectorAll(".highcharts-tab-item-content");
                    this.addColsContainer(b[0]);
                    d.addIndicatorList.call(this, a, b[0], "add");
                    f = b[0].querySelectorAll(".highcharts-popup-rhs-col")[0];
                    this.addButton(f, e.addButton || "add", "add", c, f);
                    this.addColsContainer(b[1]);
                    d.addIndicatorList.call(this, a, b[1], "edit");
                    f = b[1].querySelectorAll(".highcharts-popup-rhs-col")[0];
                    this.addButton(f, e.saveButton || "save", "edit", c, f);
                    this.addButton(f,
                        e.removeButton || "remove", "remove", c, f)
                }, addIndicatorList: function (b, d, e) {
                    var f = this, h = d.querySelectorAll(".highcharts-popup-lhs-col")[0];
                    d = d.querySelectorAll(".highcharts-popup-rhs-col")[0];
                    var l = "edit" === e, k = l ? b.series : b.options.plotOptions, m = this.indicators.addFormFields,
                        u, p, q;
                    p = c("ul", {className: "highcharts-indicator-list"}, null, h);
                    u = d.querySelectorAll(".highcharts-popup-rhs-col-wrapper")[0];
                    a(k, function (a, d) {
                        var e = a.options;
                        if (a.params || e && e.params) {
                            var h = f.indicators.getNameType(a, d), n = h.type;
                            q = c("li", {className: "highcharts-indicator-list", innerHTML: h.name}, null, p);
                            ["click", "touchstart"].forEach(function (d) {
                                g(q, d, function () {
                                    m.call(f, b, l ? a : k[n], h.type, u);
                                    l && a.options && c("input", {
                                        type: "hidden",
                                        name: "highcharts-id-" + n,
                                        value: a.options.id
                                    }, null, u).setAttribute("highcharts-data-series-id", a.options.id)
                                })
                            })
                        }
                    });
                    0 < p.childNodes.length && p.childNodes[0].click()
                }, getNameType: function (a, b) {
                    var c = a.options, d = e.seriesTypes, d = d[b] && d[b].prototype.nameBase || b.toUpperCase();
                    c && c.type && (b = a.options.type,
                        d = a.name);
                    return {name: d, type: b}
                }, listAllSeries: function (a, b, d, e) {
                    a = "highcharts-" + b + "-type-" + a;
                    var f, g;
                    c("label", {innerHTML: this.lang[b] || b, htmlFor: a}, null, e);
                    f = c("select", {name: a, className: "highcharts-popup-field"}, null, e);
                    f.setAttribute("id", "highcharts-select-" + b);
                    d.series.forEach(function (a) {
                        g = a.options;
                        !g.params && g.id && "highcharts-navigator-series" !== g.id && c("option", {
                            innerHTML: g.name || g.id,
                            value: g.id
                        }, null, f)
                    })
                }, addFormFields: function (a, b, d, e) {
                    var f = b.params || b.options.params, g = this.indicators.getNameType;
                    e.innerHTML = "";
                    c("h3", {className: "highcharts-indicator-title", innerHTML: g(b, d).name}, null, e);
                    c("input", {type: "hidden", name: "highcharts-type-" + d, value: d}, null, e);
                    this.indicators.listAllSeries.call(this, d, "series", a, e);
                    f.volumeSeriesID && this.indicators.listAllSeries.call(this, d, "volume", a, e);
                    this.indicators.addParamInputs.call(this, a, "params", f, d, e)
                }, addParamInputs: function (b, c, d, e, g) {
                    var h = this, l = this.indicators.addParamInputs, k = this.addInput, m;
                    a(d, function (a, d) {
                        m = c + "." + d;
                        f(a) ? l.call(h, b, m, a, e, g) :
                            "params.volumeSeriesID" !== m && k.call(h, m, e, g, [a, "text"])
                    })
                }, getAmount: function () {
                    var b = 0;
                    a(this.series, function (a) {
                        var c = a.options;
                        (a.params || c && c.params) && b++
                    });
                    return b
                }
            }, tabs: {
                init: function (a) {
                    var b = this.tabs;
                    a = this.indicators.getAmount.call(a);
                    var c;
                    c = b.addMenuItem.call(this, "add");
                    b.addMenuItem.call(this, "edit", a);
                    b.addContentItem.call(this, "add");
                    b.addContentItem.call(this, "edit");
                    b.switchTabs.call(this, a);
                    b.selectTab.call(this, c, 0)
                }, addMenuItem: function (a, b) {
                    var d = this.popup.container, e = "highcharts-tab-item",
                        f = this.lang;
                    0 === b && (e += " highcharts-tab-disabled");
                    b = c("span", {innerHTML: f[a + "Button"] || a, className: e}, null, d);
                    b.setAttribute("highcharts-data-tab-type", a);
                    return b
                }, addContentItem: function () {
                    return c("div", {className: "highcharts-tab-item-content"}, null, this.popup.container)
                }, switchTabs: function (a) {
                    var b = this, c;
                    this.popup.container.querySelectorAll(".highcharts-tab-item").forEach(function (d, e) {
                        c = d.getAttribute("highcharts-data-tab-type");
                        "edit" === c && 0 === a || ["click", "touchstart"].forEach(function (a) {
                            g(d,
                                a, function () {
                                    b.tabs.deselectAll.call(b);
                                    b.tabs.selectTab.call(b, this, e)
                                })
                        })
                    })
                }, selectTab: function (a, b) {
                    var c = this.popup.container.querySelectorAll(".highcharts-tab-item-content");
                    a.className += " highcharts-tab-item-active";
                    c[b].className += " highcharts-tab-item-show"
                }, deselectAll: function () {
                    var a = this.popup.container, b = a.querySelectorAll(".highcharts-tab-item"),
                        a = a.querySelectorAll(".highcharts-tab-item-content"), c;
                    for (c = 0; c < b.length; c++) b[c].classList.remove("highcharts-tab-item-active"), a[c].classList.remove("highcharts-tab-item-show")
                }
            }
        };
        g(e.NavigationBindings, "showPopup", function (a) {
            this.popup || (this.popup = new e.Popup(this.chart.container));
            this.popup.showForm(a.formType, this.chart, a.options, a.onSubmit)
        });
        g(e.NavigationBindings, "closePopup", function () {
            this.popup && this.popup.closePopup()
        })
    });
    q(k, "masters/modules/annotations-advanced.src.js", [], function () {
    })
});
//# sourceMappingURL=annotations-advanced.js.map
