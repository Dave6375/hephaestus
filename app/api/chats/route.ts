import { auth } from "@clerk/nextjs/server";
import { listChats } from "@/lib/chat-store";

export async function GET() {
    const { userId } = await auth();
    if (!userId) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        const chats = await listChats(userId);
        return new Response(JSON.stringify(chats), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("[Chats API Error]:", error);
        return new Response(JSON.stringify({ error: (error as Error).message }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
