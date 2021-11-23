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

<canvas style="background-color: black;"></canvas>
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
        <input type="number" value="0">,
        <input type="number" value="0">,
        <input type="number" value="0">
    );
</div>
`;

const rotateTmpl = document.createElement('template');
rotateTmpl.innerHTML = `
<div class="draggable" draggable="true">
    <span class="delete-button">✕</span>
    <span class="geom-trans-id">R</span> = rotate(
        <input type="number" value="0">,
        <input type="number" value="0">,
        <input type="number" value="0">,
        <input type="number" value="0">
    );
</div>
`;

const scaleTmpl = document.createElement('template');
scaleTmpl.innerHTML = `
<div class="draggable" draggable="true">
    <span class="delete-button">✕</span>
    <span class="geom-trans-id">S</span> = scale(
        <input type="number" value="1">,
        <input type="number" value="1">,
        <input type="number" value="1">
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

        this.shadowRoot.querySelector('#add-scale-button').click();
        this.shadowRoot.querySelector('#add-rotate-button').click();
        this.shadowRoot.querySelector('#add-translate-button').click();

    }

    addListeners() {
        this.addButtonsListeners();
        this.addDragListListeners();
    }

    addButtonsListeners() {
        const addTBtn = this.shadowRoot.querySelector('#add-translate-button');
        const addRBtn = this.shadowRoot.querySelector('#add-rotate-button');
        const addSBtn = this.shadowRoot.querySelector('#add-scale-button');
        addTBtn.addEventListener('click', () => this.addGeometricTranformation(translateTmpl));
        addRBtn.addEventListener('click', () => this.addGeometricTranformation(rotateTmpl));
        addSBtn.addEventListener('click', () => this.addGeometricTranformation(scaleTmpl));
    }

    addGeometricTranformation(template) {
        const geomTrans = template.content.firstElementChild.cloneNode(true);
        const geomTransId = geomTrans.querySelector('.geom-trans-id');
        geomTransId.innerHTML += (++this.transformCounter);
        const container = this.shadowRoot.querySelector('#geom-trans-container');
        container.prepend(geomTrans);
        this.updateFormula();

        this.addDragListeners(geomTrans);
        this.addDeleteListener(geomTrans);
    }

    addDragListeners(element) {
        element.addEventListener('dragstart', () => {
            element.classList.add('dragging');
        });
        element.addEventListener('dragend', () => {
            element.classList.remove('dragging');
            this.updateFormula();
        });
    }

    addDeleteListener(element) {
        const deleteButton = element.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            element.remove();
            this.updateFormula();
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

    updateFormula() {
        const geomTransIds = this.shadowRoot.querySelectorAll('.geom-trans-id');
        let geomTrans = '';
        geomTransIds.forEach(gt => geomTrans += `${gt.innerHTML} * `);
        const formulaContainer = this.shadowRoot.querySelector('#formula-container');
        formulaContainer.innerHTML = `vertexWorldSpace = ${geomTrans}vertex`
    }

    getDragAfterElement(y) {
        const draggableElements = this.shadowRoot.querySelectorAll('.draggable:not(.dragging)');
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
}


window.customElements.define('geometric-transformations', GeometricTransformations);