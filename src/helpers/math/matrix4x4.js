import Vector3 from "./vector3.js";

/**
 * Class representing a 4x4 matrix
 */
export default class Matrix4x4 {
    /**
     * Creates a matrix from the 16 arguments in a row-major order, or an 
     * identity matrix if there are no arguments
     */
    constructor(
        m11, m12, m13, m14,
        m21, m22, m23, m24,
        m31, m32, m33, m34,
        m41, m42, m43, m44
    ) {
        if (arguments.length == 0) {
            this.elements = Matrix4x4.#identity();
        } else {
            this.elements = [
                m11, m21, m31, m41,
                m12, m22, m32, m42,
                m13, m23, m33, m43,
                m14, m24, m34, m44
            ];
        }
    }

    /**
     * Sets the elements of the matrix form the arguments in a row-major order
     */
    set(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
        this.elements = [
            m11, m21, m31, m41,
            m12, m22, m32, m42,
            m13, m23, m33, m43,
            m14, m24, m34, m44
        ];
    }

    static #identity() {
        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }

    static #translation(tx, ty, tz) {
        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            tx, ty, tz, 1
        ];
    }

    static #rotation(angle, vx, vy, vz) {
        if (vx == 0 && vy == 0 && vz == 0) {
            return Matrix4x4.#identity();
        }

        const u = (new Vector3(vx, vy, vz)).normalized();
        const x = u.x;
        const y = u.y;
        const z = u.z;

        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        return [
            x * x * (1 - cos) + cos,
            x * y * (1 - cos) + z * sin,
            x * z * (1 - cos) - y * sin,
            0,

            x * y * (1 - cos) - z * sin,
            y * y * (1 - cos) + cos,
            y * z * (1 - cos) + x * sin,
            0,

            x * z * (1 - cos) + y * sin,
            y * z * (1 - cos) - x * sin,
            z * z * (1 - cos) + cos,
            0,

            0,
            0,
            0,
            1
        ];

    }

    static #scaling(sx, sy, sz) {
        return [
            sx, 0, 0, 0,
            0, sy, 0, 0,
            0, 0, sz, 0,
            0, 0, 0, 1
        ];
    }

    static #multiply(ae, be) {
        const ce = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0
        ];

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                for (let k = 0; k < 4; k++) {
                    ce[col * 4 + row] += ae[k * 4 + row] * be[col * 4 + k];
                }
            }
        }

        return ce;
    }

    static #inverse(me) {
        const inv = [];
        inv[0] = me[5]  * me[10] * me[15] - 
                 me[5]  * me[11] * me[14] - 
                 me[9]  * me[6]  * me[15] + 
                 me[9]  * me[7]  * me[14] +
                 me[13] * me[6]  * me[11] - 
                 me[13] * me[7]  * me[10];

        inv[4] = -me[4]  * me[10] * me[15] + 
                  me[4]  * me[11] * me[14] + 
                  me[8]  * me[6]  * me[15] - 
                  me[8]  * me[7]  * me[14] - 
                  me[12] * me[6]  * me[11] + 
                  me[12] * me[7]  * me[10];

        inv[8] = me[4]  * me[9] * me[15] - 
                 me[4]  * me[11] * me[13] - 
                 me[8]  * me[5] * me[15] + 
                 me[8]  * me[7] * me[13] + 
                 me[12] * me[5] * me[11] - 
                 me[12] * me[7] * me[9];

        inv[12] = -me[4]  * me[9] * me[14] + 
                   me[4]  * me[10] * me[13] +
                   me[8]  * me[5] * me[14] - 
                   me[8]  * me[6] * me[13] - 
                   me[12] * me[5] * me[10] + 
                   me[12] * me[6] * me[9];

        inv[1] = -me[1]  * me[10] * me[15] + 
                  me[1]  * me[11] * me[14] + 
                  me[9]  * me[2] * me[15] - 
                  me[9]  * me[3] * me[14] - 
                  me[13] * me[2] * me[11] + 
                  me[13] * me[3] * me[10];

        inv[5] = me[0]  * me[10] * me[15] - 
                 me[0]  * me[11] * me[14] - 
                 me[8]  * me[2] * me[15] + 
                 me[8]  * me[3] * me[14] + 
                 me[12] * me[2] * me[11] - 
                 me[12] * me[3] * me[10];

        inv[9] = -me[0]  * me[9] * me[15] + 
                  me[0]  * me[11] * me[13] + 
                  me[8]  * me[1] * me[15] - 
                  me[8]  * me[3] * me[13] - 
                  me[12] * me[1] * me[11] + 
                  me[12] * me[3] * me[9];

        inv[13] = me[0]  * me[9] * me[14] - 
                  me[0]  * me[10] * me[13] - 
                  me[8]  * me[1] * me[14] + 
                  me[8]  * me[2] * me[13] + 
                  me[12] * me[1] * me[10] - 
                  me[12] * me[2] * me[9];

        inv[2] = me[1]  * me[6] * me[15] - 
                 me[1]  * me[7] * me[14] - 
                 me[5]  * me[2] * me[15] + 
                 me[5]  * me[3] * me[14] + 
                 me[13] * me[2] * me[7] - 
                 me[13] * me[3] * me[6];

        inv[6] = -me[0]  * me[6] * me[15] + 
                  me[0]  * me[7] * me[14] + 
                  me[4]  * me[2] * me[15] - 
                  me[4]  * me[3] * me[14] - 
                  me[12] * me[2] * me[7] + 
                  me[12] * me[3] * me[6];

        inv[10] = me[0]  * me[5] * me[15] - 
                  me[0]  * me[7] * me[13] - 
                  me[4]  * me[1] * me[15] + 
                  me[4]  * me[3] * me[13] + 
                  me[12] * me[1] * me[7] - 
                  me[12] * me[3] * me[5];

        inv[14] = -me[0]  * me[5] * me[14] + 
                   me[0]  * me[6] * me[13] + 
                   me[4]  * me[1] * me[14] - 
                   me[4]  * me[2] * me[13] - 
                   me[12] * me[1] * me[6] + 
                   me[12] * me[2] * me[5];

        inv[3] = -me[1] * me[6] * me[11] + 
                  me[1] * me[7] * me[10] + 
                  me[5] * me[2] * me[11] - 
                  me[5] * me[3] * me[10] - 
                  me[9] * me[2] * me[7] + 
                  me[9] * me[3] * me[6];

        inv[7] = me[0] * me[6] * me[11] - 
                 me[0] * me[7] * me[10] - 
                 me[4] * me[2] * me[11] + 
                 me[4] * me[3] * me[10] + 
                 me[8] * me[2] * me[7] - 
                 me[8] * me[3] * me[6];

        inv[11] = -me[0] * me[5] * me[11] + 
                   me[0] * me[7] * me[9] + 
                   me[4] * me[1] * me[11] - 
                   me[4] * me[3] * me[9] - 
                   me[8] * me[1] * me[7] + 
                   me[8] * me[3] * me[5];

        inv[15] = me[0] * me[5] * me[10] - 
                  me[0] * me[6] * me[9] - 
                  me[4] * me[1] * me[10] + 
                  me[4] * me[2] * me[9] + 
                  me[8] * me[1] * me[6] - 
                  me[8] * me[2] * me[5];
        
        const det = 1 / (me[0] * inv[0] + me[1] * inv[4] + me[2] * inv[8] + me[3] * inv[12]);

        for (let i = 0; i < inv.length; i++) {
            inv[i] *= det;
        }

        return inv;
    }

    /**
     * Returns a new matrix, result of add this matrix and m
     * @param {Matrix4x4} m 
     * @returns {Matrix4x4}
     */
    add(m) {
        const result = new Matrix4x4();
        for (let i = 0; i < result.elements.length; i++) {
            result.elements[i] = this.elements[i] + m.elements[i];
        }
        return result;
    }

    /**
     * Adds this matrix and m in place
     * @param {Matrix4x4} m 
     * @returns
     */
    iadd(m) {
        for (let i = 0; i < result.elements.length; i++) {
            this.elements[i] = this.elements[i] + m.elements[i];
        }
        return this;
    }

    /**
     * Returns a new matrix, result of subtract m from this matrix
     * @param {Matrix4x4} m 
     * @returns {Matrix4x4}
     */
    sub(m) {
        const result = new Matrix4x4();
        for (let i = 0; i < result.elements.length; i++) {
            result.elements[i] = this.elements[i] - m.elements[i];
        }
        return result;
    }

    /**
     * Subtracts m from this matrix in place
     * @param {Matrix4x4} m 
     * @returns
     */
    isub(m) {
        for (let i = 0; i < result.elements.length; i++) {
            this.elements[i] = this.elements[i] - m.elements[i];
        }
        return this;
    }

    /**
     * Returns a new matrix, result of post multiply this matrix by m
     * @param {Matrix4x4} m 
     * @returns {Matrix4x4}
     */
    mul(m) {
        const result = new Matrix4x4();
        result.elements = Matrix4x4.#multiply(this.elements, m.elements);
        return result;
    }

    /**
     * Post multiplies this matrix by m in place
     * @param {Matrix4x4} m 
     * @returns
     */
    imul(m) {
        this.elements = Matrix4x4.#multiply(this.elements, m.elements);
        return this;
    }

    /**
     * Returns a new matrix, result of multiply this matrix by scalar s
     * @param {number} s 
     * @returns {Matrix4x4}
     */
    mulScalar(s) {
        const result = new Matrix4x4();
        for (let i = 0; i < result.elements.length; i++) {
            result.elements[i] = this.elements[i] * s;
        }
        return result;
    }

    /**
     * Multiplies this matrix by scalar s in place
     * @param {number} s 
     * @returns
     */
    imulScalar(s) {
        for (let i = 0; i < result.elements.length; i++) {
            this.elements[i] = this.elements[i] * s;
        }
        return this;
    }

    /**
     * Returns a new matrix, result of divide this matrix by scalar s
     * @param {number} s 
     * @returns {Matrix4x4}
     */
    divScalar(s) {
        const result = new Matrix4x4();
        for (let i = 0; i < result.elements.length; i++) {
            result.elements[i] = this.elements[i] / s;
        }
        return result;
    }

    /**
     * Divides this matrix by scalar s in place
     * @param {number} s 
     * @returns
     */
    idivScalar(s) {
        for (let i = 0; i < result.elements.length; i++) {
            this.elements[i] = this.elements[i] / s;
        }
        return this;
    }

    /**
     * Returns a new matrix, the inverse of this
     * @returns 
     */
    inverse() {
        const result = new Matrix4x4();
        result.elements = Matrix4x4.#inverse(this.elements);
        return result;
    }

    /**
     * Inverts this matrix in place
     * @returns 
     */
    invert() {
        this.elements = Matrix4x4.#inverse(this.elements);
        return this;
    }

    /**
     * Multiplies this matrix by another that translate coordinates by the 
     * components x, y and z
     * @param {number} tx - the amount to translate in the X axis
     * @param {number} ty - the amount to translate in the Y axis
     * @param {number} tz - the amount to translate in the Z axis
     * @returns
     */
    translate(tx, ty, tz) {
        const te = Matrix4x4.#translation(tx, ty, tz);
        this.elements = Matrix4x4.#multiply(this.elements, te);
        return this;
    }

    /**
     * Multiplies this matrix by another that rotates coordinates trough angle
     * about the vector (x, y, z)
     * @param {number} angle - the angle in radians
     * @param {number} vx - the x coordinate of the vector
     * @param {number} vy - the y coordinate of the vector
     * @param {number} vz - the z coordinate of the vector
     * @returns 
     */
    rotate(angle, vx, vy, vz) {
        const re = Matrix4x4.#rotation(angle, vx, vy, vz);
        this.elements = Matrix4x4.#multiply(this.elements, re);
        return this;
    }

    /**
     * Multiplies this matrix by another that scales coordinates by the 
     * components x, y and z
     * @param {number} sx - the amount to scale in the X axis
     * @param {number} sy - the amount to scale in the Y axis
     * @param {number} sz - the amount to scale in the Z axis.
     * @returns 
     */
    scale(sx, sy, sz) {
        const se = Matrix4x4.#scaling(sx, sy, sz);
        this.elements = Matrix4x4.#multiply(this.elements, se);
        return this;
    }

    /**
     * Returns a new matrix with the identical elements to this matrix
     * @returns {Matrix4x4}
     */
    clone() {
        const m = new Matrix4x4();
        m.elements = [...this.elements];
        return m;
    }

    /**
     * Copies the elements of the passed matrix m to this matrix
     * @param {Matrix4x4} m 
     */
    copy(m) {
        this.elements = [...m.elements];
    }

    /**
     * Returns true if the elements of this matrix and m are strictly equal, 
     * false otherwise
     * @param {Matrix4x4} m 
     * @returns {boolean}
     */
    equals(m) {
        if (!(m instanceof Matrix4x4)) {
            return false;
        }
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i] != m.elements[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Construct the perspective projection matrix
     * @param {number} fov - field of view
     * @param {number} ar - aspect ratio
     * @param {number} zNear - near clipping distance 
     * @param {number} zFar - far clipping distance 
     */
    static perspective(fov, ra, zNear, zFar) {
        const a = Math.tan(fov / 2.0);
        const c = (zNear + zFar) / (zNear - zFar);
        const d = 2 * zNear * zFar / (zNear - zFar);

        const matrix = new Matrix4x4();

        matrix.elements[0] = 1.0 / (ra * a);
        matrix.elements[1] = 0.0;
        matrix.elements[2] = 0.0;
        matrix.elements[3] = 0.0;

        matrix.elements[4] = 0.0;
        matrix.elements[5] = 1.0 / a;
        matrix.elements[6] = 0.0;
        matrix.elements[7] = 0.0;

        matrix.elements[8] = 0.0;
        matrix.elements[9] = 0.0;
        matrix.elements[10] = c;
        matrix.elements[11] = -1.0;

        matrix.elements[12] = 0.0;
        matrix.elements[13] = 0.0;
        matrix.elements[14] = d;
        matrix.elements[15] = 0.0;

        return matrix;
    }

    /**
     * Construct the orthogonal projection matrix
     * @param {number} left - left coordinate
     * @param {number} right - right coordinate
     * @param {number} bottom - bottom coordinate
     * @param {number} top - top coordinate
     * @param {number} zNear - near clipping distance
     * @param {number} zFar - far clipping distance
     */
    static orthogonal(left, right, bottom, top, zNear, zFar) {
        const matrix = new Matrix4x4();

        matrix.elements[0] = 2.0 / (right - left);
        matrix.elements[1] = 0.0;
        matrix.elements[2] = 0.0;
        matrix.elements[3] = 0.0;

        matrix.elements[4] = 0.0;
        matrix.elements[5] = 2.0 / (top - bottom);
        matrix.elements[6] = 0.0;
        matrix.elements[7] = 0.0;

        matrix.elements[8] = 0.0;
        matrix.elements[9] = 0.0;
        matrix.elements[10] = -2.0 / (zFar - zNear);
        matrix.elements[11] = 0.0;

        matrix.elements[12] = - (right + left) / (right - left);
        matrix.elements[13] = - (top + bottom) / (top - bottom);
        matrix.elements[14] = - (zFar + zNear) / (zFar - zNear);
        matrix.elements[15] = 1.0;

        return matrix;
    }

    /**
     * Construct a rotation matrix, looking from obs towards vrp oriented by 
     * the up vector
     * @param {Vector3} obs 
     * @param {Vector3} vrp 
     * @param {Vector3} up 
     */
    static lookAt(obs, vrp, up) {
        const zAxis = obs.sub(vrp).normalized();
        const xAxis = up.cross(zAxis).normalized();
        const yAxis = zAxis.cross(xAxis);

        const matrix = new Matrix4x4();

        matrix.elements[0] = xAxis.x;
        matrix.elements[1] = yAxis.x;
        matrix.elements[2] = zAxis.x;
        matrix.elements[3] = 0.0;

        matrix.elements[4] = xAxis.y;
        matrix.elements[5] = yAxis.y;
        matrix.elements[6] = zAxis.y;
        matrix.elements[7] = 0.0;

        matrix.elements[8] = xAxis.z;
        matrix.elements[9] = yAxis.z;
        matrix.elements[10] = zAxis.z;
        matrix.elements[11] = 0.0;

        matrix.elements[12] = -xAxis.dot(obs);
        matrix.elements[13] = -yAxis.dot(obs);
        matrix.elements[14] = -zAxis.dot(obs);
        matrix.elements[15] = 1.0;

        return matrix;
    }

    /**
     * Returns a string representation of this matrix
     * @returns 
     */
    toString() {
        return `Matrix4x4(${this.elements})`;
    }
}