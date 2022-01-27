import Geometry from "../core/geometry.js";
import Vector3 from "../math/vector3.js";
import Matrix3x3 from "../math/matrix3x3.js";

/**
 * Class representing a circle geometry
 */
export default class CircleGeometry extends Geometry {
    /**
     * Creates a circle geometry
     * @param {number} radius radius of the circle, default is 0.5
     * @param {number} segments number of segments of the circle, minimum is 3,
     * default is 16
     */
    constructor(radius = 0.5, segments = 16) {
        if (segments < 3) segments = 3;

        super(
            CircleGeometry.#createPositions(radius, segments),
            CircleGeometry.#createNormals(segments)
        );

        /**
         * Radius of the circle
         * @type {number}
         */
        this.radius = radius;
        /**
         * Number of segments of the circle
         * @type {number}
         */
        this.segments = segments;
    }

    static #createPositions(radius, segments) {
        const positions = [];
        const a = 2 * Math.PI / segments;
        const m = Matrix3x3.rotation(a, 0, 1, 0);

        let v0 = new Vector3();
        let v1 = new Vector3(radius, 0, 0);
        let v2 = m.mulVector3(v1);
        for (let i = 0; i < segments; i++) {
            positions.push(v0.x, v0.y, v0.z);
            positions.push(v1.x, v1.y, v1.z)
            positions.push(v2.x, v2.y, v2.z);
            v1 = v2;
            v2 = m.mulVector3(v1);
        }

        return new Float32Array(positions);
    }

    static #createNormals(segments) {
        const normals = [];

        const v = new Vector3(0, 1, 0);
        for (let i = 0; i < segments; i++) {
            normals.push(v.x, v.y, v.z);
            normals.push(v.x, v.y, v.z);
            normals.push(v.x, v.y, v.z);
        }

        return new Float32Array(normals);
    }
}