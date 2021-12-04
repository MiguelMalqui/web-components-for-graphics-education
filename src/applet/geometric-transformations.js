import Matrix4x4 from "../helpers/maths/matrix4x4.js"
import Vector3 from "../helpers/maths/vector3.js";
import PerspectiveCamera from "../helpers/camera/perspective-camera.js";
import CubeModel from "../helpers/models/cube-model.js";
import SceneRenderer from "../helpers/renderers/scene-renderer.js";
import CameraControler from "../helpers/camera/camera-controler.js";

const template = document.createElement('template');
template.innerHTML = `
<style>
canvas {
    width: 100%;
}

#formula-container {
    text-align: center;
    padding: 2rem;
}

.delete-button {
    font-family: 'Helvetica', 'Arial', sans-serif;
    padding: 0rem 0.5rem;
    margin-right: 0.5rem;
    cursor: pointer;
}
.delete-button:hover {
    opacity: .5;
}

#geom-trans-container {
    padding: 1rem 0.5rem;
}
#geom-trans-container input[type=number] {
    width: 2.5rem;
}

.draggable {
    cursor: move;
    background-color: #f1f1f1;
    padding: 0.4rem;
    margin: 0.5rem 0rem;
}
.draggable:first-child {
    margin-top: 0rem;
}
.draggable:last-child {
    margin-bottom: 0rem;
}
.draggable.dragging {
    opacity: .5;
}

</style>

<canvas width="1280" height="720"></canvas>
<div id="formula-container">vertexWorldSpace = vertex</div>
<div>
    <div>
        <button class="btn primary-btn" id="add-translate-button">+ Translate</button>
        <button class="btn primary-btn" id="add-rotate-button">+ Rotate</button>
        <button class="btn primary-btn" id="add-scale-button">+ Scale</button>
    </div>
    <div id="geom-trans-container">
    </div>
</div>
`;

const translateTmpl = document.createElement('template');
translateTmpl.innerHTML = `
<div class="draggable" draggable="true">
    <span class="delete-button">✕</span>
    <span class="geom-trans-id">T</span> = translate(
        <input type="number" value="0" step="0.1">,
        <input type="number" value="0" step="0.1">,
        <input type="number" value="0" step="0.1">
    );
</div>
`;

const rotateTmpl = document.createElement('template');
rotateTmpl.innerHTML = `
<div class="draggable" draggable="true">
    <span class="delete-button">✕</span>
    <span class="geom-trans-id">R</span> = rotate(
        <input type="number" value="0" step="0.1">,
        <input type="number" value="0" step="0.1">,
        <input type="number" value="1" step="0.1">,
        <input type="number" value="0" step="0.1">
    );
</div>
`;

const scaleTmpl = document.createElement('template');
scaleTmpl.innerHTML = `
<div class="draggable" draggable="true">
    <span class="delete-button">✕</span>
    <span class="geom-trans-id">S</span> = scale(
        <input type="number" value="1" step="0.1">,
        <input type="number" value="1" step="0.1">,
        <input type="number" value="1" step="0.1">
    );
</div>
`;

export class GeometricTransformations extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.transformCounter = 0;

        this.addListeners();

        this.initScene();

        this.shadowRoot.querySelector('#add-scale-button').click();
        this.shadowRoot.querySelector('#add-rotate-button').click();
        this.shadowRoot.querySelector('#add-translate-button').click();
    }

    connectedCallback() {
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => { this.animate() });
        this.renderer.render(this.camera);
    }

    initScene() {
        const canvas = this.shadowRoot.querySelector('canvas');

        const ra = canvas.clientWidth / canvas.clientHeight;
        this.camera = new PerspectiveCamera(1.0, ra, 0.1, 100);
        new CameraControler(this.camera, canvas, { distance: 5 });

        this.renderer = new SceneRenderer(canvas, {
            autoClear: true,
            drawWorldAxes: true,
            drawObjectsAxes: true
        });

        this.cube = new CubeModel();
        this.renderer.addModel(this.cube);
    }

    addListeners() {
        this.addButtonsListeners();
        this.addDragListListeners();
    }

    addButtonsListeners() {
        const addTBtn = this.shadowRoot.querySelector('#add-translate-button');
        const addRBtn = this.shadowRoot.querySelector('#add-rotate-button');
        const addSBtn = this.shadowRoot.querySelector('#add-scale-button');
        addTBtn.addEventListener('click', () => this.addGeomTrans(translateTmpl));
        addRBtn.addEventListener('click', () => this.addGeomTrans(rotateTmpl));
        addSBtn.addEventListener('click', () => this.addGeomTrans(scaleTmpl));
    }

    addGeomTrans(template) {
        const geomTrans = template.content.firstElementChild.cloneNode(true);
        const geomTransId = geomTrans.querySelector('.geom-trans-id');
        geomTransId.innerHTML += (++this.transformCounter);

        const container = this.shadowRoot.querySelector('#geom-trans-container');
        container.prepend(geomTrans);
        this.updateModelTransformation();

        this.addDragGeomTransListener(geomTrans);
        this.addDeleteGeomTransListener(geomTrans);
        this.addInputGeomTransListener(geomTrans);
    }

    addDragGeomTransListener(geomTrans) {
        geomTrans.addEventListener('dragstart', () => {
            geomTrans.classList.add('dragging');
        });
        geomTrans.addEventListener('dragend', () => {
            geomTrans.classList.remove('dragging');
            this.updateModelTransformation();
        });
    }

    addDeleteGeomTransListener(geomTrans) {
        const deleteButton = geomTrans.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            geomTrans.remove();
            this.updateModelTransformation();
        });
    }

    addInputGeomTransListener(geomTrans) {
        geomTrans.addEventListener('input', () => {
            this.updateModelTransformationMatrix();
        });
    }

    addDragListListeners() {
        const container = this.shadowRoot.querySelector('#geom-trans-container');
        container.addEventListener('dragover', (e) => {
            e.preventDefault();
            const afterElement = this.getDragAfterElement(e.clientY);
            const draggingElement = this.shadowRoot.querySelector('.dragging');
            if (!afterElement) {
                container.appendChild(draggingElement);
            } else {
                container.insertBefore(draggingElement, afterElement);
            }
        });
    }

    getDragAfterElement(y) {
        const shadow = this.shadowRoot;
        const draggableElements = shadow.querySelectorAll('.draggable:not(.dragging)');
        let afterElement;
        let minYDistance;
        let maxY;
        draggableElements.forEach(element => {
            const box = element.getBoundingClientRect();
            const elementCenter = box.top + box.height / 2;
            const yDistance = Math.abs(y - elementCenter);
            if (!minYDistance || yDistance < minYDistance) {
                minYDistance = yDistance;
                afterElement = element;
            }
            maxY = box.bottom;
        });
        if (maxY && y > maxY) {
            afterElement = null;
        }
        return afterElement;
    }

    updateModelTransformation() {
        this.updateModelTransformationFormula();
        this.updateModelTransformationMatrix();
    }

    updateModelTransformationMatrix() {
        const tranfroms = this.shadowRoot.querySelectorAll('.draggable');
        const matrix = new Matrix4x4();
        tranfroms.forEach(transform => {
            const type = transform.querySelector('.geom-trans-id').innerHTML[0];
            const inputs = transform.querySelectorAll('input');
            const args = [...inputs].map(input => input.value);
            switch (type) {
                case 'T':
                    matrix.translate(args[0], args[1], args[2]);
                    break;
                case 'S':
                    matrix.scale(args[0], args[1], args[2]);
                    break;
                case 'R':
                    matrix.rotate(args[0], args[1], args[2], args[3]);
                    break;
            }
        })
        this.cube.transform = matrix;

    }

    updateModelTransformationFormula() {
        const geomTransIds = this.shadowRoot.querySelectorAll('.geom-trans-id');
        let geomTrans = '';
        geomTransIds.forEach(gt => geomTrans += `${gt.innerHTML} * `);
        const formulaContainer = this.shadowRoot.querySelector('#formula-container');
        formulaContainer.innerHTML = `vertexWorldSpace = ${geomTrans}vertex`
    }
}


window.customElements.define('geometric-transformations', GeometricTransformations);