import { useState, useEffect, useRef } from 'react';

const useAnimationTime = (duration: number, isRunning: boolean): number => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const animationFrameRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        if (isRunning && elapsedTime < duration) {
            startTimeRef.current = performance.now() - elapsedTime;

            const animate = (currentTime: number) => {
                if (startTimeRef.current === null) return;

                const newElapsedTime = currentTime - startTimeRef.current;
                const clampedElapsedTime = Math.min(newElapsedTime, duration);
                setElapsedTime(clampedElapsedTime);

                if (clampedElapsedTime < duration) {
                    animationFrameRef.current = requestAnimationFrame(animate);
                }
            };

            animationFrameRef.current = requestAnimationFrame(animate);
        } else {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        }

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isRunning, duration, elapsedTime]);

    useEffect(() => {
        if (!isRunning) {
            setElapsedTime(0);
            startTimeRef.current = null;
        }
    }, [isRunning]);

    return elapsedTime;
};

export default useAnimationTime;
