import Vector3 from "../../framework3d/math/vector3.js";
import Camera from "../../framework3d/core/camera.js";

/**
 * Class representing a camera controler using euler angles
 */
export default class CameraControler {
    #camera;
    #element;
    #distance;
    #phi;
    #theta;
    #psi;
    #vrp;

    static #ACTION = {
        NONE: 0,
        ROTATE: 1
    };

    /**
     * Creates a camera controler
     * @param {Camera} camera - the camera to be controled
     * @param {Element} element - the element to be used to control the camera
     * @param {Object} options 
     * @param {number} [options.distance] - distance from the camera to the taget, default is 0
     * @param {number} [options.phi] - rotation angle around camera-target axis, default is 0
     * @param {number} [options.theta] - left/right movement angle around the target, default is 0
     * @param {number} [options.psi] - up/down movement angle around the target, default is 0
     * @param {Vector3} [options.vrp] - the target of the camera, default is (0, 0, 0)
     */
    constructor(camera, element, options = {}) {
        /**
         * @type {Camera}
         */
        this.#camera = camera;
        this.#element = element;

        this.#distance = options.distance ? options.distance : 0;
        this.#phi = options.phi ? options.phi : 0;
        this.#theta = options.theta ? options.theta : 0;
        this.#psi = options.psi ? options.psi : 0;
        this.#vrp = options.vrp ? options.vrp : new Vector3(0, 0, 0);

        this.#updateCameraViewMatrix();

        this.action = CameraControler.#ACTION.NONE;
        this.#addListeners();
    }

    #updateCameraViewMatrix() {
        this.#camera.setViewFromArcBall(
            this.#distance,
            this.#theta, this.#psi, this.#phi,
            this.#vrp
        );
    }

    #addListeners() {
        this.#addMoveAroundTargetListener();
        this.#addZoomListener();
    }

    #addMoveAroundTargetListener() {
        this.#element.addEventListener('mousedown', (e) => {
            if (e.button == 0) {
                this.xx = e.x;
                this.yy = e.y;
                this.action = CameraControler.#ACTION.ROTATE;
            }
        });
        document.addEventListener('mousemove', (e) => {
            if (this.action == CameraControler.#ACTION.ROTATE) {
                this.#psi -= (e.x - this.xx) * Math.PI / 180;
                this.xx = e.x;
                this.#theta += (e.y - this.yy) * Math.PI / 180;
                this.yy = e.y;
                this.#updateCameraViewMatrix();
            }
        });
        document.addEventListener('mouseup', () => {
            this.action = CameraControler.#ACTION.NONE;
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

}