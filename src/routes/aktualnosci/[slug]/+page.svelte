<script lang="ts">
    import Seo from '$lib/Seo.svelte';
    
    let { data } = $props();

    let post = $derived(data.post);
</script>

<Seo title="{post.tytul} | Radio Gabinetowe" />

<div class="max-w-4xl mx-auto px-4 py-12">
    <!-- Przycisk powrotu -->
    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
    <a href="/" class="text-red-500 hover:text-red-400 font-bold uppercase text-xs mb-8 inline-block">
        ← Wróć do aktualności
    </a>

    {#if post.imageUrl}
        <img src={post.imageUrl} alt={post.tytul} class="w-full h-64 md:h-96 object-cover rounded-lg mb-8" />
    {/if}

    <h1 class="text-3xl md:text-5xl font-black text-white mb-6 uppercase leading-tight">
        {post.tytul}
    </h1>
    <!-- Treść danego postu -->
    <div class="text-gray-300 text-lg leading-relaxed space-y-4">
        {#if post.tresc}
            {#each post.tresc as blok, i (i)}
                {#if blok._type === 'block' && blok.children}
                    <p>{blok.children.map((child: any) => child.text).join('')}</p>
                {/if}
            {/each}
        {/if}
    </div>
</div>