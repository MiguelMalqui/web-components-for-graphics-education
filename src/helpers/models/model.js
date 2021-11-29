import Matrix4x4 from "../maths/matrix4x4.js";
import Color from "../color.js"

export default class Model {
    constructor(
        numVertices, positions, normals, colors, 
        matAmbient = new Float32Array([1, 1, 1]), 
        matDiffuse = new Float32Array([0, 0, 0]), 
        matSpecular = new Float32Array([0, 0, 0]),
        matShininess = 0) {

        this.numVertices = numVertices;
        this.positions = positions;
        this.normals = normals;
        this.colors = colors;
        this.matAmbient = matAmbient;
        this.matDiffuse = matDiffuse;
        this.matSpecular = matSpecular;
        this.matShininess = matShininess;
        this.transform = new Matrix4x4();
    }

    /**
     * 
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
}