import { error } from '@sveltejs/kit';

// Tells Svelte to prerender all of the pages in the root of the /src/content/collections route
export async function entries() {
    const collectionFiles = Object.entries(import.meta.glob("/src/content/collections/*.json"));
    const collections = await Promise.all(collectionFiles.map(async ([path, resolver]) => {
        let file = await resolver();        
        const collection = path.slice(25, -5);
        return {collection}
    }));

    const pageFiles = Object.entries(import.meta.glob("/src/content/pages/*.json"));
    const pages = await Promise.all(pageFiles.map(async ([path, resolver]) => {
        let file = await resolver();     
        if (file.collection === "") {
            const collection = path.slice(19, -5);
            return {collection}
        }   
    }));

    return [...pages.filter(page => page), ...collections.filter(coll => coll)];
}

// Fetches the data for the appropriate page the user/Svelte prerender is requesting
/** @type {import('./$types').PageLoad} */
export async function load({params}) {
    try {
        const page = await import(`../../content/collections/${params.collection}.json`);
        return { PageContent: page.default, path: `src/content/collections/${params.collection}.json`}
    } catch(err) {
        try {
            const page = await import(`../../content/pages/${params.collection}.json`);
            if (page.collection === "") {
                return { PageContent: page.default, path: `src/content/pages/${params.collection}.json`};
            }
            throw error(404, "Not Found");
        }
        catch(err) {
            throw error(404, "Not Found")
        }
    }
}