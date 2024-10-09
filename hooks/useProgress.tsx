import { useState, useEffect } from "react";

const useProgress = (currentStep: number, duration: number, isPlaying: boolean, FPS: number) => {
    const totalFrames = Math.floor((duration / 1000) * FPS); // Calculate total frames for the duration

    // Calculate the current frame for interpolation
    const startFrame = currentStep * totalFrames;
    const endFrame = startFrame + totalFrames;

    const [currentFrame, setCurrentFrame] = useState(startFrame);

    useEffect(() => {
        if (!isPlaying) return; // Do nothing if not playing

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
    }, [currentStep, isPlaying]);

    return { currentFrame, progress: (currentFrame - startFrame) / (endFrame - startFrame) };
};

export default useProgress;
