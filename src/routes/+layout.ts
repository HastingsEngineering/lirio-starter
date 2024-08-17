// Fetches the data for the appropriate page the user/Svelte prerender is requesting
/** @type {import('./$types').PageLoad} */
export async function load({params}) {
    try {
        const globalSettings = await import(`../content/data/settings.json`);
        return { settings: globalSettings.default };
    } catch(err) {
        console.log(err);
    }
}