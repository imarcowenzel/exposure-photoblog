import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva(
  "flex w-full flex-col justify-center gap-10 px-6 py-16 md:px-16 2xl:px-24",
  {
    variants: {
      variant: {
        default:
          "min-h-[calc(100dvh-1404px)] md:min-h-[calc(100dvh-1228px]) xl:min-h-[calc(100dvh-358px)] items-start",
        submit: "md:items-center md:px-12 2xl:min-h-dvh",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, variant, ...props }, ref) => {
    return (
      <section
        className={cn(containerVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </section>
    );
  },
);

Container.displayName = "Container";

export { Container };
