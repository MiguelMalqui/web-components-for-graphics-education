import Matrix4x4 from "../maths/matrix4x4.js";
import Vector4 from "../maths/vector4.js";
import Model from "./model.js";

export default class Sphere extends Model {

    constructor(color, segments, rings) {
        const positions = Sphere.#positionArray(segments, rings);
        super(
            positions,
            Model.createColorArray(color, (segments) * (rings) * 2 * 3),
            positions
        )
    }

    static #positionArray(segments, rings) {
        const positions = [];
        const dx = Math.PI / rings;
        const dy = 2 * Math.PI / segments;
        /**
         *      v1______v2
         *      |      / |
         *      |    /   |
         *      |  /     |
         *      v3______v4
         */
        for (let i = 0; i < rings; i++) {
            const ax = dx * i;
            const bx = ax + dx;
            let v1 = (new Vector4(0, 0.5, 0, 0)).mulMatrix((new Matrix4x4()).rotate(ax, 1, 0, 0));
            let v2 = (new Vector4(0, 0.5, 0, 0)).mulMatrix((new Matrix4x4()).rotate(ax, 1, 0, 0));
            let v3 = (new Vector4(0, 0.5, 0, 0)).mulMatrix((new Matrix4x4()).rotate(bx, 1, 0, 0));
            let v4 = (new Vector4(0, 0.5, 0, 0)).mulMatrix((new Matrix4x4()).rotate(bx, 1, 0, 0));

            for (let j = 0; j < segments; j++) {
                const ay = dy * j;
                const by = ay + dy;
                let v11 = v1.mulMatrix((new Matrix4x4).rotate(ay, 0, 1, 0));
                let v31 = v3.mulMatrix((new Matrix4x4).rotate(ay, 0, 1, 0));
                let v21 = v2.mulMatrix((new Matrix4x4).rotate(by, 0, 1, 0));
                let v41 = v4.mulMatrix((new Matrix4x4).rotate(by, 0, 1, 0));
                positions.push(v11.x, v11.y, v11.z);
                positions.push(v31.x, v31.y, v31.z);
                positions.push(v21.x, v21.y, v21.z);
                positions.push(v21.x, v21.y, v21.z);
                positions.push(v31.x, v31.y, v31.z);
                positions.push(v41.x, v41.y, v41.z);
            }
        }

        return positions;
    }
}