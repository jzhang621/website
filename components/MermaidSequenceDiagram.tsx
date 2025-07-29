'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidSequenceDiagramProps {
    diagram: string;
    className?: string;
}

const MermaidSequenceDiagram: React.FC<MermaidSequenceDiagramProps> = ({ diagram, className }) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!isInitialized) {
            mermaid.initialize({
                startOnLoad: false,
                theme: 'default',
                securityLevel: 'loose',
                sequence: {
                    messageAlign: 'center',
                    messageFontSize: 10,
                    messageFontFamily: 'monospace'
                }
            });
            setIsInitialized(true);
        }
    }, [isInitialized]);

    useEffect(() => {
        if (isInitialized && elementRef.current) {
            const renderDiagram = async () => {
                try {
                    if (elementRef.current) {
                        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                        const { svg } = await mermaid.render(id, diagram);
                        elementRef.current.innerHTML = svg;
                    }
                } catch (error) {
                    console.error('Mermaid rendering error:', error);
                    if (elementRef.current) {
                        elementRef.current.innerHTML = '<p>Error rendering diagram</p>';
                    }
                }
            };

            renderDiagram();
        }
    }, [diagram, isInitialized]);

    return <div ref={elementRef} className={className} />;
};

export default MermaidSequenceDiagram;