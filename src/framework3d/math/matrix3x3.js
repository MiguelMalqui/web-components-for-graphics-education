import Vector3 from "./vector3.js";

/**
 * Class representing a 3x3 matrix
 */
export default class Matrix3x3 {
    /**
     * Creates a matrix from the 9 arguments in a row-major order, or an 
     * identity matrix if there are no arguments
     */
    constructor(
        m11, m12, m13,
        m21, m22, m23,
        m31, m32, m33
    ) {
        if (arguments.length == 0) {
            this.data = [
                1, 0, 0,
                0, 1, 0,
                0, 0, 1
            ];
        } else {
            this.data = [
                m11, m21, m31,
                m12, m22, m32,
                m13, m23, m33
            ];
        }
    }

    /**
     * Sets the elements of the matrix form the arguments in a row-major order
     */
    set(
        m11, m12, m13,
        m21, m22, m23,
        m31, m32, m33
    ) {
        this.data = [
            m11, m21, m31,
            m12, m22, m32,
            m13, m23, m33
        ];
    }

    /**
     * Returns a new Matrix3x3, result of add m to this matrix
     * @param {Matrix3x3} m 
     * @returns {Matrix3x3}
     */
    add(m) {
        const r = new Matrix3x3();
        for (let i = 0; i < this.data.length; i++) {
            r.data[i] =  this.data[i] + m.data[i];
        }
        return r;
    }

    /**
     * Returns a new Matrix3x3, result of subtract m from this matrix
     * @param {Matrix3x3} m 
     * @returns {Matrix3x3}
     */
    sub(m) {
        const r = new Matrix3x3();
        for (let i = 0; i < this.data.length; i++) {
            r.data[i] = this.data[i] - m.data[i];
        }
        return r;
    }

    /**
     * Returns a new Matrix3x3, result of post multiply this matrix by m
     * @param {Matrix3x3} m 
     * @returns {Matrix3x3}
     */
    mul(m) {
        const ae = this.data;
        const be = m.data;
        const re = [
            0, 0, 0,
            0, 0, 0,
            0, 0, 0
        ];

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                for (let k = 0; k < 3; k++) {
                    re[col * 3 + row] += ae[k * 3 + row] * be[col * 3 + k];
                }
            }
        }

        const r = new Matrix3x3();
        r.data = re;
        return r;
    }

    /**
     * Returns a new Matrix3x3, result of multiply this matrix by scalar s
     * @param {number} s 
     * @returns {Matrix3x3}
     */
    mulScalar(s) {
        const r = new Matrix3x3();
        for (let i = 0; i < this.data.length; i++) {
            r.data[i] = this.data[i] * s;
        }
        return r;
    }

    /**
     * Returns a new Vector3, result of multiply this matrix by vector v
     * @param {Vector3} v 
     * @returns 
     */
    mulVector3(v) {
        const me = this.data;
        const x = v.x;
        const y = v.y;
        const z = v.z;
        const rx = x * me[0] + y * me[3] + z * me[6];
        const ry = x * me[1] + y * me[4] + z * me[7];
        const rz = x * me[2] + y * me[5] + z * me[8];
        return new Vector3(rx, ry, rz);
    }

    /**
     * Returns a new Matrix3x3, result of divide this matrix by scalar s
     * @param {number} s 
     * @returns {Matrix3x3}
     */
    divScalar(s) {
        const r = new Matrix3x3();
        for (let i = 0; i < this.data.length; i++) {
            r.data[i] = this.data[i] / s;
        }
        return r;
    }

    /**
     * Return a new Matrix3x3, result of multiply this matrix by another that
     * rotates coordinates through angle radians about the vector (x, y, z)
     * @param {number} angle - the angle in radians
     * @param {number} vx - the x coordinate of the vector
     * @param {number} vy - the y coordinate of the vector
     * @param {number} vz - the z coordinate of the vector
     * @returns 
     */
    rotate(angle, vx, vy, vz) {
        return this.mul(Matrix3x3.rotation(angle, vx, vy, vz));
    }

    /**
     * Return a new Matrix3x3, result of multiply this matrix by another that
     * rotates coordinates through angle radians about the x-axis
     * @param {number} angle - the angle in radians
     * @returns 
     */
    xRotate(angle) {
        return this.rotate(angle, 1, 0, 0);
    }

    /**
     * Return a new Matrix3x3, result of multiply this matrix by another that
     * rotates coordinates through angle radians about the y-axis
     * @param {number} angle - the angle in radians
     * @returns 
     */
    yRotate(angle) {
        return this.rotate(angle, 0, 1, 0);
    }

    /**
     * Return a new Matrix3x3, result of multiply this matrix by another that
     * rotates coordinates through angle radians about the z-axis
     * @param {number} angle - the angle in radians
     * @returns 
     */
    zRotate(angle) {
        return this.rotate(angle, 0, 0, 1);
    }

    /**
     * Return a new Matrix3x3, result of multiply this matrix by another that
     * scales coordinates by the components x, y and z
     * @param {number} sx - the amount to scale in x-axis
     * @param {number} sy - the amount to scale in y-axis
     * @param {number} sz - the amount to scale in z-axis.
     * @returns 
     */
    scale(sx, sy, sz) {
        return this.mul(Matrix3x3.scaling(sx, sy, sz));
    }

    /**
     * Returns a new matrix with the identical elements to this matrix
     * @returns {Matrix3x3}
     */
    clone() {
        const m = new Matrix3x3();
        m.data = [...this.data];
        return m;
    }

    /**
     * Copies the elements of the passed matrix m to this matrix
     * @param {Matrix3x3} m 
     */
    copy(m) {
        this.data = [...m.data];
    }

    /**
     * Determines whether another object is equal to this
     * @param {*} obj 
     * @returns {boolean}
     */
    equals(obj) {
        if (!(obj instanceof Matrix3x3)) {
            return false;
        }
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i] != obj.data[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Constructs a scaling matrix
     * @param {number} sx - the amount to scale in x-axis
     * @param {number} sy - the amount to scale in y-axis
     * @param {number} sz - the amount to scale in z-axis
     * @returns 
     */
    static scaling(sx, sy, sz) {
        return new Matrix3x3(
            sx, 0, 0,
            0, sy, 0,
            0, 0, sz
        );
    }

    /**
     * Constructs a rotation matrix
     * @param {number} angle - the angle in radians
     * @param {number} vx - the x coordinate of the vector
     * @param {number} vy - the y coordinate of the vector
     * @param {number} vz - the z coordinate of the vector
     * @returns 
     */
    static rotation(angle, vx, vy, vz) {
        if (vx == 0 && vy == 0 && vz == 0) {
            return new Matrix3x3();
        }

        const u = new Vector3(vx, vy, vz).normalize();
        const x = u.x;
        const y = u.y;
        const z = u.z;

        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        return new Matrix3x3(
            x * x * (1 - cos) + cos,
            x * y * (1 - cos) - z * sin,
            x * z * (1 - cos) + y * sin,

            x * y * (1 - cos) + z * sin,
            y * y * (1 - cos) + cos,
            y * z * (1 - cos) - x * sin,

            x * z * (1 - cos) - y * sin,
            y * z * (1 - cos) + x * sin,
            z * z * (1 - cos) + cos
        );
    }

    /**
     * Returns a string representation of this matrix
     * @returns 
     */
    toString() {
        return `Matrix3x3(${this.data})`;
    }
}