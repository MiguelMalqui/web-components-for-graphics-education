import Object3D from "../../framework3d/core/object-3d.js";
import SceneRenderer from "../../framework3d/renderer/scene-renderer.js";
import UVSphereGeometry from "../../framework3d/geometries/uv-sphere-geometry.js";
import template from "./template.js";
import PerspectiveCamera from "../../framework3d/cameras/perspective-camera.js";
import CameraControler from "../../helpers/camera/camera-controler.js";
import phongShader from "./phong-shader.js";

export default class PhongShading extends HTMLElement {
    #lightModeSelect;
    #lightPositionInputX;
    #lightPositionInputY;
    #lightPositionInputZ;
    #lightAmbientInput;
    #lightDiffuseInput;
    #lightSpecularInput;
    #matAmbientInput;
    #matDiffuseInput;
    #matSpecularInput;
    #matShininessInput;

    #isCameraLight;
    #lightAmbient;
    #lightDiffuse;
    #lightSpecular;
    #lightPosition;
    #matAmbient;
    #matDiffuse;
    #matSpecular;
    #matShininess;

    #isCameraLightLoc;
    #lightAmbientLoc;
    #lightDiffuseLoc;
    #lightSpecularLoc;
    #lightPositionLoc;
    #matAmbientLoc;
    #matDiffuseLoc;
    #matSpecularLoc;
    #matShininessLoc;

    #renderer;
    #camera;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.#initElementVariables();
        this.#initDataVariables();
        this.#initScene();
        this.#initUniformLocationVariables();

        this.#addListeners();
    }

    connectedCallback() {
        this.#animate();
    }

    #animate() {
        requestAnimationFrame(() => { this.#animate() });

        const gl = this.#renderer .context;
        const program = this.#renderer .program;
        gl.useProgram(program);
        gl.uniform1i(this.#isCameraLightLoc, this.#isCameraLight)
        gl.uniform3fv(this.#lightAmbientLoc, this.#lightAmbient);
        gl.uniform3fv(this.#lightDiffuseLoc, this.#lightDiffuse);
        gl.uniform3fv(this.#lightSpecularLoc, this.#lightSpecular);
        gl.uniform3fv(this.#lightPositionLoc, this.#lightPosition);
        gl.uniform3fv(this.#matAmbientLoc, this.#matAmbient);
        gl.uniform3fv(this.#matDiffuseLoc, this.#matDiffuse);
        gl.uniform3fv(this.#matSpecularLoc, this.#matSpecular);
        gl.uniform1f(this.#matShininessLoc, this.#matShininess);
        this.#renderer .render(this.#camera );
    }

    #initElementVariables() {
        const root = this.shadowRoot;
        this.#lightModeSelect = root.querySelector("#light-mode-select");
        this.#lightPositionInputX = root.querySelector("#light-pos-x");
        this.#lightPositionInputY = root.querySelector("#light-pos-y");
        this.#lightPositionInputZ = root.querySelector("#light-pos-z");
        this.#lightAmbientInput = root.querySelector("#light-ambient-input");
        this.#lightDiffuseInput = root.querySelector("#light-diffuse-input");
        this.#lightSpecularInput = root.querySelector("#light-specular-input");
        this.#matAmbientInput = root.querySelector("#mat-ambient-input");
        this.#matDiffuseInput = root.querySelector("#mat-diffuse-input");
        this.#matSpecularInput = root.querySelector("#mat-specular-input");
        this.#matShininessInput = root.querySelector("#mat-shininess-input");
    }

    #initDataVariables() {
        this.#isCameraLight = this.#lightModeSelect.value == "camera";
        this.#lightAmbient = PhongShading.#hexColorToRGBArray(this.#lightAmbientInput.value);
        this.#lightDiffuse = PhongShading.#hexColorToRGBArray(this.#lightDiffuseInput.value);
        this.#lightSpecular = PhongShading.#hexColorToRGBArray(this.#lightSpecularInput.value);
        this.#lightPosition = this.#getLightPosition();
        this.#matAmbient = PhongShading.#hexColorToRGBArray(this.#matAmbientInput.value);
        this.#matDiffuse = PhongShading.#hexColorToRGBArray(this.#matDiffuseInput.value);
        this.#matSpecular = PhongShading.#hexColorToRGBArray(this.#matSpecularInput.value);
        this.#matShininess = Number(this.#matShininessInput.value);
    }

    #initScene() {
        const canvas = this.shadowRoot.querySelector("canvas");
        this.#renderer  = new SceneRenderer(canvas, {
            vShader: phongShader.vert,
            fShader: phongShader.frag,
            autoClear: true,
            drawWorldAxes: true
        });
        this.#renderer .addObject(new Object3D(new UVSphereGeometry()));
        this.#camera  = new PerspectiveCamera(
            1.0, canvas.clientWidth / canvas.clientHeight
        );
        new CameraControler(this.#camera , canvas, { distance: 2 });
    }

    #initUniformLocationVariables() {
        const gl = this.#renderer .context;
        const program = this.#renderer .program;
        this.#isCameraLightLoc = gl.getUniformLocation(program, "isCameraLight");
        this.#lightAmbientLoc = gl.getUniformLocation(program, "lightAmbient");
        this.#lightDiffuseLoc = gl.getUniformLocation(program, "lightDiffuse");
        this.#lightSpecularLoc = gl.getUniformLocation(program, "lightSpecular");
        this.#lightPositionLoc = gl.getUniformLocation(program, "lightPosition");
        this.#matAmbientLoc = gl.getUniformLocation(program, "matAmbient");
        this.#matDiffuseLoc = gl.getUniformLocation(program, "matDiffuse");
        this.#matSpecularLoc = gl.getUniformLocation(program, "matSpecular");
        this.#matShininessLoc = gl.getUniformLocation(program, "matShininess");
    }

    #addListeners() {
        this.#lightModeSelect.addEventListener("change", () => {
            const b = this.#lightModeSelect.value == "camera";
            this.#lightPositionInputX.disabled = b;
            this.#lightPositionInputY.disabled = b;
            this.#lightPositionInputZ.disabled = b;
            this.#isCameraLight = b;
        });
        this.#lightAmbientInput.addEventListener("input", () => { this.#lightAmbient = PhongShading.#hexColorToRGBArray(this.#lightAmbientInput.value) });
        this.#lightDiffuseInput.addEventListener("input", () => { this.#lightDiffuse = PhongShading.#hexColorToRGBArray(this.#lightDiffuseInput.value) });
        this.#lightSpecularInput.addEventListener("input", () => { this.#lightSpecular = PhongShading.#hexColorToRGBArray(this.#lightSpecularInput.value) });
        this.#lightPositionInputX.addEventListener("input", () => { this.#lightPosition = this.#getLightPosition() });
        this.#lightPositionInputY.addEventListener("input", () => { this.#lightPosition = this.#getLightPosition() });
        this.#lightPositionInputZ.addEventListener("input", () => { this.#lightPosition = this.#getLightPosition() });
        this.#matAmbientInput.addEventListener("input", () => { this.#matAmbient = PhongShading.#hexColorToRGBArray(this.#matAmbientInput.value) });
        this.#matDiffuseInput.addEventListener("input", () => { this.#matDiffuse = PhongShading.#hexColorToRGBArray(this.#matDiffuseInput.value) });
        this.#matSpecularInput.addEventListener("input", () => { this.#matSpecular = PhongShading.#hexColorToRGBArray(this.#matSpecularInput.value) });
        this.#matShininessInput.addEventListener("input", () => { this.#matShininess = Number(this.#matShininessInput.value) });
    }

    #getLightPosition() {
        return [
            Number(this.#lightPositionInputX.value),
            Number(this.#lightPositionInputY.value),
            Number(this.#lightPositionInputZ.value),
        ];
    }

    static #hexColorToRGBArray(string) {
        const r = parseInt(string.substring(1, 3), 16) / 255;
        const g = parseInt(string.substring(3, 5), 16) / 255;
        const b = parseInt(string.substring(5, 7), 16) / 255;
        return [r, g, b];
    }

}

window.customElements.define("phong-shading", PhongShading);