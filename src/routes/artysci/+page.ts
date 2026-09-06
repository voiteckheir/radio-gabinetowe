import { client } from '$lib/sanity';

export async function load() {
    // Pobieramy wszystkich artystów i sortujemy alfabetycznie
    const query = `*[_type == "artysta"] | order(nazwa asc) {
        _id,
        nazwa,
        "slug": slug.current,
        "zdjecieUrl": zdjecie.asset->url
    }`;
    
    const artysci = await client.fetch(query);

    return { artysci };
}