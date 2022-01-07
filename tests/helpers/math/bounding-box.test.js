import BoundingBox from "../../../src/helpers/math/bounding-box.js";
import Vector3 from "../../../src/helpers/math/vector3.js";

describe("BoundingBox", () => {

    describe("constructor", () => {
        it("should create a bounding box", () => {
            const pMin = new Vector3(-1, -1, -1);
            const pMax = new Vector3(1, 1, 1);
            const box = new BoundingBox(pMin, pMax);
            expect(box.pMin).toEqual(pMin);
            expect(box.pMax).toEqual(pMax);
        });
    });

    describe("center", () => {
        it("should return the center of the bounding box", () => {
            const box = new BoundingBox(new Vector3(-1, -1, -1), new Vector3(1, 1, 1));
            const origin = new Vector3();
            expect(box.center).toEqual(origin);
        });
    });

    describe("radius", () => {
        it("should return the radius of the bounding box", () => {
            const box = new BoundingBox(new Vector3(-1, -1, -1), new Vector3(1, 1, 1));
            expect(box.radius).toBe(Math.sqrt(3));
        });
    });

    describe("expandByPoint", () => {
        it("should the bounding box to include a point", () => {
            const pMin = new Vector3(-1, -1, -1);
            const pMax = new Vector3(1, 1, 1);
            const point = new Vector3(2, 2, 2);
            const box = new BoundingBox(pMin, pMax);
            box.expandByPoint(point);
            expect(box.pMin).toEqual(pMin);
            expect(box.pMax).toEqual(point);
        });
    });

    describe("expandByPoint", () => {
        it("should the bounding box to include a point", () => {
            const pn1 = new Vector3(-2, -2, -2);
            const px1 = new Vector3(-1, -1, -1);
            const box1 = new BoundingBox(pn1, px1);
            const pn2 = new Vector3(1, 1, 1);
            const px2 = new Vector3(2, 2, 2);
            const box2 = new BoundingBox(pn2, px2);
            box1.expandByBoundingBox(box2)
            expect(box1.pMin).toEqual(pn1);
            expect(box2.pMax).toEqual(px2);
        });
    });
});