interface ColorTransformProps {
    startColor: [number, number, number];
    endColor: [number, number, number];
    functionLabel: string;
}

export default function ColorTransform({
    startColor,
    endColor,
    functionLabel,
}: ColorTransformProps) {
    // Internal layout constants
    const ARROW_WIDTH_RATIO = 1 / 3;
    const VIEW_WIDTH = 400;
    const MARGIN = VIEW_WIDTH / 20;
    const VIEW_HEIGHT = 175;
    const LABEL_OFFSET = 15; // Distance between rect and label

    // Convert RGB arrays to CSS color strings
    const startRgb = `rgb(${startColor.join(", ")})`;
    const endRgb = `rgb(${endColor.join(", ")})`;

    // Calculate dimensions based on viewBox width
    const arrowWidth = VIEW_WIDTH * ARROW_WIDTH_RATIO;
    const rectWidth = (VIEW_WIDTH - arrowWidth - MARGIN * 2) / 2;
    const rectHeight = rectWidth;
    const verticalCenter = VIEW_HEIGHT / 2;

    // Calculate positions
    const startX = 0;
    const endX = VIEW_WIDTH - rectWidth;
    const arrowStartX = rectWidth + MARGIN;
    const arrowEndX = arrowStartX + arrowWidth;

    // Calculate vertical positions to center the entire element
    const totalHeight = rectHeight + LABEL_OFFSET; // Height of rect + label
    const groupStartY = verticalCenter - totalHeight / 2;

    return (
        <div className="w-full">
            <svg
                viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-auto"
            >
                {/* Start color group */}
                <g>
                    <rect
                        x={startX}
                        y={groupStartY}
                        width={rectWidth}
                        height={rectHeight}
                        fill={startRgb}
                        rx={2}
                    />
                    <text
                        x={startX + rectWidth / 2}
                        y={groupStartY + rectHeight + LABEL_OFFSET}
                        textAnchor="middle"
                        className="font-mono font-semibold"
                        fontSize="8px"
                        fill={startRgb}
                    >
                        {startRgb}
                    </text>
                </g>

                {/* Arrow and function label */}
                <g>
                    <line
                        x1={arrowStartX}
                        y1={groupStartY + rectHeight / 2}
                        x2={arrowEndX}
                        y2={groupStartY + rectHeight / 2}
                        stroke="#6C6C6C"
                        strokeWidth="1.5"
                        markerEnd="url(#arrow)"
                        opacity={0.5}
                    />
                    <text
                        x={arrowStartX + arrowWidth / 2}
                        y={groupStartY + rectHeight / 2 + 20}
                        textAnchor="middle"
                        className="font-mono"
                        fontSize="8px"
                        // fill="#5B5B5B"
                        // opacity={0.75}
                    >
                        {functionLabel}
                    </text>
                    <defs>
                        <marker
                            id="arrow"
                            viewBox="0 0 10 10"
                            refX="9"
                            refY="5"
                            markerWidth="6"
                            markerHeight="6"
                            orient="auto"
                        >
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#6C6C6C" />
                        </marker>
                    </defs>
                </g>

                {/* End color group */}
                <g style={{ color: endRgb }}>
                    <rect
                        x={endX}
                        y={groupStartY}
                        width={rectWidth}
                        height={rectHeight}
                        fill={endRgb}
                        rx={2}
                    />
                    <text
                        x={endX + rectWidth / 2}
                        y={groupStartY + rectHeight + LABEL_OFFSET}
                        textAnchor="middle"
                        className="font-mono font-semibold"
                        fontSize="8px"
                        fill={endRgb}
                    >
                        {endRgb}
                    </text>
                </g>
            </svg>
        </div>
    );
}
