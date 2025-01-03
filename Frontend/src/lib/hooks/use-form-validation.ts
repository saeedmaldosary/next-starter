import { useState } from "react";
import { validationRules } from "@/lib/validations/form";

export interface ValidationError {
  field: string;
  message: string;
}

// Define a type for form field values
export type FieldValue = string | number | boolean;

// Define a type for form data
export type FormData = Record<string, FieldValue>;

export interface FormValidationConfig {
  rules: typeof validationRules;
  initialValues: FormData;
}

export const useFormValidation = ({
  rules,
  initialValues
}: FormValidationConfig) => {
  const [formData, setFormData] = useState(initialValues);
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

  const validateForm = (): boolean => {
    const newErrors: ValidationError[] = [];

    Object.entries(formData).forEach(([field, value]) => {
      const fieldErrors = validateField(field, String(value));
      fieldErrors.forEach((message) => {
        newErrors.push({ field, message });
      });
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleFieldChange = (
    fieldOrEvent: string | React.ChangeEvent<HTMLElement>,
    directValue?: FieldValue
  ) => {
    if (typeof fieldOrEvent === "string") {
      // Handle direct value (e.g., from Select)
      setFormData((prev) => ({ ...prev, [fieldOrEvent]: directValue }));
    } else {
      // Handle event from Input/Textarea
      const target = fieldOrEvent.target as
        | HTMLInputElement
        | HTMLTextAreaElement;
      setFormData((prev) => ({ ...prev, [target.name]: target.value }));
    }
  };

  const handleSubmit = async (
    onSubmit: (data: FormData) => Promise<void> | void,
    e?: React.FormEvent
  ) => {
    if (e) {
      e.preventDefault();
    }

    if (validateForm()) {
      try {
        await onSubmit(formData);
        reset();
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return errors.find((error) => error.field === fieldName)?.message;
  };

  const reset = () => {
    setFormData(initialValues);
    setErrors([]);
  };

  return {
    formData,
    errors,
    handleFieldChange,
    handleSubmit,
    getFieldError,
    reset,
    validateField,
    validateForm
  };
};
