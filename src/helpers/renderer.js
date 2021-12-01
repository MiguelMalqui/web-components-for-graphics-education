/** @type {WebGL2RenderingContext} */

import { initWebGL2Context, initShaderProgram } from "./webgl-utils.js";
import Model from "../helpers/models/model.js";
import basicShader from "./shaders/basic-shader.js";
import Matrix4x4 from "./maths/matrix4x4.js";
import Camera from "./camera/camera.js"
import Scene from "./scene.js";


export default class Renderer {
    /**
     * 
     * @param {*} config 
     */
    constructor(config = {}) {
        this.canvas = config.canvas ? config.canvas : document.createElement("canvas");
        this.scene = config.scene ? config.scene : new Scene();

        this.context = initWebGL2Context(this.canvas);
        this.program = initShaderProgram(
            this.context,
            config.vShader ? config.vShader : basicShader.vert,
            config.fShader ? config.fShader : basicShader.frag
        );

        this.autoClear = config.autoClear ? config.autoClear : true;

        // get attribute locations
        this.positionLoc = this.context.getAttribLocation(this.program, "position");
        this.normalLoc = this.context.getAttribLocation(this.program, "normal");
        this.colorLoc = this.context.getAttribLocation(this.program, "color");
        // get uniform locations
        this.modelMatrixLoc = this.context.getUniformLocation(this.program, "modelMatrix");
        this.viewMatrixLoc = this.context.getUniformLocation(this.program, "viewMatrix");
        this.projectionMatrixLoc = this.context.getUniformLocation(this.program, "projectionMatrix");

        this.VAOs = this.#createModelsVAOsArray(this.scene.models);
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     */
    setViewport(x, y, width, height) {
        this.context.viewport(x, y, width, height);
    }

    clear() {
        const gl = this.context;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    /**
     * 
     * @param {Camera} camera 
     */
    render(camera) {
        const gl = this.context;

        if (this.autoClear) {
            this.clear();
        }

        gl.useProgram(this.program);

        if (this.projectionMatrixLoc) {
            gl.uniformMatrix4fv(this.projectionMatrixLoc, false, camera.projectionMatrix.elements);
        }
        if (this.viewMatrixLoc) {
            gl.uniformMatrix4fv(this.viewMatrixLoc, false, camera.viewMatrix.elements);
        }

        this.#drawScene();
    }

    addModel(model) {
        this.scene.addModel(model);
        const VAO = this.#createModelVAO(model);
        this.VAOs.push(VAO); 
    }

    #drawScene() {
        const gl = this.context;

        const models = this.scene.models;
        for (let i = 0; i < models.length; i++) {
            if (this.modelMatrixLoc) {
                gl.uniformMatrix4fv(this.modelMatrixLoc, false, models[i].transform.elements);
            }
            gl.bindVertexArray(this.VAOs[i]);
            gl.drawArrays(gl.TRIANGLES, 0, models[i].numVertices);
            gl.bindVertexArray(null);
        }
    }

    #createModelsVAOsArray(models) {
        const VAOs = [];
        models.forEach(model => {
            const VAO = this.#createModelVAO(model);
            VAOs.push(VAO);
        });
        return VAOs;
    }

    #createModelVAO(model) {
        const gl = this.context;

        // create Vertex Array Object of the model
        const VAO = gl.createVertexArray();
        gl.bindVertexArray(VAO);

        // create Vertes Buffer Objects to store model's data
        if (this.positionLoc >= 0) {
            const positionsVBO = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, positionsVBO);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.positions), gl.STATIC_DRAW);
            gl.vertexAttribPointer(this.positionLoc, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(this.positionLoc);
        }
        if (this.normalLoc >= 0) {
            const normalsVBO = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, normalsVBO);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.normals), gl.STATIC_DRAW);
            gl.vertexAttribPointer(this.normalLoc, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(this.normalLoc);
        }
        if (this.colorLoc >= 0) {
            const colorsVBO = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, colorsVBO);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.colors), gl.STATIC_DRAW);
            gl.vertexAttribPointer(this.colorLoc, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(this.colorLoc);
        }

        // unbind VAO
        gl.bindVertexArray(null);

        return VAO;
    }
}