export interface CategoryOption {
  value: string;
  label: string;
}

export type FormData = {
  name: string;
  email: string;
  message: string;
  category: string;
};

export const categoryOptions: CategoryOption[] = [
  { value: "general", label: "General Inquiry" },
  { value: "support", label: "Technical Support" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" }
];
