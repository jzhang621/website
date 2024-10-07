import React, { FC, ReactNode } from "react";

interface NoteProps {
    children: ReactNode;
}

const Note: FC<NoteProps> = ({ children }) => {
    return (
        <div className="note w-3/4 rounded-sm px-4 py-1 mx-auto bg-[#eff6facc] border-l-8 border-[#b1d6df] my-12">
            {children}
        </div>
    );
};

export default Note;
