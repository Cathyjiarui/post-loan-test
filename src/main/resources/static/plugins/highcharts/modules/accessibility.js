/*
 Highcharts JS v7.1.2 (2019-06-03)

 Accessibility module

 (c) 2010-2019 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
*/
(function (g) {
    "object" === typeof module && module.exports ? (g["default"] = g, module.exports = g) : "function" === typeof define && define.amd ? define("highcharts/modules/accessibility", ["highcharts"], function (m) {
        g(m);
        g.Highcharts = m;
        return g
    }) : g("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (g) {
    function m(c, g, l, k) {
        c.hasOwnProperty(g) || (c[g] = k.apply(null, l))
    }

    g = g ? g._modules : {};
    m(g, "modules/accessibility/KeyboardNavigationHandler.js", [g["parts/Globals.js"]], function (c) {
        function g(c, b) {
            this.chart = c;
            this.keyCodeMap =
                b.keyCodeMap || [];
            this.validate = b.validate;
            this.init = b.init;
            this.terminate = b.terminate;
            this.response = {success: 1, prev: 2, next: 3, noHandler: 4, fail: 5}
        }

        var l = c.find;
        g.prototype = {
            run: function (c) {
                var b = c.which || c.keyCode, a = this.response.noHandler, d = l(this.keyCodeMap, function (a) {
                    return -1 < a[0].indexOf(b)
                });
                d ? a = d[1].call(this, b, c) : 9 === b ? a = this.response[c.shiftKey ? "prev" : "next"] : 27 === b && (this.chart && this.chart.tooltip && this.chart.tooltip.hide(0), a = this.response.success);
                return a
            }
        };
        return g
    });
    m(g, "modules/accessibility/AccessibilityComponent.js",
        [g["parts/Globals.js"]], function (c) {
            function g() {
            }

            var l = c.win, k = l.document, b = c.merge, a = c.addEvent;
            g.prototype = {
                initBase: function (a) {
                    this.chart = a;
                    this.eventRemovers = [];
                    this.domElements = [];
                    this.keyCodes = {left: 37, right: 39, up: 38, down: 40, enter: 13, space: 32, esc: 27, tab: 9};
                    this.hiddenStyle = {position: "absolute", width: "1px", height: "1px", overflow: "hidden"}
                }, addEvent: function () {
                    var a = c.addEvent.apply(c, arguments);
                    this.eventRemovers.push(a);
                    return a
                }, createElement: function () {
                    var a = c.win.document.createElement.apply(c.win.document,
                        arguments);
                    this.domElements.push(a);
                    return a
                }, cloneMouseEvent: function (a) {
                    if ("function" === typeof l.MouseEvent) return new l.MouseEvent(a.type, a);
                    if (k.createEvent) {
                        var b = k.createEvent("MouseEvent");
                        if (b.initMouseEvent) return b.initMouseEvent(a.type, a.canBubble, a.cancelable, a.view, a.detail, a.screenX, a.screenY, a.clientX, a.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, a.button, a.relatedTarget), b;
                        b = k.createEvent("Event");
                        if (b.initEvent) return b.initEvent(a.type, !0, !0), b
                    }
                }, fakeClickEvent: function (a) {
                    if (a &&
                        a.onclick && k.createEvent) {
                        var b = k.createEvent("Event");
                        b.initEvent("click", !0, !1);
                        a.onclick(b)
                    }
                }, createProxyButton: function (d, e, h, f, n) {
                    var p = d.element, w = this, c = this.createElement("button"),
                        k = b({"aria-label": p.getAttribute("aria-label")}, h);
                    if (d = this.getElementPosition(f || d)) return Object.keys(k).forEach(function (a) {
                        null !== k[a] && c.setAttribute(a, k[a])
                    }), b(!0, c.style, {
                        "border-width": 0,
                        "background-color": "transparent",
                        position: "absolute",
                        width: (d.width || 1) + "px",
                        height: (d.height || 1) + "px",
                        display: "block",
                        cursor: "pointer",
                        overflow: "hidden",
                        outline: "none",
                        opacity: .001,
                        filter: "alpha(opacity\x3d1)",
                        "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity\x3d1)",
                        zIndex: 999,
                        padding: 0,
                        margin: 0,
                        left: d.x + "px",
                        top: d.y - this.chart.containerHeight + "px"
                    }), n && a(c, "click", n), ["click", "mouseover", "mouseenter", "mouseleave", "mouseout"].forEach(function (f) {
                        a(c, f, function (a) {
                            var b = w.cloneMouseEvent(a);
                            if (p) if (b) p.fireEvent ? p.fireEvent(b) : p.dispatchEvent && p.dispatchEvent(b); else if (p["on" + f]) p["on" + f](a)
                        })
                    }), e.appendChild(c),
                    k["aria-hidden"] || this.unhideElementFromScreenReaders(c), c
                }, getElementPosition: function (a) {
                    var b = a.element;
                    if ((a = this.chart.renderTo) && b && b.getBoundingClientRect) return b = b.getBoundingClientRect(), a = a.getBoundingClientRect(), {
                        x: b.left - a.left,
                        y: b.top - a.top,
                        width: b.right - b.left,
                        height: b.bottom - b.top
                    }
                }, addProxyGroup: function (a) {
                    var b = this.chart;
                    b.a11yProxyContainer || (b.a11yProxyContainer = k.createElement("div"), b.a11yProxyContainer.style.position = "relative");
                    b.container.nextSibling !== b.a11yProxyContainer &&
                    b.renderTo.insertBefore(b.a11yProxyContainer, b.container.nextSibling);
                    var d = this.createElement("div");
                    Object.keys(a || {}).forEach(function (f) {
                        null !== a[f] && d.setAttribute(f, a[f])
                    });
                    b.a11yProxyContainer.appendChild(d);
                    return d
                }, removeElement: function (a) {
                    a && a.parentNode && a.parentNode.removeChild(a)
                }, unhideElementFromScreenReaders: function (a) {
                    a.setAttribute("aria-hidden", !1);
                    a !== this.chart.renderTo && a.parentNode && (Array.prototype.forEach.call(a.parentNode.childNodes, function (a) {
                        a.hasAttribute("aria-hidden") ||
                        a.setAttribute("aria-hidden", !0)
                    }), this.unhideElementFromScreenReaders(a.parentNode))
                }, destroyBase: function () {
                    var a = this;
                    this.removeElement((this.chart || {}).a11yProxyContainer);
                    this.eventRemovers.forEach(function (a) {
                        a()
                    });
                    this.domElements.forEach(function (b) {
                        a.removeElement(b)
                    });
                    this.eventRemovers = [];
                    this.domElements = []
                }, stripTags: function (a) {
                    return "string" === typeof a ? a.replace(/<\/?[^>]+(>|$)/g, "") : a
                }, htmlencode: function (a) {
                    return a.replace(/&/g, "\x26amp;").replace(/</g, "\x26lt;").replace(/>/g, "\x26gt;").replace(/"/g,
                        "\x26quot;").replace(/'/g, "\x26#x27;").replace(/\//g, "\x26#x2F;")
                }, init: function () {
                }, getKeyboardNavigation: function () {
                }, onChartUpdate: function () {
                }, onChartRender: function () {
                }, destroy: function () {
                    this.destroyBase()
                }
            };
            return g
        });
    m(g, "modules/accessibility/KeyboardNavigation.js", [g["parts/Globals.js"], g["modules/accessibility/KeyboardNavigationHandler.js"]], function (c, g) {
        function l(a, b, f) {
            this.init(a, b, f)
        }

        var k = c.merge, b = c.addEvent, a = c.win, d = a.document;
        l.prototype = {
            init: function (a, h) {
                var f = this;
                this.chart =
                    a;
                this.components = h;
                this.modules = [];
                this.currentModuleIx = 0;
                a.container.hasAttribute("tabIndex") || a.container.setAttribute("tabindex", "0");
                this.addExitAnchor();
                this.unbindKeydownHandler = b(a.renderTo, "keydown", function (a) {
                    f.onKeydown(a)
                });
                this.unbindMouseUpHandler = b(d, "mouseup", function () {
                    f.onMouseUp()
                });
                this.update();
                this.modules.length && this.modules[0].init(1)
            }, update: function (a) {
                var b = this.chart.options.accessibility, b = b && b.keyboardNavigation, f = this.components;
                b && b.enabled && a && a.length ? this.modules =
                    a.reduce(function (a, b) {
                        b = f[b].getKeyboardNavigation();
                        return b.length ? a.concat(b) : (a.push(b), a)
                    }, [new g(this.chart, {})]) : (this.modules = [], this.currentModuleIx = 0)
            }, onMouseUp: function () {
                if (!(this.keyboardReset || this.chart.pointer && this.chart.pointer.chartPosition)) {
                    var a = this.chart, b = this.modules && this.modules[this.currentModuleIx || 0];
                    b && b.terminate && b.terminate();
                    a.focusElement && a.focusElement.removeFocusBorder();
                    this.currentModuleIx = 0;
                    this.keyboardReset = !0
                }
            }, onKeydown: function (b) {
                b = b || a.event;
                var d,
                    f = this.modules && this.modules.length && this.modules[this.currentModuleIx];
                this.keyboardReset = !1;
                if (f) {
                    var n = f.run(b);
                    n === f.response.success ? d = !0 : n === f.response.prev ? d = this.prev() : n === f.response.next && (d = this.next());
                    d && b.preventDefault()
                }
            }, prev: function () {
                return this.move(-1)
            }, next: function () {
                return this.move(1)
            }, move: function (a) {
                var b = this.modules && this.modules[this.currentModuleIx];
                b && b.terminate && b.terminate(a);
                this.chart.focusElement && this.chart.focusElement.removeFocusBorder();
                this.currentModuleIx +=
                    a;
                if (b = this.modules && this.modules[this.currentModuleIx]) {
                    if (b.validate && !b.validate()) return this.move(a);
                    if (b.init) return b.init(a), !0
                }
                this.currentModuleIx = 0;
                0 < a ? (this.exiting = !0, this.exitAnchor.focus()) : this.chart.renderTo.focus();
                return !1
            }, addExitAnchor: function () {
                var e = this.chart, h = this.exitAnchorWrapper = d.createElement("div"),
                    f = this.exitAnchor = d.createElement("h6"), n = this,
                    c = e.langFormat("accessibility.svgContainerEnd", {chart: e});
                h.setAttribute("aria-hidden", "false");
                h.setAttribute("class", "highcharts-exit-anchor-wrapper");
                h.style.position = "relative";
                h.style.outline = "none";
                f.setAttribute("tabindex", "0");
                f.setAttribute("aria-label", c);
                f.setAttribute("aria-hidden", !1);
                k(!0, f.style, {
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    bottom: "5px",
                    zIndex: 0,
                    overflow: "hidden",
                    outline: "none"
                });
                h.appendChild(f);
                e.renderTo.appendChild(h);
                this.unbindExitAnchorUpdate = b(e, "render", function () {
                    this.renderTo.appendChild(h)
                });
                this.unbindExitAnchorFocus = b(f, "focus", function (b) {
                    b = b || a.event;
                    n.exiting ? n.exiting = !1 : (e.renderTo.focus(), b.preventDefault(),
                    n.modules && n.modules.length && (n.currentModuleIx = n.modules.length - 1, (b = n.modules[n.currentModuleIx]) && b.validate && !b.validate() ? n.prev() : b && b.init(-1)))
                })
            }, destroy: function () {
                this.unbindExitAnchorFocus && (this.unbindExitAnchorFocus(), delete this.unbindExitAnchorFocus);
                this.unbindExitAnchorUpdate && (this.unbindExitAnchorUpdate(), delete this.unbindExitAnchorUpdate);
                this.exitAnchorWrapper && this.exitAnchorWrapper.parentNode && (this.exitAnchorWrapper.parentNode.removeChild(this.exitAnchorWrapper), delete this.exitAnchor,
                    delete this.exitAnchorWrapper);
                this.unbindKeydownHandler && this.unbindKeydownHandler();
                this.unbindMouseUpHandler && this.unbindMouseUpHandler()
            }
        };
        return l
    });
    m(g, "modules/accessibility/components/LegendComponent.js", [g["parts/Globals.js"], g["modules/accessibility/AccessibilityComponent.js"], g["modules/accessibility/KeyboardNavigationHandler.js"]], function (c, g, l) {
        c.Chart.prototype.highlightLegendItem = function (b) {
            var a = this.legend.allItems, d = this.highlightedLegendItemIx;
            return a[b] ? (a[d] && c.fireEvent(a[d].legendGroup.element,
                "mouseout"), void 0 !== a[b].pageIx && a[b].pageIx + 1 !== this.legend.currentPage && this.legend.scroll(1 + a[b].pageIx - this.legend.currentPage), this.setFocusToElement(a[b].legendItem, a[b].a11yProxyElement), c.fireEvent(a[b].legendGroup.element, "mouseover"), !0) : !1
        };
        c.addEvent(c.Legend, "afterColorizeItem", function (b) {
            var a = b.item;
            this.chart.options.accessibility.enabled && a && a.a11yProxyElement && a.a11yProxyElement.setAttribute("aria-pressed", b.visible ? "false" : "true")
        });
        var k = function (b) {
            this.initBase(b)
        };
        k.prototype =
            new g;
        c.extend(k.prototype, {
            onChartRender: function () {
                var b = this.chart, a = b.options.accessibility, d = b.legend && b.legend.allItems, e = this;
                e.legendProxyButtonClicked ? delete e.legendProxyButtonClicked : (this.removeElement(this.legendProxyGroup), !d || !d.length || b.colorAxis && b.colorAxis.length || !b.options.legend.accessibility.enabled || (this.legendProxyGroup = this.addProxyGroup({
                    "aria-label": b.langFormat("accessibility.legendLabel"),
                    role: "all" === a.landmarkVerbosity ? "region" : null
                }), d.forEach(function (a) {
                    a.legendItem &&
                    a.legendItem.element && (a.a11yProxyElement = e.createProxyButton(a.legendItem, e.legendProxyGroup, {
                        tabindex: -1,
                        "aria-pressed": !a.visible,
                        "aria-label": b.langFormat("accessibility.legendItem", {
                            chart: b,
                            itemName: e.stripTags(a.name)
                        })
                    }, a.legendGroup.div ? a.legendItem : a.legendGroup, function () {
                        e.legendProxyButtonClicked = !0
                    }))
                })))
            }, getKeyboardNavigation: function () {
                var b = this.keyCodes, a = this, d = this.chart, e = d.options.accessibility;
                return new l(d, {
                    keyCodeMap: [[[b.left, b.right, b.up, b.down], function (h) {
                        h = h === b.left ||
                        h === b.up ? -1 : 1;
                        return d.highlightLegendItem(a.highlightedLegendItemIx + h) ? (a.highlightedLegendItemIx += h, this.response.success) : 1 < d.legend.allItems.length && e.keyboardNavigation.wrapAround ? (this.init(h), this.response.success) : this.response[0 < h ? "next" : "prev"]
                    }], [[b.enter, b.space], function () {
                        var b = d.legend.allItems[a.highlightedLegendItemIx];
                        b && b.a11yProxyElement && c.fireEvent(b.a11yProxyElement, "click");
                        return this.response.success
                    }]], validate: function () {
                        var a = d.options.legend;
                        return d.legend && d.legend.allItems &&
                            d.legend.display && !(d.colorAxis && d.colorAxis.length) && a && a.accessibility && a.accessibility.enabled && a.accessibility.keyboardNavigation && a.accessibility.keyboardNavigation.enabled
                    }, init: function (b) {
                        b = 0 < b ? 0 : d.legend.allItems.length - 1;
                        d.highlightLegendItem(b);
                        a.highlightedLegendItemIx = b
                    }
                })
            }
        });
        return k
    });
    m(g, "modules/accessibility/components/MenuComponent.js", [g["parts/Globals.js"], g["modules/accessibility/AccessibilityComponent.js"], g["modules/accessibility/KeyboardNavigationHandler.js"]], function (c,
                                                                                                                                                                                                                g, l) {
        c.Chart.prototype.showExportMenu = function () {
            this.exportSVGElements && this.exportSVGElements[0] && (this.exportSVGElements[0].element.onclick(), this.highlightExportItem(0))
        };
        c.Chart.prototype.hideExportMenu = function () {
            var b = this.exportDivElements;
            b && this.exportContextMenu && (b.forEach(function (a) {
                if ("highcharts-menu-item" === a.className && a.onmouseout) a.onmouseout()
            }), this.highlightedExportItemIx = 0, this.exportContextMenu.hideMenu(), this.container.focus())
        };
        c.Chart.prototype.highlightExportItem = function (b) {
            var a =
                this.exportDivElements && this.exportDivElements[b],
                d = this.exportDivElements && this.exportDivElements[this.highlightedExportItemIx], e;
            if (a && "DIV" === a.tagName && (!a.children || !a.children.length)) {
                e = !!(this.renderTo.getElementsByTagName("g")[0] || {}).focus;
                a.focus && e && a.focus();
                if (d && d.onmouseout) d.onmouseout();
                if (a.onmouseover) a.onmouseover();
                this.highlightedExportItemIx = b;
                return !0
            }
        };
        c.Chart.prototype.highlightLastExportItem = function () {
            var b;
            if (this.exportDivElements) for (b = this.exportDivElements.length; b--;) if (this.highlightExportItem(b)) return !0;
            return !1
        };
        var k = function (b) {
            this.initBase(b);
            this.init()
        };
        k.prototype = new g;
        c.extend(k.prototype, {
            init: function () {
                this.addEvent(this.chart, "exportMenuHidden", function () {
                    var b = this.exportContextMenu;
                    b && b.setAttribute("aria-hidden", !0)
                })
            }, onChartRender: function () {
                var b = this, a = this.chart, d = a.options.accessibility;
                this.removeElement(this.exportProxyGroup);
                if (a.options.exporting && !1 !== a.options.exporting.enabled && a.options.exporting.accessibility && a.options.exporting.accessibility.enabled && a.exportSVGElements &&
                    a.exportSVGElements[0] && a.exportSVGElements[0].element) {
                    var e = a.exportSVGElements[0], h = e.element, f = h.onclick;
                    this.wrappedButton !== h && (h.onclick = function () {
                        f.apply(this, Array.prototype.slice.call(arguments));
                        b.addAccessibleContextMenuAttribs();
                        a.highlightExportItem(0)
                    }, this.wrappedButton = h);
                    this.exportProxyGroup = this.addProxyGroup("all" === d.landmarkVerbosity ? {
                        "aria-label": a.langFormat("accessibility.exporting.exportRegionLabel", {chart: a}),
                        role: "region"
                    } : null);
                    this.exportButtonProxy = this.createProxyButton(e,
                        this.exportProxyGroup, {"aria-label": a.langFormat("accessibility.exporting.menuButtonLabel", {chart: a})})
                }
            }, addAccessibleContextMenuAttribs: function () {
                var b = this.chart, a = b.exportDivElements, d = b.exportContextMenu;
                a && a.length && (a.forEach(function (a) {
                    "DIV" !== a.tagName || a.children && a.children.length || (a.setAttribute("role", "menuitem"), a.setAttribute("tabindex", -1))
                }), a[0].parentNode.setAttribute("role", "menu"), a[0].parentNode.setAttribute("aria-label", b.langFormat("accessibility.exporting.chartMenuLabel",
                    {chart: b})));
                d && this.unhideElementFromScreenReaders(d)
            }, getKeyboardNavigation: function () {
                var b = this.keyCodes, a = this.chart, d = a.options.accessibility, e = this;
                return new l(a, {
                    keyCodeMap: [[[b.left, b.up], function () {
                        for (var b = a.highlightedExportItemIx || 0; b--;) if (a.highlightExportItem(b)) return this.response.success;
                        return d.keyboardNavigation.wrapAround ? (a.highlightLastExportItem(), this.response.success) : this.response.prev
                    }], [[b.right, b.down], function () {
                        for (var b = (a.highlightedExportItemIx || 0) + 1; b < a.exportDivElements.length; ++b) if (a.highlightExportItem(b)) return this.response.success;
                        return d.keyboardNavigation.wrapAround ? (a.highlightExportItem(0), this.response.success) : this.response.next
                    }], [[b.enter, b.space], function () {
                        e.fakeClickEvent(a.exportDivElements[a.highlightedExportItemIx]);
                        return this.response.success
                    }], [[b.esc], function () {
                        return this.response.prev
                    }]], validate: function () {
                        return a.exportChart && !1 !== a.options.exporting.enabled && !1 !== a.options.exporting.accessibility.enabled
                    }, init: function (b) {
                        a.showExportMenu();
                        0 > b && a.highlightLastExportItem()
                    }, terminate: function () {
                        a.hideExportMenu()
                    }
                })
            }
        });
        return k
    });
    m(g, "modules/accessibility/components/SeriesComponent.js", [g["parts/Globals.js"], g["modules/accessibility/AccessibilityComponent.js"], g["modules/accessibility/KeyboardNavigationHandler.js"]], function (c, g, l) {
        function k(a) {
            var b = a.index, f = a.series.points, d = f.length;
            if (f[b] !== a) for (; d--;) {
                if (f[d] === a) return d
            } else return b
        }

        function b(a) {
            var b = a.chart.options.accessibility, f = a.options.accessibility || {}, d = f.keyboardNavigation;
            return d && !1 === d.enabled || !1 === f.enabled || !1 === a.options.enableMouseTracking ||
                !a.visible || b.pointDescriptionThreshold && b.pointDescriptionThreshold <= a.points.length
        }

        function a(a) {
            var f = a.series.chart.options.accessibility;
            return a.isNull && f.keyboardNavigation.skipNullPoints || !1 === a.visible || b(a.series)
        }

        var d = c.merge, e = c.pick;
        c.Series.prototype.keyboardMoveVertical = !0;
        ["column", "pie"].forEach(function (a) {
            c.seriesTypes[a] && (c.seriesTypes[a].prototype.keyboardMoveVertical = !1)
        });
        c.addEvent(c.Series, "render", function () {
            var a = this.options, b = this.chart.options.accessibility || {}, e =
                this.points || [], c = e.length, h = this.resetA11yMarkerOptions;
            if (b.enabled && !1 !== (a.accessibility && a.accessibility.enabled) && (c < b.pointDescriptionThreshold || !1 === b.pointDescriptionThreshold)) {
                if (a.marker && !1 === a.marker.enabled && (this.a11yMarkersForced = !0, d(!0, this.options, {
                    marker: {
                        enabled: !0,
                        states: {normal: {opacity: 0}}
                    }
                })), this._hasPointMarkers && this.points && this.points.length) for (a = c; a--;) b = e[a].options, b.marker && (b.marker.enabled ? d(!0, b.marker, {
                    states: {
                        normal: {
                            opacity: b.marker.states && b.marker.states.normal &&
                                b.marker.states.normal.opacity || 1
                        }
                    }
                }) : d(!0, b.marker, {enabled: !0, states: {normal: {opacity: 0}}}))
            } else this.a11yMarkersForced && h && (delete this.a11yMarkersForced, d(!0, this.options, {
                marker: {
                    enabled: h.enabled,
                    states: {normal: {opacity: h.states && h.states.normal && h.states.normal.opacity}}
                }
            }))
        });
        c.addEvent(c.Series, "afterSetOptions", function (a) {
            this.resetA11yMarkerOptions = d(a.options.marker || {}, this.userOptions.marker || {})
        });
        c.Point.prototype.highlight = function () {
            var a = this.series.chart;
            if (this.isNull) a.tooltip &&
            a.tooltip.hide(0); else this.onMouseOver();
            this.graphic && a.setFocusToElement(this.graphic);
            a.highlightedPoint = this;
            return this
        };
        c.Chart.prototype.highlightAdjacentPoint = function (f) {
            var d = this.series, e = this.highlightedPoint, c = e && k(e) || 0, h = e && e.series.points,
                g = this.series && this.series[this.series.length - 1],
                g = g && g.points && g.points[g.points.length - 1];
            if (!d[0] || !d[0].points) return !1;
            if (e) {
                if (d = d[e.series.index + (f ? 1 : -1)], c = h[c + (f ? 1 : -1)], !c && d && (c = d.points[f ? 0 : d.points.length - 1]), !c) return !1
            } else c = f ? d[0].points[0] :
                g;
            return a(c) ? (d = c.series, b(d) ? this.highlightedPoint = f ? d.points[d.points.length - 1] : d.points[0] : this.highlightedPoint = c, this.highlightAdjacentPoint(f)) : c.highlight()
        };
        c.Series.prototype.highlightFirstValidPoint = function () {
            var b = this.chart.highlightedPoint, d = (b && b.series) === this ? k(b) : 0, b = this.points, e = b.length;
            if (b && e) {
                for (var c = d; c < e; ++c) if (!a(b[c])) return b[c].highlight();
                for (; 0 <= d; --d) if (!a(b[d])) return b[d].highlight()
            }
            return !1
        };
        c.Chart.prototype.highlightAdjacentSeries = function (a) {
            var f, d, e = this.highlightedPoint,
                c = (f = this.series && this.series[this.series.length - 1]) && f.points && f.points[f.points.length - 1];
            if (!this.highlightedPoint) return f = a ? this.series && this.series[0] : f, (d = a ? f && f.points && f.points[0] : c) ? d.highlight() : !1;
            f = this.series[e.series.index + (a ? -1 : 1)];
            if (!f) return !1;
            var c = Infinity, h, k = f.points.length;
            if (void 0 === e.plotX || void 0 === e.plotY) d = void 0; else {
                for (; k--;) h = f.points[k], void 0 !== h.plotX && void 0 !== h.plotY && (h = (e.plotX - h.plotX) * (e.plotX - h.plotX) * 4 + (e.plotY - h.plotY) * (e.plotY - h.plotY) * 1, h < c && (c = h, d =
                    k));
                d = void 0 !== d && f.points[d]
            }
            if (!d) return !1;
            if (b(f)) return d.highlight(), a = this.highlightAdjacentSeries(a), a ? a : (e.highlight(), !1);
            d.highlight();
            return d.series.highlightFirstValidPoint()
        };
        c.Chart.prototype.highlightAdjacentPointVertical = function (f) {
            var d = this.highlightedPoint, e = Infinity, c;
            if (void 0 === d.plotX || void 0 === d.plotY) return !1;
            this.series.forEach(function (n) {
                n === d.series || b(n) || n.points.forEach(function (b) {
                    if (void 0 !== b.plotY && void 0 !== b.plotX && b !== d) {
                        var h = b.plotY - d.plotY, k = Math.abs(b.plotX -
                            d.plotX), k = Math.abs(h) * Math.abs(h) + k * k * 4;
                        n.yAxis.reversed && (h *= -1);
                        !(0 >= h && f || 0 <= h && !f || 5 > k || a(b)) && k < e && (e = k, c = b)
                    }
                })
            });
            return c ? c.highlight() : !1
        };
        c.Point.prototype.getA11yTimeDescription = function () {
            var a = this.series, b = a.chart, d = b.options.accessibility;
            if (a.xAxis && a.xAxis.isDatetimeAxis) return b.time.dateFormat(d.pointDateFormatter && d.pointDateFormatter(this) || d.pointDateFormat || c.Tooltip.prototype.getXDateFormat.call({
                    getDateFormat: c.Tooltip.prototype.getDateFormat,
                    chart: b
                }, this, b.options.tooltip,
                a.xAxis), this.x)
        };
        var h = function (a) {
            this.initBase(a);
            this.init()
        };
        h.prototype = new g;
        c.extend(h.prototype, {
            init: function () {
                var a = this;
                this.addEvent(c.Series, "destroy", function () {
                    var b = this.chart;
                    b === a.chart && b.highlightedPoint && b.highlightedPoint.series === this && (delete b.highlightedPoint, b.focusElement && b.focusElement.removeFocusBorder())
                });
                this.addEvent(c.Tooltip, "refresh", function () {
                    this.chart === a.chart && this.label && this.label.element && this.label.element.setAttribute("aria-hidden", !0)
                });
                this.addEvent(this.chart,
                    "afterDrawSeriesLabels", function () {
                        this.series.forEach(function (a) {
                            a.labelBySeries && a.labelBySeries.attr("aria-hidden", !0)
                        })
                    });
                this.initAnnouncer()
            }, onChartRender: function () {
                var a = this;
                this.chart.series.forEach(function (b) {
                    a[!1 !== (b.options.accessibility && b.options.accessibility.enabled) ? "addSeriesDescription" : "hideSeriesFromScreenReader"](b)
                })
            }, getKeyboardNavigation: function () {
                var a = this.keyCodes, b = this.chart, d = b.options.accessibility, e = function (a) {
                    return b.highlightAdjacentPoint(a) ? this.response.success :
                        d.keyboardNavigation.wrapAround ? this.init(a ? 1 : -1) : this.response[a ? "next" : "prev"]
                };
                return new l(b, {
                    keyCodeMap: [[[a.left, a.right], function (b) {
                        return e.call(this, b === a.right)
                    }], [[a.up, a.down], function (f) {
                        var c = f === a.down, h = d.keyboardNavigation;
                        if (h.mode && "serialize" === h.mode) return e.call(this, f === a.down);
                        b[b.highlightedPoint && b.highlightedPoint.series.keyboardMoveVertical ? "highlightAdjacentPointVertical" : "highlightAdjacentSeries"](c);
                        return this.response.success
                    }], [[a.enter, a.space], function () {
                        b.highlightedPoint &&
                        b.highlightedPoint.firePointEvent("click")
                    }]], init: function (a) {
                        var d = b.series.length, f = 0 < a ? 0 : d;
                        if (0 < a) for (delete b.highlightedPoint; f < d && !(a = b.series[f].highlightFirstValidPoint());) ++f; else for (; f-- && !(b.highlightedPoint = b.series[f].points[b.series[f].points.length - 1], a = b.series[f].highlightFirstValidPoint());) ;
                        return this.response.success
                    }, terminate: function () {
                        b.tooltip && b.tooltip.hide(0);
                        delete b.highlightedPoint
                    }
                })
            }, isPointClickable: function (a) {
                var b = a.series.options || {}, b = b.point && b.point.events;
                return a && a.graphic && a.graphic.element && (a.hcEvents && a.hcEvents.click || b && b.click || a.options && a.options.events && a.options.events.click)
            }, initAnnouncer: function () {
                var a = this.chart, b = a.options.accessibility, e = this;
                this.lastAnnouncementTime = 0;
                this.dirty = {allSeries: {}};
                this.announceRegion = this.createElement("div");
                this.announceRegion.setAttribute("aria-hidden", !1);
                this.announceRegion.setAttribute("aria-live", b.announceNewData.interruptUser ? "assertive" : "polite");
                d(!0, this.announceRegion.style, this.hiddenStyle);
                a.renderTo.insertBefore(this.announceRegion, a.renderTo.firstChild);
                this.addEvent(this.chart, "afterDrilldown", function () {
                    a.highlightedPoint = null;
                    if (a.options.accessibility.announceNewData.enabled) {
                        if (this.series && this.series.length) {
                            var b = e.getSeriesElement(this.series[0]);
                            b.focus && b.getAttribute("aria-label") ? b.focus() : this.series[0].highlightFirstValidPoint()
                        }
                        e.lastAnnouncementTime = 0;
                        a.focusElement && a.focusElement.removeFocusBorder()
                    }
                });
                this.addEvent(c.Series, "updatedData", function () {
                    this.chart ===
                    a && this.chart.options.accessibility.announceNewData.enabled && (e.dirty.hasDirty = !0, e.dirty.allSeries[this.name + this.index] = this)
                });
                this.addEvent(a, "afterAddSeries", function (a) {
                    this.options.accessibility.announceNewData.enabled && (a = a.series, e.dirty.hasDirty = !0, e.dirty.allSeries[a.name + a.index] = a, e.dirty.newSeries = void 0 === e.dirty.newSeries ? a : null)
                });
                this.addEvent(c.Series, "addPoint", function (b) {
                    this.chart === a && this.chart.options.accessibility.announceNewData.enabled && (e.dirty.newPoint = void 0 === e.dirty.newPoint ?
                        b.point : null)
                });
                this.addEvent(a, "redraw", function () {
                    if (this.options.accessibility.announceNewData && e.dirty.hasDirty) {
                        var a = e.dirty.newPoint, b;
                        a && (b = a.series.data.filter(function (b) {
                            return b.x === a.x && b.y === a.y
                        }), a = 1 === b.length ? b[0] : a);
                        e.announceNewData(Object.keys(e.dirty.allSeries).map(function (a) {
                            return e.dirty.allSeries[a]
                        }), e.dirty.newSeries, a);
                        e.dirty = {allSeries: {}}
                    }
                })
            }, announceNewData: function (a, b, d) {
                var f = this.chart.options.accessibility.announceNewData;
                if (f.enabled) {
                    var e = this, c = +new Date,
                        f = Math.max(0, f.minAnnounceInterval - (c - this.lastAnnouncementTime));
                    if (this.queuedAnnouncement) {
                        var h = (this.queuedAnnouncement.series || []).concat(a).reduce(function (a, b) {
                            a[b.name + b.index] = b;
                            return a
                        }, {});
                        a = Object.keys(h).map(function (a) {
                            return h[a]
                        })
                    } else a = [].concat(a);
                    if (b = this.buildAnnouncementMessage(a, b, d)) this.queuedAnnouncement && clearTimeout(this.queuedAnnouncementTimer), this.queuedAnnouncement = {
                        time: c,
                        message: b,
                        series: a
                    }, e.queuedAnnouncementTimer = setTimeout(function () {
                        e && e.announceRegion && (e.lastAnnouncementTime =
                            +new Date, e.announceRegion.innerHTML = e.queuedAnnouncement.message, e.clearAnnouncementContainerTimer && clearTimeout(e.clearAnnouncementContainerTimer), e.clearAnnouncementContainerTimer = setTimeout(function () {
                            e.announceRegion.innerHTML = "";
                            delete e.clearAnnouncementContainerTimer
                        }, 1E3), delete e.queuedAnnouncement, delete e.queuedAnnouncementTimer)
                    }, f)
                }
            }, buildAnnouncementMessage: function (a, b, d) {
                var f = this.chart, e = f.options.accessibility.announceNewData;
                if (e.announcementFormatter && (a = e.announcementFormatter(a,
                    b, d), !1 !== a)) return a.length ? a : null;
                a = c.charts && 1 < c.charts.length ? "Multiple" : "Single";
                return f.langFormat("accessibility.announceNewData." + (b ? "newSeriesAnnounce" + a : d ? "newPointAnnounce" + a : "newDataAnnounce"), {
                    chartTitle: this.stripTags(f.options.title.text || f.langFormat("accessibility.defaultChartTitle", {chart: f})),
                    seriesDesc: b ? this.defaultSeriesDescriptionFormatter(b) : null,
                    pointDesc: d ? this.defaultPointDescriptionFormatter(d) : null,
                    point: d,
                    series: b
                })
            }, reverseChildNodes: function (a) {
                for (var b = a.childNodes.length; b--;) a.appendChild(a.childNodes[b])
            },
            getSeriesFirstPointElement: function (a) {
                return a.points && a.points.length && a.points[0].graphic && a.points[0].graphic.element
            }, getSeriesElement: function (a) {
                var b = this.getSeriesFirstPointElement(a);
                return b && b.parentNode || a.graph && a.graph.element || a.group && a.group.element
            }, hideSeriesFromScreenReader: function (a) {
                (a = this.getSeriesElement(a)) && a.setAttribute("aria-hidden", !0)
            }, addSeriesDescription: function (a) {
                var b = this, d = a.chart, e = d.options.accessibility, f = a.options.accessibility || {},
                    c = b.getSeriesFirstPointElement(a),
                    h = b.getSeriesElement(a);
                h && (this.unhideElementFromScreenReaders(h), h.lastChild === c && b.reverseChildNodes(h), a.points && (a.points.length < e.pointDescriptionThreshold || !1 === e.pointDescriptionThreshold) && !f.exposeAsGroupOnly && a.points.forEach(function (a) {
                    var d = a.graphic && a.graphic.element;
                    d && (d.setAttribute("role", "img"), d.setAttribute("tabindex", "-1"), d.setAttribute("aria-label", b.stripTags(f.pointDescriptionFormatter && f.pointDescriptionFormatter(a) || e.pointDescriptionFormatter && e.pointDescriptionFormatter(a) ||
                        b.defaultPointDescriptionFormatter(a))))
                }), 1 < d.series.length || e.describeSingleSeries) && (f.exposeAsGroupOnly ? h.setAttribute("role", "img") : "all" === e.landmarkVerbosity && h.setAttribute("role", "region"), h.setAttribute("tabindex", "-1"), h.setAttribute("aria-label", b.stripTags(e.seriesDescriptionFormatter && e.seriesDescriptionFormatter(a) || b.defaultSeriesDescriptionFormatter(a))))
            }, defaultSeriesDescriptionFormatter: function (a) {
                var b = a.chart, d = (a.options.accessibility || {}).description,
                    d = d && b.langFormat("accessibility.series.description",
                        {description: d, series: a}), e = b.langFormat("accessibility.series.xAxisDescription", {
                        name: a.xAxis && a.xAxis.getDescription(),
                        series: a
                    }), f = b.langFormat("accessibility.series.yAxisDescription", {
                        name: a.yAxis && a.yAxis.getDescription(),
                        series: a
                    }), c = {
                        name: a.name || "",
                        ix: a.index + 1,
                        numSeries: b.series && b.series.length,
                        numPoints: a.points && a.points.length,
                        series: a
                    }, h = b.types && 1 < b.types.length ? "Combination" : "";
                return (b.langFormat("accessibility.series.summary." + a.type + h, c) || b.langFormat("accessibility.series.summary.default" +
                    h, c)) + (d ? " " + d : "") + (b.yAxis && 1 < b.yAxis.length && this.yAxis ? " " + f : "") + (b.xAxis && 1 < b.xAxis.length && this.xAxis ? " " + e : "")
            }, defaultPointDescriptionFormatter: function (a) {
                var b = a.series, d = b.chart, h = d.options.accessibility, f = a.series.tooltipOptions || {},
                    k = h.pointValuePrefix || f.valuePrefix || "", g = h.pointValueSuffix || f.valueSuffix || "",
                    l = a.options && a.options.accessibility && a.options.accessibility.description,
                    m = a.getA11yTimeDescription(), r = function (a) {
                        if (c.isNumber(a)) {
                            var b = c.defaultOptions.lang;
                            return c.numberFormat(a,
                                h.pointValueDecimals || f.valueDecimals || -1, b.decimalPoint, b.accessibility.thousandsSep || b.thousandsSep)
                        }
                        return a
                    }, z = e(b.xAxis && b.xAxis.options.accessibility && b.xAxis.options.accessibility.enabled, !d.angular),
                    t = b.xAxis && b.xAxis.categories && void 0 !== a.category && "" + a.category,
                    m = a.name || m || t && t.replace("\x3cbr/\x3e", " ") || (a.id && 0 > a.id.indexOf("highcharts-") ? a.id : "x, " + a.x),
                    t = a.series.pointArrayMap ? a.series.pointArrayMap.reduce(function (b, d) {
                        return b + (b.length ? ", " : "") + d + ": " + k + r(e(a[d], a.options[d])) +
                            g
                    }, "") : void 0 !== a.value ? k + r(a.value) + g : k + r(a.y) + g;
                return (void 0 !== a.index ? a.index + 1 + ". " : "") + (z ? m + ", " : "") + t + "." + (l ? " " + l : "") + (1 < d.series.length && b.name ? " " + b.name : "")
            }
        });
        return h
    });
    m(g, "modules/accessibility/components/ZoomComponent.js", [g["parts/Globals.js"], g["modules/accessibility/AccessibilityComponent.js"], g["modules/accessibility/KeyboardNavigationHandler.js"]], function (c, g, l) {
        c.Axis.prototype.panStep = function (b, a) {
            var d = a || 3;
            a = this.getExtremes();
            var e = (a.max - a.min) / d * b, d = a.max + e, e = a.min + e,
                h = d - e;
            0 > b && e < a.dataMin ? (e = a.dataMin, d = e + h) : 0 < b && d > a.dataMax && (d = a.dataMax, e = d - h);
            this.setExtremes(e, d)
        };
        var k = function (b) {
            this.initBase(b);
            this.init()
        };
        k.prototype = new g;
        c.extend(k.prototype, {
            init: function () {
                var b = this, a = this.chart;
                ["afterShowResetZoom", "afterDrilldown", "drillupall"].forEach(function (d) {
                    b.addEvent(a, d, function () {
                        b.updateProxyOverlays()
                    })
                })
            }, onChartUpdate: function () {
                var b = this.chart, a = this;
                b.mapNavButtons && b.mapNavButtons.forEach(function (d, e) {
                    a.unhideElementFromScreenReaders(d.element);
                    d.element.setAttribute("tabindex", -1);
                    d.element.setAttribute("role", "button");
                    d.element.setAttribute("aria-label", b.langFormat("accessibility.mapZoom" + (e ? "Out" : "In"), {chart: b}))
                })
            }, onChartRender: function () {
                this.updateProxyOverlays()
            }, updateProxyOverlays: function () {
                var b = this, a = this.chart, d = function (a, d, c, k) {
                    b.removeElement(b[c]);
                    b[c] = b.addProxyGroup();
                    b[d] = b.createProxyButton(a, b[c], {"aria-label": k, tabindex: -1})
                };
                b.removeElement(b.drillUpProxyGroup);
                b.removeElement(b.resetZoomProxyGroup);
                a.resetZoomButton &&
                d(a.resetZoomButton, "resetZoomProxyButton", "resetZoomProxyGroup", a.langFormat("accessibility.resetZoomButton", {chart: a}));
                a.drillUpButton && d(a.drillUpButton, "drillUpProxyButton", "drillUpProxyGroup", a.langFormat("accessibility.drillUpButton", {
                    chart: a,
                    buttonText: a.getDrilldownBackText()
                }))
            }, getMapZoomNavigation: function () {
                var b = this.keyCodes, a = this.chart, d = this;
                return new l(a, {
                    keyCodeMap: [[[b.up, b.down, b.left, b.right], function (d) {
                        a[d === b.up || d === b.down ? "yAxis" : "xAxis"][0].panStep(d === b.left || d === b.up ?
                            -1 : 1);
                        return this.response.success
                    }], [[b.tab], function (b, c) {
                        a.mapNavButtons[d.focusedMapNavButtonIx].setState(0);
                        if (c.shiftKey && !d.focusedMapNavButtonIx || !c.shiftKey && d.focusedMapNavButtonIx) return a.mapZoom(), this.response[c.shiftKey ? "prev" : "next"];
                        d.focusedMapNavButtonIx += c.shiftKey ? -1 : 1;
                        b = a.mapNavButtons[d.focusedMapNavButtonIx];
                        a.setFocusToElement(b.box, b.element);
                        b.setState(2);
                        return this.response.success
                    }], [[b.space, b.enter], function () {
                        d.fakeClickEvent(a.mapNavButtons[d.focusedMapNavButtonIx].element);
                        return this.response.success
                    }]], validate: function () {
                        return a.mapZoom && a.mapNavButtons && 2 === a.mapNavButtons.length
                    }, init: function (b) {
                        var e = a.mapNavButtons[0], c = a.mapNavButtons[1], e = 0 < b ? e : c;
                        a.setFocusToElement(e.box, e.element);
                        e.setState(2);
                        d.focusedMapNavButtonIx = 0 < b ? 0 : 1
                    }
                })
            }, simpleButtonNavigation: function (b, a, d) {
                var e = this.keyCodes, c = this, f = this.chart;
                return new l(f, {
                    keyCodeMap: [[[e.tab, e.up, e.down, e.left, e.right], function (a, b) {
                        return this.response[a === this.tab && b.shiftKey || a === e.left || a === e.up ? "prev" :
                            "next"]
                    }], [[e.space, e.enter], function () {
                        d(f);
                        return this.response.success
                    }]], validate: function () {
                        return f[b] && f[b].box && c[a]
                    }, init: function () {
                        f.setFocusToElement(f[b].box, c[a])
                    }
                })
            }, getKeyboardNavigation: function () {
                return [this.simpleButtonNavigation("resetZoomButton", "resetZoomProxyButton", function (b) {
                    b.zoomOut()
                }), this.simpleButtonNavigation("drillUpButton", "drillUpProxyButton", function (b) {
                    b.drillUp()
                }), this.getMapZoomNavigation()]
            }
        });
        return k
    });
    m(g, "modules/accessibility/components/RangeSelectorComponent.js",
        [g["parts/Globals.js"], g["modules/accessibility/AccessibilityComponent.js"], g["modules/accessibility/KeyboardNavigationHandler.js"]], function (c, g, l) {
            c.Chart.prototype.highlightRangeSelectorButton = function (b) {
                var a = this.rangeSelector.buttons;
                a[this.highlightedRangeSelectorItemIx] && a[this.highlightedRangeSelectorItemIx].setState(this.oldRangeSelectorItemState || 0);
                this.highlightedRangeSelectorItemIx = b;
                return a[b] ? (this.setFocusToElement(a[b].box, a[b].element), this.oldRangeSelectorItemState = a[b].state,
                    a[b].setState(2), !0) : !1
            };
            var k = function (b) {
                this.initBase(b)
            };
            k.prototype = new g;
            c.extend(k.prototype, {
                onChartUpdate: function () {
                    var b = this.chart, a = this, d = b.rangeSelector;
                    d && (d.buttons && d.buttons.length && d.buttons.forEach(function (d) {
                        a.unhideElementFromScreenReaders(d.element);
                        d.element.setAttribute("tabindex", "-1");
                        d.element.setAttribute("role", "button");
                        d.element.setAttribute("aria-label", b.langFormat("accessibility.rangeSelectorButton", {
                            chart: b,
                            buttonText: d.text && d.text.textStr
                        }))
                    }), d.maxInput && d.minInput &&
                    ["minInput", "maxInput"].forEach(function (e, c) {
                        d[e] && (a.unhideElementFromScreenReaders(d[e]), d[e].setAttribute("tabindex", "-1"), d[e].setAttribute("role", "textbox"), d[e].setAttribute("aria-label", b.langFormat("accessibility.rangeSelector" + (c ? "MaxInput" : "MinInput"), {chart: b})))
                    }))
                }, getRangeSelectorButtonNavigation: function () {
                    var b = this.chart, a = this.keyCodes, d = b.options.accessibility, e = this;
                    return new l(b, {
                        keyCodeMap: [[[a.left, a.right, a.up, a.down], function (e) {
                            e = e === a.left || e === a.up ? -1 : 1;
                            if (!b.highlightRangeSelectorButton(b.highlightedRangeSelectorItemIx +
                                e)) return d.keyboardNavigation.wrapAround ? (this.init(e), this.response.success) : this.response[0 < e ? "next" : "prev"]
                        }], [[a.enter, a.space], function () {
                            3 !== b.oldRangeSelectorItemState && e.fakeClickEvent(b.rangeSelector.buttons[b.highlightedRangeSelectorItemIx].element)
                        }]], validate: function () {
                            return b.rangeSelector && b.rangeSelector.buttons && b.rangeSelector.buttons.length
                        }, init: function (a) {
                            b.highlightRangeSelectorButton(0 < a ? 0 : b.rangeSelector.buttons.length - 1)
                        }
                    })
                }, getRangeSelectorInputNavigation: function () {
                    var b =
                        this.chart, a = this.keyCodes;
                    return new l(b, {
                        keyCodeMap: [[[a.tab, a.up, a.down], function (d, e) {
                            d = d === a.tab && e.shiftKey || d === a.up ? -1 : 1;
                            e = b.highlightedInputRangeIx += d;
                            if (1 < e || 0 > e) return this.response[0 < d ? "next" : "prev"];
                            b.rangeSelector[e ? "maxInput" : "minInput"].focus();
                            return this.response.success
                        }]], validate: function () {
                            return b.rangeSelector && b.rangeSelector.inputGroup && "hidden" !== b.rangeSelector.inputGroup.element.getAttribute("visibility") && !1 !== b.options.rangeSelector.inputEnabled && b.rangeSelector.minInput &&
                                b.rangeSelector.maxInput
                        }, init: function (a) {
                            b.highlightedInputRangeIx = 0 < a ? 0 : 1;
                            b.rangeSelector[b.highlightedInputRangeIx ? "maxInput" : "minInput"].focus()
                        }, terminate: function () {
                            var a = b.rangeSelector;
                            a && a.maxInput && a.minInput && (a.hideInput("max"), a.hideInput("min"))
                        }
                    })
                }, getKeyboardNavigation: function () {
                    return [this.getRangeSelectorButtonNavigation(), this.getRangeSelectorInputNavigation()]
                }
            });
            return k
        });
    m(g, "modules/accessibility/components/InfoRegionComponent.js", [g["parts/Globals.js"], g["modules/accessibility/AccessibilityComponent.js"]],
        function (c, g) {
            var l = c.merge, k = c.pick;
            c.Chart.prototype.getTypeDescription = function (a) {
                a = a[0];
                var b = this.series && this.series[0] || {}, e = b.mapTitle, b = {
                    numSeries: this.series.length,
                    numPoints: b.points && b.points.length,
                    chart: this,
                    mapTitle: e
                };
                if (!a) return this.langFormat("accessibility.chartTypes.emptyChart", b);
                if ("map" === a) return e ? this.langFormat("accessibility.chartTypes.mapTypeDescription", b) : this.langFormat("accessibility.chartTypes.unknownMap", b);
                if (1 < this.types.length) return this.langFormat("accessibility.chartTypes.combinationChart",
                    b);
                var e = this.langFormat("accessibility.seriesTypeDescriptions." + a, {chart: this}),
                    c = this.series && 1 === this.series.length ? "Single" : "Multiple";
                return (this.langFormat("accessibility.chartTypes." + a + c, b) || this.langFormat("accessibility.chartTypes.default" + c, b)) + (e ? " " + e : "")
            };
            var b = function (a) {
                this.initBase(a);
                this.init()
            };
            b.prototype = new g;
            c.extend(b.prototype, {
                init: function () {
                    var a = this.chart, b = this;
                    this.addEvent(a, "afterGetTable", function (d) {
                        a.options.accessibility.enabled && (b.tableAnchor.setAttribute("aria-expanded",
                            !0), d.html = d.html.replace("\x3ctable ", '\x3ctable tabindex\x3d"0" summary\x3d"' + a.langFormat("accessibility.tableSummary", {chart: a}) + '"'))
                    });
                    this.addEvent(a, "afterViewData", function (a) {
                        setTimeout(function () {
                            var b = a && a.getElementsByTagName("table")[0];
                            b && b.focus && b.focus()
                        }, 300)
                    })
                }, onChartUpdate: function () {
                    var a = this.chart, b = a.options.accessibility, e = "highcharts-information-region-" + a.index,
                        c = this.screenReaderRegion = this.screenReaderRegion || this.createElement("div"),
                        f = this.tableHeading = this.tableHeading ||
                            this.createElement("h6"),
                        k = this.tableAnchor = this.tableAnchor || this.createElement("a"),
                        g = this.chartHeading = this.chartHeading || this.createElement("h6");
                    c.setAttribute("id", e);
                    "all" === b.landmarkVerbosity && c.setAttribute("role", "region");
                    c.setAttribute("aria-label", a.langFormat("accessibility.screenReaderRegionLabel", {chart: a}));
                    c.innerHTML = b.screenReaderSectionFormatter ? b.screenReaderSectionFormatter(a) : this.defaultScreenReaderSectionFormatter(a);
                    a.getCSV && a.options.accessibility.addTableShortcut && (b =
                        "highcharts-data-table-" + a.index, k.innerHTML = a.langFormat("accessibility.viewAsDataTable", {chart: a}), k.href = "#" + b, k.setAttribute("tabindex", "-1"), k.setAttribute("role", "button"), k.setAttribute("aria-expanded", !1), k.onclick = a.options.accessibility.onTableAnchorClick || function () {
                        a.viewData()
                    }, f.appendChild(k), c.appendChild(f));
                    g.innerHTML = a.langFormat("accessibility.chartHeading", {chart: a});
                    g.setAttribute("aria-hidden", !1);
                    a.renderTo.insertBefore(g, a.renderTo.firstChild);
                    a.renderTo.insertBefore(c, a.renderTo.firstChild);
                    this.unhideElementFromScreenReaders(c);
                    l(!0, g.style, this.hiddenStyle);
                    l(!0, c.style, this.hiddenStyle)
                }, defaultScreenReaderSectionFormatter: function () {
                    var a = this.chart, b = a.options, e = a.types, c = this.getAxesDescription();
                    return "\x3ch5\x3e" + (b.accessibility.typeDescription || a.getTypeDescription(e)) + "\x3c/h5\x3e" + (b.subtitle && b.subtitle.text ? "\x3cdiv\x3e" + this.htmlencode(b.subtitle.text) + "\x3c/div\x3e" : "") + (b.accessibility.description ? "\x3cdiv\x3e" + b.accessibility.description + "\x3c/div\x3e" : "") + (c.xAxis ?
                        "\x3cdiv\x3e" + c.xAxis + "\x3c/div\x3e" : "") + (c.yAxis ? "\x3cdiv\x3e" + c.yAxis + "\x3c/div\x3e" : "")
                }, getAxesDescription: function () {
                    var a = this.chart, b = this, e = a.xAxis,
                        c = 1 < e.length || e[0] && k(e[0].options.accessibility && e[0].options.accessibility.enabled, !a.angular && a.hasCartesianSeries && 0 > a.types.indexOf("map")),
                        f = a.yAxis,
                        g = 1 < f.length || f[0] && k(f[0].options.accessibility && f[0].options.accessibility.enabled, a.hasCartesianSeries && 0 > a.types.indexOf("map")),
                        l = {};
                    c && (l.xAxis = a.langFormat("accessibility.axis.xAxisDescription" +
                        (1 < e.length ? "Plural" : "Singular"), {
                        chart: a, names: a.xAxis.map(function (a) {
                            return a.getDescription()
                        }), ranges: a.xAxis.map(function (a) {
                            return b.getAxisRangeDescription(a)
                        }), numAxes: e.length
                    }));
                    g && (l.yAxis = a.langFormat("accessibility.axis.yAxisDescription" + (1 < f.length ? "Plural" : "Singular"), {
                        chart: a,
                        names: a.yAxis.map(function (a) {
                            return a.getDescription()
                        }),
                        ranges: a.yAxis.map(function (a) {
                            return b.getAxisRangeDescription(a)
                        }),
                        numAxes: f.length
                    }));
                    return l
                }, getAxisRangeDescription: function (a) {
                    var b = this.chart,
                        e = a.options || {};
                    if (e.accessibility && void 0 !== e.accessibility.rangeDescription) return e.accessibility.rangeDescription;
                    if (a.categories) return b.langFormat("accessibility.axis.rangeCategories", {
                        chart: b,
                        axis: a,
                        numCategories: a.dataMax - a.dataMin + 1
                    });
                    if (a.isDatetimeAxis && (0 === a.min || 0 === a.dataMin)) {
                        var c = {}, f = "Seconds";
                        c.Seconds = (a.max - a.min) / 1E3;
                        c.Minutes = c.Seconds / 60;
                        c.Hours = c.Minutes / 60;
                        c.Days = c.Hours / 24;
                        ["Minutes", "Hours", "Days"].forEach(function (a) {
                            2 < c[a] && (f = a)
                        });
                        c.value = c[f].toFixed("Seconds" !==
                        f && "Minutes" !== f ? 1 : 0);
                        return b.langFormat("accessibility.axis.timeRange" + f, {
                            chart: b,
                            axis: a,
                            range: c.value.replace(".0", "")
                        })
                    }
                    e = b.options.accessibility;
                    return b.langFormat("accessibility.axis.rangeFromTo", {
                        chart: b,
                        axis: a,
                        rangeFrom: a.isDatetimeAxis ? b.time.dateFormat(e.axisRangeDateFormat, a.min) : a.min,
                        rangeTo: a.isDatetimeAxis ? b.time.dateFormat(e.axisRangeDateFormat, a.max) : a.max
                    })
                }
            });
            return b
        });
    m(g, "modules/accessibility/components/ContainerComponent.js", [g["parts/Globals.js"], g["modules/accessibility/AccessibilityComponent.js"]],
        function (c, g) {
            var l = c.win.document, k = function (b) {
                this.initBase(b)
            };
            k.prototype = new g;
            c.extend(k.prototype, {
                onChartUpdate: function () {
                    var b = this.chart, a = b.options.accessibility, d, c = "highcharts-title-" + b.index,
                        k = b.options.title.text || b.langFormat("accessibility.defaultChartTitle", {chart: b}),
                        f = this.stripTags(b.langFormat("accessibility.svgContainerTitle", {chartTitle: k})),
                        g = this.stripTags(b.langFormat("accessibility.svgContainerLabel", {chartTitle: k}));
                    f.length && (d = this.svgTitleElement = this.svgTitleElement ||
                        l.createElementNS("http://www.w3.org/2000/svg", "title"), d.textContent = f, d.id = c, b.renderTo.insertBefore(d, b.renderTo.firstChild));
                    b.renderer.box && g.length && b.renderer.box.setAttribute("aria-label", g);
                    "disabled" !== a.landmarkVerbosity ? b.renderTo.setAttribute("role", "region") : b.renderTo.removeAttribute("role");
                    b.renderTo.setAttribute("aria-label", b.langFormat("accessibility.chartContainerLabel", {
                        title: this.stripTags(k),
                        chart: b
                    }))
                }, destroy: function () {
                    this.chart.renderTo.setAttribute("aria-hidden", !0);
                    this.destroyBase()
                }
            });
            return k
        });
    m(g, "modules/accessibility/options.js", [], function () {
        return {
            accessibility: {
                enabled: !0,
                pointDescriptionThreshold: 200,
                addTableShortcut: !0,
                axisRangeDateFormat: "%Y-%m-%d %H:%M:%S",
                describeSingleSeries: !1,
                landmarkVerbosity: "all",
                keyboardNavigation: {
                    enabled: !0,
                    skipNullPoints: !0,
                    focusBorder: {
                        enabled: !0,
                        hideBrowserFocusOutline: !0,
                        style: {color: "#335cad", lineWidth: 2, borderRadius: 3},
                        margin: 2
                    },
                    order: ["series", "zoom", "rangeSelector", "chartMenu", "legend"],
                    wrapAround: !0
                },
                announceNewData: {
                    enabled: !1,
                    minAnnounceInterval: 5E3, interruptUser: !1
                }
            },
            legend: {accessibility: {enabled: !0, keyboardNavigation: {enabled: !0}}},
            exporting: {accessibility: {enabled: !0}}
        }
    });
    m(g, "modules/accessibility/a11y-i18n.js", [g["parts/Globals.js"]], function (c) {
        function g(c, b) {
            var a = c.indexOf("#each("), d = c.indexOf("#plural("), e = c.indexOf("["), g = c.indexOf("]");
            if (-1 < a) {
                var e = c.slice(a).indexOf(")") + a, f = c.substring(0, a), d = c.substring(e + 1),
                    e = c.substring(a + 6, e).split(","), a = Number(e[1]);
                c = "";
                if (b = b[e[0]]) for (a = isNaN(a) ? b.length : a, a =
                    0 > a ? b.length + a : Math.min(a, b.length), e = 0; e < a; ++e) c += f + b[e] + d;
                return c.length ? c : ""
            }
            if (-1 < d) {
                f = c.slice(d).indexOf(")") + d;
                c = c.substring(d + 8, f).split(",");
                switch (Number(b[c[0]])) {
                    case 0:
                        c = l(c[4], c[1]);
                        break;
                    case 1:
                        c = l(c[2], c[1]);
                        break;
                    case 2:
                        c = l(c[3], c[1]);
                        break;
                    default:
                        c = c[1]
                }
                c ? (b = c, b = b.trim && b.trim() || b.replace(/^\s+|\s+$/g, "")) : b = "";
                return b
            }
            return -1 < e ? (d = c.substring(0, e), c = Number(c.substring(e + 1, g)), b = b[d], !isNaN(c) && b && (0 > c ? (f = b[b.length + c], void 0 === f && (f = b[0])) : (f = b[c], void 0 === f && (f = b[b.length -
            1]))), void 0 !== f ? f : "") : "{" + c + "}"
        }

        var l = c.pick;
        c.i18nFormat = function (k, b, a) {
            var d = function (a, b) {
                a = a.slice(b || 0);
                var c = a.indexOf("{"), d = a.indexOf("}");
                if (-1 < c && d > c) return {statement: a.substring(c + 1, d), begin: b + c + 1, end: b + d}
            }, e = [], h, f;
            f = 0;
            do h = d(k, f), f = k.substring(f, h && h.begin - 1), f.length && e.push({
                value: f,
                type: "constant"
            }), h && e.push({value: h.statement, type: "statement"}), f = h && h.end + 1; while (h);
            e.forEach(function (a) {
                "statement" === a.type && (a.value = g(a.value, b))
            });
            return c.format(e.reduce(function (a, b) {
                return a +
                    b.value
            }, ""), b, a)
        };
        c.Chart.prototype.langFormat = function (g, b, a) {
            g = g.split(".");
            for (var d = this.options.lang, e = 0; e < g.length; ++e) d = d && d[g[e]];
            return "string" === typeof d && c.i18nFormat(d, b, a)
        };
        c.setOptions({
            lang: {
                accessibility: {
                    screenReaderRegionLabel: "Chart screen reader information.",
                    defaultChartTitle: "Chart",
                    viewAsDataTable: "View as data table.",
                    chartHeading: "Chart graphic.",
                    chartContainerLabel: "{title}. Interactive chart.",
                    svgContainerLabel: "Interactive chart",
                    rangeSelectorMinInput: "Select start date.",
                    rangeSelectorMaxInput: "Select end date.",
                    tableSummary: "Table representation of chart.",
                    mapZoomIn: "Zoom chart",
                    mapZoomOut: "Zoom out chart",
                    resetZoomButton: "Reset zoom",
                    drillUpButton: "{buttonText}",
                    rangeSelectorButton: "Select range {buttonText}",
                    legendLabel: "Toggle series visibility",
                    legendItem: "Toggle visibility of {itemName}",
                    thousandsSep: ",",
                    svgContainerTitle: "",
                    svgContainerEnd: "End of interactive chart",
                    announceNewData: {
                        newDataAnnounce: "Updated data for chart {chartTitle}",
                        newSeriesAnnounceSingle: "New data series: {seriesDesc}",
                        newPointAnnounceSingle: "New data point: {pointDesc}",
                        newSeriesAnnounceMultiple: "New data series in chart {chartTitle}: {seriesDesc}",
                        newPointAnnounceMultiple: "New data point in chart {chartTitle}: {pointDesc}"
                    },
                    seriesTypeDescriptions: {
                        boxplot: "Box plot charts are typically used to display groups of statistical data. Each data point in the chart can have up to 5 values: minimum, lower quartile, median, upper quartile, and maximum.",
                        arearange: "Arearange charts are line charts displaying a range between a lower and higher value for each point.",
                        areasplinerange: "These charts are line charts displaying a range between a lower and higher value for each point.",
                        bubble: "Bubble charts are scatter charts where each data point also has a size value.",
                        columnrange: "Columnrange charts are column charts displaying a range between a lower and higher value for each point.",
                        errorbar: "Errorbar series are used to display the variability of the data.",
                        funnel: "Funnel charts are used to display reduction of data in stages.",
                        pyramid: "Pyramid charts consist of a single pyramid with item heights corresponding to each point value.",
                        waterfall: "A waterfall chart is a column chart where each column contributes towards a total end value."
                    },
                    chartTypes: {
                        emptyChart: "Empty chart",
                        mapTypeDescription: "Map of {mapTitle} with {numSeries} data series.",
                        unknownMap: "Map of unspecified region with {numSeries} data series.",
                        combinationChart: "Combination chart with {numSeries} data series.",
                        defaultSingle: "Chart with {numPoints} data {#plural(numPoints, points, point)}.",
                        defaultMultiple: "Chart with {numSeries} data series.",
                        splineSingle: "Line chart with {numPoints} data {#plural(numPoints, points, point)}.",
                        splineMultiple: "Line chart with {numSeries} lines.",
                        lineSingle: "Line chart with {numPoints} data {#plural(numPoints, points, point)}.",
                        lineMultiple: "Line chart with {numSeries} lines.",
                        columnSingle: "Bar chart with {numPoints} {#plural(numPoints, bars, bar)}.",
                        columnMultiple: "Bar chart with {numSeries} data series.",
                        barSingle: "Bar chart with {numPoints} {#plural(numPoints, bars, bar)}.",
                        barMultiple: "Bar chart with {numSeries} data series.",
                        pieSingle: "Pie chart with {numPoints} {#plural(numPoints, slices, slice)}.",
                        pieMultiple: "Pie chart with {numSeries} pies.",
                        scatterSingle: "Scatter chart with {numPoints} {#plural(numPoints, points, point)}.",
                        scatterMultiple: "Scatter chart with {numSeries} data series.",
                        boxplotSingle: "Boxplot with {numPoints} {#plural(numPoints, boxes, box)}.",
                        boxplotMultiple: "Boxplot with {numSeries} data series.",
                        bubbleSingle: "Bubble chart with {numPoints} {#plural(numPoints, bubbles, bubble)}.",
                        bubbleMultiple: "Bubble chart with {numSeries} data series."
                    },
                    axis: {
                        xAxisDescriptionSingular: "The chart has 1 X axis displaying {names[0]}. {ranges[0]}",
                        xAxisDescriptionPlural: "The chart has {numAxes} X axes displaying {#each(names, -1) }and {names[-1]}.",
                        yAxisDescriptionSingular: "The chart has 1 Y axis displaying {names[0]}. {ranges[0]}",
                        yAxisDescriptionPlural: "The chart has {numAxes} Y axes displaying {#each(names, -1) }and {names[-1]}.",
                        timeRangeDays: "Range: {range} days.",
                        timeRangeHours: "Range: {range} hours.",
                        timeRangeMinutes: "Range: {range} minutes.",
                        timeRangeSeconds: "Range: {range} seconds.",
                        rangeFromTo: "Range: {rangeFrom} to {rangeTo}.",
                        rangeCategories: "Range: {numCategories} categories."
                    },
                    exporting: {
                        chartMenuLabel: "Chart export",
                        menuButtonLabel: "View export menu",
                        exportRegionLabel: "Chart export menu"
                    },
                    series: {
                        summary: {
                            "default": "{name}, series {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.",
                            defaultCombination: "{name}, series {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.",
                            line: "{name}, line {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.",
                            lineCombination: "{name}, series {ix} of {numSeries}. Line with {numPoints} data {#plural(numPoints, points, point)}.",
                            spline: "{name}, line {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.",
                            splineCombination: "{name}, series {ix} of {numSeries}. Line with {numPoints} data {#plural(numPoints, points, point)}.",
                            column: "{name}, bar series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bars, bar)}.",
                            columnCombination: "{name}, series {ix} of {numSeries}. Bar series with {numPoints} {#plural(numPoints, bars, bar)}.",
                            bar: "{name}, bar series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bars, bar)}.",
                            barCombination: "{name}, series {ix} of {numSeries}. Bar series with {numPoints} {#plural(numPoints, bars, bar)}.",
                            pie: "{name}, pie {ix} of {numSeries} with {numPoints} {#plural(numPoints, slices, slice)}.",
                            pieCombination: "{name}, series {ix} of {numSeries}. Pie with {numPoints} {#plural(numPoints, slices, slice)}.",
                            scatter: "{name}, scatter plot {ix} of {numSeries} with {numPoints} {#plural(numPoints, points, point)}.",
                            scatterCombination: "{name}, series {ix} of {numSeries}, scatter plot with {numPoints} {#plural(numPoints, points, point)}.",
                            boxplot: "{name}, boxplot {ix} of {numSeries} with {numPoints} {#plural(numPoints, boxes, box)}.",
                            boxplotCombination: "{name}, series {ix} of {numSeries}. Boxplot with {numPoints} {#plural(numPoints, boxes, box)}.",
                            bubble: "{name}, bubble series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bubbles, bubble)}.",
                            bubbleCombination: "{name}, series {ix} of {numSeries}. Bubble series with {numPoints} {#plural(numPoints, bubbles, bubble)}.",
                            map: "{name}, map {ix} of {numSeries} with {numPoints} {#plural(numPoints, areas, area)}.",
                            mapCombination: "{name}, series {ix} of {numSeries}. Map with {numPoints} {#plural(numPoints, areas, area)}.",
                            mapline: "{name}, line {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.",
                            maplineCombination: "{name}, series {ix} of {numSeries}. Line with {numPoints} data {#plural(numPoints, points, point)}.",
                            mapbubble: "{name}, bubble series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bubbles, bubble)}.",
                            mapbubbleCombination: "{name}, series {ix} of {numSeries}. Bubble series with {numPoints} {#plural(numPoints, bubbles, bubble)}."
                        },
                        description: "{description}",
                        xAxisDescription: "X axis, {name}",
                        yAxisDescription: "Y axis, {name}"
                    }
                }
            }
        })
    });
    m(g, "modules/accessibility/accessibility.js", [g["parts/Globals.js"], g["modules/accessibility/KeyboardNavigationHandler.js"], g["modules/accessibility/AccessibilityComponent.js"], g["modules/accessibility/KeyboardNavigation.js"], g["modules/accessibility/components/LegendComponent.js"], g["modules/accessibility/components/MenuComponent.js"], g["modules/accessibility/components/SeriesComponent.js"], g["modules/accessibility/components/ZoomComponent.js"],
        g["modules/accessibility/components/RangeSelectorComponent.js"], g["modules/accessibility/components/InfoRegionComponent.js"], g["modules/accessibility/components/ContainerComponent.js"], g["modules/accessibility/options.js"]], function (c, g, l, k, b, a, d, e, h, f, n, m) {
        function p(a) {
            this.init(a)
        }

        var q = c.addEvent, r = c.win.document, u = c.pick, v = c.merge, x = c.extend, y = c.error;
        v(!0, c.defaultOptions, m);
        c.KeyboardNavigationHandler = g;
        c.AccessibilityComponent = l;
        c.extend(c.SVGElement.prototype, {
            addFocusBorder: function (a, b) {
                this.focusBorder &&
                this.removeFocusBorder();
                var c = this.getBBox();
                a = u(a, 3);
                c.x += this.translateX ? this.translateX : 0;
                c.y += this.translateY ? this.translateY : 0;
                this.focusBorder = this.renderer.rect(c.x - a, c.y - a, c.width + 2 * a, c.height + 2 * a, b && b.borderRadius).addClass("highcharts-focus-border").attr({zIndex: 99}).add(this.parentGroup);
                this.renderer.styledMode || this.focusBorder.attr({
                    stroke: b && b.stroke,
                    "stroke-width": b && b.strokeWidth
                })
            }, removeFocusBorder: function () {
                this.focusBorder && (this.focusBorder.destroy(), delete this.focusBorder)
            }
        });
        c.Chart.prototype.setFocusToElement = function (a, b) {
            var c = this.options.accessibility.keyboardNavigation.focusBorder;
            (b = b || a.element) && b.focus && (b.hcEvents && b.hcEvents.focusin || q(b, "focusin", function () {
            }), b.focus(), c.hideBrowserFocusOutline && (b.style.outline = "none"));
            c.enabled && (this.focusElement && this.focusElement.removeFocusBorder(), a.addFocusBorder(c.margin, {
                stroke: c.style.color,
                strokeWidth: c.style.lineWidth,
                borderRadius: c.style.borderRadius
            }), this.focusElement = a)
        };
        c.Axis.prototype.getDescription =
            function () {
                return this.userOptions && this.userOptions.accessibility && this.userOptions.accessibility.description || this.axisTitle && this.axisTitle.textStr || this.options.id || this.categories && "categories" || this.isDatetimeAxis && "Time" || "values"
            };
        p.prototype = {
            init: function (c) {
                var g = c.options.accessibility;
                this.chart = c;
                if (r.addEventListener && c.renderer.isSVG) {
                    this.copyDeprecatedOptions();
                    var l = this.components = {
                        container: new n(c),
                        infoRegion: new f(c),
                        legend: new b(c),
                        chartMenu: new a(c),
                        rangeSelector: new h(c),
                        series: new d(c),
                        zoom: new e(c)
                    };
                    g.customComponents && x(this.components, g.customComponents);
                    this.keyboardNavigation = new k(c, l);
                    this.update()
                } else c.renderTo.setAttribute("aria-hidden", !0)
            }, update: function () {
                var a = this.components, b = this.chart.options.accessibility;
                this.chart.types = this.getChartTypes();
                Object.keys(a).forEach(function (b) {
                    a[b].onChartUpdate()
                });
                this.keyboardNavigation.update(b.keyboardNavigation.order)
            }, destroy: function () {
                var a = this.chart || {}, b = this.components;
                Object.keys(b).forEach(function (a) {
                    b[a].destroy()
                });
                this.keyboardNavigation.destroy();
                a.renderTo && a.renderTo.setAttribute("aria-hidden", !0);
                a.focusElement && a.focusElement.removeFocusBorder()
            }, getChartTypes: function () {
                var a = {};
                this.chart.series.forEach(function (b) {
                    a[b.type] = 1
                });
                return Object.keys(a)
            }, copyDeprecatedOptions: function () {
                var a = this.chart, b = function (b, c) {
                    y("Highcharts: Deprecated option " + b + " used. Use " + c + " instead.", !1, a)
                }, c = {
                    description: ["accessibility", "description"],
                    exposeElementToA11y: ["accessibility", "exposeAsGroupOnly"],
                    pointDescriptionFormatter: ["accessibility",
                        "pointDescriptionFormatter"],
                    skipKeyboardNavigation: ["accessibility", "keyboardNavigation", "enabled"]
                }, d = a.options.chart || {}, e = a.options.accessibility || {};
                ["description", "typeDescription"].forEach(function (a) {
                    d[a] && (e[a] = d[a], b("chart." + a, "accessibility." + a))
                });
                a.axes.forEach(function (a) {
                    (a = a.options) && a.description && (a.accessibility = a.accessibility || {}, a.accessibility.description = a.description, b("axis.description", "axis.accessibility.description"))
                });
                a.series && a.series.forEach(function (a) {
                    Object.keys(c).forEach(function (d) {
                        var e =
                            a.options[d];
                        if (void 0 !== e) {
                            for (var e = "skipKeyboardNavigation" === d ? !e : e, f = c[d], g = a.options, h, k = 0; k < f.length - 1; ++k) h = f[k], g = g[h] = u(g[h], {});
                            g[f[f.length - 1]] = e;
                            b("series." + d, "series." + c[d].join("."))
                        }
                    });
                    a.points && a.points.forEach(function (a) {
                        a.options && a.options.description && (a.options.accessibility = a.options.accessibility || {}, a.options.accessibility.description = a.options.description, b("point.description", "point.accessibility.description"))
                    })
                })
            }
        };
        q(c.Chart, "render", function (a) {
            var b = this.accessibility;
            if (this.a11yDirty && this.renderTo) {
                delete this.a11yDirty;
                var c = this.options.accessibility;
                c && c.enabled ? b ? b.update() : this.accessibility = b = new p(this) : b ? (b.destroy && b.destroy(), delete this.accessibility) : this.renderTo.setAttribute("aria-hidden", !0)
            }
            b && Object.keys(b.components).forEach(function (c) {
                b.components[c].onChartRender(a)
            })
        });
        q(c.Chart, "update", function (a) {
            if (a = a.options.accessibility) a.customComponents && (this.options.accessibility.customComponents = a.customComponents, delete a.customComponents),
                v(!0, this.options.accessibility, a), this.accessibility && this.accessibility.destroy && (this.accessibility.destroy(), delete this.accessibility);
            this.a11yDirty = !0
        });
        q(c.Point, "update", function () {
            this.series.chart.accessibility && (this.series.chart.a11yDirty = !0)
        });
        ["addSeries", "init"].forEach(function (a) {
            q(c.Chart, a, function () {
                this.a11yDirty = !0
            })
        });
        ["update", "updatedData", "remove"].forEach(function (a) {
            q(c.Series, a, function () {
                this.chart.accessibility && (this.chart.a11yDirty = !0)
            })
        });
        ["afterDrilldown", "drillupall"].forEach(function (a) {
            q(c.Chart,
                a, function () {
                    this.accessibility && this.accessibility.update()
                })
        });
        q(c.Chart, "destroy", function () {
            this.accessibility && this.accessibility.destroy()
        })
    });
    m(g, "masters/modules/accessibility.src.js", [], function () {
    })
});
//# sourceMappingURL=accessibility.js.map
