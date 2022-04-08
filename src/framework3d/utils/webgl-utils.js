/** @type {WebGL2RenderingContext} */

/**
 * Initialize WebGL2 rendering context
 * @param {HTMLCanvasElement} canvas 
 * @returns {WebGL2RenderingContext}
 */

function initWebGL2Context(canvas) {
    const gl = canvas.getContext('webgl2');

    if (!gl) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        throw new Error('Error creating WebGL context');
    }

    return gl;
}

/**
 * Initialize a shader program
 * @param {WebGL2RenderingContext} gl 
 * @param {string} vShader 
 * @param {string} fShader 
 * @returns {WebGLProgram}
 */
function initShaderProgram(gl, vShader, fShader) {
    const vs = compileShader(gl, gl.VERTEX_SHADER, vShader);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, fShader);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vs);
    gl.attachShader(shaderProgram, fs);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        throw `Unable to initialize the shader program: ${gl.getProgramParameter(shaderProgram)}`;
    }

    gl.deleteShader(vs);
    gl.deleteShader(fs);

    return shaderProgram;
}

/**
 * Creates a shader of the given type, uploads the source and compiles it
 * @param {WebGL2RenderingContext} gl 
 * @param {number} type 
 * @param {string} source 
 * @returns 
 */
function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw `Error compiling the shaders: ${gl.getShaderInfoLog(shader)}`;
    }

    return shader;
}

export { initWebGL2Context, initShaderProgram };