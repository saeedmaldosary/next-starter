import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

// Custom hook to detect RTL
const useRtl = (ref: React.RefObject<HTMLElement>) => {
  const [isRtl, setIsRtl] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (element) {
      const direction = getComputedStyle(element).direction;
      setIsRtl(direction === "rtl");

      // Optional: Watch for changes in direction
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "dir"
          ) {
            setIsRtl(getComputedStyle(element).direction === "rtl");
          }
        });
      });

      observer.observe(element, { attributes: true });
      return () => observer.disconnect();
    }
  }, [ref]); // Added ref to the dependency array

  return isRtl;
};

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => {
  const ref = React.useRef<HTMLElement>(null);
  return (
    <nav
      ref={ref}
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
};
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => {
  const ref = React.useRef<HTMLAnchorElement>(null);

  return (
    <a
      ref={ref}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size
        }),
        "cursor-default",
        className
      )}
      {...props}
    />
  );
};
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const isRtl = useRtl(ref);

  return (
    <PaginationLink
      ref={ref}
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1", isRtl ? "pr-2.5" : "pl-2.5", className)}
      {...props}
    >
      {isRtl ? (
        <>
          <span className="cursor-default">السابق</span>
          <ChevronRight className="h-4 w-4" />
        </>
      ) : (
        <>
          <ChevronLeft className="h-4 w-4" />
          <span className="cursor-default">Previous</span>
        </>
      )}
    </PaginationLink>
  );
};
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const isRtl = useRtl(ref);

  return (
    <PaginationLink
      ref={ref}
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1", isRtl ? "pl-2.5" : "pr-2.5", className)}
      {...props}
    >
      {isRtl ? (
        <>
          <ChevronLeft className="h-4 w-4" />
          <span className="cursor-default">التالي</span>
        </>
      ) : (
        <>
          <span className="cursor-default">Next</span>
          <ChevronRight className="h-4 w-4" />
        </>
      )}
    </PaginationLink>
  );
};
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
};
