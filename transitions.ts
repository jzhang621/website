import { Variable, DataItem } from "./components/animations/Array";
import { interpolateValues } from "./interpolate";

export interface TransitionableFunction<T> {
    (currEvent: T, prevEvent: T | null, elapsed: number, total: number): T;
}

export const variableTransition = (
    currEvent: Variable,
    prevEvent: Variable | null,
    elapsed: number,
    total: number
): Variable => {
    const { value: currValue } = currEvent;

    // interpolate between the previous and current event
    if (prevEvent) {
        const { value: prevValue } = prevEvent;
        if (currValue !== prevValue) {
            // console.log({
            //     elapsed,
            //     total,
            //     interpolate: interpolateValues(prevValue, currValue, elapsed, total),
            // });
            return {
                ...currEvent,
                interpolatedValue: interpolateValues(prevValue, currValue, elapsed, total),
            };
        }
    }
    return currEvent;
};

export const indexTransition = (
    currEvent: DataItem,
    prevEvent: DataItem | null,
    elapsed: number,
    total: number
): DataItem => {
    const { index: currIndex } = currEvent;

    if (prevEvent) {
        const { index: prevIndex } = prevEvent;
        if (currIndex !== prevIndex) {
            return {
                ...currEvent,
                interpolatedIndex: interpolateValues(prevIndex, currIndex, elapsed, total),
            };
        }
    }
    return currEvent;
};
