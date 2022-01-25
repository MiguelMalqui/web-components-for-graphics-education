import Box from "../math/box.js";
import Vector3 from "../math/vector3.js";

export default class Geometry {
    /**
     * 
     * @param {Float32Array} positions 
     * @param {Float32Array} normals 
     */
    constructor(positions, normals) {
        /**
         * @type {Float32Array}
         */
        this.positions = positions;
        /**
         * @type {Float32Array}
         */
        this.normals = normals;

        /**
         * @type {Box}
         */
        this.boundingBox = Geometry.#computeBoundingBox(this.positions);
    }

    /**
     * 
     * @param {Float32Array} positions 
     */
    static #computeBoundingBox(positions) {
        const point = new Vector3(positions[0], positions[1], positions[2]);
        const box = new Box(point, point);

        for (let i = 3; i < positions.length; i += 3) {
            point.x = positions[i];
            point.y = positions[i + 1];
            point.z = positions[i + 2];
            box.expandByPoint(point);
        }

        return box;
    }
}