import Vector3 from "./vector3.js";

export default class Matrix4x4 {
    constructor() {
        this.elements = Matrix4x4.#identity();
    }

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
             1,  0,  0, 0,
             0,  1,  0, 0,
             0,  0,  1, 0,
            tx, ty, tz, 1
        ];
    }

    static #rotation(angle, vx, vy, vz) {
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
            sx,  0,  0, 0,
             0, sy,  0, 0,
             0,  0, sz, 0,
             0,  0,  0, 1
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
                    ce[col*4 + row] += ae[k*4 + row] * be[col*4 + k];
                }
            }
        }

        return ce;
    }

    static multiply(a, b) {
        const me = Matrix4x4.#multiply(a.elements, b.elements);
        const result = new Matrix4x4();
        result.elements = me;
        return result;
    }

    translate(tx, ty, tz) {
        const te = Matrix4x4.#translation(tx, ty, tz);
        const me = Matrix4x4.#multiply(this.elements, te);
        this.elements = me;
    }

    rotate(angle, vx, vy, vz) {
        if (vx != 0 || vy != 0 || vz != 0) {
            const re = Matrix4x4.#rotation(angle, vx, vy, vz);
            const me = Matrix4x4.#multiply(this.elements, re);
            this.elements = me;
        }
    }

    scale(sx, sy, sz) {
        const se = Matrix4x4.#scaling(sx, sy, sz);
        const me = Matrix4x4.#multiply(this.elements, se);
        this.elements = me;
    }

    perspective(fov, ra, zNear, zFar) {
        const a = Math.tan(fov / 2.0);
        const c = (zNear + zFar) / (zNear - zFar);
        const d = 2 * zNear * zFar / (zNear - zFar);

        this.elements[0] = 1.0 / (ra * a);
        this.elements[1] = 0.0;
        this.elements[2] = 0.0;
        this.elements[3] = 0.0;

        this.elements[4] = 0.0;
        this.elements[5] = 1.0 / a;
        this.elements[6] = 0.0;
        this.elements[7] = 0.0;

        this.elements[8] = 0.0;
        this.elements[9] = 0.0;
        this.elements[10] = c;
        this.elements[11] = -1.0;

        this.elements[12] = 0.0;
        this.elements[13] = 0.0;
        this.elements[14] = d;
        this.elements[15] = 0.0;
    }

    orthogonal(left, right, bottom, top, zNear, zFar) {
        this.elements[0] = 2.0 / (right - left);
        this.elements[1] = 0.0;
        this.elements[2] = 0.0;
        this.elements[3] = 0.0;

        this.elements[4] = 0.0;
        this.elements[5] = 2.0 / (top - bottom);
        this.elements[6] = 0.0;
        this.elements[7] = 0.0;

        this.elements[8] = 0.0;
        this.elements[9] = 0.0;
        this.elements[10] = -2.0 / (zFar - zNear);
        this.elements[11] = 0.0;

        this.elements[12] = - (right + left) / (right - left);
        this.elements[13] = - (top + bottom) / (top - bottom);
        this.elements[14] = - (zFar + zNear) / (zFar - zNear);
        this.elements[15] = 1.0;
    }

    /**
     * 
     * @param {Vector3} obs 
     * @param {Vector3} vrp 
     * @param {Vector3} up 
     */
    lookAt(obs, vrp, up) {
        const zAxis = (Vector3.subtract(obs, vrp)).normalized();
        const xAxis = (Vector3.cross(up, zAxis)).normalized();
        const yAxis = Vector3.cross(zAxis, xAxis);

        this.elements[0] = xAxis.x;
        this.elements[1] = yAxis.x;
        this.elements[2] = zAxis.x;
        this.elements[3] = 0.0;

        this.elements[4] = xAxis.y;
        this.elements[5] = yAxis.y;
        this.elements[6] = zAxis.y;
        this.elements[7] = 0.0;

        this.elements[8] = xAxis.z;
        this.elements[9] = yAxis.z;
        this.elements[10] = zAxis.z;
        this.elements[11] = 0.0;

        this.elements[12] = -Vector3.dot(xAxis, obs);
        this.elements[13] = -Vector3.dot(yAxis, obs);
        this.elements[14] = -Vector3.dot(zAxis, obs);
        this.elements[15] = 1.0;
    }

    eulerAngles(distance, phi, theta, psi, vrp) {
        const matrix = new Matrix4x4();
        matrix.translate(0, 0, -distance);
        matrix.rotate(-phi, 0, 0, 1);
        matrix.rotate(theta, 1, 0, 0);
        matrix.rotate(-psi, 0, 1, 0);
        matrix.translate(-vrp.x, -vrp.y, -vrp.z);
        this.elements = matrix.elements;
    }
}