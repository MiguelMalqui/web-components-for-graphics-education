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
    }
}

window.customElements.define("rgb-lights", RGBLights);