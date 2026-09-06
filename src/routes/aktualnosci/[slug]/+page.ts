import { client } from '$lib/sanity';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    // Odpytujemy Sanity o ten konkretny artykuł (po jego linku/slugu)
    const query = `*[_type == "post" && slug.current == $slug][0] {
        tytul,
        "imageUrl": zdjecieGlowne.asset->url,
        dataPublikacji,
        tresc
    }`;
    
    const post = await client.fetch(query, { slug: params.slug });

    // Jeśli Sanity nie znajdzie posta, zwracamy błąd 404
    if (!post) {
        throw error(404, 'Artykuł nie istnieje');
    }

    return { post };
}