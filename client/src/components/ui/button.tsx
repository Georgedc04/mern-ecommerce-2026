import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent text-sm font-semibold tracking-tight whitespace-nowrap transition-all duration-300 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)] dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200",
        outline: "border-zinc-200 bg-transparent hover:bg-zinc-50 hover:border-zinc-300 text-zinc-900 shadow-sm dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-50",
        secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700",
        ghost: "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
        cta: "relative overflow-hidden bg-gradient-to-b from-orange-500 to-orange-600 text-white shadow-[0_10px_20px_-10px_rgba(249,115,22,0.5)] hover:from-orange-400 hover:to-orange-500 hover:shadow-[0_15px_25px_-10px_rgba(249,115,22,0.6)]",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
        link: "text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50",
      },
      size: {
        default: "h-11 px-6 gap-2",
        xs: "h-8 px-3 text-xs gap-1",
        sm: "h-9 px-4 text-sm gap-1.5",
        lg: "h-14 px-10 text-base gap-3 rounded-2xl",
        icon: "size-11 rounded-full",
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
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, children, ...props }, ref) => {
    // 1. If asChild is true, we use Slot.
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {/* When using asChild, you MUST pass a single element like <Link>. 
            We cannot inject the shimmer here without breaking the 'single child' rule.
          */}
          {children}
        </Slot>
      )
    }

    // 2. Standard button rendering (safe for multiple children)
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {/* Shimmer Effect for CTA (only on real buttons) */}
        {variant === "cta" && !isLoading && (
          <span className="absolute inset-0 block w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none" />
        )}

        {isLoading ? (
          <>
            <Loader2 className="mr-2 animate-spin size-4" />
            <span className="opacity-70">Processing...</span>
          </>
        ) : (
          <span className="relative z-10 flex items-center gap-2">
            {children}
          </span>
        )}
      </button>
    )
  }
)
Button.displayName = "Button"

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }