// Using Record<string, unknown> instead of UnknownObject
import { RegisterOptions } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  message: string;
  category: string;
};

type ValidationRules = {
  name: RegisterOptions<FormData, "name">;
  email: RegisterOptions<FormData, "email">;
  category: RegisterOptions<FormData, "category">;
  message: RegisterOptions<FormData, "message">;
};

export const getValidationRules = (
  t: (key: string) => string
): ValidationRules => ({
  name: {
    required: t("name.required"),
    minLength: {
      value: 2,
      message: t("name.pattern")
    }
  },
  email: {
    required: {
      value: true,
      message: t("email.required")
    },
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      message: t("email.pattern")
    }
  },
  message: {
    required: {
      value: true,
      message: t("message.required")
    },
    pattern: {
      value: /^.{10,500}$/,
      message: t("message.pattern")
    }
  },
  category: {
    required: {
      value: true,
      message: t("category.required")
    }
  }
});
