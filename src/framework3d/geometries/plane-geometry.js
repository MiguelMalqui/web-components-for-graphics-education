import Geometry from "../core/geometry.js";

export default class PlaneGeometry extends Geometry {
    constructor(width = 1, depth = 1) {
        super(
            PlaneGeometry.#createPositions(width, depth),
            PlaneGeometry.#createNormals()
        );

        /**
         * @type {number}
         */
        this.width = width;
        /**
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