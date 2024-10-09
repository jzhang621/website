import { TransitionableFunction } from "@/transitions";
import useProgress from "./useProgress";

function useInterpolation<T>(
    currentEvent: T[],
    prevEvent: T[] | null,
    currentStep: number,
    duration: number,
    transition: TransitionableFunction<T>,
    isPlaying: boolean,
    FPS = 60,
) {
    // calculate the progress of the current step
    const { progress } = useProgress(currentStep, duration, isPlaying, FPS);

    const interpolatedEvents = applyTransition(currentEvent, prevEvent, progress, transition);

    // Return the interpolated events and a flag for when the animation is finished
    return {
        events: interpolatedEvents,
        progress,
        finished: progress >= 1, // Finished when currentFrame reaches the total frames
    };
}

function applyTransition<T>(
    currentEvent: T[],
    prevEvent: T[] | null,
    progress: number,
    transition: TransitionableFunction<T>
): T[] {
    return currentEvent.map((currentValue, i) => {
        const prevValue = prevEvent ? prevEvent[i] : null;
        return transition(currentValue, prevValue, progress);
    });
}

export default useInterpolation;
