import Matrix4x4 from "../math/matrix4x4.js";
import Camera from "../core/camera.js";

/**
 * Class representing a perspective camera
 */
export default class PerspectiveCamera extends Camera {
    /**
     * Camera frustum vertical field of view
     * @type {number}
     * 
     */
    #fieldOfView;
    /**
     * Camera frustum aspect ratio
     * @type {number}
     * 
     */
    #aspectRatio;
    /**
     * Camera frustum near plane
     * @type {number}
     */
    #zNear;
    /**
     * Camera frustum far plane
     * @type {number}
     */
    #zFar;
    /**
     * Creates a perspective camera
     * @param {number} fieldOfView - camera frustum vertical field of view,
     * in radians, default is 1
     * @param {number} aspectRatio - camera frustum aspect ratio, default is 1
     * @param {number} zNear - camera frustum near plane, default is 0.1
     * @param {number} zFar - camera frustum far plane, default is 100
     */
    constructor(
        fieldOfView = 1, aspectRatio = 1, zNear = 0.1, zFar = 100
    ) {
        super();

        this.setProjectionMatrix(
            fieldOfView, aspectRatio, zNear, zFar
        );
    }

    /**
     * Camera frustum vertical field of view, in radians
     * @type {number}
     */
    get fieldOfView() {
        return this.#fieldOfView;
    }

    set fieldOfView(fieldOfView) {
        this.setProjectionMatrix(
            fieldOfView, this.#aspectRatio, this.#zNear, this.#zFar
        );
    }

    /**
     * Camera frustum aspect ratio
     * @type {number}
     */
    get aspectRatio() {
        return this.#aspectRatio;
    }

    set aspectRatio(aspectRatio) {
        this.setProjectionMatrix(
            this.#fieldOfView, aspectRatio, this.#zNear, this.#zFar
        );
    }

    /**
     * Camera frustum near plane
     * @type {number}
     */
    get zNear() {
        return this.#zNear;
    }

    set zNear(zNear) {
        this.setProjectionMatrix(
            this.#fieldOfView, this.#aspectRatio, zNear, this.#zFar
        );
    }

    /**
     * Camera frustum far plane
     * @type {number}
     */
    get zFar() {
        return this.#zFar;
    }

    set zFar(zFar) {
        this.setProjectionMatrix(
            this.#fieldOfView, this.#aspectRatio, this.#zNear, zFar
        );
    }

    /**
     * Updates the projection matrix
     * @param {number} fieldOfView - camera frustum vertical field of view,
     * in radians
     * @param {number} aspectRatio - camera frustum aspect ratio
     * @param {number} zNear - camera frustum near plane
     * @param {number} zFar - camera frustum far plane
     */
    setProjectionMatrix(fieldOfView, aspectRatio, zNear, zFar) {
        this.#fieldOfView = fieldOfView;
        this.#aspectRatio = aspectRatio;
        this.#zNear = zNear;
        this.#zFar = zFar;

        this.projectionMatrix = Matrix4x4.perspective(
            this.#fieldOfView,
            this.#aspectRatio,
            this.#zNear,
            this.#zFar
        );
    }



}