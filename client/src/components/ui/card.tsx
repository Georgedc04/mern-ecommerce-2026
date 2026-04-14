import * as React from "react"
import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  isClickable = false, // Added for hover effects
  ...props
}: React.ComponentProps<"article"> & { size?: "default" | "sm"; isClickable?: boolean }) {
  return (
    <article
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 transition-all duration-200",
        // Conditional styles for footer/image logic
        "has-data-[slot=card-footer]:pb-0 has-data-[slot=card-image]:pt-0",
        // Interactive state
        isClickable && "hover:ring-foreground/20 hover:shadow-lg cursor-pointer",
        // Sizes
        "data-[size=sm]:gap-3 data-[size=sm]:py-3",
        className
      )}
      {...props}
    />
  )
}

// Dedicated Image component for E-commerce consistency
function CardImage({ 
  className, 
  aspect = "square", 
  ...props 
}: React.ComponentProps<"div"> & { aspect?: "square" | "video" | "auto" }) {
  return (
    <div
      data-slot="card-image"
      className={cn(
        "relative w-full overflow-hidden bg-muted",
        aspect === "square" && "aspect-square",
        aspect === "video" && "aspect-video",
        className
      )}
    >
      <div className="absolute inset-0 transition-transform duration-500 group-hover/card:scale-105">
        {props.children}
      </div>
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min items-start gap-1 px-4 group-data-[size=sm]/card:px-3",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-tight font-semibold tracking-tight group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground line-clamp-2", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 group-data-[size=sm]/card:px-3 flex-1", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"footer">) {
  return (
    <footer
      data-slot="card-footer"
      className={cn(
        "flex items-center gap-2 border-t bg-muted/30 p-4 mt-auto group-data-[size=sm]/card:p-3",
        className
      )}
      {...props}
    />
  )
}

// Keep your CardAction as is, but consider it for badges/wishlist buttons
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 self-start justify-self-end", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardImage,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}