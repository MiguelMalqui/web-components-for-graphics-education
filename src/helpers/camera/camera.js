import Matrix4x4 from "../maths/matrix4x4.js";
import Vector3 from "../maths/vector3.js";


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

    updateCamera() {
        throw new Error("Method 'updateCamera()' must be implemented");
    }

    updateModel() {
        throw new Error("Method 'upateModel()()' must be implemented");
    }

    setPositionLookAt(obs, vrp, up) {
        this.viewMatrix.lookAt(obs, vrp, up);
    }

    setPositionEulerAngles(distance, phi, theta, psi, vrp) {
        this.viewMatrix.lookAt(distance, phi, theta, psi, vrp);
    }


}