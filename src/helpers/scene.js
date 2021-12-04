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
        /**
         * the bounding box that contains all the models of the scene when they
         * where added
         * @type {BoundingBox}
         */
        this.boundingBox = Scene.#DEFAULT_BOX.clone();
    }

    /**
     * Adds a model to the scene
     * @param {Model} model 
     */
    addModel(model) {
        this.models.push(model);
        this.#updateBoundingBox(model);
    }

    /**
     * Updates the bounding box of the scene to include the new model
     * @param {Model} model 
     */
    #updateBoundingBox(model) {
        // if first model to be added
        if (this.models.length == 1) {
            const box = model.computeBoundingBoxAfterModelTransform();
            this.boundingBox = box;
        } else {
            const box = model.computeBoundingBoxAfterModelTransform();
            this.boundingBox.expandByBoundingBox(box);
        }
    }

    /**
     * Returns the bounding box that contains all the models of the scene
     * @returns {BoundingBox}
     */
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