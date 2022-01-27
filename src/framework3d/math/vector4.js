import Matrix4x4 from "./matrix4x4.js";

/**
 * Class representing a vector in 4D space. 
 */
export default class Vector4 {
    /**
     * Creates a vector with coordinates (x, y, z, w)
     * @param {number} x - the x coordinate, default is 0
     * @param {number} y - the y coordinate, default is 0
     * @param {number} z - the z coordinate, default is 0
     * @param {number} w - the w coordinate, default is 0
     */
    constructor(x = 0, y = 0, z = 0, w = 0) {
        /**
         * @type {number} the x coordinate of the vector
         */
        this.x = x;
        /**
         * @type {number} the y coordinate of the vector
         */
        this.y = y;
        /**
         * @type {number} the z coordinate of the vector
         */
        this.z = z;
        /**
         * @type {number} the w coordinate of the vector
         */
        this.w = w;
    }

    /**
     * Returns the length of the vector from the origin.
     * @returns {number}
     */
    length() {
        const xx = this.x * this.x;
        const yy = this.y * this.y;
        const zz = this.z * this.z;
        const ww = this.w * this.w;
        return Math.sqrt(xx + yy + zz + ww);
    }

    /**
     * Returns the euclidean distance form this vector to v
     * @param {Vector4} v 
     * @returns 
     */
    distanceTo(v) {
        const x = this.x - v.x;
        const y = this.y - v.y;
        const z = this.z - v.z;
        const w = this.w - v.w;
        return Math.sqrt(x * x + y * y + z * z + w * w);
    }

    /**
     * Returns a new Vector4, result of add v to this vector
     * @param {Vector4} v 
     * @returns {Vector4}
     */
    add(v) {
        const x = this.x + v.x;
        const y = this.y + v.y;
        const z = this.z + v.z;
        const w = this.w + v.w;
        return new Vector4(x, y, z, w);
    }

    /**
     * Returns a new Vector4, result of add the scalar value s to this vector's 
     * x, y, z and w values
     * @param {number} s 
     * @returns {Vector4}
     */
    addScalar(s) {
        const x = this.x + s;
        const y = this.y + s;
        const z = this.z + s;
        const w = this.w + s;
        return new Vector4(x, y, z, w);
    }

    /**
     * Returns a new Vector4, result of subtract v from this vector
     * @param {Vector} v 
     * @returns {Vector4}
     */
    sub(v) {
        const x = this.x - v.x;
        const y = this.y - v.y;
        const z = this.z - v.z;
        const w = this.w - v.w;
        return new Vector4(x, y, z, w);
    }

    /**
     * Returns a new Vector4, result of subtract the scalar value s from this
     * vector's x, y, z and w values
     * @param {number} s 
     * @returns {Vector4}
     */
    subScalar(s) {
        const x = this.x - s;
        const y = this.y - s;
        const z = this.z - s;
        const w = this.w - s;
        return new Vector4(x, y, z, w);
    }

    /**
     * Returns a new Vector4, result of multiply this vector by scalar s
     * @param {number} s 
     * @returns {Vector4}
     */
    mulScalar(s) {
        const x = this.x * s;
        const y = this.y * s;
        const z = this.z * s;
        const w = this.w * s;
        return new Vector4(x, y, z, w);
    }

    /**
     * Returns a new Vector4, result of multiply this vector by matrix m
     * @param {Matrix4x4} m 
     * @returns {Vector4}
     */
    mulMatrix4x4(m) {
        const me = m.data;
        const x = this.x;
        const y = this.y;
        const z = this.z;
        const w = this.w;
        const rx = x * me[0] + y * me[1] + z * me[2] + w * me[3];
        const ry = x * me[4] + y * me[5] + z * me[6] + w * me[7];
        const rz = x * me[8] + y * me[9] + z * me[10] + w * me[11];
        const rw = x * me[12] + y * me[13] + z * me[14] + w * me[15];
        return new Vector4(rx, ry, rz, rw);
    }

    /**
     * Returns a new Vector4, result of divide this vector by scalar s
     * @param {number} s 
     * @returns {Vector4}
     */
    divScalar(s) {
        const x = this.x / s;
        const y = this.y / s;
        const z = this.z / s;
        const w = this.w / s;
        return new Vector4(x, y, z, w);
    }

    /**
     * Returns the result of the dot product of this vector and v
     * @param {Vector4} v 
     * @returns {number}
     */
    dot(v) {
        const a = this.x * v.x;
        const b = this.y * v.y;
        const c = this.z * v.z;
        const d = this.w * v.w
        return a + b + c + d;
    }

    /**
     * Returns a new Vector4, result of normalize this vector
     * @returns
     */
    normalize() {
        const length = this.length();
        return new Vector4(
            this.x / length, this.y / length, this.z / length, this.w / length
        );
    }

    /**
     * Returns a new vector with the same x, y, z and w values as this vector
     * @returns {Vector4}
     */
    clone() {
        return new Vector4(this.x, this.y, this.z, this.w);
    }

    /**
     * Copies the x, y, z and w values of the passed vector v to this vector
     * @param {Vector4} v 
     */
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        this.w = v.w;
    }

    /**
     * Determines whether another object is equal to this
     * @param {*} obj 
     * @returns {boolean}
     */
    equals(obj) {
        return obj instanceof Vector4
            && this.x == obj.x
            && this.y == obj.y
            && this.z == obj.z
            && this.w == obj.w;
    }

    /**
     * Returns a string representation of this vector
     * @returns 
     */
    toString() {
        return `Vector4(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
    }
}