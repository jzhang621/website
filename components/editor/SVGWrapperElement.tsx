import React from "react";
import styles from "./SVGSyntax.module.css"; // Assume styles for highlighting
import { Source_Code_Pro } from "next/font/google";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"], weight: ["400", "700"] });

interface SVGWrapperProps {
    name: string;
    attributes: { [key: string]: string | number };
    children?: React.ReactNode;
}

const SVGWrapperElementSnippet: React.FC<SVGWrapperProps> = ({ name, attributes, children }) => {
    const renderAttributes = () => {
        return Object.entries(attributes).map(([key, value], i) => (
            <span key={key}>
                <span className={styles.attribute}>{key}</span>
                {`="${value}"`}
                {i < Object.entries(attributes).length - 1 && " "}
            </span>
        ));
    };

    return (
        <div
            className={`rounded-sm text-sm max-h-[600px] w-fit overflow-y-auto overflow-x-hidden leading-7 ${sourceCodePro.className} text-slate-700 p-8 bg-[#fdf6e399]`}
        >
            <pre>
                <code>
                    <span className={styles.tag}>{`<${name} `}</span>
                    {renderAttributes()}
                    <span className={styles.tag}>{`>`}</span>
                    <br />
                    {children}
                    <br />
                    <span className={styles.tag}>{`</${name}>`}</span>
                </code>
            </pre>
        </div>
    );
};

export default SVGWrapperElementSnippet;
