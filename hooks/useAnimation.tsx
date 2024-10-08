import { useState, useEffect } from "react";
import useCurrentStep from "./useCurrentStep"; // Assuming these are the paths
import useInterpolation from "./useInterpolation";
import { TransitionableFunction } from "@/transitions";

/*
Animates and interpolates between an array of animation events.

marks: an array of animation events to animate and interpolate between
interval: time for each animation step in ms
resetKey: when this key changes, current step is reset to 0 and begins animating again
*/

function useAnimation<T>(
    marks: T[][],
    duration: number, // Duration for each step in ms
    resetKey: number,
    transition: TransitionableFunction<T>
): {
    currentStep: number;
    interpolatedEvents: T[];
    finished: boolean; // true when the entire animation has completed
} {
    const { currentStep } = useCurrentStep(marks.length, duration, resetKey);

    // smoothly interpolates all the entries between marks[currentStep - 1] and marks[currentStep]

    const currentEvent = marks[currentStep]!;
    const prevEvent = currentStep > 0 ? marks[currentStep - 1]! : null;

    // currentFrame should be a concept here.

    const { events: interpolatedEvents, finished } = useInterpolation<T>(
        prevEvent,
        currentEvent,
        currentStep,
        duration,
        transition
    );

    return {
        currentStep,
        interpolatedEvents,
        finished: currentStep === marks.length - 1 && finished,
    };
}

export default useAnimation;
