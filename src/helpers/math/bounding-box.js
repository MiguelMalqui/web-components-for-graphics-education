import Vector3 from "./vector3.js"

/**
 * Class representing an axis-aligned bounding box in 3D space
 */
export default class BoundingBox {
    #pMin;
    #pMax;
    /**
     * Creates a axis-aligned bounding box
     * @param {Vector3} pMin - the lower boundary of the bounding box
     * @param {Vector3} pMax - the upper boundary of the bounding box
     */
    constructor(pMin, pMax) {
        this.#pMin = pMin;
        this.#pMax = pMax;
    }

    /**
     * The lower boundary of the bounding box
     * @type {Vector3}
     */
    get pMin() {
        return this.#pMin;
    }

    /**
     * The upper boundary of the bounding box
     * @type {Vector3}
     */
    get pMax() {
        return this.#pMax;
    }

    /**
     * The center of the bounding box
     * @type {Vector3}
     */
    get center() {
        return this.#pMin.add(this.#pMax).mulScalar(0.5);
    }

    /**
     * Half the euclidean distance form pMin to pMax
     * @type {number}
     */
    get radius() {
        return 0.5 * this.#pMin.distanceTo(this.#pMax);
    }

    /**
     * Expands the boundaries of this bounding box to include point p
     * @param {Vector3} p 
     */
    expandByPoint(p) {
        if (p.x < this.#pMin.x) this.#pMin.x = p.x;
        if (p.y < this.#pMin.y) this.#pMin.y = p.y;
        if (p.z < this.#pMin.z) this.#pMin.z = p.z;
        if (p.x > this.#pMax.x) this.#pMax.x = p.x;
        if (p.y > this.#pMax.y) this.#pMax.y = p.y;
        if (p.z > this.#pMax.z) this.#pMax.z = p.z;
    }

    /**
     * Expands the boundaries of this bounding box to include bounding box b
     * @param {BoundingBox} b 
     */
    expandByBoundingBox(b) {
        this.expandByPoint(b.#pMin);
        this.expandByPoint(b.#pMax);
    }

    /**
     * Returns a new bounding box with the same boundary points
     * @returns {BoundingBox}
     */
    clone() {
        return new BoundingBox(this.#pMin.clone(), this.#pMax.clone());
    }

    /**
     * Copies the boundary points of the passed bounding box b to this
     * @param {BoundingBox} b 
     */
    copy(b) {
        this.#pMin.copy(b.#pMin);
        this.#pMax.copy(b.#pMax);
    }

    toString() {
        return `BoundingBox(${this.#pMin}, ${this.#pMax})`;
    }
}