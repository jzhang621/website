import variableTransition from "@/interpolate";
import useCurrentFrame from "./useCurrentFrame";
import { Variable } from "@/components/animations/Array";

// interpolates the animation from events[currentStep - 1] to events[currentStep] in duration ms
function useInterpolation(events: Variable[], currentStep: number, duration: number, fps = 30) {
    const currentEvent = events[currentStep]!;
    const prevEvent = currentStep > 0 ? events[currentStep - 1]! : null;

    // Calculate the current frame for interpolation
    const totalFrames = Math.floor(duration / 1000) * fps;
    const startFrame = currentStep * totalFrames;
    const endFrame = startFrame + totalFrames;

    const currentFrame = useCurrentFrame(startFrame, endFrame, fps);

    // no need to interpolate between prev and currentEvent when prev is null
    // (i.e. the first step of animation)
    const interpolatedEvents =
        prevEvent !== null
            ? variableTransition(currentEvent, prevEvent, currentFrame - startFrame, totalFrames)
            : currentEvent;

    return {
        events: interpolatedEvents,
        finished: currentFrame === endFrame,
    };
}

export default useInterpolation;
