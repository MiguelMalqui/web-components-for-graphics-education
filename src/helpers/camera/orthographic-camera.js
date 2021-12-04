import Matrix4x4 from "../maths/matrix4x4.js";
import Camera from "./camera.js";

/**
 * Class representing a orthografic camera
 */
export default class OrthograficCamera extends Camera {

    /**
     * Creates a orthografic camera
     * @param {number} left - camera frustum left plane, default is -1
     * @param {number} right - camera frustum right plane, default is 1
     * @param {number} bottom - camera frustum bottom plane, default is -1
     * @param {number} top - camera frustum top plane, default is 1
     * @param {number} [zNear] - the minimal distance between the camera and a 
     * visible surface, default is 0.1
     * @param {number} [zFar] - the maximal distance between the camera and a
     * visible surface, default is 100
     */
    constructor(left = -1, right = 1, bottom = -1, top = 1, zNear, zFar) {
        super(zNear, zFar);

        /**
         * camera frustum left plane
         * @type {number}
         */
        this.left = left;
        /**
         * camera frustum right plane
         * @type {number}
         */
        this.right = right;
        /**
         * camera frustum bottom plane
         * @type {number}
         */
        this.bottom = bottom;
        /**
         * camera frustum top plane
         * @type {number}
         */
        this.top = top;

        this.updateProjectionMatrix();
    }

    updateProjectionMatrix() {
        this.projectionMatrix = Matrix4x4.orthogonal(
            this.left, this.right, this.bottom, this.top,
            this.zNear, this.zFar
        );
    }

    /**
     * positive number zoom in, negative number zoom out
     * @param {number} n 
     */
    zoom(n) {
        const ra = (this.right - this.left) / (this.top - this.bottom);
        if (ar < 1.0) {
            this.left += n;
            this.right -= n;
            this.bottom += n/ra;
            this.top -= n/ra;
        } else {
            this.left += n*ra;
            this.right -= n*ra;
            this.bottom += n;
            this.top -= ra;
        }
        this.updateProjectionMatrix();
    }

}