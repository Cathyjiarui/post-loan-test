/*
  Highcharts JS v7.1.2 (2019-06-03)

 Force directed graph module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (h) {
    "object" === typeof module && module.exports ? (h["default"] = h, module.exports = h) : "function" === typeof define && define.amd ? define("highcharts/modules/networkgraph", ["highcharts"], function (m) {
        h(m);
        h.Highcharts = m;
        return h
    }) : h("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (h) {
    function m(f, c, d, b) {
        f.hasOwnProperty(c) || (f[c] = b.apply(null, d))
    }

    h = h ? h._modules : {};
    m(h, "mixins/nodes.js", [h["parts/Globals.js"]], function (f) {
        var c = f.pick, d = f.defined, b = f.Point;
        f.NodesMixin = {
            createNode: function (b) {
                function a(a,
                           e) {
                    return f.find(a, function (a) {
                        return a.id === e
                    })
                }

                var e = a(this.nodes, b), g = this.pointClass, d;
                e || (d = this.options.nodes && a(this.options.nodes, b), e = (new g).init(this, f.extend({
                    className: "highcharts-node",
                    isNode: !0,
                    id: b,
                    y: 1
                }, d)), e.linksTo = [], e.linksFrom = [], e.formatPrefix = "node", e.name = e.name || e.options.id, e.mass = c(e.options.mass, e.options.marker && e.options.marker.radius, this.options.marker && this.options.marker.radius, 4), e.getSum = function () {
                    var a = 0, b = 0;
                    e.linksTo.forEach(function (e) {
                        a += e.weight
                    });
                    e.linksFrom.forEach(function (a) {
                        b +=
                            a.weight
                    });
                    return Math.max(a, b)
                }, e.offset = function (a, b) {
                    for (var g = 0, c = 0; c < e[b].length; c++) {
                        if (e[b][c] === a) return g;
                        g += e[b][c].weight
                    }
                }, e.hasShape = function () {
                    var a = 0;
                    e.linksTo.forEach(function (e) {
                        e.outgoing && a++
                    });
                    return !e.linksTo.length || a !== e.linksTo.length
                }, this.nodes.push(e));
                return e
            }, generatePoints: function () {
                var b = {}, a = this.chart;
                f.Series.prototype.generatePoints.call(this);
                this.nodes || (this.nodes = []);
                this.colorCounter = 0;
                this.nodes.forEach(function (a) {
                    a.linksFrom.length = 0;
                    a.linksTo.length = 0;
                    a.level = void 0
                });
                this.points.forEach(function (e) {
                    d(e.from) && (b[e.from] || (b[e.from] = this.createNode(e.from)), b[e.from].linksFrom.push(e), e.fromNode = b[e.from], a.styledMode ? e.colorIndex = c(e.options.colorIndex, b[e.from].colorIndex) : e.color = e.options.color || b[e.from].color);
                    d(e.to) && (b[e.to] || (b[e.to] = this.createNode(e.to)), b[e.to].linksTo.push(e), e.toNode = b[e.to]);
                    e.name = e.name || e.id
                }, this);
                this.nodeLookup = b
            }, setData: function () {
                this.nodes && (this.nodes.forEach(function (b) {
                    b.destroy()
                }), this.nodes.length =
                    0);
                f.Series.prototype.setData.apply(this, arguments)
            }, destroy: function () {
                this.data = [].concat(this.points || [], this.nodes);
                return f.Series.prototype.destroy.apply(this, arguments)
            }, setNodeState: function () {
                var c = arguments;
                (this.isNode ? this.linksTo.concat(this.linksFrom) : [this.fromNode, this.toNode]).forEach(function (a) {
                    a.series && (b.prototype.setState.apply(a, c), a.isNode || (a.fromNode.graphic && b.prototype.setState.apply(a.fromNode, c), a.toNode.graphic && b.prototype.setState.apply(a.toNode, c)))
                });
                b.prototype.setState.apply(this,
                    c)
            }
        }
    });
    m(h, "modules/networkgraph/integrations.js", [h["parts/Globals.js"]], function (f) {
        f.networkgraphIntegrations = {
            verlet: {
                attractiveForceFunction: function (c, d) {
                    return (d - c) / c
                }, repulsiveForceFunction: function (c, d) {
                    return (d - c) / c * (d > c ? 1 : 0)
                }, barycenter: function () {
                    var c = this.options.gravitationalConstant, d = this.barycenter.xFactor,
                        b = this.barycenter.yFactor, d = (d - (this.box.left + this.box.width) / 2) * c,
                        b = (b - (this.box.top + this.box.height) / 2) * c;
                    this.nodes.forEach(function (c) {
                        c.fixedPosition || (c.plotX -= d / c.mass /
                            c.degree, c.plotY -= b / c.mass / c.degree)
                    })
                }, repulsive: function (c, d, b) {
                    d = d * this.diffTemperature / c.mass / c.degree;
                    c.fixedPosition || (c.plotX += b.x * d, c.plotY += b.y * d)
                }, attractive: function (c, d, b) {
                    var g = c.getMass(), a = -b.x * d * this.diffTemperature;
                    d = -b.y * d * this.diffTemperature;
                    c.fromNode.fixedPosition || (c.fromNode.plotX -= a * g.fromNode / c.fromNode.degree, c.fromNode.plotY -= d * g.fromNode / c.fromNode.degree);
                    c.toNode.fixedPosition || (c.toNode.plotX += a * g.toNode / c.toNode.degree, c.toNode.plotY += d * g.toNode / c.toNode.degree)
                },
                integrate: function (c, d) {
                    var b = -c.options.friction, g = c.options.maxSpeed, a = (d.plotX + d.dispX - d.prevX) * b,
                        b = (d.plotY + d.dispY - d.prevY) * b, e = Math.abs, p = e(a) / (a || 1), e = e(b) / (b || 1),
                        a = p * Math.min(g, Math.abs(a)), b = e * Math.min(g, Math.abs(b));
                    d.prevX = d.plotX + d.dispX;
                    d.prevY = d.plotY + d.dispY;
                    d.plotX += a;
                    d.plotY += b;
                    d.temperature = c.vectorLength({x: a, y: b})
                }, getK: function (c) {
                    return Math.pow(c.box.width * c.box.height / c.nodes.length, .5)
                }
            }, euler: {
                attractiveForceFunction: function (c, d) {
                    return c * c / d
                }, repulsiveForceFunction: function (c,
                                                     d) {
                    return d * d / c
                }, barycenter: function () {
                    var c = this.options.gravitationalConstant, d = this.barycenter.xFactor,
                        b = this.barycenter.yFactor;
                    this.nodes.forEach(function (g) {
                        if (!g.fixedPosition) {
                            var a = g.getDegree(), a = a * (1 + a / 2);
                            g.dispX += (d - g.plotX) * c * a / g.degree;
                            g.dispY += (b - g.plotY) * c * a / g.degree
                        }
                    })
                }, repulsive: function (c, d, b, g) {
                    c.dispX += b.x / g * d / c.degree;
                    c.dispY += b.y / g * d / c.degree
                }, attractive: function (c, d, b, g) {
                    var a = c.getMass(), e = b.x / g * d;
                    d *= b.y / g;
                    c.fromNode.fixedPosition || (c.fromNode.dispX -= e * a.fromNode / c.fromNode.degree,
                        c.fromNode.dispY -= d * a.fromNode / c.fromNode.degree);
                    c.toNode.fixedPosition || (c.toNode.dispX += e * a.toNode / c.toNode.degree, c.toNode.dispY += d * a.toNode / c.toNode.degree)
                }, integrate: function (c, d) {
                    var b;
                    d.dispX += d.dispX * c.options.friction;
                    d.dispY += d.dispY * c.options.friction;
                    b = d.temperature = c.vectorLength({x: d.dispX, y: d.dispY});
                    0 !== b && (d.plotX += d.dispX / b * Math.min(Math.abs(d.dispX), c.temperature), d.plotY += d.dispY / b * Math.min(Math.abs(d.dispY), c.temperature))
                }, getK: function (c) {
                    return Math.pow(c.box.width * c.box.height /
                        c.nodes.length, .3)
                }
            }
        }
    });
    m(h, "modules/networkgraph/QuadTree.js", [h["parts/Globals.js"]], function (f) {
        var c = f.QuadTreeNode = function (b) {
            this.box = b;
            this.boxSize = Math.min(b.width, b.height);
            this.nodes = [];
            this.body = this.isInternal = !1;
            this.isEmpty = !0
        };
        f.extend(c.prototype, {
            insert: function (b, c) {
                this.isInternal ? this.nodes[this.getBoxPosition(b)].insert(b, c - 1) : (this.isEmpty = !1, this.body ? c ? (this.isInternal = !0, this.divideBox(), !0 !== this.body && (this.nodes[this.getBoxPosition(this.body)].insert(this.body, c - 1), this.body =
                    !0), this.nodes[this.getBoxPosition(b)].insert(b, c - 1)) : this.nodes.push(b) : (this.isInternal = !1, this.body = b))
            }, updateMassAndCenter: function () {
                var b = 0, c = 0, a = 0;
                this.isInternal ? (this.nodes.forEach(function (e) {
                    e.isEmpty || (b += e.mass, c += e.plotX * e.mass, a += e.plotY * e.mass)
                }), c /= b, a /= b) : this.body && (b = this.body.mass, c = this.body.plotX, a = this.body.plotY);
                this.mass = b;
                this.plotX = c;
                this.plotY = a
            }, divideBox: function () {
                var b = this.box.width / 2, d = this.box.height / 2;
                this.nodes[0] = new c({
                    left: this.box.left, top: this.box.top,
                    width: b, height: d
                });
                this.nodes[1] = new c({left: this.box.left + b, top: this.box.top, width: b, height: d});
                this.nodes[2] = new c({left: this.box.left + b, top: this.box.top + d, width: b, height: d});
                this.nodes[3] = new c({left: this.box.left, top: this.box.top + d, width: b, height: d})
            }, getBoxPosition: function (b) {
                var c = b.plotY < this.box.top + this.box.height / 2;
                return b.plotX < this.box.left + this.box.width / 2 ? c ? 0 : 3 : c ? 1 : 2
            }
        });
        var d = f.QuadTree = function (b, d, a, e) {
            this.box = {left: b, top: d, width: a, height: e};
            this.maxDepth = 25;
            this.root = new c(this.box,
                "0");
            this.root.isInternal = !0;
            this.root.isRoot = !0;
            this.root.divideBox()
        };
        f.extend(d.prototype, {
            insertNodes: function (b) {
                b.forEach(function (b) {
                    this.root.insert(b, this.maxDepth)
                }, this)
            }, visitNodeRecursive: function (b, c, a, e, d) {
                var l;
                b || (b = this.root);
                b === this.root && c && (l = c(b));
                !1 !== l && (b.nodes.forEach(function (b) {
                    if (b.isInternal) {
                        c && (l = c(b));
                        if (!1 === l) return;
                        this.visitNodeRecursive(b, c, a, e, d)
                    } else b.body && c && c(b.body);
                    a && a(b)
                }, this), b === this.root && a && a(b))
            }, calculateMassAndCenter: function () {
                this.visitNodeRecursive(null,
                    null, function (b) {
                        b.updateMassAndCenter()
                    })
            }, render: function (b, c) {
                this.visitNodeRecursive(this.root, null, null, b, c)
            }, clear: function (b) {
                this.render(b, !0)
            }, renderBox: function (b, c, a) {
                b.graphic || a ? a && (b.graphic && (b.graphic = b.graphic.destroy()), b.graphic2 && (b.graphic2 = b.graphic2.destroy()), b.label && (b.label = b.label.destroy())) : (b.graphic = c.renderer.rect(b.box.left + c.plotLeft, b.box.top + c.plotTop, b.box.width, b.box.height).attr({
                    stroke: "rgba(100, 100, 100, 0.5)",
                    "stroke-width": 2
                }).add(), isNaN(b.plotX) || (b.graphic2 =
                    c.renderer.circle(b.plotX, b.plotY, b.mass / 10).attr({
                        fill: "red",
                        translateY: c.plotTop,
                        translateX: c.plotLeft
                    }).add()))
            }
        })
    });
    m(h, "modules/networkgraph/layouts.js", [h["parts/Globals.js"]], function (f) {
        var c = f.pick, d = f.defined, b = f.addEvent, g = f.Chart;
        f.layouts = {
            "reingold-fruchterman": function () {
            }
        };
        f.extend(f.layouts["reingold-fruchterman"].prototype, {
            init: function (a) {
                this.options = a;
                this.nodes = [];
                this.links = [];
                this.series = [];
                this.box = {x: 0, y: 0, width: 0, height: 0};
                this.setInitialRendering(!0);
                this.integration =
                    f.networkgraphIntegrations[a.integration];
                this.attractiveForce = c(a.attractiveForce, this.integration.attractiveForceFunction);
                this.repulsiveForce = c(a.repulsiveForce, this.integration.repulsiveForceFunction);
                this.approximation = a.approximation
            }, start: function () {
                var a = this.series, b = this.options;
                this.currentStep = 0;
                this.forces = a[0] && a[0].forces || [];
                this.initialRendering && (this.initPositions(), a.forEach(function (a) {
                    a.render()
                }));
                this.setK();
                this.resetSimulation(b);
                b.enableSimulation && this.step()
            }, step: function () {
                var a =
                    this, b = this.series, c = this.options;
                a.currentStep++;
                "barnes-hut" === a.approximation && (a.createQuadTree(), a.quadTree.calculateMassAndCenter());
                a.forces.forEach(function (b) {
                    a[b + "Forces"](a.temperature)
                });
                a.applyLimits(a.temperature);
                a.temperature = a.coolDown(a.startTemperature, a.diffTemperature, a.currentStep);
                a.prevSystemTemperature = a.systemTemperature;
                a.systemTemperature = a.getSystemTemperature();
                c.enableSimulation && (b.forEach(function (a) {
                    a.chart && a.render()
                }), a.maxIterations-- && isFinite(a.temperature) &&
                !a.isStable() ? (a.simulation && f.win.cancelAnimationFrame(a.simulation), a.simulation = f.win.requestAnimationFrame(function () {
                    a.step()
                })) : a.simulation = !1)
            }, stop: function () {
                this.simulation && f.win.cancelAnimationFrame(this.simulation)
            }, setArea: function (a, b, c, d) {
                this.box = {left: a, top: b, width: c, height: d}
            }, setK: function () {
                this.k = this.options.linkLength || this.integration.getK(this)
            }, addNodes: function (a) {
                a.forEach(function (a) {
                    -1 === this.nodes.indexOf(a) && this.nodes.push(a)
                }, this)
            }, removeNode: function (a) {
                a = this.nodes.indexOf(a);
                -1 !== a && this.nodes.splice(a, 1)
            }, removeLink: function (a) {
                a = this.links.indexOf(a);
                -1 !== a && this.links.splice(a, 1)
            }, addLinks: function (a) {
                a.forEach(function (a) {
                    -1 === this.links.indexOf(a) && this.links.push(a)
                }, this)
            }, addSeries: function (a) {
                -1 === this.series.indexOf(a) && this.series.push(a)
            }, clear: function () {
                this.nodes.length = 0;
                this.links.length = 0;
                this.series.length = 0;
                this.resetSimulation()
            }, resetSimulation: function () {
                this.forcedStop = !1;
                this.systemTemperature = 0;
                this.setMaxIterations();
                this.setTemperature();
                this.setDiffTemperature()
            },
            setMaxIterations: function (a) {
                this.maxIterations = c(a, this.options.maxIterations)
            }, setTemperature: function () {
                this.temperature = this.startTemperature = Math.sqrt(this.nodes.length)
            }, setDiffTemperature: function () {
                this.diffTemperature = this.startTemperature / (this.options.maxIterations + 1)
            }, setInitialRendering: function (a) {
                this.initialRendering = a
            }, createQuadTree: function () {
                this.quadTree = new f.QuadTree(this.box.left, this.box.top, this.box.width, this.box.height);
                this.quadTree.insertNodes(this.nodes)
            }, initPositions: function () {
                var a =
                    this.options.initialPositions;
                f.isFunction(a) ? (a.call(this), this.nodes.forEach(function (a) {
                    d(a.prevX) || (a.prevX = a.plotX);
                    d(a.prevY) || (a.prevY = a.plotY);
                    a.dispX = 0;
                    a.dispY = 0
                })) : "circle" === a ? this.setCircularPositions() : this.setRandomPositions()
            }, setCircularPositions: function () {
                function a(b) {
                    b.linksFrom.forEach(function (b) {
                        f[b.toNode.id] || (f[b.toNode.id] = !0, k.push(b.toNode), a(b.toNode))
                    })
                }

                var b = this.box, d = this.nodes, l = 2 * Math.PI / (d.length + 1), n = d.filter(function (a) {
                        return 0 === a.linksTo.length
                    }), k = [], f = {},
                    g = this.options.initialPositionRadius;
                n.forEach(function (b) {
                    k.push(b);
                    a(b)
                });
                k.length ? d.forEach(function (a) {
                    -1 === k.indexOf(a) && k.push(a)
                }) : k = d;
                k.forEach(function (a, e) {
                    a.plotX = a.prevX = c(a.plotX, b.width / 2 + g * Math.cos(e * l));
                    a.plotY = a.prevY = c(a.plotY, b.height / 2 + g * Math.sin(e * l));
                    a.dispX = 0;
                    a.dispY = 0
                })
            }, setRandomPositions: function () {
                function a(a) {
                    a = a * a / Math.PI;
                    return a -= Math.floor(a)
                }

                var b = this.box, d = this.nodes, l = d.length + 1;
                d.forEach(function (e, d) {
                    e.plotX = e.prevX = c(e.plotX, b.width * a(d));
                    e.plotY = e.prevY = c(e.plotY,
                        b.height * a(l + d));
                    e.dispX = 0;
                    e.dispY = 0
                })
            }, force: function (a) {
                this.integration[a].apply(this, Array.prototype.slice.call(arguments, 1))
            }, barycenterForces: function () {
                this.getBarycenter();
                this.force("barycenter")
            }, getBarycenter: function () {
                var a = 0, b = 0, c = 0;
                this.nodes.forEach(function (e) {
                    b += e.plotX * e.mass;
                    c += e.plotY * e.mass;
                    a += e.mass
                });
                return this.barycenter = {x: b, y: c, xFactor: b / a, yFactor: c / a}
            }, barnesHutApproximation: function (a, b) {
                var c = this.getDistXY(a, b), e = this.vectorLength(c), d, k;
                a !== b && 0 !== e && (b.isInternal ?
                    b.boxSize / e < this.options.theta && 0 !== e ? (k = this.repulsiveForce(e, this.k), this.force("repulsive", a, k * b.mass, c, e), d = !1) : d = !0 : (k = this.repulsiveForce(e, this.k), this.force("repulsive", a, k * b.mass, c, e)));
                return d
            }, repulsiveForces: function () {
                var a = this;
                "barnes-hut" === a.approximation ? a.nodes.forEach(function (b) {
                    a.quadTree.visitNodeRecursive(null, function (c) {
                        return a.barnesHutApproximation(b, c)
                    })
                }) : a.nodes.forEach(function (b) {
                    a.nodes.forEach(function (c) {
                        var e, d, k;
                        b === c || b.fixedPosition || (k = a.getDistXY(b, c), d =
                            a.vectorLength(k), 0 !== d && (e = a.repulsiveForce(d, a.k), a.force("repulsive", b, e * c.mass, k, d)))
                    })
                })
            }, attractiveForces: function () {
                var a = this, b, c, d;
                a.links.forEach(function (e) {
                    e.fromNode && e.toNode && (b = a.getDistXY(e.fromNode, e.toNode), c = a.vectorLength(b), 0 !== c && (d = a.attractiveForce(c, a.k), a.force("attractive", e, d, b, c)))
                })
            }, applyLimits: function () {
                var a = this;
                a.nodes.forEach(function (b) {
                    b.fixedPosition || (a.integration.integrate(a, b), a.applyLimitBox(b, a.box), b.dispX = 0, b.dispY = 0)
                })
            }, applyLimitBox: function (a, b) {
                var c =
                    a.marker && a.marker.radius || 0;
                a.plotX = Math.max(Math.min(a.plotX, b.width - c), b.left + c);
                a.plotY = Math.max(Math.min(a.plotY, b.height - c), b.top + c)
            }, coolDown: function (a, b, c) {
                return a - b * c
            }, isStable: function () {
                return .00001 > Math.abs(this.systemTemperature - this.prevSystemTemperature) || 0 >= this.temperature
            }, getSystemTemperature: function () {
                return this.nodes.reduce(function (a, b) {
                    return a + b.temperature
                }, 0)
            }, vectorLength: function (a) {
                return Math.sqrt(a.x * a.x + a.y * a.y)
            }, getDistR: function (a, b) {
                a = this.getDistXY(a, b);
                return this.vectorLength(a)
            },
            getDistXY: function (a, b) {
                var c = a.plotX - b.plotX;
                a = a.plotY - b.plotY;
                return {x: c, y: a, absX: Math.abs(c), absY: Math.abs(a)}
            }
        });
        b(g, "predraw", function () {
            this.graphLayoutsLookup && this.graphLayoutsLookup.forEach(function (a) {
                a.stop()
            })
        });
        b(g, "render", function () {
            function a(a) {
                a.maxIterations-- && isFinite(a.temperature) && !a.isStable() && !a.options.enableSimulation && (a.beforeStep && a.beforeStep(), a.step(), b = !1, c = !0)
            }

            var b, c = !1;
            if (this.graphLayoutsLookup) {
                f.setAnimation(!1, this);
                for (this.graphLayoutsLookup.forEach(function (a) {
                    a.start()
                }); !b;) b =
                    !0, this.graphLayoutsLookup.forEach(a);
                c && this.series.forEach(function (a) {
                    a && a.layout && a.render()
                })
            }
        })
    });
    m(h, "modules/networkgraph/draggable-nodes.js", [h["parts/Globals.js"]], function (f) {
        var c = f.Chart, d = f.addEvent;
        f.dragNodesMixin = {
            onMouseDown: function (b, c) {
                c = this.chart.pointer.normalize(c);
                b.fixedPosition = {chartX: c.chartX, chartY: c.chartY, plotX: b.plotX, plotY: b.plotY};
                b.inDragMode = !0
            }, onMouseMove: function (b, c) {
                if (b.fixedPosition && b.inDragMode) {
                    var a = this.chart, d = a.pointer.normalize(c);
                    c = b.fixedPosition.chartX -
                        d.chartX;
                    d = b.fixedPosition.chartY - d.chartY;
                    if (5 < Math.abs(c) || 5 < Math.abs(d)) c = b.fixedPosition.plotX - c, d = b.fixedPosition.plotY - d, a.isInsidePlot(c, d) && (b.plotX = c, b.plotY = d, this.redrawHalo(b), this.layout.simulation ? this.layout.resetSimulation() : (this.layout.setInitialRendering(!1), this.layout.enableSimulation ? this.layout.start() : this.layout.setMaxIterations(1), this.chart.redraw(), this.layout.setInitialRendering(!0)))
                }
            }, onMouseUp: function (b) {
                b.fixedPosition && (this.layout.enableSimulation ? this.layout.start() :
                    this.chart.redraw(), b.inDragMode = !1, this.options.fixedDraggable || delete b.fixedPosition)
            }, redrawHalo: function (b) {
                b && this.halo && this.halo.attr({d: b.haloPath(this.options.states.hover.halo.size)})
            }
        };
        d(c, "load", function () {
            var b = this, c, a, e;
            b.container && (c = d(b.container, "mousedown", function (c) {
                var f = b.hoverPoint;
                f && f.series && f.series.hasDraggableNodes && f.series.options.draggable && (f.series.onMouseDown(f, c), a = d(b.container, "mousemove", function (a) {
                    return f && f.series && f.series.onMouseMove(f, a)
                }), e = d(b.container.ownerDocument,
                    "mouseup", function (b) {
                        a();
                        e();
                        return f && f.series && f.series.onMouseUp(f, b)
                    }))
            }));
            d(b, "destroy", function () {
                c()
            })
        })
    });
    m(h, "modules/networkgraph/networkgraph.src.js", [h["parts/Globals.js"]], function (f) {
        var c = f.addEvent, d = f.defined, b = f.seriesType, g = f.seriesTypes, a = f.pick, e = f.Point, h = f.Series,
            l = f.dragNodesMixin;
        b("networkgraph", "line", {
                stickyTracking: !1,
                inactiveOtherPoints: !0,
                marker: {enabled: !0, states: {inactive: {opacity: .3, animation: {duration: 50}}}},
                states: {inactive: {linkOpacity: .3, animation: {duration: 50}}},
                dataLabels: {
                    formatter: function () {
                        return this.key
                    }, linkFormatter: function () {
                        return this.point.fromNode.name + "\x3cbr\x3e" + this.point.toNode.name
                    }, linkTextPath: {enabled: !0}, textPath: {enabled: !1}
                },
                link: {color: "rgba(100, 100, 100, 0.5)", width: 1},
                draggable: !0,
                layoutAlgorithm: {
                    initialPositions: "circle",
                    initialPositionRadius: 1,
                    enableSimulation: !1,
                    theta: .5,
                    maxSpeed: 10,
                    approximation: "none",
                    type: "reingold-fruchterman",
                    integration: "euler",
                    maxIterations: 1E3,
                    gravitationalConstant: .0625,
                    friction: -.981
                },
                showInLegend: !1
            },
            {
                forces: ["barycenter", "repulsive", "attractive"],
                hasDraggableNodes: !0,
                drawGraph: null,
                isCartesian: !1,
                requireSorting: !1,
                directTouch: !0,
                noSharedTooltip: !0,
                trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
                drawTracker: f.TrackerMixin.drawTrackerPoint,
                animate: null,
                buildKDTree: f.noop,
                createNode: f.NodesMixin.createNode,
                destroy: f.NodesMixin.destroy,
                init: function () {
                    h.prototype.init.apply(this, arguments);
                    c(this, "updatedData", function () {
                        this.layout && this.layout.stop()
                    });
                    return this
                },
                generatePoints: function () {
                    var a,
                        b;
                    f.NodesMixin.generatePoints.apply(this, arguments);
                    this.options.nodes && this.options.nodes.forEach(function (a) {
                        this.nodeLookup[a.id] || (this.nodeLookup[a.id] = this.createNode(a.id))
                    }, this);
                    for (b = this.nodes.length - 1; 0 <= b; b--) a = this.nodes[b], a.degree = a.getDegree(), this.nodeLookup[a.id] || a.remove();
                    this.data.forEach(function (a) {
                        a.formatPrefix = "link"
                    })
                },
                markerAttribs: function (a, b) {
                    b = h.prototype.markerAttribs.call(this, a, b);
                    b.x = a.plotX - (b.width / 2 || 0);
                    return b
                },
                translate: function () {
                    this.processedXData || this.processData();
                    this.generatePoints();
                    this.deferLayout();
                    this.nodes.forEach(function (a) {
                        a.isInside = !0;
                        a.linksFrom.forEach(function (a) {
                            a.shapeType = "path";
                            a.y = 1
                        })
                    })
                },
                deferLayout: function () {
                    var a = this.options.layoutAlgorithm, b = this.chart.graphLayoutsStorage,
                        c = this.chart.graphLayoutsLookup, e = this.chart.options.chart, g;
                    this.visible && (b || (this.chart.graphLayoutsStorage = b = {}, this.chart.graphLayoutsLookup = c = []), g = b[a.type], g || (a.enableSimulation = d(e.forExport) ? !e.forExport : a.enableSimulation, b[a.type] = g = new f.layouts[a.type],
                        g.init(a), c.splice(g.index, 0, g)), this.layout = g, g.setArea(0, 0, this.chart.plotWidth, this.chart.plotHeight), g.addSeries(this), g.addNodes(this.nodes), g.addLinks(this.points))
                },
                render: function () {
                    var a = this.points, b = this.chart.hoverPoint, c = [];
                    this.points = this.nodes;
                    g.line.prototype.render.call(this);
                    this.points = a;
                    a.forEach(function (a) {
                        a.fromNode && a.toNode && (a.renderLink(), a.redrawLink())
                    });
                    b && b.series === this && this.redrawHalo(b);
                    this.chart.hasRendered && !this.options.dataLabels.allowOverlap && (this.nodes.concat(this.points).forEach(function (a) {
                        a.dataLabel &&
                        c.push(a.dataLabel)
                    }), this.chart.hideOverlappingLabels(c))
                },
                drawDataLabels: function () {
                    var a = this.options.dataLabels.textPath;
                    h.prototype.drawDataLabels.apply(this, arguments);
                    this.points = this.data;
                    this.options.dataLabels.textPath = this.options.dataLabels.linkTextPath;
                    h.prototype.drawDataLabels.apply(this, arguments);
                    this.points = this.nodes;
                    this.options.dataLabels.textPath = a
                },
                pointAttribs: function (b, c) {
                    var d = c || b.state || "normal";
                    c = h.prototype.pointAttribs.call(this, b, d);
                    d = this.options.states[d];
                    b.isNode ||
                    (c = b.getLinkAttributes(), d && (c = {
                        stroke: d.linkColor || c.stroke,
                        dashstyle: d.linkDashStyle || c.dashstyle,
                        opacity: a(d.linkOpacity, c.opacity),
                        "stroke-width": d.linkColor || c["stroke-width"]
                    }));
                    return c
                },
                redrawHalo: l.redrawHalo,
                onMouseDown: l.onMouseDown,
                onMouseMove: l.onMouseMove,
                onMouseUp: l.onMouseUp,
                setState: function (a, b) {
                    b ? (this.points = this.nodes.concat(this.data), h.prototype.setState.apply(this, arguments), this.points = this.data) : h.prototype.setState.apply(this, arguments);
                    this.layout.simulation || a || this.render()
                }
            },
            {
                setState: f.NodesMixin.setNodeState, init: function () {
                    e.prototype.init.apply(this, arguments);
                    this.series.options.draggable && !this.series.chart.styledMode && (c(this, "mouseOver", function () {
                        f.css(this.series.chart.container, {cursor: "move"})
                    }), c(this, "mouseOut", function () {
                        f.css(this.series.chart.container, {cursor: "default"})
                    }));
                    return this
                }, getDegree: function () {
                    var a = this.isNode ? this.linksFrom.length + this.linksTo.length : 0;
                    return 0 === a ? 1 : a
                }, getLinkAttributes: function () {
                    var b = this.series.options.link, c = this.options;
                    return {
                        "stroke-width": a(c.width, b.width),
                        stroke: c.color || b.color,
                        dashstyle: c.dashStyle || b.dashStyle,
                        opacity: a(c.opacity, b.opacity, 1)
                    }
                }, renderLink: function () {
                    var a;
                    this.graphic || (this.graphic = this.series.chart.renderer.path(this.getLinkPath()).add(this.series.group), this.series.chart.styledMode || (a = this.series.pointAttribs(this), this.graphic.attr(a), (this.dataLabels || []).forEach(function (b) {
                        b && b.attr({opacity: a.opacity})
                    })))
                }, redrawLink: function () {
                    var a = this.getLinkPath(), b;
                    this.graphic && (this.shapeArgs =
                        {d: a}, this.series.chart.styledMode || (b = this.series.pointAttribs(this), this.graphic.attr(b), (this.dataLabels || []).forEach(function (a) {
                        a && a.attr({opacity: b.opacity})
                    })), this.graphic.animate(this.shapeArgs), this.plotX = (a[1] + a[4]) / 2, this.plotY = (a[2] + a[5]) / 2)
                }, getMass: function () {
                    var a = this.fromNode.mass, b = this.toNode.mass, c = a + b;
                    return {fromNode: 1 - a / c, toNode: 1 - b / c}
                }, getLinkPath: function () {
                    var a = this.fromNode, b = this.toNode;
                    a.plotX > b.plotX && (a = this.toNode, b = this.fromNode);
                    return ["M", a.plotX, a.plotY, "L", b.plotX,
                        b.plotY]
                }, isValid: function () {
                    return !this.isNode || d(this.id)
                }, remove: function (a, b) {
                    var c = this.series, d = c.options.nodes || [], e, f = d.length;
                    if (this.isNode) {
                        c.points = [];
                        [].concat(this.linksFrom).concat(this.linksTo).forEach(function (a) {
                            e = a.fromNode.linksFrom.indexOf(a);
                            -1 < e && a.fromNode.linksFrom.splice(e, 1);
                            e = a.toNode.linksTo.indexOf(a);
                            -1 < e && a.toNode.linksTo.splice(e, 1);
                            h.prototype.removePoint.call(c, c.data.indexOf(a), !1, !1)
                        });
                        c.points = c.data.slice();
                        for (c.nodes.splice(c.nodes.indexOf(this), 1); f--;) if (d[f].id ===
                            this.options.id) {
                            c.options.nodes.splice(f, 1);
                            break
                        }
                        this && this.destroy();
                        c.isDirty = !0;
                        c.isDirtyData = !0;
                        a && c.chart.redraw(a)
                    } else c.removePoint(c.data.indexOf(this), a, b)
                }, destroy: function () {
                    this.isNode ? (this.linksFrom.forEach(function (a) {
                        a.destroyElements()
                    }), this.series.layout.removeNode(this)) : this.series.layout.removeLink(this);
                    return e.prototype.destroy.apply(this, arguments)
                }
            })
    });
    m(h, "masters/modules/networkgraph.src.js", [], function () {
    })
});
//# sourceMappingURL=networkgraph.js.map
