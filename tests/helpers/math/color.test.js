import Color from "../../../src/helpers/math/color.js"
import { jest } from "@jest/globals"

describe("Color", () => {

    console.warn = jest.fn();

    describe("constructor", () => {
        it("should create a black color", () => {
            const color = new Color();
            expect(color.r).toBe(0);
            expect(color.g).toBe(0);
            expect(color.b).toBe(0);
            expect(color.a).toBe(1);
        });
    });

    describe("makeRGB", () => {
        it("should create a color using RGB color model", () => {
            const color = Color.makeRGB(255, 0, 0, 0.5);
            expect(color.r).toBe(255);
            expect(color.g).toBe(0);
            expect(color.b).toBe(0);
            expect(color.a).toBe(0.5);
        });

        it("should warn when a parameter is out of range", () => {
            const color = Color.makeRGB(-1, -1, -1, -1);
            expect(color.r).toBe(0);
            expect(color.g).toBe(0);
            expect(color.b).toBe(0);
            expect(color.a).toBe(1);
            expect(console.warn).toBeCalled();
        });
    });

    describe("makeHSB", () => {
        it("should create a color using HSB color model", () => {
            const color = Color.makeHSB(180, 0.5, 0.5, 0.5);
            expect(color.r).toBe(64);
            expect(color.g).toBe(128);
            expect(color.b).toBe(128);
            expect(color.a).toBe(0.5);
        });

        it("should warn when a parameter is out of range", () => {
            const color = Color.makeHSB(-1, -1, -1, -1);
            expect(color.r).toBe(0);
            expect(color.g).toBe(0);
            expect(color.b).toBe(0);
            expect(color.a).toBe(1);
            expect(console.warn).toBeCalled();
        });
    });

    describe("makeCMYK", () => {
        it("should create a color using CMYK color model", () => {
            const color = Color.makeCMYK(0.5, 0, 0, 0.5, 0.5);
            expect(color.r).toBe(64);
            expect(color.g).toBe(128);
            expect(color.b).toBe(128);
            expect(color.a).toBe(0.5);
        });

        it("should warn when a parameter is out of range", () => {
            const color = Color.makeCMYK(-1, -1, -1, -1);
            expect(color.r).toBe(0);
            expect(color.g).toBe(0);
            expect(color.b).toBe(0);
            expect(color.a).toBe(1);
            expect(console.warn).toBeCalled();
        });
    });

    describe("setRGB", () => {
        const color = new Color();

        it("should set the value of the color using RGB color model", () => {
            color.setRGB(255, 0, 0, 0.5);
            expect(color.r).toBe(255);
            expect(color.g).toBe(0);
            expect(color.b).toBe(0);
            expect(color.a).toBe(0.5);
        });

        it("should warn when a parameter is out of range", () => {
            color.setRGB(-1, -1, -1, -1);
            expect(color.r).toBe(0);
            expect(color.g).toBe(0);
            expect(color.b).toBe(0);
            expect(color.a).toBe(1);
            expect(console.warn).toBeCalled();
        });
    });

    describe("getRGB", () => {
        it("should get the RGB values of the color", () => {
            const color = new Color().getRGB();
            expect(color.r).toBe(0);
            expect(color.g).toBe(0);
            expect(color.b).toBe(0);
            expect(color.a).toBe(1);
        });
    });

    describe("setHSB", () => {
        const color = new Color();

        it("should set the value of the color using HSB color model", () => {
            color.setHSB(180, 0.5, 0.5, 0.5);
            expect(color.r).toBe(64);
            expect(color.g).toBe(128);
            expect(color.b).toBe(128);
            expect(color.a).toBe(0.5);
        });

        it("should warn when a parameter is out of range", () => {
            color.setHSB(-1, -1, -1, -1);
            expect(color.r).toBe(0);
            expect(color.g).toBe(0);
            expect(color.b).toBe(0);
            expect(color.a).toBe(1);
            expect(console.warn).toBeCalled();
        });
    });

    describe("getHSB", () => {
        it("should get the HSB values of the color", () => {
            const color = new Color().getHSB();
            expect(color.h).toBe(0);
            expect(color.s).toBe(0);
            expect(color.b).toBe(0);
            expect(color.a).toBe(1);
        });
    });

    describe("setCMYK", () => {
        const color = new Color();

        it("should set the value of the color using CMYK color model", () => {
            color.setCMYK(0.5, 0, 0, 0.5, 0.5);
            expect(color.r).toBe(64);
            expect(color.g).toBe(128);
            expect(color.b).toBe(128);
            expect(color.a).toBe(0.5);
        });

        it("should warn when a parameter is out of range", () => {
            color.setCMYK(-1, -1, -1, -1);
            expect(color.r).toBe(0);
            expect(color.g).toBe(0);
            expect(color.b).toBe(0);
            expect(color.a).toBe(1);
            expect(console.warn).toBeCalled();
        });
    });

    describe("getCMYK", () => {
        it("should get the HSB values of the color", () => {
            const color = new Color().getCMYK();
            expect(color.c).toBe(0);
            expect(color.m).toBe(0);
            expect(color.y).toBe(0);
            expect(color.k).toBe(1);
            expect(color.a).toBe(1);
        });
    });

    describe("luminance", () => {
        it("should compute the luminance of the color", () => {
            const black = Color.makeRGB(0, 0, 0);
            const white = Color.makeRGB(255, 255, 255);
            expect(black.luminance()).toBe(0);
            expect(white.luminance()).toBe(1);
        });
    });

    describe("similarity", () => {
        it("should compute the similarity of a color with other color", () => {
            const black = Color.makeRGB(0, 0, 0);
            const white = Color.makeRGB(255, 255, 255);
            expect(black.similarity(white)).toBe(0);
        });
    });
});