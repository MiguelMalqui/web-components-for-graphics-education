import Color from "../../helpers/color.js";

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
    <label>Cyan</label>
    <input type="number" min="0" max="100" value="0" id="cyan-number-field">
    <input type="range" min="0" max="100" value="0" id="cyan-slider">
</div>
<div class="color-form">
    <label>Magenta</label>
    <input type="number" min="0" max="100" value="0" id="magenta-number-field">
    <input type="range" min="0" max="100" value="0" id="magenta-slider">
</div>
<div class="color-form">
    <label>Yellow</label>
    <input type="number" min="0" max="100" value="0" id="yellow-number-field">
    <input type="range" min="0" max="100" value="0" id="yellow-slider">
</div>
<div class="color-form">
    <label>Black</label>
    <input type="number" min="0" max="100" value="0" id="black-number-field">
    <input type="range" min="0" max="100" value="0" id="black-slider">
</div>
`;

export default class CMYKSelectionForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.#addListeners();
    }

    #addListeners() {
        const cNumField = this.shadowRoot.querySelector('#cyan-number-field');
        const cSlider = this.shadowRoot.querySelector('#cyan-slider');
        const mNumField = this.shadowRoot.querySelector('#magenta-number-field');
        const mSlider = this.shadowRoot.querySelector('#magenta-slider');
        const yNumField = this.shadowRoot.querySelector('#yellow-number-field');
        const ySlider = this.shadowRoot.querySelector('#yellow-slider');
        const kNumField = this.shadowRoot.querySelector('#black-number-field');
        const kSlider = this.shadowRoot.querySelector('#black-slider');

        cNumField.addEventListener('change', () => {
            cNumField.value = CMYKSelectionForm.#validateCMYKRange(cNumField.value);
            this.dispatchEvent(new CustomEvent('change', {detail: {color:this.getColor()}}));
        });
        mNumField.addEventListener('change', () => {
            mNumField.value = CMYKSelectionForm.#validateCMYKRange(mNumField.value);
            this.dispatchEvent(new CustomEvent('change', {detail: {color:this.getColor()}}));
        });
        yNumField.addEventListener('change', () => {
            yNumField.value = CMYKSelectionForm.#validateCMYKRange(yNumField.value);
            this.dispatchEvent(new CustomEvent('change', {detail: {color:this.getColor()}}));
        });
        kNumField.addEventListener('change', () => {
            kNumField.value = CMYKSelectionForm.#validateCMYKRange(kNumField.value);
            this.dispatchEvent(new CustomEvent('change', {detail: {color:this.getColor()}}));
        });

        cSlider.addEventListener('input', () => {
            cNumField.value = cSlider.value;
            this.dispatchEvent(new CustomEvent('change', {detail: {color:this.getColor()}}));
        });
        mSlider.addEventListener('input', () => {
            mNumField.value = mSlider.value;
            this.dispatchEvent(new CustomEvent('change', {detail: {color:this.getColor()}}));
        });
        ySlider.addEventListener('input', () => {
            yNumField.value = ySlider.value;
            this.dispatchEvent(new CustomEvent('change', {detail: {color:this.getColor()}}));
        });
        kSlider.addEventListener('input', () => {
            kNumField.value = kSlider.value;
            this.dispatchEvent(new CustomEvent('change', {detail: {color:this.getColor()}}));
        });
    }

    static #validateCMYKRange(value) {
        value = Math.floor(value);
        if (value < 0) {
            value = 0;
        } else if (value > 100) {
            value = 100;
        }
        return value;
    }


    getColor() {
        const c = this.shadowRoot.querySelector('#cyan-number-field').value / 100.0;
        const m = this.shadowRoot.querySelector('#magenta-number-field').value / 100.0;
        const y = this.shadowRoot.querySelector('#yellow-number-field').value / 100.0;
        const k = this.shadowRoot.querySelector('#black-number-field').value / 100.0;
        return Color.makeCMYK(c, m, y, k);
    }

    setColor(color) {
        const thisColor = this.getColor();
        if (!thisColor.equals(color)) {
            const cmyk = color.getCMYK();
            cmyk.cyan = Math.round(cmyk.cyan * 100);
            cmyk.magenta = Math.round(cmyk.magenta * 100);
            cmyk.yellow = Math.round(cmyk.yellow * 100);
            cmyk.black = Math.round(cmyk.black * 100);
            this.shadowRoot.querySelector('#cyan-number-field').value = cmyk.cyan;
            this.shadowRoot.querySelector('#cyan-slider').value = cmyk.cyan;
            this.shadowRoot.querySelector('#magenta-number-field').value = cmyk.magenta;
            this.shadowRoot.querySelector('#magenta-slider').value = cmyk.magenta;
            this.shadowRoot.querySelector('#yellow-number-field').value = cmyk.yellow;
            this.shadowRoot.querySelector('#yellow-slider').value = cmyk.yellow;
            this.shadowRoot.querySelector('#black-number-field').value = cmyk.black;
            this.shadowRoot.querySelector('#black-slider').value = cmyk.black;
        }
    }
}

window.customElements.define('cmyk-selection-form', CMYKSelectionForm);