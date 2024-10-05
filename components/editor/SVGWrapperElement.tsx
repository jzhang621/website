import React from "react";
import styles from "./SVGSyntax.module.css"; // Assume styles for highlighting

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
        <div className={`text-slate-700 border border-gray-200 p-8`}>
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
