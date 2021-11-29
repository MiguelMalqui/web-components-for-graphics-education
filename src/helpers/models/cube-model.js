import Model from "./model.js";
import Color from "../color.js"

export default class CubeModel extends Model {

    static NUM_VERTICES = 36;

    constructor(color, matAmbient, matDiffuse, matSpecular, matShininess) {
        super(
            CubeModel.NUM_VERTICES,
            CubeModel.#createPositionsArray(),
            CubeModel.#createNormalsArray(),
            color? CubeModel.createColorArray(color, CubeModel.NUM_VERTICES) : CubeModel.#createColorsArray(),
            matAmbient,
            matDiffuse,
            matSpecular,
            matShininess
        )
    }

    // TODO cambiar esto por una constate y hacer clone o algo
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

    static #createColorsArray() {
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