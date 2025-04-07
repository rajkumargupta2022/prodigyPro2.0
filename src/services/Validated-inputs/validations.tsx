export const isNotEmpty = (value: string | number): string | null => {
  if (value == "0") return "Field cannot be empty";
  return null;
};
