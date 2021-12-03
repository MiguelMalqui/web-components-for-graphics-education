import { initWebGL2Context, initShaderProgram } from "../webgl-utils.js";

export default class Renderer {
    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     * @param {string} vShader 
     * @param {string} fShader 
     */
    constructor(canvas, vShader, fShader) {
        this.canvas = canvas;
        this.context = initWebGL2Context(this.canvas);
        this.program = initShaderProgram(this.context, vShader, fShader);

        const gl = this.context;
        gl.enable(gl.DEPTH_TEST);
    }

    /**
     * Sets the viewport, which specifies the affine transformation of x and y 
     * from normalized device coordinates to window coordinates
     * @param {number} x - specifies the horizontal coordinate for the lower 
     * left corner of the viewport origin
     * @param {number} y - specifies the vertical coordinate for the lower left
     * corner of the viewport origin
     * @param {number} width - specifyies the width of the viewport
     * @param {number} height - specifyies the height of the viewport
     */
     setViewport(x, y, width, height) {
        this.context.viewport(x, y, width, height);
    }

    /**
     * Clears depth buffer. Clears color buffer with black
     */
    clear() {
        const gl = this.context;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    render() {}
}