/**
 * Class representing a vector in 3D space. 
 */
export default class Vector3 {
    /**
     * Creates a vector with coordinates (x, y, z)
     * @param {number} x - the x coordinate, default is 0
     * @param {number} y - the y coordinate, default is 0
     * @param {number} z - the z coordinate, default is 0
     */
    constructor(x = 0, y = 0, z = 0) {
        this.elements = [x, y, z];
    }

    /**
     * @type {number} the x coordinate of the vector
     */
    get x() {
        return this.elements[0];
    }

    set x(x) {
        this.elements[0] = x;
    }

    /**
     * @type {number} the y coordinate of the vector
     */
    get y() {
        return this.elements[1];
    }

    set y(y) {
        this.elements[1] = y;
    }

    /**
     * @type {number} the z coordinate of the vector
     */
    get z() {
        return this.elements[2];
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
     * Returns the euclidean distance form this vector to v
     * @param {Vector3} v 
     * @returns 
     */
    distanceTo(v) {
        const x = this.x - v.x;
        const y = this.y - v.y;
        const z = this.z - v.z;
        return Math.sqrt(x * x + y * y + z * z)
    }

    /**
     * Returns a new vector, result of add this vector and v
     * @param {Vector3} v 
     * @returns {Vector3}
     */
    add(v) {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    /**
     * Adds v to this vector in place
     * @param {Vector3} v 
     * @returns 
     */
    iadd(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    /**
     * Returns a new vector, result of add the scalar value s to this vector's 
     * x, y and z values
     * @param {number} s 
     * @returns {Vector3}
     */
    addScalar(s) {
        return new Vector3(this.x * s, this.y * s, this.z * s);
    }

    /**
     * Adds the scalar value s to this vector's x, y and z values in place
     * @param {number} s 
     * @returns 
     */
    iaddScalar(s) {
        this.x += s;
        this.y += s;
        this.z += s;
        return this;
    }

    /**
     * Returns a new vector, result of subtract v from this vector
     * @param {Vector} v 
     * @returns {Vector3}
     */
    sub(v) {
        return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    /**
     * Subtracts v from this vector in place
     * @param {Vector} v 
     * @returns 
     */
    isub(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    /**
     * Returns a new vector, reuslt of subtract the scalar value s from this
     * vector's x, y and z values
     * @param {number} s 
     * @returns {Vector3}
     */
    subScalar(s) {
        return new Vector3(this.x - s, this.y - s, this.z - s);
    }

    /**
     * Subtracts the scalar value s from this vector's x, y and z values in 
     * place
     * @param {number} s 
     * @returns 
     */
    isubScalar(s) {
        this.x -= s;
        this.y -= s;
        this.z -= s;
        return this;
    }

    /**
     * Returns a new vector, reuslt of multiply this vector by scalar s
     * @param {number} s 
     * @returns {Vector3}
     */
    mulScalar(s) {
        return new Vector3(this.x * s, this.y * s, this.z * s);
    }

    /**
     * Multiplies this vector by scalar s in place
     * @param {number} s 
     * @returns 
     */
    imulScalar(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;
    }

    /**
     * Returns a new vector, reuslt of divide this vector by scalar s
     * @param {number} s 
     * @returns {Vector3}
     */
    divScalar(s) {
        return new Vector3(this.x / s, this.y / s, this.z / s);
    }

    /**
     * Divides this vector by scalar s in place
     * @param {number} s 
     * @returns 
     */
    idivScalar(s) {
        this.x /= s;
        this.y /= s;
        this.z /= s;
        return this;
    }

    /**
     * Returns the result of the dot product of this vector and v
     * @param {Vector3} v 
     * @returns {number}
     */
    dot(v) {
        const a = this.x * v.x;
        const b = this.y * v.y;
        const c = this.z * v.z;
        return a + b + c;
    }

    /**
     * Returns a new vector, result of the cross product of this vector and v
     * @param {Vector3} v 
     * @returns 
     */
    cross(v) {
        const x = this.y * v.z - this.z * v.y;
        const y = this.z * v.x - this.x * v.z;
        const z = this.x * v.y - this.y * v.x;
        return new Vector3(x, y, z);
    }

    /**
     * Normalizes the currect vector in place.
     * @returns
     */
    normalize() {
        const length = this.length();
        this.x /= length;
        this.y /= length;
        this.z /= length;
        return this;
    }

    /**
     * Returns a new vector, the normalized unit vector form of this vector.
     * @returns {Vector3}
     */
    normalized() {
        const length = this.length();
        return new Vector3(this.x / length, this.y / length, this.z / length);
    }

    /**
     * Returns a new vector with the same x, y and z values as this vector
     * @returns {Vector3}
     */
    clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    /**
     * Copies the x, y and z values of the passed vector v to this vector
     * @param {Vector3} v 
     */
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
    }

    /**
     * Returns true if the components of this vector and v are strictly equal, 
     * false otherwise
     * @param {Vector3} v 
     * @returns {boolean}
     */
    equals(v) {
        return v instanceof Vector3
            && this.x == v.x && this.y == v.z && this.z == v.z;
    }

    toString() {
        return `Vector3(${this.x}, ${this.y}, ${this.z})`;
    }
}