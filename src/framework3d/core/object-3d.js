import Matrix4x4 from "../math/matrix4x4.js";
import Geometry from "./geometry.js";

export default class Object3D {
    /**
     * 
     * @param {Geometry} geometry 
     */
    constructor(geometry) {
        /**
         * @type {Geometry}
         */
        this.geometry = geometry;

        /**
         * @type {Matrix4x4}
         */
        this.transform = new Matrix4x4();
    }
}
