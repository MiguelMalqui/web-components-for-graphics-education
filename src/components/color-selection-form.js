import Color from "../framework3d/math/color.js";
import RGBSelectionForm from "./rgb-selection-form.js";
import HSBSelectionForm from "./hsb-selection-form.js";
import CMYKSelectionForm from "./cmyk-selection-form.js";

const template = document.createElement('template');
template.innerHTML = `
<style>
.tp-tabs-container {
    display: block;
    background-color: #f1f1f1;
    // border-bottom: 0.2rem solid #0d6efd;
}
.tp-tab {
    background-color: inherit;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0.75rem 1.5rem;
}
.tp-tab:hover {
    background-color: #ddd;
}
.tp-tab.active {
    background-color: #ccc;
    // background-color: #0d6efd;
}

.tp-content-container {
    padding: 1rem;
}
.tp-content {
    display: none;
}
.tp-content.active {
    display: block;
}
</style>


<div class="tp-tabs-container">
    <button class="tp-tab active" data-target-content-id="rgb">RGB</button>
    <button class="tp-tab" data-target-content-id="hsb">HSB</button>
    <button class="tp-tab" data-target-content-id="cmyk">CMYK</button>
</div>
<div class="tp-content-container">
    <rgb-selection-form class="tp-content active" id="rgb"></rgb-selection-form>
    <hsb-selection-form class="tp-content" id="hsb"></hsb-selection-form>
    <cmyk-selection-form class="tp-content" id="cmyk"></cmyk-selection-form>
</div>
`;

export default class ColorSelectionForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const tabs = this.shadowRoot.querySelectorAll('.tp-tab');
        const contents = this.shadowRoot.querySelectorAll('.tp-content');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                contents.forEach(c => c.classList.remove('active'));
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const targetContentId = tab.dataset.targetContentId;
                const content = this.shadowRoot.querySelector(`#${targetContentId}`);
                content.classList.add('active');
            });
        });


        const selectionForms = this.shadowRoot.querySelectorAll('.tp-content');
        selectionForms.forEach(selectionForm => {
            selectionForm.addEventListener('change', (e) => {
                this.dispatchEvent(new CustomEvent('change', {detail: {color: e.detail.color}}));
            });
        });
    }

    setActiveTab(index) {
        const tabs = this.shadowRoot.querySelectorAll('.tp-tab');
        tabs[index].click();
    }

    setColor(color) {
        const selectionForms = this.shadowRoot.querySelectorAll('.tp-content');
        selectionForms.forEach(selectionForm => {
            selectionForm.setColor(color);
        });
    }
}

window.customElements.define('color-selection-form', ColorSelectionForm);