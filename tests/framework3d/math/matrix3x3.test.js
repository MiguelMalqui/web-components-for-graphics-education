import Matrix3x3 from "../../../src/framework3d/math/matrix3x3.js";
import Vector3 from "../../../src/framework3d/math/vector3.js";
import { numberArrayToBeCloseTo } from "../../constants.js";

describe("Matrix3x3", () => {

    describe("constructor", () => {
        it("should create a identity matrix if there are no arguments", () => {
            const m = new Matrix3x3();
            const expected = [
                1, 0, 0,
                0, 1, 0,
                0, 0, 1
            ];
            expect(m.data).toEqual(expected);
        });

        it("should create a matrix from the arguments in a row-major order", () => {
            const m = new Matrix3x3(
                1, 2, 3,
                0, 0, 0,
                0, 0, 0
            );
            const expected = [
                1, 0, 0,
                2, 0, 0,
                3, 0, 0
            ];
            expect(m.data).toEqual(expected);
        });
    });

    describe("add", () => {
        it("should add a matrix", () => {
            const m1 = new Matrix3x3();
            const m2 = new Matrix3x3();
            const result = m1.add(m2);
            const expected = new Matrix3x3(
                2, 0, 0,
                0, 2, 0,
                0, 0, 2
            );
            expect(result).toEqual(expected);
        });
    });

    describe("sub", () => {
        it("should subtract a matrix", () => {
            const m1 = new Matrix3x3();
            const m2 = new Matrix3x3();
            const result = m1.sub(m2);
            const expected = new Matrix3x3(
                0, 0, 0,
                0, 0, 0,
                0, 0, 0
            );
            expect(result).toEqual(expected);
        });
    });

    describe("mul", () => {
        it("should multiply a matrix", () => {
            const m1 = new Matrix3x3(
                0, 1, 2,
                3, 4, 5,
                6, 7, 8
            );
            const m2 = new Matrix3x3(
                9, 0, 1,
                2, 3, 4,
                5, 6, 7
            );
            const result = m1.mul(m2);
            const expected = new Matrix3x3(
                12, 15, 18,
                60, 42, 54,
                108, 69, 90
            );
            expect(result).toEqual(expected);
        });
    });

    describe("mulScalar", () => {
        it("should multiply a matrix by a scalar", () => {
            const m1 = new Matrix3x3(
                2, 0, 0,
                0, 2, 0,
                0, 0, 2
            );
            const result = m1.mulScalar(0.5);
            const expected = new Matrix3x3();
            expect(result).toEqual(expected);
        });
    });

    describe("mulVector3", () => {
        it("should multiply a matrix by a vector", () => {
            const m1 = new Matrix3x3(
                1, 2, 3,
                4, 5, 6,
                7, 8, 9
            );
            const v1 = new Vector3(1, 2, 3, 1);
            const result = m1.mulVector3(v1);
            const expected = new Vector3(14, 32, 50);
            expect(result).toEqual(expected);
        });
    });

    describe("divScalar", () => {
        it("should divide a matrix by a scalar", () => {
            const m1 = new Matrix3x3(
                2, 0, 0,
                0, 2, 0,
                0, 0, 2,
            );
            const result = m1.divScalar(2);
            const expected = new Matrix3x3();
            expect(result).toEqual(expected);
        });
    });

    describe("rotate", () => {
        it("should multiply a matrix by another that rotates it", () => {
            const m1 = new Matrix3x3();
            const result = m1.rotate(Math.PI / 2, 1, 0, 0);
            const expected = new Matrix3x3(
                1, 0, 0,
                0, 0,-1,
                0, 1, 0
            );
            numberArrayToBeCloseTo(result.data, expected.data);
        });
    });

    describe("scale", () => {
        it("should multiply a matrix by another that scales it", () => {
            const m1 = new Matrix3x3();
            const result = m1.scale(1, 2, 5);
            const expected = new Matrix3x3(
                1, 0, 0,
                0, 2, 0,
                0, 0, 5
            );
            expect(result).toEqual(expected);
        });
    });

    describe("clone", () => {
        it("should create a new matrix with the identical elements", () => {
            const m1 = new Matrix3x3(2,2,2, 3,3,3, 4,4,4);
            const m2 = new Matrix3x3();
            m2.copy(m1);
            expect(m2).toEqual(m1);
        });

        it("should point to a different array of elements", () => {
            const m1 = new Matrix3x3(2,2,2, 3,3,3, 4,4,4);
            const m2 = new Matrix3x3();
            m2.copy(m1);
            expect(m1.data == m2.data).toBe(false);
        });
    });

    describe("equals", () => {
        const m1 = new Matrix3x3(
            1, 1, 1,
            2, 2, 2,
            3, 3, 3
        );

        it("should return true if two matrix have the same elements", () => {
            const m2 = new Matrix3x3(
                1, 1, 1,
                2, 2, 2,
                3, 3, 3,
            );
            expect(m1.equals(m2)).toBe(true);
        });
        
        it("should return false if two matrix have at least one element different", () => {
            const m2 = new Matrix3x3(
                1, 1, 1,
                2, 2, 9,
                3, 3, 3
            );
            expect(m1.equals(m2)).toBe(false);
        });
        
        it("should return false if other type of object is passed", () => {
            const m2 = 4;
            expect(m1.equals(m2)).toBe(false);
        });
    });
});