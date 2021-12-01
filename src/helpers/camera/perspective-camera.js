import Matrix4x4 from "../maths/matrix4x4.js";
import Camera from "./camera.js";

export default class PerspectiveCamera extends Camera {
    
    constructor(fov, ra, zNear, zFar) {
        super(zNear, zFar);

        this.fov = fov;
        this.ra = ra;

        this.updateProjectionMatrix();
    }

    updateProjectionMatrix() {
        this.projectionMatrix = Matrix4x4.perspective(
            this.fov, this.ra, this.zNear, this.zFar
        );
    }

}