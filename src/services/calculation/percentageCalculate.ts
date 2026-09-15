export const getPercentageValue = (
  total: number | string,
  part: number | string
): string => {
  let total2 = Number(total);
  let part2 = Number(part);
  if (part === 0) {
    return "0";
  }
  let result: number = (part2 / total2) * 100;
  return result.toFixed(2);
};

export const getValueInSort = (value: number): string => {
  if (value === 0) {
    return "0";
  }
  if(value<1000){
    return value.toString()
  }
  if (value < 100000 ) {
    let result = value / 1000;
    return result.toFixed(2)+"K";
  }else if(value < 10000000){
    let result = value / 100000;
    return result.toFixed(2)+"L";
  }
  else if(value > 100000){
    let result = value / 10000000;
    return result.toFixed(2)+"Cr";
  }else{
      
    return "N/A";
  }
};

export const percentageDetailFolio = (purchase: any, gain: any): any => {
  const costPrice = Number(purchase);
  const sellingPrice = Number(gain);

  const profit = sellingPrice - costPrice;
  const profitPercentage = (profit / costPrice) * 100;
  return profitPercentage;
};

export const calculateReturnWidths = (fundReturns:number|any | null | undefined, categoryReturns:number|any | null | undefined) => {
  const fundRet = fundReturns ?? Number.NEGATIVE_INFINITY;
  const categoryRet = categoryReturns ?? Number.NEGATIVE_INFINITY;

  let maxRet = Math.max(fundRet, categoryRet);

  if (maxRet === Number.NEGATIVE_INFINITY || maxRet === 0) {
    maxRet = 1;
  }

  const fundWidth = Math.min(((fundReturns ?? 0) / maxRet) * 100, 100);
  const categoryWidth = Math.min(((categoryReturns ?? 0) / maxRet) * 100, 100);

  const isFundMax = (fundReturns ?? 0) === maxRet;

  return {
    fundWidth,
    categoryWidth,
    isFundMax,
    maxRet,
  };
};
