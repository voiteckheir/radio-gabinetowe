// Importujemy bazę artystów, żeby móc dla każdego wygenerować jego własny link w mapie Google
import { bazaArtystow } from '$lib/data.js';

export async function GET() {
	// Wpisz tutaj Waszą prawdziwą docelową domenę
	const websiteUrl = 'https://twojadomena.pl';

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

	// 1. Dodajemy główne podstrony
	mainPages.forEach((page) => {
		xml += `  <url>\n`;
		xml += `    <loc>${websiteUrl}${page}</loc>\n`;
		xml += `    <changefreq>weekly</changefreq>\n`;
		xml += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
		xml += `  </url>\n`;
	});

	// 2. Dodajemy dynamiczne strony WSZYSTKICH artystów z bazy
	bazaArtystow.forEach((artysta) => {
		xml += `  <url>\n`;
		// Generujemy link np. https://twojadomena.pl/artysci/marqus-mars
		xml += `    <loc>${websiteUrl}/artysci/${artysta.slug}</loc>\n`;
		xml += `    <changefreq>monthly</changefreq>\n`;
		xml += `    <priority>0.6</priority>\n`;
		xml += `  </url>\n`;
	});

	xml += `</urlset>`;

	// Zwracamy wynik do przeglądarki lub bota Google jako poprawny format XML
	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			// Każe przeglądarkom buforować tę mapę na 1 godzinę (3600 sekund)
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
