import React, { useState, useImperativeHandle, forwardRef } from "react";

type ValidationResult = string | null;
type ValidationFunction = (value: string | number) => ValidationResult;

interface ValidatedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  validate?: ValidationFunction | ValidationFunction[];
  onValidation?: (isValid: boolean) => void;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputRef {
  validate: (currentValue: string | number) => boolean;
}

const ValidatedInput = forwardRef<InputRef, ValidatedInputProps>(
  ({ validate, onValidation, value, onChange, onBlur, ...props }, ref) => {
    const [error, setError] = useState<ValidationResult>(null);

    const validateInput = (currentValue: string | number): boolean => {
      if (!validate) return true;

      const validators = Array.isArray(validate) ? validate : [validate];
      for (const validator of validators) {
        const result = validator(currentValue);
        if (result) {
          setError(result);
          onValidation?.(false);
          return false;
        }
      }

      setError(null);
      onValidation?.(true);
      return true;
    };

    useImperativeHandle(ref, () => ({
      validate: validateInput,
    }));

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   setValue(e.target.value);
    //   if (touched) validateInput();
    // };

    // const handleBlur = () => {
    //   setTouched(true);
    //   validateInput();
    // };

    return (
      <div>
        <input
          {...props}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          data-invalid={!!error}
        />
        {error && (
          <div className="error-message" style={{ color: "#cc0000" }}>
            {error}
          </div>
        )}
      </div>
    );
  }
);

export default ValidatedInput;
