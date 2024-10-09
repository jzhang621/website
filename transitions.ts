import { Variable, DataItem } from "./components/animations/Array";
import { interpolateValues } from "./interpolate";
import { easeExpIn, easeExpOut } from "d3-ease";

export interface TransitionableFunction<T> {
    (currEvent: T, prevEvent: T | null, progress: number): T;
}

export const variableTransition = (
    currEvent: Variable,
    prevEvent: Variable | null,
    progress: number
): Variable => {
    const { value: currValue } = currEvent;

    // interpolate between the previous and current event
    if (prevEvent) {
        const { value: prevValue } = prevEvent;
        if (currValue !== prevValue) {
            return {
                ...currEvent,
                interpolatedValue: interpolateValues(prevValue, currValue, progress),
                progress: interpolateValues(0, 1, progress),
            };
        }
    }

    if (currEvent.enter) {
        return {
            ...currEvent,
            progress: interpolateValues(0, 1, progress),
        };
    }

    if (currEvent.exit) {
        return {
            ...currEvent,
            progress: interpolateValues(1, 0, progress, easeExpOut),
        };
    }

    return currEvent;
};

export const indexTransition = (
    currEvent: DataItem,
    prevEvent: DataItem | null,
    progress: number
): DataItem => {
    const { index: currIndex } = currEvent;

    if (prevEvent) {
        const { index: prevIndex } = prevEvent;
        if (currIndex !== prevIndex) {
            return {
                ...currEvent,
                interpolatedValue: interpolateValues(prevIndex, currIndex, progress),
                progress: interpolateValues(0, 1, progress),
            };
        }
    }
    return currEvent;
};
