export const isNotEmpty = (value: number): string | null => {
  if (value <= 0) {
    return "Enter valid input";
  } else if (isNaN(value)) {
    return "Field cannot be empty";
  }
  return null;
};

export const maxValue = (value: number): string | null => {
  if (value > 100000000) {
    return "Value Should be less then 100000000";
  }
  return null;
};

export const minAmount = (value: number): string | null => {
  if (value < 500) {
    return "Amount should be greater then 1000";
  }
  return null;
};
