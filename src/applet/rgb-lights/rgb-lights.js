import Matrix4x4 from "../../framework3d/math/matrix4x4.js";
import PerspectiveCamera from "../../framework3d/cameras/perspective-camera.js";
import SceneRenderer from "../../framework3d/renderer/scene-renderer.js";
import Object3D from "../../framework3d/core/object-3d.js";
import PlaneGeometry from "../../framework3d/geometries/plane-geometry.js";
import UVSphereGeometry from "../../framework3d/geometries/uv-sphere-geometry.js";

import CameraControler from "../../helpers/camera/camera-controler.js";
import RGBLightsShader from "./rbg-lights-shader.js";

const template = document.createElement("template");
template.innerHTML = `
<style>
canvas {
    width: 100%;
}

#settings-panel {
    padding: 0.5rem;
}

.intensity-form {
    display: flex;
}
.intensity-form>label {
    width: 8.3rem;
    display: flex;
    align-items: center;
}
.intensity-form>input[type=number] {
    width: 2.5rem;
    margin: 0.2rem 1rem;
}
.intensity-form>input[type=range] {
    flex-grow: 1;
}
</style>

<canvas width="1024" height="576"></canvas>
<div id="settings-panel">
<div class="intensity-form" id="red-form">
    <label>Red light intensity</label>
    <input type="number" min="0" max="1" step="0.01" value="1.0">
    <input type="range" min="0" max="1" step="0.01" value="1.0">
</div>
<div class="intensity-form" id="green-form">
    <label>Green light intensity</label>
    <input type="number" min="0" max="1" step="0.01" value="1.0">
    <input type="range" min="0" max="1" step="0.01" value="1.0">
</div>
<div class="intensity-form" id="blue-form">
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

        this.intensities = { red: 1, green: 1, blue: 1 };

        this.initScene();

        this.addListeners();
    }

    connectedCallback() {
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => { this.animate() });
        const gl = this.renderer.context;
        const program = this.renderer.program;
        
        const inetensityRLoc = gl.getUniformLocation(program, "intensityR");
        const inetensityGLoc = gl.getUniformLocation(program, "intensityG");
        const inetensityBLoc = gl.getUniformLocation(program, "intensityB");
        
        gl.useProgram(program);
        gl.uniform1f(inetensityRLoc, this.intensities.red);
        gl.uniform1f(inetensityGLoc, this.intensities.green);
        gl.uniform1f(inetensityBLoc, this.intensities.blue);
        this.renderer.render(this.camera);
    }

    initScene() {
        const sphere = new Object3D(new UVSphereGeometry()); // new Sphere(Color.makeRGB(255,0,0), 20, 10);
        const plane = new Object3D(new PlaneGeometry()); plane.transform = Matrix4x4.translation(0, -0.5, 0).scale(2, 1, 2);// new PlaneModel(); plane.transform = Matrix4x4.translation(0, -0.5, 0).scale(2, 1, 2);
        // const scene = new Scene();
        // scene.addModel(sphere); scene.addModel(plane);

        const canvas = this.shadowRoot.querySelector("canvas");
        this.renderer = new SceneRenderer(canvas, { 
            autoClear: true,
            vShader: RGBLightsShader.vert,
            fShader: RGBLightsShader.frag
        });

        // this.renderer.addObject(sphere);
        this.renderer.addObject(plane);
        this.renderer.addObject(sphere);
        this.camera = new PerspectiveCamera(1.0, canvas.clientWidth / canvas.clientHeight);
        new CameraControler(this.camera, canvas, { distance: 2, theta: 0.5});
        // console.log(this.camera);
    }

    addListeners() {
        this.addUpdateIntendityListener("#red-form", "red");
        this.addUpdateIntendityListener("#green-form", "green");
        this.addUpdateIntendityListener("#blue-form", "blue");
    }

    addUpdateIntendityListener(formId, intenrityKey) {
        const form = this.shadowRoot.querySelector(formId);
        const numberField = form.querySelector("input[type=number]");
        const slider = form.querySelector("input[type=range]");

        numberField.addEventListener("change", () => {
            let number = Number(numberField.value);
            if (Number.isNaN(number) || number < 0) number = 0;
            else if (number > 1) number = 1;
            numberField.value = number;
            slider.value = number;
            this.intensities[intenrityKey] = number;
        });

        slider.addEventListener("input", () => {
            const number = Number(slider.value);
            numberField.value = number;
            this.intensities[intenrityKey] = number;
        });
    }
}

window.customElements.define("rgb-lights", RGBLights);