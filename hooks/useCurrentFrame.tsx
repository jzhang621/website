import { useState, useEffect } from "react";

export const FPS = 60;

// currentStep is needed to tell this hook when to restart the current frame interval calculation.
// i.e. when currentStep changes, another setInterval should be called to calculate the next frame.
const useCurrentFrame = (startFrame: number, endFrame: number) => {
    const [currentFrame, setCurrentFrame] = useState(startFrame);

    useEffect(() => {
        // reset the current frame when startFrame or endFrame change
        setCurrentFrame(startFrame);

        const interval = setInterval(() => {
            setCurrentFrame((prevFrame) => {
                const nextFrame = prevFrame + 1;

                // stop incrementing if we've reached the endFrame
                if (nextFrame > endFrame) {
                    clearInterval(interval);
                    return prevFrame;
                }

                return nextFrame;
            });
        }, 1000 / FPS);

        // cleanup function to clear the interval
        return () => clearInterval(interval);
    }, [startFrame, endFrame]);

    return currentFrame;
};

export default useCurrentFrame;
