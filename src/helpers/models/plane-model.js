import Model from "./model.js";
import Color from "../color.js";

export default class PlaneModel extends Model {

    static NUM_VERTICES = 6;

    /**
     * 
     * @param {Color} color 
     */
    constructor(color) {
        super(
            PlaneModel.#positionArray,
            color ? Model.createColorArray(color, PlaneModel.NUM_VERTICES) : PlaneModel.#colorArray,
            PlaneModel.#normalArray
        );
    }

    static #positionArray = [
        -0.5, 0.0, -0.5,   0.5, 0.0, -0.5,  -0.5, 0.0,  0.5,
         0.5, 0.0, -0.5,   0.5, 0.0,  0.5,  -0.5, 0.0,  0.5,
    ];

    static #normalArray = [
        0, 1, 0,  0, 1, 0,  0, 1, 0,
        0, 1, 0,  0, 1, 0,  0, 1, 0,
    ];

    static #colorArray = [
        0.5, 0.5, 0.5,  0.5, 0.5, 0.5,  0.5, 0.5, 0.5,
        0.5, 0.5, 0.5,  0.5, 0.5, 0.5,  0.5, 0.5, 0.5
    ];
}