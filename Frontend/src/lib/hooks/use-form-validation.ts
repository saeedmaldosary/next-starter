import { useState } from "react";
import { validationRules } from "@/lib/validations/form";

export interface ValidationError {
  field: string;
  message: string;
}

export const useFormValidation = (rules: typeof validationRules) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validateField = (field: string, value: string): string[] => {
    const fieldRules = rules[field];
    const fieldErrors: string[] = [];

    if (!fieldRules) return fieldErrors;

    if (fieldRules.required && !value) {
      fieldErrors.push(fieldRules.messages.required);
    }

    if (value && fieldRules.pattern && !fieldRules.pattern.test(value)) {
      fieldErrors.push(fieldRules.messages.pattern);
    }

    return fieldErrors;
  };

  const validateForm = (data: Record<string, string>): boolean => {
    const newErrors: ValidationError[] = [];

    Object.entries(data).forEach(([field, value]) => {
      const fieldErrors = validateField(field, value);
      fieldErrors.forEach((message) => {
        newErrors.push({ field, message });
      });
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return errors.find((error) => error.field === fieldName)?.message;
  };

  return {
    errors,
    validateField,
    validateForm,
    getFieldError,
    clearErrors: () => setErrors([])
  };
};
