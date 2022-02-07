import { initShaderProgram } from "../framework3d/utils/webgl-utils.js";
import basicShader from "../framework3d/shaders/basic-shader.js";
import Camera from "../framework3d/core/camera.js";
import Vector4 from "../framework3d/math/vector4.js";
import PlaneGeometry from "../framework3d/geometries/plane-geometry.js";
import Color from "../framework3d/math/color.js";
import Vector3 from "../framework3d/math/vector3.js";

export default class CameraDrawer {
    #frustum;
    #cone;
    #up;
    #plane;
    #program;
    #context;
    #modelMatrixLoc;
    #viewMatrixLoc;
    #projectionMatrixLoc;
    
    constructor(context) {
        this.#context = context;

        this.#program = initShaderProgram(this.#context, basicShader.vert, basicShader.frag);

        const gl = this.#context;
        this.#modelMatrixLoc = gl.getUniformLocation(this.#program, "modelMatrix");
        this.#viewMatrixLoc = gl.getUniformLocation(this.#program, "viewMatrix");
        this.#projectionMatrixLoc = gl.getUniformLocation(this.#program, "projectionMatrix");

        this.#frustum = this.#createVAO(CameraDrawer.#frustumPositions, CameraDrawer.#frustumColor);
        this.#cone = this.#createVAO(CameraDrawer.#conePositions, CameraDrawer.#coneColor);
        this.#up = this.#createVAO(CameraDrawer.#upPositions, CameraDrawer.#upColor);
        this.#plane = this.#createVAO(CameraDrawer.#planePositions, CameraDrawer.#planeColor);
    }

    /**
     * 
     * @param {Camera} sceneCamera 
     * @param {Camera} cameraToDraw 
     */
    draw(sceneCamera, cameraToDraw) {
        const gl = this.#context;

        gl.useProgram(this.#program);
        gl.uniformMatrix4fv(
            this.#projectionMatrixLoc, false, sceneCamera.projectionMatrix.data);
        gl.uniformMatrix4fv(
            this.#viewMatrixLoc, false, sceneCamera.viewMatrix.data);

        
        // draw frustum
        const proj = cameraToDraw.projectionMatrix;
        const view = cameraToDraw.viewMatrix;
        const frustumTransform = proj.mul(view).inverse();
        gl.uniformMatrix4fv(this.#modelMatrixLoc, false, frustumTransform.data);
        gl.bindVertexArray(this.#frustum.VAO);
        gl.drawArrays(gl.LINES, 0, this.#frustum.numVertices);
        gl.bindVertexArray(null);

        
        // draw cone
        const projInv = proj.inverse();
        const viewInv = view.inverse();
        let v0 = projInv.mulVector4(new Vector4(-1, -1, -1, 1));
        let v1 = projInv.mulVector4(new Vector4( 1,  1, -1, 1));
        v0 = v0.divScalar(v0.w);
        v1 = v1.divScalar(v1.w);
        const coneTransform = viewInv.scale(v1.x - v0.x, v1.y - v0.y, v0.z);
        gl.uniformMatrix4fv(this.#modelMatrixLoc, false, coneTransform.data);
        gl.bindVertexArray(this.#cone.VAO);
        gl.drawArrays(gl.LINES, 0, this.#cone.numVertices);
        gl.bindVertexArray(null);

        
        // draw up
        const upTransform = viewInv.translate(0, v1.y * 1.1, v1.z).scale(v1.x - v0.x, v1.y - v0.y, 1);
        gl.uniformMatrix4fv(this.#modelMatrixLoc, false, upTransform.data);
        gl.bindVertexArray(this.#up.VAO);
        gl.drawArrays(gl.TRIANGLES, 0, this.#up.numVertices);
        gl.bindVertexArray(null);

        
        // draw near and far plane
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        
        // calculate distance from the scene camera to the camera to draw z planes
        const camPos = sceneCamera.position;
        const v4n = frustumTransform.mulVector4(new Vector4(0, 0, -1, 1));
        const v4f = frustumTransform.mulVector4(new Vector4(0, 0, 1, 1));
        const v3n = new Vector3(v4n.x, v4n.y, v4n.z).divScalar(v4n.w);
        const v3f = new Vector3(v4f.x, v4f.y, v4f.z).divScalar(v4f.w);
        const distN = camPos.distanceTo(v3n);
        const distF = camPos.distanceTo(v3f);
        
        // calculate transforms of the camera to draw z planes
        let v2 = projInv.mulVector4(new Vector4(-1, -1, 1, 1));
        let v3 = projInv.mulVector4(new Vector4( 1,  1, 1, 1));
        v2 = v2.divScalar(v2.w);
        v3 = v3.divScalar(v3.w);
        const nearTransform = viewInv.translate(0, 0, v1.z).xRotate(Math.PI / 2).scale(v1.x - v0.x, 1, v1.y - v0.y);
        const farTransform = viewInv.translate(0, 0, v3.z).xRotate(Math.PI / 2).scale(v3.x - v2.x, 1, v3.y - v2.y);
        
        const [t1, t2] = distN > distF ? [nearTransform, farTransform] : [farTransform, nearTransform];

        // draw first the furthest z plane
        gl.uniformMatrix4fv(this.#modelMatrixLoc, false, t1.data);
        gl.bindVertexArray(this.#plane.VAO);
        gl.drawArrays(gl.TRIANGLES, 0, this.#plane.numVertices);
        gl.bindVertexArray(null);
        // then draw the nearest z plane
        gl.uniformMatrix4fv(this.#modelMatrixLoc, false, t2.data);
        gl.bindVertexArray(this.#plane.VAO);
        gl.drawArrays(gl.TRIANGLES, 0, this.#plane.numVertices);
        gl.bindVertexArray(null);

        gl.disable(gl.BLEND);
    }

    /**
     * 
     * @param {Float32Array} positions 
     * @param {Color} color 
     * @returns 
     */
    #createVAO(positions, color) {
        const gl = this.#context;

        const VAO = gl.createVertexArray();
        gl.bindVertexArray(VAO);

        const posLoc = gl.getAttribLocation(this.#program, "position");
        const colLoc = gl.getAttribLocation(this.#program, "color");

        const positionsVBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionsVBO);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(posLoc);

        const numVertices = positions.length / 3;
        const colors = new Float32Array(
            Array(numVertices)
                .fill([color.r / 255, color.g / 255, color.b / 255, color.a])
                .flat()
        );
        const colorsVBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorsVBO);
        gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
        gl.vertexAttribPointer(colLoc, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(colLoc);

        gl.bindVertexArray(null);

        return {VAO: VAO, numVertices: numVertices};
    }

    static #frustumPositions = new Float32Array([
        1,  1, 1,  -1,  1, 1,
       -1,  1, 1,  -1, -1, 1,
       -1, -1, 1,   1, -1, 1,
        1, -1, 1,   1,  1, 1,

        1,  1, -1,  -1,  1, -1,
       -1,  1, -1,  -1, -1, -1,
       -1, -1, -1,   1, -1, -1,
        1, -1, -1,   1,  1, -1,

        1,  1, -1,   1,  1, 1,
       -1,  1, -1,  -1,  1, 1,
       -1, -1, -1,  -1, -1, 1, 
        1, -1, -1,   1, -1, 1,
    ]);

    static #conePositions = new Float32Array([
        0.5,  0.5, 1,   0, 0, 0,
       -0.5,  0.5, 1,   0, 0, 0,
       -0.5, -0.5, 1,   0, 0, 0,
        0.5, -0.5, 1,   0, 0, 0,
    ]);

    static #upPositions = new Float32Array([
        0.4, 0, 0,  0, 0.5, 0,  -0.4, 0, 0
    ]);

    static #planePositions = new PlaneGeometry().positions;
    
    static #frustumColor = Color.makeRGB(255, 215, 0);
    static #coneColor = Color.makeRGB(255, 0, 0);
    static #upColor = Color.makeRGB(0, 0, 255)
    static #planeColor = Color.makeRGB(255,215, 0, 0.3);
}