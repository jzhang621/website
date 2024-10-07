import { useState, useEffect } from "react";
import {
    easeCubicInOut,
    easeElasticInOut,
    easeLinear,
    easeExpIn,
    easeBounceInOut,
    easePolyInOut,
    easeExpOut,
} from "d3-ease";

export type Ease =
    | "cubic"
    | "elastic"
    | "linear"
    | "easeInExpo"
    | "easeBounceInOut"
    | "easePolyInOut"
    | "easeOutExpo";

// Utility function to get the appropriate easing function
export const getEasingFunction = (ease: Ease) => {
    switch (ease) {
        case "cubic":
            return easeCubicInOut;
        case "elastic":
            return easeElasticInOut;
        case "linear":
            return easeLinear;
        case "easeInExpo":
            return easeExpIn;
        case "easeOutExpo":
            return easeExpOut;
        case "easePolyInOut":
            return easePolyInOut;
        case "easeBounceInOut":
            return easeBounceInOut;
        default:
            return easeLinear;
    }
};

interface AnimatedValue {
    from: number;
    to: number;
    duration: number; // In seconds
    ease: Ease;
}

// Updated hook to handle multiple animated values, restart logic, and play control
export const useEasedValues = (
    animations: Record<string, AnimatedValue>,
    restartKey: number,
    isPlaying: boolean // Add isPlaying as a parameter
) => {
    const [values, setValues] = useState<Record<string, number>>(
        Object.keys(animations).reduce((acc, key) => ({ ...acc, [key]: animations[key].from }), {})
    );
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isPlaying) return; // Do nothing if not playing

        const animationKeys = Object.keys(animations);
        const animationFrames: number[] = [];

        animationKeys.forEach((key) => {
            const animation = animations[key];
            const { from, to, duration, ease } = animation;

            let start: number | null = null;
            const easingFunction = getEasingFunction(ease);

            const animate = (timestamp: number) => {
                if (!start) start = timestamp;
                const elapsed = timestamp - start;
                const t = Math.min(elapsed / (duration * 1000), 1); // Normalize time to range [0, 1]
                const easedProgress = easingFunction(t); // Apply easing function
                const newValue = parseFloat(
                    (from * (1 - easedProgress) + to * easedProgress).toFixed(4)
                );

                setValues((prevValues) => ({
                    ...prevValues,
                    [key]: newValue,
                }));

                setProgress(elapsed / (duration * 1000));

                if (t < 1) {
                    animationFrames.push(requestAnimationFrame(animate));
                }
            };

            animationFrames.push(requestAnimationFrame(animate));
        });

        return () => {
            // Cleanup: Cancel animation frames if component unmounts or animation stops
            animationFrames.forEach((frame) => cancelAnimationFrame(frame));
        };
    }, [animations, restartKey, isPlaying]); // Add isPlaying to the dependency array

    return { values, progress };
};