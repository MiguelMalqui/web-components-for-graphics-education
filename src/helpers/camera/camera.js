import Matrix4x4 from "../maths/matrix4x4.js";

export default class Camera {
    constructor(zNear = 0.1, zFar = 1000) {
        
        this.zNear = zNear;
        this.zFar = zFar;

        this.projectionMatrix = new Matrix4x4();
        this.viewMatrix = new Matrix4x4();

        if (this.constructor == Camera) {
            throw new Error("Abstract class can't be instantiated")
        }
    }

    updateProjectionMatrix() {
        throw new Error("Method 'updateCamera()' must be implemented");
    }

    updateModel() {
        throw new Error("Method 'upateModel()()' must be implemented");
    }

    updateViewMatrixLookAt(obs, vrp, up) {
        this.viewMatrix = Matrix4x4.lookAt(obs, vrp, up);
    }

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