"use client";
import useAnimation from "@/hooks/useAnimation";
import { State } from "@/interpolate";
import Array from "@/components/animations/Array";
import { useState } from "react";

const AnimatedArray: React.FC = () => {
    const windowEvents = [
        { name: "i", value: 1 },
        { name: "i", value: 2 },
        { name: "i", value: 3 },
        { name: "i", value: 4 },
    ];

    const states: State[] = [
        {
            data: [
                { index: 0, value: 10 },
                { index: 1, value: 20 },
                { index: 2, value: 30 },
                { index: 3, value: 40 },
                { index: 4, value: 50 },
            ],
            variables: [{ name: "i", value: 1 }],
        },
        {
            data: [
                { index: 0, value: 10 },
                { index: 1, value: 20 },
                { index: 2, value: 30 },
                { index: 3, value: 40 },
                { index: 4, value: 50 },
            ],
            variables: [{ name: "i", value: 2 }], // `i` changes from 2 to 3
        },
        {
            data: [
                { index: 0, value: 10 },
                { index: 1, value: 20 },
                { index: 2, value: 30 },
                { index: 3, value: 40 },
                { index: 4, value: 50 },
            ],
            variables: [{ name: "i", value: 3 }], // `i` changes from 2 to 3
        },
        {
            data: [
                { index: 0, value: 10 },
                { index: 1, value: 20 },
                { index: 2, value: 30 },
                { index: 3, value: 40 },
                { index: 4, value: 50 },
            ],
            variables: [{ name: "i", value: 4 }], // `i` changes from 2 to 3
        },
    ];

    const [resetKey, setResetKey] = useState(0);
    const reset = () => {
        setResetKey((prev) => prev + 1);
    };

    const { currentStep, interpolatedEvents, finished } = useAnimation(
        windowEvents,
        1000,
        resetKey
    );

    return (
        <div>
            <h1>Array Visualization Animation</h1>
            <Array
                data={states[0].data}
                variables={[interpolatedEvents]}
                boxSize={60}
                margin={20}
            />
        </div>
    );
};

export default AnimatedArray;
