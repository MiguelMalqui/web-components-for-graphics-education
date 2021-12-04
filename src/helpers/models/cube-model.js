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
     * 
     * @param {Color} color 
     */
    constructor(color) {
        super(
            CubeModel.#positionArray,
            color ? Model.createColorArray(color, CubeModel.NUM_VERTICES) : CubeModel.#colorArray,
            CubeModel.#normalArray
        );
    }

    static #positionArray = [
        // down
        -0.5, -0.5, -0.5,   0.5, -0.5, -0.5,  -0.5, -0.5,  0.5,
         0.5, -0.5, -0.5,   0.5, -0.5,  0.5,  -0.5, -0.5,  0.5,
        // up
        -0.5,  0.5, -0.5,  -0.5,  0.5,  0.5,   0.5,  0.5, -0.5,
         0.5,  0.5, -0.5,  -0.5,  0.5,  0.5,   0.5,  0.5,  0.5,
        // left
        -0.5, -0.5, -0.5,  -0.5, -0.5,  0.5,  -0.5,  0.5,  0.5,
        -0.5,  0.5,  0.5,  -0.5,  0.5, -0.5,  -0.5, -0.5, -0.5,
        // right
         0.5,  0.5,  0.5,   0.5, -0.5,  0.5,   0.5, -0.5, -0.5,
         0.5, -0.5, -0.5,   0.5,  0.5, -0.5,   0.5,  0.5,  0.5,
        // back
        -0.5, -0.5, -0.5,  -0.5,  0.5, -0.5,   0.5, -0.5, -0.5,
        -0.5,  0.5, -0.5,   0.5,  0.5, -0.5,   0.5, -0.5, -0.5,
        // fornt
        -0.5,  0.5,  0.5,   0.5, -0.5,  0.5,  -0.5, -0.5,  0.5,
        -0.5,  0.5,  0.5,   0.5,  0.5,  0.5,   0.5, -0.5,  0.5
    ];

    static #normalArray = [
        // down
        0,-1, 0,  0,-1, 0,  0,-1, 0,
        0,-1, 0,  0,-1, 0,  0,-1, 0,
        // up
        0, 1, 0,  0, 1, 0,  0, 1, 0,
        0, 1, 0,  0, 1, 0,  0, 1, 0,
        // left
        -1,0, 0, -1, 0, 0, -1 ,0, 0,
        -1,0, 0, -1, 0, 0, -1 ,0, 0,
        // right
        1, 0, 0,  1, 0, 0,  1, 0, 0,
        1, 0, 0,  1, 0, 0,  1, 0, 0,
        // back
        0, 0,-1,  0, 0,-1,  0, 0,-1,
        0, 0,-1,  0, 0,-1,  0, 0,-1,
        // front
        0, 0, 1,  0, 0, 1,  0, 0, 1,
        0, 0, 1,  0, 0, 1,  0, 0, 1
    ];

    static #colorArray = [
        // down
        0, 1, 1,  0, 1, 1,  0, 1, 1,
        0, 1, 1,  0, 1, 1,  0, 1, 1,
        // up
        1, 0, 0,  1, 0, 0,  1, 0, 0,
        1, 0, 0,  1, 0, 0,  1, 0, 0,
        // left
        1, 1, 0,  1, 1, 0,  1, 1, 0,
        1, 1, 0,  1, 1, 0,  1, 1, 0,
        // right
        0, 0, 1,  0, 0, 1,  0, 0, 1,
        0, 0, 1,  0, 0, 1,  0, 0, 1,
        // back
        1, 0, 1,  1, 0, 1,  1, 0, 1,
        1, 0, 1,  1, 0, 1,  1, 0, 1,
        // front
        0, 1, 0,  0, 1, 0,  0, 1, 0,
        0, 1, 0,  0, 1, 0,  0, 1, 0
    ]
    
}