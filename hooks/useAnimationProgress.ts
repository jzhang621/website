import { useCallback, useRef, useEffect, useState } from 'react';

interface UseSharedAnimationProps {
    duration: number;
    onProgress?: (progress: number) => void;
    delay?: number;
}

export const useAnimationProgress = ({ duration, onProgress, delay = 0 }: UseSharedAnimationProps) => {
    const [isRunning, setIsRunning] = useState(false);
    const [progress, setProgress] = useState(0);
    const animationRef = useRef<number>();
    const startTimeRef = useRef<number | null>(null);
    const delayTimeoutRef = useRef<number | null>(null);

    const getProgress = useCallback((currentTime: number) => {
        if (startTimeRef.current === null) return 0;
        const elapsedTime = currentTime - startTimeRef.current;
        return Math.min(elapsedTime / duration, 1);
    }, [duration]);

    const animate = useCallback((currentTime: number) => {
        if (startTimeRef.current === null) startTimeRef.current = currentTime;
        const newProgress = getProgress(currentTime);
        setProgress(newProgress);
        onProgress?.(newProgress);

        if (newProgress < 1) {
            animationRef.current = requestAnimationFrame(animate);
        } else {
            setIsRunning(false);
            startTimeRef.current = null;
        }
    }, [getProgress, onProgress]);

    const startAnimation = useCallback(() => {
        // If the animation is already running, do nothing
        if (!startTimeRef.current) {
            setIsRunning(true);
            startTimeRef.current = null;
            setProgress(0); // Reset progress to 0
            if (delay > 0) {
                delayTimeoutRef.current = window.setTimeout(() => {
                    animationRef.current = requestAnimationFrame(animate);
                }, delay);
            } else {
                animationRef.current = requestAnimationFrame(animate);
            }
        }
    }, [animate, delay]);

    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (delayTimeoutRef.current) {
                clearTimeout(delayTimeoutRef.current);
            }
        };
    }, []);

    return {
        progress,
        isRunning,
        startAnimation,
    };
};


export default useAnimationProgress;
