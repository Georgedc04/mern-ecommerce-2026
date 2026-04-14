import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  showCount?: boolean
  maxLength?: number
  error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, showCount, maxLength, error, ...props }, ref) => {
    const [charCount, setCharCount] = React.useState(0)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length)
      if (props.onChange) props.onChange(e)
    }

    return (
      <div className="relative w-full" data-slot="textarea-wrapper">
        <textarea
          ref={ref}
          data-slot="textarea"
          maxLength={maxLength}
          onChange={handleChange}
          className={cn(
            "flex min-h-24 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-all",
            "placeholder:text-muted-foreground",
            "focus-visible:ring-3 focus-visible:ring-ring/20 focus-visible:border-ring outline-none",
            "disabled:cursor-not-allowed disabled:bg-muted/50 disabled:opacity-50",
            // Modern field-sizing for auto-height
            "field-sizing-content", 
            // Error states
            error || props["aria-invalid"] 
              ? "border-destructive ring-destructive/20 focus-visible:border-destructive focus-visible:ring-destructive/20" 
              : "border-input",
            "md:text-sm",
            className
          )}
          {...props}
        />
        
        {/* Pro Touch: Character Counter & Error Message */}
        <div className="mt-1.5 flex justify-between gap-2 px-1">
          {error ? (
            <p className="text-[11px] font-medium text-destructive animate-in fade-in slide-in-from-top-1">
              {error}
            </p>
          ) : (
            <div /> 
          )}
          
          {showCount && maxLength && (
            <p className={cn(
              "text-[10px] tabular-nums text-muted-foreground",
              charCount >= maxLength && "text-destructive font-bold"
            )}>
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }