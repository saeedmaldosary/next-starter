import { UnknownObject } from "next-intl"; // for TypeScript type safety

type TranslationFunction = (key: string, args?: UnknownObject) => string;

export const getValidationRules = (t: TranslationFunction) =>
  ({
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
  } as const);
