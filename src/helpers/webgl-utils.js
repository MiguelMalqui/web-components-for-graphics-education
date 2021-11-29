/** @type {WebGL2RenderingContext} */


/**
 * 
 * @param {*} canvas 
 * @returns {WebGL2RenderingContext}
 */

function initWebGL2Context(canvas) {
    const gl = canvas.getContext('webgl2');

    if (!gl) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        throw new Error('Error creating WebGL context');
    }

    console.log(gl.getParameter(gl.VERSION));
    console.log(gl.getParameter(gl.SHADING_LANGUAGE_VERSION));

    return gl;
}

function initShaderProgram(gl, vShaderSource, fShraderSource) {
    const vs = compileShader(gl, gl.VERTEX_SHADER, vShaderSource);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, fShraderSource);

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