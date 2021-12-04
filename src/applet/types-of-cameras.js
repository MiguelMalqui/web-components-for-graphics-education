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
    // flex-wrap: wrap;
    // gap: 0.25rem;
}
#canvases-container>canvas {
    // flex-grow: 1;
    width: 50%;
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
                <input type="number" value="-1" step="0.01" id="left">
            </div>
            <div>
                <label>right</label>
                <input type="number" value="1" step="0.01" id="right">
            </div>
            <div>
                <label>botton</label>
                <input type="number" value="-1" step="0.01" id="bottom">
            </div>
            <div>
                <label>top</label>
                <input type="number" value="1" step="0.01" id="top">
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
    <div class="matrix-form">
        <select>
            <option>LookAt</option>
            <option>Euler</option>
        </select>
        <div class="container active" id="look-at">
            <div>
                <label>OBS</label>
                <input type="number" value="0" step="0.01" id="obsx">
                <input type="number" value="1" step="0.01" id="obsy">
                <input type="number" value="5" step="0.01" id="obsz">
            </div>
            <div>
                <label>VRP</label>
                <input type="number" value="0" step="0.01" id="vrpx">
                <input type="number" value="0" step="0.01" id="vrpy">
                <input type="number" value="0" step="0.01" id="vrpz">
            </div>
            <div>
                <label>UP</label>
                <input type="number" value="0" step="0.01" id="upx">
                <input type="number" value="1" step="0.01" id="upy">
                <input type="number" value="0" step="0.01" id="upz">
            </div>
        </div>
        <div class="container" id="euler">
            <div>
                <label>distance</label>
                <input type="number" value="5" step="0.01" id="distance">
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
                <input type="number" value="0" id="vrp2x">
                <input type="number" value="0" id="vrp2y">
                <input type="number" value="0" id="vrp2z">
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

        this.initScene();

        this.updatePerpectiveProj();
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
        this.addUpdateCamerasListener();
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
                console.log(select.value);
            });
        });
    }

    addUpdateCamerasListener() {
        this.addPerspectiveInputListener();
        this.addLookAtInputListener();
        this.addOrthographicInputListener();
        this.addEulerInputListener();
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
        ortho.addEventListener("input", () => {this.updateOrthographicProj()});
    }

    addEulerInputListener() {
        const euler = this.shadowRoot.querySelector("#euler");
        euler.addEventListener("input", () => {this.updateViewEuler()})
    }

    updatePerpectiveProj() {
        this.cameraP.fov = this.shadowRoot.querySelector("#fov").value;
        this.cameraP.ra = this.shadowRoot.querySelector("#ra").value;
        this.cameraP.zNear = this.shadowRoot.querySelector("#znear").value;
        this.cameraP.zFar = this.shadowRoot.querySelector("#zfar").value;
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
        this.cameraO.left = this.shadowRoot.querySelector('#left');
        this.cameraO.right = this.shadowRoot.querySelector('#right');
        this.cameraO.bottom = this.shadowRoot.querySelector('#bottom');
        this.cameraO.top = this.shadowRoot.querySelector('#top');
        this.cameraO.zNear = this.shadowRoot.querySelector("#znear2");
        this.cameraO.zFar = this.shadowRoot.querySelector("#zfar2");
        this.cameraO.updateProjectionMatrix();
    }

    updateViewEuler() {
        const distance = this.shadowRoot.querySelector("#distance");
        const phi = this.shadowRoot.querySelector("#phi");
        const theta = this.shadowRoot.querySelector("#theta");
        const psi = this.shadowRoot.querySelector("#psi");
        const vrp = this.getVRP2();
        this.cameraP.updateVieMatrixEulerAngles(distance, phi, theta, psi, vrp);
        this.cameraO.updateVieMatrixEulerAngles(distance, phi, theta, psi, vrp);
    }

    getOBS() {
        const obsx = this.shadowRoot.querySelector("#obsx").value;
        const obsy = this.shadowRoot.querySelector("#obsy").value;
        const obsz = this.shadowRoot.querySelector("#obsz").value;
        return new Vector3(obsx, obsy, obsz);
    }

    getVRP() {
        const vrpx = this.shadowRoot.querySelector("#vrpx").value;
        const vrpy = this.shadowRoot.querySelector("#vrpy").value;
        const vrpz = this.shadowRoot.querySelector("#vrpz").value;
        return new Vector3(vrpx, vrpy, vrpz);
    }

    getUP() {
        const upx = this.shadowRoot.querySelector("#upx").value;
        const upy = this.shadowRoot.querySelector("#upy").value;
        const upz = this.shadowRoot.querySelector("#upz").value;
        return new Vector3(upx, upy, upz);
    }

    getVRP2() {
        const vrpx = this.shadowRoot.querySelector("#vrp2x").value;
        const vrpy = this.shadowRoot.querySelector("#vrp2y").value;
        const vrpz = this.shadowRoot.querySelector("#vrp2z").value;
        return new Vector3(vrpx, vrpy, vrpz);
    }

}


window.customElements.define('types-of-cameras', TypesOfCameras);