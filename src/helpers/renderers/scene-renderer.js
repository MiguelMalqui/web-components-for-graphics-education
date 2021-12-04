/** @type {WebGL2RenderingContext} */

import Model from "../models/model.js";
import basicShader from "../shaders/basic-shader.js";
import Matrix4x4 from "../maths/matrix4x4.js";
import Camera from "../camera/camera.js"
import Scene from "../scene.js";
import AxesRenderer from "./axes-renderer.js";
import Renderer from "./renderer.js";
import Vector3 from "../maths/vector3.js";


export default class SceneRenderer extends Renderer {
    #VAOs;
    #axerRenderer;
    /**
     * 
     * @param {HTMLCanvasElement} canvas - where renderer will draw
     * @param {Object} params 
     * @param {string} [params.vShader] - vertex shader
     * @param {string} [params.fShader] - fragment shader
     * @param {Scene} [params.scene] - scene to be rendered
     * @param {boolean} [params.autoClear] - clear befor render, default is false
     * @param {boolean} [params.drawWorldAxes] - draw wordl axes, default is false
     * @param {boolean} [params.drawObjectsAxes] - draw axes for each object, default is false
     */
    constructor(canvas, params = {}) {
        super(
            canvas, 
            params.vShader ? params.vShader : basicShader.vert,
            params.fShader ? params.fShader : basicShader.frag
        );

        /**
         * scene to be rendered
         * @type {Scene}
         */
        this.scene = params.scene ? params.scene : new Scene();
        this.scene.addObserver(this);
        /**
         * @type {boolean}
         */
        this.autoClear = params.autoClear ? params.autoClear : false;
        /**
         * @type {boolean}
         */
        this.drawWorldAxes = params.drawWorldAxes ? params.drawWorldAxes : false;
        /**
         * @type {boolean}
         */
        this.drawObjectsAxes = params.drawObjectsAxes ? params.drawObjectsAxes : false;
        
        const gl = this.context;
        // get attribute locations
        this.positionLoc = gl.getAttribLocation(this.program, "position");
        this.normalLoc = gl.getAttribLocation(this.program, "normal");
        this.colorLoc = gl.getAttribLocation(this.program, "color");
        // get uniform locations
        this.modelMatrixLoc = gl.getUniformLocation(this.program, "modelMatrix");
        this.viewMatrixLoc = gl.getUniformLocation(this.program, "viewMatrix");
        this.projectionMatrixLoc = gl.getUniformLocation(this.program, "projectionMatrix");

        this.#VAOs = this.#createModelsVAOsArray(this.scene.models);

        this.#axerRenderer = new AxesRenderer(this.canvas);
    }

    /**
     * 
     * @param {Camera} camera 
     */
    render(camera) {
        const gl = this.context;

        if (this.autoClear) this.clear();

        gl.useProgram(this.program);

        if (this.projectionMatrixLoc) {
            gl.uniformMatrix4fv(this.projectionMatrixLoc, false, camera.projectionMatrix.elements);
        }
        if (this.viewMatrixLoc) {  
            gl.uniformMatrix4fv(this.viewMatrixLoc, false, camera.viewMatrix.elements);
        }

        this.#drawScene();
        this.#drawAxes(camera);
    }

    /**
     * 
     * @param {string} event 
     * @param {Object} info 
     * @param {Model} info.model
     */
    updateObserver(event, info) {
        if (event === "model-added") {
            this.#VAOs.push(this.#createModelVAO(info.model));
        }
    }

    #drawScene() {
        const gl = this.context;

        const models = this.scene.models;
        for (let i = 0; i < models.length; i++) {
            if (this.modelMatrixLoc) {
                gl.uniformMatrix4fv(this.modelMatrixLoc, false, models[i].transform.elements);
            }
            gl.bindVertexArray(this.#VAOs[i]);
            gl.drawArrays(gl.TRIANGLES, 0, models[i].numVertices);
            gl.bindVertexArray(null);
        }
    }

    /**
     * 
     * @param {Camera} camera 
     */
    #drawAxes(camera) {
        if (this.drawWorldAxes) {
            const d = 1 + this.scene.boundingBox.radius;
            const transform = (new Matrix4x4()).scale(d,d,d);
            this.#axerRenderer.render(camera, {transform});
        }
        if (this.drawObjectsAxes) {
            this.scene.models.forEach(m => {
                const r = m.boundingBox.radius;
                const c = m.boundingBox.center;
                const transform = m.transform.clone();
                transform.translate(c.x, c.y, c.z);
                transform.scale(r,r,r);
                this.#axerRenderer.render(
                    camera, {
                    transform : transform,
                    dashed: true,
                    dashLength: 0.1
                });
            })
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