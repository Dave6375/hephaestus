// Mock Prisma Client to resolve build error and provide basic persistence
// In a real application, you should use the actual @prisma/client

class MockPrisma {
	// In-memory store
	private chats: any[] = [];
	private messages: any[] = [];

	chat = {
		create: async (args: any) => {
			const chat = {
				id: args.data.id || Math.random().toString(36).substring(2, 11),
				userId: args.data.userId,
				title: args.data.title || null,
				createdAt: new Date(),
				updatedAt: new Date(),
			};
			this.chats.push(chat);
			return chat;
		},
		findUnique: async (args: any) => {
			return this.chats.find((c) => c.id === args.where.id) || null;
		},
		findMany: async (args: any) => {
			let result = [...this.chats];
			if (args?.where?.userId) {
				result = result.filter((c) => c.userId === args.where.userId);
			}
			if (args?.orderBy?.updatedAt === "desc") {
				result.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
			}

			// Handle include/count for listChats
			return result.map((chat) => {
				const chatMessages = this.messages
					.filter((m) => m.chatId === chat.id)
					.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

				const lastMessages = args?.include?.messages?.take === 1 ? chatMessages.slice(0, 1) : chatMessages;

				return {
					...chat,
					messages: lastMessages,
					_count: {
						messages: chatMessages.length,
					},
				};
			});
		},
		findFirst: async (args: any) => {
			let result = [...this.chats];

			if (args?.where?.userId) {
				result = result.filter((c) => c.userId === args.where.userId);
			}

			if (args?.where?.messages?.none) {
				result = result.filter((chat) => {
					const chatMessages = this.messages.filter(
						(m) => m.chatId === chat.id,
					);
					return chatMessages.length === 0;
				});
			}

			if (args?.orderBy?.updatedAt === "desc") {
				result.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
			}

			return result[0] || null;
		},
		update: async (args: any) => {
			const index = this.chats.findIndex((c) => c.id === args.where.id);
			if (index !== -1) {
				this.chats[index] = { ...this.chats[index], ...args.data };
				return this.chats[index];
			}
			throw new Error("Chat not found");
		},
	};

	message = {
		findMany: async (args: any) => {
			let result = this.messages.filter((m) => m.chatId === args.where.chatId);
			if (args?.orderBy?.createdAt === "asc") {
				result.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
			}
			return result;
		},
		createMany: async (args: any) => {
			const newMessages = args.data.map((m: any) => ({
				...m,
				createdAt: new Date(),
			}));
			this.messages.push(...newMessages);
			return { count: newMessages.length };
		},
		update: async (args: any) => {
			const index = this.messages.findIndex((m) => m.id === args.where.id);
			if (index !== -1) {
				this.messages[index] = { ...this.messages[index], ...args.data };
				return this.messages[index];
			}
			throw new Error("Message not found");
		},
		deleteMany: async (args: any) => {
			const count = this.messages.length;
			this.messages = this.messages.filter((m) => {
				if (m.chatId === args.where.chatId && args.where.id?.in?.includes(m.id)) {
					return false;
				}
				return true;
			});
			return { count: count - this.messages.length };
		},
	};

	async $transaction(callback: (tx: any) => Promise<any>) {
		// Mock transaction by passing the same mock object
		return await callback(this);
	}
}

const prisma = new MockPrisma();

export default prisma as any;
