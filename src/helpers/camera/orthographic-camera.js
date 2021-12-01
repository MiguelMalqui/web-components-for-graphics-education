import Matrix4x4 from "../maths/matrix4x4.js";
import Camera from "./camera.js";

export default class PerspectiveCamera extends Camera {

    constructor(left, right, bottom, top, zNear, zFar) {
        super(zNear, zFar);

        this.left = left;
        this.right = right;
        this.bottom = bottom;
        this.top = top;

        this.updateCamera();
    }

    updateCamera() {
        this.projectionMatrix = Matrix4x4.orthogonal(
            this.left, this.right, this.bottom, this.top,
            this.zNear, this.zFar
        );
    }

}