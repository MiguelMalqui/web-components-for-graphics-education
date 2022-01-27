import Vector3 from "../../../src/framework3d/math/vector3.js";
import { numDigits } from "../../constants.js"
import { x, y, z } from "./constants.js"

describe("Vector3", () => {

    describe("constructor", () => {
        it("should initialize coordinates to 0 when there are no arguments", () => {
            const v = new Vector3();
            expect(v.x).toBe(0);
            expect(v.y).toBe(0);
            expect(v.z).toBe(0);

        });

        it("should initialize coordinate with the passed arguments", () => {
            const v = new Vector3(x, y, z);
            expect(v.x).toBe(x);
            expect(v.y).toBe(y);
            expect(v.z).toBe(z);
        });
    });

    describe("length", () => {
        it("should compute the length of the vector", () => {
            const v = new Vector3(x, y, z);
            const expected = Math.sqrt(x * x + y * y + z * z);
            expect(v.length()).toBeCloseTo(expected, numDigits);
        });
    });

    describe("distanceTo", () => {
        it("should compute the euclidean distance between two vectors", () => {
            const v1 = new Vector3(x, y, z);
            const v2 = new Vector3(2 * x, 2 * y, 2 * z);
            const expected = Math.sqrt(x * x + y * y + z * z);
            expect(v1.distanceTo(v2)).toBeCloseTo(expected, numDigits);
        });
    });

    describe("add", () => {
        it("should add a vector", () => {
            const v1 = new Vector3(x, y, z);
            const v2 = new Vector3(2 * x, 2 * y, 2 * z);
            const result = v1.add(v2);
            const expected = new Vector3(3 * x, 3 * y, 3 * z);
            expect(result).toEqual(expected);
        });
    });

    describe("addScalar", () => {
        it("should add a scalar", () => {
            const v1 = new Vector3(x, y, z);
            const result = v1.addScalar(6);
            const expected = new Vector3(x + 6, y + 6, z + 6);
            expect(result).toEqual(expected);
        });
    });

    describe("sub", () => {
        it("should subtract a vector", () => {
            const v1 = new Vector3(x, y, z);
            const v2 = new Vector3(2 * x, 2 * y, 2 * z);
            const result = v1.sub(v2);
            const expected = new Vector3(-x, -y, -z);
            expect(result).toEqual(expected);
        });
    });

    describe("subScalar", () => {
        it("should subtract a scalar", () => {
            const v1 = new Vector3(x, y, z);
            const result = v1.subScalar(6);
            const expected = new Vector3(x - 6, y - 6, z - 6);
            expect(result).toEqual(expected);
        });
    });

    describe("mulScalar", () => {
        it("should multiply by a scalar", () => {
            const v1 = new Vector3(x, y, z);
            const result = v1.mulScalar(6);
            const expected = new Vector3(6 * x, 6 * y, 6 * z);
            expect(result).toEqual(expected);
        });
    });

    describe("divScalar", () => {
        it("should divide by a scalar", () => {
            const v1 = new Vector3(6 * x, 6 * y, 6 * z);
            const result = v1.divScalar(6);
            const expected = new Vector3(x, y, z);
            expect(result).toEqual(expected);
        });
    });

    describe("dot", () => {
        it("should compute the dot product of two vectors", () => {
            const v1 = new Vector3(x, y, z);
            const v2 = new Vector3(2 * x, 2 * y, 2 * z);
            const result = v1.dot(v2);
            const expected = x * 2 * x + y * 2 * y + z * 2 * z;
            expect(result).toBe(expected);
        });
    });

    describe("cross", () => {
        it("should compute the cross product of two vectors", () => {
            const v1 = new Vector3(x, y, z);
            const v2 = new Vector3(-x, -y, -z);
            const result = v1.cross(v2);
            const expected = new Vector3();
            expect(result).toEqual(expected);
        });
    });

    describe("normalize", () => {
        it("should normalize the vector", () => {
            const v = new Vector3(x, y, z);
            const n = v.normalize();
            const l = Math.sqrt(x * x + y * y + z * z);
            const expected = new Vector3(x / l, y / l, z / l);
            expect(n.x).toBeCloseTo(expected.x, numDigits);
            expect(n.y).toBeCloseTo(expected.y, numDigits);
            expect(n.z).toBeCloseTo(expected.z, numDigits);
        });
    });

    describe("clone", () => {
        it("should return a new vector with the same coordinates", () => {
            const v = new Vector3(x,y,z);
            const result = v.clone();
            expect(result.x).toBe(x); 
            expect(result.y).toBe(y); 
            expect(result.z).toBe(z);
        });
    });

    describe("copy", () => {
        it("should copy the coordinates of the passed vector", () => {
            const v1 = new Vector3();
            const v2 = new Vector3(x,y,z);
            v1.copy(v2);
            expect(v1.x).toBe(x); 
            expect(v1.y).toBe(y); 
            expect(v1.z).toBe(z);
        });
    });
});