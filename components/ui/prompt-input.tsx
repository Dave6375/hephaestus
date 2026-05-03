"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface PromptInputContextType {
    value: string;
    onValueChange: (value: string) => void;
    onSubmit: (e?: React.FormEvent) => void;
    isLoading: boolean;
}

const PromptInputContext = React.createContext<PromptInputContextType | undefined>(undefined);

function usePromptInput() {
    const context = React.useContext(PromptInputContext);
    if (!context) {
        throw new Error("usePromptInput must be used within a PromptInput");
    }
    return context;
}

interface PromptInputProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
    onValueChange: (value: string) => void;
    onSubmit: (e?: React.FormEvent) => void;
    isLoading: boolean;
    children: React.ReactNode;
}

const PromptInput = React.forwardRef<HTMLDivElement, PromptInputProps>(
    ({ value, onValueChange, onSubmit, isLoading, className, children, ...props }, ref) => {
        return (
            <PromptInputContext.Provider value={{ value, onValueChange, onSubmit, isLoading }}>
                <div
                    ref={ref}
                    className={cn("flex flex-col gap-2", className)}
                    {...props}
                >
                    {children}
                </div>
            </PromptInputContext.Provider>
        );
    }
);
PromptInput.displayName = "PromptInput";

interface PromptInputTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const PromptInputTextarea = React.forwardRef<HTMLTextAreaElement, PromptInputTextareaProps>(
    ({ className, ...props }, ref) => {
        const { value, onValueChange, onSubmit, isLoading } = usePromptInput();
        const textareaRef = React.useRef<HTMLTextAreaElement>(null);

        // Auto-resize logic
        React.useEffect(() => {
            const textarea = textareaRef.current;
            if (textarea) {
                textarea.style.height = "auto";
                textarea.style.height = `${textarea.scrollHeight}px`;
            }
        }, [value]);

        const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                e.preventDefault();
                onSubmit();
            }
        };

        return (
            <textarea
                ref={(node) => {
                    // Combine refs
                    if (typeof ref === "function") ref(node);
                    else if (ref) ref.current = node;
                    (textareaRef as any).current = node;
                }}
                className={cn(
                    "flex min-h-[60px] w-full rounded-md border-0 bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none",
                    className
                )}
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                onKeyDown={handleKeyDown}
                {...props}
            />
        );
    }
);
PromptInputTextarea.displayName = "PromptInputTextarea";

interface PromptInputActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

const PromptInputActions = React.forwardRef<HTMLDivElement, PromptInputActionsProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("flex items-center gap-2", className)}
                {...props}
            />
        );
    }
);
PromptInputActions.displayName = "PromptInputActions";

interface PromptInputActionProps extends React.HTMLAttributes<HTMLDivElement> {
    tooltip?: string;
}

const PromptInputAction = React.forwardRef<HTMLDivElement, PromptInputActionProps>(
    ({ className, tooltip, children, ...props }, ref) => {
        if (tooltip) {
            return (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div ref={ref} className={cn("", className)} {...props}>
                            {children}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="top">{tooltip}</TooltipContent>
                </Tooltip>
            );
        }

        return (
            <div ref={ref} className={cn("", className)} {...props}>
                {children}
            </div>
        );
    }
);
PromptInputAction.displayName = "PromptInputAction";

export { PromptInput, PromptInputTextarea, PromptInputActions, PromptInputAction };
