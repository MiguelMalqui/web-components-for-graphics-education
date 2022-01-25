import Matrix4x4 from "../math/matrix4x4.js";
import Vector3 from "../math/vector3.js";
import Scene from "../core/scene.js";
import Object3D from "../core/object-3d.js";
import Camera from "../core/camera.js"
import Renderer from "./renderer.js";
import AxesRenderer from "./axes-renderer.js"
import basicShader from "../shaders/basic-shader.js"

export default class SceneRenderer extends Renderer {
    /**
     * @type {WebGLVertexArrayObject[]}
     */
    #VAOs;
    #axesRenderer;
    #positionLoc;
    #normalLoc;
    #colorLoc;
    #modelMatrixLoc;
    #viewMatrixLoc;
    #projectionMatrixLoc;

    static #COLORS = new Float32Array(300).map(() => Math.random());

    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     * @param {Object} config 
     * @param {string} [config.vShader] - vertex shader
     * @param {string} [config.fShader] - fragment shader
     * @param {boolean} [config.autoClear] - clear before render, default is false
     * @param {boolean} [config.drawWorldAxes] - draw world axes, default is false
     * @param {boolean} [config.drawObjectsAxes] - draw axes for each object, default is false
     */
    constructor(canvas, config = {}) {
        super(
            canvas,
            config.vShader ? config.vShader : basicShader.vert,
            config.fShader ? config.fShader : basicShader.frag
        );

        /**
         * @type {Scene}
         */
        this.scene = new Scene();
        /**
         * @type {boolean}
         */
        this.autoClear = config.autoClear ? config.autoClear : false;
        /**
         * @type {boolean}
         */
        this.drawWorldAxes = config.drawWorldAxes ? config.drawWorldAxes : false;
        /**
         * @type {boolean}
         */
        this.drawObjectsAxes = config.drawObjectsAxes ? config.drawObjectsAxes : false;


        this.#VAOs = [];

        const gl = this.context;
        this.#positionLoc = gl.getAttribLocation(this.program, "position");
        this.#normalLoc = gl.getAttribLocation(this.program, "normal");
        this.#colorLoc = gl.getAttribLocation(this.program, "color");
        this.#modelMatrixLoc = gl.getUniformLocation(this.program, "modelMatrix");
        this.#viewMatrixLoc = gl.getUniformLocation(this.program, "viewMatrix");
        this.#projectionMatrixLoc = gl.getUniformLocation(this.program, "projectionMatrix");

        this.#axesRenderer = new AxesRenderer(canvas);
    }

    /**
     * 
     * @param {Object3D} object 
     */
    addObject(object) {
        this.scene.addObject(object);
        this.#VAOs.push(this.#createObjectVAO(object));
    }

    /**
     * 
     * @param {Camera} camera 
     */
    render(camera) {
        if (this.autoClear) this.clear();
        this.#drawScene(camera);
    }

    #drawScene(camera) {
        this.#drawObjects(camera);
        if (this.drawWorldAxes) this.#drawWorldAxes(camera);
        if (this.drawObjectsAxes) this.#drawObjectsAxes(camera);
    }

    #drawObjects(camera) {
        const gl = this.context;

        gl.useProgram(this.program);
        if (this.#projectionMatrixLoc) {
            gl.uniformMatrix4fv(this.#projectionMatrixLoc, false, camera.projectionMatrix.data);
        }
        if (this.#viewMatrixLoc) {
            gl.uniformMatrix4fv(this.#viewMatrixLoc, false, camera.viewMatrix.data);
        }

        for (let i = 0; i < this.scene.objects.length; i++) {
            if (this.#modelMatrixLoc) {
                gl.uniformMatrix4fv(this.#modelMatrixLoc, false, this.scene.objects[i].transform.data);
            }
            gl.bindVertexArray(this.#VAOs[i]);
            gl.drawArrays(gl.TRIANGLES, 0, this.scene.objects[i].geometry.positions.length / 3);
            gl.bindVertexArray(null);
        }
    }

    #drawWorldAxes(camera) {
        const transform = Matrix4x4.scaling(100, 100, 100);
        this.#axesRenderer.render(camera, { transform });
    }

    #drawObjectsAxes(camera) {
        this.scene.objects.forEach(object => {
            const b = object.geometry.boundingBox;
            const c = b.center;

            // move and scale axes to match object center and orientation
            let t = object.transform
                .translate(c.x, c.y, c.z)
                .scale(b.width / 2, b.height / 2, b.depth / 2);

            // make axes 0.5 larger than the bounding box of the object
            const ll = 0.5;
            let sx = new Vector3(t.data[0], t.data[1], t.data[2]).length();
            let sy = new Vector3(t.data[4], t.data[5], t.data[6]).length();
            let sz = new Vector3(t.data[8], t.data[9], t.data[10]).length();
            sx = (sx + ll) / sx;
            sy = (sy + ll) / sy;
            sz = (sz + ll) / sz;
            t = t.scale(sx, sy, sz);

            this.#axesRenderer.render(camera, {
                transform: t,
                dashed: true,
                dashLength: 0.1
            });
        });
    }

    /**
     * 
     * @param {Object3D} object 
     * @returns {WebGLVertexArrayObject}
     */
    #createObjectVAO(object) {
        const gl = this.context;

        const VAO = gl.createVertexArray();
        gl.bindVertexArray(VAO);

        if (this.#positionLoc >= 0) {
            const positionVBO = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, positionVBO);
            gl.bufferData(gl.ARRAY_BUFFER, object.geometry.positions, gl.STATIC_DRAW);
            gl.vertexAttribPointer(this.#positionLoc, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(this.#positionLoc);
        }
        if (this.#normalLoc >= 0) {
            const normalsVBO = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, normalsVBO);
            gl.bufferData(gl.ARRAY_BUFFER, object.geometry.normals, gl.STATIC_DRAW);
            gl.vertexAttribPointer(this.#normalLoc, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(this.#normalLoc);
        }
        if (this.#colorLoc >= 0) {
            const colors = object.geometry.positions.map(
                (x, i) => SceneRenderer.#COLORS[i % SceneRenderer.#COLORS.length]
            );
            const colorsVBO = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, colorsVBO);
            gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
            gl.vertexAttribPointer(this.#colorLoc, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(this.#colorLoc);
        }

        gl.bindVertexArray(null);

        return VAO;
    }
}

