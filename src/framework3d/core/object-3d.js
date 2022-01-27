import Matrix4x4 from "../math/matrix4x4.js";
import Geometry from "./geometry.js";

/**
 * Class representing an 3D object
 */
export default class Object3D {
    /**
     * Creates a 3D object
     * @param {Geometry} geometry geometry of the object
     */
    constructor(geometry) {
        /**
         * Geometry of the object
         * @type {Geometry}
         */
        this.geometry = geometry;

        /**
         * Transform of the object
         * @type {Matrix4x4}
         */
        this.transform = new Matrix4x4();
    }
}
