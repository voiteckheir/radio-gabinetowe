<script lang="ts">
    import { page } from '$app/stores';
    import Seo from '$lib/Seo.svelte';
    import { aktualnosci } from '$lib/data.js';

    // SvelteKit wyciąga "slug" z adresu URL
    let postSlug = $page.params.slug;
    
    // Szukamy odpowiedniego posta w naszym data.js
    let post = $derived(aktualnosci.find(p => p.slug === postSlug));
</script>

{#if post}
    <Seo 
        title="{post.tytul} | Radio Gabinetowe"
        description={post.opis}
    />

    <article class="max-w-4xl mx-auto px-4 py-16 text-white min-h-[70vh]">
        <a href="/" class="text-red-500 font-bold uppercase tracking-widest text-xs hover:text-white transition flex items-center gap-2 mb-8">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
            Wróć do aktualności
        </a>

        <div class="w-full aspect-video bg-zinc-900 border-2 border-zinc-800 mb-8 flex items-center justify-center">
            <span class="text-zinc-600 font-bold tracking-widest">Duże Zdjęcie z Sanity</span>
        </div>

        <h1 class="text-4xl md:text-5xl font-black mb-6 uppercase text-gray-100 leading-tight">
            {post.tytul}
        </h1>

        <!-- Klasa 'prose' z Tailwind Typography pięknie formatuje długie artykuły -->
        <div class="text-zinc-300 text-lg leading-relaxed space-y-6">
            <p>{post.pelnaTresc}</p>
        </div>
    </article>
{:else}
    <!-- Gdy postu o danym slugu nie ma w bazie -->
    <div class="min-h-[70vh] flex flex-col items-center justify-center text-white">
        <h1 class="text-4xl font-black mb-4">Artykuł nie istnieje</h1>
        <a href="/" class="text-red-500 hover:underline">Wróć na stronę główną</a>
    </div>
{/if}