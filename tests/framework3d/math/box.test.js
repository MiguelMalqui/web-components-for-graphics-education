import Box from "../../../src/framework3d/math/box.js";
import Vector3 from "../../../src/framework3d/math/vector3.js";

describe("Box", () => {

    describe("constructor", () => {
        it("should create a box", () => {
            const pMin = new Vector3(-1, -1, -1);
            const pMax = new Vector3(1, 1, 1);
            const box = new Box(pMin, pMax);
            expect(box.pMin).toEqual(pMin);
            expect(box.pMax).toEqual(pMax);
        });
    });

    describe("center", () => {
        it("should return the center of the box", () => {
            const box = new Box(new Vector3(-1, -1, -1), new Vector3(1, 1, 1));
            const origin = new Vector3();
            expect(box.center).toEqual(origin);
        });
    });

    describe("radius", () => {
        it("should return the radius of the box", () => {
            const box = new Box(new Vector3(-1, -1, -1), new Vector3(1, 1, 1));
            expect(box.radius).toBe(Math.sqrt(3));
        });
    });

    describe("height", () => {
        it("should return the height of the box", () => {
            const box = new Box(new Vector3(-1, -1, -1), new Vector3(1, 1, 1));
            expect(box.height).toBe(2);
        });
    });

    describe("width", () => {
        it("should return the width of the box", () => {
            const box = new Box(new Vector3(-1, -1, -1), new Vector3(1, 1, 1));
            expect(box.width).toBe(2);
        });
    });

    describe("depth", () => {
        it("should return the depth of the box", () => {
            const box = new Box(new Vector3(-1, -1, -1), new Vector3(1, 1, 1));
            expect(box.depth).toBe(2);
        });
    });

    describe("expandByPoint", () => {
        it("should the box to include a point", () => {
            const pMin = new Vector3(-1, -1, -1);
            const pMax = new Vector3(1, 1, 1);
            const point = new Vector3(2, 2, 2);
            const box = new Box(pMin, pMax);
            box.expandByPoint(point);
            expect(box.pMin).toEqual(pMin);
            expect(box.pMax).toEqual(point);
        });
    });

    describe("expandByPoint", () => {
        it("should the box to include a point", () => {
            const pn1 = new Vector3(-2, -2, -2);
            const px1 = new Vector3(-1, -1, -1);
            const box1 = new Box(pn1, px1);
            const pn2 = new Vector3(1, 1, 1);
            const px2 = new Vector3(2, 2, 2);
            const box2 = new Box(pn2, px2);
            box1.expandByBox(box2)
            expect(box1.pMin).toEqual(pn1);
            expect(box2.pMax).toEqual(px2);
        });
    });
});