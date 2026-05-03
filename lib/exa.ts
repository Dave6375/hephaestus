import Exa from "exa-js";
import type { ExaSearchParams } from "./type";

const exa = new Exa(process.env.EXA_API_KEY);

/**
 * Performs a web search using Exa AI.
 * 
 * @param params - The search query and options.
 * @returns A promise that resolves with the search results.
 */
export async function searchExa({ 
    query, 
    numResults = 5, 
    useAutoprompt = true,
    type = "auto"
}: ExaSearchParams) {
    try {
        console.log(`[Exa AI] Searching for: "${query}" (type: ${type}, results: ${numResults})`);
        
        const result = await exa.searchAndContents(query, {
            numResults,
            useAutoprompt,
            type,
            text: true, // Get text content
            highlights: true, // Get highlights
        });

        console.log(`[Exa AI] Search successful. Found ${result.results.length} results.`);
        
        return {
            results: result.results.map(r => ({
                title: r.title,
                url: r.url,
                publishedDate: r.publishedDate,
                author: r.author,
                score: r.score,
                id: r.id,
                text: r.text,
                highlights: r.highlights,
            }))
        };
    } catch (error) {
        console.error("[Exa AI] Search failed:", error);
        throw error;
    }
}
