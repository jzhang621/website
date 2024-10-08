"use client";
import { useState } from "react";
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
    duration: number, // duration for each step in ms
    resetKey: number,
    transition: TransitionableFunction<T>,
    isPlaying = false
): {
    currentStep: number;
    interpolatedEvents: T[];
    finished: boolean; // true when the entire animation has completed
    progress: number; // progress of the current step
} {
    // smoothly interpolates all the entries between marks[currentStep - 1] and marks[currentStep]
    const pauseTime = duration * 0.25; // pause at the end of each step

    const currentStep = useCurrentStep(marks.length, duration + pauseTime, resetKey, isPlaying);
    const currentEvent = marks[currentStep]!;
    const prevEvent = currentStep > 0 ? marks[currentStep - 1]! : null;

    // apply the given transition function to interpolate between prevEvent and currentEvent
    // prevEvent and currEvent are arrays of visual marks.
    // we apply interpolation between each individual mark in that apply
    const {
        events: interpolatedEvents,
        finished,
        progress,
    } = useInterpolation<T>(currentEvent, prevEvent, currentStep, duration, transition, isPlaying);

    return {
        currentStep,
        interpolatedEvents,
        finished: currentStep === marks.length - 1 && finished,
        progress,
    };
}

export default useAnimation;
