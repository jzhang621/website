"use client";
import React, { useState, ChangeEvent } from "react";
import styles from "./SVGSyntax.module.css";

interface EditableAttributeProps {
    name: string;
    label: string;
    value: string | number;
    options?: string[]; // Only for 'select' type
    onValueChange: (name: string, value: string | number) => void;
    min?: number; // Only for 'number' type
    max?: number; // Only for 'number' type
}

const EditableAttribute: React.FC<EditableAttributeProps> = ({ name, label, value: initialValue, options = [], onValueChange, min, max }) => {
    const [value, setValue] = useState<string | number>(initialValue);

    const isString = label == "fill" || label == "stroke";
    const isNumber = !isString;

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const newValue = isNumber ? parseInt(e.target.value) : e.target.value;
        setValue(newValue);
        onValueChange(name, newValue);
    };

    return (
        <span>
            <span className={styles.attribute}>{label}</span>
            {`="`}
            {isNumber ? (
                <input
                    type="number"
                    value={value}
                    onChange={handleChange}
                    min={min}
                    max={max}
                    step={5}
                    className={styles.number}
                    style={{
                        width: "60px",
                        padding: "0px 5px",
                        borderRadius: "3px",
                    }}
                />
            ) : (
                <select
                    value={value}
                    onChange={handleChange}
                    className={styles.number}
                    style={{
                        padding: "2px 8px",
                        borderRadius: "3px",
                    }}
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            )}
            {`"`}
        </span>
    );
};

export default EditableAttribute;
