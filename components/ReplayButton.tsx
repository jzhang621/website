"use client";
import React from "react";
import { PlayArrow } from "@mui/icons-material";

const PlayButton: React.FC<{
    progress: number;
    restartKey: number;
    onClick?: () => void;
    disabled?: boolean;
}> = ({ restartKey, onClick, progress, disabled = false }) => {
    const notPlayed = restartKey === 0 && progress === 0;

    return (
        <button
            disabled={disabled}
            className={`${
                notPlayed ? "animate-pulse-slightly border-[1.5px] border-orange-600" : ""
            } bg-[rgb(253,226,154,128)] hover:bg-[#FCD468] cursor-pointer
            absolute w-8 h-8 flex items-center justify-center rounded-md top-2 right-2 ${
                disabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            tabIndex={0}
            onClick={onClick}
        >
            <PlayArrow className="text-amber-500 w-4 h-4 hover:text-amber-600" />
        </button>
    );
};

export default PlayButton;
