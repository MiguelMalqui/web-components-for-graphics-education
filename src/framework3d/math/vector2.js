/**
 * Class representing a vector in 2D space. 
 */
export default class Vector2 {
    /**
     * Creates a vector with coordinates (x, y)
     * @param {number} x - the x coordinate, default is 0
     * @param {number} y - the y coordinate, default is 0
     */
    constructor(x = 0, y = 0) {
        /**
         * @type {number} the x coordinate of the vector
         */
        this.x = x;
        /**
         * @type {number} the y coordinate of the vector
         */
        this.y = y;
    }

    /**
     * Returns the length of the vector from the origin.
     * @returns {number}
     */
    length() {
        const xx = this.x * this.x;
        const yy = this.y * this.y;
        return Math.sqrt(xx + yy);
    }

    /**
     * Returns the euclidean distance form this vector to v
     * @param {Vector2} v 
     * @returns 
     */
    distanceTo(v) {
        const x = this.x - v.x;
        const y = this.y - v.y;
        return Math.sqrt(x * x + y * y)
    }

    /**
     * Returns a new Vector2, result of add v to this vector
     * @param {Vector2} v 
     * @returns {Vector2}
     */
    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    /**
     * Returns a new Vector2, result of add the scalar value s to this vector's 
     * x and y values
     * @param {number} s 
     * @returns {Vector2}
     */
    addScalar(s) {
        return new Vector2(this.x + s, this.y + s);
    }

    /**
     * Returns a new Vector2, result of subtract v from this vector
     * @param {Vector} v 
     * @returns {Vector2}
     */
    sub(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    /**
     * Returns a new Vector2, result of subtract the scalar value s from this
     * vector's x and y values
     * @param {number} s 
     * @returns {Vector2}
     */
    subScalar(s) {
        return new Vector2(this.x - s, this.y - s);
    }

    /**
     * Returns a new Vector2, result of multiply this vector by scalar s
     * @param {number} s 
     * @returns {Vector2}
     */
    mulScalar(s) {
        return new Vector2(this.x * s, this.y * s);
    }

    /**
     * Returns a new Vector2, result of divide this vector by scalar s
     * @param {number} s 
     * @returns {Vector2}
     */
    divScalar(s) {
        return new Vector2(this.x / s, this.y / s);
    }

    /**
     * Returns the result of the dot product of this vector and v
     * @param {Vector2} v 
     * @returns {number}
     */
    dot(v) {
        const a = this.x * v.x;
        const b = this.y * v.y;
        return a + b;
    }

    /**
     * Returns a new Vector2, result of normalize this vector
     * @returns
     */
    normalize() {
        const length = this.length();
        return new Vector2(this.x / length, this.y / length);
    }

    /**
     * Returns a new vector with the same x and y values as this vector
     * @returns {Vector2}
     */
    clone() {
        return new Vector2(this.x, this.y);
    }

    /**
     * Copies the x and y values of the passed vector v to this vector
     * @param {Vector2} v 
     */
    copy(v) {
        this.x = v.x;
        this.y = v.y;
    }

    /**
     * Determines whether another object is equal to this
     * @param {*} obj 
     * @returns {boolean}
     */
    equals(obj) {
        return obj instanceof Vector2
            && this.x == obj.x && this.y == obj.y;
    }

    /**
     * Returns a string representation of this vector
     * @returns 
     */
    toString() {
        return `Vector2(${this.x}, ${this.y})`;
    }
}