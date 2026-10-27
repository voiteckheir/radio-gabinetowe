//sitemap.xml/+server.js
// Importujemy bazę artystów, żeby móc dla każdego wygenerować jego własny link w mapie Google
import { bazaArtystow } from '$lib/data.js';
import { client } from '$lib/sanity';

export async function GET() {
	// Wpisz tutaj Waszą prawdziwą docelową domenę
	const websiteUrl = 'https://radiogabinetowe.pl';

	// Ręcznie wpisane, główne podstrony radia
	const mainPages = [
		'', // Strona główna
		'/ramowka',
		'/artysci',
		'/studio',
		'/kontakt'
	];

	// Rozpoczynamy budowę pliku XML
	let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
	xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
	// Pobieramy dynamiczne linki prosto z Sanity
	const query = `{
        "artysci": *[_type == "artysta"].slug.current,
        "aktualnosci": *[_type == "post"].slug.current
    }`;
	const data = await client.fetch(query);

	let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
	xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

	// 1. Główne podstrony
	mainPages.forEach((page) => {
		xml += `  <url>\n    <loc>${websiteUrl}${page}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
	});

	// 2. Dynamiczne strony artystów
	(data.artysci || []).forEach((slug) => {
		xml += `  <url>\n    <loc>${websiteUrl}/artysci/${slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
	});

	// 3. Dynamiczne strony postów (Aktualności)
	(data.aktualnosci || []).forEach((slug) => {
		xml += `  <url>\n    <loc>${websiteUrl}/aktualnosci/${slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
	});

	xml += `</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
