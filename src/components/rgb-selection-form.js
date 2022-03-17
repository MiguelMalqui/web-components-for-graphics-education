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
    <label>Red</label>
    <input type="number" min="0" max="255" value="0" id="red-number-input">
    <input type="range" min="0" max="255" value="0" id="red-slider">
</div>
<div class="color-form">
    <label>Green</label>
    <input type="number" min="0" max="255" value="0" id="green-number-input">
    <input type="range" min="0" max="255" value="0" id="green-slider">
</div>
<div class="color-form">
    <label>Blue</label>
    <input type="number" min="0" max="255" value="0" id="blue-number-input">
    <input type="range" min="0" max="255" value="0" id="blue-slider">
</div>
`;

export default class RGBSelectionForm extends HTMLElement {
    #redNumInput;
    #greenNumInput;
    #blueNumInput;
    #redSlider;
    #greenSlider;
    #blueSlider;
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.#redNumInput = this.shadowRoot.querySelector("#red-number-input");
        this.#greenNumInput = this.shadowRoot.querySelector("#green-number-input");
        this.#blueNumInput = this.shadowRoot.querySelector("#blue-number-input");
        this.#redSlider = this.shadowRoot.querySelector("#red-slider");
        this.#greenSlider = this.shadowRoot.querySelector("#green-slider");
        this.#blueSlider = this.shadowRoot.querySelector("#blue-slider");

        this.#addListeners();
    }

    #addListeners() {
        const validateRGBRange = (value) => { 
            value = Math.floor(value);
            if (value < 0) value = 0;
            else if (value > 255) value = 255;
            return value || 0;
        }

        this.#redNumInput.addEventListener("change", () => {
            this.#redNumInput.value = validateRGBRange(this.#redNumInput.value);
            this.#redSlider.value = this.#redNumInput.value;
            this.dispatchEvent(new CustomEvent("change", { detail: { color: this.getColor() } }));
        });
        this.#greenNumInput.addEventListener("change", () => {
            this.#greenNumInput.value = validateRGBRange(this.#greenNumInput.value);
            this.#greenSlider.value = this.#greenNumInput.value;
            this.dispatchEvent(new CustomEvent("change", { detail: { color: this.getColor() } }));
        });
        this.#blueNumInput.addEventListener("change", () => {
            this.#blueNumInput.value = validateRGBRange(this.#blueNumInput.value);
            this.#blueSlider.value = this.#blueNumInput.value;
            this.dispatchEvent(new CustomEvent("change", { detail: { color: this.getColor() } }));
        });
        this.#redSlider.addEventListener("input", () => {
            this.#redNumInput.value = this.#redSlider.value;
            this.dispatchEvent(new CustomEvent("change", { detail: { color: this.getColor() } }));
        });
        this.#greenSlider.addEventListener("input", () => {
            this.#greenNumInput.value = this.#greenSlider.value;
            this.dispatchEvent(new CustomEvent("change", { detail: { color: this.getColor() } }));
        });
        this.#blueSlider.addEventListener("input", () => {
            this.#blueNumInput.value = this.#blueSlider.value;
            this.dispatchEvent(new CustomEvent("change", { detail: { color: this.getColor() } }));
        });
    }

    /**
     * Returns the color of this form
     * @returns {Color}
     */
    getColor() {
        const r = Number(this.#redNumInput.value);
        const g = Number(this.#greenNumInput.value);
        const b = Number(this.#blueNumInput.value);
        return Color.makeRGB(r, g, b);
    }

    /**
     * Sets the color of this form
     * @param {Color} color 
     */
    setColor(color) {
        this.#redNumInput.value = color.r;
        this.#greenNumInput.value = color.g;
        this.#blueNumInput.value = color.b;
        this.#redSlider.value = color.r;
        this.#greenSlider.value = color.g;
        this.#blueSlider.value = color.b;
    }
}

window.customElements.define("rgb-selection-form", RGBSelectionForm);