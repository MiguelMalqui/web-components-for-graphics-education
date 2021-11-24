const template = document.createElement('template');
template.innerHTML = `
<style>
#canvases-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
}
#canvases-container>canvas {
    flex-grow: 1;
}

#settings-panel {
    margin-top: 1.5rem;
}
.matrix-form {
    padding: 0.5rem;
}

.container {
    display: none;
}
.container.active {
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 2rem;
}
.container>div {
    padding-right: 1rem;
}
.container>div:last-child {
    padding-right: 0rem;
}
.euler-angles-form {
    display: flex;
    gap: 1rem;
}

input[type=number] {
    width: 3rem;
}
</style>

<div id="canvases-container">
    <canvas style="background-color: red;"></canvas>
    <canvas style="background-color: blue;"></canvas>
</div>
<div id="settings-panel">
    <div class="matrix-form" id="projection-matrix-form">
        <select>
            <option>Perspective</option>
            <option>Orthogonal</option>
        </select>
        <div class="container active">
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
    <div class="matrix-form" id="view-matrix-form">
        <select>
            <option>LookAt</option>
            <option>Euler</option>
        </select>
        <div class="container active">
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
                <label>distance</label>
                <input type="number" value="39.6">
            </div>
            <div class="euler-angles-form">
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
        
        this.addListeners();
    }

    addListeners() {
        this.addChangeActiveFormsListener();
    }

    addChangeActiveFormsListener() {
        const forms = this.shadowRoot.querySelectorAll('.matrix-form');
        forms.forEach(form => {
            const select = form.querySelector('select');
            const containers = form.querySelectorAll('.container');
            select.addEventListener('change', () => {
                containers.forEach(container => {
                    container.classList.remove('active');
                });
                containers[select.selectedIndex].classList.add('active');
            });
        });
    }
    
}


window.customElements.define('types-of-cameras', TypesOfCameras);