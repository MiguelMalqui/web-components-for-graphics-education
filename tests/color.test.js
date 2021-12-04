import Color from "../src/helpers/color.js";

describe('Color', () => {

    describe('makeRGB', () => {
        test('should ignore decimal part of the components', () => {
            const c = Color.makeRGB(0.2, 10.5, 100.8);
            expect(c.getRGB()).toEqual({ red: 0, green: 10, blue: 100, alpha: 255 });
        });
        test('should thorw RangeError when a RGB component is out of the range', () => {
            const t1 = () => { Color.makeRGB(-1, -1, -1) };
            const t2 = () => { Color.makeRGB(256, 256, 256) };
            expect(t1).toThrow(RangeError);
            expect(t2).toThrow(RangeError);
        });
    });

    describe('makeHSB', () => {
        test('should thorw RangeError when a HSB component is out of the range', () => {
            const t1 = () => { Color.makeHSB(-1, -1, -1) };
            const t2 = () => { Color.makeHSB(360, 360, 360) };
            expect(t1).toThrow(RangeError);
            expect(t2).toThrow(RangeError);
        });
    });

    describe('makeCMYK', () => {
        test('should thorw RangeError when a CMYK component is out of the range', () => {
            const t1 = () => { Color.makeCMYK(-1, -1, -1, -1) };
            const t2 = () => { Color.makeCMYK(2, 2, 2, 2) };
            expect(t1).toThrow(RangeError);
            expect(t2).toThrow(RangeError);
        });
    });
});