export const isNotEmpty = (value: number): string | null => {
  if (value <= 0) {
    return "Value should not be 0.";
  } else if (isNaN(value)) {
    return "Field cannot be empty";
  }
  return null;
};

export const maxAmount = (max: number = 500000) => {
  return (value: number): string | null => {
    if (value > max) {
      return `Amount should be less than ${max}`;
    }
    return null;
  };
};

export const minAmount = (min: number = 500) => {
  return (value: number): string | null => {
    if (value < min) {
      return `Amount should be greater than ${min}`;
    }
    return null;
  };
};

export const minEduAge = (childAge: number, startCollege: number) => {
  if (childAge >= startCollege) {
    return `Current age should not be greater than or equal to college age.`;
  }
  return null;
};
