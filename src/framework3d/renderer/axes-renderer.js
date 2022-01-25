import Matrix4x4 from "../math/matrix4x4.js";
import axesShader from "../shaders/axes-shader.js"
import Renderer from "./renderer.js";
import Camera from "../core/camera.js"

/**
 * Class that renders 3D x y z axes
 */
export default class AxesRenderer extends Renderer {
    #axesVAO;
    #axesTransform;
    #mdlLoc;
    #mvpLoc;
    #dashed;
    #invLen;
    /**
     * Creates a 3D x y z axes renderer class
     * @param {HTMLCanvasElement} canvas - where renderer will draw
     */
    constructor(canvas) {
        super(canvas, axesShader.vert, axesShader.frag);

        this.#axesVAO = this.#createAxesVAO();
        this.#axesTransform = new Matrix4x4();

        const gl = this.context;
        this.#mdlLoc = gl.getUniformLocation(this.program, "modelMatrix");
        this.#mvpLoc = gl.getUniformLocation(this.program, "modelViewProjectionMatrix");
        this.#dashed = gl.getUniformLocation(this.program, "dashed");
        this.#invLen = gl.getUniformLocation(this.program, "invDashLength");
    }

    /**
     * Renders 3D x y z axes
     * @param {Camera} camera - camera to use to render
     * @param {Object} [options]
     * @param {Matrix4x4} [options.transform] - model transform to use, default is identity
     * @param {boolean} [options.dashed] - draw a dashed lines, default is false
     * @param {number} [options.dashLength] - dash length, default is 0.1
     */
    render(camera, { transform = this.#axesTransform, dashed = false, dashLength = 0.1 }) {
        const gl = this.context;

        gl.useProgram(this.program);

        const proj = camera.projectionMatrix;
        const view = camera.viewMatrix;
        const mvp = proj.mul(view).mul(transform);
        gl.uniformMatrix4fv(this.#mdlLoc, false, transform.data);
        gl.uniformMatrix4fv(this.#mvpLoc, false, mvp.data)
        gl.uniform1i(this.#dashed, dashed);
        gl.uniform1f(this.#invLen, 1 / dashLength);

        gl.bindVertexArray(this.#axesVAO);
        gl.drawArrays(gl.LINES, 0, 6);
        gl.bindVertexArray(null);
    }

    #createAxesVAO() {
        const gl = this.context;

        const VAO = gl.createVertexArray();
        gl.bindVertexArray(VAO);

        const posLoc = gl.getAttribLocation(this.program, "position");
        const colLoc = gl.getAttribLocation(this.program, "color");

        const positionsVBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionsVBO);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                0, 0, 0, 1, 0, 0,
                0, 0, 0, 0, 1, 0,
                0, 0, 0, 0, 0, 1
            ]),
            gl.STATIC_DRAW
        );
        gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(posLoc);

        const colorsVBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorsVBO);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                1, 0, 0, 1, 0, 0,
                0, 1, 0, 0, 1, 0,
                0, 0, 1, 0, 0, 1
            ]),
            gl.STATIC_DRAW
        );
        gl.vertexAttribPointer(colLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(colLoc);

        gl.bindVertexArray(null);

        return VAO;
    }
}