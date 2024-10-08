import { error } from '@sveltejs/kit';
import { PUBLIC_OS } from '$env/static/public';

// Tells Svelte to prerender all of the pages in the root of the /src/content/collections route
export async function entries() {
    const pageFiles = Object.entries(import.meta.glob("/src/content/pages/*.json"));
    const pages = await Promise.all(pageFiles.map(async ([path, resolver]) => {
        let file = await resolver();        
        const slug = path.slice(19, -5);
        const collection = file.collection;
        if (slug && collection) {
            return {slug, collection}
        }
    }));
    return pages.filter(page => page);
}

// Fetches the data for the appropriate page the user/Svelte prerender is requesting
/** @type {import('./$types').PageLoad} */
export async function load({params}) {
    try {
        const page = await import(`../../../content/pages/${params.slug}.json`);
        if (page.collection.slice(24, -5) === params.collection) {
            let path = PUBLIC_OS === 'win' ? `src\\content\\pages\\${params.collection}.json` : `src/content/pages/${params.collection}.json`;
            return { PageContent: page.default, path };
        }
        throw error(404, "Not Found");
    } catch(err) {
        throw error(404, "Not Found")
    }
}