"use client";
import useAnimation from "@/hooks/useAnimation";
import Array, { Variable, DataItem } from "@/components/animations/Array";
import { useState } from "react";
import { indexTransition, variableTransition } from "@/transitions";
import PlayButton from "../ReplayButton";
import { data, variables } from "@/animation-data/bubbleSort";


const progressText = (currentStep: number, totalSteps: number) => {
    return `${currentStep + 1} / ${totalSteps}`;
};

const ArrayWithAnimation: React.FC = () => {
    const stepDuration = 750;

    const [resetKey, setResetKey] = useState(0);
    const [isStarted, setIsStarted] = useState(false);

    const restartAnimation = () => {
        setResetKey((prev) => prev + 1);
        setIsStarted(true);
    };

    const {
        interpolatedEvents,
        progress,
        finished: variableFinished,
    } = useAnimation<Variable>(variables, stepDuration, resetKey, variableTransition, isStarted);

    const {
        interpolatedEvents: dataEvents,
        finished: dataFinished,
        currentStep,
    } = useAnimation<DataItem>(data, stepDuration, resetKey, indexTransition, isStarted);

    return (
      <div className="mt-12 relative">
        <PlayButton
          onClick={restartAnimation}
          restartKey={resetKey}
          progress={progress}
          disabled={isStarted && (!variableFinished || !dataFinished)}
        />
        <Array data={dataEvents} variables={interpolatedEvents} boxSize={20} margin={10} />

        <div className="absolute bottom-2 right-4 text-xs text-[#A9778Daa]">
          {progressText(currentStep - 1, data.length - 1)}
        </div>
      </div>
    );
};

export default ArrayWithAnimation;
