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
     * Create a color with the specified red, green and blue values of the RGB color model.
     * @param {number} red The red component of the color, in the range [0, 255]
     * @param {number} green The green component of the color, in the range [0, 255]
     * @param {number} blue The blue component of the color, in the range [0, 255]
     * @param {number} alpha The alpha component of the color, in the range [0.0, 1.0]
     * @throws {RangeError}
     */
    static makeRGB(red, green, blue, alpha = 1.0) {
        const color = new Color();
        color.setRGB(red, green, blue, alpha);
        return color;
    }

    /**
     * Creates a color with the specified hue, saturation and brightness values of the HSB color model.
     * @param {number} hue The hue component of the color, in the range [0.0, 360.0)
     * @param {number} saturation The saturation of the color, in the range [0.0, 1.0]
     * @param {number} brightness The brightness of the color, in the range [0.0, 1.0]
     * @param {number} alpha The alpha component of the color, in the range [0.0, 1.0]
     * @throws {RangeError}
     */
    static makeHSB(hue, saturation, brightness, alpha = 1.0) {
        const color = new Color();
        color.setHSB(hue, saturation, brightness, alpha);
        return color;
    }

    /**
     * Creates a color with the specified cyan, magenta, yellow and black values of the CMYK color model.
     * @param {number} cyan The cyan component of the color, in the range [0.0, 1.0]
     * @param {number} magenta The magenta component of the color, in the range [0.0, 1.0]
     * @param {number} yellow The yellow component of the color, in the range [0.0, 1.0]
     * @param {number} black The black component of the color, in the range [0.0, 1.0]
     * @param {number} alpha The alpha component of the color, in the range [0.0, 1.0]
     * @throws {RangeError}
     */
    static makeCMYK(cyan, magenta, yellow, black, alpha = 1.0) {
        const color = new Color();
        color.setCMYK(cyan, magenta, yellow, black, alpha);
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
     * @throws {RangeError}
     */
    get red() {
        return this.#r;
    }

    set red(red) {
        red = Math.floor(red);
        if (red < 0 || red > 255) {
            throw new RangeError("Red out of range [0, 255]");
        }
        this.#r = red;
    }

    /**
     * @type {number} The green component of the color, in the range [0, 255]
     * @throws {RangeError}
     */
    get green() {
        return this.#g;
    }

    set green(green) {
        green = Math.floor(green);
        if (green < 0 || green > 255) {
            throw new RangeError("Green out of range [0, 255]");
        }
        this.#g = green;
    }

    /**
     * @type {number} The blue component of the color, in the range [0, 255]
     * @throws {RangeError}
     */
    get blue() {
        return this.#b;
    }

    set blue(blue) {
        blue = Math.floor(blue);
        if (blue < 0 || blue > 255) {
            throw new RangeError("Blue out of range [0, 255]");
        }
        this.#b = blue;
    }

    /**
     * @type {number} The alpha component of the color, in the range [0.0, 1.0]
     * @throws {RangeError}
     */
    get alpha() {
        return this.#a;
    }

    set alpha(alpha) {
        alpha = Math.floor(alpha);
        if (alpha < 0.0 || alpha > 1.0) {
            throw new RangeError("Alpha out of range [0, 255]");
        }
        this.#a = alpha;
    }

    /**
     * Sets the value of this color using the components of RGB color model
     * @param {number} red The red component of the color, in the range [0, 255]
     * @param {number} green The green component of the color, in the range [0, 255]
     * @param {number} blue The blue component of the color, in the range [0, 255]
     * @param {number} alpha The alpha component of the color, in the range [0, 255]
     * @throws {RangeError}
     */
    setRGB(red, green, blue, alpha = 1.0) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    /**
     * @returns Returns the RGB components of this color and its alpha
     */
    getRGB() {
        return {
            red: this.#r,
            green: this.#g,
            blue: this.#b,
            alpha: this.#a
        };
    }

    /**
     * Sets the value of this color using the components of HSB color model
     * @param {number} hue The hue component of the color, in the range [0.0, 360.0)
     * @param {number} saturation The saturation of the color, in the range [0.0, 1.0]
     * @param {number} brightness The brightness of the color, in the range [0.0, 1.0]
     * @param {number} alpha The alpha component of the color, in the range [0, 255]
     * @throws {RangeError}
     */
    setHSB(hue, saturation, brightness, alpha = 1.0) {
        if (hue < 0 || hue >= 360) throw new RangeError("Hue out of range [0.0, 360.0)");
        if (saturation < 0.0 || saturation > 1.0) throw new RangeError("Saturation out of range [0.0, 1.0]");
        if (brightness < 0.0 || brightness > 1.0) throw new RangeError("Brightness out of range [0.0, 1.0]");
        const rgb = Color.HSBtoRGB(hue, saturation, brightness);
        this.#r = rgb.red;
        this.#g = rgb.green;
        this.#b = rgb.blue;
        this.#a = alpha;
    }

    /**
     * @returns Returns the HSB components of this color and its alpha
     */
    getHSB() {
        const hsb = Color.RGBtoHSB(this.#r, this.#g, this.#b);
        return {
            hue: hsb.hue,
            saturation: hsb.saturation,
            brightness: hsb.brightness,
            alpha: this.#a
        }
    }

    /**
     * Sets the value of this color using the components of CMYK color model
     * @param {number} cyan The cyan component of the color, in the range [0.0, 1.0]
     * @param {number} magenta The magenta component of the color, in the range [0.0, 1.0]
     * @param {number} yellow The yellow component of the color, in the range [0.0, 1.0]
     * @param {number} black The black component of the color, in the range [0.0, 1.0]
     * @param {number} alpha The alpha component of the color, in the range [0, 255]
     * @throws {RangeError}
     */
    setCMYK(cyan, magenta, yellow, black, alpha = 1.0) {
        if (cyan < 0.0 || cyan > 1.0) throw new RangeError("Cyan out of range [0.0, 1.0]");
        if (magenta < 0.0 || magenta > 1.0) throw new RangeError("Magenta out of range [0.0, 1.0]");
        if (yellow < 0.0 || yellow > 1.0) throw new RangeError("Yellow out of range [0.0, 1.0]");
        if (black < 0.0 || black > 1.0) throw new RangeError("Black out of range [0.0, 1.0]");
        const rgb = Color.CMYKtoRGB(cyan, magenta, yellow, black);
        this.#r = rgb.red;
        this.#g = rgb.green;
        this.#b = rgb.blue;
        this.#a = alpha;
    }

    /**
     * @returns Returns the CMYK components of this color and its alpha
     */
    getCMYK() {
        const cmyk = Color.RGBtoCMYK(this.#r, this.#g, this.#b);
        return {
            cyan: cmyk.cyan,
            magenta: cmyk.magenta,
            yellow: cmyk.yellow,
            black: cmyk.black,
            alpha: this.#a
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
        return obj instanceof Color && this.#r == obj.red && this.#g == obj.green && this.#b == obj.blue && this.#a == obj.alpha;
    }

    /**
     * Returns the similarity with this color, in the range [0.0, 1.0], ignoring the alpha channel
     * @param {Color} color 
     */
    similarity(color) {
        const r = this.#r - color.red;
        const g = this.#g - color.green;
        const b = this.#b - color.blue;
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
     * @param {number} red The red component of the color, in the range [0, 255]
     * @param {number} green The green component of the color, in the range [0, 255]
     * @param {number} blue The blue component of the color, in the range [0, 255]
     * @returns The HSB components of the color
     */
    static RGBtoHSB(red, green, blue) {
        let r = red / 255;
        let g = green / 255;
        let b = blue / 255;
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
            hue: h,
            saturation: (cMax == 0) ? 0 : delta / cMax,
            brightness: cMax
        }
    }

    /**
     * Converts the components of the HSB model to the three components of the
     * RGB model.
     * @param {number} hue The hue component of the color, in the range [0.0, 360.0)
     * @param {number} saturation The saturation of the color, in the range [0.0, 1.0]
     * @param {number} brightness The brightness of the color, in the range [0.0, 1.0]
     * @returns The RGB values of the color
     */
    static HSBtoRGB(hue, saturation, brightness) {
        let h = hue;
        let s = saturation;
        let v = brightness;
        let c = v * s;
        let x = c * (1 - Math.abs((h / 60) % 2 - 1));
        let m = v - c;

        let r, g, b;
        switch (Math.floor(h / 60)) {
            case 0: r = c, g = x, b = 0; break;
            case 1: r = x, g = c, b = 0; break;
            case 2: r = 0, g = c, b = x; break;
            case 3: r = 0, g = x, b = c; break;
            case 4: r = x, g = 0, b = c; break;
            case 5: r = c, g = 0, b = x; break;
        }

        return {
            red: Math.round((r + m) * 255),
            green: Math.round((g + m) * 255),
            blue: Math.round((b + m) * 255)
        };
    }

    /**
     * Converts the components of the CMYK model to the three components of the
     * RGB model.
     * @param {number} cyan The cyan component of the color, in the range [0.0, 1.0]
     * @param {number} magenta The magenta component of the color, in the range [0.0, 1.0]
     * @param {number} yellow The yellow component of the color, in the range [0.0, 1.0]
     * @param {number} black The black component of the color, in the range [0.0, 1.0]
     * @returns The RGB components of the color
     */
    static CMYKtoRGB(cyan, magenta, yellow, black) {
        return {
            red: Math.round(255 * (1 - cyan) * (1 - black)),
            green: Math.round(255 * (1 - magenta) * (1 - black)),
            blue: Math.round(255 * (1 - yellow) * (1 - black))
        };
    }

    /**
     * Converts the components of the RGB model to the four components of the
     * CMYK model.
     * @param {number} red The red component of the color, in the range [0, 255]
     * @param {number} green The green component of the color, in the range [0, 255]
     * @param {number} blue The blue component of the color, in the range [0, 255]
     * @returns The CMYK components of the color
     */
    static RGBtoCMYK(red, green, blue) {
        let r = red / 255;
        let g = green / 255;
        let b = blue / 255;
        let k = 1 - Math.max(r, g, b);
        let c, m, y;

        c = m = y = 0;
        if (k != 1) {
            c = (1 - r - k) / (1 - k);
            m = (1 - g - k) / (1 - k);
            y = (1 - b - k) / (1 - k);
        }

        return {
            cyan: c,
            magenta: m,
            yellow: y,
            black: k
        }
    }

    /**
     * Converts the components of the CMYK model to the three components of the
     * HSB model.
     * @param {number} cyan The cyan component of the color, in the range [0.0, 1.0]
     * @param {number} magenta The magenta component of the color, in the range [0.0, 1.0]
     * @param {number} yellow The yellow component of the color, in the range [0.0, 1.0]
     * @param {number} black The black component of the color, in the range [0.0, 1.0]
     * @returns The HSB components of the color
     */
    static CMYKtoHSB(cyan, magenta, yellow, black) {
        const rgb = Color.CMYKtoRGB(cyan, magenta, yellow, black);
        return Color.RGBtoHSB(rgb.red, rgb.blue, rgb.green);
    }

    /**
     * Converts the components of the HSB model to the four components of the
     * CMYK model.
     * @param {number} hue The hue component of the color, in the range [0.0, 360.0)
     * @param {number} saturation The saturation of the color, in the range [0.0, 1.0]
     * @param {number} brightness The brightness of the color, in the range [0.0, 1.0]
     * @returns The CMYK components of the color
     */
    static HSBtoCMYK(hue, saturation, brightness) {
        const rgb = Color.HSVtoRGB(hue, saturation, brightness);
        return Color.RGBtoCMYK(rgb.red, rgb.green, rgb.blue);
    }
}