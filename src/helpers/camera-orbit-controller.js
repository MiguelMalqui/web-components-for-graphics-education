import Vector3 from "../framework3d/math/vector3.js";
import Camera from "../framework3d/core/camera.js";
import Matrix4x4 from "../framework3d/math/matrix4x4.js";

/**
 * Class representing a camera orbit controller using euler angles
 */
export default class CameraOrbitController {
    #camera;
    #element;
    #distance;
    #zAngle;
    #xAngle;
    #yAngle;
    #target;

    #action;
    #oldX;
    #oldY;
    #oldTouchesDistance;

    static #ACTION = {
        NONE: 0,
        ROTATE: 1,
        ZOOM: 3
    };

    /**
     * Creates a camera orbit controller
     * @param {Camera} camera - the camera to be controlled
     * @param {Element} element - the element to be used to control the camera
     * @param {Object} options 
     * @param {number} [options.distance] - distance from the camera to the target, default is 0
     * @param {number} [options.zAngle] - rotation angle around camera-target axis, default is 0
     * @param {number} [options.xAngle] - up/down movement angle around the target, default is 0
     * @param {number} [options.yAngle] - left/right movement angle around the target, default is 0
     * @param {Vector3} [options.target] - target of the camera, default is (0, 0, 0)
     */
    constructor(camera, element, options = {}) {
        /**
         * @type {Camera}
         */
        this.#camera = camera;
        this.#element = element;

        this.#distance = options.distance ? options.distance : 0;
        this.#xAngle = options.xAngle ? options.xAngle : 0;
        this.#yAngle = options.yAngle ? options.yAngle : 0;
        this.#zAngle = options.zAngle ? options.zAngle : 0;
        this.#target = options.target ? options.target : new Vector3(0, 0, 0);

        this.#updateCameraViewMatrix();

        this.#action = CameraOrbitController.#ACTION.NONE;
        this.#addListeners();
    }

    #updateCameraViewMatrix() {
        this.#camera.setViewFromArcBall(
            this.#distance,
            this.#xAngle, this.#yAngle, this.#zAngle,
            this.#target
        );
    }

    #addListeners() {
        this.#addMoveAroundTargetListener();
        this.#addZoomListener();
        this.#addZoomTouchListener();
        this.#addMoveAroundTargetTouchListener();
    }

    #addMoveAroundTargetListener() {
        this.#element.addEventListener('mousedown', (e) => {
            if (e.button == 0) {
                this.#oldX = e.x;
                this.#oldY = e.y;
                this.#action = CameraOrbitController.#ACTION.ROTATE;
            }
        });
        document.addEventListener('mousemove', (e) => {
            if (this.#action == CameraOrbitController.#ACTION.ROTATE) {
                e.preventDefault();
                this.#yAngle -= (e.x - this.#oldX) * Math.PI / 180;
                this.#xAngle += (e.y - this.#oldY) * Math.PI / 180;
                this.#oldX = e.x;
                this.#oldY = e.y;
                this.#updateCameraViewMatrix();
            }
        });
        document.addEventListener('mouseup', () => {
            this.#action = CameraOrbitController.#ACTION.NONE;
        });
    }

    #addZoomListener() {
        this.#element.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (e.deltaY < 0) {
                this.#distance -= 0.1;
                this.#updateCameraViewMatrix();
            } else if (e.deltaY > 0) {
                this.#distance += 0.1;
                this.#updateCameraViewMatrix();
            }
        });
    }

    #addZoomTouchListener() {
        this.#element.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                this.#action = CameraOrbitController.#ACTION.ZOOM;
                this.#oldTouchesDistance = Math.hypot(
                    e.touches[0].pageX - e.touches[1].pageX,
                    e.touches[0].pageY - e.touches[1].pageY);
            }
        });
        this.#element.addEventListener('touchmove', (e) => {
            if (this.#action == CameraOrbitController.#ACTION.ZOOM) {
                e.preventDefault();
                const touchesDistance = Math.hypot(
                    e.touches[0].pageX - e.touches[1].pageX,
                    e.touches[0].pageY - e.touches[1].pageY);
                this.#distance -= (touchesDistance - this.#oldTouchesDistance) / 100;
                this.#oldTouchesDistance = touchesDistance;
                this.#updateCameraViewMatrix();
            }
        });
        this.#element.addEventListener('touchend', (e) => {
            this.#action = CameraOrbitController.#ACTION.NONE;
        });
    }

    #addMoveAroundTargetTouchListener() {
        this.#element.addEventListener('touchstart', (e) => {
            if (e.touches.length == 1) {
                this.#oldX = e.touches[0].pageX;
                this.#oldY = e.touches[0].pageY;
                this.#action = CameraOrbitController.#ACTION.ROTATE;
            }
        });
        document.addEventListener('touchmove', (e) => {
            if (this.#action == CameraOrbitController.#ACTION.ROTATE) {
                e.preventDefault();
                e.stopImmediatePropagation();
                this.#yAngle -= (e.touches[0].pageX - this.#oldX) * Math.PI / 180;
                this.#xAngle += (e.touches[0].pageY - this.#oldY) * Math.PI / 180;
                this.#oldX = e.touches[0].pageX;
                this.#oldY = e.touches[0].pageY;
                this.#updateCameraViewMatrix();
            }
        }, { passive: false });
        document.addEventListener('touchend', () => {
            this.#action = CameraOrbitController.#ACTION.NONE;
        });
    }

}