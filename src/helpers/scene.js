import Model from "./models/model.js";
import BoundingBox from "./bounding-box.js"
import Vector3 from "./maths/vector3.js";

export default class Scene {

    static #DEFAULT_BOX = new BoundingBox(
        new Vector3(-1, -1, -1), new Vector3(1, 1, 1)
    );

    constructor() {
        /**
         * @type {[Model]}
         */
        this.models = [];

        this.boundingBox = Scene.#DEFAULT_BOX.clone();
    }

    /**
     * 
     * @param {Model} model 
     */
    addModel(model) {
        this.#updateBoundingBox(model);
        this.models.push(model);
    }

    /**
     * 
     * @param {Model} model 
     */
    #updateBoundingBox(model) {
        // if first model to be added
        if (this.models.length == 0) {
            const box = model.computeBoundingBoxAfterModelTransform();
            this.boundingBox = box;
        } else {
            const box = model.computeBoundingBoxAfterModelTransform();
            this.boundingBox.expandByBoundingBox(box);
        }
    }

    computeBoundingBox() {
        if (this.models.length == 0) {
            return Scene.#DEFAULT_BOX.clone();
        }

        const box = this.models[0].computeBoundingBoxAfterModelTransform();
        for (let i = 1; i < this.models.length; i++) {
            const b = this.models[i].computeBoundingBoxAfterModelTransform();
            box.expandByBoundingBox(b);
        }
        
        return box;
    }
}