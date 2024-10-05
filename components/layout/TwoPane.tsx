import React, { ReactNode } from "react";

interface TwoPaneLayoutProps {
    content: ReactNode;
    visual: ReactNode;
}

const TwoPane: React.FC<TwoPaneLayoutProps> = ({ content, visual }) => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Content Pane */}
            <div className="w-full lg:w-3/5 p-8 bg-white">{content}</div>

            {/* Visual Pane */}
            <div className="hidden lg:block w-full lg:w-2/5 p-8 bg-gray-100 sticky top-0">{visual}</div>
        </div>
    );
};

export default TwoPane;
