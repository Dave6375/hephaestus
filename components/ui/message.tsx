import * as React from "react";
import { cn } from "@/lib/utils";
import { Markdown } from "./markdown";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "./tooltip";

const Message = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex w-full flex-col", className)} {...props} />
));
Message.displayName = "Message";

const MessageContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { markdown?: boolean }
>(({ className, children, markdown, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1", className)} {...props}>
    {markdown && typeof children === "string" ? (
      <Markdown>{children}</Markdown>
    ) : (
      children
    )}
  </div>
));
MessageContent.displayName = "MessageContent";

const MessageActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-1", className)}
    {...props}
  />
));
MessageActions.displayName = "MessageActions";

const MessageAction = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    tooltip?: string;
    delayDuration?: number;
  }
>(({ className, children, tooltip, delayDuration = 0, ...props }, ref) => {
  const content = (
    <div className={cn("flex items-center justify-center", className)}>
      {children}
    </div>
  );

  if (!tooltip) return content;

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});
MessageAction.displayName = "MessageAction";

export { Message, MessageContent, MessageActions, MessageAction };
