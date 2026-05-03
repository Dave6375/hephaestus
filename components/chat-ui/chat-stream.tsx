import { type UIMessage } from "ai";
import {
	Check,
	Copy,
	Paperclip,
	Pencil,
	ThumbsDown,
	ThumbsUp,
	Trash,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	ChatContainerContent,
	ChatContainerRoot,
} from "@/components/ui/chat-container";
import {
	Message,
	MessageAction,
	MessageActions,
	MessageContent,
} from "@/components/ui/message";
import { ScrollButton } from "@/components/ui/scroll-button";
import { Source, SourceContent, SourceTrigger } from "@/components/ui/source";
import {
	Steps,
	StepsContent,
	StepsItem,
	StepsTrigger,
} from "@/components/ui/steps";
import { cn } from "@/lib/utils";

interface ChatStreamProps {
	messages: UIMessage[];
}

type MessagePart = NonNullable<UIMessage["parts"]>[number];

type WebSearchToolCall = MessagePart & {
	type: string;
	toolCallId?: string;
	toolName?: string;
	args?: { query?: string };
	input?: { query?: string };
};

type WebSearchToolResult = MessagePart & {
	type: string;
	toolCallId?: string;
	toolName?: string;
	result?: unknown;
	output?: unknown;
};

type WebSearchResultItem = {
	url?: string;
	link?: string;
	title?: string;
	name?: string;
	content?: string;
	text?: string;
	snippet?: string;
	description?: string;
};

function CopyAction({
	content,
	className,
}: {
	content: string;
	className?: string;
}) {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(content);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy text: ", err);
		}
	};

	return (
		<MessageAction tooltip={isCopied ? "Copied" : "Copy"} delayDuration={100}>
			<Button
				variant="ghost"
				size="icon"
				className={cn("rounded-full", className)}
				onClick={handleCopy}
			>
				{isCopied ? (
					<Check className="h-4 w-4" />
				) : (
					<Copy className="h-4 w-4" />
				)}
			</Button>
		</MessageAction>
	);
}

// Helper function to extract web search tool calls and results
function extractWebSearchTools(message: UIMessage) {
	if (!message.parts) {
		return { toolCalls: [], toolResults: [] };
	}

	const parts = message.parts as MessagePart[];
	// Check for duplicate tool-webSearch parts
	const toolWebSearchParts = parts.filter(
		(p) => (p as { type?: string }).type === "tool-webSearch",
	);
	const toolCallIdsInParts = toolWebSearchParts
		.map((p) => (p as { toolCallId?: string }).toolCallId)
		.filter(Boolean);
	const duplicateIds = toolCallIdsInParts.filter(
		(id, index) => toolCallIdsInParts.indexOf(id) !== index,
	);

	const toolCalls = parts.filter((part): part is WebSearchToolCall => {
		const partType = (part as { type?: string }).type;
		const toolName = (part as { toolName?: string }).toolName;
		
		// Match either "tool-webSearch" or "tool-call" with toolName "webSearch"
		if (partType === "tool-webSearch") return true;
		if (partType === "tool-call" && toolName === "webSearch") return true;
		
		return false;
	});

	// Deduplicate tool calls by toolCallId (in case same tool call appears multiple times during streaming)
	const toolCallMap = new Map<string, WebSearchToolCall>();
	toolCalls.forEach((tc) => {
		if (tc.toolCallId) {
			toolCallMap.set(tc.toolCallId, tc);
		}
	});
	const uniqueToolCalls = Array.from(toolCallMap.values());

	const toolCallIds = new Set<string>(
		uniqueToolCalls
			.map((tc) => tc.toolCallId)
			.filter((id): id is string => Boolean(id)),
	);

	const toolResults = parts.filter((part): part is WebSearchToolResult => {
		const partType = (part as { type?: string }).type;
		const toolName = (part as { toolName?: string }).toolName;
		const { toolCallId } = part as { toolCallId?: string };

		const matches =
			(partType === "tool-webSearch" || (partType === "tool-result" && toolName === "webSearch")) &&
			typeof toolCallId === "string" &&
			toolCallIds.has(toolCallId);
		return matches;
	});

	return { toolCalls: uniqueToolCalls, toolResults };
}

// Separate component for tool call UI to prevent hydration mismatches
function ToolCallUI({
	searchQuery,
	searchResults,
	isStreaming,
}: {
	searchQuery: string;
	searchResults: any[];
	isStreaming: boolean;
}) {
	return (
		<div className="space-y-4" suppressHydrationWarning>
			<Steps defaultOpen={false}>
				<StepsTrigger>Web search: {searchQuery}</StepsTrigger>
				<StepsContent>
					<div className="space-y-2">
						<StepsItem>Searching across curated sources...</StepsItem>
						{searchResults.length > 0 && (
							<>
								<StepsItem>Top matches</StepsItem>
								<div className="flex flex-wrap gap-1.5">
									{searchResults.map((result, resultIndex) => {
										// EXA specific field mapping
										const url = result.url || result.link || "";
										const title = result.title || result.name || url;
										const content =
											result.text ||
											result.highlights?.[0] ||
											result.content ||
											result.snippet ||
											result.description ||
											"";

										if (!url) return null;

										return (
											<Source key={resultIndex} href={url}>
												<SourceTrigger
													label={url.replace(/^https?:\/\//, "").split("/")[0]}
													showFavicon
												/>
												<SourceContent
													title={title}
													description={
														content.substring(0, 150) ||
														"No description available"
													}
												/>
											</Source>
										);
									})}
								</div>
								{isStreaming && (
									<StepsItem>
										Extracting key sections and summarizing…
									</StepsItem>
								)}
							</>
						)}
					</div>
				</StepsContent>
			</Steps>
		</div>
	);
}

function normalizeResults(resultData: unknown): any[] {
	if (Array.isArray(resultData)) return resultData as any[];

	if (resultData && typeof resultData === "object") {
		const asObject = resultData as { results?: unknown; content?: unknown };

		if (Array.isArray(asObject.results)) {
			return asObject.results as any[];
		}

		if (Array.isArray(asObject.content)) {
			return asObject.content as any[];
		}
	}

	return [];
}

export function ChatStream({ messages }: ChatStreamProps) {
	return (
		<ChatContainerRoot className="h-full">
			<ChatContainerContent className="space-y-0 px-5 py-12">
				{messages.map((message, index) => {
					const isAssistant = message.role === "assistant";
					const isLastMessage = index === messages.length - 1;

					const textParts =
						message.parts?.filter((part) => part.type === "text") || [];
					const fileParts =
						message.parts?.filter((part) => part.type === "file") || [];

					// Check if message is still streaming by checking text part states
					const textPartStates = textParts.map((part) => {
						const partObj = part as { state?: string; text?: string };
						return {
							state: partObj.state,
							hasText: !!partObj.text,
							textLength: partObj.text?.length || 0,
						};
					});
					const hasStreamingText = textParts.some((part) => {
						const state = (part as { state?: string }).state;
						return (
							state === "streaming" ||
							state === "input-streaming" ||
							state === "output-streaming" ||
							state === "done"
						);
					});
					// Message is streaming if it's the last message and has text parts that might still be updating
					// If all text parts have state "done" or no state (completed), it's not streaming
					const allTextPartsDone =
						textParts.length > 0 &&
						textParts.every((part) => {
							const state = (part as { state?: string }).state;
							return state === "done" || state === undefined || state === null;
						});
					const isMessageStreaming = isLastMessage && !allTextPartsDone;

					const messageContent =
						textParts.map((part) => part.text).join("") || "";

					// Extract web search tool calls and results
					const { toolCalls, toolResults } = extractWebSearchTools(message);

					// Final deduplication by toolCallId to ensure no duplicates (defensive)
					const seenToolCallIds = new Set<string>();
					const finalToolCalls = toolCalls.filter((tc) => {
						if (!tc.toolCallId) {
							return false;
						}
						if (seenToolCallIds.has(tc.toolCallId)) {
							return false;
						}
						seenToolCallIds.add(tc.toolCallId);
						return true;
					});

					// Ensure unique key - use id if available, otherwise fallback to index
					const messageKey = message.id || `message-${index}-${message.role}`;

					return (
						<Message
							key={messageKey}
							className={cn(
								"mx-auto flex w-full max-w-3xl flex-col gap-2 px-6",
								isAssistant ? "items-start" : "items-end",
							)}
						>
							{isAssistant ? (
								<div className="group flex w-full flex-col gap-0">
									{/* Render text content first */}
									{messageContent && (
										<MessageContent
											className="prose flex-1 rounded-lg bg-transparent p-0 text-foreground"
											markdown
										>
											{messageContent}
										</MessageContent>
									)}

									{/* Render web search tool calls with Steps and Source components - below text */}
									{finalToolCalls.length > 0 && (
										<div
											className="mt-3"
											key={`toolcalls-${message.id || index}`}
										>
											{finalToolCalls.map((toolCall, toolIndex) => {
												const toolResult = toolResults.find(
													(tr) => tr.toolCallId === toolCall.toolCallId,
												);
												// Try to get query from input or rawInput
												let searchQuery = "";
												if (
													toolCall.input &&
													typeof toolCall.input === "object"
												) {
													searchQuery =
														(toolCall.input as { query?: string })?.query || "";
												}
												// If input is null/undefined, try rawInput
												if (
													!searchQuery &&
													"rawInput" in toolCall &&
													toolCall.rawInput
												) {
													const rawInput = toolCall.rawInput as {
														query?: string;
													};
													searchQuery = rawInput?.query || "";
												}

												const searchResults = normalizeResults(
													toolResult?.output ?? [],
												);

												// Only show "Extracting..." if message is actually still streaming
												// Use the isMessageStreaming from outer scope (calculated above)
												const isStreaming =
													isMessageStreaming && searchResults.length > 0;

												return (
													<ToolCallUI
														key={`${message.id || index}-${toolCall.toolCallId || toolIndex}`}
														searchQuery={searchQuery}
														searchResults={searchResults}
														isStreaming={isStreaming}
													/>
												);
											})}
										</div>
									)}
									<MessageActions
										className={cn(
											"-ml-2.5 flex gap-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100",
											isLastMessage && "opacity-100",
										)}
									>
										<CopyAction content={messageContent} />
										<MessageAction tooltip="Upvote" delayDuration={100}>
											<Button
												variant="ghost"
												size="icon"
												className="rounded-full"
											>
												<ThumbsUp />
											</Button>
										</MessageAction>
										<MessageAction tooltip="Downvote" delayDuration={100}>
											<Button
												variant="ghost"
												size="icon"
												className="rounded-full"
											>
												<ThumbsDown />
											</Button>
										</MessageAction>
									</MessageActions>
								</div>
							) : (
								<div className="group flex flex-col items-end gap-2">
									{/* File attachments */}
									{fileParts.length > 0 && (
										<div className="flex max-w-[85%] flex-wrap gap-2 sm:max-w-[75%]">
											{fileParts.map((filePart, fileIndex) => (
												<div
													key={fileIndex}
													className="flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-700 text-sm"
												>
													<Paperclip className="h-4 w-4 text-slate-500" />
													<span className="max-w-[160px] truncate">
														{filePart.filename || "File"}
													</span>
												</div>
											))}
										</div>
									)}
									{/* Text content */}
									{messageContent && (
										<MessageContent className="max-w-[85%] rounded-3xl bg-muted px-5 py-2.5 text-primary sm:max-w-[75%]">
											{messageContent}
										</MessageContent>
									)}
									<MessageActions
										className={cn(
											"flex gap-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100",
										)}
									>
										<MessageAction tooltip="Edit" delayDuration={100}>
											<Button
												variant="ghost"
												size="icon"
												className="rounded-full"
											>
												<Pencil />
											</Button>
										</MessageAction>
										<MessageAction tooltip="Delete" delayDuration={100}>
											<Button
												variant="ghost"
												size="icon"
												className="rounded-full"
											>
												<Trash />
											</Button>
										</MessageAction>
										<CopyAction content={messageContent} />
									</MessageActions>
								</div>
							)}
						</Message>
					);
				})}
			</ChatContainerContent>
			<div className="absolute bottom-4 left-1/2 flex w-full max-w-3xl -translate-x-1/2 justify-end px-5">
				<ScrollButton className="shadow-sm" />
			</div>
		</ChatContainerRoot>
	);
}
