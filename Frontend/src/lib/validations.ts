export const validationRules = {
  name: {
    required: true,
    pattern: /^[a-zA-Z\s]{2,50}$/, // Includes length validation in regex
    messages: {
      required: "Name is required",
      pattern:
        "Name must be 2-50 characters and contain only letters and spaces"
    }
  },
  email: {
    required: true,
    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    messages: {
      required: "Email is required",
      pattern: "Please enter a valid email address"
    }
  },
  message: {
    required: true,
    pattern: /^.{10,500}$/, // Includes length validation in regex
    messages: {
      required: "Message is required",
      pattern: "Message must be between 10 and 500 characters"
    }
  },
  phone: {
    pattern: /^\+?[1-9]\d{1,14}$/,
    messages: {
      pattern: "Please enter a valid phone number"
    }
  },
  password: {
    required: true,
    pattern:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    messages: {
      required: "Password is required",
      pattern:
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
    }
  },
  category: {
    required: true,
    messages: {
      required: "Please select a category"
    }
  }
} as const;
