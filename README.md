# Radio Gabinetowe - WWW

## Strona internetowa niezależnego radia i studia nagrań.

### Wykorzystane Technologie
* **SvelteKit:** Główny framework aplikacji (routing, SSR).
* **Tailwind CSS v4:** System stylizowania interfejsu.
* **TypeScript / JSDoc:** Typowanie podstawowych struktur danych.
* **Vite:** Środowisko deweloperskie i narzędzie budujące.

### Najważniejsze Komendy (Terminal)
 * ```npm install``` – Pobiera i instaluje wszystkie zależności projektu.
 * ```npm run dev``` – Uruchamia lokalny serwer deweloperski (podgląd na żywo).
 * ```npm run build``` – Buduje zoptymalizowaną wersję aplikacji gotową na produkcję.
 * ```git add .``` – Dodaje wszystkie nowe lub zmienione pliki do poczekalni Git.
 * ```git commit -m```"Twoj opis" – Tworzy nowy punkt zapisu w historii projektu.
 * ```git push``` – Wysyła zapisane zmiany na zdalny serwer (GitHub).

### Architektura i Główne Pliki
* *src/routes/+layout.svelte* – Główny układ (tzw. wrapper). Zawiera menu, stopkę oraz globalny odtwarzacz audio, który nie przerywa gry podczas zmiany podstron.
* *src/routes/+error.svelte* – Niestandardowa strona błędu 404 dopasowana do stylistyki radia.
* *src/routes/sitemap.xml/+server.js* – Dynamiczny endpoint generujący mapę strony dla Google.
* *src/lib/data.js* – Centralna "baza danych" zawierająca listy podcastów, artystów, usług i partnerów.
* *src/lib/player.svelte.js* – Globalny stan odtwarzacza (Runes Svelte 5) przetrzymujący informacje o aktualnym utworze, głośności i źródle streamu.
* *src/lib/Seo.svelte*– Uniwersalny komponent ładujący tagi Meta oraz Open Graph dla każdej podstrony.
* *static/* – Folder na pliki, które nie są przetwarzane przez Svelte (obrazki .webp, robots.txt, favicon.png).

### Zrealizowane Funkcjonalności UX / SEO
* Płynny odtwarzacz podpięty pod strumień na żywo oraz podcasty (VOD).
* Dynamiczny routing (np. profile artystów pod adresem /artysci/[slug]).
* System karuzeli dla partnerów i artystów ze zoptymalizowanymi animacjami.
* Pełne wsparcie dla RODO (baner cookies zapisujący wybór w przeglądarce).
* Optymalizacja SEO (unikalne title, opisy, obrazki Open Graph oraz kompresja WebP).