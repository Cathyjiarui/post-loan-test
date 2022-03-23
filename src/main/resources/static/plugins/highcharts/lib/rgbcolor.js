/*

 A class to parse color values
 @author Stoyan Stefanov <sstoo@gmail.com>
 @link   http://www.phpied.com/rgb-color-parser-in-javascript/
 @license Use it if you like it
*/
(function (f) {
    function g(b) {
        this.ok = !1;
        "#" == b.charAt(0) && (b = b.substr(1, 6));
        b = b.replace(/ /g, "");
        b = b.toLowerCase();
        var m = {
            aliceblue: "f0f8ff",
            antiquewhite: "faebd7",
            aqua: "00ffff",
            aquamarine: "7fffd4",
            azure: "f0ffff",
            beige: "f5f5dc",
            bisque: "ffe4c4",
            black: "000000",
            blanchedalmond: "ffebcd",
            blue: "0000ff",
            blueviolet: "8a2be2",
            brown: "a52a2a",
            burlywood: "deb887",
            cadetblue: "5f9ea0",
            chartreuse: "7fff00",
            chocolate: "d2691e",
            coral: "ff7f50",
            cornflowerblue: "6495ed",
            cornsilk: "fff8dc",
            crimson: "dc143c",
            cyan: "00ffff",
            darkblue: "00008b",
            darkcyan: "008b8b",
            darkgoldenrod: "b8860b",
            darkgray: "a9a9a9",
            darkgreen: "006400",
            darkkhaki: "bdb76b",
            darkmagenta: "8b008b",
            darkolivegreen: "556b2f",
            darkorange: "ff8c00",
            darkorchid: "9932cc",
            darkred: "8b0000",
            darksalmon: "e9967a",
            darkseagreen: "8fbc8f",
            darkslateblue: "483d8b",
            darkslategray: "2f4f4f",
            darkturquoise: "00ced1",
            darkviolet: "9400d3",
            deeppink: "ff1493",
            deepskyblue: "00bfff",
            dimgray: "696969",
            dodgerblue: "1e90ff",
            feldspar: "d19275",
            firebrick: "b22222",
            floralwhite: "fffaf0",
            forestgreen: "228b22",
            fuchsia: "ff00ff",
            gainsboro: "dcdcdc",
            ghostwhite: "f8f8ff",
            gold: "ffd700",
            goldenrod: "daa520",
            gray: "808080",
            green: "008000",
            greenyellow: "adff2f",
            honeydew: "f0fff0",
            hotpink: "ff69b4",
            indianred: "cd5c5c",
            indigo: "4b0082",
            ivory: "fffff0",
            khaki: "f0e68c",
            lavender: "e6e6fa",
            lavenderblush: "fff0f5",
            lawngreen: "7cfc00",
            lemonchiffon: "fffacd",
            lightblue: "add8e6",
            lightcoral: "f08080",
            lightcyan: "e0ffff",
            lightgoldenrodyellow: "fafad2",
            lightgrey: "d3d3d3",
            lightgreen: "90ee90",
            lightpink: "ffb6c1",
            lightsalmon: "ffa07a",
            lightseagreen: "20b2aa",
            lightskyblue: "87cefa",
            lightslateblue: "8470ff",
            lightslategray: "778899",
            lightsteelblue: "b0c4de",
            lightyellow: "ffffe0",
            lime: "00ff00",
            limegreen: "32cd32",
            linen: "faf0e6",
            magenta: "ff00ff",
            maroon: "800000",
            mediumaquamarine: "66cdaa",
            mediumblue: "0000cd",
            mediumorchid: "ba55d3",
            mediumpurple: "9370d8",
            mediumseagreen: "3cb371",
            mediumslateblue: "7b68ee",
            mediumspringgreen: "00fa9a",
            mediumturquoise: "48d1cc",
            mediumvioletred: "c71585",
            midnightblue: "191970",
            mintcream: "f5fffa",
            mistyrose: "ffe4e1",
            moccasin: "ffe4b5",
            navajowhite: "ffdead",
            navy: "000080",
            oldlace: "fdf5e6",
            olive: "808000",
            olivedrab: "6b8e23",
            orange: "ffa500",
            orangered: "ff4500",
            orchid: "da70d6",
            palegoldenrod: "eee8aa",
            palegreen: "98fb98",
            paleturquoise: "afeeee",
            palevioletred: "d87093",
            papayawhip: "ffefd5",
            peachpuff: "ffdab9",
            peru: "cd853f",
            pink: "ffc0cb",
            plum: "dda0dd",
            powderblue: "b0e0e6",
            purple: "800080",
            red: "ff0000",
            rosybrown: "bc8f8f",
            royalblue: "4169e1",
            saddlebrown: "8b4513",
            salmon: "fa8072",
            sandybrown: "f4a460",
            seagreen: "2e8b57",
            seashell: "fff5ee",
            sienna: "a0522d",
            silver: "c0c0c0",
            skyblue: "87ceeb",
            slateblue: "6a5acd",
            slategray: "708090",
            snow: "fffafa",
            springgreen: "00ff7f",
            steelblue: "4682b4",
            tan: "d2b48c",
            teal: "008080",
            thistle: "d8bfd8",
            tomato: "ff6347",
            turquoise: "40e0d0",
            violet: "ee82ee",
            violetred: "d02090",
            wheat: "f5deb3",
            white: "ffffff",
            whitesmoke: "f5f5f5",
            yellow: "ffff00",
            yellowgreen: "9acd32"
        }, e;
        for (e in m) b == e && (b = m[e]);
        var h = [{
            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            example: ["rgb(123, 234, 45)", "rgb(255,234,245)"],
            process: function (a) {
                return [parseInt(a[1]), parseInt(a[2]), parseInt(a[3])]
            }
        }, {
            re: /^(\w{2})(\w{2})(\w{2})$/,
            example: ["#00ff00", "336699"], process: function (a) {
                return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]
            }
        }, {
            re: /^(\w{1})(\w{1})(\w{1})$/, example: ["#fb0", "f0f"], process: function (a) {
                return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)]
            }
        }];
        for (e = 0; e < h.length; e++) {
            var f = h[e].process, k = h[e].re.exec(b);
            k && (channels = f(k), this.r = channels[0], this.g = channels[1], this.b = channels[2], this.ok = !0)
        }
        this.r = 0 > this.r || isNaN(this.r) ? 0 : 255 < this.r ? 255 : this.r;
        this.g = 0 > this.g || isNaN(this.g) ? 0 :
            255 < this.g ? 255 : this.g;
        this.b = 0 > this.b || isNaN(this.b) ? 0 : 255 < this.b ? 255 : this.b;
        this.toRGB = function () {
            return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")"
        };
        this.toHex = function () {
            var a = this.r.toString(16), c = this.g.toString(16), d = this.b.toString(16);
            1 == a.length && (a = "0" + a);
            1 == c.length && (c = "0" + c);
            1 == d.length && (d = "0" + d);
            return "#" + a + c + d
        };
        this.getHelpXML = function () {
            for (var a = [], c = 0; c < h.length; c++) for (var d = h[c].example, b = 0; b < d.length; b++) a[a.length] = d[b];
            for (var e in m) a[a.length] = e;
            d = document.createElement("ul");
            d.setAttribute("id", "rgbcolor-examples");
            for (c = 0; c < a.length; c++) try {
                var f = document.createElement("li"), l = new g(a[c]), n = document.createElement("div");
                n.style.cssText = "margin: 3px; border: 1px solid black; background:" + l.toHex() + "; color:" + l.toHex();
                n.appendChild(document.createTextNode("test"));
                var k = document.createTextNode(" " + a[c] + " -> " + l.toRGB() + " -> " + l.toHex());
                f.appendChild(n);
                f.appendChild(k);
                d.appendChild(f)
            } catch (p) {
            }
            return d
        }
    }

    "function" === typeof define && define.amd ? define(function () {
            return g
        }) :
        "undefined" !== typeof module && module.exports ? module.exports = g : f.RGBColor = g;
    return g
})("undefined" !== typeof self && self || "undefined" !== typeof window && window || this);
