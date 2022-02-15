import Matrix4x4 from "../../framework3d/math/matrix4x4.js";
import PerspectiveCamera from "../../framework3d/cameras/perspective-camera.js";
import SceneRenderer from "../../framework3d/renderer/scene-renderer.js";
import Object3D from "../../framework3d/core/object-3d.js";
import PlaneGeometry from "../../framework3d/geometries/plane-geometry.js";
import UVSphereGeometry from "../../framework3d/geometries/uv-sphere-geometry.js";
import CameraOrbitController from "../../helpers/camera-orbit-controller.js";
import RGBLightsShader from "./rbg-lights-shader.js";
import template from "./rgb-light-template.js";

export class RGBLights extends HTMLElement {
    #intensities;
    #intensitiesLocs;
    #renderer;
    #camera;
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.#initIntensities();
        this.#initScene();
        this.#initIntensitiesLocs();

        this.#addListeners();
    }

    connectedCallback() {
        this.#animate();
    }

    #animate() {
        requestAnimationFrame(() => { this.#animate() });
        const gl = this.#renderer.context;
        const program = this.#renderer.program;

        gl.useProgram(program);
        gl.uniform1f(this.#intensitiesLocs.red, this.#intensities.red);
        gl.uniform1f(this.#intensitiesLocs.green, this.#intensities.green);
        gl.uniform1f(this.#intensitiesLocs.blue, this.#intensities.blue);
        this.#renderer.render(this.#camera );
    }

    #initIntensities() {
        const root = this.shadowRoot;

        this.#intensities = {
            red: Number(root.querySelector("#red-input").value),
            green: Number(root.querySelector("#green-input").value),
            blue: Number(root.querySelector("#blue-input").value)
        };
    }

    #initScene() {
        const sphere = new Object3D(new UVSphereGeometry());
        const plane = new Object3D(new PlaneGeometry());
        plane.transform = Matrix4x4.translation(0, -0.5, 0).scale(2, 1, 2);

        const canvas = this.shadowRoot.querySelector("canvas");
        this.#renderer = new SceneRenderer(canvas, {
            autoClear: true,
            vShader: RGBLightsShader.vert,
            fShader: RGBLightsShader.frag
        });

        this.#renderer.addObject(plane);
        this.#renderer.addObject(sphere);
        this.#camera = new PerspectiveCamera(1.0, canvas.clientWidth / canvas.clientHeight);
        new CameraOrbitController(this.#camera , canvas, { distance: 2, xAngle: 0.5 });
    }

    #initIntensitiesLocs() {
        const gl = this.#renderer.context;
        const program = this.#renderer.program;

        this.#intensitiesLocs = {
            red: gl.getUniformLocation(program, "intensityR"),
            green: gl.getUniformLocation(program, "intensityG"),
            blue: gl.getUniformLocation(program, "intensityB")
        };
    }

    #addListeners() {
        this.#addUpdateIntensityListener("#red-form", "red");
        this.#addUpdateIntensityListener("#green-form", "green");
        this.#addUpdateIntensityListener("#blue-form", "blue");
    }

    #addUpdateIntensityListener(formId, intensityKey) {
        const form = this.shadowRoot.querySelector(formId);
        const numberInput = form.querySelector("input[type=number]");
        const slider = form.querySelector("input[type=range]");

        numberInput.addEventListener("change", () => {
            let number = Number(numberInput.value);
            if (Number.isNaN(number) || number < 0) number = 0;
            else if (number > 1) number = 1;
            numberInput.value = number;
            slider.value = number;
            this.#intensities[intensityKey] = number;
        });

        slider.addEventListener("input", () => {
            const number = Number(slider.value);
            numberInput.value = number;
            this.#intensities[intensityKey] = number;
        });
    }
}

window.customElements.define("rgb-lights", RGBLights);