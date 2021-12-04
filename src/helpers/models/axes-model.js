import Model from "./model.js";

export default class AxesModel extends Model {
    constructor() {
        super(AxesModel.#createPositionsArray(), AxesModel.#createColorArray());
    }

    static #createPositionsArray() {
        return [
            0, 0, 0, 1, 0, 0, 
            0, 0, 0, 0, 1, 0,
            0, 0, 0, 0, 0, 1
        ];
    }

    static #createColorArray() {
        return [
            1, 0, 0, 1, 0, 0, 
            0, 1, 0, 0, 1, 0,
            0, 0, 1, 0, 0, 1
        ];
    }
}