import { client } from '$lib/sanity';

export async function GET() {
    const websiteUrl = 'https://radiogabinetowe.pl'; 

    const mainPages = [
        '',
        '/ramowka',
        '/artysci',
        '/studio',
        '/kontakt'
    ];

    const query = `{
        "artysci": *[_type == "artysta"].slug.current,
        "aktualnosci": *[_type == "post"].slug.current
    }`;
    const data = await client.fetch(query);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    mainPages.forEach((page) => {
        xml += `  <url>\n    <loc>${websiteUrl}${page}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
    });

    (data.artysci || []).forEach((slug: string) => {
        xml += `  <url>\n    <loc>${websiteUrl}/artysci/${slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
    });

    (data.aktualnosci || []).forEach((slug: string) => {
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