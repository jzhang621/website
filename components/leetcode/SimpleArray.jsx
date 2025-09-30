import React from 'react';

const SimpleArray = ({ data, currentIndex, boxSize = 25, margin = 10, marginX = 30 }) => {
  const totalArrayWidth = data.length * boxSize;

  // viewBox dimensions (including margin)
  const viewBoxWidth = totalArrayWidth + marginX * 2;
  const viewBoxHeight = boxSize + margin * 2;

  const rect = {
    fill: "#77A993",
    stroke: "#5C917A",
    strokeWidth: 1.5,
    strokeOpacity: 0.85,
    rx: 1,
  };

  const activeStroke = {
    stroke: "#fdfbd4",
    strokeWidth: 2.5,
    strokeOpacity: 1,
  };

  const text = {
    fontSize: 16,
    fontWeight: 700,
    fill: "#ffffe3",
    opacity: 1,
  };

  const buffer = 0.5;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <style>{`
        .array-rect {
          transition: fill 0.3s ease, stroke 0.3s ease, stroke-width 0.3s ease, stroke-opacity 0.3s ease;
        }
        .array-highlight {
          transition: opacity 0.3s ease;
        }
      `}</style>
      <svg
        width="100%"
        height="100%"
        viewBox={`${-buffer} ${-buffer} ${viewBoxWidth + buffer * 2} ${
          viewBoxHeight + buffer * 2
        }`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Render the array elements */}
        {data.map((value, idx) => {
          const isActive = currentIndex === idx;

          return (
            <g
              key={idx}
              transform={`translate(${marginX + idx * boxSize}, ${margin})`}
            >
              <rect
                className="array-rect"
                width={boxSize}
                height={boxSize}
                fill={rect.fill}
                rx={rect.rx}
                stroke={isActive ? activeStroke.stroke : rect.stroke}
                strokeWidth={isActive ? activeStroke.strokeWidth : rect.strokeWidth}
                strokeOpacity={isActive ? activeStroke.strokeOpacity : rect.strokeOpacity}
              />
              <text
                x={boxSize / 2}
                y={boxSize / 2}
                alignmentBaseline="middle"
                fontFamily="monospace"
                textAnchor="middle"
                {...text}
              >
                {value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default SimpleArray;
