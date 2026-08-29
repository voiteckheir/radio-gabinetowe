<!-- src/lib/CookieBanner.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';

    // Zmienna sterująca widocznością banera (na start ukryty, by uniknąć mignięcia)
    let isVisible = $state(false);

    onMount(() => {
        // Sprawdzamy, czy użytkownik już podjął decyzję
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Jeśli nie ma wpisu w pamięci, pokazujemy baner
            isVisible = true;
        }
    });

    function acceptAll() {
        localStorage.setItem('cookieConsent', 'all');
        isVisible = false;
        // TUTAJ W PRZYSZŁOŚCI DODAMY URUCHOMIENIE GOOGLE ANALYTICS
    }

    function acceptEssential() {
        localStorage.setItem('cookieConsent', 'essential');
        isVisible = false;
        // Skrypty śledzące pozostają wyłączone
    }
</script>

{#if isVisible}
    <div 
        role="region" 
        aria-label="Zgoda na pliki cookie"
        class="fixed bottom-0 left-0 w-full bg-zinc-900 border-t-4 border-[#d31a38] text-white z-100 shadow-2xl animate-in slide-in-from-bottom duration-500"
    >
        <div class="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div class="text-sm text-zinc-300 leading-relaxed md:pr-10">
                <p class="font-bold text-white mb-1">Szanujemy Twoją prywatność</p>
                Nasza strona używa ciasteczek (cookies). Niezbędne pliki zapewniają prawidłowe działanie odtwarzacza radiowego (np. zapamiętanie głośności). Jeśli wyrazisz zgodę, użyjemy również plików analitycznych (Google Analytics), aby badać słuchalność i rozwijać nasze radio. 
                Więcej informacji znajdziesz w naszej <a href="/polityka-prywatnosci" class="text-red-500 hover:text-white underline transition">Polityce Prywatności</a>.
            </div>

            <div class="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
                <button 
                    onclick={acceptEssential}
                    aria-label="Akceptuj tylko niezbędne pliki cookie"
                    class="border border-zinc-500 hover:border-white text-zinc-300 hover:text-white px-6 py-3 font-bold uppercase tracking-widest text-xs transition"
                >
                    Tylko niezbędne
                </button>
                <button 
                    onclick={acceptAll}
                    aria-label="Akceptuj wszystkie pliki cookie"
                    class="bg-[#d31a38] hover:bg-red-700 text-white px-6 py-3 font-bold uppercase tracking-widest text-xs transition shadow-lg"
                >
                    Akceptuj wszystkie
                </button>
            </div>
            
        </div>
    </div>
{/if}