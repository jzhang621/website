"use client";
import React from "react";
import { Replay, PlayArrow } from "@mui/icons-material";

const PlayButon: React.FC<{ progress: number; restartKey: number; onClick?: () => void }> = ({
    restartKey,
    onClick,
    progress,
}) => {
    const notPlayed = restartKey === 0 && progress === 0;

    return (
        <button
            className={`${
                notPlayed ? "animate-pulse-slightly border-[1.5px] border-orange-600" : ""
            } bg-[rgb(253,226,154,128)] hover:bg-[#FCD468] cursor-pointer
            absolute w-8 h-8 flex items-center justify-center rounded-md top-2 right-2`}
            tabIndex={0}
            onClick={onClick}
        >
            <PlayArrow className="text-amber-500 w-4 h-4 hover:text-amber-600" />
        </button>
    );
};

export default PlayButon;
