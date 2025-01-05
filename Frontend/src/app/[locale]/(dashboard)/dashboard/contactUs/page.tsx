"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { validationRules } from "@/lib/validations";
import { FormField } from "@/components/FormField";

interface CategoryOption {
  value: string;
  label: string;
}

// Define strict types for form data
interface FormData {
  name: string;
  email: string;
  message: string;
  category: string;
}

const categoryOptions: CategoryOption[] = [
  { value: "general", label: "General Inquiry" },
  { value: "support", label: "Technical Support" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" }
];

const initialValues: FormData = {
  name: "",
  email: "",
  message: "",
  category: ""
};

interface UseFormValidation {
  formData: FormData;
  handleFieldChange: (name: keyof FormData, value: string) => void;
  handleSubmit: (
    callback: (data: FormData) => Promise<void>,
    e: React.FormEvent
  ) => Promise<void>;
  getFieldError: (fieldName: keyof FormData) => string | undefined;
}

export default function Contact() {
  const t = useTranslations("contact");

  const { formData, handleFieldChange, handleSubmit, getFieldError } =
    useFormValidation({
      rules: validationRules,
      initialValues
    }) as UseFormValidation;

  const onSubmit = async (data: FormData) => {
    try {
      console.log("Form submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    handleFieldChange(e.target.name as keyof FormData, e.target.value);
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("formTitle")}</CardTitle>
            <CardDescription>{t("formDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => handleSubmit(onSubmit, e)}
              className="space-y-4"
            >
              <FormField name="name" getFieldError={getFieldError}>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t("namePlaceholder")}
                />
              </FormField>

              <FormField name="email" getFieldError={getFieldError}>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t("emailPlaceholder")}
                />
              </FormField>

              <FormField
                name="category"
                getFieldError={getFieldError}
                errorStyleTarget="SelectTrigger"
              >
                <Select
                  name="category"
                  onValueChange={(value) =>
                    handleFieldChange("category", value)
                  }
                  value={formData.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("categoryPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {t(`categories.${option.value}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField name="message" getFieldError={getFieldError}>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t("messagePlaceholder")}
                  rows={4}
                />
              </FormField>

              <Button type="submit" className="w-full">
                {t("submitButton")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
