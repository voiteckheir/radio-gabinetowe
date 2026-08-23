<script lang="ts">

    import Seo from '$lib/Seo.svelte';

    import { player } from '$lib/player.svelte.js';
    
    // Importy potrzebne do animacji karuzeli i cyklu życia komponentu
    import { flip } from 'svelte/animate';
    import { onMount, onDestroy } from 'svelte';

    // Importujemy dane z naszego nowego, centralnego pliku
    import { aktualnosci, podcasty, bazaPartnerow, bazaArtystow } from '$lib/data.js';

    // Definiujemy typ dla TypeScriptu, aby pozbyć się błędu 'any'
    type Podcast = {
        id: number;
        tytul: string;
        autor: string;
        kategoria: string;
        czas: string;
        audioUrl: string;
        youtubeUrl: string;
    };
/*
    // 1. DANE MOCKOWE (Aktualności, Podcasty, Partnerzy)
    const aktualnosci = [
        { id: 1, tytul: "TRZECI KROK DO SŁAWY", opis: "Tworzysz muzykę i marzysz by nagrać swoje numery w profesjonalnym studiu? A może działasz w młodzieżowym zespole..." },
        { id: 2, tytul: "LITERACKI WEHIKUŁ CZASU", opis: "Już od dziś o 18:00 na antenie naszego radia rusza cykl Literacki wehikuł czasu – seria opowieści o znakomitych poetach..." },
        { id: 3, tytul: "PREMIERA BULLET HAZE", opis: "Już od dziś możecie słuchać pierwszego utworu nagranego w ramach Drugiego kroku do sławy. Przed Wami Bullet Haze..." }
    ];

    const podcasty = [
        { id: 1, tytul: "Stadion, który widział prawie wszystko", autor: "Mateusz Kuźniewski", kategoria: "Sport", czas: "27 min", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", youtubeUrl: "https://youtube.com" },
        { id: 2, tytul: "Mario z Tokio", autor: "Jarosław Juszkiewicz", kategoria: "Kultura i sztuka", czas: "18 min", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", youtubeUrl: "https://youtube.com" },
        { id: 3, tytul: "Żeby ktoś żył, ktoś inny musi umrzeć", autor: "Beata Kwiatkowska", kategoria: "Rozmowy i opowieści", czas: "39 min", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", youtubeUrl: "https://youtube.com" },
        { id: 4, tytul: "Pseudobiologia", autor: "Oktawia Kromer", kategoria: "Nauka", czas: "41 min", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", youtubeUrl: "https://youtube.com" }
    ];

    // Dane do karuzeli w Svelte 5 (używamy $state by framework reagował na zmiany)
    let partnerzy = $state([
        { id: 1, nazwa: "TEATR POLONIA", logo: "FOTO" },
        { id: 2, nazwa: "TEATR SZEKSPIROWSKI", logo: "FOTO" },
        { id: 3, nazwa: "TEATR WSPÓŁCZESNY", logo: "FOTO" },
        { id: 4, nazwa: "KINO ŻEGLARZ", logo: "FOTO" },
        { id: 5, nazwa: "RADIO 357", logo: "FOTO" },
        { id: 6, nazwa: "URZĄD MIASTA", logo: "FOTO" }
    ]);
*/
    // 2. LOGIKA ODTWARZACZA
    function odpalPodcast(pod: any) {
        player.isLive = false;
        player.streamUrl = pod.audioUrl;
        player.currentTitle = pod.tytul;
        player.currentSubtitle = pod.autor;
        player.isPlaying = true;
    }

// --- STAN KARUZEL ---
    let partnerzy = $state(bazaPartnerow);
    
    // Pierwszy artysta to "Artysta Miesiąca", reszta trafia do karuzeli
    const artystaMiesiaca = bazaArtystow[0];
    let karuzelaArtystow = $state(bazaArtystow.slice(1));

    // Zmienne dla interwałów
    let autoPlayPartnerzy: ReturnType<typeof setInterval>;
    let pauseTimeoutPartnerzy: ReturnType<typeof setTimeout>;
    
    let autoPlayArtysci: ReturnType<typeof setInterval>;
    let pauseTimeoutArtysci: ReturnType<typeof setTimeout>;

    // --- LOGIKA: KARUZELA PARTNERÓW ---
    function shiftPartnerzy(dir: 'lewo' | 'prawo') {
        if (dir === 'prawo') partnerzy = [...partnerzy.slice(1), partnerzy[0]];
        else partnerzy = [partnerzy[partnerzy.length - 1], ...partnerzy.slice(0, -1)];
    }
    
    function manualPartnerzy(kierunek: 'lewo' | 'prawo') {
        clearInterval(autoPlayPartnerzy);
        clearTimeout(pauseTimeoutPartnerzy);
        shiftPartnerzy(kierunek);
        pauseTimeoutPartnerzy = setTimeout(() => {
            autoPlayPartnerzy = setInterval(() => shiftPartnerzy('prawo'), 5000);
        }, 20000);
    }

    // --- LOGIKA: KARUZELA ARTYSTÓW ---
    function shiftArtysci(dir: 'lewo' | 'prawo') {
        if (dir === 'prawo') karuzelaArtystow = [...karuzelaArtystow.slice(1), karuzelaArtystow[0]];
        else karuzelaArtystow = [karuzelaArtystow[karuzelaArtystow.length - 1], ...karuzelaArtystow.slice(0, -1)];
    }

    function manualArtysci(kierunek: 'lewo' | 'prawo') {
        clearInterval(autoPlayArtysci);
        clearTimeout(pauseTimeoutArtysci);
        shiftArtysci(kierunek);
        pauseTimeoutArtysci = setTimeout(() => {
            autoPlayArtysci = setInterval(() => shiftArtysci('prawo'), 5000);
        }, 20000);
    }

    // Inicjalizacja i sprzątanie
    onMount(() => {
        autoPlayPartnerzy = setInterval(() => shiftPartnerzy('prawo'), 5000);
        autoPlayArtysci = setInterval(() => shiftArtysci('prawo'), 5000);
    });

    onDestroy(() => {
        clearInterval(autoPlayPartnerzy);
        clearInterval(autoPlayArtysci);
        clearTimeout(pauseTimeoutPartnerzy);
        clearTimeout(pauseTimeoutArtysci);
    });
</script>

<Seo
    title="Główna | Radio Gabinetowe"
    description="Słuchaj na żywo Radia Gabinetowego! Poznaj naszych artystów, sprawdź najnowsze podcasty i zobacz cennik profesjonalnego studia nagrań."
/>


<!-- SEKCJA POWITALNA (HERO) -->
<section class="relative w-full h-[70vh] min-h-125 flex items-center justify-center text-center overflow-hidden mb-16">
    <div class="absolute inset-0 z-0">
        <img src="loga-gabinet/abstrakt-top.webp" alt="Tło studia nagrań" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-black/60"></div>
    </div>
    <div class="relative z-10 text-white flex flex-col items-center px-4 mt-16">
        <h2 class="text-4xl md:text-6xl font-black mb-4 uppercase tracking-widest drop-shadow-lg">
            Studio Nagrań
        </h2>
        <p class="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl drop-shadow-md">
            Szukasz profesjonalnego miejsca do nagrań? Zobacz nasz grafik, wybierz termin i zrealizuj z nami swój kolejny projekt.
        </p>
        <a href="/studio" class="border-2 border-white text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition duration-300 backdrop-blur-sm bg-black/20">
            Sprawdź grafik i umów się
        </a>
    </div>
</section>

<!-- SEKCJA AKTUALNOŚCI -->
<section class="max-w-7xl mx-auto px-4 w-full mb-20">
    <h2 class="text-3xl font-black mb-8 border-b-4 border-red-800 inline-block pb-2">AKTUALNOŚCI</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {#each aktualnosci as wpis (wpis.id)}
            <article class="bg-white p-6 shadow-sm rounded border-t-4 border-red-800 flex flex-col hover:shadow-md transition duration-300">
                <div class="h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-400">
                    <span>Zdjęcie z Sanity</span>
                </div>
                <h3 class="font-bold text-xl mb-3 leading-tight uppercase text-gray-900">{wpis.tytul}</h3>
                <p class="text-sm text-gray-600 grow mb-4 line-clamp-3">{wpis.opis}</p>
                <button class="self-start text-xs font-bold text-red-800 uppercase hover:text-red-600 transition">
                    Czytaj dalej ➔
                </button>
            </article>
        {/each}
    </div>
</section>

<!-- SEKCJA PODCASTY -->
<section class="max-w-7xl mx-auto px-4 w-full mb-24">
    <div class="flex items-center justify-between mb-8 border-b-4 border-red-800 pb-2">
        <h2 class="text-3xl font-black uppercase">POSŁUCHAJ NASZYCH PODCASTÓW</h2>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each podcasty as pod (pod.id)}
            <article class="bg-red-800 text-white rounded-lg p-4 flex flex-col hover:-translate-y-1 transition duration-300 shadow-md">
                <div class="relative w-full aspect-square bg-red-950 rounded mb-4 overflow-hidden group">
                    <div class="absolute inset-0 flex items-center justify-center text-red-900 font-bold opacity-30 text-4xl">FOTO</div>
                    <button title="uruchomienie podcastu"
                        onclick={() => odpalPodcast(pod)}
                        class="absolute bottom-3 left-3 bg-white text-red-800 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 shadow-lg transition"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 ml-1"><path d="M8 5v14l11-7z"/></svg>
                    </button>
                </div>
                <div class="grow flex flex-col">
                    <h3 class="font-bold text-lg leading-tight mb-1">{pod.tytul}</h3>
                    <p class="text-sm text-red-200 mb-3">{pod.autor}</p>
                    <div class="mt-auto flex items-center justify-between text-xs font-medium text-red-300 border-t border-red-700 pt-3">
                        <span>{pod.kategoria}, {pod.czas}</span>
                        <a href={pod.youtubeUrl} target="_blank" rel="noopener noreferrer" class="hover:text-white transition" aria-label="Obejrzyj na YouTube">
                            <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M21.582 6.186a2.6 2.6 0 0 0-1.838-1.852C18.125 3.9 12 3.9 12 3.9s-6.125 0-7.744.434a2.6 2.6 0 0 0-1.838 1.852C2 7.828 2 12 2 12s0 4.172.418 5.814a2.6 2.6 0 0 0 1.838 1.852C5.875 20.1 12 20.1 12 20.1s6.125 0 7.744-.434a2.6 2.6 0 0 0 1.838-1.852C22 16.172 22 12 22 12s0-4.172-.418-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        </a>
                    </div>
                </div>
            </article>
        {/each}
    </div>
</section>

<!-- NOWA SEKCJA: ARTYŚCI (Artysta Miesiąca + Karuzela) -->
<section class="max-w-7xl mx-auto px-4 w-full mb-24">
    
    <div class="flex items-center gap-4 mb-8">
        <h2 class="text-3xl font-black uppercase border-b-4 border-red-800 pb-2">Nasi Artyści</h2>
        <div class="grow"></div>
        <!-- Strzałki dla karuzeli artystów -->
        <div class="flex gap-2">
            <button title="artysta skip w lewo" onclick={() => manualArtysci('lewo')} class="w-10 h-10 border-2 border-red-800 rounded-full flex items-center justify-center text-red-800 hover:bg-red-800 hover:text-white transition">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button title="artysta skip w prawo" onclick={() => manualArtysci('prawo')} class="w-10 h-10 border-2 border-red-800 rounded-full flex items-center justify-center text-red-800 hover:bg-red-800 hover:text-white transition">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
        </div>
    </div>

    <!-- Siatka: Lewa strona (Większy) / Prawa strona (Karuzela) -->
    <div class="flex flex-col lg:flex-row gap-8 overflow-hidden">
        
        <!-- ARTYSTA MIESIĄCA (Statyczny) -->
        <a href="/artysci/{artystaMiesiaca.slug}" class="block lg:w-1/3 shrink-0 bg-[#d31a38] p-4 group transition-transform duration-300 hover:scale-[1.02] shadow-lg relative">
            <!-- Pasek "ARTYSTA MIESIĄCA" -->
            <div class="absolute top-0 left-0 bg-black text-white text-xs font-black uppercase tracking-widest px-4 py-2 z-10">
                Artysta Miesiąca
            </div>
            
            <div class="w-full aspect-4/5 bg-zinc-900 border-2 border-black flex items-center justify-center relative overflow-hidden mt-6">
                <span class="text-zinc-600 font-bold tracking-widest text-2xl">{artystaMiesiaca.zdjecie}</span>
            </div>
            <div class="bg-black text-white text-center font-black uppercase text-2xl py-3 mt-4 border-2 border-black shadow-md">
                {artystaMiesiaca.nazwa}
            </div>
            <div class="text-center text-red-200 uppercase tracking-widest text-xs mt-2 font-bold">
                {artystaMiesiaca.gatunek}
            </div>
        </a>

        <!-- KARUZELA Z POZOSTAŁYMI ARTYSTAMI -->
        <div class="lg:w-2/3 overflow-hidden pb-4">
            <div class="flex gap-6 w-max items-center h-full">
                {#each karuzelaArtystow as artysta (artysta.id)}
                    <a 
                        href="/artysci/{artysta.slug}"
                        animate:flip={{ duration: 500 }}
                        class="w-48 sm:w-56 block shrink-0 bg-[#d31a38] p-3 transition-transform duration-300 hover:scale-105 shadow-md"
                    >
                        <div class="w-full aspect-square bg-zinc-900 border-2 border-black flex items-center justify-center relative overflow-hidden">
                            <span class="text-zinc-600 font-bold tracking-widest">{artysta.zdjecie}</span>
                        </div>
                        <div class="bg-black text-white text-center font-black uppercase text-lg py-2 mt-3 border-2 border-black">
                            {artysta.nazwa}
                        </div>
                    </a>
                {/each}
            </div>
        </div>
        
    </div>
</section>

<!-- SEKCJA WSPÓŁPRACE (Karuzela Partnerów na czarnym tle) -->
<section class="bg-black py-16 w-full overflow-hidden border-b border-zinc-900">
    <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center gap-4 mb-10">
            <h2 class="text-white text-xl md:text-2xl font-bold whitespace-nowrap">Wspieramy medialnie</h2>
            <div class="h-px bg-zinc-800 grow"></div>
            <div class="flex gap-2">
                <button title="wspolprace skip w prawo" onclick={() => manualPartnerzy('lewo')} class="w-10 h-10 border border-zinc-700 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <button title="wspolprace skip w prawo" onclick={() => manualPartnerzy('prawo')} class="w-10 h-10 border border-zinc-700 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                </button>
            </div>
        </div>

        <div class="w-full overflow-hidden pb-4">
            <div class="flex gap-6 w-max">
                {#each partnerzy as partner (partner.id)}
                    <div animate:flip={{ duration: 500 }} class="w-40 h-48 sm:w-48 sm:h-56 md:w-56 md:h-64 shrink-0 bg-white flex flex-col p-4 shadow-lg rounded-sm hover:shadow-xl transition-shadow">
                        <div class="grow flex items-center justify-center w-full overflow-hidden mb-2 relative">
                            <span class="text-zinc-200 font-bold tracking-widest text-2xl">LOGO</span>
                        </div>
                        <div class="shrink-0 w-full border-t border-zinc-100 pt-2 flex items-center justify-center h-10">
                            <span class="text-black font-black text-center uppercase tracking-wider text-[10px] md:text-xs leading-tight line-clamp-2">
                                {partner.nazwa}
                            </span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<!-- SEKCJA KONTAKTOWA (Czarna, zintegrowana) -->
<section class="bg-black pt-8 pb-16 mb-0 w-full overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 relative flex flex-col lg:flex-row items-center">
        <!-- Lewy czerwony panel -->
        <div class="bg-[#d31a38] text-white p-8 md:p-12 w-full lg:w-2/3 lg:pr-40 relative z-10">
            <h2 class="text-4xl font-black mb-6 uppercase tracking-wide">Kontakt</h2>
            <p class="text-white/90 text-lg font-medium leading-relaxed mb-6">Masz pomysł na audycję? Tworzysz niezależną muzykę i chcesz usłyszeć ją na antenie?</p>
            <p class="font-bold text-lg mb-8">Napisz do Nas lub zadzwoń!</p>
            <div class="bg-black text-white p-5 inline-block w-full max-w-md shadow-lg">
                <ul class="space-y-2 font-medium text-sm md:text-base">
                    <li class="flex items-center gap-4"><span class="text-lg">🏠</span> <span>Dolna Panny Marii 63/5, 20-010 Lublin</span></li>
                    <li class="flex items-center gap-4"><span class="text-lg">✉</span> <span>redakcja@radiogabinetowe.pl</span></li>
                    <li class="flex items-center gap-4"><span class="text-lg">📞</span> <span>536 952 520</span> </li>
                    <li class="flex items-center gap-4"><span class="text-lg">📞</span> <span>534 549 268</span> </li>
                </ul>
            </div>
        </div>

        <!-- Formularz z prawej strony -->
        <div class="bg-black border border-zinc-800 p-8 md:p-10 w-full lg:w-[45%] lg:absolute lg:right-4 mt-8 lg:mt-0 z-20 shadow-2xl">
            <form class="flex flex-col gap-8">
                <div class="relative">
                    <input type="text" id="imie" placeholder=" " class="block w-full bg-transparent border-0 border-b border-gray-600 text-gray-300 py-2 px-1 focus:outline-none focus:ring-0 focus:border-gray-400 peer" required>
                    <label for="imie" class="absolute top-2 left-1 text-gray-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gray-400 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-gray-400">Imię *</label>
                </div>
                <div class="relative">
                    <input type="email" id="email_home" placeholder=" " class="block w-full bg-transparent border-0 border-b border-gray-600 text-gray-300 py-2 px-1 focus:outline-none focus:ring-0 focus:border-gray-400 peer" required>
                    <label for="email_home" class="absolute top-2 left-1 text-gray-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gray-400 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-gray-400">Adres e-mail *</label>
                </div>
                <div>
                    <div class="relative border border-gray-600 p-2 focus-within:border-gray-400 transition-colors">
                        <textarea id="wiadomosc_home" placeholder=" " rows="4" class="block w-full bg-transparent border-0 text-gray-300 py-2 px-1 focus:outline-none focus:ring-0 resize-none peer" required></textarea>
                        <label for="wiadomosc_home" class="absolute top-4 left-3 text-gray-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-gray-400 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-gray-400 bg-black px-1">Wiadomość *</label>
                    </div>
                    <div class="text-right text-gray-500 text-xs mt-1">0 / 9999</div>
                </div>
                <button type="submit" class="bg-[#d31a38] text-white font-medium py-3 px-6 rounded-sm self-start hover:bg-red-700 transition">Wyślij wiadomość</button>
            </form>
        </div>
    </div>
</section>