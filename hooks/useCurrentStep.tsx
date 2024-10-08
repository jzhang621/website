import { useState, useEffect } from "react";

/*
Increments currentStep from 0 to totalSteps - 1 at the given interval in ms. Used to increment the currentStep of an animation.

totalSteps: total number of steps to increment
playInterval: time between increments in ms
resetKey: when this key changes, current step is reset to 0 and will begin incrementing again
*/

function useCurrentStep(
    totalSteps: number,
    duration: number = 1000, // default time between steps in ms
    resetKey = 0, // key to reset the animation to step 0,
    isPlaying = false
) {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (!isPlaying) return; // Do nothing if not playing

        let intervalId: number | undefined | NodeJS.Timeout;

        // this will be triggered by a change in resetKey
        setCurrentStep(0);

        intervalId = setInterval(() => {
            setCurrentStep((prev) => {
                if (prev < totalSteps - 1) {
                    return prev + 1;
                } else {
                    clearInterval(intervalId);
                    return prev;
                }
            });
        }, duration);

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [totalSteps, resetKey]);

    return currentStep;
}

export default useCurrentStep;
