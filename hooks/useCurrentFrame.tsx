import { useState, useEffect } from "react";

const useCurrentFrame = (startFrame: number, endFrame: number, fps = 30) => {
    const [currentFrame, setCurrentFrame] = useState(startFrame);

    useEffect(() => {
        // Reset the current frame when startFrame or endFrame change
        setCurrentFrame(startFrame);

        // The interval function to update the frame number
        const interval = setInterval(() => {
            setCurrentFrame((prevFrame) => {
                const nextFrame = prevFrame + 1;
                return nextFrame <= endFrame ? nextFrame : prevFrame;
            });
        }, 1000 / fps);

        // Cleanup function to clear the interval
        return () => clearInterval(interval);
    }, [startFrame, endFrame, fps]);

    return currentFrame;
};

export default useCurrentFrame;
