import { initWebGL2Context, initShaderProgram } from "../utils/webgl-utils.js"

export default class Renderer {
    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     * @param {string} vShader 
     * @param {string} fShader 
     */
    constructor(canvas, vShader, fShader) {
        this.canvas = canvas;
        /**
         * @type {WebGL2RenderingContext}
         */
        this.context = initWebGL2Context(this.canvas);
        /**
         * @type {WebGLProgram}
         */
        this.program = initShaderProgram(this.context, vShader, fShader);

        const gl = this.context;
        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
    }

    /**
     * Sets the viewport, which specifies the affine transformation of x and y 
     * from normalized device coordinates to window coordinates
     * @param {number} x - specifies the horizontal coordinate for the lower 
     * left corner of the viewport origin
     * @param {number} y - specifies the vertical coordinate for the lower left
     * corner of the viewport origin
     * @param {number} width - specifies the width of the viewport
     * @param {number} height - specifies the height of the viewport
     */
    setViewport(x, y, width, height) {
        this.context.viewport(x, y, width, height);
    }

    /**
     * Clears depth buffer. Clears color buffer with black
     */
    clear() {
        const gl = this.context;
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    render() { }
}