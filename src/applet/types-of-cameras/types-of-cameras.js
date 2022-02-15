import Matrix4x4 from "../../framework3d/math/matrix4x4.js";
import Vector3 from "../../framework3d/math/vector3.js";
import OrthographicCamera from "../../framework3d/cameras/orthographic-camera.js";
import PerspectiveCamera from "../../framework3d/cameras/perspective-camera.js";
import SceneRenderer from "../../framework3d/renderer/scene-renderer.js";
import Object3D from "../../framework3d/core/object-3d.js";
import BoxGeometry from "../../framework3d/geometries/box-geometry.js";
import PlaneGeometry from "../../framework3d/geometries/plane-geometry.js";
import UVSphereGeometry from "../../framework3d/geometries/uv-sphere-geometry.js"
import CameraOrbitController from "../../helpers/camera-orbit-controller.js";
import CameraDrawer from "../../helpers/camera-drawer.js";
import template from "./types-of-cameras-template.js";

export class TypesOfCameras extends HTMLElement {
    #sceneView;
    #cameraSceneView;
    #cameraDrawer;
    #cameraView;
    #cameraCameraView;
    #perspective;
    #orthographic;
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.#initScene();
        this.#addListeners();
    }

    connectedCallback() {
        this.#animate();
    }

    #animate() {
        requestAnimationFrame(() => { this.#animate() });
        this.#sceneView.render(this.#cameraSceneView);
        this.#cameraDrawer.draw(this.#cameraSceneView, this.#cameraCameraView)
        this.#cameraView.render(this.#cameraCameraView);
    }

    #initScene() {
        const cube = new Object3D(new BoxGeometry());
        cube.transform = Matrix4x4.translation(-1, 0.5, 1);
        const plane = new Object3D(new PlaneGeometry());
        plane.transform = Matrix4x4.scaling(4, 1, 4);
        const octahedron = new Object3D(new UVSphereGeometry(0.5, 4, 2));
        octahedron.transform = Matrix4x4.translation(1, 0.5, -1)

        let canvas = this.shadowRoot.querySelector("#scene-view");
        this.#sceneView = new SceneRenderer(canvas, { drawWorldAxes: true, autoClear: true })
        this.#sceneView.addObject(cube);
        this.#sceneView.addObject(plane);
        this.#sceneView.addObject(octahedron);
        this.#cameraDrawer = new CameraDrawer(this.#sceneView.context);
        this.#cameraSceneView = new PerspectiveCamera(1.0, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
        new CameraOrbitController(this.#cameraSceneView, canvas, { distance: 5, xAngle: 0.5, yAngle: 2.5 });


        canvas = this.shadowRoot.querySelector("#camera-view");
        this.#cameraView = new SceneRenderer(canvas, { autoClear: true });
        this.#cameraView.addObject(cube);
        this.#cameraView.addObject(plane);
        this.#cameraView.addObject(octahedron);
        this.#perspective = new PerspectiveCamera(
            this.#getNumberFromInput("#fov"),
            this.#getNumberFromInput('#ra'),
            this.#getNumberFromInput("#zNear"),
            this.#getNumberFromInput('#zFar')
        );
        this.#orthographic = new OrthographicCamera(
            this.#getNumberFromInput("#left"),
            this.#getNumberFromInput("#right"),
            this.#getNumberFromInput("#bottom"),
            this.#getNumberFromInput("#top"),
            this.#getNumberFromInput("#zNear"),
            this.#getNumberFromInput('#zFar')
        );
        this.#cameraCameraView = this.#perspective;

        this.#updateViewLookAt();
    }

    #addListeners() {
        this.#addChangeActiveFormsListener();
        this.#addChangeActiveCameraListener();
        this.#addChangeActiveViewGeneratorListener();
        this.#addPerspectiveInputListener();
        this.#addLookAtInputListener();
        this.#addOrthographicInputListener();
        this.#addEulerInputListener();
    }

    #addChangeActiveFormsListener() {
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

    #addChangeActiveCameraListener() {
        const shadow = this.shadowRoot;
        const select = shadow.querySelector("#projection-matrix-form select");
        select.addEventListener("change", () => {
            if (select.value == "Perspective") {
                this.#cameraCameraView = this.#perspective;
            } else {
                this.#cameraCameraView = this.#orthographic;
            }
        });
    }

    #addChangeActiveViewGeneratorListener() {
        const shadow = this.shadowRoot;
        const select = shadow.querySelector("#view-matrix-form select");
        select.addEventListener("change", () => {
            if (select.value == "LookAt") {
                this.#updateViewLookAt();
            } else {
                this.#updateViewEuler();
            }
        });
    }

    #addPerspectiveInputListener() {
        const perspective = this.shadowRoot.querySelector("#perspective");
        perspective.addEventListener("input", () => { this.#updatePerspectiveProj() })
    }

    #addLookAtInputListener() {
        const lookAt = this.shadowRoot.querySelector("#look-at");
        lookAt.addEventListener("input", () => { this.#updateViewLookAt() })
    }

    #addOrthographicInputListener() {
        const ortho = this.shadowRoot.querySelector("#ortho");
        ortho.addEventListener("input", () => { this.#updateOrthographicProj() });
    }

    #addEulerInputListener() {
        const euler = this.shadowRoot.querySelector("#euler");
        euler.addEventListener("input", () => { this.#updateViewEuler() })
    }

    #updatePerspectiveProj() {
        const fov = this.#getNumberFromInput("#fov");
        const ra = this.#getNumberFromInput("#ra");
        const zNear = this.#getNumberFromInput("#zNear");
        const zFar = this.#getNumberFromInput("#zFar");
        this.#perspective.setProjectionMatrix(fov, ra, zNear, zFar);
    }

    #updateViewLookAt() {
        const obs = this.#getOBS();
        const vrp = this.#getVRP();
        const up = this.#getUP();
        this.#perspective.setViewFromLookAt(obs, vrp, up);
        this.#orthographic.setViewFromLookAt(obs, vrp, up);
    }

    #updateOrthographicProj() {
        const left = this.#getNumberFromInput('#left');
        const right = this.#getNumberFromInput('#right');
        const bottom = this.#getNumberFromInput('#bottom');
        const top = this.#getNumberFromInput('#top');
        const zNear = this.#getNumberFromInput("#zNear2");
        const zFar = this.#getNumberFromInput("#zFar2");
        this.#orthographic.setProjectionMatrix(left, right, bottom, top, zNear, zFar);
    }

    #updateViewEuler() {
        const distance = this.#getNumberFromInput("#distance");
        const phi = this.#getNumberFromInput("#phi");
        const theta = this.#getNumberFromInput("#theta");
        const psi = this.#getNumberFromInput("#psi");
        const vrp = this.#getVRP2();
        this.#perspective.setViewFromArcBall(distance, phi, theta, psi, vrp);
        this.#orthographic.setViewFromArcBall(distance, phi, theta, psi, vrp);
    }

    #getOBS() {
        const obsX = this.#getNumberFromInput("#obsX");
        const obsY = this.#getNumberFromInput("#obsY");
        const obsZ = this.#getNumberFromInput("#obsZ");
        return new Vector3(obsX, obsY, obsZ);
    }

    #getVRP() {
        const vrpX = this.#getNumberFromInput("#vrpX");
        const vrpY = this.#getNumberFromInput("#vrpY");
        const vrpZ = this.#getNumberFromInput("#vrpZ");
        return new Vector3(vrpX, vrpY, vrpZ);
    }

    #getUP() {
        const upX = this.#getNumberFromInput("#upX");
        const upY = this.#getNumberFromInput("#upY");
        const upZ = this.#getNumberFromInput("#upZ");
        return new Vector3(upX, upY, upZ);
    }

    #getVRP2() {
        const vrpX = this.#getNumberFromInput("#vrp2X");
        const vrpY = this.#getNumberFromInput("#vrp2Y");
        const vrpZ = this.#getNumberFromInput("#vrp2Z");
        return new Vector3(vrpX, vrpY, vrpZ);
    }

    #getNumberFromInput(selector) {
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