"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Ease, useEasedValues } from "@/hooks/useEasedValues";

interface AnimatedValue {
    from: number;
    to: number;
    duration: number;
    ease: Ease;
}

interface AnimatedValueContextProps {
    values: Record<string, number>;
    restartAnimations: () => void;
    progress: number;
    restartKey: number;
}

const AnimationContext = createContext<AnimatedValueContextProps | undefined>(undefined);

export const useAnimatedValuesContext = () => {
    const context = useContext(AnimationContext);
    if (!context) {
        throw new Error("useAnimationContext must be used within an AnimationProvider");
    }
    return context;
};

interface AnimationProviderProps {
    animations: Record<string, AnimatedValue>;
    children: React.ReactNode;
}

export const AnimatedValueProvider: React.FC<AnimationProviderProps> = ({ animations, children }) => {
    const [restartKey, setRestartKey] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const { values, progress } = useEasedValues(animations, restartKey, isPlaying);

    const restartAnimations = () => {
        setRestartKey((prevKey) => prevKey + 1); // Trigger restart
        setIsPlaying(true); // Start the animation when play button is clicked
    };

    return (
        <AnimationContext.Provider value={{ values, restartAnimations, progress, restartKey }}>
            {children}
        </AnimationContext.Provider>
    );
};