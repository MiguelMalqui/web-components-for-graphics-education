import Color from "../framework3d/math/color.js";
import ColorSwatch from "../components/color-swatch.js";
import ColorSelectionForm from "../components/color-selection-form.js";

const template = document.createElement("template");
template.innerHTML = `
<style>
#container {
    max-width: 540px;
}
color-swatch {
    height: 7rem;
}
#buttons-container {
    display: flex;
    justify-content: space-between;
}
.btn {
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    width: 7rem;
}
.primary-btn {
    color: #fff;
    background-color: #0d6efd;
    border-color: #0d6efd;
}
</style>

<div id="container">
    <color-swatch id="random-color" text="Random color"></color-swatch>
    <color-swatch id="selected-color" text="Selected color"></color-swatch>
    <color-selection-form></color-selection-form>
    <div id="buttons-container">
        <button id="new-color-button" class="btn">New color</button>
        <button id="check-button" class="btn primary-btn">Check</button>
    </div>
</div>
`;

export class GuessTheColor extends HTMLElement {
    #selectedColorSwatch;
    #randomColorSwatch;
    #colorForm;
    #newColorBtn;
    #checkBtn;
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.#selectedColorSwatch = this.shadowRoot.querySelector("#selected-color");
        this.#randomColorSwatch = this.shadowRoot.querySelector("#random-color");
        this.#colorForm = this.shadowRoot.querySelector("color-selection-form");
        this.#newColorBtn = this.shadowRoot.querySelector("#new-color-button");
        this.#checkBtn = this.shadowRoot.querySelector("#check-button");

        this.#addListeners();

        this.#newColorBtn.click();
        this.setColor(Color.makeRandom());
    }

    #addListeners() {
        this.#colorForm.addEventListener("change", (e) => {
            this.#selectedColorSwatch.setColor(e.detail.color);
        });

        this.#newColorBtn.addEventListener("click", () => {
            this.#randomColorSwatch.setColor(Color.makeRandom());
        });

        this.#checkBtn.addEventListener("click", () => {
            const color1 = this.#selectedColorSwatch.getColor();
            const color2 = this.#randomColorSwatch.getColor();
            const similarity = Math.round(100 * color1.similarity(color2));
            alert(`Similarity: ${similarity}%`);
        });
    }

    /**
     * Sets the color of this element
     * @param {Color} color 
     */
    setColor(color) {
        this.#selectedColorSwatch.setColor(color);
        this.#colorForm.setColor(color);
    }
}


window.customElements.define("guess-the-color", GuessTheColor);