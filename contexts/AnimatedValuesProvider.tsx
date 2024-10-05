"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useEasedValues } from "@/hooks/useEasedValues";

interface AnimatedValue {
    from: number;
    to: number;
    duration: number;
    ease?: "linear" | "cubic" | "elastic";
}

interface AnimatedValueContextProps {
    values: Record<string, number>;
    restartAnimations: () => void;
    progress: number;
    easedProgress: number;
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
    const [restartKey, setRestartKey] = useState(0); // Track restart key for triggering restarts

    const { values, progress, easedProgress } = useEasedValues(animations, restartKey); // Pass restartKey

    const restartAnimations = () => {
        setRestartKey((prevKey) => prevKey + 1); // Trigger restart
    };

    return <AnimationContext.Provider value={{ easedProgress, values, restartAnimations, progress }}>{children}</AnimationContext.Provider>;
};
