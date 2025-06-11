export const getPercentageValue = (total: number, part: number): string => {
  if (part === 0) {
    return "0";
  }
  let result: number = (part / total) * 100;
  return result.toFixed(2);
};

export const getValueInThousand = (value: number): string => {
  if (value === 0) {
    return "0";
  }
  let result = value / 1000;
  return result.toFixed(3);
};
