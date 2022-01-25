import Vector3 from "./vector3.js"

/**
 * Class representing an axis-aligned box in 3D space
 */
export default class Box {
    #pMin;
    #pMax;
    /**
     * Creates a axis-aligned box
     * @param {Vector3} pMin - the lower boundary of the box
     * @param {Vector3} pMax - the upper boundary of the box
     */
    constructor(pMin, pMax) {
        this.#pMin = pMin.clone();
        this.#pMax = pMax.clone();
    }

    /**
     * Lower boundary of the box
     * @type {Vector3}
     */
    get pMin() {
        return this.#pMin;
    }

    /**
     * Upper boundary of the box
     * @type {Vector3}
     */
    get pMax() {
        return this.#pMax;
    }

    /**
     * Center of the box
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
     * Width of the box
     * @type {number}
     */
    get width() {
        return this.#pMax.x - this.#pMin.x;
    }

    /**
     * Height of the box
     * @type {number}
     */
    get height() {
        return this.#pMax.y - this.#pMin.y;
    }

    /**
     * Depth of the box
     * @type {number}
     */
    get depth() {
        return this.#pMax.z - this.#pMin.z;
    }

    /**
     * Expands the boundaries of this box to include point p
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
     * Expands the boundaries of this box to include box b
     * @param {Box} b 
     */
    expandByBox(b) {
        this.expandByPoint(b.#pMin);
        this.expandByPoint(b.#pMax);
    }

    /**
     * Returns a new box with the same boundary points
     * @returns {Box}
     */
    clone() {
        return new Box(this.#pMin.clone(), this.#pMax.clone());
    }

    /**
     * Copies the boundary points of the passed box b to this
     * @param {Box} b 
     */
    copy(b) {
        this.#pMin.copy(b.#pMin);
        this.#pMax.copy(b.#pMax);
    }

    toString() {
        return `BoundingBox(${this.#pMin}, ${this.#pMax})`;
    }
}