import Vector3 from "./maths/vector3.js";

/**
 * Class representing an axis-aligned bounding box in 3D space
 */
export default class BoundingBox {
    /**
     * Creates a axis-aligned bounding box
     * @param {Vector3} pMin - the lower boundary of the box, default is (-1, -1, -1)
     * @param {Vector3} pMax - the upper boundary of the box, default is (1, 1, 1)
     */
    constructor(pMin = new Vector3(-1, -1, -1), pMax = new Vector3(1, 1, 1)) {
        /**
         * the lower boundary of the box
         * @type {Vector3}
         */
        this.pMin = pMin;
        /**
         * the upper boundary of the box
         * @type {Vector3}
         */
        this.pMax = pMax;
    }

    /**
     * Returns the center of the bounding box
     * @returns {Vector3}
     */
    getCenter() {
        return (this.pMin.add(this.pMax)).imulScalar(0.5);
    }

    /**
     * Returns the euclidean distance form pMin to pMax
     * @returns {number}
     */
    getRadious() {
        return this.pMin.distanceTo(this.pMax);
    }
}