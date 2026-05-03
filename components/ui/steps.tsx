"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";

const Steps = ({
  children,
  defaultOpen = false,
  className,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn("w-full", className)}
    >
      {children}
    </Collapsible>
  );
};

const StepsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <CollapsibleTrigger
    ref={ref}
    className={cn(
      "flex w-full items-center justify-between gap-2 rounded-lg border bg-muted/50 px-4 py-2 text-sm font-medium transition-colors hover:bg-muted",
      className
    )}
    {...props}
  >
    <div className="flex items-center gap-2">{children}</div>
    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 [[data-state=open]_&]:rotate-180" />
  </CollapsibleTrigger>
));
StepsTrigger.displayName = "StepsTrigger";

const StepsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CollapsibleContent
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
      className
    )}
  >
    <div className="p-4 pt-2">{props.children}</div>
  </CollapsibleContent>
));
StepsContent.displayName = "StepsContent";

const StepsItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-start gap-3 py-1.5", className)}
    {...props}
  />
));
StepsItem.displayName = "StepsItem";

export { Steps, StepsTrigger, StepsContent, StepsItem };
