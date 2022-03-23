/*
 Highcharts JS v7.1.2 (2019-06-03)

 Client side exporting module

 (c) 2015-2019 Torstein Honsi / Oystein Moseng

 License: www.highcharts.com/license
*/
(function (b) {
    "object" === typeof module && module.exports ? (b["default"] = b, module.exports = b) : "function" === typeof define && define.amd ? define("highcharts/modules/offline-exporting", ["highcharts", "highcharts/modules/exporting"], function (r) {
        b(r);
        b.Highcharts = r;
        return b
    }) : b("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (b) {
    function r(a, e, b, p) {
        a.hasOwnProperty(e) || (a[e] = p.apply(null, b))
    }

    b = b ? b._modules : {};
    r(b, "mixins/download-url.js", [b["parts/Globals.js"]], function (a) {
        var e = a.win, b = e.navigator,
            p = e.document, d = e.URL || e.webkitURL || e, t = /Edge\/\d+/.test(b.userAgent);
        a.dataURLtoBlob = function (a) {
            if ((a = a.match(/data:([^;]*)(;base64)?,([0-9A-Za-z+/]+)/)) && 3 < a.length && e.atob && e.ArrayBuffer && e.Uint8Array && e.Blob && d.createObjectURL) {
                for (var b = e.atob(a[3]), f = new e.ArrayBuffer(b.length), f = new e.Uint8Array(f), k = 0; k < f.length; ++k) f[k] = b.charCodeAt(k);
                a = new e.Blob([f], {type: a[1]});
                return d.createObjectURL(a)
            }
        };
        a.downloadURL = function (f, d) {
            var h = p.createElement("a"), k;
            if ("string" === typeof f || f instanceof String ||
                !b.msSaveOrOpenBlob) {
                if (t || 2E6 < f.length) if (f = a.dataURLtoBlob(f), !f) throw Error("Failed to convert to blob");
                if (void 0 !== h.download) h.href = f, h.download = d, p.body.appendChild(h), h.click(), p.body.removeChild(h); else try {
                    if (k = e.open(f, "chart"), void 0 === k || null === k) throw Error("Failed to open window");
                } catch (q) {
                    e.location.href = f
                }
            } else b.msSaveOrOpenBlob(f, d)
        }
    });
    r(b, "modules/offline-exporting.src.js", [b["parts/Globals.js"]], function (a) {
        function b(b, z) {
            var l = f.getElementsByTagName("head")[0], c = f.createElement("script");
            c.type = "text/javascript";
            c.src = b;
            c.onload = z;
            c.onerror = function () {
                a.error("Error loading script " + b)
            };
            l.appendChild(c)
        }

        var r = a.addEvent, p = a.merge, d = a.win, t = d.navigator, f = d.document, A = d.URL || d.webkitURL || d,
            h = /Edge\/|Trident\/|MSIE /.test(t.userAgent), k = h ? 150 : 0;
        a.CanVGRenderer = {};
        a.svgToDataUrl = function (a) {
            var b = -1 < t.userAgent.indexOf("WebKit") && 0 > t.userAgent.indexOf("Chrome");
            try {
                if (!b && 0 > t.userAgent.toLowerCase().indexOf("firefox")) return A.createObjectURL(new d.Blob([a], {type: "image/svg+xml;charset-utf-16"}))
            } catch (l) {
            }
            return "data:image/svg+xml;charset\x3dUTF-8," +
                encodeURIComponent(a)
        };
        a.imageToDataUrl = function (a, b, l, c, e, g, u, h, v) {
            var m = new d.Image, n, q = function () {
                setTimeout(function () {
                    var g = f.createElement("canvas"), d = g.getContext && g.getContext("2d"), x;
                    try {
                        if (d) {
                            g.height = m.height * c;
                            g.width = m.width * c;
                            d.drawImage(m, 0, 0, g.width, g.height);
                            try {
                                x = g.toDataURL(b), e(x, b, l, c)
                            } catch (B) {
                                n(a, b, l, c)
                            }
                        } else u(a, b, l, c)
                    } finally {
                        v && v(a, b, l, c)
                    }
                }, k)
            }, w = function () {
                h(a, b, l, c);
                v && v(a, b, l, c)
            };
            n = function () {
                m = new d.Image;
                n = g;
                m.crossOrigin = "Anonymous";
                m.onload = q;
                m.onerror = w;
                m.src = a
            };
            m.onload = q;
            m.onerror = w;
            m.src = a
        };
        a.downloadSVGLocal = function (e, h, l, c) {
            function w(a, b) {
                b = new d.jsPDF("l", "pt", [a.width.baseVal.value + 2 * b, a.height.baseVal.value + 2 * b]);
                [].forEach.call(a.querySelectorAll('*[visibility\x3d"hidden"]'), function (a) {
                    a.parentNode.removeChild(a)
                });
                d.svg2pdf(a, b, {removeInvalid: !0});
                return b.output("datauristring")
            }

            function g() {
                q.innerHTML = e;
                var b = q.getElementsByTagName("text"), g;
                [].forEach.call(b, function (a) {
                    ["font-family", "font-size"].forEach(function (b) {
                        for (var c = a; c && c !== q;) {
                            if (c.style[b]) {
                                a.style[b] =
                                    c.style[b];
                                break
                            }
                            c = c.parentNode
                        }
                    });
                    a.style["font-family"] = a.style["font-family"] && a.style["font-family"].split(" ").splice(-1);
                    g = a.getElementsByTagName("title");
                    [].forEach.call(g, function (b) {
                        a.removeChild(b)
                    })
                });
                b = w(q.firstChild, 0);
                try {
                    a.downloadURL(b, r), c && c()
                } catch (C) {
                    l(C)
                }
            }

            var u, k, v = !0, m, n = h.libURL || a.getOptions().exporting.libURL, q = f.createElement("div"),
                y = h.type || "image/png",
                r = (h.filename || "chart") + "." + ("image/svg+xml" === y ? "svg" : y.split("/")[1]), p = h.scale || 1,
                n = "/" !== n.slice(-1) ? n + "/" : n;
            if ("image/svg+xml" ===
                y) try {
                t.msSaveOrOpenBlob ? (k = new MSBlobBuilder, k.append(e), u = k.getBlob("image/svg+xml")) : u = a.svgToDataUrl(e), a.downloadURL(u, r), c && c()
            } catch (x) {
                l(x)
            } else "application/pdf" === y ? d.jsPDF && d.svg2pdf ? g() : (v = !0, b(n + "jspdf.js", function () {
                b(n + "svg2pdf.js", function () {
                    g()
                })
            })) : (u = a.svgToDataUrl(e), m = function () {
                try {
                    A.revokeObjectURL(u)
                } catch (x) {
                }
            }, a.imageToDataUrl(u, y, {}, p, function (b) {
                try {
                    a.downloadURL(b, r), c && c()
                } catch (B) {
                    l(B)
                }
            }, function () {
                var g = f.createElement("canvas"), h = g.getContext("2d"),
                    w = e.match(/^<svg[^>]*width\s*=\s*\"?(\d+)\"?[^>]*>/)[1] *
                        p, q = e.match(/^<svg[^>]*height\s*=\s*\"?(\d+)\"?[^>]*>/)[1] * p, k = function () {
                        h.drawSvg(e, 0, 0, w, q);
                        try {
                            a.downloadURL(t.msSaveOrOpenBlob ? g.msToBlob() : g.toDataURL(y), r), c && c()
                        } catch (D) {
                            l(D)
                        } finally {
                            m()
                        }
                    };
                g.width = w;
                g.height = q;
                d.canvg ? k() : (v = !0, b(n + "rgbcolor.js", function () {
                    b(n + "canvg.js", function () {
                        k()
                    })
                }))
            }, l, l, function () {
                v && m()
            }))
        };
        a.Chart.prototype.getSVGForLocalExport = function (b, e, l, c) {
            var d = this, g, f = 0, h, k, m, n, q, p, t = function () {
                f === g.length && c(d.sanitizeSVG(h.innerHTML, k))
            }, z = function (a, b, c) {
                ++f;
                c.imageElement.setAttributeNS("http://www.w3.org/1999/xlink",
                    "href", a);
                t()
            };
            d.unbindGetSVG = r(d, "getSVG", function (a) {
                k = a.chartCopy.options;
                h = a.chartCopy.container.cloneNode(!0)
            });
            d.getSVGForExport(b, e);
            g = h.getElementsByTagName("image");
            try {
                if (!g.length) {
                    c(d.sanitizeSVG(h.innerHTML, k));
                    return
                }
                n = 0;
                for (q = g.length; n < q; ++n) m = g[n], (p = m.getAttributeNS("http://www.w3.org/1999/xlink", "href")) ? a.imageToDataUrl(p, "image/png", {imageElement: m}, b.scale, z, l, l, l) : (++f, m.parentNode.removeChild(m), t())
            } catch (x) {
                l(x)
            }
            d.unbindGetSVG()
        };
        a.Chart.prototype.exportChartLocal = function (b,
                                                       e) {
            var d = this, c = a.merge(d.options.exporting, b), f = function (b) {
                !1 === c.fallbackToExportServer ? c.error ? c.error(c, b) : a.error(28, !0) : d.exportChart(c)
            };
            b = function () {
                return [].some.call(d.container.getElementsByTagName("image"), function (a) {
                    a = a.getAttribute("href");
                    return "" !== a && 0 !== a.indexOf("data:")
                })
            };
            h && d.styledMode && (a.SVGRenderer.prototype.inlineWhitelist = [/^blockSize/, /^border/, /^caretColor/, /^color/, /^columnRule/, /^columnRuleColor/, /^cssFloat/, /^cursor/, /^fill$/, /^fillOpacity/, /^font/, /^inlineSize/,
                /^length/, /^lineHeight/, /^opacity/, /^outline/, /^parentRule/, /^rx$/, /^ry$/, /^stroke/, /^textAlign/, /^textAnchor/, /^textDecoration/, /^transform/, /^vectorEffect/, /^visibility/, /^x$/, /^y$/]);
            h && ("application/pdf" === c.type || d.container.getElementsByTagName("image").length && "image/svg+xml" !== c.type) || "application/pdf" === c.type && b() ? f("Image type not supported for this chart/browser.") : d.getSVGForLocalExport(c, e, f, function (b) {
                -1 < b.indexOf("\x3cforeignObject") && "image/svg+xml" !== c.type ? f("Image type not supported for charts with embedded HTML") :
                    a.downloadSVGLocal(b, a.extend({filename: d.getFilename()}, c), f)
            })
        };
        p(!0, a.getOptions().exporting, {
            libURL: "https://highcharts.highcharts.com/7.1.2/lib/",
            menuItemDefinitions: {
                downloadPNG: {
                    textKey: "downloadPNG", onclick: function () {
                        this.exportChartLocal()
                    }
                }, downloadJPEG: {
                    textKey: "downloadJPEG", onclick: function () {
                        this.exportChartLocal({type: "image/jpeg"})
                    }
                }, downloadSVG: {
                    textKey: "downloadSVG", onclick: function () {
                        this.exportChartLocal({type: "image/svg+xml"})
                    }
                }, downloadPDF: {
                    textKey: "downloadPDF", onclick: function () {
                        this.exportChartLocal({type: "application/pdf"})
                    }
                }
            }
        })
    });
    r(b, "masters/modules/offline-exporting.src.js", [], function () {
    })
});
//# sourceMappingURL=offline-exporting.js.map