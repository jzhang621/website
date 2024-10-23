/**
 * Applies a 3x3 matrix transformation to a Uint8Array of pixel values.
 * @param pixels - Uint8Array representing pixel values (R, G, B, R, G, B, ...)
 * @param matrix - 3x3 matrix for transformation
 * @returns A new Uint8Array with transformed pixel values
 */
export function applyMatrixTransformation(pixels: Uint8Array, matrix: number[][]): Uint8Array {
    if (matrix.length !== 3 || matrix.some(row => row.length !== 3)) {
        throw new Error('Matrix must be 3x3');
    }

    const result = new Uint8Array(pixels.length);

    for (let i = 0; i < pixels.length; i += 3) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        const newR = Math.round(r * matrix[0][0] + g * matrix[0][1] + b * matrix[0][2]);
        const newG = Math.round(r * matrix[1][0] + g * matrix[1][1] + b * matrix[1][2]);
        const newB = Math.round(r * matrix[2][0] + g * matrix[2][1] + b * matrix[2][2]);

        result[i] = clampRGB([newR, 0, 0])[0];
        result[i + 1] = clampRGB([0, newG, 0])[1];
        result[i + 2] = clampRGB([0, 0, newB])[2];
    }

    return result;
}




export function clampRGB(rgb: [number, number, number]): [number, number, number] {
    return rgb.map(value => Math.max(0, Math.min(255, value))) as [number, number, number];
}


/**
 * Converts a Uint8Array of RGB pixel values into a list of [r, g, b] points.
 * @param pixels - Uint8Array representing pixel values (R, G, B, R, G, B, ...)
 * @param startIndex - Starting index in the Uint8Array (must be aligned to 3)
 * @param maxPoints - Maximum number of points to extract (default: 100)
 * @returns An array of [r, g, b] points
 */
export function extractRGBPoints(
    pixels: Uint8Array, 
    startIndex: number = 0, 
    maxPoints: number = 100
): Array<[number, number, number]> {
    if (startIndex % 3 !== 0) {
        throw new Error('Start index must be aligned to 3 (RGB triplets)');
    }

    const result: Array<[number, number, number]> = [];
    const endIndex = Math.min(startIndex + maxPoints * 3, pixels.length);

    for (let i = startIndex; i < endIndex; i += 3) {
        if (i + 2 < pixels.length) {
            result.push([
                pixels[i],
                pixels[i + 1],
                pixels[i + 2]
            ]);
        }
    }

    return result;
}
