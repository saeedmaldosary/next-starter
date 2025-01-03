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
import { useFormValidation, FormData } from "@/lib/hooks/useFormValidation";

interface CategoryOption {
  value: string;
  label: string;
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

export default function Contact() {
  const t = useTranslations("contact");

  const { formData, handleFieldChange, handleSubmit, getFieldError } =
    useFormValidation({
      rules: validationRules,
      initialValues
    });

  const onSubmit = async (data: FormData) => {
    try {
      // Here you would typically send the data to your API
      console.log("Form submitted successfully:", data);
      // You could also show a success message to the user
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., show error message to user)
    }
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
              <div className="space-y-2">
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleFieldChange}
                  placeholder={t("namePlaceholder")}
                  className={getFieldError("name") ? "border-red-500" : ""}
                />
                {getFieldError("name") && (
                  <p className="text-sm text-red-500">
                    {getFieldError("name")}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFieldChange}
                  placeholder={t("emailPlaceholder")}
                  className={getFieldError("email") ? "border-red-500" : ""}
                />
                {getFieldError("email") && (
                  <p className="text-sm text-red-500">
                    {getFieldError("email")}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Select
                  name="category"
                  onValueChange={(value) =>
                    handleFieldChange("category", value)
                  }
                  value={formData.category}
                >
                  <SelectTrigger
                    className={
                      getFieldError("category") ? "border-red-500" : ""
                    }
                  >
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
                {getFieldError("category") && (
                  <p className="text-sm text-red-500">
                    {getFieldError("category")}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFieldChange}
                  placeholder={t("messagePlaceholder")}
                  className={getFieldError("message") ? "border-red-500" : ""}
                  rows={4}
                />
                {getFieldError("message") && (
                  <p className="text-sm text-red-500">
                    {getFieldError("message")}
                  </p>
                )}
              </div>

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
