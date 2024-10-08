import { interpolate } from "d3-interpolate";
import { easeCubicInOut, easePoly } from "d3-ease";
import { DataItem, Variable } from "./components/animations/Array";

// Helper function to determine if a string is a color (either hex or rgb)
export function isColor(value: string): boolean {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)|(^rgb\(\d+,\s*\d+,\s*\d+\)$)/i.test(value);
}

export function interpolateValues(
    from: number,
    to: number,
    elapsed: number,
    duration: number,
    easingFunction = easeCubicInOut
) {
    // const easingFunction = easePoly.exponent(1);

    const t = easingFunction(elapsed / duration);
    return interpolate(from, to)(t);
}

export interface State {
    data: DataItem[];
    variables: Variable[];
}

const variableTransition = (
    currEvent: Variable,
    prevEvent: Variable | null,
    elapsed: number,
    total: number
): Variable => {
    const { value: currValue } = currEvent;
    // interpolate between the previous and current event
    if (prevEvent) {
        const { value: prevValue } = prevEvent;
        return {
            ...currEvent,
            interpolatedValue: interpolateValues(prevValue, currValue, elapsed, total),
        };
    }
    return currEvent;
};

export default variableTransition;
