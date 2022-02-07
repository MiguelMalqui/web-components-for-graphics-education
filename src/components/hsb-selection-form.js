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
    <label>Hue</label>
    <input type="number" min="0" max="359" value="0" id="hue-number-input">
    <input type="range" min="0" max="359" value="0" id="hue-slider">
</div>
<div class="color-form">
    <label>Saturation</label>
    <input type="number" min="0" max="100" value="0" id="saturation-number-input">
    <input type="range" min="0" max="100" value="0" id="saturation-slider">
</div>
<div class="color-form">
    <label>Brightness</label>
    <input type="number" min="0" max="100" value="0" id="brightness-number-input">
    <input type="range" min="0" max="100" value="0" id="brightness-slider">
</div>
`;

export default class HSBSelectionForm extends HTMLElement {
    #hueNumInput;
    #saturationNumInput;
    #brightnessNumInput;
    #hueSlider;
    #saturationSlider;
    #brightnessSlider;
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.#hueNumInput = this.shadowRoot.querySelector("#hue-number-input");
        this.#saturationNumInput = this.shadowRoot.querySelector("#saturation-number-input");
        this.#brightnessNumInput = this.shadowRoot.querySelector("#brightness-number-input");
        this.#hueSlider = this.shadowRoot.querySelector("#hue-slider");
        this.#saturationSlider = this.shadowRoot.querySelector("#saturation-slider");
        this.#brightnessSlider = this.shadowRoot.querySelector("#brightness-slider");

        this.#addListeners();
    }

    #addListeners() {
        this.#hueNumInput.addEventListener("change", () => {
            this.#hueNumInput.value = HSBSelectionForm.#validateHRange(this.#hueNumInput.value);
            this.dispatchEvent(new CustomEvent("change", { detail: { color: this.getColor() } }));
        });
        this.#saturationNumInput.addEventListener("change", () => {
            this.#saturationNumInput.value = HSBSelectionForm.#validateSBRange(this.#saturationNumInput.value);
            this.dispatchEvent(new CustomEvent("change", { detail: { color: this.getColor() } }));
        });
        this.#brightnessNumInput.addEventListener("change", () => {
            this.#brightnessNumInput.value = HSBSelectionForm.#validateSBRange(this.#brightnessNumInput.value);
            this.dispatchEvent(new CustomEvent("change", { detail: { color: this.getColor() } }));
        });
        this.#hueSlider.addEventListener("input", () => {
            this.#hueNumInput.value = this.#hueSlider.value;
            this.dispatchEvent(new CustomEvent("change", { detail: { color: this.getColor() } }));
        });
        this.#saturationSlider.addEventListener("input", () => {
            this.#saturationNumInput.value = this.#saturationSlider.value;
            this.dispatchEvent(new CustomEvent("change", { detail: { color: this.getColor() } }));
        });
        this.#brightnessSlider.addEventListener("input", () => {
            this.#brightnessNumInput.value = this.#brightnessSlider.value;
            this.dispatchEvent(new CustomEvent("change", { detail: { color: this.getColor() } }));
        });
    }

    static #validateHRange(value) {
        value = Math.floor(value);
        value = value % 360;
        if (value < 0) {
            value += 360;
        }
        return value;
    }

    static #validateSBRange(value) {
        value = Math.floor(value);
        if (value < 0) {
            value = 0;
        } else if (value > 100) {
            value = 100;
        }
        return value;
    }

    /**
     * 
     * @returns {Color}
     */
    getColor() {
        const h = Number(this.#hueSlider.value);
        const s = Number(this.#saturationSlider.value / 100);
        const b = Number(this.#brightnessSlider.value / 100);
        return Color.makeHSB(h, s, b);
    }

    /**
     * 
     * @param {Color} color 
     */
    setColor(color) {
        const thisColor = this.getColor();
        if (!thisColor.equals(color)) {
            const hsb = color.getHSB();
            hsb.h = Math.round(hsb.h);
            hsb.s = Math.round(hsb.s * 100);
            hsb.b = Math.round(hsb.b * 100);
            this.#hueNumInput.value = hsb.h;
            this.#hueSlider.value = hsb.h;
            this.#saturationNumInput.value = hsb.s;
            this.#saturationSlider.value = hsb.s;
            this.#brightnessNumInput.value = hsb.b;
            this.#brightnessSlider.value = hsb.b;
        }
    }
}

window.customElements.define("hsb-selection-form", HSBSelectionForm);