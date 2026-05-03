"use client";

import { useChat } from "@ai-sdk/react";
import { type UIMessage, type UIDataTypes, type UIMessagePart, type UITools } from "ai";
import { useMemo, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChatInput } from "./chat-input";
import { ChatStream } from "./chat-stream";

// Extract text from message parts for title
function extractTextFromMessage(message: UIMessage): string {
	if (!message.parts || message.parts.length === 0) {
		return "";
	}

	return message.parts
		.filter((part) => part.type === "text")
		.map((part) => (part as { text: string }).text)
		.join(" ")
		.trim();
}

// Generate a title from messages (use first user message or first message)
function generateChatTitle(messages: UIMessage[]): string {
	if (messages.length === 0) {
		return "New Chat";
	}

	// Try to find first user message
	const firstUserMessage = messages.find((msg) => msg.role === "user");
	if (firstUserMessage) {
		const text = extractTextFromMessage(firstUserMessage);
		if (text) {
			// Use first 50 characters as title
			return text.length > 50 ? text.substring(0, 50) + "..." : text;
		}
	}

	// Fallback to first message
	const firstMessage = messages[0];
	const text = extractTextFromMessage(firstMessage);
	if (text) {
		return text.length > 50 ? text.substring(0, 50) + "..." : text;
	}

	return "New Chat";
}

export function ChatContent({
	id,
	initialMessages,
}: {
	id?: string;
	initialMessages?: UIMessage[];
}) {
	const [searchMode, setSearchMode] = useState(false);

	// useChat provides streaming state and messages
	const { messages, sendMessage, status, stop } = useChat({
		id,
		messages: initialMessages,
	});

	// Wrapper for sendMessage to match expected ChatInput onSubmit signature
	const handleSubmit = async (data: { parts: UIMessagePart<UIDataTypes, UITools>[] }) => {
		await sendMessage({
			role: "user",
			id: `user-${Date.now()}`,
			parts: data.parts,
		}, {
			body: { searchMode }
		});
	};

	// Derive loading state from SDK status
	const isLoading = status === "submitted" || status === "streaming";

	// Generate chat title from messages
	const chatTitle = useMemo(() => generateChatTitle(messages), [messages]);

	return (
		<main className="flex h-screen flex-col overflow-hidden">
			<header className="z-10 flex h-14.5 w-full shrink-0 items-center gap-2 border-b bg-background px-4">
				<SidebarTrigger className="-ml-1" />
				<div className="font-medium text-foreground">{chatTitle}</div>
			</header>

			<div className="relative flex-1 overflow-y-auto">
				<ChatStream messages={messages} />
			</div>

			<ChatInput
				isLoading={isLoading}
				stop={stop}
				onSubmit={handleSubmit}
				searchMode={searchMode}
				onSearchModeChange={setSearchMode}
				className="z-10 shrink-0 bg-background px-3 pb-3 md:px-5 md:pb-5"
			/>
		</main>
	);
}
