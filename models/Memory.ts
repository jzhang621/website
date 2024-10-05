export interface MemoryCell {
    rowIdx: number;
    colIdx: number;
    fill: string;
    stroke: string;
    strokeWidth: number;
    opacity: number;
}

interface MemoryGridConfig {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    opacity?: number;
}

const defaultConfig: MemoryGridConfig = {
    fill: "white",
    stroke: "#F2F1F1",
    strokeWidth: 0.5,
    opacity: 1,
};

class MemoryGridModel {
    private rows: number;
    private cols: number;
    private grid: MemoryCell[];

    constructor(rows: number, cols: number, config: MemoryGridConfig = defaultConfig) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];

        this.init(config);
    }

    private init(config: MemoryGridConfig): void {
        for (let rowIdx = 0; rowIdx < this.rows; rowIdx++) {
            for (let colIdx = 0; colIdx < this.cols; colIdx++) {
                this.grid.push({
                    rowIdx,
                    colIdx,
                    fill: config.fill || defaultConfig.fill,
                    stroke: config.stroke || defaultConfig.stroke,
                    strokeWidth: config.strokeWidth || defaultConfig.strokeWidth,
                    opacity: config.opacity || defaultConfig.opacity,
                });
            }
        }
    }

    // TODO: maybe this should be a property of more primitive svg "shapes" e.g. a "rect"
    // rather than a higher-level component like the MemoryGrid
    public getAnimationProperties(): string[] {
        return ["fill", "stroke", "strokeWidth", "opacity"];
    }

    // Get the full grid state
    public getGrid(): MemoryCell[] {
        return this.grid;
    }

    // Update a specific cell in the grid
    public updateCell(rowIdx: number, colIdx: number, newConfig: Partial<MemoryCell>): void {
        const cellIndex = this.grid.findIndex((cell) => cell.rowIdx === rowIdx && cell.colIdx === colIdx);

        if (cellIndex !== -1) {
            this.grid[cellIndex] = { ...this.grid[cellIndex], ...newConfig };
        } else {
            throw new Error(`Cell at row ${rowIdx} and col ${colIdx} not found`);
        }
    }
}

export default MemoryGridModel;
