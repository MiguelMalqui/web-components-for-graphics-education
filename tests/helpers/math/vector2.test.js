import Vector2 from "../../../src/helpers/math/vector2.js";
import { numDigits } from "../../constants.js"
import { x, y } from "./constants.js"

describe("Vector2", () => {

    describe("constructor", () => {
        it("should initialize coordinates to 0 when there are no arguments", () => {
            const v = new Vector2();
            expect(v.x).toBe(0);
            expect(v.y).toBe(0);

        });

        it("should initialize coordinate with the passed arguments", () => {
            const v = new Vector2(x, y);
            expect(v.x).toBe(x);
            expect(v.y).toBe(y);
        });
    });

    describe("elements", () => {
        it("should return the coordinates as an array", () => {
            const v = new Vector2(x, y);
            expect(v.elements).toEqual([x, y]);
        });
    });

    describe("length", () => {
        it("should compute the length of the vector", () => {
            const v = new Vector2(x, y);
            const expected = Math.sqrt(x * x + y * y);
            expect(v.length()).toBeCloseTo(expected, numDigits);
        });
    });

    describe("distanceTo", () => {
        it("should compute the euclidean distance between two vectors", () => {
            const v1 = new Vector2(x, y);
            const v2 = new Vector2(2 * x, 2 * y);
            const expected = Math.sqrt(x * x + y * y);
            expect(v1.distanceTo(v2)).toBeCloseTo(expected, numDigits);
        });
    });

    describe("add", () => {
        it("should add a vector", () => {
            const v1 = new Vector2(x, y);
            const v2 = new Vector2(2 * x, 2 * y);
            const result = v1.add(v2);
            const expected = new Vector2(3 * x, 3 * y);
            expect(result).toEqual(expected);
        });
    });

    describe("addScalar", () => {
        it("should add a scalar", () => {
            const v1 = new Vector2(x, y);
            const result = v1.addScalar(6);
            const expected = new Vector2(x + 6, y + 6);
            expect(result).toEqual(expected);
        });
    });

    describe("sub", () => {
        it("should subtract a vector", () => {
            const v1 = new Vector2(x, y);
            const v2 = new Vector2(2 * x, 2 * y);
            const result = v1.sub(v2);
            const expected = new Vector2(-x, -y);
            expect(result).toEqual(expected);
        });
    });

    describe("subScalar", () => {
        it("should subtract a scalar", () => {
            const v1 = new Vector2(x, y);
            const result = v1.subScalar(6);
            const expected = new Vector2(x - 6, y - 6);
            expect(result).toEqual(expected);
        });
    });

    describe("mulScalar", () => {
        it("should multiply by a scalar", () => {
            const v1 = new Vector2(x, y);
            const result = v1.mulScalar(6);
            const expected = new Vector2(6 * x, 6 * y);
            expect(result).toEqual(expected);
        });
    });

    describe("divScalar", () => {
        it("should divide by a scalar", () => {
            const v1 = new Vector2(6 * x, 6 * y);
            const result = v1.divScalar(6);
            const expected = new Vector2(x, y);
            expect(result).toEqual(expected);
        });
    });

    describe("dot", () => {
        it("should compute the dot product of two vectors", () => {
            const v1 = new Vector2(x, y);
            const v2 = new Vector2(2 * x, 2 * y);
            const result = v1.dot(v2);
            const expected = x * 2 * x + y * 2 * y;
            expect(result).toBe(expected);
        });
    });

    describe("normalize", () => {
        it("should normalize the vector in place", () => {
            const v = new Vector2(x, y);
            v.normalize();
            const l = Math.sqrt(x * x + y * y);
            const expected = new Vector2(x / l, y / l);
            expect(v.x).toBeCloseTo(expected.x, numDigits);
            expect(v.y).toBeCloseTo(expected.y, numDigits);
        });
    });

    describe("normalized", () => {
        it("should normalize the vector and return a new one", () => {
            const v = new Vector2(x, y);
            const u = v.normalized();
            const l = Math.sqrt(x * x + y * y);
            const expected = new Vector2(x / l, y / l);
            expect(u.x).toBeCloseTo(expected.x, numDigits);
            expect(u.y).toBeCloseTo(expected.y, numDigits);
            expect(v.x).toBe(x);
            expect(v.y).toBe(y);
        });
    });

    describe("clone", () => {
        it("should return a new vector with the same coordinates", () => {
            const v = new Vector2(x,y);
            const result = v.clone();
            expect(result.x).toBe(x); 
            expect(result.y).toBe(y); 
        });
    });

    describe("copy", () => {
        it("should copy the coordinates of the passed vector", () => {
            const v1 = new Vector2();
            const v2 = new Vector2(x,y);
            v1.copy(v2);
            expect(v1.x).toBe(x); 
            expect(v1.y).toBe(y); 
        });
    });
});