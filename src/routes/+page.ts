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

    // Odpytujemy Sanity w chmurze
    const posts = await client.fetch(postsQuery);
    const podcasts = await client.fetch(podcastsQuery);

    // Przekazujemy dane do komponentu +page.svelte
    return {
        posts,
        podcasts
    };
}