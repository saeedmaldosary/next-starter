import React from "react";

interface FormFieldProps {
  children: React.ReactNode;
  name: string;
  getFieldError: (fieldName: string) => string | undefined;
  // Target element to apply error styles (useful for compound components like Select)
  errorStyleTarget?: string;
  // Custom error styles - defaults to red border
  errorClassName?: string;
  // Custom error message styles
  errorMessageClassName?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  children,
  name,
  getFieldError,
  errorStyleTarget,
  errorClassName = "border-red-500",
  errorMessageClassName = "text-sm text-red-500"
}) => {
  const error = getFieldError(name);

  const applyErrorStyles = (element: React.ReactElement) => {
    return React.cloneElement(element, {
      ...element.props,
      className: `${element.props.className || ""} ${
        error ? errorClassName : ""
      }`.trim()
    });
  };

  const processChildren = (children: React.ReactNode): React.ReactNode => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      // If this element matches the target, apply error styles
      if (errorStyleTarget && child.type["displayName"] === errorStyleTarget) {
        return applyErrorStyles(child);
      }

      // If no target specified, apply to the direct child
      if (!errorStyleTarget) {
        return applyErrorStyles(child);
      }

      // If this element has children, recursively process them
      if (child.props.children) {
        return React.cloneElement(child, {
          ...child.props,
          children: processChildren(child.props.children)
        });
      }

      return child;
    });
  };

  return (
    <div className="space-y-2">
      {processChildren(children)}
      {error && <p className={errorMessageClassName}>{error}</p>}
    </div>
  );
};
