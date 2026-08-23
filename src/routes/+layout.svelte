<script lang="ts">
    import { player } from '$lib/player.svelte.js';
    import { page } from '$app/stores';
    import '../app.css'; 

    import CookieBanner from '$lib/CookieBanner.svelte';

    let { children } = $props(); 
    
    let audioElement: HTMLAudioElement;

	// Zmienna przechowująca głośność przed wyciszeniem
    let previousVolume = 0.5;

    $effect(() => {
        if (audioElement) {
            audioElement.volume = player.volume;
        }
    });

	// Reagowanie na zmianę źródła dźwięku (streamUrl)
    // Kiedy zmieniamy radio na podcast, musimy wymusić play()
    $effect(() => {
        let url = player.streamUrl;
        if (audioElement && player.isPlaying) {
            // Używamy setTimeout by dać Svelte ułamek sekundy na podmianę atrybutu src w HTML
            setTimeout(() => {
                audioElement.play().catch(e => console.error("Błąd odtwarzania:", e));
            }, 50);
        }
    });

    function togglePlay() {
        if (player.isPlaying) {
            audioElement.pause();
            player.isPlaying = false;
        } else {
            audioElement.play().catch((error: unknown) => {
                console.error("Błąd odtwarzania:", error);
            });
            player.isPlaying = true;
        }
    }
	// Funkcja wyciszająca / odciszająca
    function toggleMute() {
        if (player.volume > 0) {
            previousVolume = player.volume; // Zapisujemy obecną głośność
            player.volume = 0;              // Wyciszamy do 0
        } else {
            // Wracamy do poprzedniej, chyba że wynosiła 0 - wtedy dajemy domyślne 50%
            player.volume = previousVolume > 0 ? previousVolume : 0.5; 
        }
    }

	// Funkcja powrotu do radia na żywo
    function backToLive() {
        player.isLive = true;
        player.streamUrl = player.liveStreamUrl;
        // Resetujemy metadane do domyślnych (później będzie to robić API)
        player.currentTitle = 'Klucz do autostrady';
        player.currentSubtitle = 'TOMASZ HATYLAK';
        player.currentImage = null;
        player.isPlaying = true;
    }
</script>

<audio bind:this={audioElement} src={player.streamUrl} preload="none"></audio>

<div class="min-h-screen flex flex-col bg-black font-sans text-gray-100">
    
    <!-- GÓRNY PASEK (PLAYER + MENU) -->
    <div class="sticky top-0 z-50 w-full flex flex-col">
        
<!-- ODTWARZACZ -->
        <div class="bg-red-800 text-white w-full border-b-[6px] border-zinc-900 relative z-20 transition-colors duration-500">
            <div class="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
                
                <div class="flex items-center gap-4 w-full md:w-auto overflow-hidden">
                    
                    <!-- KONTENER NA ZACHĘTĘ "SŁUCHAJ" I PRZYCISK PLAY -->
                    <div class="flex items-center gap-3 shrink-0">
                        <!-- Napis pojawia się tylko, gdy odtwarzacz jest zatrzymany -->
                        {#if !player.isPlaying}
                            <span class="hidden sm:inline-block text-sm font-black uppercase tracking-widest text-red-200 animate-pulse">
                                Słuchaj ➔
                            </span>
                        {/if}

                        <button 
                            onclick={togglePlay}
                            class="w-14 h-14 shrink-0 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-red-800 transition text-white"
                        >
                            {#if player.isPlaying}
                                <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                            {:else}
                                <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 ml-1"><path d="M8 5v14l11-7z"/></svg>
                            {/if}
                        </button>
                    </div>
                    
                    <!-- KONTENER NA ZDJĘCIE (Renderowany tylko wtedy, gdy currentImage istnieje) -->
                    {#if player.currentImage}
                        <div class="w-14 h-14 shrink-0 bg-red-950 overflow-hidden flex items-center justify-center relative shadow-inner">
                            <img src={player.currentImage} alt="Okładka" class="w-full h-full object-cover" />
                        </div>
                    {/if}
                    
                    <div class="flex flex-col justify-center min-w-0">
                        <div class="flex items-center gap-2 mb-0.5">
                            {#if player.isLive}
                                <span class="bg-zinc-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm tracking-wider shadow-sm">TERAZ</span>
                            {:else}
                                <span class="bg-white text-red-900 text-[10px] font-bold px-1.5 py-0.5 rounded-sm tracking-wider shadow-sm">PODCAST</span>
                            {/if}
                            <span class="text-xs uppercase tracking-wider font-semibold text-red-100 truncate">{player.currentSubtitle}</span>
                        </div>
                        <h3 class="font-bold text-xl md:text-2xl leading-none truncate w-full max-w-50 md:max-w-md">
                            {player.currentTitle}
                        </h3>
                    </div>
                </div>

                <div class="flex items-center gap-4 justify-end w-full md:w-auto text-sm font-medium">
                    {#if !player.isLive}
                        <button 
                            onclick={backToLive}
                            class="bg-zinc-900 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider transition shadow-md flex items-center gap-2 border border-zinc-700"
                        >
                            <span class="text-red-500 text-lg leading-none">●</span> Wróć do live
                        </button>
                    {/if}
                    
                    <div class="flex items-center gap-2 shrink-0 ml-2 md:ml-4">
                        <button onclick={toggleMute} class="text-white hover:text-red-300 transition" aria-label="Wycisz">
                            {#if player.volume === 0}
                                <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
                            {:else}
                                <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                            {/if}
                        </button>
                        <input type="range" min="0" max="1" step="0.05" bind:value={player.volume} class="w-20 md:w-24 accent-white cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>

        <!-- MENU GŁÓWNE (Gradient nachodzący na treść) -->
        <!-- absolute układa menu "na" treści pod spodem, bg-gradient-to-b robi płynne przejście -->
        <header class="absolute top-full left-0 w-full z-10 bg-linear-to-b from-black/90 via-black/50 to-transparent pb-8">
            <div class="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
                
                <!-- Klikalne logo odsyłające do strony głównej -->
                <a href="/" class="block transition hover:opacity-80">
                    <!-- Załóżmy, że plik nazywa się logo-biale.webp w folderze static -->
                    <img src="loga-gabinet/radio-logo-full-biale.webp" alt="Gab In Net" class="h-12 md:h-16 w-auto object-contain" />
                </a>

                <!-- eslint-disable svelte/no-navigation-without-resolve -->
                <nav class="flex flex-wrap justify-center gap-8 text-sm font-black tracking-[0.15em] uppercase text-white">
                    <a href="/ramowka" class="hover:text-red-500 transition drop-shadow-md">RAMÓWKA</a>
                    <a href="/artysci" class="hover:text-red-500 transition drop-shadow-md">ARTYŚCI</a>
                    <a href="/studio" class="hover:text-red-500 transition drop-shadow-md">STUDIO</a>
                    <a href="/kontakt" class="hover:text-red-500 transition drop-shadow-md">KONTAKT</a>
                </nav>
                <!-- eslint-enable svelte/no-navigation-without-resolve -->
                
            </div>
        </header>

    </div>

<!-- GŁÓWNA TREŚĆ STRONY -->
    <!-- DYNAMICZNY MARGINES: Jeśli jesteśmy na podstronie (czyli URL jest różny od '/'), dodajemy 'pt-28 md:pt-36' aby wypchnąć treść spod menu -->
    <main class="grow w-full flex flex-col relative z-0 {$page.url.pathname === '/' ? '' : 'pt-28 md:pt-36'}">
        {@render children()}
    </main>
	<!-- GLOBALNA STOPKA (FOOTER) -->
    <footer class="bg-black text-white w-full border-t border-zinc-800 py-10 mt-auto">
        <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            
            <!-- LEWA STRONA: Główne logo -->
            <div class="flex justify-center md:justify-start w-full md:w-1/3">
                <img src="loga-gabinet/radio-logo-full-biale.webp" alt="Gab In Net" class="h-16 w-auto object-contain" />
            </div>

            <!-- ŚRODEK: Prawa autorskie i Social Media -->
            <div class="flex flex-col items-center justify-center w-full md:w-1/3 gap-4">
                <div class="text-xs text-gray-400 font-medium tracking-wide">
                    <p class="mb-1">&copy; {new Date().getFullYear()} Gab in Net – Radio Gabinetowe</p>
                    <p>Wszystkie prawa zastrzeżone. | <a href="/polityka-prywatnosci" class="hover:text-red-500 transition">Polityka Prywatności</a></p>
                </div>
                
                <!-- Social media -->
                <div class="flex gap-5 mt-2">
                    <!-- Facebook -->
                    <a href="https://www.facebook.com/radiogabinetowe/" target="_blank" rel="noopener noreferrer" class="text-white hover:text-red-500 transition" aria-label="Facebook">
                        <svg fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"/></svg>
                    </a>
                    <!-- Instagram -->
                    <a href="https://www.instagram.com/radiogabinetowe/" target="_blank" rel="noopener noreferrer" class="text-white hover:text-red-500 transition" aria-label="Instagram">
                        <svg fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"/></svg>
                    </a>
                    <!-- YouTube -->
                    <a href="https://www.youtube.com/@GabInNet" target="_blank" rel="noopener noreferrer" class="text-white hover:text-red-500 transition" aria-label="YouTube">
                        <svg fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6"><path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.253 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.769-1.768C5.748 5 11.998 5 11.998 5s6.253 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clip-rule="evenodd"/></svg>
                    </a>
                </div>
            </div>

            <!-- PRAWA STRONA: Pionowe Logo (Dodatkowe) -->
            <div class="flex justify-center md:justify-end w-full md:w-1/3">
                <!-- Załóżmy, że podłużne/prostokątne logo zapisałeś jako logo-pionowe.webp -->
                <img src="loga-gabinet/fundacja-logo-G-biale.webp" alt="Gab In Net - Sygnet" class="h-24 w-auto object-contain opacity-90" />
            </div>
            
        </div>
    </footer>
<!-- Baner Cookies na samym wierzchu -->
    <CookieBanner />
</div>