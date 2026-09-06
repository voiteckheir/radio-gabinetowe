import { client } from '$lib/sanity';

export async function load() {
    // Zapytanie GROQ pobierające 3 najnowsze aktualności
    const postsQuery = `*[_type == "post"] | order(_createdAt desc)[0...3] {
        _id,
        tytul,
        "slug": slug.current,
        zajawka,
        "imageUrl": zdjecieGlowne.asset->url
    }`;
    
    // Zapytanie GROQ pobierające 4 najnowsze podcasty
    const podcastsQuery = `*[_type == "podcast"] | order(_createdAt desc)[0...4] {
        _id,
        tytul,
        autor,
        kategoria,
        czas,
        audioUrl,
        youtubeUrl,
        "imageUrl": okladka.asset->url
    }`;
    // NOWE: Zapytanie o artystów (Pobiera też informację, kto jest artystą miesiąca!)
    const artistsQuery = `*[_type == "artysta"] | order(nazwa asc) {
        _id,
        nazwa,
        "slug": slug.current,
        gatunek,
        artystaMiesiaca,
        "zdjecieUrl": zdjecie.asset->url
    }`;
    const partnersQuery = `*[_type == "partner"] | order(_createdAt asc) {
        _id,
        nazwa,
        "logoUrl": logo.asset->url
    }`;

    // Odpytujemy Sanity w chmurze
    const posts = await client.fetch(postsQuery);
    const podcasts = await client.fetch(podcastsQuery);
    const artists = await client.fetch(artistsQuery);
    const partner = await client.fetch(partnersQuery);

    // Przekazujemy dane do komponentu +page.svelte
    return {
        posts,
        podcasts,
        artists,
        partner
    };
}