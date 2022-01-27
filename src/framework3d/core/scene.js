import Object3D from "./object-3d.js";

/**
 * Class representing a scene
 */
export default class Scene {
    /**
     * Creates a scene
     */
    constructor() {
        /**
         * Objects of the scene
         * @type {Object3D[]}
         */
        this.objects = [];
    }

    /**
     * Adds an object to the scene
     * @param {Object3D} object 
     */
    addObject(object) {
        this.objects.push(object);
    }
}