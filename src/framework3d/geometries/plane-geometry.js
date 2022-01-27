import Geometry from "../core/geometry.js";

/**
 * Class representing a plane geometry
 */
export default class PlaneGeometry extends Geometry {
    /**
     * Creates a plane geometry
     * @param {number} width width of the plane, default is 1
     * @param {number} depth depth of the plane, default is 1
     */
    constructor(width = 1, depth = 1) {
        super(
            PlaneGeometry.#createPositions(width, depth),
            PlaneGeometry.#createNormals()
        );

        /**
         * Width of the plane
         * @type {number}
         */
        this.width = width;
        /**
         * Depth of the plane
         * @type {number}
         */
        this.depth = depth;
    }

    static #createPositions(width, depth) {
        const w = width / 2;
        const d = depth / 2;
        return new Float32Array([
            w, 0, -d,  -w, 0, -d,  -w, 0, d,
            w, 0, -d,  -w, 0,  d,   w, 0, d
        ]);
    }

    static #createNormals() {
        return new Float32Array([
            0, 1, 0,  0, 1, 0,  0, 1, 0,
            0, 1, 0,  0, 1, 0,  0, 1, 0
        ]);
    }
}