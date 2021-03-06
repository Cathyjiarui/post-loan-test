/*
 Highcharts JS v7.1.2 (2019-06-03)

 Annotations module

 (c) 2009-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (f) {
    "object" === typeof module && module.exports ? (f["default"] = f, module.exports = f) : "function" === typeof define && define.amd ? define("highcharts/modules/annotations", ["highcharts"], function (n) {
        f(n);
        f.Highcharts = n;
        return f
    }) : f("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (f) {
    function n(d, g, a, b) {
        d.hasOwnProperty(g) || (d[g] = b.apply(null, a))
    }

    f = f ? f._modules : {};
    n(f, "annotations/eventEmitterMixin.js", [f["parts/Globals.js"]], function (d) {
        var g = d.fireEvent;
        return {
            addEvents: function () {
                var a =
                    this;
                d.addEvent(a.graphic.element, "mousedown", function (b) {
                    a.onMouseDown(b)
                });
                d.objectEach(a.options.events, function (b, c) {
                    var h = function (h) {
                        "click" === c && a.cancelClick || b.call(a, a.chart.pointer.normalize(h), a.target)
                    };
                    if (-1 === d.inArray(c, a.nonDOMEvents || [])) a.graphic.on(c, h); else d.addEvent(a, c, h)
                });
                a.options.draggable && (d.addEvent(a, "drag", a.onDrag), a.graphic.renderer.styledMode || a.graphic.css({
                    cursor: {
                        x: "ew-resize",
                        y: "ns-resize",
                        xy: "move"
                    }[a.options.draggable]
                }));
                a.isUpdating || g(a, "add")
            }, removeDocEvents: function () {
                this.removeDrag &&
                (this.removeDrag = this.removeDrag());
                this.removeMouseUp && (this.removeMouseUp = this.removeMouseUp())
            }, onMouseDown: function (a) {
                var b = this, c = b.chart.pointer, h, m;
                a.preventDefault && a.preventDefault();
                2 !== a.button && (a.stopPropagation(), a = c.normalize(a), h = a.chartX, m = a.chartY, b.cancelClick = !1, b.removeDrag = d.addEvent(d.doc, "mousemove", function (a) {
                    b.hasDragged = !0;
                    a = c.normalize(a);
                    a.prevChartX = h;
                    a.prevChartY = m;
                    g(b, "drag", a);
                    h = a.chartX;
                    m = a.chartY
                }), b.removeMouseUp = d.addEvent(d.doc, "mouseup", function (c) {
                    b.cancelClick =
                        b.hasDragged;
                    b.hasDragged = !1;
                    g(d.pick(b.target, b), "afterUpdate");
                    b.onMouseUp(c)
                }))
            }, onMouseUp: function () {
                var a = this.chart, b = this.target || this, c = a.options.annotations, a = a.annotations.indexOf(b);
                this.removeDocEvents();
                c[a] = b.options
            }, onDrag: function (a) {
                if (this.chart.isInsidePlot(a.chartX - this.chart.plotLeft, a.chartY - this.chart.plotTop)) {
                    var b = this.mouseMoveToTranslation(a);
                    "x" === this.options.draggable && (b.y = 0);
                    "y" === this.options.draggable && (b.x = 0);
                    this.points.length ? this.translate(b.x, b.y) : (this.shapes.forEach(function (c) {
                        c.translate(b.x,
                            b.y)
                    }), this.labels.forEach(function (c) {
                        c.translate(b.x, b.y)
                    }));
                    this.redraw(!1)
                }
            }, mouseMoveToRadians: function (a, b, c) {
                var h = a.prevChartY - c, d = a.prevChartX - b;
                c = a.chartY - c;
                a = a.chartX - b;
                this.chart.inverted && (b = d, d = h, h = b, b = a, a = c, c = b);
                return Math.atan2(c, a) - Math.atan2(h, d)
            }, mouseMoveToTranslation: function (a) {
                var b = a.chartX - a.prevChartX;
                a = a.chartY - a.prevChartY;
                var c;
                this.chart.inverted && (c = a, a = b, b = c);
                return {x: b, y: a}
            }, mouseMoveToScale: function (a, b, c) {
                b = (a.chartX - b || 1) / (a.prevChartX - b || 1);
                a = (a.chartY - c || 1) /
                    (a.prevChartY - c || 1);
                this.chart.inverted && (c = a, a = b, b = c);
                return {x: b, y: a}
            }, destroy: function () {
                this.removeDocEvents();
                d.removeEvent(this);
                this.hcEvents = null
            }
        }
    });
    n(f, "annotations/ControlPoint.js", [f["parts/Globals.js"], f["annotations/eventEmitterMixin.js"]], function (d, g) {
        function a(b, c, a, m) {
            this.chart = b;
            this.target = c;
            this.options = a;
            this.index = d.pick(a.index, m)
        }

        d.extend(a.prototype, g);
        a.prototype.nonDOMEvents = ["drag"];
        a.prototype.setVisibility = function (b) {
            this.graphic.attr("visibility", b ? "visible" : "hidden");
            this.options.visible = b
        };
        a.prototype.render = function () {
            var b = this.chart, c = this.options;
            this.graphic = b.renderer.symbol(c.symbol, 0, 0, c.width, c.height).add(b.controlPointsGroup).css(c.style);
            this.setVisibility(c.visible);
            this.addEvents()
        };
        a.prototype.redraw = function (b) {
            this.graphic[b ? "animate" : "attr"](this.options.positioner.call(this, this.target))
        };
        a.prototype.destroy = function () {
            g.destroy.call(this);
            this.graphic && (this.graphic = this.graphic.destroy());
            this.options = this.target = this.chart = null
        };
        a.prototype.update =
            function (b) {
                var c = this.chart, a = this.target, m = this.index;
                b = d.merge(!0, this.options, b);
                this.destroy();
                this.constructor(c, a, b, m);
                this.render(c.controlPointsGroup);
                this.redraw()
            };
        return a
    });
    n(f, "annotations/MockPoint.js", [f["parts/Globals.js"]], function (d) {
        function g(a, b, c) {
            this.series = {visible: !0, chart: a, getPlotBox: d.Series.prototype.getPlotBox};
            this.target = b || null;
            this.options = c;
            this.applyOptions(this.getOptions())
        }

        g.fromPoint = function (a) {
            return new g(a.series.chart, null, {
                x: a.x, y: a.y, xAxis: a.series.xAxis,
                yAxis: a.series.yAxis
            })
        };
        g.pointToPixels = function (a, b) {
            var c = a.series, h = c.chart, d = a.plotX, k = a.plotY;
            h.inverted && (a.mock ? (d = a.plotY, k = a.plotX) : (d = h.plotWidth - a.plotY, k = h.plotHeight - a.plotX));
            c && !b && (a = c.getPlotBox(), d += a.translateX, k += a.translateY);
            return {x: d, y: k}
        };
        g.pointToOptions = function (a) {
            return {x: a.x, y: a.y, xAxis: a.series.xAxis, yAxis: a.series.yAxis}
        };
        d.extend(g.prototype, {
            mock: !0, hasDynamicOptions: function () {
                return "function" === typeof this.options
            }, getOptions: function () {
                return this.hasDynamicOptions() ?
                    this.options(this.target) : this.options
            }, applyOptions: function (a) {
                this.command = a.command;
                this.setAxis(a, "x");
                this.setAxis(a, "y");
                this.refresh()
            }, setAxis: function (a, b) {
                b += "Axis";
                a = a[b];
                var c = this.series.chart;
                this.series[b] = a instanceof d.Axis ? a : d.defined(a) ? c[b][a] || c.get(a) : null
            }, toAnchor: function () {
                var a = [this.plotX, this.plotY, 0, 0];
                this.series.chart.inverted && (a[0] = this.plotY, a[1] = this.plotX);
                return a
            }, getLabelConfig: function () {
                return {x: this.x, y: this.y, point: this}
            }, isInsidePane: function () {
                var a =
                    this.plotX, b = this.plotY, c = this.series.xAxis, h = this.series.yAxis, m = !0;
                c && (m = d.defined(a) && 0 <= a && a <= c.len);
                h && (m = m && d.defined(b) && 0 <= b && b <= h.len);
                return m
            }, refresh: function () {
                var a = this.series, b = a.xAxis, a = a.yAxis, c = this.getOptions();
                b ? (this.x = c.x, this.plotX = b.toPixels(c.x, !0)) : (this.x = null, this.plotX = c.x);
                a ? (this.y = c.y, this.plotY = a.toPixels(c.y, !0)) : (this.y = null, this.plotY = c.y);
                this.isInside = this.isInsidePane()
            }, translate: function (a, b, c, h) {
                this.hasDynamicOptions() || (this.plotX += c, this.plotY += h, this.refreshOptions())
            },
            scale: function (a, b, c, h) {
                if (!this.hasDynamicOptions()) {
                    var d = this.plotY * h;
                    this.plotX = (1 - c) * a + this.plotX * c;
                    this.plotY = (1 - h) * b + d;
                    this.refreshOptions()
                }
            }, rotate: function (a, b, c) {
                if (!this.hasDynamicOptions()) {
                    var h = Math.cos(c);
                    c = Math.sin(c);
                    var d = this.plotX, k = this.plotY, d = d - a, k = k - b;
                    this.plotX = d * h - k * c + a;
                    this.plotY = d * c + k * h + b;
                    this.refreshOptions()
                }
            }, refreshOptions: function () {
                var a = this.series, b = a.xAxis, a = a.yAxis;
                this.x = this.options.x = b ? this.options.x = b.toValue(this.plotX, !0) : this.plotX;
                this.y = this.options.y =
                    a ? a.toValue(this.plotY, !0) : this.plotY
            }
        });
        return g
    });
    n(f, "annotations/controllable/controllableMixin.js", [f["parts/Globals.js"], f["annotations/ControlPoint.js"], f["annotations/MockPoint.js"]], function (d, g, a) {
        return {
            init: function (b, c, a) {
                this.annotation = b;
                this.chart = b.chart;
                this.options = c;
                this.points = [];
                this.controlPoints = [];
                this.index = a;
                this.linkPoints();
                this.addControlPoints()
            }, attr: function () {
                this.graphic.attr.apply(this.graphic, arguments)
            }, getPointsOptions: function () {
                var b = this.options;
                return b.points ||
                    b.point && d.splat(b.point)
            }, attrsFromOptions: function (b) {
                var c = this.constructor.attrsMap, a = {}, d, k, g = this.chart.styledMode;
                for (d in b) k = c[d], !k || g && -1 !== ["fill", "stroke", "stroke-width"].indexOf(k) || (a[k] = b[d]);
                return a
            }, anchor: function (b) {
                var c = b.series.getPlotBox();
                b = b.mock ? b.toAnchor() : d.Tooltip.prototype.getAnchor.call({chart: b.series.chart}, b);
                b = {
                    x: b[0] + (this.options.x || 0),
                    y: b[1] + (this.options.y || 0),
                    height: b[2] || 0,
                    width: b[3] || 0
                };
                return {
                    relativePosition: b, absolutePosition: d.merge(b, {
                        x: b.x + c.translateX,
                        y: b.y + c.translateY
                    })
                }
            }, point: function (b, c) {
                if (b && b.series) return b;
                c && null !== c.series || (d.isObject(b) ? c = new a(this.chart, this, b) : d.isString(b) ? c = this.chart.get(b) || null : "function" === typeof b && (c = b.call(c, this), c = c.series ? c : new a(this.chart, this, b)));
                return c
            }, linkPoints: function () {
                var b = this.getPointsOptions(), c = this.points, a = b && b.length || 0, d, k;
                for (d = 0; d < a; d++) {
                    k = this.point(b[d], c[d]);
                    if (!k) {
                        c.length = 0;
                        return
                    }
                    k.mock && k.refresh();
                    c[d] = k
                }
                return c
            }, addControlPoints: function () {
                var b = this.options.controlPoints;
                (b || []).forEach(function (c, a) {
                    c = d.merge(this.options.controlPointOptions, c);
                    c.index || (c.index = a);
                    b[a] = c;
                    this.controlPoints.push(new g(this.chart, this, c))
                }, this)
            }, shouldBeDrawn: function () {
                return !!this.points.length
            }, render: function () {
                this.controlPoints.forEach(function (b) {
                    b.render()
                })
            }, redraw: function (b) {
                this.controlPoints.forEach(function (c) {
                    c.redraw(b)
                })
            }, transform: function (b, c, a, d, k) {
                if (this.chart.inverted) {
                    var h = c;
                    c = a;
                    a = h
                }
                this.points.forEach(function (h, e) {
                    this.transformPoint(b, c, a, d, k, e)
                }, this)
            },
            transformPoint: function (b, c, h, d, k, g) {
                var m = this.points[g];
                m.mock || (m = this.points[g] = a.fromPoint(m));
                m[b](c, h, d, k)
            }, translate: function (a, c) {
                this.transform("translate", null, null, a, c)
            }, translatePoint: function (a, c, h) {
                this.transformPoint("translate", null, null, a, c, h)
            }, translateShape: function (a, c) {
                var b = this.annotation.chart, d = this.annotation.userOptions,
                    k = b.annotations.indexOf(this.annotation), b = b.options.annotations[k];
                this.translatePoint(a, c, 0);
                b[this.collection][this.index].point = this.options.point;
                d[this.collection][this.index].point = this.options.point
            }, rotate: function (a, c, d) {
                this.transform("rotate", a, c, d)
            }, scale: function (a, c, d, m) {
                this.transform("scale", a, c, d, m)
            }, setControlPointsVisibility: function (a) {
                this.controlPoints.forEach(function (c) {
                    c.setVisibility(a)
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
                var c = this.annotation;
                a = d.merge(!0, this.options, a);
                var b = this.graphic.parentGroup;
                this.destroy();
                this.constructor(c, a);
                this.render(b);
                this.redraw()
            }
        }
    });
    n(f, "annotations/controllable/markerMixin.js", [f["parts/Globals.js"]], function (d) {
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
        d.SVGRenderer.prototype.addMarker = function (a, c) {
            var b = {id: a}, m = {stroke: c.color || "none", fill: c.color || "rgba(0, 0, 0, 0.75)"};
            b.children = c.children.map(function (a) {
                return d.merge(m, a)
            });
            c = this.definition(d.merge(!0, {
                markerWidth: 20,
                markerHeight: 20,
                refX: 0,
                refY: 0,
                orient: "auto"
            }, c, b));
            c.id = a;
            return c
        };
        var a = function (a) {
            return function (c) {
                this.attr(a, "url(#" + c + ")")
            }
        }, a = {
            markerEndSetter: a("marker-end"),
            markerStartSetter: a("marker-start"), setItemMarkers: function (a) {
                var c = a.options, b = a.chart, m = b.options.defs, k = c.fill,
                    g = d.defined(k) && "none" !== k ? k : c.stroke;
                ["markerStart", "markerEnd"].forEach(function (h) {
                    var e = c[h], l, k, q;
                    if (e) {
                        for (q in m) if (l = m[q], e === l.id && "marker" === l.tagName) {
                            k = l;
                            break
                        }
                        k && (e = a[h] = b.renderer.addMarker((c.id || d.uniqueKey()) + "-" + k.id, d.merge(k, {color: g})), a.attr(h, e.attr("id")))
                    }
                })
            }
        };
        d.SVGRenderer.prototype.definition = function (a) {
            function c(a, h) {
                var m;
                d.splat(a).forEach(function (a) {
                    var e =
                        b.createElement(a.tagName), l = {};
                    d.objectEach(a, function (a, c) {
                        "tagName" !== c && "children" !== c && "textContent" !== c && (l[c] = a)
                    });
                    e.attr(l);
                    e.add(h || b.defs);
                    a.textContent && e.element.appendChild(d.doc.createTextNode(a.textContent));
                    c(a.children || [], e);
                    m = e
                });
                return m
            }

            var b = this;
            return c(a)
        };
        d.addEvent(d.Chart, "afterGetContainer", function () {
            this.options.defs = d.merge(g, this.options.defs || {});
            d.objectEach(this.options.defs, function (a) {
                "marker" === a.tagName && !1 !== a.render && this.renderer.addMarker(a.id, a)
            }, this)
        });
        return a
    });
    n(f, "annotations/controllable/ControllablePath.js", [f["parts/Globals.js"], f["annotations/controllable/controllableMixin.js"], f["annotations/controllable/markerMixin.js"]], function (d, g, a) {
        function b(a, c, b) {
            this.init(a, c, b);
            this.collection = "shapes"
        }

        var c = "rgba(192,192,192," + (d.svg ? .0001 : .002) + ")";
        b.attrsMap = {
            dashStyle: "dashstyle",
            strokeWidth: "stroke-width",
            stroke: "stroke",
            fill: "fill",
            zIndex: "zIndex"
        };
        d.merge(!0, b.prototype, g, {
            type: "path", setMarkers: a.setItemMarkers, toD: function () {
                var a = this.options.d;
                if (a) return "function" === typeof a ? a.call(this) : a;
                for (var c = this.points, b = c.length, d = b, g = c[0], e = d && this.anchor(g).absolutePosition, l = 0, r = 2, a = e && ["M", e.x, e.y]; ++l < b && d;) g = c[l], d = g.command || "L", e = this.anchor(g).absolutePosition, "Z" === d ? a[++r] = d : (d !== c[l - 1].command && (a[++r] = d), a[++r] = e.x, a[++r] = e.y), d = g.series.visible;
                return d ? this.chart.renderer.crispLine(a, this.graphic.strokeWidth()) : null
            }, shouldBeDrawn: function () {
                return g.shouldBeDrawn.call(this) || !!this.options.d
            }, render: function (b) {
                var h = this.options,
                    k = this.attrsFromOptions(h);
                this.graphic = this.annotation.chart.renderer.path(["M", 0, 0]).attr(k).add(b);
                h.className && this.graphic.addClass(h.className);
                this.tracker = this.annotation.chart.renderer.path(["M", 0, 0]).addClass("highcharts-tracker-line").attr({zIndex: 2}).add(b);
                this.annotation.chart.styledMode || this.tracker.attr({
                    "stroke-linejoin": "round",
                    stroke: c,
                    fill: c,
                    "stroke-width": this.graphic.strokeWidth() + 2 * h.snap
                });
                g.render.call(this);
                d.extend(this.graphic, {markerStartSetter: a.markerStartSetter, markerEndSetter: a.markerEndSetter});
                this.setMarkers(this)
            }, redraw: function (a) {
                var c = this.toD(), b = a ? "animate" : "attr";
                c ? (this.graphic[b]({d: c}), this.tracker[b]({d: c})) : (this.graphic.attr({d: "M 0 -9000000000"}), this.tracker.attr({d: "M 0 -9000000000"}));
                this.graphic.placed = this.tracker.placed = !!c;
                g.redraw.call(this, a)
            }
        });
        return b
    });
    n(f, "annotations/controllable/ControllableRect.js", [f["parts/Globals.js"], f["annotations/controllable/controllableMixin.js"], f["annotations/controllable/ControllablePath.js"]], function (d, g, a) {
        function b(a, b,
                   d) {
            this.init(a, b, d);
            this.collection = "shapes"
        }

        b.attrsMap = d.merge(a.attrsMap, {width: "width", height: "height"});
        d.merge(!0, b.prototype, g, {
            type: "rect", translate: g.translateShape, render: function (a) {
                var c = this.attrsFromOptions(this.options);
                this.graphic = this.annotation.chart.renderer.rect(0, -9E9, 0, 0).attr(c).add(a);
                g.render.call(this)
            }, redraw: function (a) {
                var c = this.anchor(this.points[0]).absolutePosition;
                if (c) this.graphic[a ? "animate" : "attr"]({
                    x: c.x,
                    y: c.y,
                    width: this.options.width,
                    height: this.options.height
                });
                else this.attr({x: 0, y: -9E9});
                this.graphic.placed = !!c;
                g.redraw.call(this, a)
            }
        });
        return b
    });
    n(f, "annotations/controllable/ControllableCircle.js", [f["parts/Globals.js"], f["annotations/controllable/controllableMixin.js"], f["annotations/controllable/ControllablePath.js"]], function (d, g, a) {
        function b(a, b, d) {
            this.init(a, b, d);
            this.collection = "shapes"
        }

        b.attrsMap = d.merge(a.attrsMap, {r: "r"});
        d.merge(!0, b.prototype, g, {
            type: "circle", translate: g.translateShape, render: function (a) {
                var c = this.attrsFromOptions(this.options);
                this.graphic = this.annotation.chart.renderer.circle(0, -9E9, 0).attr(c).add(a);
                g.render.call(this)
            }, redraw: function (a) {
                var c = this.anchor(this.points[0]).absolutePosition;
                if (c) this.graphic[a ? "animate" : "attr"]({
                    x: c.x,
                    y: c.y,
                    r: this.options.r
                }); else this.graphic.attr({x: 0, y: -9E9});
                this.graphic.placed = !!c;
                g.redraw.call(this, a)
            }, setRadius: function (a) {
                this.options.r = a
            }
        });
        return b
    });
    n(f, "annotations/controllable/ControllableLabel.js", [f["parts/Globals.js"], f["annotations/controllable/controllableMixin.js"], f["annotations/MockPoint.js"]],
        function (d, g, a) {
            function b(a, b, d) {
                this.init(a, b, d);
                this.collection = "labels"
            }

            b.shapesWithoutBackground = ["connector"];
            b.alignedPosition = function (a, b) {
                var c = a.align, d = a.verticalAlign, h = (b.x || 0) + (a.x || 0), g = (b.y || 0) + (a.y || 0), e, l;
                "right" === c ? e = 1 : "center" === c && (e = 2);
                e && (h += (b.width - (a.width || 0)) / e);
                "bottom" === d ? l = 1 : "middle" === d && (l = 2);
                l && (g += (b.height - (a.height || 0)) / l);
                return {x: Math.round(h), y: Math.round(g)}
            };
            b.justifiedOptions = function (a, b, d, k) {
                var c = d.align, h = d.verticalAlign, e = b.box ? 0 : b.padding || 0, l = b.getBBox();
                b = {align: c, verticalAlign: h, x: d.x, y: d.y, width: b.width, height: b.height};
                d = k.x - a.plotLeft;
                var g = k.y - a.plotTop;
                k = d + e;
                0 > k && ("right" === c ? b.align = "left" : b.x = -k);
                k = d + l.width - e;
                k > a.plotWidth && ("left" === c ? b.align = "right" : b.x = a.plotWidth - k);
                k = g + e;
                0 > k && ("bottom" === h ? b.verticalAlign = "top" : b.y = -k);
                k = g + l.height - e;
                k > a.plotHeight && ("top" === h ? b.verticalAlign = "bottom" : b.y = a.plotHeight - k);
                return b
            };
            b.attrsMap = {
                backgroundColor: "fill",
                borderColor: "stroke",
                borderWidth: "stroke-width",
                zIndex: "zIndex",
                borderRadius: "r",
                padding: "padding"
            };
            d.merge(!0, b.prototype, g, {
                translatePoint: function (a, b) {
                    g.translatePoint.call(this, a, b, 0)
                }, translate: function (a, b) {
                    var c = this.annotation.chart, d = this.annotation.userOptions,
                        h = c.annotations.indexOf(this.annotation), c = c.options.annotations[h];
                    this.options.x += a;
                    this.options.y += b;
                    c[this.collection][this.index].x = this.options.x;
                    c[this.collection][this.index].y = this.options.y;
                    d[this.collection][this.index].x = this.options.x;
                    d[this.collection][this.index].y = this.options.y
                }, render: function (a) {
                    var c = this.options,
                        d = this.attrsFromOptions(c), k = c.style;
                    this.graphic = this.annotation.chart.renderer.label("", 0, -9999, c.shape, null, null, c.useHTML, null, "annotation-label").attr(d).add(a);
                    this.annotation.chart.styledMode || ("contrast" === k.color && (k.color = this.annotation.chart.renderer.getContrast(-1 < b.shapesWithoutBackground.indexOf(c.shape) ? "#FFFFFF" : c.backgroundColor)), this.graphic.css(c.style).shadow(c.shadow));
                    c.className && this.graphic.addClass(c.className);
                    this.graphic.labelrank = c.labelrank;
                    g.render.call(this)
                }, redraw: function (a) {
                    var c =
                        this.options, b = this.text || c.format || c.text, k = this.graphic, f = this.points[0];
                    k.attr({text: b ? d.format(b, f.getLabelConfig(), this.annotation.chart.time) : c.formatter.call(f, this)});
                    c = this.anchor(f);
                    (b = this.position(c)) ? (k.alignAttr = b, b.anchorX = c.absolutePosition.x, b.anchorY = c.absolutePosition.y, k[a ? "animate" : "attr"](b)) : k.attr({
                        x: 0,
                        y: -9999
                    });
                    k.placed = !!b;
                    g.redraw.call(this, a)
                }, anchor: function () {
                    var a = g.anchor.apply(this, arguments), b = this.options.x || 0, d = this.options.y || 0;
                    a.absolutePosition.x -= b;
                    a.absolutePosition.y -=
                        d;
                    a.relativePosition.x -= b;
                    a.relativePosition.y -= d;
                    return a
                }, position: function (c) {
                    var h = this.graphic, g = this.annotation.chart, k = this.points[0], f = this.options,
                        n = c.absolutePosition, e = c.relativePosition, l;
                    if (c = k.series.visible && a.prototype.isInsidePane.call(k)) f.distance ? l = d.Tooltip.prototype.getPosition.call({
                        chart: g,
                        distance: d.pick(f.distance, 16)
                    }, h.width, h.height, {
                        plotX: e.x,
                        plotY: e.y,
                        negative: k.negative,
                        ttBelow: k.ttBelow,
                        h: e.height || e.width
                    }) : f.positioner ? l = f.positioner.call(this) : (k = {
                        x: n.x, y: n.y, width: 0,
                        height: 0
                    }, l = b.alignedPosition(d.extend(f, {
                        width: h.width,
                        height: h.height
                    }), k), "justify" === this.options.overflow && (l = b.alignedPosition(b.justifiedOptions(g, h, f, l), k))), f.crop && (f = l.x - g.plotLeft, k = l.y - g.plotTop, c = g.isInsidePlot(f, k) && g.isInsidePlot(f + h.width, k + h.height));
                    return c ? l : null
                }
            });
            d.SVGRenderer.prototype.symbols.connector = function (a, b, g, k, f) {
                var c = f && f.anchorX;
                f = f && f.anchorY;
                var e, l, h = g / 2;
                d.isNumber(c) && d.isNumber(f) && (e = ["M", c, f], l = b - f, 0 > l && (l = -k - l), l < g && (h = c < a + g / 2 ? l : g - l), f > b + k ? e.push("L",
                    a + h, b + k) : f < b ? e.push("L", a + h, b) : c < a ? e.push("L", a, b + k / 2) : c > a + g && e.push("L", a + g, b + k / 2));
                return e || []
            };
            return b
        });
    n(f, "annotations/controllable/ControllableImage.js", [f["parts/Globals.js"], f["annotations/controllable/controllableMixin.js"], f["annotations/controllable/ControllableLabel.js"]], function (d, g, a) {
        function b(a, b, d) {
            this.init(a, b, d);
            this.collection = "shapes"
        }

        b.attrsMap = {width: "width", height: "height", zIndex: "zIndex"};
        d.merge(!0, b.prototype, g, {
            type: "image", translate: g.translateShape, render: function (a) {
                var b =
                    this.attrsFromOptions(this.options), c = this.options;
                this.graphic = this.annotation.chart.renderer.image(c.src, 0, -9E9, c.width, c.height).attr(b).add(a);
                this.graphic.width = c.width;
                this.graphic.height = c.height;
                g.render.call(this)
            }, redraw: function (b) {
                var c = this.anchor(this.points[0]);
                if (c = a.prototype.position.call(this, c)) this.graphic[b ? "animate" : "attr"]({
                    x: c.x,
                    y: c.y
                }); else this.graphic.attr({x: 0, y: -9E9});
                this.graphic.placed = !!c;
                g.redraw.call(this, b)
            }
        });
        return b
    });
    n(f, "annotations/annotations.src.js", [f["parts/Globals.js"],
        f["annotations/controllable/controllableMixin.js"], f["annotations/controllable/ControllableRect.js"], f["annotations/controllable/ControllableCircle.js"], f["annotations/controllable/ControllablePath.js"], f["annotations/controllable/ControllableImage.js"], f["annotations/controllable/ControllableLabel.js"], f["annotations/eventEmitterMixin.js"], f["annotations/MockPoint.js"], f["annotations/ControlPoint.js"]], function (d, g, a, b, c, f, m, k, n, u) {
        var e = d.merge, l = d.addEvent, h = d.fireEvent, q = d.defined, p = d.erase, t =
                d.find, y = d.isString, x = d.pick, z = d.reduce, A = d.splat, B = d.destroyObjectProperties,
            w = d.Chart.prototype, v = d.Annotation = function (a, b) {
                var c;
                this.chart = a;
                this.points = [];
                this.controlPoints = [];
                this.coll = "annotations";
                this.labels = [];
                this.shapes = [];
                this.options = b;
                this.userOptions = e(!0, {}, b);
                c = this.getLabelsAndShapesOptions(this.userOptions, b);
                this.userOptions.labels = c.labels;
                this.userOptions.shapes = c.shapes;
                this.init(a, b)
            };
        e(!0, v.prototype, g, k, {
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
                        return q(this.y) ? this.y : "Annotation label"
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
            }, getLabelsAndShapesOptions: function (a, b) {
                var c = {};
                ["labels", "shapes"].forEach(function (d) {
                    a[d] && (c[d] = A(b[d]).map(function (b, c) {
                        return e(a[d][c], b)
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
                var a = this.chart.xAxis, b = this.chart.yAxis,
                    c = z((this.options.labels || []).concat(this.options.shapes || []), function (c, d) {
                        return [a[d && d.point && d.point.xAxis] || c[0], b[d && d.point && d.point.yAxis] || c[1]]
                    }, []);
                this.clipXAxis = c[0];
                this.clipYAxis = c[1]
            }, getClipBox: function () {
                return {
                    x: this.clipXAxis.left, y: this.clipYAxis.top,
                    width: this.clipXAxis.width, height: this.clipYAxis.height
                }
            }, setLabelCollector: function () {
                var a = this;
                a.labelCollector = function () {
                    return a.labels.reduce(function (a, b) {
                        b.options.allowOverlap || a.push(b.graphic);
                        return a
                    }, [])
                };
                a.chart.labelCollectors.push(a.labelCollector)
            }, setOptions: function (a) {
                this.options = e(this.defaultOptions, a)
            }, redraw: function (a) {
                this.linkPoints();
                this.graphic || this.render();
                this.clipRect && this.clipRect.animate(this.getClipBox());
                this.redrawItems(this.shapes, a);
                this.redrawItems(this.labels,
                    a);
                g.redraw.call(this, a)
            }, redrawItems: function (a, b) {
                for (var c = a.length; c--;) this.redrawItem(a[c], b)
            }, render: function () {
                var a = this.chart.renderer;
                this.graphic = a.g("annotation").attr({
                    zIndex: this.options.zIndex,
                    visibility: this.options.visible ? "visible" : "hidden"
                }).add();
                this.shapesGroup = a.g("annotation-shapes").add(this.graphic).clip(this.chart.plotBoxClip);
                this.labelsGroup = a.g("annotation-labels").attr({translateX: 0, translateY: 0}).add(this.graphic);
                this.clipRect && this.graphic.clip(this.clipRect);
                this.addEvents();
                g.render.call(this)
            }, setVisibility: function (a) {
                var b = this.options;
                a = x(a, !b.visible);
                this.graphic.attr("visibility", a ? "visible" : "hidden");
                a || this.setControlPointsVisibility(!1);
                b.visible = a
            }, setControlPointsVisibility: function (a) {
                var b = function (b) {
                    b.setControlPointsVisibility(a)
                };
                g.setControlPointsVisibility.call(this, a);
                this.shapes.forEach(b);
                this.labels.forEach(b)
            }, destroy: function () {
                var a = this.chart, b = function (a) {
                    a.destroy()
                };
                this.labels.forEach(b);
                this.shapes.forEach(b);
                this.clipYAxis = this.clipXAxis =
                    null;
                p(a.labelCollectors, this.labelCollector);
                k.destroy.call(this);
                g.destroy.call(this);
                B(this, a)
            }, remove: function () {
                return this.chart.removeAnnotation(this)
            }, update: function (a) {
                var b = this.chart, c = this.getLabelsAndShapesOptions(this.userOptions, a),
                    e = b.annotations.indexOf(this);
                a = d.merge(!0, this.userOptions, a);
                a.labels = c.labels;
                a.shapes = c.shapes;
                this.destroy();
                this.constructor(b, a);
                b.options.annotations[e] = a;
                this.isUpdating = !0;
                this.redraw();
                this.isUpdating = !1;
                h(this, "afterUpdate")
            }, initShape: function (a,
                                    b) {
                a = e(this.options.shapeOptions, {controlPointOptions: this.options.controlPointOptions}, a);
                b = new v.shapesMap[a.type](this, a, b);
                b.itemType = "shape";
                this.shapes.push(b);
                return b
            }, initLabel: function (a, b) {
                a = e(this.options.labelOptions, {controlPointOptions: this.options.controlPointOptions}, a);
                b = new m(this, a, b);
                b.itemType = "label";
                this.labels.push(b);
                return b
            }, redrawItem: function (a, b) {
                a.linkPoints();
                a.shouldBeDrawn() ? (a.graphic || this.renderItem(a), a.redraw(d.pick(b, !0) && a.graphic.placed), a.points.length &&
                this.adjustVisibility(a)) : this.destroyItem(a)
            }, adjustVisibility: function (a) {
                var b = !1, c = a.graphic;
                a.points.forEach(function (a) {
                    !1 !== a.series.visible && !1 !== a.visible && (b = !0)
                });
                b ? "hidden" === c.visibility && c.show() : c.hide()
            }, destroyItem: function (a) {
                p(this[a.itemType + "s"], a);
                a.destroy()
            }, renderItem: function (a) {
                a.render("label" === a.itemType ? this.labelsGroup : this.shapesGroup)
            }
        });
        v.shapesMap = {rect: a, circle: b, path: c, image: f};
        v.types = {};
        v.MockPoint = n;
        v.ControlPoint = u;
        d.extendAnnotation = function (a, b, c, d) {
            b = b ||
                v;
            e(!0, a.prototype, b.prototype, c);
            a.prototype.defaultOptions = e(a.prototype.defaultOptions, d || {})
        };
        d.extend(w, {
            initAnnotation: function (a) {
                var b = v.types[a.type] || v;
                a = d.merge(b.prototype.defaultOptions, a);
                b = new b(this, a);
                this.annotations.push(b);
                return b
            }, addAnnotation: function (a, b) {
                a = this.initAnnotation(a);
                this.options.annotations.push(a.options);
                x(b, !0) && a.redraw();
                return a
            }, removeAnnotation: function (a) {
                var b = this.annotations, c = y(a) ? t(b, function (b) {
                    return b.options.id === a
                }) : a;
                c && (h(c, "remove"), p(this.options.annotations,
                    c.options), p(b, c), c.destroy())
            }, drawAnnotations: function () {
                this.plotBoxClip.attr(this.plotBox);
                this.annotations.forEach(function (a) {
                    a.redraw()
                })
            }
        });
        w.collectionsWithUpdate.push("annotations");
        w.collectionsWithInit.annotations = [w.addAnnotation];
        w.callbacks.push(function (a) {
            a.annotations = [];
            a.options.annotations || (a.options.annotations = []);
            a.plotBoxClip = this.renderer.clipRect(this.plotBox);
            a.controlPointsGroup = a.renderer.g("control-points").attr({zIndex: 99}).clip(a.plotBoxClip).add();
            a.options.annotations.forEach(function (b,
                                                    c) {
                b = a.initAnnotation(b);
                a.options.annotations[c] = b.options
            });
            a.drawAnnotations();
            l(a, "redraw", a.drawAnnotations);
            l(a, "destroy", function () {
                a.plotBoxClip.destroy();
                a.controlPointsGroup.destroy()
            })
        })
    });
    n(f, "mixins/navigation.js", [], function () {
        return {
            initUpdate: function (d) {
                d.navigation || (d.navigation = {
                    updates: [], update: function (d, a) {
                        this.updates.forEach(function (b) {
                            b.update.call(b.context, d, a)
                        })
                    }
                })
            }, addUpdate: function (d, g) {
                g.navigation || this.initUpdate(g);
                g.navigation.updates.push({update: d, context: g})
            }
        }
    });
    n(f, "annotations/navigationBindings.js", [f["parts/Globals.js"], f["mixins/navigation.js"]], function (d, g) {
        function a(a) {
            var b = a.prototype.defaultOptions.events && a.prototype.defaultOptions.events.click;
            d.merge(!0, a.prototype.defaultOptions.events, {
                click: function (a) {
                    var c = this, d = c.chart.navigationBindings, l = d.activeAnnotation;
                    b && b.click.call(c, a);
                    l !== c ? (d.deselectAnnotation(), d.activeAnnotation = c, c.setControlPointsVisibility(!0), e(d, "showPopup", {
                        annotation: c, formType: "annotation-toolbar", options: d.annotationToFields(c),
                        onSubmit: function (a) {
                            var b = {};
                            "remove" === a.actionType ? (d.activeAnnotation = !1, d.chart.removeAnnotation(c)) : (d.fieldsToOptions(a.fields, b), d.deselectAnnotation(), a = b.typeOptions, "measure" === c.options.type && (a.crosshairY.enabled = 0 !== a.crosshairY.strokeWidth, a.crosshairX.enabled = 0 !== a.crosshairX.strokeWidth), c.update(b))
                        }
                    })) : (d.deselectAnnotation(), e(d, "closePopup"));
                    a.activeAnnotation = !0
                }
            })
        }

        var b = d.doc, c = d.win, f = d.addEvent, m = d.pick, k = d.merge, n = d.extend, u = d.isNumber,
            e = d.fireEvent, l = d.isArray, r = d.isObject,
            q = d.objectEach;
        d.NavigationBindings = function (a, c) {
            this.chart = a;
            this.options = c;
            this.eventsToUnbind = [];
            this.container = b.getElementsByClassName(this.options.bindingsClassName)
        };
        d.NavigationBindings.annotationsEditable = {
            nestedOptions: {
                labelOptions: ["style", "format", "backgroundColor"],
                labels: ["style"],
                label: ["style"],
                style: ["fontSize", "color"],
                background: ["fill", "strokeWidth", "stroke"],
                innerBackground: ["fill", "strokeWidth", "stroke"],
                outerBackground: ["fill", "strokeWidth", "stroke"],
                shapeOptions: ["fill",
                    "strokeWidth", "stroke"],
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
            measure: ["background", "crosshairY", "crosshairX"],
            fibonacci: [],
            tunnel: ["background", "line", "height"],
            pitchfork: ["innerBackground", "outerBackground"],
            rect: ["shapes"],
            crookedLine: []
        };
        d.NavigationBindings.annotationsNonEditable =
            {rectangle: ["crosshairX", "crosshairY", "label"]};
        n(d.NavigationBindings.prototype, {
            initEvents: function () {
                var a = this, b = a.chart, c = a.container, e = a.options;
                a.boundClassNames = {};
                q(e.bindings, function (b) {
                    a.boundClassNames[b.className] = b
                });
                [].forEach.call(c, function (b) {
                    a.eventsToUnbind.push(f(b, "click", function (b) {
                        var d = a.getButtonEvents(c, b);
                        d && a.bindingsButtonClick(d.button, d.events, b)
                    }))
                });
                q(e.events || {}, function (b, c) {
                    d.isFunction(b) && a.eventsToUnbind.push(f(a, c, b))
                });
                a.eventsToUnbind.push(f(b.container,
                    "click", function (c) {
                        !b.cancelClick && b.isInsidePlot(c.chartX - b.plotLeft, c.chartY - b.plotTop) && a.bindingsChartClick(this, c)
                    }));
                a.eventsToUnbind.push(f(b.container, "mousemove", function (b) {
                    a.bindingsContainerMouseMove(this, b)
                }))
            }, initUpdate: function () {
                var a = this;
                g.addUpdate(function (b) {
                    a.update(b)
                }, this.chart)
            }, bindingsButtonClick: function (a, b, c) {
                var d = this.chart;
                this.selectedButtonElement && (e(this, "deselectButton", {button: this.selectedButtonElement}), this.nextEvent && (this.currentUserDetails && "annotations" ===
                this.currentUserDetails.coll && d.removeAnnotation(this.currentUserDetails), this.mouseMoveEvent = this.nextEvent = !1));
                this.selectedButton = b;
                this.selectedButtonElement = a;
                e(this, "selectButton", {button: a});
                b.init && b.init.call(this, a, c);
                (b.start || b.steps) && d.renderer.boxWrapper.addClass("highcharts-draw-mode")
            }, bindingsChartClick: function (a, b) {
                a = this.selectedButton;
                var d = this.chart.renderer.boxWrapper, l;
                if (l = this.activeAnnotation && !b.activeAnnotation && b.target.parentNode) {
                    a:{
                        l = b.target;
                        var p = c.Element.prototype,
                            g = p.matches || p.msMatchesSelector || p.webkitMatchesSelector, f = null;
                        if (p.closest) f = p.closest.call(l, ".highcharts-popup"); else {
                            do {
                                if (g.call(l, ".highcharts-popup")) break a;
                                l = l.parentElement || l.parentNode
                            } while (null !== l && 1 === l.nodeType)
                        }
                        l = f
                    }
                    l = !l
                }
                l && (e(this, "closePopup"), this.deselectAnnotation());
                a && a.start && (this.nextEvent ? (this.nextEvent(b, this.currentUserDetails), this.steps && (this.stepIndex++, a.steps[this.stepIndex] ? this.mouseMoveEvent = this.nextEvent = a.steps[this.stepIndex] : (e(this, "deselectButton",
                    {button: this.selectedButtonElement}), d.removeClass("highcharts-draw-mode"), a.end && a.end.call(this, b, this.currentUserDetails), this.mouseMoveEvent = this.nextEvent = !1, this.selectedButton = null))) : (this.currentUserDetails = a.start.call(this, b), a.steps ? (this.stepIndex = 0, this.steps = !0, this.mouseMoveEvent = this.nextEvent = a.steps[this.stepIndex]) : (e(this, "deselectButton", {button: this.selectedButtonElement}), d.removeClass("highcharts-draw-mode"), this.steps = !1, this.selectedButton = null, a.end && a.end.call(this, b,
                    this.currentUserDetails))))
            }, bindingsContainerMouseMove: function (a, b) {
                this.mouseMoveEvent && this.mouseMoveEvent(b, this.currentUserDetails)
            }, fieldsToOptions: function (a, b) {
                q(a, function (a, c) {
                    var d = parseFloat(a), e = c.split("."), l = b, p = e.length - 1;
                    !u(d) || a.match(/px/g) || c.match(/format/g) || (a = d);
                    "" !== a && "undefined" !== a && e.forEach(function (b, c) {
                        var d = m(e[c + 1], "");
                        p === c ? l[b] = a : (l[b] || (l[b] = d.match(/\d/g) ? [] : {}), l = l[b])
                    })
                });
                return b
            }, deselectAnnotation: function () {
                this.activeAnnotation && (this.activeAnnotation.setControlPointsVisibility(!1),
                    this.activeAnnotation = !1)
            }, annotationToFields: function (a) {
                function b(c, e, g, h) {
                    var t;
                    g && -1 === k.indexOf(e) && (0 <= (g.indexOf && g.indexOf(e)) || g[e] || !0 === g) && (l(c) ? (h[e] = [], c.forEach(function (a, c) {
                        r(a) ? (h[e][c] = {}, q(a, function (a, d) {
                            b(a, d, p[e], h[e][c])
                        })) : b(a, 0, p[e], h[e])
                    })) : r(c) ? (t = {}, l(h) ? (h.push(t), t[e] = {}, t = t[e]) : h[e] = t, q(c, function (a, c) {
                        b(a, c, 0 === e ? g : p[e], t)
                    })) : "format" === e ? h[e] = [d.format(c, a.labels[0].points[0]).toString(), "text"] : l(h) ? h.push([c, f(c)]) : h[e] = [c, f(c)])
                }

                var c = a.options, e = d.NavigationBindings.annotationsEditable,
                    p = e.nestedOptions, f = this.utils.getFieldType,
                    g = m(c.type, c.shapes && c.shapes[0] && c.shapes[0].type, c.labels && c.labels[0] && c.labels[0].itemType, "label"),
                    k = d.NavigationBindings.annotationsNonEditable[c.langKey] || [], h = {langKey: c.langKey, type: g};
                q(c, function (a, d) {
                    "typeOptions" === d ? (h[d] = {}, q(c[d], function (a, c) {
                        b(a, c, p, h[d], !0)
                    })) : b(a, d, e[g], h)
                });
                return h
            }, getClickedClassNames: function (a, b) {
                var c = b.target;
                b = [];
                for (var e; c && ((e = d.attr(c, "class")) && (b = b.concat(e.split(" ").map(function (a) {
                    return [a, c]
                }))), c =
                    c.parentNode, c !== a);) ;
                return b
            }, getButtonEvents: function (a, b) {
                var c = this, d;
                this.getClickedClassNames(a, b).forEach(function (a) {
                    c.boundClassNames[a[0]] && !d && (d = {events: c.boundClassNames[a[0]], button: a[1]})
                });
                return d
            }, update: function (a) {
                this.options = k(!0, this.options, a);
                this.removeEvents();
                this.initEvents()
            }, removeEvents: function () {
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
        d.Chart.prototype.initNavigationBindings = function () {
            var a = this.options;
            a && a.navigation && a.navigation.bindings && (this.navigationBindings = new d.NavigationBindings(this, a.navigation), this.navigationBindings.initEvents(), this.navigationBindings.initUpdate())
        };
        f(d.Chart, "load", function () {
            this.initNavigationBindings()
        });
        f(d.Chart, "destroy", function () {
            this.navigationBindings && this.navigationBindings.destroy()
        });
        f(d.NavigationBindings, "deselectButton", function () {
            this.selectedButtonElement = null
        });
        d.Annotation && (a(d.Annotation), d.objectEach(d.Annotation.types, function (b) {
            a(b)
        }));
        d.setOptions({
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
                            var c = this.chart.options.navigation, e = c && c.bindings;
                            return this.chart.addAnnotation(k({
                                langKey: "circle", shapes: [{
                                    type: "circle", point: {xAxis: 0, yAxis: 0, x: b, y: a}, r: 5, controlPoints: [{
                                        positioner: function (a) {
                                            var b = d.Annotation.MockPoint.pointToPixels(a.points[0]);
                                            a = a.options.r;
                                            return {
                                                x: b.x + a * Math.cos(Math.PI / 4) - this.graphic.width / 2,
                                                y: b.y + a * Math.sin(Math.PI / 4) - this.graphic.height / 2
                                            }
                                        }, events: {
                                            drag: function (a, b) {
                                                var c = b.annotation;
                                                a = this.mouseMoveToTranslation(a);
                                                b.setRadius(Math.max(b.options.r +
                                                    a.y / Math.sin(Math.PI / 4), 5));
                                                c.options.shapes[0] = c.userOptions.shapes[0] = b.options;
                                                b.redraw(!1)
                                            }
                                        }
                                    }]
                                }]
                            }, c.annotationsOptions, e.circle && e.circle.annotationsOptions))
                        }, steps: [function (a, b) {
                            var c = b.options.shapes[0].point, d = this.chart.xAxis[0].toPixels(c.x),
                                c = this.chart.yAxis[0].toPixels(c.y);
                            b.update({shapes: [{r: Math.max(Math.sqrt(Math.pow(d - a.chartX, 2) + Math.pow(c - a.chartY, 2)), 5)}]})
                        }]
                    }, rectangleAnnotation: {
                        className: "highcharts-rectangle-annotation", start: function (a) {
                            var b = this.chart.xAxis[0].toValue(a.chartX);
                            a = this.chart.yAxis[0].toValue(a.chartY);
                            var c = this.chart.options.navigation, e = c && c.bindings;
                            return this.chart.addAnnotation(k({
                                langKey: "rectangle", shapes: [{
                                    type: "rect",
                                    point: {x: b, y: a, xAxis: 0, yAxis: 0},
                                    width: 5,
                                    height: 5,
                                    controlPoints: [{
                                        positioner: function (a) {
                                            var b = d.Annotation.MockPoint.pointToPixels(a.points[0]);
                                            return {x: b.x + a.options.width - 4, y: b.y + a.options.height - 4}
                                        }, events: {
                                            drag: function (a, b) {
                                                var c = b.annotation;
                                                a = this.mouseMoveToTranslation(a);
                                                b.options.width = Math.max(b.options.width + a.x, 5);
                                                b.options.height =
                                                    Math.max(b.options.height + a.y, 5);
                                                c.options.shapes[0] = b.options;
                                                c.userOptions.shapes[0] = b.options;
                                                b.redraw(!1)
                                            }
                                        }
                                    }]
                                }]
                            }, c.annotationsOptions, e.rect && e.rect.annotationsOptions))
                        }, steps: [function (a, b) {
                            var c = this.chart.yAxis[0], d = b.options.shapes[0].point,
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
                            var c = this.chart.options.navigation, e = c && c.bindings;
                            this.chart.addAnnotation(k({
                                langKey: "label", labelOptions: {format: "{y:.2f}"}, labels: [{
                                    point: {x: b, y: a, xAxis: 0, yAxis: 0}, controlPoints: [{
                                        symbol: "triangle-down", positioner: function (a) {
                                            if (!a.graphic.placed) return {x: 0, y: -9E7};
                                            a = d.Annotation.MockPoint.pointToPixels(a.points[0]);
                                            return {x: a.x - this.graphic.width / 2, y: a.y - this.graphic.height / 2}
                                        }, events: {
                                            drag: function (a, b) {
                                                a = this.mouseMoveToTranslation(a);
                                                b.translatePoint(a.x,
                                                    a.y);
                                                b.annotation.labels[0].options = b.options;
                                                b.redraw(!1)
                                            }
                                        }
                                    }, {
                                        symbol: "square", positioner: function (a) {
                                            return a.graphic.placed ? {
                                                x: a.graphic.alignAttr.x - this.graphic.width / 2,
                                                y: a.graphic.alignAttr.y - this.graphic.height / 2
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
                            }, c.annotationsOptions, e.label && e.label.annotationsOptions))
                        }
                    }
                }, events: {}, annotationsOptions: {}
            }
        })
    });
    n(f,
        "annotations/popup.js", [f["parts/Globals.js"]], function (d) {
            var g = d.addEvent, a = d.createElement, b = d.objectEach, c = d.pick, f = d.wrap, m = d.isString,
                k = d.isObject, n = d.isArray, u = /\d/g;
            f(d.Pointer.prototype, "onContainerMouseDown", function (a, b) {
                var c = b.target && b.target.className;
                m(c) && 0 <= c.indexOf("highcharts-popup-field") || a.apply(this, Array.prototype.slice.call(arguments, 1))
            });
            d.Popup = function (a) {
                this.init(a)
            };
            d.Popup.prototype = {
                init: function (b) {
                    this.container = a("div", {className: "highcharts-popup"}, null, b);
                    this.lang = this.getLangpack();
                    this.addCloseBtn()
                }, addCloseBtn: function () {
                    var b = this, c;
                    c = a("div", {className: "highcharts-popup-close"}, null, this.container);
                    ["click", "touchstart"].forEach(function (a) {
                        g(c, a, function () {
                            b.closePopup()
                        })
                    })
                }, addColsContainer: function (b) {
                    var c;
                    c = a("div", {className: "highcharts-popup-lhs-col"}, null, b);
                    b = a("div", {className: "highcharts-popup-rhs-col"}, null, b);
                    a("div", {className: "highcharts-popup-rhs-col-wrapper"}, null, b);
                    return {lhsCol: c, rhsCol: b}
                }, addInput: function (b, c, d, g) {
                    var e =
                        b.split("."), e = e[e.length - 1], l = this.lang;
                    c = "highcharts-" + c + "-" + e;
                    c.match(u) || a("label", {innerHTML: l[e] || e, htmlFor: c}, null, d);
                    a("input", {
                        name: c,
                        value: g[0],
                        type: g[1],
                        className: "highcharts-popup-field"
                    }, null, d).setAttribute("highcharts-data-name", b)
                }, addButton: function (b, c, d, f, k) {
                    var e = this, l = this.closePopup, h = this.getFields, r;
                    r = a("button", {innerHTML: c}, null, b);
                    ["click", "touchstart"].forEach(function (a) {
                        g(r, a, function () {
                            l.call(e);
                            return f(h(k, d))
                        })
                    });
                    return r
                }, getFields: function (a, b) {
                    var c = a.querySelectorAll("input"),
                        d = a.querySelectorAll("#highcharts-select-series \x3e option:checked")[0];
                    a = a.querySelectorAll("#highcharts-select-volume \x3e option:checked")[0];
                    var e, l, g;
                    g = {actionType: b, linkedTo: d && d.getAttribute("value"), fields: {}};
                    [].forEach.call(c, function (a) {
                        l = a.getAttribute("highcharts-data-name");
                        (e = a.getAttribute("highcharts-data-series-id")) ? g.seriesId = a.value : l ? g.fields[l] = a.value : g.type = a.value
                    });
                    a && (g.fields["params.volumeSeriesID"] = a.getAttribute("value"));
                    return g
                }, showPopup: function () {
                    var a = this.container,
                        b = a.querySelectorAll(".highcharts-popup-close")[0];
                    a.innerHTML = "";
                    0 <= a.className.indexOf("highcharts-annotation-toolbar") && (a.classList.remove("highcharts-annotation-toolbar"), a.removeAttribute("style"));
                    a.appendChild(b);
                    a.style.display = "block"
                }, closePopup: function () {
                    this.popup.container.style.display = "none"
                }, showForm: function (a, b, c, d) {
                    this.popup = b.navigationBindings.popup;
                    this.showPopup();
                    "indicators" === a && this.indicators.addForm.call(this, b, c, d);
                    "annotation-toolbar" === a && this.annotations.addToolbar.call(this,
                        b, c, d);
                    "annotation-edit" === a && this.annotations.addForm.call(this, b, c, d);
                    "flag" === a && this.annotations.addForm.call(this, b, c, d, !0)
                }, getLangpack: function () {
                    return d.getOptions().lang.navigation.popup
                }, annotations: {
                    addToolbar: function (b, d, g) {
                        var e = this, l = this.lang, f = this.popup.container, k = this.showForm, h;
                        -1 === f.className.indexOf("highcharts-annotation-toolbar") && (f.className += " highcharts-annotation-toolbar");
                        f.style.top = b.plotTop + 10 + "px";
                        a("span", {innerHTML: c(l[d.langKey] || d.langKey, d.shapes && d.shapes[0].type)},
                            null, f);
                        h = this.addButton(f, l.removeButton || "remove", "remove", g, f);
                        h.className += " highcharts-annotation-remove-button";
                        h = this.addButton(f, l.editButton || "edit", "edit", function () {
                            k.call(e, "annotation-edit", b, d, g)
                        }, f);
                        h.className += " highcharts-annotation-edit-button"
                    }, addForm: function (b, c, d, g) {
                        var e = this.popup.container, l = this.lang, f, k;
                        a("h2", {
                            innerHTML: l[c.langKey] || c.langKey,
                            className: "highcharts-popup-main-title"
                        }, null, e);
                        k = a("div", {className: "highcharts-popup-lhs-col highcharts-popup-lhs-full"}, null,
                            e);
                        f = a("div", {className: "highcharts-popup-bottom-row"}, null, e);
                        this.annotations.addFormFields.call(this, k, b, "", c, [], !0);
                        this.addButton(f, g ? l.addButton || "add" : l.saveButton || "save", g ? "add" : "save", d, e)
                    }, addFormFields: function (c, d, g, f, h, t) {
                        var e = this, l = this.annotations.addFormFields, r = this.addInput, q = this.lang, p, m;
                        b(f, function (a, b) {
                            p = "" !== g ? g + "." + b : b;
                            k(a) && (!n(a) || n(a) && k(a[0]) ? (m = q[b] || b, m.match(u) || h.push([!0, m, c]), l.call(e, c, d, p, a, h, !1)) : h.push([e, p, "annotation", c, a]))
                        });
                        t && (h = h.sort(function (a) {
                            return a[1].match(/format/g) ?
                                -1 : 1
                        }), h.forEach(function (b) {
                            !0 === b[0] ? a("span", {
                                className: "highcharts-annotation-title",
                                innerHTML: b[1]
                            }, null, b[2]) : r.apply(b[0], b.splice(1))
                        }))
                    }
                }, indicators: {
                    addForm: function (a, b, c) {
                        var d = this.indicators, e = this.lang, l;
                        this.tabs.init.call(this, a);
                        b = this.popup.container.querySelectorAll(".highcharts-tab-item-content");
                        this.addColsContainer(b[0]);
                        d.addIndicatorList.call(this, a, b[0], "add");
                        l = b[0].querySelectorAll(".highcharts-popup-rhs-col")[0];
                        this.addButton(l, e.addButton || "add", "add", c, l);
                        this.addColsContainer(b[1]);
                        d.addIndicatorList.call(this, a, b[1], "edit");
                        l = b[1].querySelectorAll(".highcharts-popup-rhs-col")[0];
                        this.addButton(l, e.saveButton || "save", "edit", c, l);
                        this.addButton(l, e.removeButton || "remove", "remove", c, l)
                    }, addIndicatorList: function (c, d, f) {
                        var e = this, l = d.querySelectorAll(".highcharts-popup-lhs-col")[0];
                        d = d.querySelectorAll(".highcharts-popup-rhs-col")[0];
                        var h = "edit" === f, k = h ? c.series : c.options.plotOptions,
                            r = this.indicators.addFormFields, m, n, u;
                        n = a("ul", {className: "highcharts-indicator-list"}, null,
                            l);
                        m = d.querySelectorAll(".highcharts-popup-rhs-col-wrapper")[0];
                        b(k, function (b, d) {
                            var l = b.options;
                            if (b.params || l && l.params) {
                                var f = e.indicators.getNameType(b, d), q = f.type;
                                u = a("li", {className: "highcharts-indicator-list", innerHTML: f.name}, null, n);
                                ["click", "touchstart"].forEach(function (d) {
                                    g(u, d, function () {
                                        r.call(e, c, h ? b : k[q], f.type, m);
                                        h && b.options && a("input", {
                                            type: "hidden",
                                            name: "highcharts-id-" + q,
                                            value: b.options.id
                                        }, null, m).setAttribute("highcharts-data-series-id", b.options.id)
                                    })
                                })
                            }
                        });
                        0 < n.childNodes.length &&
                        n.childNodes[0].click()
                    }, getNameType: function (a, b) {
                        var c = a.options, e = d.seriesTypes, e = e[b] && e[b].prototype.nameBase || b.toUpperCase();
                        c && c.type && (b = a.options.type, e = a.name);
                        return {name: e, type: b}
                    }, listAllSeries: function (b, c, d, g) {
                        b = "highcharts-" + c + "-type-" + b;
                        var e, f;
                        a("label", {innerHTML: this.lang[c] || c, htmlFor: b}, null, g);
                        e = a("select", {name: b, className: "highcharts-popup-field"}, null, g);
                        e.setAttribute("id", "highcharts-select-" + c);
                        d.series.forEach(function (b) {
                            f = b.options;
                            !f.params && f.id && "highcharts-navigator-series" !==
                            f.id && a("option", {innerHTML: f.name || f.id, value: f.id}, null, e)
                        })
                    }, addFormFields: function (b, c, d, f) {
                        var e = c.params || c.options.params, g = this.indicators.getNameType;
                        f.innerHTML = "";
                        a("h3", {className: "highcharts-indicator-title", innerHTML: g(c, d).name}, null, f);
                        a("input", {type: "hidden", name: "highcharts-type-" + d, value: d}, null, f);
                        this.indicators.listAllSeries.call(this, d, "series", b, f);
                        e.volumeSeriesID && this.indicators.listAllSeries.call(this, d, "volume", b, f);
                        this.indicators.addParamInputs.call(this, b, "params",
                            e, d, f)
                    }, addParamInputs: function (a, c, d, f, g) {
                        var e = this, l = this.indicators.addParamInputs, h = this.addInput, m;
                        b(d, function (b, d) {
                            m = c + "." + d;
                            k(b) ? l.call(e, a, m, b, f, g) : "params.volumeSeriesID" !== m && h.call(e, m, f, g, [b, "text"])
                        })
                    }, getAmount: function () {
                        var a = 0;
                        b(this.series, function (b) {
                            var c = b.options;
                            (b.params || c && c.params) && a++
                        });
                        return a
                    }
                }, tabs: {
                    init: function (a) {
                        var b = this.tabs;
                        a = this.indicators.getAmount.call(a);
                        var c;
                        c = b.addMenuItem.call(this, "add");
                        b.addMenuItem.call(this, "edit", a);
                        b.addContentItem.call(this,
                            "add");
                        b.addContentItem.call(this, "edit");
                        b.switchTabs.call(this, a);
                        b.selectTab.call(this, c, 0)
                    }, addMenuItem: function (b, c) {
                        var d = this.popup.container, e = "highcharts-tab-item", f = this.lang;
                        0 === c && (e += " highcharts-tab-disabled");
                        c = a("span", {innerHTML: f[b + "Button"] || b, className: e}, null, d);
                        c.setAttribute("highcharts-data-tab-type", b);
                        return c
                    }, addContentItem: function () {
                        return a("div", {className: "highcharts-tab-item-content"}, null, this.popup.container)
                    }, switchTabs: function (a) {
                        var b = this, c;
                        this.popup.container.querySelectorAll(".highcharts-tab-item").forEach(function (d,
                                                                                                        e) {
                            c = d.getAttribute("highcharts-data-tab-type");
                            "edit" === c && 0 === a || ["click", "touchstart"].forEach(function (a) {
                                g(d, a, function () {
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
                            a = a.querySelectorAll(".highcharts-tab-item-content"),
                            c;
                        for (c = 0; c < b.length; c++) b[c].classList.remove("highcharts-tab-item-active"), a[c].classList.remove("highcharts-tab-item-show")
                    }
                }
            };
            g(d.NavigationBindings, "showPopup", function (a) {
                this.popup || (this.popup = new d.Popup(this.chart.container));
                this.popup.showForm(a.formType, this.chart, a.options, a.onSubmit)
            });
            g(d.NavigationBindings, "closePopup", function () {
                this.popup && this.popup.closePopup()
            })
        });
    n(f, "masters/modules/annotations.src.js", [], function () {
    })
});
//# sourceMappingURL=annotations.js.map
