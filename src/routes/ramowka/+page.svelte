<script lang="ts">

    import Seo from "$lib/Seo.svelte";
    // 1. Definiujemy typ dla TypeScriptu, żeby uniknąć błędu 'any'
    type Audycja = {
        id: number;
        czas: string;
        tytul: string;
        prowadzacy: string;
        obrazek: string;
        opis: string;
        linkPodcast: string | null;
    };

    // Dodano unikalne 'id' dla każdego dnia, aby rozwiązać problem braku klucza w pętli
    const dniTygodnia = [
        { id: 1, data: '07.08', dzien: 'PT.', aktywne: false },
        { id: 2, data: '08.08', dzien: 'SB.', aktywne: false },
        { id: 3, data: 'Wczoraj', dzien: 'ND.', aktywne: false },
        { id: 4, data: 'Dzisiaj', dzien: 'PN.', aktywne: true },
        { id: 5, data: 'Jutro', dzien: 'WT.', aktywne: false },
        { id: 6, data: '12.08', dzien: 'ŚR.', aktywne: false },
        { id: 7, data: '13.08', dzien: 'CZ.', aktywne: false }
    ];

    const audycje: Audycja[] = [
        { 
            id: 1, 
            czas: '06:00', 
            tytul: 'Poranne Witaminy', 
            prowadzacy: 'Blok Muzyczny',
            obrazek: 'FOTO',
            opis: 'Najlepsza muzyka na przebudzenie. Rozpocznij dzień z pozytywną energią i największymi hitami, które postawią Cię na nogi.',
            linkPodcast: null
        },
        { 
            id: 2, 
            czas: '10:00', 
            tytul: 'Kawał Ciężkiego Metalu', 
            prowadzacy: 'Redakcja',
            obrazek: 'FOTO',
            opis: 'Dwie godziny bezkompromisowych brzmień. Przegląd najnowszych wydawnictw ze świata metalu oraz klasyki, które kształtowały gatunek.',
            linkPodcast: 'https://youtube.com'
        },
        { 
            id: 3, 
            czas: '13:00', 
            tytul: 'Reklasycznie', 
            prowadzacy: 'Blok Muzyczny',
            obrazek: 'FOTO',
            opis: 'Zupełnie nowe spojrzenie na klasykę. Utwory, które znasz, w aranżacjach, których się nie spodziewasz.',
            linkPodcast: null
        },
        { 
            id: 4, 
            czas: '18:00', 
            tytul: 'Wkraczając w film', 
            prowadzacy: 'Marcin Polak',
            obrazek: 'FOTO',
            opis: 'Analiza muzyki i motywów dźwiękowych w kultowych dziełach kinematografii. Dziś na warsztat bierzemy Trzy bilbordy za Ebbing, Missouri.',
            linkPodcast: 'https://youtube.com'
        }
    ];

    // Zamiast 'any' używamy naszego typu 'Audycja' lub 'null'
    let wybranaAudycja: Audycja | null = $state(null);

    // TypeScript wie teraz dokładnie, czym jest 'audycja'
    function otworzModal(audycja: Audycja) {
        wybranaAudycja = audycja;
        if (typeof document !== 'undefined') document.body.style.overflow = 'hidden';
    }

    function zamknijModal() {
        wybranaAudycja = null;
        if (typeof document !== 'undefined') document.body.style.overflow = '';
    }

    function klikniecieWTlo(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            zamknijModal();
        }
    }
</script>

<Seo 
    title="Ramówka | Radio Gabinetowe"
    description="Tak gramy!"
/>

<div class="bg-black min-h-screen pt-8 pb-24 w-full text-white">
    <div class="max-w-5xl mx-auto px-4 w-full">
        
        <h1 class="text-3xl md:text-5xl font-black uppercase tracking-wider mb-10 text-center">
            Ramówka
        </h1>

        <div class="flex overflow-x-auto gap-4 md:justify-center border-b border-zinc-800 pb-4 mb-10 no-scrollbar">
            <!-- Dodano klucz (dzien.id) do pętli -->
            {#each dniTygodnia as dzien (dzien.id)}
                <button 
                    class="flex flex-col items-center justify-center min-w-[80px] group transition"
                >
                    <span class="text-lg md:text-xl font-bold {dzien.aktywne ? 'text-white' : 'text-zinc-400 group-hover:text-red-400'} transition">
                        {dzien.data}
                    </span>
                    <span class="text-xs font-black tracking-widest mt-1 {dzien.aktywne ? 'bg-[#d31a38] text-white px-2 py-0.5' : 'text-zinc-600'} transition">
                        {dzien.dzien}
                    </span>
                </button>
            {/each}
        </div>

        <div class="flex flex-col gap-4">
            <!-- Dodano klucz (audycja.id) do pętli -->
            {#each audycje as audycja (audycja.id)}
                <button 
                    onclick={() => otworzModal(audycja)}
                    class="w-full bg-zinc-900 border border-zinc-800 p-4 md:p-6 flex flex-col md:flex-row gap-6 md:items-center text-left hover:bg-zinc-800 transition duration-300 group shadow-sm"
                >
                    <div class="text-3xl md:text-4xl font-black text-red-500 w-24 shrink-0 drop-shadow-md">
                        {audycja.czas}
                    </div>
                    
                    <div class="w-20 h-20 bg-zinc-800 border-2 border-black flex items-center justify-center shrink-0 shadow-inner group-hover:border-[#d31a38] transition-colors">
                        <span class="text-zinc-600 font-bold text-xs tracking-widest">{audycja.obrazek}</span>
                    </div>
                    
                    <div class="flex flex-col grow">
                        <h3 class="text-xl md:text-2xl font-bold mb-1 text-white group-hover:text-red-400 transition-colors">
                            {audycja.tytul}
                        </h3>
                        <p class="text-sm font-medium text-zinc-400 uppercase tracking-widest">
                            {audycja.prowadzacy}
                        </p>
                    </div>

                    <div class="hidden md:flex items-center text-zinc-600 group-hover:text-white transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                        </svg>
                    </div>
                </button>
            {/each}
        </div>
        
    </div>
</div>

{#if wybranaAudycja}
    <!-- Zmieniono z-[100] na z-100 zgodnie z sugestią Tailwind v4 -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div 
        class="fixed inset-0 bg-black/85 z-100 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity"
        onclick={klikniecieWTlo}
    >
        <div class="bg-zinc-900 border-2 border-zinc-800 w-full max-w-2xl shadow-2xl relative flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <button 
                onclick={zamknijModal}
                class="absolute top-2 right-2 text-zinc-400 hover:text-white bg-black/50 hover:bg-red-600 rounded p-1 transition-colors z-10"
                aria-label="Zamknij"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>

            <!-- Zmieniono min-w-[200px] na min-w-50 zgodnie z sugestią Tailwind v4 -->
            <div class="bg-zinc-950 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-zinc-800 min-w-50">
                <div class="text-4xl font-black text-red-500 mb-4">{wybranaAudycja.czas}</div>
                <div class="w-32 h-32 bg-zinc-800 border-2 border-black flex items-center justify-center shadow-lg">
                    <span class="text-zinc-600 font-bold">{wybranaAudycja.obrazek}</span>
                </div>
            </div>

            <div class="p-6 md:p-8 flex flex-col justify-center grow">
                <p class="text-red-500 font-bold uppercase tracking-widest text-xs mb-2">
                    {wybranaAudycja.prowadzacy}
                </p>
                <h2 class="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                    {wybranaAudycja.tytul}
                </h2>
                <p class="text-zinc-300 text-sm md:text-base leading-relaxed mb-8">
                    {wybranaAudycja.opis}
                </p>
                
                {#if wybranaAudycja.linkPodcast}
                    <a 
                        href={wybranaAudycja.linkPodcast} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="mt-auto bg-[#d31a38] hover:bg-red-700 text-white font-bold uppercase tracking-widest text-sm py-3 px-6 text-center transition shadow-lg flex items-center justify-center gap-2 self-start"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M8 5v14l11-7z"/></svg>
                        Posłuchaj Podcastu
                    </a>
                {/if}
            </div>

        </div>
    </div>
{/if}

<style>
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }
    .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>