import React from "react";

export const generateOptions = <T extends Record<string, any>>(
  array: T[],
  valueKey: keyof T,
  labelKey: keyof T
): React.ReactNode => {
  if (!Array.isArray(array)) return null;

  return array.map((item) => (
    <option
      key={String(item[valueKey])}
      value={String(item[valueKey])}
    >
      {String(item[labelKey])}
    </option>
  ));
};