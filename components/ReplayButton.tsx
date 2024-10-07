"use client";
import React from "react";
import { Replay } from "@mui/icons-material";

const ReplayButton: React.FC<{ disabled: boolean; onClick?: () => void }> = ({
    disabled,
    onClick,
}) => {
    return (
        <button
            disabled={disabled}
            className={` ${
                disabled
                    ? "bg-[rgb(253,226,154,30)] cursor-not-allowed"
                    : "bg-[rgb(253,226,154,128)] hover:bg-[rgb(253,226,154)] cursor-pointer"
            } absolute w-8 h-8 flex items-center justify-center rounded-md top-2 right-2`}
            tabIndex={0}
            onClick={onClick}
        >
            <Replay className="text-amber-500 w-4 h-4 hover:text-amber-600" />
        </button>
    );
};

export default ReplayButton;
