import Color from "../framework3d/math/color.js";
import ColorSwatch from "../components/color-swatch.js";
import ColorSelectionForm from "../components/color-selection-form.js";

const template = document.createElement("template");
template.innerHTML = `
<style>
color-swatch {
    height: 10rem;
}
</style>

<color-swatch id="selected-color" text="Selected color"></color-swatch>
<div>
    <color-selection-form id="csf1"></color-selection-form>
    <color-selection-form id="csf2"></color-selection-form>
</div>
`;

export class CompareColorModels extends HTMLElement {
    #colorForm1;
    #colorForm2;
    #colorSwatch;
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.#colorForm1 = this.shadowRoot.querySelector("#csf1");
        this.#colorForm2 = this.shadowRoot.querySelector("#csf2");
        this.#colorSwatch = this.shadowRoot.querySelector("#selected-color");

        this.#addListeners();

        this.setColor(Color.makeRandom());
        this.#colorForm1.setActiveTab(0);
        this.#colorForm2.setActiveTab(1);
    }

    #addListeners() {
        const colorForms = this.shadowRoot.querySelectorAll("color-selection-form");
        colorForms.forEach(colorForm => {
            colorForm.addEventListener("change", (e) => {
                this.setColor(e.detail.color);
            });
        });
    }

    setColor(color) {
        this.#colorForm1.setColor(color);
        this.#colorForm2.setColor(color);
        this.#colorSwatch.setColor(color);
    }
}


window.customElements.define("compare-color-models", CompareColorModels);