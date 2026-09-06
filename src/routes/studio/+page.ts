import { client } from '$lib/sanity';

export async function load() {
    const query = `*[_type == "ustawieniaStudia"][0] {
        wyposazenie,
        cennikSala,
        cennikPraca
    }`;
    
    const studioData = await client.fetch(query);

    return {
        studioData: studioData || { wyposazenie: [], cennikSala: [], cennikPraca: [] }
    };
}