import Box from "../math/box.js";
import Vector3 from "../math/vector3.js";

/**
 * Class representing a geometry made of triangles
 */
export default class Geometry {
    /**
     * Creates a geometry.
     * Each three vertex represent one triangle.
     * @param {Float32Array} positions Positions of the vertices.
     * Each three numbers represent one vertex position. 
     * @param {Float32Array} normals Normals of the vertices.
     * Each three numbers represent one vertex normal. 
     */
    constructor(positions, normals) {
        /**
         * Positions of the vertices.
         * Each three numbers represent one vertex position.
         * @type {Float32Array}
         */
        this.positions = positions;
        /**
         * Normals of the vertices.
         * Each three numbers represent one vertex normal.
         * @type {Float32Array}
         */
        this.normals = normals;

        /**
         * Smallest axes-aligned box that enclose the geometry
         * @type {Box}
         */
        this.boundingBox = Geometry.#computeBoundingBox(this.positions);
    }

    /**
     * Computes a bounding box of a given array of numbers 
     * where each three numbers represent one position
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