import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Plus, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { productService } from "@/services/products";
import { Product, ProductCreate, ProductStatus } from "@/types/products";
import { toast } from "@/hooks/use-toast";
import { useValidationRules } from "@/lib/validations";

type FormData = Omit<ProductCreate, "status"> & {
  status: string;
};

interface ProductDialogProps {
  mode: "create" | "edit";
  product?: Product;
  onSuccess: () => void;
  trigger?: React.ReactNode;
}

export default function ProductDialog({
  mode,
  product,
  onSuccess,
  trigger
}: ProductDialogProps) {
  const t = useTranslations("products");
  const validationRules = useValidationRules();

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const unavailable = ProductStatus.UNAVAILABLE;
  const available = ProductStatus.AVAILABLE;

  const form = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      status: unavailable.toString()
    }
  });

  useEffect(() => {
    if (mode === "edit" && product) {
      form.reset({
        title: product.title,
        description: product.description,
        price: product.price,
        status: product.status.toString()
      });
    }
  }, [product, mode, form]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const submissionData = {
        ...data,
        status: Number(data.status) as ProductStatus,
        price: Number(data.price)
      };

      if (mode === "create") {
        await productService.createProduct(submissionData);
        toast({
          title: t("createSuccess.title"),
          description: t("createSuccess.description")
        });
      } else if (mode === "edit" && product) {
        await productService.updateProduct(product.id, submissionData);
        toast({
          title: t("editSuccess.title"),
          description: t("editSuccess.description")
        });
      }
      form.reset();
      setIsOpen(false);
      onSuccess();
    } catch {
      toast({
        title: t("error"),
        description: t(mode === "create" ? "createError" : "editError"),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultTrigger =
    mode === "create" ? (
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        {t("addProduct")}
      </Button>
    ) : (
      <Button variant="outline" size="sm">
        <Pencil className="mr-2 h-4 w-4" />
        {t("editProduct")}
      </Button>
    );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {t(mode === "create" ? "createDialog.title" : "editDialog.title")}
          </DialogTitle>
          <DialogDescription>
            {t(
              mode === "create"
                ? "createDialog.description"
                : "editDialog.description"
            )}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              rules={validationRules.name}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t("titlePlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              rules={validationRules.message}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder={t("descriptionPlaceholder")}
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              rules={validationRules.price}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder={t("pricePlaceholder")}
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              rules={validationRules.category}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("statusPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={unavailable.toString()}>
                          {t(`status.${unavailable.toString()}`)}
                        </SelectItem>
                        <SelectItem value={available.toString()}>
                          {t(`status.${available.toString()}`)}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? t(mode === "create" ? "creating" : "updating")
                  : t(mode === "create" ? "create" : "update")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
