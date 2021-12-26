export const numDigits = 5;

export function numberArrayToBeCloseTo(received, expected) {
    for (let i = 0; i < received.length; i++) {
        expect(received[i]).toBeCloseTo(expected[i], numDigits);
    }
}