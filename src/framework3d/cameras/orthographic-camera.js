import Matrix4x4 from "../math/matrix4x4.js";
import Camera from "../core/camera.js";

/**
 * Class representing a orthographic camera
 */
export default class OrthographicCamera extends Camera {
    #left;
    #right;
    #bottom;
    #top;
    #zNear;
    #zFar;
    /**
     * Creates a orthographic camera
     * @param {number} left - camera frustum left plane, default is -1
     * @param {number} right - camera frustum right plane, default is 1
     * @param {number} bottom - camera frustum bottom plane, default is -1
     * @param {number} top - camera frustum top plane, default is 1
     * @param {number} zNear - the minimal distance between the camera and a 
     * visible surface, default is 0.1
     * @param {number} zFar - the maximal distance between the camera and a
     * visible surface, default is 100
     */
    constructor(
        left = -1, right = 1, bottom = -1, top = 1, zNear = 0.1, zFar = 100
    ) {
        super();

        this.setProjectionMatrix(
            left, right, bottom, top, zNear, zFar
        );
    }

    /**
     * camera frustum left plane
     * @type {number}
     */
    get left() {
        return this.#left;
    }

    set left(left) {
        this.setProjectionMatrix(
            left, this.#right, this.#bottom, this.#top, this.#zNear, this.#zFar
        );
    }

    /**
     * camera frustum right plane
     * @type {number}
     */
    get right() {
        return this.#right;
    }

    set right(right) {
        this.setProjectionMatrix(
            this.#left, right, this.#bottom, this.#top, this.#zNear, this.#zFar
        );
    }

    /**
     * camera frustum bottom plane
     * @type {number}
     */
    get bottom() {
        return this.#bottom;
    }

    set bottom(bottom) {
        this.setProjectionMatrix(
            this.#left, this.#right, bottom, this.#top, this.#zNear, this.#zFar
        );
    }

    /**
     * camera frustum top plane
     * @type {number}
     */
    get top() {
        return this.#top;
    }

    set top(top) {
        this.setProjectionMatrix(
            this.#left, this.#right, this.#bottom, top, this.#zNear, this.#zFar
        );
    }

    /**
     * the minimal distance between the camera and a visible surface
     * @type {number} 
     */
    get zNear() {
        return this.#zNear;
    }

    set zNear(zNear) {
        this.setProjectionMatrix(
            this.#left, this.#right, this.#bottom, this.#top, zNear, this.#zFar
        );
    }

    /**
     * the maximal distance between the camera and a visible surface
     * @type {number} 
     */
    get zFar() {
        return this.#zFar;
    }

    set zFar(zFar) {
        this.setProjectionMatrix(
            this.#left, this.#right, this.#bottom, this.#top, this.#zNear, zFar
        );
    }

    /**
     * Updates the projection matrix
     * @param {number} left - camera frustum left plane
     * @param {number} right - camera frustum right plane
     * @param {number} bottom - camera frustum bottom plane
     * @param {number} top - camera frustum top plane
     * @param {number} zNear - the minimal distance between the camera and a 
     * visible surface
     * @param {number} zFar - the maximal distance between the camera and a
     * visible surface
     */
    setProjectionMatrix(left, right, bottom, top, zNear, zFar) {
        this.#left = left;
        this.#right = right;
        this.#bottom = bottom;
        this.#top = top;
        this.#zNear = zNear;
        this.#zFar = zFar;

        this.projectionMatrix = Matrix4x4.orthographic(
            this.#left,
            this.#right,
            this.#bottom,
            this.#top,
            this.#zNear,
            this.#zFar
        );
    }
}