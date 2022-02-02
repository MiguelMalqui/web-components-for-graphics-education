import Color from "../framework3d/math/color.js";

const template = document.createElement("template");
template.innerHTML = `
<style>
div {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 3rem;
    height: inherit;
    width: inherit;
}
</style>

<div></div>
`;

export default class ColorSwatch extends HTMLElement {
    #div;
    #color;
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        
        this.#div = this.shadowRoot.querySelector("div");
        this.setColor(new Color());
        if (this.hasAttribute("text")) this.setText(this.getAttribute("text"));
    }

    /**
     * Sets the color of this color swatch
     * @param {Color} color 
     */
    setColor(color) {
        this.#color = Color.makeRGB(color.r, color.g, color.b, color.a);
        this.#div.style.backgroundColor = color.cssRGBA();
        const luminance = color.luminance();
        const textColor = (luminance > 0.5) ? "black" : "white";
        this.#div.style.color = textColor;
    }

    /**
     * 
     * @returns {Color}
     */
    getColor() {
        return Color.makeRGB(
            this.#color.r, this.#color.g, this.#color.b, this.#color.a);
    }

    /**
     * Sets the text of this color swatch
     * @param {string} text 
     */
    setText(text) {
        this.#div.innerText = text;
    }
}

window.customElements.define("color-swatch", ColorSwatch);