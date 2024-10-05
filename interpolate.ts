import { interpolate } from "d3-interpolate";
import { easeCubicInOut, easePoly } from "d3-ease";

// Helper function to determine if a string is a color (either hex or rgb)
export function isColor(value: string): boolean {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)|(^rgb\(\d+,\s*\d+,\s*\d+\)$)/i.test(value);
}

export function interpolateValues(from: number, to: number, elapsed: number, duration: number, easingFunction = easeCubicInOut) {
    // const easingFunction = easePoly.exponent(1);

    const t = easingFunction(elapsed / duration);
    return interpolate(from, to)(t);
}

// export function interpolateColors(from: string, to: string, elapsed: number, duration: number) {
//     const easingFunction = easeCubicInOut;

//     const t = easingFunction(elapsed / duration);
//     return interpolateRgb(from, to)(t);
// }
