import Swatch from "../components/swatch.js";
import Color from "../helpers/color.js";
import ColorSelectionForm from "../components/color-selection-form/color-selection-form.js";

const template = document.createElement('template');
template.innerHTML = `
<style>
#buttons-container {
    display: flex;
    justify-content: space-between;
}
.btn {
    border: 1px solid transparent;
    // border-radius: 0.25rem;
    padding: 0.375rem 0.75rem;
    // font-size: 1rem;
    width: 7rem;
}
.primary-btn {
    color: #fff;
    background-color: #0d6efd;
    border-color: #0d6efd;
}
</style>
<div>
    <my-swatch id="selected-color" text="Selected color"></my-swatch>
    <my-swatch id="random-color" text="Random color"></my-swatch>
</div>

<color-selection-form></color-selection-form>

<div id="buttons-container">
    <button id="new-color-button" class="btn">New color</button>
    <button id="check-button" class="btn primary-btn">Check</button>
</div>
`;

export class GuessTheColor extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const selColor = this.shadowRoot.querySelector('#selected-color');
        const rndColor = this.shadowRoot.querySelector('#random-color');
        const selForm = this.shadowRoot.querySelector('color-selection-form');

        const color1 = Color.makeRandom();
        selColor.setColor(color1);
        selForm.setColor(color1);
        const color2 = Color.makeRandom();
        rndColor.setColor(color2);

        selForm.addEventListener('change', (e) => {
            this.setColor(e.detail.color);
        });

        const newColorButton = this.shadowRoot.querySelector('#new-color-button');
        newColorButton.addEventListener('click', () => {
            rndColor.setColor(Color.makeRandom());
        });
        const checkButton = this.shadowRoot.querySelector('#check-button');
        checkButton.addEventListener('click', () => {
            const color1 = selColor.getColor();
            const color2 = rndColor.getColor();
            const similarity = Math.round(100 * color1.similarity(color2));
            alert(`Similarity: ${similarity}%`);
        })
    }

    setColor(color) {
        this.shadowRoot.querySelector('#selected-color').setColor(color);
        this.shadowRoot.querySelector('color-selection-form').setColor(color);
    }
}


window.customElements.define('guess-the-color', GuessTheColor);