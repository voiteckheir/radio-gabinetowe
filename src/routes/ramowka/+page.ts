import { client } from '$lib/sanity';

export async function load() {
    const query = `*[_type == "audycja"] {
        tytul,
        prowadzacy,
        "obrazekUrl": obrazek.asset->url,
        opis,
        linkPodcast
    }`;
    
    const audycjeSanity = await client.fetch(query);

    return {
        audycjeSanity
    };
}