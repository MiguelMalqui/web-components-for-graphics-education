/** @type {WebGL2RenderingContext} */


import { initWebGL2Context, initShaderProgram } from "./webgl-utils.js";
import basicShader from "./shaders/basic-shader.js";


export default class Scene {
    constructor(canvas, config = {}) {
        this.objects = [];

        this.context = initWebGL2Context(canvas);
        this.shaderProgram = initShaderProgram(
            this.context,
            config.vShader? config.vShader : basicShader.vert,
            config.fShader? config.fShader : basicShader.frag
        )

        // setup
        this.autoClear = config.autoClear? config.autoClear : true;

        // get attribute locations
        this.positionLoc = this.context.getAttribLocation(this.shaderProgram, 'position');
        this.normalLoc = this.context.getAttribLocation(this.shaderProgram, 'normal');
        this.colorLoc = this.context.getAttribLocation(this.shaderProgram, 'color');
        // get uniform locations
        this.modelMatrixLoc = this.context.getUniformLocation(this.shaderProgram, 'modelMatrix');
        this.viewMatrixLoc = this.context.getUniformLocation(this.shaderProgram, 'viewMatrix');
        this.projectionMatrixLoc = this.context.getUniformLocation(this.shaderProgram, 'projectionMatrix');

    }

    addModel(model) {
        const vao = this.#createModelVAO(model)
        this.objects.push({model: model, vao: vao});

    }

    render(camera) {
        const gl = this.context;

        if (this.autoClear) {
            this.clear();
        }

        gl.useProgram(this.shaderProgram);

        if (this.projectionMatrixLoc) {
            gl.uniformMatrix4fv(this.projectionMatrixLoc, false, camera.projectionMatrix.elements);
        }
        if (this.viewMatrixLoc) {
            gl.uniformMatrix4fv(this.viewMatrixLoc, false, camera.viewMatrix.elements);
        }

        this.#drawObjects();
    }

    clear() {
        const gl = this.context;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }


    #drawObjects() {
        this.objects.forEach(object => {
            this.#drawObject(object);
        });
    }

    #drawObject(object) {
        const gl = this.context;
        
        if (this.modelMatrixLoc) {
            gl.uniformMatrix4fv(this.modelMatrixLoc, false, object.model.transform.elements);
        }
        gl.bindVertexArray(object.vao);
        gl.drawArrays(gl.TRIANGLES, 0, object.model.numVertices);
        gl.bindVertexArray(null);
    }

    #createModelVAO(model) {
        const gl = this.context;

        const VAO = gl.createVertexArray();
        gl.bindVertexArray(VAO);

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

        gl.bindVertexArray(null);

        return VAO;
    }


}