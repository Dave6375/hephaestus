import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createChat, getRecentChatWithoutMessages } from "@/lib/chat-store";

export default async function ChatPage() {
	const { userId } = await auth();

	if (!userId) {
		redirect("/sign-in");
	}

	let id: string | null = null;
	try {
		// Check for existing empty chat to reuse
		id = await getRecentChatWithoutMessages(userId);

		if (!id) {
			// Create a new chat if no empty one exists
			id = await createChat(userId);
		}
	} catch (error) {
		console.error("Failed to initialize chat session:", error);
		// Note: we don't call redirect() inside the catch block unless we know how to handle NEXT_REDIRECT
	}

	if (id) {
		redirect(`/chat/${id}`);
	} else {
		redirect("/");
	}
}
