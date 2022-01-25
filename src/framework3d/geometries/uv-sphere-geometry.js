import Geometry from "../core/geometry.js";
import Matrix3x3 from "../math/matrix3x3.js";
import Vector3 from "../math/vector3.js";

export default class UVSphereGeometry extends Geometry {
    /**
     * 
     * @param {number} radius 
     * @param {number} segments 
     * @param {number} rings 
     */
    constructor(radius = 0.5, segments = 24, rings = 12) {
        super(
            UVSphereGeometry.#createPositions(radius, segments, rings),
            UVSphereGeometry.#createNormals(segments, rings)
        );

        /**
         * @type {number}
         */
        this.radius = radius;
        /**
         * @type {number}
         */
        this.segments = segments;
        /**
         * @type {number}
         */
        this.rings = rings;
    }

    static #createPositions(radius, segments,  rings) {
        const positions = [];
        const a = 2 * Math.PI / segments;
        const b = Math.PI / rings;
        const ry = Matrix3x3.rotation(a, 0, 1, 0);
        const rx = Matrix3x3.rotation(b, 1, 0, 0);
        
        let v0 = new Vector3(0, radius, 0);
        let v1 = ry.mulVector3(v0);
        let v2 = rx.mulVector3(v0);
        let v3 = ry.mulVector3(v2);
        for (let i = 0; i < rings + 1; i++) {
            for (let j = 0; j < segments; j++) {
                positions.push(v1.x, v1.y, v1.z, v0.x, v0.y, v0.z, v2.x, v2.y, v2.z);
                positions.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z, v3.x, v3.y, v3.z);
                v0 = v1;
                v1 = ry.mulVector3(v0);
                v2 = v3;
                v3 = ry.mulVector3(v2);
            }
            v0 = v2;
            v1 = ry.mulVector3(v0);
            v2 = rx.mulVector3(v0);
            v3 = ry.mulVector3(v2);
        }

        return new Float32Array(positions);
    }

    static #createNormals(segments, rings) {
        const normals = [];
        const a = 2 * Math.PI / segments;
        const b = Math.PI / rings;
        const ry = Matrix3x3.rotation(a, 0, 1, 0);
        const rx = Matrix3x3.rotation(b, 1, 0, 0);
        
        let v0 = new Vector3(0, 1, 0);
        let v1 = ry.mulVector3(v0);
        let v2 = rx.mulVector3(v0);
        let v3 = ry.mulVector3(v2);
        for (let i = 0; i < rings + 1; i++) {
            for (let j = 0; j < segments; j++) {
                normals.push(v1.x, v1.y, v1.z, v0.x, v0.y, v0.z, v2.x, v2.y, v2.z);
                normals.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z, v3.x, v3.y, v3.z);
                v0 = v1;
                v1 = ry.mulVector3(v0);
                v2 = v3;
                v3 = ry.mulVector3(v2);
            }
            v0 = v2;
            v1 = ry.mulVector3(v0);
            v2 = rx.mulVector3(v0);
            v3 = ry.mulVector3(v2);
        }

        return new Float32Array(normals);
    }
}