export const amountHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  maxAmount: number,
  setter: (value: number) => void
): void => {
  let value = Number(e.target.value.trim());
  if (value <= maxAmount) {
    setter(value);
  } else if (value >= maxAmount) {
    setter(maxAmount);
  }
};

export const percentageHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  maxAmount: number,
  setter: (value: number) => void
): void => {
  let value = parseFloat(e.target.value);

  if (isNaN(value)) value = 0;
  if (value <= maxAmount) {
    setter(value);
  } else {
    setter(maxAmount);
  }
};
