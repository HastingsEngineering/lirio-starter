import { error } from '@sveltejs/kit';

// Fetches the data for the appropriate page the user/Svelte prerender is requesting
/** @type {import('./$types').PageLoad} */
export async function load({params}) {
    try {
        const page = await import(`../content/home.json`);
        return { PageContent: page.default}
    } catch(err) {
        throw error(404, "Not Found")
    }
}