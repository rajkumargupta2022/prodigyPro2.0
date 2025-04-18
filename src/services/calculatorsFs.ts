export const amountHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  maxAmount: number,
  setter: (value: number) => void
): void => {
  let value = Number(e.target.value.trim());
  console.log(value);
  
  // setter(value);
  if (value <= 1000000000) {
    setter(value);
  }
  //  else if (value >= maxAmount) {
  //   setter(maxAmount);
  // }
};

export const percentageHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  maxAmount: number,
  setter: (value: number) => void
): void => {
  console.log("===",e.target.value);
  // return

      let value = parseFloat(e.target.value);

      // if (isNaN(value)) value = 0;
      setter(value);
      if (value >= maxAmount) {
        setter(maxAmount);
      } 
  
 
};
export const pmtvalue = async (
  ir: number,
  np: number,
  pv: number,
  fv: number = 0,
  type: number = 0
): Promise<number> => {
  if (ir === 0) return Math.round((-(pv + fv) / np));

  const pvif = Math.pow(1 + ir, np);
  let pmt = -ir * (pv * pvif + fv) / (pvif - 1);

  if (type === 1) {
    pmt /= (1 + ir);
  }

  return Math.round(pmt);
};

const conv_number = async (expr: number, decplaces: number): Promise<string> => {
  const value = Math.round(expr * Math.pow(10, decplaces));
  let str = value.toString();

  while (str.length <= decplaces) {
    str = "0" + str;
  }

  const decpoint = str.length - decplaces;
  return str.substring(0, decpoint) + "." + str.substring(decpoint);
};

const trunc = async (x: number, posiciones: number = 0): Promise<number> => {
  const s = x.toString();
  const decimalIndex = s.indexOf('.') + 1;

  if (decimalIndex === 0) {
    return x;
  }

  const numStr = s.substring(0, decimalIndex + posiciones);
  return Number(numStr);
};

export const presentValue = async (
  rate: number,
  nper: number,
  pmt: number,
  fv: number
): Promise<number> => {
  let pv_value: number;

  if (rate === 0) {
    pv_value = -(fv + (pmt * nper));
  } else {
    const x = Math.pow(1 + rate, -nper);
    const y = Math.pow(1 + rate, nper);
    pv_value = -(x * (fv * rate - pmt + y * pmt)) / rate;
  }

  const formattedValue = await conv_number(pv_value, 2);
  return await trunc(Number(formattedValue) * -1, 2);
};

export const FV = async (PV: number, i: number, n: number): Promise<number> => {
  const factor = 1 + i / 100;
  return PV * Math.pow(factor, n);
};

export const RetirementPresentValue = async (
  rate: number,
  num: number,
  amount: number,
  remain: number,
  type: number
): Promise<number> => {
  const newRate = 1 + rate;
  const powValue = Math.pow(newRate, -num);
  const oneMinusPowVal = 1 - powValue;

  const divideOneMinusPowVal = oneMinusPowVal / rate;
  const elseDivideOneMinusPowVal = (oneMinusPowVal * newRate) / rate;

  const factor = (rate === 0)
    ? num
    : (type === 0 ? divideOneMinusPowVal : elseDivideOneMinusPowVal);

  const pv_value = remain === 0
    ? amount * factor
    : amount * factor - remain * powValue;

  const formattedValue = await conv_number(pv_value, 2);
  return await trunc(Number(formattedValue) * -1, 2);
};
