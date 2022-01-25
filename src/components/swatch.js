import Color from '../framework3d/math/color.js'

const template = document.createElement('template');
template.innerHTML = `
<style>
div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 7rem;
    background-color: #ff0000;
}
</style>

<div>Swatch</div>
`;

export default class Swatch extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.setText(this.getAttribute('text'));

        this.color = new Color();
    }

    /**
     * 
     * @param {Color} color 
     */
    setColor(color) {
        this.color = color;
        const swatch = this.shadowRoot.querySelector('div');
        swatch.style.backgroundColor = color.cssRGB();
        const luminance = color.luminance();
        const textColor = (luminance > 0.5) ? 'black' : 'white';
        swatch.style.color = textColor;
    }

    /**
     * 
     * @returns 
     */
    getColor() {
        return this.color;
    }

    /**
     * 
     * @param {string} text 
     */
    setText(text) {
        const swatch = this.shadowRoot.querySelector('div');
        swatch.innerHTML = text;
    }
}

window.customElements.define('my-swatch', Swatch);