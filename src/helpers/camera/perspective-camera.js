import Matrix4x4 from "../maths/matrix4x4.js";
import Camera from "./camera.js";

/**
 * Class representing a perspective camera
 */
export default class PerspectiveCamera extends Camera {

    /**
     * Creates a perspective camera
     * @param {number} fov - camera frustum vertical field of view, in radians, 
     * default is 1.0
     * @param {number} ra - aspect ratio, default is 1.0
     * @param {number} [zNear] - the minimal distance between the camera and a 
     * visible surface, default is 0.1
     * @param {number} [zFar] - the maximal distance between the camera and a
     * visible surface, default is 100
     */
    constructor(fov = 1.0, ra = 1.0, zNear, zFar) {
        super(zNear, zFar);

        /**
         * camera frustum vertical field of view, in radians
         * @type {number}
         */
        this.fov = fov;
        /**
         * aspect ratio
         * @type {number}
         */
        this.ra = ra;

        this.updateProjectionMatrix();
    }

    updateProjectionMatrix() {
        this.projectionMatrix = Matrix4x4.perspective(
            this.fov, this.ra, this.zNear, this.zFar
        );
    }

    /**
     * positive number zoom in, negative number zoom out
     * @param {number} n 
     */
    zoom(n) {
        this.fov -= n;
        this.updateProjectionMatrix();
    }

}