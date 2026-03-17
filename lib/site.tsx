export const siteConfig = {
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
            { id: "pricing", name: "Pricing", href: "#pricing" },
            { id: "faq", name: "FAQ", href: "#faq" },
        ],
    },
};

export type SiteConfig = typeof siteConfig;
