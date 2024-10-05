interface GridProps {
    width: number;
    height: number;
    cellSize: number; // Size of each grid cell
    stroke?: string; // Color of the grid lines
    strokeWidth?: number; // Thickness of the grid lines
}

const Grid: React.FC<GridProps> = ({ width, height, cellSize, stroke = "#ccc", strokeWidth = 1 }) => {
    const horizontalLines = [];
    const verticalLines = [];

    // Create horizontal grid lines
    for (let y = 0; y <= height; y += cellSize) {
        horizontalLines.push(<line key={`h-${y}`} x1={0} y1={y} x2={width} y2={y} stroke={stroke} strokeWidth={strokeWidth} />);
    }

    // Create vertical grid lines
    for (let x = 0; x <= width; x += cellSize) {
        verticalLines.push(<line key={`v-${x}`} x1={x} y1={0} x2={x} y2={height} stroke={stroke} strokeWidth={strokeWidth} />);
    }

    return (
        <>
            {horizontalLines}
            {verticalLines}
        </>
    );
};

export default Grid;
