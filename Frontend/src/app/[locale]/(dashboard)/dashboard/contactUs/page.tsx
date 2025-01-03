"use client";

import { useState } from "react";
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
import { useTranslations } from "next-intl";
import { validationRules } from "@/lib/validations";
import { useFormValidation } from "@/lib/hooks/use-form-validation";

type FormData = {
  name: string;
  email: string;
  message: string;
  category: string;
};

const categoryOptions = [
  { value: "general", label: "General Inquiry" },
  { value: "support", label: "Technical Support" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" }
];

export default function Contact() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    category: ""
  });

  const { validateForm, getFieldError } = useFormValidation(validationRules);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm(formData)) {
      try {
        // Here you would typically send the data to your API
        console.log("Form submitted successfully:", formData);

        // Clear form after successful submission
        setFormData({ name: "", email: "", message: "", category: "" });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onValueChange={handleSelectChange}
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
                        {option.label}
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
                  onChange={handleChange}
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
