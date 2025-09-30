export interface StepState {
  i?: number;
  sum?: number;
  count?: number;
  map?: Record<number, number>;
  currentElement?: number;
  target?: number;
  [key: string]: any; // Allow additional properties
}

export interface Step {
  node: string;
  iteration: number;
  message: string;
  state: StepState;
  codeHighlight?: {
    lines: number[];
  };
}

export interface VariableSchema {
  name: string;
  order: number;
}

export class StepRecorder {
  private steps: Step[] = [];
  private variableSchema: VariableSchema[];

  constructor(variableSchema: VariableSchema[]) {
    this.variableSchema = variableSchema;
  }

  record(
    node: string,
    message: string,
    state: StepState,
    codeLines?: number[]
  ): void {
    // Deep clone the state to ensure immutability
    const clonedState = this.cloneState(state);

    this.steps.push({
      node,
      iteration: state.i ?? 0,
      message,
      state: clonedState,
      codeHighlight: codeLines ? { lines: codeLines } : undefined,
    });
  }

  private cloneState(state: StepState): StepState {
    // Deep clone using JSON parse/stringify
    // This works well for plain objects, arrays, and primitives
    return JSON.parse(JSON.stringify(state));
  }

  getSteps(): Step[] {
    return this.steps;
  }

  getVariableSchema(): VariableSchema[] {
    return this.variableSchema;
  }

  reset(): void {
    this.steps = [];
  }
}
