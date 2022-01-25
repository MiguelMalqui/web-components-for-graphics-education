import Geometry from "../core/geometry.js";

export default class BoxGeometry extends Geometry {
    /**
     * 
     * @param {number} width 
     * @param {number} height 
     * @param {number} depth 
     */
    constructor(width = 1, height = 1, depth = 1) {
        super(
            BoxGeometry.#createPositions(width, height, depth),
            BoxGeometry.#createNormals()
        );

        /**
         * @type {number}
         */
        this.width = width;
        /**
         * @type {number}
         */
        this.height = height;
        /**
         * @type {number}
         */
        this.depth = depth;
    }

    static #createPositions(width, height, depth) {
        const x = width / 2;
        const y = height / 2;
        const z = depth / 2;

        return new Float32Array([
            // top
            x, y, -z,  -x, y, -z,  -x, y, z,
            x, y, -z,  -x, y,  z,   x, y, z,
            // down
            x, -y, z,  -x, -y,  z,  -x, -y, -z,
            x, -y, z,  -x, -y, -z,   x, -y, -z,
            // front
            x, y, z,  -x,  y, z,  -x, -y, z,
            x, y, z,  -x, -y, z,   x, -y, z,
            // back
            x, -y, -z,  -x, -y, -z,  -x, y, -z,
            x, -y, -z,  -x,  y, -z,   x, y, -z,
            // right
            x, y, -z,  x,  y, z,  x, -y,  z,
            x, y, -z,  x, -y, z,  x, -y, -z,
            // left
            -x, y, z,  -x,  y, -z,  -x, -y, -z,
            -x, y, z,  -x, -y, -z,  -x, -y,  z
        ]);
    }

    static #createNormals() {
        return new Float32Array([
            // top
            0, 1, 0,  0, 1, 0,  0, 1, 0,
            0, 1, 0,  0, 1, 0,  0, 1, 0,
            // down
            0, -1, 0,  0, -1, 0,  0, -1, 0,
            0, -1, 0,  0, -1, 0,  0, -1, 0,
            // front
            0, 0, 1,  0, 0, 1,  0, 0, 1,
            0, 0, 1,  0, 0, 1,  0, 0, 1,
            // back
            0, 0, -1,  0, 0, -1,  0, 0, -1,
            0, 0, -1,  0, 0, -1,  0, 0, -1,
            // right
            1, 0, 0,  1, 0, 0,  1, 0, 0,
            1, 0, 0,  1, 0, 0,  1, 0, 0,
            // left
            -1, 0, 0,  -1, 0, 0,  -1, 0, 0,
            -1, 0, 0,  -1, 0, 0,  -1, 0, 0
        ]);
    }
}