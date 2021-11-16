import Swatch from "../components/swatch.js";
import Color from "../helpers/color.js";
import ColorSelectionForm from "../components/color-selection-form/color-selection-form.js";

const template = document.createElement('template');
template.innerHTML = `
<style>

</style>

<my-swatch id="selected-color" text="Selected color"></my-swatch>
<div>
    <color-selection-form id="csf1"></color-selection-form>
    <color-selection-form id="csf2"></color-selection-form>
</div>
`;

export class CompareColorModels extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.setColor(Color.makeRandom());
        this.shadowRoot.querySelector('#csf1').setActiveTab(0);
        this.shadowRoot.querySelector('#csf2').setActiveTab(1);

        const colorForms = this.shadowRoot.querySelectorAll('color-selection-form');
        colorForms.forEach(colorForm => {
            colorForm.addEventListener('change', (e) => {
                this.setColor(e.detail.color);
            });
        });
    }

    setColor(color) {
        this.shadowRoot.querySelector('#csf1').setColor(color);
        this.shadowRoot.querySelector('#csf2').setColor(color);
        this.shadowRoot.querySelector('#selected-color').setColor(color);
    }
}


window.customElements.define('compare-color-models', CompareColorModels);