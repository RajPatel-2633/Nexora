import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexora-brand-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-br from-[#6366F1] via-[#4F46E5] to-[#4338CA] text-white shadow-[0_4px_14px_0_rgba(99,102,241,0.35)] hover:shadow-[0_8px_24px_0_rgba(99,102,241,0.45)] hover:-translate-y-px active:translate-y-0",
        secondaryDark:
          "border border-white/20 bg-transparent text-white hover:border-white/30 hover:bg-white/[0.06]",
        ghost:
          "text-white/80 hover:bg-white/[0.04] hover:text-white",
        glass:
          "border border-white/10 bg-white/[0.06] text-white backdrop-blur-md hover:border-white/20 hover:bg-white/10",
      },
      size: {
        sm: "h-8 px-3.5 text-xs",
        md: "h-10 px-5",
        lg: "h-12 px-7 text-[0.9375rem]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
