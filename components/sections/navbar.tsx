"use client"

/**
 * In the navbar file, the motion animation is used so that when the user scrolls down past a certain point on the website,
 * the navbar slightly pops out, and when the user scrolls back to the top, it settles back in. The class names are there to style the navbar, including giving it its pill-shaped appearance.
 * The mobile toggle section handles how the navbar is displayed on smaller screens or mobile devices instead of desktop. From a quick review, those parts are understandable, but the section at the beginning of the file is the part that still needs further explanation because its purpose is not yet clear.
 */
import { useScroll, motion, AnimatePresence, Variants } from 'framer-motion';
import React, {useEffect} from "react";
import {siteConfig} from "@/lib/site";
import {cn} from "@/lib/utils";
import { Icons } from '@/components/icons';
import Link from 'next/link';
import {NavMenu} from "@/components/nav-menu";
import {ThemeToggle} from "@/components/theme-toggle";
import {Menu, X} from "lucide-react";



const INITIAL_WIDTH = '100%';
const MAX_WIDTH = '100%';

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
}

const drawerVariants: Variants = {
    hidden: {opacity: 0, x: '-100%'},
    visible: {
        opacity: 1,
        y: 0,
        rotate: 0,
        transition: {
            type: 'spring',
            damping: 15,
            stiffness: 200,
            staggerChildren: 0.03,
        },
    },
    exit:{
        opacity: 0,
        y: 100,
        transition: { duration: 0.1 },
    }
}

const drawerMenuContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
}

const drawerMenuVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
}

export function Navbar() {
    const { scrollY } = useScroll()
    const [hasScrolled, setHasScrolled] = React.useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
    const [activeSection, setActiveSection] = React.useState('hero')

    useEffect(() => {
        const handleScroll = () => {
            const sections = siteConfig.nav.links.map((item) =>
                        item.href.substring(1)
            );

            for (const section of sections) {
                const element = document.getElementById(section);
                if (!element) continue;
                const rect = element.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    setActiveSection(section);
                    break;
                }
            }
        }

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return() => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const unsubscribe = scrollY.on('change', (latest) => {
            setHasScrolled(latest > 10)
        });
        return unsubscribe;
    }, [scrollY]);

    const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
    const handleOverlayClick = () => setIsDrawerOpen(false);
    return (
        <header
            className={cn(
            'sticky z-50 flex justify-center transition-all duration-300',
            hasScrolled ? 'top-6 mx-12' : 'top-4 mx-12'
        )}
            >
            <motion.div
                initial={{ width: INITIAL_WIDTH }}
                animate={{ width: hasScrolled ? MAX_WIDTH : INITIAL_WIDTH }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className='w-full'
                >
                <div
                    className={cn(
                        'mx-auto max-w-7xl rounded-2xl transition-all duration-300 xl:px-0',
                        hasScrolled
                        ? "border border-border bg-background/75 px-2 backdrop-blur-lg"
                            : "px-7 shadow-none",
                    )}
                    >
                    <div className='flex h-[56px] items-center justify-between'>
                        <Link href='/' className='flex items-center gap-3 px-4'>
                            <Icons.logo className='size-7 md:size-10' />
                            <p className='font-semibold text-lg text-primary'>Hephaestus</p>
                        </Link>

                        <NavMenu />

                        <div className='flex shrink-0 flex-row items-center gap-1 px-4 md:gap-3'>
                            <div className='flex items-center space-x-6'>
                                <Link className='hidden h-10 items-center justify-center rounded-full bg-primary px-6 font-medium text-primary-foreground text-sm tracking-wide shadow-md transition-all hover:bg-primary/90 hover:scale-105 hover:shadow-lg active:scale-95 md:flex'
                                      href='/chat'
                                      >
                                    Try for free
                                </Link>
                            </div>
                            <ThemeToggle />
                            <button
                                className='flex size-8 cursor-pointer items-center justify-center rounded-md border border-border md:hidden'
                                onClick={toggleDrawer}
                                >
                                {isDrawerOpen ? (
                                    <X className='size-5' />
                                ) : (
                                    <Menu className='size-5' />
                                )}
                            </button>
                        </div>

                    </div>
                </div>
            </motion.div>


            {/* Mobile Drawer */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={overlayVariants}
                            transition={{ duration: 0.2 }}
                            onClick={handleOverlayClick}
                        />

                        <motion.div
                            className="fixed inset-x-0 bottom-3 mx-auto w-[95%] rounded-xl border border-border bg-background p-4 shadow-lg"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={drawerVariants}
                        >
                            {/* Mobile menu content */}
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <Link href="/" className="flex items-center gap-3">
                                        <Icons.logo className="size-7 md:size-10" />
                                        <p className="font-semibold text-lg text-primary">
                                            AgentKit
                                        </p>
                                    </Link>
                                    <button
                                        onClick={toggleDrawer}
                                        className="cursor-pointer rounded-md border border-border p-1"
                                    >
                                        <X className="size-5" />
                                    </button>
                                </div>

                                <motion.ul
                                    className="mb-4 flex flex-col rounded-md border border-border text-sm"
                                    variants={drawerMenuContainerVariants}
                                >
                                    <AnimatePresence>
                                        {siteConfig.nav.links.map((item) => (
                                            <motion.li
                                                key={item.id}
                                                className="border-border border-b p-2.5 last:border-b-0"
                                                variants={drawerMenuVariants}
                                            >
                                                <a
                                                    href={item.href}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        const element = document.getElementById(
                                                            item.href.substring(1),
                                                        );
                                                        element?.scrollIntoView({ behavior: "smooth" });
                                                        setIsDrawerOpen(false);
                                                    }}
                                                    className={`underline-offset-4 transition-colors hover:text-primary/80 ${
                                                        activeSection === item.href.substring(1)
                                                            ? "font-medium text-primary"
                                                            : "text-primary/60"
                                                    }`}
                                                >
                                                    {item.name}
                                                </a>
                                            </motion.li>
                                        ))}
                                    </AnimatePresence>
                                </motion.ul>

                                {/* Action buttons */}
                                <div className="flex flex-col gap-2">
                                    <Link
                                        href="/chat"
                                        className="flex h-10 w-full items-center justify-center rounded-full bg-primary px-4 font-medium text-primary-foreground text-sm tracking-wide shadow-md transition-all active:scale-95"
                                    >
                                        Try for free
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    )
}