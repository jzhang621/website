export interface CodeTemplate {
  language: string;
  code: string;
  lineMap: Record<string, number[]>;
}

export const subarraySumCode: CodeTemplate = {
  language: 'python',
  code: `def subarraySum(nums, k):
    map = {0: 1}
    sum = 0
    count = 0
    for curr in nums:
        sum += curr
        target = sum - k
        if target in map:
            count += map[target]
        map[sum] = map.get(sum, 0) + 1
    return count`,
  lineMap: {
    'initialize': [2, 3, 4],
    'add_curr': [6],
    'found_target': [7, 8],
    'increment_count': [9],
    'update_hashmap': [10],
    'return_count': [11],
  },
};
