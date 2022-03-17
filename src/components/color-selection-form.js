import Color from "../framework3d/math/color.js";
import RGBSelectionForm from "./rgb-selection-form.js";
import HSBSelectionForm from "./hsb-selection-form.js";
import CMYKSelectionForm from "./cmyk-selection-form.js";

const template = document.createElement("template");
template.innerHTML = `
<style>
.tp-tabs-container {
    display: block;
    background-color: #f1f1f1;
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
    #tabs;
    #colorForms;
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.#tabs = this.shadowRoot.querySelectorAll(".tp-tab");
        this.#colorForms = this.shadowRoot.querySelectorAll(".tp-content");

        this.#addListeners();
    }

    #addListeners() {
        this.#addChangeActiveTabListeners();
        this.#addColorFormsListeners();
    }

    #addChangeActiveTabListeners() {
        this.#tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                this.#colorForms.forEach(cf => cf.classList.remove("active"));
                this.#tabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                const targetContentId = tab.dataset.targetContentId;
                const content = this.shadowRoot.querySelector(`#${targetContentId}`);
                content.classList.add("active");
            });
        });
    }

    #addColorFormsListeners() {
        const rgbForm = this.shadowRoot.querySelector("#rgb");
        const hsbForm = this.shadowRoot.querySelector("#hsb");
        const cmykForm = this.shadowRoot.querySelector("#cmyk");
        rgbForm.addEventListener("change", (e) => {
            hsbForm.setColor(e.detail.color);
            cmykForm.setColor(e.detail.color);
            this.dispatchEvent(new CustomEvent("change", { detail: { color: e.detail.color } }));
        });
        hsbForm.addEventListener("change", (e) => {
            rgbForm.setColor(e.detail.color);
            cmykForm.setColor(e.detail.color);
            this.dispatchEvent(new CustomEvent("change", { detail: { color: e.detail.color } }));
        });
        cmykForm.addEventListener("change", (e) => {
            rgbForm.setColor(e.detail.color);
            hsbForm.setColor(e.detail.color);
            this.dispatchEvent(new CustomEvent("change", { detail: { color: e.detail.color } }));
        });
    }

    /**
     * Sets the active tab of this form to index
     * @param {number} index 
     */
    setActiveTab(index) {
        if (index < 0) index = 0;
        else if (index >= this.#tabs.length) index = this.#tabs.length - 1;
        this.#tabs[index].click();
    }

    /**
     * Sets the color of this form
     * @param {Color} color 
     */
    setColor(color) {
        this.#colorForms.forEach(selectionForm => {
            selectionForm.setColor(color);
        });
    }
}

window.customElements.define("color-selection-form", ColorSelectionForm);