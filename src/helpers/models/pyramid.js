import Model from "./model.js";
import Color from "../color.js";

export default class Pyramid extends Model {

    static NUM_VERTICES = 10;

    /**
     * 
     * @param {Color} color 
     */
    constructor(color) {
        super(
            Pyramid.#positionArray,
            color ? Model.createColorArray(color, Pyramid.NUM_VERTICES) : Pyramid.#colorArray,
            Pyramid.#normalArray
        );
    }

    static #positionArray = [
        // down
        -0.5, -0.5, -0.5,   0.5, -0.5, -0.5,  -0.5, -0.5,  0.5,
         0.5, -0.5, -0.5,   0.5, -0.5,  0.5,  -0.5, -0.5,  0.5,
        // left
        -0.5, -0.5, -0.5,   0.0,  0.5,  0.0,  -0.5, -0.5,  0.5,
        // right
         0.5, -0.5, -0.5,   0.0,  0.5,  0.0,   0.5, -0.5,  0.5,
        // back
        -0.5, -0.5, -0.5,   0.0,  0.5,  0.0,   0.5, -0.5, -0.5,
        // front
        -0.5, -0.5,  0.5,   0.0,  0.5,  0.0,   0.5, -0.5,  0.5
    ];

    static #normalArray = [
        // down
        0,-1, 0,  0,-1, 0,  0,-1, 0,
        0,-1, 0,  0,-1, 0,  0,-1, 0,
        // left
        -1,0.5,0,  -1,0.5,0,  -1,0.5,0,
        // right
        1,0.5,0,  1,0.5,0,  1,0.5,0,
        // back
        0,0.5,-1,  0,0.5,-1,  0,0.5,-1,
        // front
        0,0.5,1,  0,0.5,1,  0,0.5,1,
    ];

    static #colorArray = [
        // down
        1,0,0,  1,0,0,  1,0,0,
        0,1,0,  0,1,0,  0,1,0,
        // left
        0,0,1,  0,0,1,  0,0,1,
        // right
        1,1,0,  1,1,0,  1,1,0,
        // back
        0,1,1,  0,1,1,  0,1,1,
        // fornt
        1,0,1,  1,0,1,  1,0,1
    ];
}