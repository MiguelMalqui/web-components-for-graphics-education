import Matrix4x4 from "../../../src/framework3d/math/matrix4x4.js";
import Vector4 from "../../../src/framework3d/math/vector4.js";
import { numberArrayToBeCloseTo } from "../../constants.js";
import { x, y, z} from "./constants.js"

describe("Matrix4x4", () => {

    describe("constructor", () => {
        it("should create a identity matrix if there are no arguments", () => {
            const m = new Matrix4x4();
            const expected = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];
            expect(m.data).toEqual(expected);
        });

        it("should create a matrix from the arguments in a row-major order", () => {
            const m = new Matrix4x4(
                1, 2, 3, 4,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            );
            const expected = [
                1, 0, 0, 0,
                2, 0, 0, 0,
                3, 0, 0, 0,
                4, 0, 0, 0
            ];
            expect(m.data).toEqual(expected);
        });
    });

    describe("add", () => {
        it("should add a matrix", () => {
            const m1 = new Matrix4x4();
            const m2 = new Matrix4x4();
            const result = m1.add(m2);
            const expected = new Matrix4x4(
                2, 0, 0, 0,
                0, 2, 0, 0,
                0, 0, 2, 0,
                0, 0, 0, 2
            );
            expect(result).toEqual(expected);
        });
    });

    describe("sub", () => {
        it("should subtract a matrix", () => {
            const m1 = new Matrix4x4();
            const m2 = new Matrix4x4();
            const result = m1.sub(m2);
            const expected = new Matrix4x4(
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            );
            expect(result).toEqual(expected);
        });
    });

    describe("mul", () => {
        it("should multiply a matrix", () => {
            const m1 = new Matrix4x4(
                0, 1, 2, 3,
                4, 5, 6, 7,
                8, 9, 0, 1,
                2, 3, 4, 5
            );
            const m2 = new Matrix4x4(
                6, 7, 8, 9,
                0, 1, 2, 3,
                4, 5, 6, 7,
                8, 9, 0, 1
            );
            const result = m1.mul(m2);
            const expected = new Matrix4x4(
                32, 38, 14, 20,
                104, 126, 78, 100,
                56, 74, 82, 100,
                68, 82, 46, 60
            );
            expect(result).toEqual(expected);
        });
    });

    describe("mulScalar", () => {
        it("should multiply a matrix by a scalar", () => {
            const m1 = new Matrix4x4(
                2, 0, 0, 0,
                0, 2, 0, 0,
                0, 0, 2, 0,
                0, 0, 0, 2
            );
            const result = m1.mulScalar(0.5);
            const expected = new Matrix4x4();
            expect(result).toEqual(expected);
        });
    });

    describe("mulVector4", () => {
        it("should multiply a matrix by a vector", () => {
            const m1 = Matrix4x4.translation(x, y, z);
            const v1 = new Vector4(x, y, z, 1);
            const result = m1.mulVector4(v1);
            const expected = new Vector4(x + x, y + y, z + z, 1);
            expect(result).toEqual(expected);
        });
    });

    describe("divScalar", () => {
        it("should divide a matrix by a scalar", () => {
            const m1 = new Matrix4x4(
                2, 0, 0, 0,
                0, 2, 0, 0,
                0, 0, 2, 0,
                0, 0, 0, 2
            );
            const result = m1.divScalar(2);
            const expected = new Matrix4x4();
            expect(result).toEqual(expected);
        });
    });

    describe("inverse", () => {
        it("should invert a invertible matrix", () => {
            const m1 = new Matrix4x4(
                -1, -1, -1,  1,
                 1, -1, -1, -1,
                -1, -1,  1, -1,
                -1,  1, -1, -1
            );
            const result = m1.inverse();
            const expected = new Matrix4x4(
                -0.25,  0.25, -0.25, -0.25,
                -0.25, -0.25, -0.25,  0.25,
                -0.25, -0.25,  0.25, -0.25,
                 0.25, -0.25, -0.25, -0.25
            );
            expect(result).toEqual(expected);
        });
        it("should return a identity matrix when not invertible", () => {
            const m1 = new Matrix4x4(
                0, 0, 0, 0,
                0, 0, 0, 0,
                1, 0, 0, 0,
                0, 1, 0, 0
            );
            const result = m1.inverse();
            const expected = new Matrix4x4();
            expect(result).toEqual(expected);
        });
    });

    describe("translate", () => {
        it("should multiply a matrix by another that translates it", () => {
            const m1 = new Matrix4x4();
            const result = m1.translate(1, 2, 5);
            const expected = new Matrix4x4(
                1, 0, 0, 1,
                0, 1, 0, 2,
                0, 0, 1, 5,
                0, 0, 0, 1
            );
            expect(result).toEqual(expected);
        });
    });

    describe("rotate", () => {
        it("should multiply a matrix by another that rotates it", () => {
            const m1 = new Matrix4x4();
            const result = m1.rotate(Math.PI / 2, 1, 0, 0);
            const expected = new Matrix4x4(
                1, 0, 0, 0,
                0, 0,-1, 0,
                0, 1, 0, 0,
                0, 0, 0, 1
            );
            numberArrayToBeCloseTo(result.data, expected.data);
        });
    });

    describe("scale", () => {
        it("should multiply a matrix by another that scales it", () => {
            const m1 = new Matrix4x4();
            const result = m1.scale(1, 2, 5);
            const expected = new Matrix4x4(
                1, 0, 0, 0,
                0, 2, 0, 0,
                0, 0, 5, 0,
                0, 0, 0, 1
            );
            expect(result).toEqual(expected);
        });
    });

    describe("clone", () => {
        it("should create a new matrix with the identical elements", () => {
            const m1 = new Matrix4x4(2,2,2,2, 3,3,3,3, 4,4,4,4, 5,5,5,5);
            const m2 = new Matrix4x4();
            m2.copy(m1);
            expect(m2).toEqual(m1);
        });

        it("should point to a different array of elements", () => {
            const m1 = new Matrix4x4(2,2,2,2, 3,3,3,3, 4,4,4,4, 5,5,5,5);
            const m2 = new Matrix4x4();
            m2.copy(m1);
            expect(m1.data == m2.data).toBe(false);
        });
    });

    describe("equals", () => {
        const m1 = new Matrix4x4(
            1, 1, 1, 1,
            2, 2, 2, 2,
            3, 3, 3, 3,
            4, 4, 4, 4
        );

        it("should return true if two matrix have the same elements", () => {
            const m2 = new Matrix4x4(
                1, 1, 1, 1,
                2, 2, 2, 2,
                3, 3, 3, 3,
                4, 4, 4, 4
            );
            expect(m1.equals(m2)).toBe(true);
        });
        
        it("should return false if two matrix have at least one element different", () => {
            const m2 = new Matrix4x4(
                1, 1, 1, 1,
                2, 2, 9, 2,
                3, 3, 3, 3,
                4, 4, 4, 4
            );
            expect(m1.equals(m2)).toBe(false);
        });
        
        it("should return false if other type of object is passed", () => {
            const m2 = 4;
            expect(m1.equals(m2)).toBe(false);
        });
    });
});