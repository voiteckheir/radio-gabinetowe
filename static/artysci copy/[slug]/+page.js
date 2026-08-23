import { error } from '@sveltejs/kit';

// Tymczasowa baza danych (docelowo zastąpisz to zapytaniem fetch do API Sanity.io)
const bazaArtystow = [
    { 
        slug: 'marqus-mars', 
        nazwa: 'MARQUS MARS', 
        zdjecie: 'FOTO', 
        gatunek: 'Rock / Gitara',
        opis: 'Marqus Mars to wirtuoz gitary, który swoimi solówkami potrafi rozpalić każdą publiczność. Jego najnowszy album to powrót do korzeni klasycznego rocka z nowoczesnym zacięciem.', 
        facebook: 'https://facebook.com', 
        instagram: 'https://instagram.com' 
    },
    { 
        slug: 'dj-velvet-sky', 
        nazwa: 'DJ VELVET SKY', 
        zdjecie: 'FOTO', 
        gatunek: 'Elektronika / Ambient',
        opis: 'Mistrz nastroju i głębokich basów. Velvet Sky od lat współpracuje z naszym radiem, dostarczając co tydzień najświeższe sety prosto z berlińskich klubów.', 
        facebook: 'https://facebook.com', 
        instagram: 'https://instagram.com' 
    },
    { 
        slug: 'yoenna', 
        nazwa: 'YOENNA', 
        zdjecie: 'FOTO', 
        gatunek: 'Pop / Alternatywa',
        opis: 'Yoenna to głos, którego nie da się zapomnieć. Młoda wokalistka z niezwykłą wrażliwością tekstową, debiutująca na naszej antenie w zeszłym roku.', 
        facebook: 'https://facebook.com', 
        instagram: 'https://instagram.com' 
    }
];

// Funkcja load() automatycznie otrzymuje obiekt 'params', który zawiera nasz 'slug' z adresu URL
export function load({ params }) {
    // Szukamy artysty, którego slug zgadza się z tym w pasku adresu
    const artysta = bazaArtystow.find((a) => a.slug === params.slug);

    // Jeśli ktoś wpisze zły adres (np. /artysci/nie-ma-takiego), pokazujemy stronę błędu 404
    if (!artysta) {
        error(404, {
            message: 'Nie znaleziono takiego artysty w naszej bazie.'
        });
    }

    // Zwracamy znalezione dane – trafią one prosto do pliku +page.svelte!
    return {
        artysta
    };
}