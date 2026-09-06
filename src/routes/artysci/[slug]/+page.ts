import { client } from '$lib/sanity';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    // Szukamy artysty po slugu w Sanity
    const query = `*[_type == "artysta" && slug.current == $slug][0] {
        nazwa,
        gatunek,
        opis,
        facebook,
        instagram,
        "zdjecieUrl": zdjecie.asset->url
    }`;
    
    const artysta = await client.fetch(query, { slug: params.slug });

    if (!artysta) {
        error(404, 'Nie znaleziono takiego artysty w naszej bazie.');
    }

    return { artysta };
}