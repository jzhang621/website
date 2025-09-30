import { StepRecorder } from './StepRecorder';

export interface AlgorithmResult {
  result: number;
  steps: ReturnType<StepRecorder['getSteps']>;
  variableSchema: ReturnType<StepRecorder['getVariableSchema']>;
}

export function subarraySum(nums: number[], k: number): AlgorithmResult {
  const variableSchema = [
    { name: 'i', order: 0 },
    { name: 'sum', order: 1 },
    { name: 'count', order: 2 },
    { name: 'target', order: 3 },
    { name: 'map', order: 4 },
  ];

  const recorder = new StepRecorder(variableSchema);

  // Record initial state before animation begins
  recorder.record(
    '',
    'Ready to begin',
    { i: undefined, sum: undefined, count: undefined, target: undefined, map: undefined }
  );

  // Initialize variables
  let sum = 0;
  let count = 0;
  const map: Record<number, number> = { 0: 1 };

  recorder.record(
    'initialize',
    'Initialize variables: sum=0, count=0, map={0:1}',
    { sum: 0, count, map: { ...map }, target: undefined }
  );

  // Iterate through array
  for (let i = 0; i < nums.length; i++) {
    const currentElement = nums[i];

    // Add current element to sum
    sum += currentElement;
    recorder.record(
      'add_curr',
      `Add current element ${currentElement} to sum`,
      { i, sum, count, map: { ...map }, target: undefined },
    );

    // Calculate target (sum - k)
    const target = sum - k;

    // Check if target exists in map
    const foundTarget = map[target] !== undefined;
    recorder.record(
      'found_target',
      `Check if target ${target} exists in map`,
      { i, sum, count, map: { ...map }, target }
    );

    // If found, increment count
    if (foundTarget) {
      count += map[target];
      recorder.record(
        'increment_count',
        `Increment count by ${map[target]} (found ${map[target]} subarray(s))`,
        { i, sum, count, map: { ...map }, target }
      );
    }

    // Update hashmap with current sum
    map[sum] = (map[sum] || 0) + 1;
    recorder.record(
      'update_hashmap',
      `Update hashmap: map[${sum}] = ${map[sum]}`,
      { i , sum, count, map: { ...map }, target: undefined }
    );
  }

  // Return result
  recorder.record(
    'return_count',
    `Return final count: ${count}`,
    { i: undefined, sum, count, map: { ...map }, target: undefined }
  );

  return {
    result: count,
    steps: recorder.getSteps(),
    variableSchema: recorder.getVariableSchema(),
  };
}
