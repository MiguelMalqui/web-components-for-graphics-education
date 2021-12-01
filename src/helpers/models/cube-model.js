import Model from "./model.js";
import BoundingBox from "../bounding-box.js";
import Vector3 from "../maths/vector3.js";
import Color from "../color.js";

/**
 * Class representing a 3D cube model
 */
export default class CubeModel extends Model {

    static NUM_VERTICES = 36;

    /**
     * Creates a cube model
     * @param {{
     * color?: Color,
     * matAmbient?: Vector3,
     * matDiffuse?: Vector3,
     * matSpecular?: Vector3,
     * matShininess?: number
     * }} params
     */
    constructor(params = {}) {
        super({
            positions: CubeModel.#createPositionsArray(),
            normals: CubeModel.#createNormalsArray(),
            colors: params.color ? Model.createColorArray(params.color, CubeModel.NUM_VERTICES) : CubeModel.#createColorArray(),
            matAmbient: params.matAmbient ? params.matAmbient : new Vector3(1, 1, 1),
            matDiffuse: params.matDiffuse ? params.matDiffuse : new Vector3(),
            matSpecular: params.matSpecular ? params.matSpecular: new Vector3(),
            matShininess: params.matShininess ? params.matShininess : 0,
            boundingBox: new BoundingBox(new Vector3(-0.5, -0.5, -0.5), new Vector3(0.5, 0.5, 0.5))
        });
    }

    static #createPositionsArray() {
        return [
            -0.5, -0.5, -0.5,   0.5, -0.5, -0.5,  -0.5, -0.5,  0.5,
             0.5, -0.5, -0.5,   0.5, -0.5,  0.5,  -0.5, -0.5,  0.5,
            -0.5,  0.5, -0.5,  -0.5,  0.5,  0.5,   0.5,  0.5, -0.5,
             0.5,  0.5, -0.5,  -0.5,  0.5,  0.5,   0.5,  0.5,  0.5,
            -0.5, -0.5, -0.5,  -0.5, -0.5,  0.5,  -0.5,  0.5,  0.5,
            -0.5,  0.5,  0.5,  -0.5,  0.5, -0.5,  -0.5, -0.5, -0.5,
             0.5,  0.5,  0.5,   0.5, -0.5,  0.5,   0.5, -0.5, -0.5,
             0.5, -0.5, -0.5,   0.5,  0.5, -0.5,   0.5,  0.5,  0.5,
            -0.5, -0.5, -0.5,  -0.5,  0.5, -0.5,   0.5, -0.5, -0.5,
            -0.5,  0.5, -0.5,   0.5,  0.5, -0.5,   0.5, -0.5, -0.5,
            -0.5,  0.5,  0.5,   0.5, -0.5,  0.5,  -0.5, -0.5,  0.5,
            -0.5,  0.5,  0.5,   0.5,  0.5,  0.5,   0.5, -0.5,  0.5
        ];
    }

    static #createNormalsArray() {
        return [
            0,-1, 0,  0,-1, 0,  0,-1, 0,
            0,-1, 0,  0,-1, 0,  0,-1, 0,
            0, 1, 0,  0, 1, 0,  0, 1, 0,
            0, 1, 0,  0, 1, 0,  0, 1, 0,
            -1,0, 0, -1, 0, 0, -1 ,0, 0,
            -1,0, 0, -1, 0, 0, -1 ,0, 0,
            1, 0, 0,  1, 0, 0,  1, 0, 0,
            1, 0, 0,  1, 0, 0,  1, 0, 0,
            0, 0,-1,  0, 0,-1,  0, 0,-1,
            0, 0,-1,  0, 0,-1,  0, 0,-1,
            0, 0, 1,  0, 0, 1,  0, 0, 1,
            0, 0, 1,  0, 0, 1,  0, 0, 1
        ];
    }

    static #createColorArray() {
        return [
            1, 0, 0,  1, 0, 0,  1, 0, 0,
            1, 0, 0,  1, 0, 0,  1, 0, 0,
            0, 1, 0,  0, 1, 0,  0, 1, 0,
            0, 1, 0,  0, 1, 0,  0, 1, 0,
            0, 0, 1,  0, 0, 1,  0, 0, 1,
            0, 0, 1,  0, 0, 1,  0, 0, 1,
            1, 1, 0,  1, 1, 0,  1, 1, 0,
            1, 1, 0,  1, 1, 0,  1, 1, 0,
            0, 1, 1,  0, 1, 1,  0, 1, 1,
            0, 1, 1,  0, 1, 1,  0, 1, 1,
            1, 0, 1,  1, 0, 1,  1, 0, 1,
            1, 0, 1,  1, 0, 1,  1, 0, 1
        ]
    }

    
}