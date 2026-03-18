import React from 'react';
import {FirstBentoAnimation} from "@/components/FirstBentoAnimation";
import {SecondBentoAnimation} from "@/components/SecondBentoAnimation";
import {ThirdBentoAnimation} from "@/components/ThirdBentoAnimation";
import {FourthBentoAnimation} from "@/components/FourthBentoAnimation";

export interface SiteConfig {
    name: string;
    description: string;
    links: {
        twitter: string;
        github: string;
    };
    nav: {
        links: {
            id: string;
            name: string;
            href: string;
        }[];
    };
    hero: {
        badge: string;
        badgeIcon: React.ReactNode;
        title: string;
        description: string;
        cta: {
            primary: {
                text: string;
                href: string;
            };
            secondary: {
                text: string;
                href: string;
            };
        };
    };
    bentoSection: {
        title: string;
        description: string;
        items: {
            id: number;
            title: string;
            description: string;
            content: React.ReactNode;
        }[];
    };
    quoteSection: {
        quote: string;
        author: {
            name: string;
            role: string;
            image: string;
        };
    };
}

export const siteConfig: SiteConfig = {
    name: "Hephaestus",
    // url: "https://agentkitt.xyz",
    description:
        "Production-ready Automated 3D Asset Pipeline Using Puter AI and KV as well as E2B sandbox.",
    links: {
        twitter: "https://www.instagram.com/idokod09/",
        github: "https://github.com/Dave6375/hephaestus",
    },
    nav: {
        links: [
            { id: "hero", name: "Home", href: "#hero" },
            { id: "features", name: "Features", href: "#features" },
            { id: "Database", name: "Database", href: "#Database" },
            { id: "pricing", name: "Pricing", href: "#pricing" },
            { id: "faq", name: "FAQ", href: "#faq" },
        ],
    },
    hero: {
        badge: "New: Hephaestus AI is now in beta",
        badgeIcon: <span className="mr-2">🚀</span>,
        title: "The Ultimate AI 3D Asset Pipeline",
        description: "Production-ready Automated 3D Asset Pipeline Using Puter AI and KV as well as E2B sandbox. Includes authentication, database persistence, and a beautiful UI—everything you need to launch fast.",
        cta: {
            primary: {
                text: "Try for free",
                href: "/chat"
            },
            secondary: {
                text: "Learn More",
                href: "#features"
            }
        }
    },
    bentoSection: {
        title: "Powerful Features Out of the Box",
        description:
            "AgentKit includes everything you need-no need to build from scratch",
        items: [
            {
                id: 1,
                content: <FirstBentoAnimation />,
                title: "Intelligent Web Search",
                description:
                    "Enable web search when your agent needs current information. Search results are automatically cited and displayed in a beautiful UI.",
            },
            {
                id: 2,
                content: <SecondBentoAnimation />,
                title: "Real-time Streaming",
                description:
                    "Streaming responses with tool call visualization. See your agent's search process in real-time with collapsible source citations.",
            },
            {
                id: 3,
                content: (
                    <ThirdBentoAnimation
                        data={[20, 30, 25, 45, 40, 55, 75]}
                        toolTipValues={[
                            1234, 1678, 2101, 2534, 2967, 3400, 3833, 4266, 4700, 5133,
                        ]}
                    />
                ),
                title: "Persistent Chat History",
                description:
                    "All conversations are automatically saved to PostgreSQL. User-scoped data with Prisma ORM for easy querying and management.",
            },
            {
                id: 4,
                content: <FourthBentoAnimation once={false} />,
                title: "Deploy Anywhere",
                description:
                    "Optimized for Vercel deployment with environment variable management. Includes error handling, loading states, and responsive design.",
            },
        ],
    },
    quoteSection: {
        quote:
            "The best AI does more than respond. It understands the goal, builds a step-by-step plan, and executes each task with speed, precision, and purpose.",
        author: {
            name: "Dave Idoko",
            role: "Founder, Assets Generator",
            image: "/Quote/random.png",
        },
    },
},
featureSection: {
    title: "Everything You Need to Build AI Agents",
        description:
    "AgentKit comes with all the essential features to build production-ready AI applications",
        items: [
        {
            id: 1,
            title: "Web Search Agent Built-In",
            content:
                "Toggle web search on/off with a single click. Your AI agent can search the web for current information, recent events, and up-to-date data when needed.",
            image:
                "https://images.unsplash.com/photo-1720371300677-ba4838fa0678?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 2,
            title: "Modern Chat Interface",
            content:
                "Pre-built chat UI with streaming responses, file uploads, message history, and tool call visualization. Built with shadcn/ui and Tailwind CSS.",
            image:
                "https://images.unsplash.com/photo-1686170287433-c95faf6d3608?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8fA%3D%3D",
        },
        {
            id: 3,
            title: "User Authentication Ready",
            content:
                "Integrated Clerk authentication with email/password and OAuth support. User-scoped chat history with secure database persistence.",
            image:
                "https://images.unsplash.com/photo-1720378042271-60aff1e1c538?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 4,
            title: "Built for Developers",
            content:
                "TypeScript, Next.js 15, AI SDK, Prisma, and PostgreSQL. Clean architecture, easy to customize, and production-ready from day one.",
            image:
                "https://images.unsplash.com/photo-1666882990322-e7f3b8df4f75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
        },
    ],
},

