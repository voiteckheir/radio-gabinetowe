<script lang="ts">
    // Importujemy 'page' store, żeby Svelte przekazało nam numer i opis błędu
    import { page } from '$app/stores';
</script>

<svelte:head>
    <title>Błąd {$page.status} | Radio Gabinetowe</title>
</svelte:head>

<!-- Używamy min-h-[70vh], żeby ładnie wpasowało się między menu a stopkę -->
<div class="min-h-[70vh] flex flex-col items-center justify-center bg-black text-white px-4 text-center py-20 w-full">
    
    <!-- Złowieszczy numer błędu (zazwyczaj 404) z czerwonym gradientem -->
    <h1 class="text-8xl md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#d31a38] to-red-900 mb-2 drop-shadow-lg leading-none">
        {$page.status}
    </h1>
    
    <h2 class="text-3xl md:text-5xl font-black uppercase tracking-widest mb-6">
        {#if $page.status === 404}
            Brak sygnału
        {:else}
            Usterka w studiu
        {/if}
    </h2>
    
    <p class="text-gray-400 text-lg max-w-lg mb-10 leading-relaxed">
        {#if $page.status === 404}
            Wygląda na to, że strona, której szukasz, nie istnieje lub audycja została przeniesiona na inne pasmo. Sprawdź poprawność linku.
        {:else}
            Napotkaliśmy niespodziewany błąd systemowy. Nasi technicy już nad tym pracują! 
            <br/><span class="text-sm text-red-500 mt-2 block">({$page.error?.message})</span>
        {/if}
    </p>

    <!-- Przycisk powrotu -->
    <a 
        href="/" 
        class="border-2 border-white hover:border-[#d31a38] bg-transparent hover:bg-[#d31a38] text-white font-bold py-4 px-8 uppercase tracking-widest transition duration-300 shadow-lg"
    >
        Wróć na główną antenę
    </a>
    
</div>