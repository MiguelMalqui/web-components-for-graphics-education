import Matrix4x4 from "../maths/matrix4x4.js";
import Color from "../color.js"
import BoundingBox from "../bounding-box.js";
import Vector3 from "../maths/vector3.js";
import Vector4 from "../maths/vector4.js";

/**
 * Class representing a 3D model
 */
export default class Model {
    #numVertices;
    #positions;
    #normals;
    #colors;
    #boundingBox;

    /**
     * 
     * @param {number[]} positions 
     * @param {number[]} colors 
     * @param {number[]} normals 
     */
    constructor(positions, colors = [], normals = []) {
        if (positions.length < 3) {
            throw new Error("Model should have at least one vertex");
        }

        this.#numVertices = Math.floor(positions.length / 3);
        this.#positions = positions;
        this.#colors = colors;
        this.#normals = normals;
        this.#boundingBox = Model.computeBoundingBox(positions);
        this.transform = new Matrix4x4();
    }

    /**
     * the number of vertices of the model
     * @type {number}
     */
    get numVertices() {
        return this.#numVertices;
    }

    /**
     * the position of each vertex of the model
     * @type {number[]}
     */
    get positions() {
        return this.#positions;
    }

    /**
     * the normal of each vertex of the model
     * @type {number[]}
     */
    get normals() {
        return this.#normals;
    }

    /**
     * the color of each vertex of the model
     * @type {number[]}
     */
    get colors() {
        return this.#colors;
    }

    /**
     * the bounding box of the model before apply any tranform
     * @type {BoundingBox}
     */
    get boundingBox() {
        return this.#boundingBox;
    }

    /**
     * Computes an aproximation of the bounding box of the model after apply 
     * the model transform
     * @returns {BoundingBox}
     */
    computeBoundingBoxAfterModelTransform() {
        let v1 = Vector4.fromVector3(this.boundingBox.pMin, 1);
        let v2 = Vector4.fromVector3(this.boundingBox.pMax, 1);
        v1 = v1.mulMatrix(this.transform);
        v2 = v2.mulMatrix(this.transform);

        const xMin = v1.x < v2.x ? v1.x : v2.x;
        const yMin = v1.y < v2.y ? v1.y : v2.y;
        const zMin = v1.z < v2.z ? v1.z : v2.z;
        const xMax = v1.x > v2.x ? v1.x : v2.x;
        const yMax = v1.y > v2.y ? v1.y : v2.y;
        const zMax = v1.z > v2.z ? v1.z : v2.z;

        const pMin = new Vector3(xMin, yMin, zMin);
        const pMax = new Vector3(xMax, yMax, zMax);
        return new BoundingBox(pMin, pMax);
    }

    /**
     * Creates an array representing the colors of each vertex
     * @param {Color} color 
     * @param {number} numVertices 
     */
    static createColorArray(color, numVertices) {
        const r = color.red / 255;
        const g = color.green / 255;
        const b = color.blue / 255;

        const colors = [];
        for (let i = 0; i < numVertices; i++) {
            colors.push(r);
            colors.push(g);
            colors.push(b);
        }

        return colors;
    }

    /**
     * Returns the bounding box of a given array of positions
     * @param {number[]} positions 
     * @returns {BoundingBox}
     */
    static computeBoundingBox(positions) {
        let xMin, xMax, yMin, yMax, zMin, zMax;
        xMin = xMax = positions[0];
        yMin = yMax = positions[1];
        zMin = zMax = positions[2];

        for (let i = 3; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            const z = positions[i + 2];
            if (x < xMin) xMin = x;
            if (x > xMax) xMax = x;
            if (y < yMin) yMin = y;
            if (y > yMax) yMax = y;
            if (z < zMin) zMin = z;
            if (z > zMax) zMax = z;
        }

        const pMin = new Vector3(xMin, yMin, zMin);
        const pMax = new Vector3(xMax, yMax, zMax);
        return new BoundingBox(pMin, pMax);
    }
}