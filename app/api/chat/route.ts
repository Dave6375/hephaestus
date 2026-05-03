import { auth } from "@clerk/nextjs/server";
import { streamText, tool, convertToModelMessages } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { searchExa } from "@/lib/exa";
import { loadChat, saveChat } from "@/lib/chat-store";

export const maxDuration = 30;

export async function POST(req: Request) {
    const { userId } = await auth();
    if (!userId) {
        return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { message, messages: messagesInBody, id, searchMode: bodySearchMode } = body;
    
    // Load existing messages to provide context
    const previousMessages = await loadChat(id, userId);
    
    // Determine the current message and all messages
    // If messagesInBody is provided (standard useChat), it contains the full history including the new message.
    // However, to be safe and consistent with how we save, we want to ensure we don't duplicate.
    
    let allMessages = [];
    if (messagesInBody && messagesInBody.length > 0) {
        allMessages = messagesInBody;
    } else if (message) {
        allMessages = [...previousMessages, message];
    } else {
        return new Response("No message provided", { status: 400 });
    }

    const currentMessage = allMessages[allMessages.length - 1];

    // Extract searchMode from metadata if not in body
    const searchMode = bodySearchMode ?? (currentMessage as any).searchMode ?? false;

    // Check for Google API key
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        console.error("[Chat API Error]: Missing Google API Key");
        return new Response(JSON.stringify({ 
            error: "The AI assistant is currently unavailable due to a missing Google API Key. Please add GOOGLE_GENERATIVE_AI_API_KEY to your .env.local file." 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Convert UIMessages to ModelMessages for streamText
    const modelMessages = await convertToModelMessages(allMessages);

    try {
        const result = streamText({
            model: google("gemini-1.5-flash"), // Use Gemini 1.5 Flash as it is standard
            messages: modelMessages,
            system: `You are Hephaestus, a helpful AI assistant. 
            ${searchMode ? "Web search is currently ENABLED. Use the 'webSearch' tool to find up-to-date information when needed." : "Web search is available via the 'webSearch' tool if you need current information."}
            Reason step by step before answering complex questions.`,
            tools: {
                webSearch: tool({
                    description: "Search the web for real-time information, news, and research.",
                    inputSchema: z.object({
                        query: z.string().describe("The search query"),
                    }),
                    execute: async ({ query }: { query: string }) => {
                        const searchResults = await searchExa({ query });
                        return { results: searchResults.results }; // Wrap in results object for normalizeResults in frontend
                    },
                }),
            },
            onFinish: async ({ text, toolCalls, toolResults }) => {
                // Save the conversation after it finishes
                try {
                    const assistantMessage = {
                        role: "assistant",
                        content: text,
                        id: `ai-${Date.now()}`, // Added ID for UIMessage compatibility
                        parts: [
                            { type: "text", text },
                            ...(toolCalls ? toolCalls.map(tc => ({ ...tc, type: "tool-call" })) : []),
                            ...(toolResults ? toolResults.map(tr => ({ ...tr, type: "tool-result" })) : [])
                        ]
                    };
                    
                    await saveChat({
                        chatId: id,
                        userId,
                        messages: [...allMessages, assistantMessage as any]
                    });
                } catch (saveError) {
                    console.error("[Chat API Persistence Error]:", saveError);
                    // We don't throw here to avoid failing the stream response if only saving fails
                }
            }
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error("[Chat API Error]:", error);
        return new Response(JSON.stringify({ error: (error as Error).message }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
