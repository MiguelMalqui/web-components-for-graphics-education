import Color from "../../framework3d/math/color.js";

const template = document.createElement('template');
template.innerHTML = `
<style>
.color-form {
    display: flex;
}
.color-form>label {
    width: 4.5rem;
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
    <input type="number" min="0" max="255" value="0" id="red-number-field">
    <input type="range" min="0" max="255" value="0" id="red-slider">
</div>
<div class="color-form">
    <label>Green</label>
    <input type="number" min="0" max="255" value="0" id="green-number-field">
    <input type="range" min="0" max="255" value="0" id="green-slider">
</div>
<div class="color-form">
    <label>Blue</label>
    <input type="number" min="0" max="255" value="0" id="blue-number-field">
    <input type="range" min="0" max="255" value="0" id="blue-slider">
</div>
`;

export default class RGBSelectionForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.#addListeners();
    }

    #addListeners() {
        const rNumField = this.shadowRoot.querySelector('#red-number-field');
        const gNumField = this.shadowRoot.querySelector('#green-number-field');
        const bNumField = this.shadowRoot.querySelector('#blue-number-field');
        const rSlider = this.shadowRoot.querySelector('#red-slider');
        const gSlider = this.shadowRoot.querySelector('#green-slider');
        const bSlider = this.shadowRoot.querySelector('#blue-slider');

        rNumField.addEventListener('change', () => {
            rNumField.value = RGBSelectionForm.#validateRGBRange(rNumField.value);
            this.dispatchEvent(new CustomEvent('change', {detail: {color:this.getColor()}}));
        });
        gNumField.addEventListener('change', () => {
            gNumField.value = RGBSelectionForm.#validateRGBRange(gNumField.value);
            this.dispatchEvent(new CustomEvent('change', {detail: {color:this.getColor()}}));
        });
        bNumField.addEventListener('change', () => {
            bNumField.value = RGBSelectionForm.#validateRGBRange(bNumField.value);
            this.dispatchEvent(new CustomEvent('change', {detail: {color:this.getColor()}}));
        });

        rSlider.addEventListener('input', () => {
            rNumField.value = rSlider.value;
            this.dispatchEvent(new CustomEvent('change', {detail: {color:this.getColor()}}));
        });
        gSlider.addEventListener('input', () => {
            gNumField.value = gSlider.value;
            this.dispatchEvent(new CustomEvent('change', {detail: {color:this.getColor()}}));
        });
        bSlider.addEventListener('input', () => {
            bNumField.value = bSlider.value;
            this.dispatchEvent(new CustomEvent('change', {detail: {color:this.getColor()}}));
        });
    }

    static #validateRGBRange(value) {
        value = Math.floor(value);
        if (value < 0) {
            value = 0;
        } else if (value > 255) {
            value = 255;
        }
        return value;
    }

    getColor() {
        const r = this.shadowRoot.querySelector('#red-number-field').value;
        const g = this.shadowRoot.querySelector('#green-number-field').value;
        const b = this.shadowRoot.querySelector('#blue-number-field').value;
        return Color.makeRGB(r, g, b);
    }

    setColor(color) {
        this.shadowRoot.querySelector('#red-number-field').value = color.r;
        this.shadowRoot.querySelector('#red-slider').value = color.r;
        this.shadowRoot.querySelector('#green-number-field').value = color.g;
        this.shadowRoot.querySelector('#green-slider').value = color.g;
        this.shadowRoot.querySelector('#blue-number-field').value = color.b;
        this.shadowRoot.querySelector('#blue-slider').value = color.b;
    }
}

window.customElements.define('rgb-selection-form', RGBSelectionForm);