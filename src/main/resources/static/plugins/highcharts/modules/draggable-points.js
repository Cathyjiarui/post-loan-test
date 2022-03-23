/*
 Highcharts JS v7.1.2 (2019-06-03)

 (c) 2009-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (k) {
    "object" === typeof module && module.exports ? (k["default"] = k, module.exports = k) : "function" === typeof define && define.amd ? define("highcharts/modules/draggable-points", ["highcharts"], function (l) {
        k(l);
        k.Highcharts = l;
        return k
    }) : k("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (k) {
    function l(g, k, l, A) {
        g.hasOwnProperty(k) || (g[k] = A.apply(null, l))
    }

    k = k ? k._modules : {};
    l(k, "modules/draggable-points.src.js", [k["parts/Globals.js"]], function (g) {
        function k(a) {
            return {
                left: "right", right: "left", top: "bottom",
                bottom: "top"
            }[a]
        }

        function l(a) {
            var b = ["draggableX", "draggableY"], c;
            q(a.dragDropProps, function (a) {
                a.optionName && b.push(a.optionName)
            });
            for (c = b.length; c--;) if (a.options.dragDrop[b[c]]) return !0
        }

        function A(a) {
            var b = a.series ? a.series.length : 0;
            if (a.hasCartesianSeries && !a.polar) for (; b--;) if (a.series[b].options.dragDrop && l(a.series[b])) return !0
        }

        function M(a) {
            var b = a.series, c = b.options.dragDrop || {};
            a = a.options && a.options.dragDrop;
            var e, f;
            q(b.dragDropProps, function (a) {
                "x" === a.axis && a.move ? e = !0 : "y" === a.axis &&
                    a.move && (f = !0)
            });
            return (c.draggableX && e || c.draggableY && f) && !(a && !1 === a.draggableX && !1 === a.draggableY) && b.yAxis && b.xAxis
        }

        function w(a, b) {
            return void 0 === a.chartX || void 0 === a.chartY ? b.pointer.normalize(a) : a
        }

        function u(a, b, c, e) {
            var f = b.map(function (b) {
                return p(a, b, c, e)
            });
            return function () {
                f.forEach(function (a) {
                    a()
                })
            }
        }

        function N(a, b, c) {
            var e = b.dragDropData.origin;
            b = e.chartX;
            var e = e.chartY, f = a.chartX;
            a = a.chartY;
            return Math.sqrt((f - b) * (f - b) + (a - e) * (a - e)) > c
        }

        function O(a, b, c) {
            var e = {
                chartX: a.chartX,
                chartY: a.chartY,
                guideBox: c && {x: c.attr("x"), y: c.attr("y"), width: c.attr("width"), height: c.attr("height")},
                points: {}
            };
            b.forEach(function (a) {
                var b = {};
                q(a.series.dragDropProps, function (c, e) {
                    b[e] = a[e]
                });
                b.point = a;
                e.points[a.id] = b
            });
            return e
        }

        function P(a) {
            var b = a.series, c = b.options.dragDrop.groupBy;
            return a.options[c] ? b.points.filter(function (b) {
                return b.options[c] === a.options[c]
            }) : [a]
        }

        function E(a, b) {
            var c = P(b), e = b.series, f = e.chart, m;
            v(e.options.dragDrop && e.options.dragDrop.liveRedraw, !0) || (f.dragGuideBox = m = e.getGuideBox(c),
                f.setGuideBoxState("default", e.options.dragDrop.guideBox).add(e.group));
            f.dragDropData = {origin: O(a, c, m), point: b, groupedPoints: c, isDragging: !0}
        }

        function Q(a, b) {
            var c = a.point, e = r(c.series.options.dragDrop, c.options.dragDrop), f = {}, m = a.updateProp, D = {};
            q(c.series.dragDropProps, function (a, b) {
                if (!m || m === b && a.resize && (!a.optionName || !1 !== e[a.optionName])) if (m || a.move && ("x" === a.axis && e.draggableX || "y" === a.axis && e.draggableY)) f[b] = a
            });
            (m ? [c] : a.groupedPoints).forEach(function (c) {
                D[c.id] = {
                    point: c, newValues: c.getDropValues(a.origin,
                        b, f)
                }
            });
            return D
        }

        function F(a, b) {
            var c = a.dragDropData.newPoints;
            b = !1 === b ? !1 : r({duration: 400}, a.options.animation);
            a.isDragDropAnimating = !0;
            q(c, function (a) {
                a.point.update(a.newValues, !1)
            });
            a.redraw(b);
            setTimeout(function () {
                delete a.isDragDropAnimating;
                a.hoverPoint && !a.dragHandles && a.hoverPoint.showDragHandles()
            }, b.duration)
        }

        function G(a) {
            var b = a.series && a.series.chart, c = b && b.dragDropData;
            !b || !b.dragHandles || c && (c.isDragging && c.draggedPastSensitivity || c.isHoveringHandle === a.id) || b.hideDragHandles()
        }

        function H(a) {
            var b = 0, c;
            for (c in a) a.hasOwnProperty(c) && b++;
            return b
        }

        function I(a) {
            for (var b in a) if (a.hasOwnProperty(b)) return a[b]
        }

        function R(a, b) {
            if (!b.zoomOrPanKeyPressed(a)) {
                var c = b.dragDropData, e, f;
                f = 0;
                c && c.isDragging && (e = c.point, f = e.series.options.dragDrop, a.preventDefault(), c.draggedPastSensitivity || (c.draggedPastSensitivity = N(a, b, v(e.options.dragDrop && e.options.dragDrop.dragSensitivity, f && f.dragSensitivity, 2))), c.draggedPastSensitivity && (c.newPoints = Q(c, a), b = c.newPoints, f = H(b), b = 1 === f ? I(b) :
                    null, e.firePointEvent("drag", {
                    origin: c.origin,
                    newPoints: c.newPoints,
                    newPoint: b && b.newValues,
                    newPointId: b && b.point.id,
                    numNewPoints: f,
                    chartX: a.chartX,
                    chartY: a.chartY
                }, function () {
                    var b = e.series, c = b.chart, f = c.dragDropData, d = r(b.options.dragDrop, e.options.dragDrop),
                        g = d.draggableX, n = d.draggableY, b = f.origin, h = a.chartX - b.chartX,
                        x = a.chartY - b.chartY, t = h, f = f.updateProp;
                    c.inverted && (h = -x, x = -t);
                    if (v(d.liveRedraw, !0)) F(c, !1), e.showDragHandles(); else if (f) {
                        var g = h, c = x, t = e.series, n = t.chart, f = n.dragDropData, l, q, d =
                            t.dragDropProps[f.updateProp];
                        q = f.newPoints[e.id].newValues;
                        l = "function" === typeof d.resizeSide ? d.resizeSide(q, e) : d.resizeSide;
                        d.beforeResize && d.beforeResize(n.dragGuideBox, q, e);
                        var n = n.dragGuideBox,
                            t = "x" === d.axis && t.xAxis.reversed || "y" === d.axis && t.yAxis.reversed ? k(l) : l,
                            g = "x" === d.axis ? g - (f.origin.prevdX || 0) : 0,
                            c = "y" === d.axis ? c - (f.origin.prevdY || 0) : 0, p;
                        switch (t) {
                            case "left":
                                p = {x: n.attr("x") + g, width: Math.max(1, n.attr("width") - g)};
                                break;
                            case "right":
                                p = {width: Math.max(1, n.attr("width") + g)};
                                break;
                            case "top":
                                p =
                                    {y: n.attr("y") + c, height: Math.max(1, n.attr("height") - c)};
                                break;
                            case "bottom":
                                p = {height: Math.max(1, n.attr("height") + c)}
                        }
                        n.attr(p)
                    } else c.dragGuideBox.translate(g ? h : 0, n ? x : 0);
                    b.prevdX = h;
                    b.prevdY = x
                })))
            }
        }

        function B(a, b) {
            var c = b.dragDropData;
            if (c && c.isDragging && c.draggedPastSensitivity) {
                var e = c.point, f = c.newPoints, m = H(f), d = 1 === m ? I(f) : null;
                b.dragHandles && b.hideDragHandles();
                a.preventDefault();
                b.cancelClick = !0;
                e.firePointEvent("drop", {
                    origin: c.origin, chartX: a.chartX, chartY: a.chartY, newPoints: f, numNewPoints: m,
                    newPoint: d && d.newValues, newPointId: d && d.point.id
                }, function () {
                    F(b)
                })
            }
            delete b.dragDropData;
            b.dragGuideBox && (b.dragGuideBox.destroy(), delete b.dragGuideBox)
        }

        function S(a) {
            var b = a.container, c = g.doc;
            A(a) && (u(b, ["mousedown", "touchstart"], function (b) {
                b = w(b, a);
                var c = a.hoverPoint, e = g.merge(c && c.series.options.dragDrop, c && c.options.dragDrop),
                    d = e.draggableX || !1, e = e.draggableY || !1;
                a.cancelClick = !1;
                !d && !e || a.zoomOrPanKeyPressed(b) || (a.dragDropData && a.dragDropData.isDragging ? B(b, a) : c && M(c) && (a.mouseIsDown = !1,
                    E(b, c), c.firePointEvent("dragStart", b)))
            }), u(b, ["mousemove", "touchmove"], function (b) {
                R(w(b, a), a)
            }), p(b, "mouseleave", function (b) {
                B(w(b, a), a)
            }), a.unbindDragDropMouseUp = u(c, ["mouseup", "touchend"], function (b) {
                B(w(b, a), a)
            }), a.hasAddedDragDropEvents = !0, p(a, "destroy", function () {
                a.unbindDragDropMouseUp && a.unbindDragDropMouseUp()
            }))
        }

        var p = g.addEvent, q = g.objectEach, v = g.pick, r = g.merge, d = g.seriesTypes, J = function (a) {
            a = a.shapeArgs || a.graphic.getBBox();
            var b = a.r || 0, c = a.height / 2;
            return ["M", 0, b, "L", 0, c - 5, "A", 1, 1,
                0, 0, 0, 0, c + 5, "A", 1, 1, 0, 0, 0, 0, c - 5, "M", 0, c + 5, "L", 0, a.height - b]
        }, z = d.line.prototype.dragDropProps = {x: {axis: "x", move: !0}, y: {axis: "y", move: !0}};
        d.flags && (d.flags.prototype.dragDropProps = z);
        var h = d.column.prototype.dragDropProps = {
            x: {axis: "x", move: !0}, y: {
                axis: "y", move: !1, resize: !0, beforeResize: function (a, b, c) {
                    var e = c.series.translatedThreshold, f = a.attr("y");
                    b.y >= c.series.options.threshold ? (b = a.attr("height"), a.attr({height: Math.max(0, Math.round(b + (e ? e - (f + b) : 0)))})) : a.attr({y: Math.round(f + (e ? e - f : 0))})
                }, resizeSide: function (a,
                                         b) {
                    var c = b.series.chart.dragHandles;
                    a = a.y >= (b.series.options.threshold || 0) ? "top" : "bottom";
                    b = k(a);
                    c[b] && (c[b].destroy(), delete c[b]);
                    return a
                }, handlePositioner: function (a) {
                    var b = a.shapeArgs || a.graphic.getBBox();
                    return {x: b.x, y: a.y >= (a.series.options.threshold || 0) ? b.y : b.y + b.height}
                }, handleFormatter: function (a) {
                    a = a.shapeArgs;
                    var b = a.r || 0, c = a.width / 2;
                    return ["M", b, 0, "L", c - 5, 0, "A", 1, 1, 0, 0, 0, c + 5, 0, "A", 1, 1, 0, 0, 0, c - 5, 0, "M", c + 5, 0, "L", a.width - b, 0]
                }
            }
        };
        d.bullet && (d.bullet.prototype.dragDropProps = {
            x: h.x, y: h.y, target: {
                optionName: "draggableTarget",
                axis: "y", move: !0, resize: !0, resizeSide: "top", handlePositioner: function (a) {
                    var b = a.targetGraphic.getBBox();
                    return {x: a.barX, y: b.y + b.height / 2}
                }, handleFormatter: h.y.handleFormatter
            }
        });
        d.columnrange && (d.columnrange.prototype.dragDropProps = {
            x: {axis: "x", move: !0},
            low: {
                optionName: "draggableLow",
                axis: "y",
                move: !0,
                resize: !0,
                resizeSide: "bottom",
                handlePositioner: function (a) {
                    a = a.shapeArgs || a.graphic.getBBox();
                    return {x: a.x, y: a.y + a.height}
                },
                handleFormatter: h.y.handleFormatter,
                propValidate: function (a, b) {
                    return a <= b.high
                }
            },
            high: {
                optionName: "draggableHigh",
                axis: "y",
                move: !0,
                resize: !0,
                resizeSide: "top",
                handlePositioner: function (a) {
                    a = a.shapeArgs || a.graphic.getBBox();
                    return {x: a.x, y: a.y}
                },
                handleFormatter: h.y.handleFormatter,
                propValidate: function (a, b) {
                    return a >= b.low
                }
            }
        });
        d.boxplot && (d.boxplot.prototype.dragDropProps = {
            x: h.x,
            low: {
                optionName: "draggableLow",
                axis: "y",
                move: !0,
                resize: !0,
                resizeSide: "bottom",
                handlePositioner: function (a) {
                    return {x: a.shapeArgs.x, y: a.lowPlot}
                },
                handleFormatter: h.y.handleFormatter,
                propValidate: function (a,
                                        b) {
                    return a <= b.q1
                }
            },
            q1: {
                optionName: "draggableQ1",
                axis: "y",
                move: !0,
                resize: !0,
                resizeSide: "bottom",
                handlePositioner: function (a) {
                    return {x: a.shapeArgs.x, y: a.q1Plot}
                },
                handleFormatter: h.y.handleFormatter,
                propValidate: function (a, b) {
                    return a <= b.median && a >= b.low
                }
            },
            median: {axis: "y", move: !0},
            q3: {
                optionName: "draggableQ3",
                axis: "y",
                move: !0,
                resize: !0,
                resizeSide: "top",
                handlePositioner: function (a) {
                    return {x: a.shapeArgs.x, y: a.q3Plot}
                },
                handleFormatter: h.y.handleFormatter,
                propValidate: function (a, b) {
                    return a <= b.high && a >=
                        b.median
                }
            },
            high: {
                optionName: "draggableHigh",
                axis: "y",
                move: !0,
                resize: !0,
                resizeSide: "top",
                handlePositioner: function (a) {
                    return {x: a.shapeArgs.x, y: a.highPlot}
                },
                handleFormatter: h.y.handleFormatter,
                propValidate: function (a, b) {
                    return a >= b.q3
                }
            }
        });
        d.ohlc && (d.ohlc.prototype.dragDropProps = {
            x: h.x,
            low: {
                optionName: "draggableLow",
                axis: "y",
                move: !0,
                resize: !0,
                resizeSide: "bottom",
                handlePositioner: function (a) {
                    return {x: a.shapeArgs.x, y: a.plotLow}
                },
                handleFormatter: h.y.handleFormatter,
                propValidate: function (a, b) {
                    return a <=
                        b.open && a <= b.close
                }
            },
            high: {
                optionName: "draggableHigh",
                axis: "y",
                move: !0,
                resize: !0,
                resizeSide: "top",
                handlePositioner: function (a) {
                    return {x: a.shapeArgs.x, y: a.plotHigh}
                },
                handleFormatter: h.y.handleFormatter,
                propValidate: function (a, b) {
                    return a >= b.open && a >= b.close
                }
            },
            open: {
                optionName: "draggableOpen", axis: "y", move: !0, resize: !0, resizeSide: function (a) {
                    return a.open >= a.close ? "top" : "bottom"
                }, handlePositioner: function (a) {
                    return {x: a.shapeArgs.x, y: a.plotOpen}
                }, handleFormatter: h.y.handleFormatter, propValidate: function (a,
                                                                                 b) {
                    return a <= b.high && a >= b.low
                }
            },
            close: {
                optionName: "draggableClose", axis: "y", move: !0, resize: !0, resizeSide: function (a) {
                    return a.open >= a.close ? "bottom" : "top"
                }, handlePositioner: function (a) {
                    return {x: a.shapeArgs.x, y: a.plotClose}
                }, handleFormatter: h.y.handleFormatter, propValidate: function (a, b) {
                    return a <= b.high && a >= b.low
                }
            }
        });
        if (d.arearange) {
            var z = d.columnrange.prototype.dragDropProps, K = function (a) {
                a = a.graphic ? a.graphic.getBBox().width / 2 + 1 : 4;
                return ["M", 0 - a, 0, "a", a, a, 0, 1, 0, 2 * a, 0, "a", a, a, 0, 1, 0, -2 * a, 0]
            };
            d.arearange.prototype.dragDropProps =
                {
                    x: z.x,
                    low: {
                        optionName: "draggableLow",
                        axis: "y",
                        move: !0,
                        resize: !0,
                        resizeSide: "bottom",
                        handlePositioner: function (a) {
                            return (a = a.lowerGraphic && a.lowerGraphic.getBBox()) ? {
                                x: a.x + a.width / 2,
                                y: a.y + a.height / 2
                            } : {x: -999, y: -999}
                        },
                        handleFormatter: K,
                        propValidate: z.low.propValidate
                    },
                    high: {
                        optionName: "draggableHigh",
                        axis: "y",
                        move: !0,
                        resize: !0,
                        resizeSide: "top",
                        handlePositioner: function (a) {
                            return (a = a.upperGraphic && a.upperGraphic.getBBox()) ? {
                                x: a.x + a.width / 2,
                                y: a.y + a.height / 2
                            } : {x: -999, y: -999}
                        },
                        handleFormatter: K,
                        propValidate: z.high.propValidate
                    }
                }
        }
        d.waterfall &&
        (d.waterfall.prototype.dragDropProps = {
            x: h.x, y: r(h.y, {
                handleFormatter: function (a) {
                    return a.isSum || a.isIntermediateSum ? null : h.y.handleFormatter(a)
                }
            })
        });
        if (d.xrange) var L = function (a, b) {
            var c = a.series, e = c.xAxis, f = c.yAxis, c = c.chart.inverted;
            b = e.toPixels(a[b], !0);
            var d = f.toPixels(a.y, !0);
            c ? (b = e.len - b, d = f.len - d - a.shapeArgs.height / 2) : d -= a.shapeArgs.height / 2;
            return {x: Math.round(b), y: Math.round(d)}
        }, C = d.xrange.prototype.dragDropProps = {
            y: {axis: "y", move: !0},
            x: {
                optionName: "draggableX1", axis: "x", move: !0, resize: !0,
                resizeSide: "left", handlePositioner: function (a) {
                    return L(a, "x")
                }, handleFormatter: J, propValidate: function (a, b) {
                    return a <= b.x2
                }
            },
            x2: {
                optionName: "draggableX2",
                axis: "x",
                move: !0,
                resize: !0,
                resizeSide: "right",
                handlePositioner: function (a) {
                    return L(a, "x2")
                },
                handleFormatter: J,
                propValidate: function (a, b) {
                    return a >= b.x
                }
            }
        };
        d.gantt && (d.gantt.prototype.dragDropProps = {
            y: C.y,
            start: r(C.x, {
                optionName: "draggableStart", validateIndividualDrag: function (a) {
                    return !a.milestone
                }
            }),
            end: r(C.x2, {
                optionName: "draggableEnd", validateIndividualDrag: function (a) {
                    return !a.milestone
                }
            })
        });
        "gauge pie sunburst wordcloud sankey histogram pareto vector windbarb treemap bellcurve sma map mapline".split(" ").forEach(function (a) {
            d[a] && (d[a].prototype.dragDropProps = null)
        });
        var T = {
            "default": {
                className: "highcharts-drag-box-default",
                lineWidth: 1,
                lineColor: "#888",
                color: "rgba(0, 0, 0, 0.1)",
                cursor: "move",
                zIndex: 900
            }
        }, U = {
            className: "highcharts-drag-handle",
            color: "#fff",
            lineColor: "rgba(0, 0, 0, 0.6)",
            lineWidth: 1,
            zIndex: 901
        };
        g.Chart.prototype.setGuideBoxState = function (a, b) {
            var c = this.dragGuideBox;
            b =
                r(T, b);
            a = r(b.default, b[a]);
            return c.attr({
                className: a.className,
                stroke: a.lineColor,
                strokeWidth: a.lineWidth,
                fill: a.color,
                cursor: a.cursor,
                zIndex: a.zIndex
            }).css({pointerEvents: "none"})
        };
        g.Point.prototype.getDropValues = function (a, b, c) {
            var e = this, f = e.series, d = r(f.options.dragDrop, e.options.dragDrop), g = f.yAxis, y = f.xAxis,
                h = b.chartX - a.chartX;
            b = b.chartY - a.chartY;
            var k = v(a.x, e.x), n = v(a.y, e.y), p = y.toValue(y.toPixels(k, !0) + (y.horiz ? h : b), !0) - k,
                x = g.toValue(g.toPixels(n, !0) + (g.horiz ? h : b), !0) - n, t = {}, l, w = a.points[e.id],
                u;
            for (u in c) if (c.hasOwnProperty(u)) {
                if (void 0 !== l) {
                    l = !1;
                    break
                }
                l = !0
            }
            q(c, function (a, b) {
                var c = w[b], m;
                m = c + ("x" === a.axis ? p : x);
                var g = a.axis.toUpperCase(), h = f[g.toLowerCase() + "Axis"].categories ? 1 : 0,
                    h = v(d["dragPrecision" + g], h), y = v(d["dragMin" + g], -Infinity),
                    g = v(d["dragMax" + g], Infinity);
                h && (m = Math.round(m / h) * h);
                m = Math.max(y, Math.min(g, m));
                l && a.propValidate && !a.propValidate(m, e) || void 0 === c || (t[b] = m)
            });
            return t
        };
        g.Series.prototype.getGuideBox = function (a) {
            var b = this.chart, c = Infinity, e = -Infinity, f = Infinity, d =
                -Infinity, g;
            a.forEach(function (a) {
                (a = a.graphic && a.graphic.getBBox() || a.shapeArgs) && (a.width || a.height || a.x || a.y) && (g = !0, c = Math.min(a.x, c), e = Math.max(a.x + a.width, e), f = Math.min(a.y, f), d = Math.max(a.y + a.height, d))
            });
            return g ? b.renderer.rect(c, f, e - c, d - f) : b.renderer.g()
        };
        g.Point.prototype.showDragHandles = function () {
            var a = this, b = a.series, c = b.chart, e = c.renderer, f = r(b.options.dragDrop, a.options.dragDrop);
            q(b.dragDropProps, function (d, g) {
                var h = r(U, d.handleOptions, f.dragHandle), k = {
                    className: h.className, "stroke-width": h.lineWidth,
                    fill: h.color, stroke: h.lineColor
                }, l = h.pathFormatter || d.handleFormatter, n = d.handlePositioner, m;
                m = d.validateIndividualDrag ? d.validateIndividualDrag(a) : !0;
                d.resize && m && d.resizeSide && l && (f["draggable" + d.axis.toUpperCase()] || f[d.optionName]) && !1 !== f[d.optionName] && (c.dragHandles || (c.dragHandles = {group: e.g("drag-drop-handles").add(b.markerGroup || b.group)}), c.dragHandles.point = a.id, n = n(a), k.d = m = l(a), l = "function" === typeof d.resizeSide ? d.resizeSide(a.options, a) : d.resizeSide, !m || 0 > n.x || 0 > n.y || (k.cursor = h.cursor ||
                "x" === d.axis !== !!c.inverted ? "ew-resize" : "ns-resize", (d = c.dragHandles[l]) || (d = c.dragHandles[l] = e.path().add(c.dragHandles.group)), d.translate(n.x, n.y).attr(k), u(d.element, ["touchstart", "mousedown"], function (b) {
                    b = w(b, c);
                    var d = a.series.chart;
                    d.zoomOrPanKeyPressed(b) || (d.mouseIsDown = !1, E(b, a), d.dragDropData.updateProp = b.updateProp = g, a.firePointEvent("dragStart", b), b.stopPropagation(), b.preventDefault())
                }), p(c.dragHandles.group.element, "mouseover", function () {
                    c.dragDropData = c.dragDropData || {};
                    c.dragDropData.isHoveringHandle =
                        a.id
                }), u(c.dragHandles.group.element, ["touchend", "mouseout"], function () {
                    var b = a.series.chart;
                    b.dragDropData && a.id === b.dragDropData.isHoveringHandle && delete b.dragDropData.isHoveringHandle;
                    b.hoverPoint || G(a)
                })))
            })
        };
        g.Chart.prototype.hideDragHandles = function () {
            this.dragHandles && (q(this.dragHandles, function (a, b) {
                "group" !== b && a.destroy && a.destroy()
            }), this.dragHandles.group && this.dragHandles.group.destroy && this.dragHandles.group.destroy(), delete this.dragHandles)
        };
        p(g.Point, "mouseOver", function () {
            var a =
                this;
            setTimeout(function () {
                var b = a.series, c = b && b.chart, d = c && c.dragDropData;
                !c || d && d.isDragging && d.draggedPastSensitivity || c.isDragDropAnimating || !b.options.dragDrop || c.options && c.options.chart && c.options.chart.options3d || (c.dragHandles && c.hideDragHandles(), a.showDragHandles())
            }, 12)
        });
        p(g.Point, "mouseOut", function () {
            var a = this;
            setTimeout(function () {
                a.series && G(a)
            }, 10)
        });
        p(g.Point, "remove", function () {
            var a = this.series.chart, b = a.dragHandles;
            b && b.point === this.id && a.hideDragHandles()
        });
        g.Chart.prototype.zoomOrPanKeyPressed =
            function (a) {
                var b = this.userOptions.chart || {}, c = b.panKey && b.panKey + "Key";
                return a[b.zoomKey && b.zoomKey + "Key"] || a[c]
            };
        p(g.Chart, "render", function () {
            this.hasAddedDragDropEvents || S(this)
        })
    });
    l(k, "masters/modules/draggable-points.src.js", [], function () {
    })
});
//# sourceMappingURL=draggable-points.js.map
