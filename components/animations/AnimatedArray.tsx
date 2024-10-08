"use client";
import useAnimation, { TransitionConfig } from "@/hooks/useAnimation";
import Array, { State, Variable, DataItem } from "@/components/animations/Array";
import { useState } from "react";
import { indexTransition, variableTransition } from "@/transitions";

const AnimatedArray: React.FC = () => {
    const variables: Variable[][] = [
        [{ name: "i", value: 1 }],
        [{ name: "i", value: 2 }],
        [{ name: "i", value: 3 }],
        [{ name: "i", value: 4 }],
    ];

    const data: DataItem[][] = [
        [
            { index: 0, value: 10 },
            { index: 1, value: 20 },
            { index: 2, value: 30 },
            { index: 3, value: 40 },
            { index: 4, value: 50 },
        ],
        [
            { index: 0, value: 10 },
            { index: 4, value: 20 },
            { index: 2, value: 30 },
            { index: 3, value: 40 },
            { index: 1, value: 50 },
        ],
        [
            { index: 0, value: 10 },
            { index: 4, value: 20 },
            { index: 2, value: 30 },
            { index: 3, value: 40 },
            { index: 1, value: 50 },
        ],
        [
            { index: 0, value: 10 },
            { index: 4, value: 20 },
            { index: 2, value: 30 },
            { index: 3, value: 40 },
            { index: 1, value: 50 },
        ],
    ];

    const [resetKey, setResetKey] = useState(0);
    const reset = () => {
        setResetKey((prev) => prev + 1);
    };

    const stepDuration = 1000;

    const { currentStep, interpolatedEvents, finished } = useAnimation<Variable>(
        variables,
        stepDuration,
        resetKey,
        variableTransition
    );

    const { currentStep: dataStep, interpolatedEvents: dataEvents } = useAnimation<DataItem>(
        data,
        stepDuration,
        resetKey,
        indexTransition
    );

    return (
        <div>
            <h1>Array Visualization Animation</h1>
            <Array data={dataEvents} variables={interpolatedEvents} boxSize={60} margin={20} />
        </div>
    );
};

export default AnimatedArray;
