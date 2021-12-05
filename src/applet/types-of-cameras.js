import Matrix4x4 from "../helpers/maths/matrix4x4.js"
import Vector3 from "../helpers/maths/vector3.js";
import PerspectiveCamera from "../helpers/camera/perspective-camera.js";
import SceneRenderer from "../helpers/renderers/scene-renderer.js";
import CameraControler from "../helpers/camera/camera-controler.js";
import Scene from "../helpers/scene.js";
import OrthograficCamera from "../helpers/camera/orthographic-camera.js";
import CubeModel from "../helpers/models/cube-model.js";
import Pyramid from "../helpers/models/pyramid.js"
import PlaneModel from "../helpers/models/plane-model.js"

const template = document.createElement('template');
template.innerHTML = `
<style>
#canvases-container {
    display: flex;
    gap: 0.25rem;
}
#canvases-container>canvas {
    width: 50%;
}

@media only screen and (max-width: 576px) {
    #canvases-container {
        flex-direction: column;
    }
    #canvases-container>canvas {
        width: 100%
    }
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

<!--<canvas style="width: 100%;" width="1920" height="720"></canvas>-->
<div id="canvases-container">
    <canvas id="scene-view" width="640" height="480"></canvas>
    <canvas id="camera-view" width="640" height="480"></canvas>
</div>
<div id="settings-panel">
    <div class="matrix-form" id="projection-matrix-form">
        <select>
            <option>Perspective</option>
            <option>Orthogonal</option>
        </select>
        <div class="container active" id="persp">
            <div>
                <label>FOV</label>
                <input type="number" value="1.0" step="0.01" id="fov">
            </div>
            <div>
                <label>RA</label>
                <input type="number" value="1.33" step="0.01" id="ra">
            </div>
            <div>
                <label>zNear</label>
                <input type="number" value="0.1" step="0.01" id="znear">
            </div>
            <div>
                <label>zFar</label>
                <input type="number" value="100" step="0.01" id="zfar">
            </div>
        </div>
        <div class="container" id="ortho">
            <div>
                <label>left</label>
                <input type="number" value="-2" step="0.01" id="left">
            </div>
            <div>
                <label>right</label>
                <input type="number" value="2" step="0.01" id="right">
            </div>
            <div>
                <label>botton</label>
                <input type="number" value="-1.5" step="0.01" id="bottom">
            </div>
            <div>
                <label>top</label>
                <input type="number" value="1.5" step="0.01" id="top">
            </div>
            <div>
                <label>zNear</label>
                <input type="number" value="0.1" step="0.01" id="znear2">
            </div>
            <div>
                <label>zFar</label>
                <input type="number" value="100" step="0.01" id="zfar2">
            </div>
        </div>
    </div>
    <div class="matrix-form" id="view-matrix-form">
        <select>
            <option>LookAt</option>
            <option>Euler</option>
        </select>
        <div class="container active" id="look-at">
            <div>
                <label>OBS</label>
                <input type="number" value="0" step="0.1" id="obsx">
                <input type="number" value="0" step="0.1" id="obsy">
                <input type="number" value="5" step="0.1" id="obsz">
            </div>
            <div>
                <label>VRP</label>
                <input type="number" value="0" step="0.1" id="vrpx">
                <input type="number" value="0" step="0.1" id="vrpy">
                <input type="number" value="0" step="0.1" id="vrpz">
            </div>
            <div>
                <label>UP</label>
                <input type="number" value="0" step="0.1" id="upx">
                <input type="number" value="1" step="0.1" id="upy">
                <input type="number" value="0" step="0.1" id="upz">
            </div>
        </div>
        <div class="container" id="euler">
            <div>
                <label>distance</label>
                <input type="number" value="5" step="0.1" id="distance">
            </div>
            <div class="euler-angles-form">
                <div>
                    <label>phi</label>
                    <input type="number" value="0" step="0.01" id="phi">
                </div>
                <div>
                    <label>theta</label>
                    <input type="number" value="0" step="0.01" id="theta">
                </div>
                <div>
                    <label>psi</label>
                    <input type="number" value="0" step="0.01" id="psi">
                </div>
            </div>
            <div>
                <label>VRP</label>
                <input type="number" value="0" step="0.1" id="vrp2x">
                <input type="number" value="0" step="0.1" id="vrp2y">
                <input type="number" value="0" step="0.1" id="vrp2z">
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

        this.initScene();

        this.addListeners();

        this.updatePerpectiveProj();
        this.updateOrthographicProj();
        this.updateViewLookAt();
    }

    connectedCallback() {
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => { this.animate() });
        this.sceneView.render(this.cameraSceneView);
        this.cameraView.render(this.cameraCameraView);
    }

    initScene() {
        const scene = new Scene();
        const c1 = new CubeModel(); c1.transform.translate(-1, 0.5, 1);
        const p1 = new Pyramid(); p1.transform.translate(1, 0.5, -1);
        const t1 = new PlaneModel(); t1.transform.scale(4, 1, 4);
        scene.addModel(c1); scene.addModel(p1); scene.addModel(t1);

        let canvas = this.shadowRoot.querySelector("#scene-view");
        this.sceneView = new SceneRenderer(canvas, { scene, drawWorldAxes: true, autoClear: true });
        this.cameraSceneView = new PerspectiveCamera(1.0, canvas.clientWidth / canvas.clientHeight);
        new CameraControler(this.cameraSceneView, canvas, { distance: 5, theta: 0.2 });

        canvas = this.shadowRoot.querySelector("#camera-view");
        this.cameraView = new SceneRenderer(canvas, { scene, autoClear: true });
        this.cameraP = new PerspectiveCamera();
        this.cameraO = new OrthograficCamera()

        this.cameraCameraView = this.cameraP;
    }

    addListeners() {
        this.addChangeActiveFormsListener();
        this.addChengeActiveCameraListener();
        this.addChangeActiveViewGeneratorListener();
        this.addPerspectiveInputListener();
        this.addLookAtInputListener();
        this.addOrthographicInputListener();
        this.addEulerInputListener();
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

    addChengeActiveCameraListener() {
        const shadow = this.shadowRoot;
        const select = shadow.querySelector("#projection-matrix-form select");
        select.addEventListener("change", () => {
            if (select.value == "Perspective") {
                this.cameraCameraView = this.cameraP;
            } else {
                this.cameraCameraView = this.cameraO;
            }
        });
    }

    addChangeActiveViewGeneratorListener() {
        const shadow = this.shadowRoot;
        const select = shadow.querySelector("#view-matrix-form select");
        select.addEventListener("change", () => {
            if (select.value == "LookAt") {
                this.updateViewLookAt();
            } else {
                this.updateViewEuler();
            }
        });
    }

    addPerspectiveInputListener() {
        const persp = this.shadowRoot.querySelector("#persp");
        persp.addEventListener("input", () => { this.updatePerpectiveProj() })
    }

    addLookAtInputListener() {
        const lookAt = this.shadowRoot.querySelector("#look-at");
        lookAt.addEventListener("input", () => { this.updateViewLookAt() })
    }

    addOrthographicInputListener() {
        const ortho = this.shadowRoot.querySelector("#ortho");
        ortho.addEventListener("input", () => { this.updateOrthographicProj() });
    }

    addEulerInputListener() {
        const euler = this.shadowRoot.querySelector("#euler");
        euler.addEventListener("input", () => { this.updateViewEuler() })
    }

    updatePerpectiveProj() {
        this.cameraP.fov = this.getNumberFromInput("#fov");
        this.cameraP.ra = this.getNumberFromInput("#ra");
        this.cameraP.zNear = this.getNumberFromInput("#znear");
        this.cameraP.zFar = this.getNumberFromInput("#zfar");
        this.cameraP.updateProjectionMatrix();
    }

    updateViewLookAt() {
        const obs = this.getOBS();
        const vrp = this.getVRP();
        const up = this.getUP();
        this.cameraP.updateViewMatrixLookAt(obs, vrp, up);
        this.cameraO.updateViewMatrixLookAt(obs, vrp, up);
    }

    updateOrthographicProj() {
        this.cameraO.left = this.getNumberFromInput('#left');
        this.cameraO.right = this.getNumberFromInput('#right');
        this.cameraO.bottom = this.getNumberFromInput('#bottom');
        this.cameraO.top = this.getNumberFromInput('#top');
        this.cameraO.zNear = this.getNumberFromInput("#znear2");
        this.cameraO.zFar = this.getNumberFromInput("#zfar2");
        this.cameraO.updateProjectionMatrix();
    }

    updateViewEuler() {
        const distance = this.getNumberFromInput("#distance");
        const phi = this.getNumberFromInput("#phi");
        const theta = this.getNumberFromInput("#theta");
        const psi = this.getNumberFromInput("#psi");
        const vrp = this.getVRP2();
        this.cameraP.updateVieMatrixEulerAngles(distance, phi, theta, psi, vrp);
        this.cameraO.updateVieMatrixEulerAngles(distance, phi, theta, psi, vrp);
    }

    getOBS() {
        const obsx = this.getNumberFromInput("#obsx");
        const obsy = this.getNumberFromInput("#obsy");
        const obsz = this.getNumberFromInput("#obsz");
        return new Vector3(obsx, obsy, obsz);
    }

    getVRP() {
        const vrpx = this.getNumberFromInput("#vrpx");
        const vrpy = this.getNumberFromInput("#vrpy");
        const vrpz = this.getNumberFromInput("#vrpz");
        return new Vector3(vrpx, vrpy, vrpz);
    }

    getUP() {
        const upx = this.getNumberFromInput("#upx");
        const upy = this.getNumberFromInput("#upy");
        const upz = this.getNumberFromInput("#upz");
        return new Vector3(upx, upy, upz);
    }

    getVRP2() {
        const vrpx = this.getNumberFromInput("#vrp2x");
        const vrpy = this.getNumberFromInput("#vrp2y");
        const vrpz = this.getNumberFromInput("#vrp2z");
        return new Vector3(vrpx, vrpy, vrpz);
    }

    getNumberFromInput(selector) {
        const shadow = this.shadowRoot;
        const value = shadow.querySelector(selector).value;
        const number = Number(value);
        if (Number.isNaN(number)) {
            return 0;
        }
        return number;
    }

}


window.customElements.define('types-of-cameras', TypesOfCameras);