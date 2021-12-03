import Matrix4x4 from "../maths/matrix4x4.js";
import Vector3 from "../maths/vector3.js";

/**
 * Abstract class Camera
 * @abstract
 */
export default class Camera {
    constructor(zNear = 0.1, zFar = 100) {
        /**
         * the minimal distance between the camera and a visible surface, 
         * default is 0.1
         * @type {number} 
         */
        this.zNear = zNear;
        /**
         * the maximal distance between the camera and a visible surface,
         * default if 100
         * @type {number}
         */
        this.zFar = zFar;

        /**
         * the projection matrix of the camera
         * @type {Matrix4x4}
         */
        this.projectionMatrix = new Matrix4x4();
        /**
         * the view matrix of the camera
         * @type {Matrix4x4}
         */
        this.viewMatrix = new Matrix4x4();

        if (this.constructor == Camera) {
            throw new Error("Abstract class can't be instantiated")
        }
    }

    /**
     * Updates the camera projection matrix using its current values
     */
    updateProjectionMatrix() {
        throw new Error("Method 'updateCamera()' must be implemented");
    }

    updateModel() {
        throw new Error("Method 'upateModel()' must be implemented");
    }

    /**
     * updates the view matrix of the camera using lookAt
     * @param {Vector3} obs 
     * @param {Vector3} vrp 
     * @param {Vector3} up 
     */
    updateViewMatrixLookAt(obs, vrp, up) {
        this.viewMatrix = Matrix4x4.lookAt(obs, vrp, up);
    }

    /**
     * updates the view matrix of the camera using euler angles
     * @param {number} distance - distance from the camera to the taget
     * @param {number} phi - rotation angle around camera-target axis
     * @param {number} theta - left/right movement angle around the target
     * @param {number} psi - up/down movement angle around the target
     * @param {Vector3} vrp - the target of the camera
     */
    updateVieMatrixEulerAngles(distance, phi, theta, psi, vrp) {
        const view = new Matrix4x4();
        view.translate(0, 0, -distance);
        view.rotate(-phi, 0, 0, 1);
        view.rotate(theta, 1, 0, 0);
        view.rotate(-psi, 0, 1, 0);
        view.translate(-vrp.x, -vrp.y, -vrp.z);
        this.viewMatrix = view;
    }
}