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
    #matAmbient;
    #matDiffuse;
    #matSpecular;
    #matShininess;
    #boundingBox;

    /**
     * Creates a 3D model
     * @param {{
     * positions : number[],
     * normals : number[],
     * colors: number[],
     * matAmbient: Vector3,
     * matDiffuse: Vector3,
     * matSpecular: Vector3,
     * matShininess: number,
     * boundingBox?: BoundingBox
     * }} params
     */
    constructor(params) {

        this.#numVertices = Math.floor(params.positions.length / 3);
        if (this.#numVertices == 0) {
            throw new Error("Model should have at least one vertex");
        }

        this.#positions = params.positions;
        this.#normals = params.normals;
        this.#colors = params.colors;
        this.#matAmbient = params.matAmbient;
        this.#matDiffuse = params.matDiffuse;
        this.#matSpecular = params.matSpecular;
        this.#matShininess = params.matShininess;
        this.transform = new Matrix4x4();
        this.#boundingBox = params.boundingBox ? params.boundingBox : Model.computeBoundingBox(params.positions);
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
     * the ambient reflection constant of the model materail
     * @type {Vector3}
     */
    get matAmbient() {
        return this.#matAmbient;
    }

    /**
     * the diffuse reflection constant of the model material
     * @type {Vector3}
     */
    get matDiffuse() {
        return this.#matDiffuse;
    }

    /**
     * the specular reflection constant of the model material
     * @type {Vector3}
     */
    get matSpecular() {
        return this.#matSpecular;
    }

    /**
     * the shaniness constant of the model material
     * @type {Vector3}
     */
    get matShininess() {
        return this.#matShininess;
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