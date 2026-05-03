import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "./tooltip";

const Source = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, href, children, ...props }, ref) => (
  <TooltipProvider delayDuration={100}>
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-1.5 rounded-full border bg-muted px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            className
          )}
          {...props}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === SourceTrigger) {
              return child;
            }
            return null;
          })}
        </a>
      </TooltipTrigger>
      <TooltipContent className="max-w-[300px] p-0" side="top" align="start">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === SourceContent) {
            return child;
          }
          return null;
        })}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
));
Source.displayName = "Source";

const SourceTrigger = ({
  label,
  showFavicon,
  className,
}: {
  label: string;
  showFavicon?: boolean;
  className?: string;
}) => (
  <div className={cn("flex items-center gap-1.5", className)}>
    {showFavicon && (
      <img
        src={`https://www.google.com/s2/favicons?domain=${label}&sz=32`}
        alt=""
        className="h-3.5 w-3.5 shrink-0"
      />
    )}
    <span className="truncate max-w-[120px]">{label}</span>
  </div>
);
SourceTrigger.displayName = "SourceTrigger";

const SourceContent = ({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) => (
  <div className={cn("p-3 space-y-1.5", className)}>
    <h4 className="font-semibold leading-none tracking-tight">{title}</h4>
    <p className="text-xs text-muted-foreground line-clamp-3">{description}</p>
  </div>
);
SourceContent.displayName = "SourceContent";

export { Source, SourceTrigger, SourceContent };
