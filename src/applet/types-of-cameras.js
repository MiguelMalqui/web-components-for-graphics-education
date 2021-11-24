const template = document.createElement('template');
template.innerHTML = `

<div>
    <canvas style="background-color: red;"></canvas>
    <canvas style="background-color: blue;"></canvas>
</div>
<div>
    <div>
        <select>
            <option>Perspective</option>
            <option>Orthogonal</option>
        </select>
        <div class="container">
            <div>
                <label>FOV</label>
                <input type="number" value="39.6">
            </div>
            <div>
                <label>RA</label>
                <input type="number" value="39.6">
            </div>
            <div>
                <label>zNear</label>
                <input type="number" value="39.6">
            </div>
            <div>
                <label>zFar</label>
                <input type="number" value="39.6">
            </div>
        </div>
        <div class="container">
            <div>
                <label>left</label>
                <input type="number" value="39.6">
            </div>
            <div>
                <label>right</label>
                <input type="number" value="39.6">
            </div>
            <div>
                <label>botton</label>
                <input type="number" value="39.6">
            </div>
            <div>
                <label>top</label>
                <input type="number" value="39.6">
            </div>
            <div>
                <label>zNear</label>
                <input type="number" value="39.6">
            </div>
            <div>
                <label>zFar</label>
                <input type="number" value="39.6">
            </div>
        </div>
    </div>
    <div>
        <select>
            <option>LookAt</option>
            <option>Euler</option>
        </select>
        <div class="container">
            <div>
                <label>OBS</label>
                <input type="number" value="39.6">
                <input type="number" value="39.6">
                <input type="number" value="39.6">
            </div>
            <div>
                <label>VRP</label>
                <input type="number" value="39.6">
                <input type="number" value="39.6">
                <input type="number" value="39.6">
            </div>
            <div>
                <label>OBS</label>
                <input type="number" value="39.6">
                <input type="number" value="39.6">
                <input type="number" value="39.6">
            </div>
        </div>
        <div class="container">
            <div>
                <label>left</label>
                <input type="number" value="39.6">
            </div>
            <div>
                <label>distance</label>
                <input type="number" value="39.6">
            </div>
            <div>
                <label>phi</label>
                <input type="number" value="39.6">
            </div>
            <div>
                <label>theta</label>
                <input type="number" value="39.6">
            </div>
            <div>
                <label>psi</label>
                <input type="number" value="39.6">
            </div>
            <div>
                <label>VRP</label>
                <input type="number" value="39.6">
                <input type="number" value="39.6">
                <input type="number" value="39.6">
            </div>
        </div>
    </div>
</div>
`;

export class TypesOfCameras extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    
}


window.customElements.define('types-of-cameras', TypesOfCameras);