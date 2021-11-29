/**
 * Class representing a vector in 3D space. 
 */
export default class Vector3 {
    /**
     * Creates a vector with coordinates (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor(x = 0, y = 0, z = 0) {
        this.elements = [x, y, z];
    }

    get x() {
        return this.elements[0];
    }

    get y() {
        return this.elements[1];
    }

    get z() {
        return this.elements[2];
    }

    set x(x) {
        this.elements[0] = x;
    }

    set y(y) {
        this.elements[1] = y;
    }

    set z(z) {
        this.elements[2] = z;
    }

    /**
     * Returns the length of the vector from the origin.
     * @returns {number}
     */
    length() {
        const xx = this.x * this.x;
        const yy = this.y * this.y;
        const zz = this.z * this.z;
        return Math.sqrt(xx + yy + zz);
    }

    /**
     * Normalizes the currect vector in place.
     */
    normalize() {
        const length = this.length();
        this.x /= length;
        this.y /= length;
        this.z /= length;
    }

    /**
     * Returns the normalized unit vector form of this vector.
     * @returns {Vector3}
     */
    normalized() {
        const v = new Vector3(this.x, this.y, this.z);
        v.normalize();
        return v;
    }

    clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    copy(other) {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
    }

    static sum(vector1, vector2) {
        const x = vector1.x + vector2.x;
        const y = vector1.y + vector2.y;
        const z = vector1.z + vector2.z;
        return new Vector3(x, y, z);
    }

    static subtract(vector1, vector2) {
        const x = vector1.x - vector2.x;
        const y = vector1.y - vector2.y;
        const z = vector1.z - vector2.z;
        return new Vector3(x, y, z);
    }

    static cross(vector1, vector2) {
        const x = vector1.y * vector2.z - vector1.z * vector2.y;
        const y = vector1.z * vector2.x - vector1.x * vector2.z;
        const z = vector1.x * vector2.y - vector1.y * vector2.x;
        return new Vector3(x, y, z);
    }

    static dot(vector1, vector2) {
        const a = vector1.x * vector2.x;
        const b = vector1.y * vector2.y;
        const c = vector1.z * vector2.z;
        return a + b + c;
    }

    toString() {
        return `Vector3(${this.x}, ${this.y}, ${this.z})`;
    }
}