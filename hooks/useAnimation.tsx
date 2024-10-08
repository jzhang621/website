import useCurrentStep from "./useCurrentStep"; // Assuming these are the paths
import useInterpolation from "./useInterpolation";
import { SlidingWindowMark } from "../SlidingWindow";
import { State } from "@/interpolate";
import { Variable } from "@/components/animations/Array";

/*
Animates and interpolates between an array of animation events.

marks: an array of animation events to animate and interpolate between
interval: time for each animation step in ms
resetKey: when this key changes, current step is reset to 0 and begins animating again
*/

function useAnimation(
    marks: Variable[],
    interval: number,
    resetKey: number
): {
    currentStep: number;
    interpolatedEvents: SlidingWindowMark;
    finished: boolean; // true when the entire animation has completed
} {
    const { currentStep } = useCurrentStep(marks.length, interval, resetKey);

    // smoothly interpolates the values between marks[currentStep - 1] and marks[currentStep]
    const { events: interpolatedEvents, finished } = useInterpolation(marks, currentStep, interval);

    return {
        currentStep,
        interpolatedEvents,
        finished: currentStep === marks.length - 1 && finished,
    };
}

export default useAnimation;
