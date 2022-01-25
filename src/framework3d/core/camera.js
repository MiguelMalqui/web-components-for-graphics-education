import Matrix4x4 from "../math/matrix4x4.js";
import Vector3 from "../math/vector3.js";

/**
 * Abstract class Camera
 * @abstract
 */
export default class Camera {
    constructor() {
        /**
         * the view matrix of the camera
         * @type {Matrix4x4}
         */
        this.projectionMatrix = new Matrix4x4();
        /**
         * the view matrix of the camera
         * @type {Matrix4x4}
         */
        this.viewMatrix = new Matrix4x4();
    }

    /**
     * Set the view matrix of the camera using look at method
     * @param {Vector3} observer - the position of the camera
     * @param {Vector3} target - the position of the target
     * @param {Vector3} up - the up direction of the observer
     */
    setViewFromLookAt(observer, target, up) {
        this.viewMatrix = Matrix4x4.lookAt(observer, target, up);
    }

    /**
     * Set the view matrix of the camera using arc ball orbit method
     * @param {number} distance - the distance from camera to target
     * @param {number} xAngle - the rotation angle, in radians, around x-axis
     * @param {number} yAngle - the rotation angle, in radians, around y-axis
     * @param {number} zAngle - the rotation angle, in radians, around z-axis
     * @param {Vector3} target - the position of the target
     */
    setViewFromArcBall(distance, xAngle, yAngle, zAngle, target) {
        let view = Matrix4x4.translation(0, 0, -distance);
        view = view.zRotate(-zAngle);
        view = view.xRotate(xAngle);
        view = view.yRotate(-yAngle);
        view = view.translate(-target.x, -target.y, -target.z);
        this.viewMatrix = view;
    }
}