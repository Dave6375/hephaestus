import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const ScrollButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      className={cn(
        "rounded-full bg-background transition-opacity duration-300",
        className
      )}
      {...props}
    >
      <ChevronDown className="h-4 w-4" />
    </Button>
  );
});
ScrollButton.displayName = "ScrollButton";

export { ScrollButton };
