import Color from "../framework3d/math/color.js";

const template = document.createElement("template");
template.innerHTML = `
<style>
.color-form {
    display: flex;
}
.color-form>label {
    width: 4.5rem;
    display: flex;
    align-items: center;
}
.color-form>input[type=number] {
    width: 2.5rem;
    margin: 0.2rem 1rem;
}
.color-form>input[type=range] {
    flex-grow: 1;
}
</style>


<div class="color-form">
    <label>Cyan</label>
    <input type="number" min="0" max="100" value="0" id="cyan-number-input">
    <input type="range" min="0" max="100" value="0" id="cyan-slider">
</div>
<div class="color-form">
    <label>Magenta</label>
    <input type="number" min="0" max="100" value="0" id="magenta-number-input">
    <input type="range" min="0" max="100" value="0" id="magenta-slider">
</div>
<div class="color-form">
    <label>Yellow</label>
    <input type="number" min="0" max="100" value="0" id="yellow-number-input">
    <input type="range" min="0" max="100" value="0" id="yellow-slider">
</div>
<div class="color-form">
    <label>Black</label>
    <input type="number" min="0" max="100" value="0" id="black-number-input">
    <input type="range" min="0" max="100" value="0" id="black-slider">
</div>
`;

export default class CMYKSelectionForm extends HTMLElement {
    #cyanNumInput;
    #magentaNumInput;
    #yellowNumInput;
    #blackNumInput;
    #cyanSlider;
    #magentaSlider;
    #yellowSlider;
    #blackSlider;
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.#cyanNumInput = this.shadowRoot.querySelector("#cyan-number-input");
        this.#cyanSlider = this.shadowRoot.querySelector("#cyan-slider");
        this.#magentaNumInput = this.shadowRoot.querySelector("#magenta-number-input");
        this.#magentaSlider = this.shadowRoot.querySelector("#magenta-slider");
        this.#yellowNumInput = this.shadowRoot.querySelector("#yellow-number-input");
        this.#yellowSlider = this.shadowRoot.querySelector("#yellow-slider");
        this.#blackNumInput = this.shadowRoot.querySelector("#black-number-input");
        this.#blackSlider = this.shadowRoot.querySelector("#black-slider");

        this.#addListeners();
    }

    #addListeners() {
        const validateCMYKRange = (value) => {
            value = Math.floor(value);
            if (value < 0) value = 0;
            else if (value > 100) value = 100;
            return value || 0;
        }

        this.#cyanNumInput.addEventListener("change", () => {
            this.#cyanNumInput.value = validateCMYKRange(this.#cyanNumInput.value);
            this.#cyanSlider.value = this.#cyanNumInput.value;
            this.dispatchEvent(new CustomEvent("change", { detail: { color: this.getColor() } }));
        });
        this.#magentaNumInput.addEventListener("change", () => {
            this.#magentaNumInput.value = validateCMYKRange(this.#magentaNumInput.value);
            this.#magentaSlider.value = this.#magentaNumInput.value;
            this.dispatchEvent(new CustomEvent("change", { detail: { color: this.getColor() } }));
        });
        this.#yellowNumInput.addEventListener("change", () => {
            this.#yellowNumInput.value = validateCMYKRange(this.#yellowNumInput.value);
            this.#yellowSlider.value = this.#yellowNumInput.value;
            this.dispatchEvent(new CustomEvent("change", { detail: { color: this.getColor() } }));
        });
        this.#blackNumInput.addEventListener("change", () => {
            this.#blackNumInput.value = validateCMYKRange(this.#blackNumInput.value);
            this.#blackSlider.value = this.#blackNumInput.value;
            this.dispatchEvent(new CustomEvent("change", { detail: { color: this.getColor() } }));
        });
        this.#cyanSlider.addEventListener("input", () => {
            this.#cyanNumInput.value = this.#cyanSlider.value;
            this.dispatchEvent(new CustomEvent("change", { detail: { color: this.getColor() } }));
        });
        this.#magentaSlider.addEventListener("input", () => {
            this.#magentaNumInput.value = this.#magentaSlider.value;
            this.dispatchEvent(new CustomEvent("change", { detail: { color: this.getColor() } }));
        });
        this.#yellowSlider.addEventListener("input", () => {
            this.#yellowNumInput.value = this.#yellowSlider.value;
            this.dispatchEvent(new CustomEvent("change", { detail: { color: this.getColor() } }));
        });
        this.#blackSlider.addEventListener("input", () => {
            this.#blackNumInput.value = this.#blackSlider.value;
            this.dispatchEvent(new CustomEvent("change", { detail: { color: this.getColor() } }));
        });
    }

    /**
     * Returns the color of this form
     * @returns {Color}
     */
    getColor() {
        const c = Number(this.#cyanSlider.value / 100);
        const m = Number(this.#magentaSlider.value / 100);
        const y = Number(this.#yellowSlider.value / 100);
        const k = Number(this.#blackSlider.value / 100);
        return Color.makeCMYK(c, m, y, k);
    }

    /**
     * Sets the color of this form
     * @param {Color} color 
     */
    setColor(color) {
        const thisColor = this.getColor();
        if (!thisColor.equals(color)) {
            const cmyk = color.getCMYK();
            cmyk.c = Math.round(cmyk.c * 100);
            cmyk.m = Math.round(cmyk.m * 100);
            cmyk.y = Math.round(cmyk.y * 100);
            cmyk.k = Math.round(cmyk.k * 100);
            this.#cyanNumInput.value = cmyk.c;
            this.#cyanSlider.value = cmyk.c;
            this.#magentaNumInput.value = cmyk.m;
            this.#magentaSlider.value = cmyk.m;
            this.#yellowNumInput.value = cmyk.y;
            this.#yellowSlider.value = cmyk.y;
            this.#blackNumInput.value = cmyk.k;
            this.#blackSlider.value = cmyk.k;
        }
    }
}

window.customElements.define("cmyk-selection-form", CMYKSelectionForm);