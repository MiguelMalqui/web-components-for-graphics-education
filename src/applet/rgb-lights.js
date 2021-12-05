const template = document.createElement("template");
template.innerHTML = `
<style>
.color-form {
    display: flex;
}
.color-form>label {
    width: 8.3rem;
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

<canvas></canvas>
<div>
<div class="color-form" id="red-form">
    <label>Red light intensity</label>
    <input type="number" min="0" max="1" step="0.01" value="1.0">
    <input type="range" min="0" max="1" step="0.01" value="1.0">
</div>
<div class="color-form" id="green-form">
    <label>Green light intensity</label>
    <input type="number" min="0" max="1" step="0.01" value="1.0">
    <input type="range" min="0" max="1" step="0.01" value="1.0">
</div>
<div class="color-form" id="blue-form">
    <label>Blue light intensity</label>
    <input type="number" min="0" max="1" step="0.01" value="1.0">
    <input type="range" min="0" max="1" step="0.01" value="1.0">
</div>
</div>
`;

export class RGBLights extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
            
        this.intensities = { red: 1, green: 1, blue: 1 };

        this.addListeners();
    }

    addListeners() {
        this.addUpdateIntendityListener("#red-form", "red");
        this.addUpdateIntendityListener("#green-form", "green");
        this.addUpdateIntendityListener("#blue-form", "blue");
    }
    
    addUpdateIntendityListener(formId, intenrityKey) {
        const form = this.shadowRoot.querySelector(formId);
        const numberField = form.querySelector("input[type=number]");
        const slider = form.querySelector("input[type=range]");
        
        numberField.addEventListener("change", () => {
            let number = Number(numberField.value);
            if (Number.isNaN(number) || number < 0) number = 0;
            else if (number > 1) number = 1;
            numberField.value = number;
            slider.value = number;
            this.intensities[intenrityKey] = number;
        });
        
        slider.addEventListener("input", () => {
            const number = Number(slider.value);
            numberField.value = number;
            this.intensities[intenrityKey] = number;
        });
    }
}

window.customElements.define("rgb-lights", RGBLights);