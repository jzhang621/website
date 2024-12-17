"use client";
import React from "react";
import { PlayArrow, Refresh } from "@mui/icons-material";
import useWindowSize from "@/hooks/useWindowSize";

const PlayButton: React.FC<{
    progress: number;
    restartKey: number;
    onClick?: () => void;
    disabled?: boolean;
}> = ({ restartKey, onClick, progress, disabled = false }) => {
    const notPlayed = restartKey === 0 && progress === 0;

    const { width } = useWindowSize();
    const sizeClass = width > 768 ? "w-8 h-8" : "w-6 h-6";
    const iconSizeClass = width > 768 ? "w-4 h-4" : "w-3 h-3";

    return (
        <button
            disabled={disabled}
            className={`${
                notPlayed ? "animate-pulse-slightly border-[1.5px] border-[#A9778D]" : ""
            } bg-[#A9778D88] cursor-pointer
            absolute flex items-center justify-center rounded-md top-2 right-2 ${sizeClass} ${
                disabled ? "cursor-not-allowed opacity-25" : "hover:bg-[#A9778Dcc]"
            }`}
            tabIndex={0}
            onClick={onClick}
        >
            <PlayArrow className={`text-[#A9778D] ${iconSizeClass}`} />
        </button>
    );
};

export default PlayButton;
