/* eslint-disable @next/next/no-img-element */
import { siteConfig } from "@/lib/site";

export function QuoteSection() {
	const { quoteSection } = siteConfig;

	return (
		<section
			id="quote"
			className="relative z-20 w-full px-5 py-16 md:px-10 md:py-20"
		>
			<div className="mx-auto w-full max-w-5xl rounded-[2rem] border border-border bg-accent/80 px-6 py-10 shadow-sm md:px-10 md:py-14 lg:px-14">
				<blockquote className="mx-auto w-full max-w-4xl text-left">
					<p className="mb-8 text-balance font-medium text-2xl text-primary leading-tight tracking-tighter md:text-3xl lg:text-4xl">
						{quoteSection.quote}
					</p>

					<div className="flex items-center gap-3 md:gap-4">
						<div className="size-10 shrink-0 overflow-hidden rounded-full border border-border bg-primary md:size-12">
							<img
								src={quoteSection.author.image}
								alt={quoteSection.author.name}
								className="size-full rounded-full object-cover"
							/>
						</div>
						<div className="text-left">
							<cite className="font-medium text-base text-primary not-italic md:text-lg">
								{quoteSection.author.name}
							</cite>
							<p className="text-sm text-primary/70 md:text-base">{quoteSection.author.role}</p>
						</div>
					</div>
				</blockquote>
			</div>
		</section>
	);
}
export default QuoteSection;

