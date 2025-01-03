export const validationRules = {
  name: {
    required: true,
    pattern: /^[a-zA-Z\s]{2,50}$/,
    messages: {
      required: "name.required",
      pattern: "name.pattern"
    }
  },
  email: {
    required: true,
    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    messages: {
      required: "email.required",
      pattern: "email.pattern"
    }
  },
  message: {
    required: true,
    pattern: /^.{10,500}$/,
    messages: {
      required: "message.required",
      pattern: "message.pattern"
    }
  },
  phone: {
    pattern: /^\+?[1-9]\d{1,14}$/,
    messages: {
      pattern: "phone.pattern"
    }
  },
  password: {
    required: true,
    pattern:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    messages: {
      required: "password.required",
      pattern: "password.pattern"
    }
  },
  category: {
    required: true,
    messages: {
      required: "category.required"
    }
  }
} as const;
