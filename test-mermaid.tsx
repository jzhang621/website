import MermaidSequenceDiagram from './components/MermaidSequenceDiagram';

const testDiagram = `sequenceDiagram
    participant Dev as Developer
    participant Build as next build
    participant Route as Static Route
    participant Cache as Build Cache / File System

    Note over Dev, Cache: Build time generation

    Dev->>Build: next build
    activate Build
    
    Build->>Route: generate static route
    activate Route
    Route->>Route: render HTML + RSC payload
    Route-->>Build: generated content
    deactivate Route
    
    Build->>Cache: write HTML file
    Build->>Cache: write RSC payload
    
    Build-->>Dev: build complete
    deactivate Build

    Note over Cache: Static files cached on disk, ready for serving`;

export default function TestMermaid() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Mermaid Sequence Diagram Test</h1>
            <MermaidSequenceDiagram diagram={testDiagram} className="border rounded-lg p-4" />
        </div>
    );
}