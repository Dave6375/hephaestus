import puter from "@heyputer/puter.js";
import { PUTER_CODE_PROMPT } from "./constants";
import type { GenerateCodeParams } from "../type";

/**
 * Generates code based on the user's prompt using Puter AI.
 * 
 * @param params - The prompt and optional context for code generation.
 * @returns A promise that resolves with the generated code or null if no request detected.
 */
export async function generateCode({ prompt, context }: GenerateCodeParams): Promise<string | null> {
    const lowerPrompt = prompt.toLowerCase();
    const keywords = [
        "code", "generate", "write", "function", "script", "program", "app", 
        "fix", "debug", "refactor", "how to", "create a", "implement", "snippet"
    ];

    const isCodeRequested = keywords.some(keyword => lowerPrompt.includes(keyword));

    if (!isCodeRequested) {
        console.log("[Puter AI] No code generation request detected. Skipping.");
        return null;
    }

    const fullPrompt = `
System Prompt: ${PUTER_CODE_PROMPT}

${context ? `Context: ${context}\n\n` : ""}
User Request: ${prompt}
    `.trim();

    try {
        console.log("[Puter AI] Starting code generation...");
        // Use puter.ai.chat for interactive-style code generation
        const response = await puter.ai.chat(fullPrompt);
        
        // Puter AI response for chat is usually a string or an object with a message
        // If it's a newer version, it might be { message: { content: "..." } }
        // But historically it returns a string directly for simple calls.
        const content = typeof response === "string" ? response : (response as any)?.message?.content || (response as any)?.text || "";
        
        console.log("[Puter AI] Code generation successful.");
        return content;
    } catch (error) {
        console.error("[Puter AI] Code generation failed:", error);
        throw error;
    }
}
