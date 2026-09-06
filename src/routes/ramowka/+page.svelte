<script lang="ts">
    import Seo from "$lib/Seo.svelte";
    // ZMIANA: Usunęliśmy dniTygodnia z importu, generujemy je lokalnie
    import { wszystkieAudycje } from "$lib/data.js";

    type Audycja = {
        id: number;
        dzienId: number;
        czas: string;
        tytul: string;
        prowadzacy: string;
        obrazek: string;
        opis: string;
        linkPodcast: string | null;
    };

    // Uciszamy lintera, bo data jest potrzebna tylko do jednorazowego wygenerowania paska
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    function generujDniTygodnia() {
        const dniNazwy = ['ND.', 'PN.', 'WT.', 'ŚR.', 'CZ.', 'PT.', 'SB.'];
        // eslint-disable-next-line svelte/prefer-svelte-reactivity
        const dzisiaj = new Date();
        const wynik = [];

        for (let i = -3; i <= 3; i++) {
            // eslint-disable-next-line svelte/prefer-svelte-reactivity
            const data = new Date();
            data.setDate(dzisiaj.getDate() + i);
            
            let etykieta = '';
            if (i === -1) etykieta = 'Wczoraj';
            else if (i === 0) etykieta = 'Dzisiaj';
            else if (i === 1) etykieta = 'Jutro';
            else {
                const d = String(data.getDate()).padStart(2, '0');
                const m = String(data.getMonth() + 1).padStart(2, '0');
                etykieta = `${d}.${m}`;
            }

            wynik.push({
                id: i,
                data: etykieta,
                dzien: dniNazwy[data.getDay()],
                prawdziwyDzienTygodnia: data.getDay() 
            });
        }
        return wynik;
    }

    const dniTygodnia = generujDniTygodnia();
    
    // Zmienne zdefiniowane TYLKO RAZ
    let aktywnyDzienId = $state(0); 
    let widoczneAudycje = $derived(wszystkieAudycje.filter(a => a.dzienId === aktywnyDzienId));
    let wybranaAudycja: Audycja | null = $state(null);

    function otworzModal(audycja: Audycja) {
        wybranaAudycja = audycja;
        if (typeof document !== 'undefined') document.body.style.overflow = 'hidden';
    }

    function zamknijModal() {
        wybranaAudycja = null;
        if (typeof document !== 'undefined') document.body.style.overflow = '';
    }

    function klikniecieWTlo(event: MouseEvent | KeyboardEvent) {
        if (event.type === 'keydown' && (event as KeyboardEvent).key !== 'Escape' && (event as KeyboardEvent).key !== 'Enter') return;
        if (event.target === event.currentTarget) {
            zamknijModal();
        }
    }
</script>

<Seo 
    title="Ramówka | Radio Gabinetowe"
    description="Tak gramy! Sprawdź harmonogram audycji Radia Gabinetowego na ten tydzień."
/>

<div class="bg-black min-h-screen pt-8 pb-24 w-full text-white">
    <div class="max-w-5xl mx-auto px-4 w-full">
        
        <h1 class="text-3xl md:text-5xl font-black uppercase tracking-wider mb-10 text-center">
            Ramówka
        </h1>

        <nav aria-label="Nawigacja po dniach tygodnia" class="flex overflow-x-auto gap-4 md:justify-center border-b border-zinc-800 pb-4 mb-10 no-scrollbar">
            {#each dniTygodnia as dzien (dzien.id)}
                <button 
                    onclick={() => aktywnyDzienId = dzien.id}
                    aria-current={aktywnyDzienId === dzien.id ? 'page' : undefined}
                    class="flex flex-col items-center justify-center min-w-20 group transition"
                >
                    <span class="text-lg md:text-xl font-bold {aktywnyDzienId === dzien.id ? 'text-white' : 'text-zinc-400 group-hover:text-red-400'} transition">
                        {dzien.data}
                    </span>
                    <span class="text-xs font-black tracking-widest mt-1 {aktywnyDzienId === dzien.id ? 'bg-[#d31a38] text-white px-2 py-0.5' : 'text-zinc-600'} transition">
                        {dzien.dzien}
                    </span>
                </button>
            {/each}
        </nav>

        <div class="flex flex-col gap-4">
            {#if widoczneAudycje.length === 0}
                <div class="text-center text-zinc-500 py-10 font-bold uppercase tracking-widest">
                    Brak audycji tego dnia.
                </div>
            {/if}

            {#each widoczneAudycje as audycja (audycja.id)}
                <button 
                    aria-label="Otwórz szczegóły audycji: {audycja.tytul} o {audycja.czas}"
                    onclick={() => otworzModal(audycja)}
                    class="w-full bg-zinc-900 border border-zinc-800 p-4 md:p-6 flex flex-col md:flex-row gap-6 md:items-center text-left hover:bg-zinc-800 transition duration-300 group shadow-sm"
                >
                    <div class="text-3xl md:text-4xl font-black text-red-500 w-24 shrink-0 drop-shadow-md">
                        {audycja.czas}
                    </div>
                    
                    <div class="w-20 h-20 bg-zinc-800 border-2 border-black flex items-center justify-center shrink-0 shadow-inner group-hover:border-[#d31a38] transition-colors" aria-hidden="true">
                        <span class="text-zinc-600 font-bold text-xs tracking-widest">{audycja.obrazek}</span>
                    </div>
                    
                    <div class="flex flex-col grow">
                        <h2 class="text-xl md:text-2xl font-bold mb-1 text-white group-hover:text-red-400 transition-colors">
                            {audycja.tytul}
                        </h2>
                        <p class="text-sm font-medium text-zinc-400 uppercase tracking-widest">
                            {audycja.prowadzacy}
                        </p>
                    </div>

                    <div class="hidden md:flex items-center text-zinc-600 group-hover:text-white transition-colors" aria-hidden="true">
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
    <div 
        role="button"
        tabindex="0"
        aria-label="Zamknij szczegóły audycji"
        class="fixed inset-0 bg-black/85 z-100 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity"
        onclick={klikniecieWTlo}
        onkeydown={klikniecieWTlo}
    >
        <div 
            role="dialog" 
            tabindex="-1"
            aria-modal="true" 
            aria-labelledby="modal-tytul"
            onclick={(e) => e.stopPropagation()}
            onkeydown={(e) => e.stopPropagation()}
            class="bg-zinc-900 border-2 border-zinc-800 w-full max-w-2xl shadow-2xl relative flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-200 cursor-default"
        >
            <button 
                onclick={zamknijModal}
                class="absolute top-2 right-2 text-zinc-400 hover:text-white bg-black/50 hover:bg-red-600 rounded p-1 transition-colors z-10"
                aria-label="Zamknij"
            >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>

            <div class="bg-zinc-950 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-zinc-800 min-w-50" aria-hidden="true">
                <div class="text-4xl font-black text-red-500 mb-4">{wybranaAudycja.czas}</div>
                <div class="w-32 h-32 bg-zinc-800 border-2 border-black flex items-center justify-center shadow-lg">
                    <span class="text-zinc-600 font-bold">{wybranaAudycja.obrazek}</span>
                </div>
            </div>

            <div class="p-6 md:p-8 flex flex-col justify-center grow">
                <p class="text-red-500 font-bold uppercase tracking-widest text-xs mb-2">
                    {wybranaAudycja.prowadzacy}
                </p>
                <h2 id="modal-tytul" class="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                    {wybranaAudycja.tytul}
                </h2>
                <p class="text-zinc-300 text-sm md:text-base leading-relaxed mb-8">
                    {wybranaAudycja.opis}
                </p>
                
                {#if wybranaAudycja.linkPodcast}
                    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
                    <a 
                        href={wybranaAudycja.linkPodcast} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="mt-auto bg-[#d31a38] hover:bg-red-700 text-white font-bold uppercase tracking-widest text-sm py-3 px-6 text-center transition shadow-lg flex items-center justify-center gap-2 self-start"
                        aria-label="Posłuchaj Podcastu {wybranaAudycja.tytul} na zewnątrz"
                    >
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M8 5v14l11-7z"/></svg>
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