import Vector3 from "./vector3.js"

/**
 * Class representing an axis-aligned bounding box in 3D space
 */
export default class BoundingBox {
    #pMin;
    #pMax;
    #center;
    #radius;
    /**
     * Creates a axis-aligned bounding box
     * @param {Vector3} pMin - the lower boundary of the box
     * @param {Vector3} pMax - the upper boundary of the box
     */
    constructor(pMin, pMax) {
        this.#pMin = pMin;
        this.#pMax = pMax;
        this.#radius = this.#calculateRadius();
        this.#center = this.#calculateCenter();

    }

    /**
     * the lower boundary of the box
     * @type {Vector3}
     */
    get pMin() {
        return this.#pMin;
    }

    /**
     * the upper boundary of the box
     * @type {Vector3}
     */
    get pMax() {
        return this.#pMax;
    }

    /**
     * the center of the bounding box
     * @type {Vector3}
     */
    get center() {
        return this.#center;
    }

    /**
     * the euclidean distance form pMin to pMax
     * @type {number}
     */
    get radius() {
        return this.#radius;
    }

    #calculateRadius() {
        return 0.5 * this.#pMin.distanceTo(this.#pMax);
    }

    #calculateCenter() {
        return (this.#pMin.add(this.#pMax)).imulScalar(0.5);
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
        this.#radius = this.#calculateRadius();
        this.#center = this.#calculateCenter();
    }

    /**
     * Expands the boundaries of this box to include bounding box b
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
     * @param {BoundignBox} b 
     */
    copy(b) {
        this.#pMin.copy(b.#pMin);
        this.#pMax.copy(b.#pMax);
    }

    toString() {
        return `BoundingBox(${this.#pMin}, ${this.#pMax})`;
    }
}