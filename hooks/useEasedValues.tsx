import { useState, useEffect } from "react";
import { easeCubicInOut, easeElasticInOut, easeLinear } from "d3-ease";

// Utility function to get the appropriate easing function
const getEasingFunction = (ease: string | undefined) => {
    switch (ease) {
        case "cubic":
            return easeCubicInOut;
        case "elastic":
            return easeElasticInOut;
        case "linear":
            return easeLinear;
        default:
            return easeLinear;
    }
};

interface AnimatedValue {
    from: number;
    to: number;
    duration: number; // In seconds
    ease?: "linear" | "cubic" | "elastic";
}

// Updated hook to handle multiple animated values and restart logic
export const useEasedValues = (animations: Record<string, AnimatedValue>, restartKey: number) => {
    const [values, setValues] = useState<Record<string, number>>(Object.keys(animations).reduce((acc, key) => ({ ...acc, [key]: animations[key].from }), {}));
    const [progress, setProgress] = useState(0);
    const [easedProgress, setEasedProgress] = useState(0);

    useEffect(() => {
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
                const newValue = parseFloat((from * (1 - easedProgress) + to * easedProgress).toFixed(4));

                setValues((prevValues) => ({
                    ...prevValues,
                    [key]: newValue,
                }));

                setProgress(elapsed / (duration * 1000));
                setEasedProgress(easedProgress);

                if (t < 1) {
                    animationFrames.push(requestAnimationFrame(animate));
                }
            };

            animationFrames.push(requestAnimationFrame(animate));
        });

        return () => {
            // Cleanup: Cancel animation frames if component unmounts
            animationFrames.forEach((frame) => cancelAnimationFrame(frame));
        };
    }, [animations, restartKey]);

    return { values, progress, easedProgress };
};
