import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 transition-all ease-in-out duration-500",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all ease-in-out duration-500",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-all ease-in-out duration-500",
        primary:
          "rounded-3xl w-full bg-black text-white flex justify-start text-base px-4 py-8 font-medium uppercase",
        secondary:
          "rounded-3xl w-full border border-[hsl(0,0%,45%)] flex text-[13px] justify-start px-4 py-1 font-medium uppercase hover:bg-white/10",
        secondaryOutline:
          "rounded-3xl w-full bg-white text-black px-4 flex justify-start text-[13px] py-1 font-medium uppercase hover:bg-white/80",
        google:
          "flex w-full justify-between gap-x-2 text-base rounded-3xl border border-[hsl(0,0%,45%)] bg-white py-6 font-medium text-black",
        menuItem: "w-full cursor-pointer rounded-none transition-all duration-500 ease-in-out hover:bg-accent hover:bg-gray-900 hover:text-accent-foreground hover:text-primary",
        menuItemMobile: "w-full cursor-pointer rounded-none text-primary text-xl transition-all ease-in-out duration-500",
        ghost:
          "hover:bg-accent hover:text-accent-foreground transition-all ease-in-out duration-500",
        link: "text-primary underline-offset-4 hover:underline transition-all ease-in-out duration-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
