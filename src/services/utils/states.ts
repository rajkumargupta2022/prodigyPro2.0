export const handleNumbers = (max: number, value: string, setter: (val: string) => void) => {
  if (value.length <= max && /^\d*$/.test(value)) {
    setter(value);
  }
};