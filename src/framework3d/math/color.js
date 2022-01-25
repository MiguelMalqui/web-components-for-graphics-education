/** Class representing a color. */
export default class Color {
    #r;
    #g;
    #b;
    #a;

    /**
     * Create a color with red=0, green=0 and blue=0.
     * 
     * Consider using the `makeRGB`, `makeHSB` or `makeCMYK` functions.
     */
    constructor() {
        this.#r = this.#g = this.#b = 0;
        this.#a = 1.0;
    }

    /**
     * Create a color with the specified r, g and b values of the RGB color
     * model the alpha-channel value of a.
     * @param {number} r The red component of the color, in the range [0, 255]
     * @param {number} g The green component of the color, in the range [0, 255]
     * @param {number} b The blue component of the color, in the range [0, 255]
     * @param {number} a The alpha-channel of the color, in the range [0.0, 1.0]
     */
    static makeRGB(r, g, b, a = 1.0) {
        const color = new Color();
        color.setRGB(r, g, b, a);
        return color;
    }

    /**
     * Creates a color with the specified h, s and b values of the HSB color
     * model the alpha-channel value of a.
     * @param {number} h The hue component of the color, in the range [0.0, 360.0)
     * @param {number} s The saturation of the color, in the range [0.0, 1.0]
     * @param {number} b The brightness of the color, in the range [0.0, 1.0]
     * @param {number} a The alpha-channel of the color, in the range [0.0, 1.0]
     */
    static makeHSB(h, s, b, a = 1.0) {
        const color = new Color();
        color.setHSB(h, s, b, a);
        return color;
    }

    /**
     * Creates a color with the specified c, m, y and k values of the CMYK color
     * model the alpha-channel value of a.
     * @param {number} c The cyan component of the color, in the range [0.0, 1.0]
     * @param {number} m The magenta component of the color, in the range [0.0, 1.0]
     * @param {number} y The yellow component of the color, in the range [0.0, 1.0]
     * @param {number} k The black component of the color, in the range [0.0, 1.0]
     * @param {number} a The alpha-channel of the color, in the range [0.0, 1.0]
     */
    static makeCMYK(c, m, y, k, a = 1.0) {
        const color = new Color();
        color.setCMYK(c, m, y, k, a);
        return color;
    }

    /**
     * Creates a random color
     */
    static makeRandom() {
        const color = new Color();
        color.#r = Math.floor(255 * Math.random());
        color.#g = Math.floor(255 * Math.random());
        color.#b = Math.floor(255 * Math.random());
        return color;
    }

    /**
     * @type {number} The red component of the color, in the range [0, 255]
     */
    get r() {
        return this.#r;
    }

    set r(r) {
        r = Math.floor(r);
        if (r < 0 || r > 255) {
            console.warn("Red out of range [0, 255]");
            r = 0;
        }
        this.#r = r;
    }

    /**
     * @type {number} The green component of the color, in the range [0, 255]
     */
    get g() {
        return this.#g;
    }

    set g(g) {
        g = Math.floor(g);
        if (g < 0 || g > 255) {
            console.warn("Green out of range [0, 255]");
            g = 0;
        }
        this.#g = g;
    }

    /**
     * @type {number} The blue component of the color, in the range [0, 255]
     */
    get b() {
        return this.#b;
    }

    set b(b) {
        b = Math.floor(b);
        if (b < 0 || b > 255) {
            console.warn("Blue out of range [0, 255]");
            b = 0;
        }
        this.#b = b;
    }

    /**
     * @type {number} The alpha-channel of the color, in the range [0.0, 1.0]
     */
    get a() {
        return this.#a;
    }

    set a(a) {
        if (a < 0.0 || a > 1.0) {
            console.warn("Alpha out of range [0.0, 1.0]");
            a = 1.0;
        }
        this.#a = a;
    }

    /**
     * Sets the value of this color using the components of RGB color model
     * @param {number} r The red component of the color, in the range [0, 255]
     * @param {number} g The green component of the color, in the range [0, 255]
     * @param {number} b The blue component of the color, in the range [0, 255]
     * @param {number} a The alpha component of the color, in the range [0.0, 1.0]
     */
    setRGB(r, g, b, a = 1.0) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    /**
     * @returns Returns the RGB components of this color and its alpha
     */
    getRGB() {
        return {
            r: this.#r,
            g: this.#g,
            b: this.#b,
            a: this.#a
        };
    }

    /**
     * Sets the value of this color using the components of RGB color model
     * @param {number} r The red component of the color, in the range [0.0, 1.0]
     * @param {number} g The green component of the color, in the range [0.0, 1.0]
     * @param {number} b The blue component of the color, in the range [0.0, 1.0]
     * @param {number} a The alpha component of the color, in the range [0.0, 1.0]
     */
    setRGBf(r, g, b, a = 1.0) {
        if (r < 0.0 || r > 1.0) {
            console.warn("Red (f) out of range [0.0, 1.0]");
            r = 0.0;
        }
        if (g < 0.0 || g > 1.0) {
            console.warn("Green (f) out of range [0.0, 1.0]");
            g = 0.0;
        }
        if (b < 0.0 || b > 1.0) {
            console.warn("Blue (f) out of range [0.0, 1.0]");
            b = 0.0;
        }
        this.#r = Math.floor(r * 255);
        this.#g = Math.floor(g * 255);
        this.#b = Math.floor(b * 255);
        this.a = a;
    }

    /**
     * @returns Returns the RGB components of this color and its alpha
     */
    getRGBf() {
        return {
            r: this.#r / 255,
            g: this.#g / 255,
            b: this.#b / 255,
            a: this.#a / 255
        };
    }

    /**
     * Sets the value of this color using the components of HSB color model
     * @param {number} h The hue component of the color, in the range [0.0, 360.0)
     * @param {number} s The saturation of the color, in the range [0.0, 1.0]
     * @param {number} b The brightness of the color, in the range [0.0, 1.0]
     * @param {number} a The alpha component of the color, in the range [0.0, 1.0]
     */
    setHSB(h, s, b, a = 1.0) {
        if (h < 0 || h >= 360) {
            console.warn("Hue out of range [0.0, 360.0)");
            h = 0;
        }
        if (s < 0.0 || s > 1.0) {
            console.warn("Saturation out of range [0.0, 1.0]");
            s = 0;
        }
        if (b < 0.0 || b > 1.0) {
            console.warn("Brightness out of range [0.0, 1.0]");
            b = 0;
        }
        const rgb = Color.#HSBtoRGB(h, s, b);
        this.#r = rgb.r;
        this.#g = rgb.g;
        this.#b = rgb.b;
        this.a = a;
    }

    /**
     * @returns Returns the HSB components of this color and its alpha
     */
    getHSB() {
        const hsb = Color.#RGBtoHSB(this.#r, this.#g, this.#b);
        return {
            h: hsb.h,
            s: hsb.s,
            b: hsb.b,
            a: this.#a
        }
    }

    /**
     * Sets the value of this color using the components of CMYK color model
     * @param {number} c The cyan component of the color, in the range [0.0, 1.0]
     * @param {number} m The magenta component of the color, in the range [0.0, 1.0]
     * @param {number} y The yellow component of the color, in the range [0.0, 1.0]
     * @param {number} k The black component of the color, in the range [0.0, 1.0]
     * @param {number} a The alpha component of the color, in the range [0.0, 1.0]
     */
    setCMYK(c, m, y, k, a = 1.0) {
        if (c < 0.0 || c > 1.0) {
            console.warn("Cyan out of range [0.0, 1.0]");
            c = 0;
        }
        if (m < 0.0 || m > 1.0) {
            console.warn("Magenta out of range [0.0, 1.0]");
            m = 0;
        }
        if (y < 0.0 || y > 1.0) {
            console.warn("Yellow out of range [0.0, 1.0]");
            y = 0;
        }
        if (k < 0.0 || k > 1.0) {
            console.warn("Black out of range [0.0, 1.0]");
            k = 1;
        }
        const rgb = Color.#CMYKtoRGB(c, m, y, k);
        this.#r = rgb.r;
        this.#g = rgb.g;
        this.#b = rgb.b;
        this.a = a;
    }

    /**
     * @returns Returns the CMYK components of this color and its alpha
     */
    getCMYK() {
        const cmyk = Color.#RGBtoCMYK(this.#r, this.#g, this.#b);
        return {
            c: cmyk.c,
            m: cmyk.m,
            y: cmyk.y,
            k: cmyk.k,
            a: this.#a
        }
    }

    /**
     * Luminance of the color, in the range [0.0, 1.0]
     */
    luminance() {
        return (0.299 * this.#r + 0.587 * this.#g + 0.114 * this.#b) / 255.0;
    }

    /**
     * Determines whether another object is equal to this
     * @param {*} obj 
     * @returns 
     */
    equals(obj) {
        return obj instanceof Color && this.#r == obj.r && this.#g == obj.g && this.#b == obj.b && this.#a == obj.a;
    }

    /**
     * Returns the similarity with this color, in the range [0.0, 1.0], ignoring the alpha channel
     * @param {Color} color 
     */
    similarity(color) {
        const r = this.#r - color.r;
        const g = this.#g - color.g;
        const b = this.#b - color.b;
        return 1 - Math.sqrt(r * r + g * g + b * b) / Math.sqrt(3 * 255 * 255);
    }

    /**
     * @returns Returns a string representation of this color
     */
    toString() {
        return `Color[r=${this.#r}, g=${this.#g}, b=${this.#b}, a=${this.#a}]`;
    }

    /**
     * @returns Returns a this color as a CSS `rgb` string
     */
    cssRGB() {
        return `rgb(${this.#r}, ${this.#g}, ${this.#b})`;
    }

    /**
     * @returns Returns a this color as a CSS `rgba` string
     */
    cssRGBA() {
        return `rgb(${this.#r}, ${this.#g}, ${this.#b}, ${this.#a})`;
    }

    /**
     * Converts the components of the RGB model to the three components of the
     * HSB model.
     * @param {number} r The red component of the color, in the range [0, 255]
     * @param {number} g The green component of the color, in the range [0, 255]
     * @param {number} b The blue component of the color, in the range [0, 255]
     * @returns The HSB components of the color
     */
    static #RGBtoHSB(r, g, b) {
        r = r / 255;
        g = g / 255;
        b = b / 255;
        let cMax = Math.max(r, g, b);
        let cMin = Math.min(r, g, b);
        let delta = cMax - cMin;

        let h = 0;
        if (delta != 0) {
            switch (cMax) {
                case r:
                    h = 60 * ((g - b) / delta);
                    if (h < 0) h += 360;
                    break;
                case g:
                    h = 60 * ((b - r) / delta + 2);
                    break;
                case b:
                    h = 60 * ((r - g) / delta + 4);
                    break;
            }
        }

        return {
            h: h,
            s: (cMax == 0) ? 0 : delta / cMax,
            b: cMax
        }
    }

    /**
     * Converts the components of the HSB model to the three components of the
     * RGB model.
     * @param {number} h The hue component of the color, in the range [0.0, 360.0)
     * @param {number} s The saturation of the color, in the range [0.0, 1.0]
     * @param {number} b The brightness of the color, in the range [0.0, 1.0]
     * @returns The RGB values of the color
     */
    static #HSBtoRGB(h, s, b) {
        let c = b * s;
        let x = c * (1 - Math.abs((h / 60) % 2 - 1));
        let m = b - c;

        let rp, gp, bp;
        switch (Math.floor(h / 60)) {
            case 0: rp = c, gp = x, bp = 0; break;
            case 1: rp = x, gp = c, bp = 0; break;
            case 2: rp = 0, gp = c, bp = x; break;
            case 3: rp = 0, gp = x, bp = c; break;
            case 4: rp = x, gp = 0, bp = c; break;
            case 5: rp = c, gp = 0, bp = x; break;
        }

        return {
            r: Math.round((rp + m) * 255),
            g: Math.round((gp + m) * 255),
            b: Math.round((bp + m) * 255)
        };
    }

    /**
     * Converts the components of the CMYK model to the three components of the
     * RGB model.
     * @param {number} c The cyan component of the color, in the range [0.0, 1.0]
     * @param {number} m The magenta component of the color, in the range [0.0, 1.0]
     * @param {number} y The yellow component of the color, in the range [0.0, 1.0]
     * @param {number} k The black component of the color, in the range [0.0, 1.0]
     * @returns The RGB components of the color
     */
    static #CMYKtoRGB(c, m, y, k) {
        return {
            r: Math.round(255 * (1 - c) * (1 - k)),
            g: Math.round(255 * (1 - m) * (1 - k)),
            b: Math.round(255 * (1 - y) * (1 - k))
        };
    }

    /**
     * Converts the components of the RGB model to the four components of the
     * CMYK model.
     * @param {number} r The red component of the color, in the range [0, 255]
     * @param {number} g The green component of the color, in the range [0, 255]
     * @param {number} b The blue component of the color, in the range [0, 255]
     * @returns The CMYK components of the color
     */
    static #RGBtoCMYK(r, g, b) {
        r = r / 255;
        g = g / 255;
        b = b / 255;
        let k = 1 - Math.max(r, g, b);
        let c, m, y;

        c = m = y = 0;
        if (k != 1) {
            c = (1 - r - k) / (1 - k);
            m = (1 - g - k) / (1 - k);
            y = (1 - b - k) / (1 - k);
        }

        return {
            c: c,
            m: m,
            y: y,
            k: k
        }
    }

    /**
     * Converts the components of the CMYK model to the three components of the
     * HSB model.
     * @param {number} c The cyan component of the color, in the range [0.0, 1.0]
     * @param {number} m The magenta component of the color, in the range [0.0, 1.0]
     * @param {number} y The yellow component of the color, in the range [0.0, 1.0]
     * @param {number} k The black component of the color, in the range [0.0, 1.0]
     * @returns The HSB components of the color
     */
    static #CMYKtoHSB(c, m, y, k) {
        const rgb = Color.#CMYKtoRGB(c, m, y, k);
        return Color.#RGBtoHSB(rgb.r, rgb.b, rgb.g);
    }

    /**
     * Converts the components of the HSB model to the four components of the
     * CMYK model.
     * @param {number} h The hue component of the color, in the range [0.0, 360.0)
     * @param {number} s The saturation of the color, in the range [0.0, 1.0]
     * @param {number} b The brightness of the color, in the range [0.0, 1.0]
     * @returns The CMYK components of the color
     */
    static #HSBtoCMYK(h, s, b) {
        const rgb = Color.#HSBtoRGB(h, s, b);
        return Color.#RGBtoCMYK(rgb.r, rgb.g, rgb.b);
    }
}