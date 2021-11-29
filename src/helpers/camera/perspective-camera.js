import Camera from "./camera.js";

export default class PerspectiveCamera extends Camera {

    constructor(fov = 2.0 * Math.asin(0.5), ra = 1, zNear, zFar) {
        super(zNear, zFar);

        this.fov = fov;
        this.ra = ra;

        this.updateCamera();
    }

    updateCamera() {
        this.projectionMatrix.perspective(this.fov, this.ra, this.zNear, this.zFar);
    }

}