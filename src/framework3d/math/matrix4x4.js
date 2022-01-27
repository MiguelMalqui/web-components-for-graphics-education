import Vector3 from "./vector3.js";
import Vector4 from "./vector4.js";

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
            this.data = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];
        } else {
            this.data = [
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
    set(
        m11, m12, m13, m14,
        m21, m22, m23, m24,
        m31, m32, m33, m34,
        m41, m42, m43, m44
    ) {
        this.data = [
            m11, m21, m31, m41,
            m12, m22, m32, m42,
            m13, m23, m33, m43,
            m14, m24, m34, m44
        ];
    }

    /**
     * Returns a new Matrix4x4, result of add m to this matrix
     * @param {Matrix4x4} m 
     * @returns {Matrix4x4}
     */
    add(m) {
        const r = new Matrix4x4();
        for (let i = 0; i < this.data.length; i++) {
            r.data[i] =  this.data[i] + m.data[i];
        }
        return r;
    }

    /**
     * Returns a new Matrix4x4, result of subtract m from this matrix
     * @param {Matrix4x4} m 
     * @returns {Matrix4x4}
     */
    sub(m) {
        const r = new Matrix4x4();
        for (let i = 0; i < this.data.length; i++) {
            r.data[i] = this.data[i] - m.data[i];
        }
        return r;
    }

    /**
     * Returns a new Matrix4x4, result of post multiply this matrix by m
     * @param {Matrix4x4} m 
     * @returns {Matrix4x4}
     */
    mul(m) {
        const ae = this.data;
        const be = m.data;
        const re = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0
        ];

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                for (let k = 0; k < 4; k++) {
                    re[col * 4 + row] += ae[k * 4 + row] * be[col * 4 + k];
                }
            }
        }

        const r = new Matrix4x4();
        r.data = re;
        return r;
    }

    /**
     * Returns a new Matrix4x4, result of multiply this matrix by scalar s
     * @param {number} s 
     * @returns {Matrix4x4}
     */
    mulScalar(s) {
        const r = new Matrix4x4();
        for (let i = 0; i < this.data.length; i++) {
            r.data[i] = this.data[i] * s;
        }
        return r;
    }

    /**
     * Returns a new Vector4, result of multiply this matrix by vector v
     * @param {Vector4} v 
     * @returns 
     */
    mulVector4(v) {
        const m = this.data;
        const x = v.x;
        const y = v.y;
        const z = v.z;
        const w = v.w;
        const rx = x * m[0] + y * m[4] + z * m[8] + w * m[12];
        const ry = x * m[1] + y * m[5] + z * m[9] + w * m[13];
        const rz = x * m[2] + y * m[6] + z * m[10] + w * m[14];
        const rw = x * m[3] + y * m[7] + z * m[11] + w * m[15];
        return new Vector4(rx, ry, rz, rw);
    }

    /**
     * Returns a new Matrix4x4, result of divide this matrix by scalar s
     * @param {number} s 
     * @returns {Matrix4x4}
     */
    divScalar(s) {
        const r = new Matrix4x4();
        for (let i = 0; i < this.data.length; i++) {
            r.data[i] = this.data[i] / s;
        }
        return r;
    }

    /**
     * Returns a new Matrix4x4, result of invert this matrix. Return identity 
     * if it cannot be inverted
     * @returns 
     */
    inverse() {
        const inv = [];
        const m = this.data;

        inv[0] = m[5]  * m[10] * m[15] - 
                 m[5]  * m[11] * m[14] - 
                 m[9]  * m[6]  * m[15] + 
                 m[9]  * m[7]  * m[14] +
                 m[13] * m[6]  * m[11] - 
                 m[13] * m[7]  * m[10];

        inv[4] = -m[4]  * m[10] * m[15] + 
                  m[4]  * m[11] * m[14] + 
                  m[8]  * m[6]  * m[15] - 
                  m[8]  * m[7]  * m[14] - 
                  m[12] * m[6]  * m[11] + 
                  m[12] * m[7]  * m[10];

        inv[8] = m[4]  * m[9] * m[15] - 
                 m[4]  * m[11] * m[13] - 
                 m[8]  * m[5] * m[15] + 
                 m[8]  * m[7] * m[13] + 
                 m[12] * m[5] * m[11] - 
                 m[12] * m[7] * m[9];

        inv[12] = -m[4]  * m[9] * m[14] + 
                   m[4]  * m[10] * m[13] +
                   m[8]  * m[5] * m[14] - 
                   m[8]  * m[6] * m[13] - 
                   m[12] * m[5] * m[10] + 
                   m[12] * m[6] * m[9];

        inv[1] = -m[1]  * m[10] * m[15] + 
                  m[1]  * m[11] * m[14] + 
                  m[9]  * m[2] * m[15] - 
                  m[9]  * m[3] * m[14] - 
                  m[13] * m[2] * m[11] + 
                  m[13] * m[3] * m[10];

        inv[5] = m[0]  * m[10] * m[15] - 
                 m[0]  * m[11] * m[14] - 
                 m[8]  * m[2] * m[15] + 
                 m[8]  * m[3] * m[14] + 
                 m[12] * m[2] * m[11] - 
                 m[12] * m[3] * m[10];

        inv[9] = -m[0]  * m[9] * m[15] + 
                  m[0]  * m[11] * m[13] + 
                  m[8]  * m[1] * m[15] - 
                  m[8]  * m[3] * m[13] - 
                  m[12] * m[1] * m[11] + 
                  m[12] * m[3] * m[9];

        inv[13] = m[0]  * m[9] * m[14] - 
                  m[0]  * m[10] * m[13] - 
                  m[8]  * m[1] * m[14] + 
                  m[8]  * m[2] * m[13] + 
                  m[12] * m[1] * m[10] - 
                  m[12] * m[2] * m[9];

        inv[2] = m[1]  * m[6] * m[15] - 
                 m[1]  * m[7] * m[14] - 
                 m[5]  * m[2] * m[15] + 
                 m[5]  * m[3] * m[14] + 
                 m[13] * m[2] * m[7] - 
                 m[13] * m[3] * m[6];

        inv[6] = -m[0]  * m[6] * m[15] + 
                  m[0]  * m[7] * m[14] + 
                  m[4]  * m[2] * m[15] - 
                  m[4]  * m[3] * m[14] - 
                  m[12] * m[2] * m[7] + 
                  m[12] * m[3] * m[6];

        inv[10] = m[0]  * m[5] * m[15] - 
                  m[0]  * m[7] * m[13] - 
                  m[4]  * m[1] * m[15] + 
                  m[4]  * m[3] * m[13] + 
                  m[12] * m[1] * m[7] - 
                  m[12] * m[3] * m[5];

        inv[14] = -m[0]  * m[5] * m[14] + 
                   m[0]  * m[6] * m[13] + 
                   m[4]  * m[1] * m[14] - 
                   m[4]  * m[2] * m[13] - 
                   m[12] * m[1] * m[6] + 
                   m[12] * m[2] * m[5];

        inv[3] = -m[1] * m[6] * m[11] + 
                  m[1] * m[7] * m[10] + 
                  m[5] * m[2] * m[11] - 
                  m[5] * m[3] * m[10] - 
                  m[9] * m[2] * m[7] + 
                  m[9] * m[3] * m[6];

        inv[7] = m[0] * m[6] * m[11] - 
                 m[0] * m[7] * m[10] - 
                 m[4] * m[2] * m[11] + 
                 m[4] * m[3] * m[10] + 
                 m[8] * m[2] * m[7] - 
                 m[8] * m[3] * m[6];

        inv[11] = -m[0] * m[5] * m[11] + 
                   m[0] * m[7] * m[9] + 
                   m[4] * m[1] * m[11] - 
                   m[4] * m[3] * m[9] - 
                   m[8] * m[1] * m[7] + 
                   m[8] * m[3] * m[5];

        inv[15] = m[0] * m[5] * m[10] - 
                  m[0] * m[6] * m[9] - 
                  m[4] * m[1] * m[10] + 
                  m[4] * m[2] * m[9] + 
                  m[8] * m[1] * m[6] - 
                  m[8] * m[2] * m[5];
        
        let det = m[0] * inv[0] + m[1] * inv[4] + m[2] * inv[8] + m[3] * inv[12];

        if (det == 0) {
            return new Matrix4x4();
        }

        det = 1.0 / det;

        for (let i = 0; i < inv.length; i++) {
            inv[i] *= det;
        }

        const r = new Matrix4x4();
        r.data = inv;
        return r;
    }

    /**
     * Return a new Matrix4x4, result of multiply this matrix by another that
     * translate coordinates by the components x, y and z
     * @param {number} tx - the amount to translate in x-axis
     * @param {number} ty - the amount to translate in y-axis
     * @param {number} tz - the amount to translate in z-axis
     * @returns
     */
    translate(tx, ty, tz) {
        return this.mul(Matrix4x4.translation(tx, ty, tz));
    }

    /**
     * Return a new Matrix4x4, result of multiply this matrix by another that
     * rotates coordinates through angle radians about the vector (x, y, z)
     * @param {number} angle - the angle in radians
     * @param {number} vx - the x coordinate of the vector
     * @param {number} vy - the y coordinate of the vector
     * @param {number} vz - the z coordinate of the vector
     * @returns 
     */
    rotate(angle, vx, vy, vz) {
        return this.mul(Matrix4x4.rotation(angle, vx, vy, vz));
    }

    /**
     * Return a new Matrix4x4, result of multiply this matrix by another that
     * rotates coordinates through angle radians about the x-axis
     * @param {number} angle - the angle in radians
     * @returns 
     */
    xRotate(angle) {
        return this.rotate(angle, 1, 0, 0);
    }

    /**
     * Return a new Matrix4x4, result of multiply this matrix by another that
     * rotates coordinates through angle radians about the y-axis
     * @param {number} angle - the angle in radians
     * @returns 
     */
    yRotate(angle) {
        return this.rotate(angle, 0, 1, 0);
    }

    /**
     * Return a new Matrix4x4, result of multiply this matrix by another that
     * rotates coordinates through angle radians about the z-axis
     * @param {number} angle - the angle in radians
     * @returns 
     */
    zRotate(angle) {
        return this.rotate(angle, 0, 0, 1);
    }

    /**
     * Return a new Matrix4x4, result of multiply this matrix by another that
     * scales coordinates by the components x, y and z
     * @param {number} sx - the amount to scale in x-axis
     * @param {number} sy - the amount to scale in y-axis
     * @param {number} sz - the amount to scale in z-axis.
     * @returns 
     */
    scale(sx, sy, sz) {
        return this.mul(Matrix4x4.scaling(sx, sy, sz));
    }

    /**
     * Returns a new matrix with the identical elements to this matrix
     * @returns {Matrix4x4}
     */
    clone() {
        const matrix = new Matrix4x4();
        matrix.data = [...this.data];
        return matrix;
    }

    /**
     * Copies the elements of the passed matrix m to this matrix
     * @param {Matrix4x4} m 
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
        if (!(obj instanceof Matrix4x4)) {
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
     * Constructs a translation matrix
     * @param {number} tx - the amount to translate in x-axis
     * @param {number} ty - the amount to translate in y-axis
     * @param {number} tz - the amount to translate in z-axis
     * @returns 
     */
    static translation(tx, ty, tz) {
        return new Matrix4x4(
            1, 0, 0, tx,
            0, 1, 0, ty,
            0, 0, 1, tz,
            0, 0, 0, 1
        );
    }

    /**
     * Constructs a scaling matrix
     * @param {number} sx - the amount to scale in x-axis
     * @param {number} sy - the amount to scale in y-axis
     * @param {number} sz - the amount to scale in z-axis
     * @returns 
     */
    static scaling(sx, sy, sz) {
        return new Matrix4x4(
            sx, 0, 0, 0,
            0, sy, 0, 0,
            0, 0, sz, 0,
            0, 0, 0, 1
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
            return new Matrix4x4();
        }

        const u = new Vector3(vx, vy, vz).normalize();
        const x = u.x;
        const y = u.y;
        const z = u.z;

        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        return new Matrix4x4(
            x * x * (1 - cos) + cos,
            x * y * (1 - cos) - z * sin,
            x * z * (1 - cos) + y * sin,
            0,

            x * y * (1 - cos) + z * sin,
            y * y * (1 - cos) + cos,
            y * z * (1 - cos) - x * sin,
            0,

            x * z * (1 - cos) - y * sin,
            y * z * (1 - cos) + x * sin,
            z * z * (1 - cos) + cos,
            0,

            0, 0, 0, 1
        );
    }

    /**
     * Construct a perspective projection matrix
     * @param {number} fieldOfView - field of view
     * @param {number} aspectRatio - aspect ratio
     * @param {number} zNear - near clipping distance 
     * @param {number} zFar - far clipping distance 
     */
    static perspective(fieldOfView, aspectRatio, zNear, zFar) {
        const a = Math.tan(fieldOfView / 2.0);
        const c = (zNear + zFar) / (zNear - zFar);
        const d = 2 * zNear * zFar / (zNear - zFar);

        const matrix = new Matrix4x4();

        matrix.data[0] = 1.0 / (aspectRatio * a);
        matrix.data[1] = 0.0;
        matrix.data[2] = 0.0;
        matrix.data[3] = 0.0;

        matrix.data[4] = 0.0;
        matrix.data[5] = 1.0 / a;
        matrix.data[6] = 0.0;
        matrix.data[7] = 0.0;

        matrix.data[8] = 0.0;
        matrix.data[9] = 0.0;
        matrix.data[10] = c;
        matrix.data[11] = -1.0;

        matrix.data[12] = 0.0;
        matrix.data[13] = 0.0;
        matrix.data[14] = d;
        matrix.data[15] = 0.0;

        return matrix;
    }

    /**
     * Construct a orthographic projection matrix
     * @param {number} left - left coordinate
     * @param {number} right - right coordinate
     * @param {number} bottom - bottom coordinate
     * @param {number} top - top coordinate
     * @param {number} zNear - near clipping distance
     * @param {number} zFar - far clipping distance
     */
    static orthographic(left, right, bottom, top, zNear, zFar) {
        const matrix = new Matrix4x4();

        matrix.data[0] = 2.0 / (right - left);
        matrix.data[1] = 0.0;
        matrix.data[2] = 0.0;
        matrix.data[3] = 0.0;

        matrix.data[4] = 0.0;
        matrix.data[5] = 2.0 / (top - bottom);
        matrix.data[6] = 0.0;
        matrix.data[7] = 0.0;

        matrix.data[8] = 0.0;
        matrix.data[9] = 0.0;
        matrix.data[10] = -2.0 / (zFar - zNear);
        matrix.data[11] = 0.0;

        matrix.data[12] = - (right + left) / (right - left);
        matrix.data[13] = - (top + bottom) / (top - bottom);
        matrix.data[14] = - (zFar + zNear) / (zFar - zNear);
        matrix.data[15] = 1.0;

        return matrix;
    }

    /**
     * Construct a matrix that positions / rotates something to point to 
     * (look at) a point in space, from another point in space
     * @param {Vector3} observer - the position of the observer
     * @param {Vector3} target - the position of the target
     * @param {Vector3} up - the up direction of the observer
     */
    static lookAt(observer, target, up) {
        const zAxis = observer.sub(target).normalize();
        const xAxis = up.cross(zAxis).normalize();
        const yAxis = zAxis.cross(xAxis);

        const matrix = new Matrix4x4();

        matrix.data[0] = xAxis.x;
        matrix.data[1] = yAxis.x;
        matrix.data[2] = zAxis.x;
        matrix.data[3] = 0.0;

        matrix.data[4] = xAxis.y;
        matrix.data[5] = yAxis.y;
        matrix.data[6] = zAxis.y;
        matrix.data[7] = 0.0;

        matrix.data[8] = xAxis.z;
        matrix.data[9] = yAxis.z;
        matrix.data[10] = zAxis.z;
        matrix.data[11] = 0.0;

        matrix.data[12] = -xAxis.dot(observer);
        matrix.data[13] = -yAxis.dot(observer);
        matrix.data[14] = -zAxis.dot(observer);
        matrix.data[15] = 1.0;

        return matrix;
    }

    /**
     * Returns a string representation of this matrix
     * @returns 
     */
    toString() {
        return `Matrix4x4(${this.data})`;
    }
}