<script lang="ts">
    import Seo from "$lib/Seo.svelte";
</script>



<Seo 
    title="Kontakt | Radio Gabinetowe"
    description="Skontaktuj się z nami!"
/>

<div class="max-w-5xl mx-auto bg-black p-8 md:p-12 shadow-sm rounded-lg border border-red-900 mt-4 mb-16">
    
    <!-- Nagłówek -->
    <div class="text-center mb-12">
        <h1 class="text-4xl font-black mb-6 border-b-4 border-red-800 inline-block pb-2">SKONTAKTUJ SIĘ Z NAMI</h1>
        <p class="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Masz pomysł na audycję? Tworzysz muzykę i chcesz ją usłyszeć na antenie? A może chcesz zapytać o naszych artystów? Napisz do Nas lub zadzwoń!
        </p>
    </div>

    <!-- Siatka: Lewa (Dane) / Prawa (Formularz) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
        
        <!-- LEWA KOLUMNA: Dane kontaktowe -->
        <div class="space-y-8 md:border-r border-gray-200 md:pr-12">
            <h2 class="text-2xl font-bold text-gray-200 mb-6">Dane adresowe</h2>
            
            <ul class="space-y-6 font-medium text-gray-300">
                <li class="flex items-start gap-4">
                    <span class="text-3xl mt-1">📍</span> 
                    <div>
                        <span class="block text-sm text-gray-400 uppercase tracking-wider mb-1">Adres Redakcji</span>
                        <span class="text-lg leading-tight">Dolna Panny Marii 63/5<br>20-010 Lublin</span>
                    </div>
                </li>
                <li class="flex items-start gap-4">
                    <span class="text-3xl mt-1">📧</span> 
                    <div>
                        <span class="block text-sm text-gray-400 uppercase tracking-wider mb-1">E-mail</span>
                        <a href="mailto:redakcja@radiogabinetowe.pl" class="text-lg font-bold hover:text-red-800 transition">
                            redakcja@radiogabinetowe.pl
                        </a>
                    </div>
                </li>
                <li class="flex items-start gap-4">
                    <span class="text-3xl mt-1">📞</span> 
                    <div>
                        <span class="block text-sm text-gray-400 uppercase tracking-wider mb-1">Telefon</span>
                        <div><a href="tel:536952520" class="text-lg font-bold hover:text-red-800 transition">
                            536 952 520
                        </a></div>
                        <div><a href="tel:534539268" class="text-lg font-bold hover:text-red-800 transition">
                            534 549 268
                        </a></div>
                    </div>
                </li>
            </ul>
            
            <!-- Placeholder na osadzenie Google Maps -->
            <div class="mt-10 h-56 bg-gray-100 rounded border border-gray-300 flex items-center justify-center p-4 text-center">
                <span class="text-gray-500 text-sm">
                    Tutaj wkleisz kod <b>iframe</b> z Google Maps (Podobnie jak przy kalendarzu)
                </span>
            </div>
        </div>
        
        <!-- PRAWA KOLUMNA: Formularz -->
        <div>
            <h2 class="text-2xl font-bold text-gray-200 mb-6">Napisz wiadomość</h2>
            
            <form class="flex flex-col gap-5">
                <div>
                    <label for="email" class="block text-sm font-bold text-gray-400 mb-1">Twój adres e-mail *</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-800 focus:ring-1 focus:ring-red-800 transition bg-gray-50" 
                        required
                    >
                </div>
                
                <div>
                    <label for="subject" class="block text-sm font-bold text-gray-400 mb-1">Temat *</label>
                    <input 
                        type="text" 
                        id="subject" 
                        name="subject" 
                        class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-800 focus:ring-1 focus:ring-red-800 transition bg-gray-50" 
                        required
                    >
                </div>
                
                <div>
                    <label for="message" class="block text-sm font-bold text-gray-400 mb-1">Treść wiadomości *</label>
                    <textarea 
                        id="message" 
                        name="message" 
                        rows="6" 
                        class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-800 focus:ring-1 focus:ring-red-800 transition bg-gray-50 resize-y" 
                        required
                    ></textarea>
                </div>
                
                <button 
                    type="submit" 
                    class="bg-red-800 text-white font-bold p-4 rounded mt-4 hover:bg-red-900 transition shadow-sm w-full uppercase tracking-wide"
                >
                    Wyślij wiadomość
                </button>
            </form>
        </div>
        
    </div>
</div>