export const getValidationRules = (t: (key: string) => string) => ({
  title: {
    required: t("name.required"),
    minLength: {
      value: 2,
      message: t("name.pattern")
    }
  },
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
  price: {
    required: { value: true, message: t("price.required") },
    min: { value: 0, message: t("price.min") },
    pattern: {
      value: /^\d+(\.\d{1,2})?$/,
      message: t("price.pattern")
    }
  },
  category: {
    required: {
      value: true,
      message: t("category.required")
    }
  }
});
