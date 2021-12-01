import Vector3 from "./maths/vector3.js";

/**
 * Class representing an axis-aligned bounding box in 3D space
 */
export default class BoundingBox {
    /**
     * Creates a axis-aligned bounding box
     * @param {Vector3} pMin - the lower boundary of the box
     * @param {Vector3} pMax - the upper boundary of the box
     */
    constructor(pMin, pMax) {
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

    /**
     * Expands the boundaries of this box to include point p
     * @param {Vector3} p 
     */
    expandByPoint(p) {
        if (p.x < this.pMin.x) this.pMin.x = p.x;
        if (p.y < this.pMin.y) this.pMin.y = p.y;
        if (p.z < this.pMin.z) this.pMin.z = p.z;
        if (p.x > this.pMax.x) this.pMax.x = p.x;
        if (p.y > this.pMax.y) this.pMax.y = p.y;
        if (p.z > this.pMax.z) this.pMax.z = p.z;
    }

    /**
     * Expands the boundaries of this box to include bounding box b
     * @param {BoundingBox} b 
     */
    expandByBoundingBox(b) {
        this.expandByPoint(b.pMin);
        this.expandByPoint(b.pMax);
    }

    /**
     * Returns a new bounding box with the same boundary points
     * @returns {BoundingBox}
     */
    clone() {
        return new BoundingBox(this.pMin.clone(), this.pMax.clone());
    }

    /**
     * Copies the boundary points of the passed bounding box b to this
     * @param {BoundignBox} b 
     */
    copy(b) {
        this.pMin.copy(b.pMin);
        this.pMax.copy(b.pMax);
    }
}