import Color from "../framework3d/math/color.js";

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
    <label>Hue</label>
    <input type="number" min="0" max="359" value="0" id="hue-number-field">
    <input type="range" min="0" max="359" value="0" id="hue-slider">
</div>
<div class="color-form">
    <label>Saturation</label>
    <input type="number" min="0" max="100" value="0" id="saturation-number-field">
    <input type="range" min="0" max="100" value="0" id="saturation-slider">
</div>
<div class="color-form">
    <label>Brightness</label>
    <input type="number" min="0" max="100" value="0" id="brightness-number-field">
    <input type="range" min="0" max="100" value="0" id="brightness-slider">
</div>
`;

export default class HSBSelectionForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.#addListeners();
    }

    #addListeners() {
        const hNumField = this.shadowRoot.querySelector('#hue-number-field');
        const sNumField = this.shadowRoot.querySelector('#saturation-number-field');
        const bNumField = this.shadowRoot.querySelector('#brightness-number-field');
        const hSlider = this.shadowRoot.querySelector('#hue-slider');
        const sSlider = this.shadowRoot.querySelector('#saturation-slider');
        const bSlider = this.shadowRoot.querySelector('#brightness-slider');

        hNumField.addEventListener('change', () => {
            hNumField.value = HSBSelectionForm.#validateHRange(hNumField.value);
            this.dispatchEvent(new CustomEvent('change', {detail: {color:this.getColor()}}));
        });
        sNumField.addEventListener('change', () => {
            sNumField.value = HSBSelectionForm.#validateSBRange(sNumField.value);
            this.dispatchEvent(new CustomEvent('change', {detail: {color:this.getColor()}}));
        });
        bNumField.addEventListener('change', () => {
            bNumField.value = HSBSelectionForm.#validateSBRange(bNumField.value);
            this.dispatchEvent(new CustomEvent('change', {detail: {color:this.getColor()}}));
        });

        hSlider.addEventListener('input', () => {
            hNumField.value = hSlider.value;
            this.dispatchEvent(new CustomEvent('change', {detail: {color:this.getColor()}}));
        });
        sSlider.addEventListener('input', () => {
            sNumField.value = sSlider.value;
            this.dispatchEvent(new CustomEvent('change', {detail: {color:this.getColor()}}));
        });
        bSlider.addEventListener('input', () => {
            bNumField.value = bSlider.value;
            this.dispatchEvent(new CustomEvent('change', {detail: {color:this.getColor()}}));
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

    getColor() {
        const h = this.shadowRoot.querySelector('#hue-number-field').value;
        const s = this.shadowRoot.querySelector('#saturation-number-field').value / 100.0;
        const b = this.shadowRoot.querySelector('#brightness-number-field').value / 100.0;
        return Color.makeHSB(h, s, b);
    }

    setColor(color) {
        const thisColor = this.getColor();
        if (!thisColor.equals(color)) {
            const hsb = color.getHSB();
            hsb.h = Math.round(hsb.h);
            hsb.s = Math.round(hsb.s * 100);
            hsb.b = Math.round(hsb.b * 100);
            this.shadowRoot.querySelector('#hue-number-field').value = hsb.h;
            this.shadowRoot.querySelector('#hue-slider').value = hsb.h;
            this.shadowRoot.querySelector('#saturation-number-field').value = hsb.s;
            this.shadowRoot.querySelector('#saturation-slider').value = hsb.s;
            this.shadowRoot.querySelector('#brightness-number-field').value = hsb.b;
            this.shadowRoot.querySelector('#brightness-slider').value = hsb.b;
        }
    }
}

window.customElements.define('hsb-selection-form', HSBSelectionForm);