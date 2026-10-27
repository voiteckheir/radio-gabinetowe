<script lang="ts">
    import Seo from '$lib/Seo.svelte';
    
    let { data } = $props(); 
    let searchQuery = $state('');
    
    
    let przefiltrowaniArtysci = $derived(
        (data.artysci || []).filter((artysta: any) => 
            artysta.nazwa.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
</script>

<Seo 
    title="Artyści | Radio Gabinetowe"
    description="Poznaj artystów, z którymi współpracujemy!"
/>

<!-- Główne tło strony (Czarne) -->
<div class="bg-black min-h-screen pt-12 pb-24 w-full">
    <div class="max-w-7xl mx-auto px-4 w-full">
        
        <!-- NAGŁÓWEK I WYSZUKIWARKA -->
        <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            
            <h1 class="text-white text-3xl md:text-5xl font-black uppercase tracking-wider">
                Artyści
            </h1>
            
            <!-- Pasek wyszukiwania -->
            <div class="flex w-full md:w-80 shadow-lg">
                <input 
                    type="text" 
                    placeholder="SZUKAJ" 
                    bind:value={searchQuery}
                    class="w-full bg-[#d31a38] text-white placeholder-white/80 font-bold px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 uppercase tracking-widest text-sm"
                />
                <div class="bg-white text-black px-4 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition">
                    <!-- Ikona lupki -->
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                </div>
            </div>
            
        </div>

        <!-- linia oddzielająca -->
        <div class="h-px w-full bg-white/20 mb-10"></div>

        <!-- SIATKA ARTYSTÓW -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {#each przefiltrowaniArtysci as artysta (artysta._id)}
                
                <!-- Karta Artysty -->
                <a 
                    href="/artysci/{artysta.slug}" 
                    class="block bg-[#d31a38] p-3 transition-transform duration-300 hover:scale-105 hover:shadow-2xl group"
                >
                    
                    
                    <!-- Zdjęcie -->
                    <div class="w-full aspect-square bg-zinc-900 border-2 border-black flex items-center justify-center relative overflow-hidden">
                        {#if artysta.zdjecieUrl}
                            <img src={artysta.zdjecieUrl} alt={artysta.nazwa} class="w-full h-full object-cover" />
                        {:else}
                            <span class="text-zinc-600 font-bold tracking-widest">FOTO</span>
                        {/if}
                    </div>
                    
                    <!-- Tabliczka z imieniem -->
                    <div class="bg-black text-white text-center font-black uppercase text-lg sm:text-xl py-2 mt-3 border-2 border-black">
                        {artysta.nazwa}
                    </div>
                    
                </a>

            {/each}

            <!-- Komunikat gdy wyszukiwarka nie znajdzie wyników -->
            {#if przefiltrowaniArtysci.length === 0}
                <div class="col-span-full text-center text-white/60 py-10">
                    Brak artystów pasujących do frazy: <span class="text-white font-bold">"{searchQuery}"</span>
                </div>
            {/if}
            
        </div>
        
    </div>
</div>