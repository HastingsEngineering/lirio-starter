// Fetches the data for the appropriate page the user/Svelte prerender is requesting
/** @type {import('./$types').PageLoad} */
export async function load({params}) {
    try {
        const menuData = await import(`../content/data/menu.json`);
        return { menuData: menuData.default };
    } catch(err) {
        console.log(err);
    }
}