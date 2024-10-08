import { useState, useEffect } from "react";
import { TransitionableFunction } from "@/transitions";
import useCurrentFrame, { FPS } from "./useCurrentFrame";

// const FPS = 30;

function useInterpolation<T>(
    prevEvent: T[] | null,
    currentEvent: T[],
    currentStep: number,
    duration: number, // Duration for the animation
    transition: TransitionableFunction<T>
) {
    const totalFrames = Math.floor((duration / 1000) * FPS); // Calculate total frames for the duration

    // currentStep is needed to tell this hook when to restart the current frame interval calculation.
    const currentFrame = useCurrentFrame(0, totalFrames, currentStep);

    const interpolatedEvents =
        prevEvent !== null
            ? applyTransition(currentEvent, prevEvent, currentFrame, totalFrames, transition)
            : // if prevEvent is null, no interpolation is needed (first step of animation)
              currentEvent;

    // Return the interpolated events and a flag for when the animation is finished
    return {
        events: interpolatedEvents,
        finished: currentFrame >= totalFrames, // Finished when currentFrame reaches the total frames
    };
}

function applyTransition<T>(
    currentEvent: T[],
    prevEvent: T[],
    currentFrame: number,
    totalFrames: number,
    transition: TransitionableFunction<T>
): T[] {
    const interpolatedValues: T[] = [];

    // iterate over each item in the currentEvent and prevEvent and interpolate the values
    for (let i = 0; i < currentEvent.length; i++) {
        const prevValue = prevEvent[i];
        const currentValue = currentEvent[i];
        const interpolatedValue = transition(currentValue, prevValue, currentFrame, totalFrames);
        interpolatedValues.push(interpolatedValue);
    }

    return interpolatedValues;
}

export default useInterpolation;
