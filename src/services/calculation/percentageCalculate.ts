export const getPercentageValue = (total: number|string, part: number|string): string => {
  let total2 = Number(total)
  let part2= Number(part)
  if (part === 0) {
    return "0";
  }
  let result: number = (part2 / total2) * 100;
  return result.toFixed(2);
};

export const getValueInThousand = (value: number): string => {
  if (value === 0) {
    return "0";
  }
  let result = value / 1000;
  return result.toFixed(3);
};

export const percentageDetailFolio = (purchase: any, gain: any): any => {
 const costPrice = Number(purchase);
const sellingPrice = Number(gain);

const profit = sellingPrice - costPrice;
const profitPercentage = (profit / costPrice) * 100;
return profitPercentage
};
