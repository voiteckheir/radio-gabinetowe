<script lang="ts">
    import Seo from "$lib/Seo.svelte";

    // --- STAN FORMULARZA ---
    let email = $state('');
    let subject = $state('');
    let message = $state('');
    
    // NOWOŚĆ: Zmienna pułapki na boty (Honeypot)
    let honeypot = $state(''); 
    
    // Status: 'idle' (gotowy), 'loading' (wysyła), 'success' (sukces), 'error' (błąd)
    let status = $state('idle');
    let komunikatBledu = $state('');

    // Funkcja walidująca poprawność e-maila
    function sprawdzEmail(adres: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(adres);
    }

    async function wyslijWiadomosc(event: Event) {
        event.preventDefault(); // Zatrzymuje przeładowanie strony
        status = 'idle';
        komunikatBledu = '';

        // 1. Walidacja
        if (!sprawdzEmail(email)) {
            status = 'error';
            komunikatBledu = 'Podaj poprawny adres e-mail.';
            return;
        }
        if (subject.trim().length < 2) {
            status = 'error';
            komunikatBledu = 'Temat musi mieć co najmniej 2 znaki.';
            return;
        }
        if (message.trim().length < 10) {
            status = 'error';
            komunikatBledu = 'Wiadomość musi mieć co najmniej 10 znaków.';
            return;
        }

        // 2. Rozpoczęcie wysyłania
        status = 'loading';
        
        try {
            // Prawdziwe wysłanie na nasz nowy endpoint
            const odpowiedz = await fetch('/api/kontakt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // WYSYŁAMY TEŻ HONEYPOT!
                body: JSON.stringify({ email, subject, message, honeypot }) 
            });

            // Odbieramy odpowiedź z serwera
            const wynik = await odpowiedz.json();

            if (!odpowiedz.ok || !wynik.success) {
                // Jeśli serwer zgłosił błąd (np. za dużo maili z tego IP), rzucamy błąd
                throw new Error(wynik.message || 'Błąd z serwera pocztowego');
            }
            
            // 3. Sukces i czyszczenie
            status = 'success';
            email = '';
            subject = '';
            message = '';
            honeypot = '';
            
            setTimeout(() => {
                status = 'idle';
            }, 5000);

        } catch (error: any) {
            status = 'error';
            // Wyświetlamy konkretny błąd (zwrócony z serwera) albo domyślny
            komunikatBledu = error.message || 'Wystąpił błąd serwera pocztowego. Spróbuj ponownie za chwilę.';
        }
    }
</script>

<Seo 
    title="Kontakt | Radio Gabinetowe"
    description="Skontaktuj się z nami! Masz pomysł na audycję? Napisz do Nas lub zadzwoń!"
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
        <div class="space-y-8 md:border-r border-gray-800 md:pr-12">
            <h2 class="text-2xl font-bold text-gray-200 mb-6">Dane adresowe</h2>
            
            <ul class="space-y-6 font-medium text-gray-300">
                <li class="flex items-start gap-4">
                    <span class="text-3xl mt-1">📍</span> 
                    <div>
                        <span class="block text-sm text-gray-400 uppercase tracking-wider mb-1">Adres Redakcji</span>
                        <span class="text-lg leading-tight text-white">Dolna Panny Marii 63/5<br>20-010 Lublin</span>
                    </div>
                </li>
                <li class="flex items-start gap-4">
                    <span class="text-3xl mt-1">📧</span> 
                    <div>
                        <span class="block text-sm text-gray-400 uppercase tracking-wider mb-1">E-mail</span>
                        <a href="mailto:redakcja@radiogabinetowe.pl" class="text-lg font-bold text-white hover:text-red-500 transition">
                            redakcja@radiogabinetowe.pl
                        </a>
                    </div>
                </li>
                <li class="flex items-start gap-4">
                    <span class="text-3xl mt-1">📞</span> 
                    <div>
                        <span class="block text-sm text-gray-400 uppercase tracking-wider mb-1">Telefon</span>
                        <div><a href="tel:+48536952520" class="text-lg font-bold text-white hover:text-red-500 transition">
                            536 952 520
                        </a></div>
                        <div><a href="tel:+48534549268" class="text-lg font-bold text-white hover:text-red-500 transition">
                            534 549 268
                        </a></div>
                    </div>
                </li>
            </ul>
            
            <!-- Placeholder na osadzenie Google Maps -->
            <div class="mt-10 h-56 bg-zinc-900 rounded border border-zinc-800 flex items-center justify-center p-4 text-center">
                <span class="text-gray-500 text-sm">
                    Tutaj wkleisz kod <b>iframe</b> z Google Maps (Podobnie jak przy kalendarzu)
                </span>
            </div>
        </div>
        
        <!-- PRAWA KOLUMNA: Formularz -->
        <div>
            <h2 class="text-2xl font-bold text-gray-200 mb-6">Napisz wiadomość</h2>
            
            <form onsubmit={wyslijWiadomosc} class="flex flex-col gap-5">
                <div>
                    <label for="email" class="block text-sm font-bold text-gray-400 mb-1">Twój adres e-mail *</label>
                    <input 
                        type="email" 
                        id="email" 
                        bind:value={email}
                        disabled={status === 'loading'}
                        class="w-full p-3 border border-gray-600 text-black rounded focus:outline-none focus:border-red-800 focus:ring-1 focus:ring-red-800 transition bg-gray-50 disabled:opacity-50" 
                        placeholder="example@example.pl"
                        autocomplete="email"
                        required
                    >
                </div>
                
                <div>
                    <label for="subject" class="block text-sm font-bold text-gray-400 mb-1">Temat *</label>
                    <input 
                        type="text" 
                        id="subject" 
                        bind:value={subject}
                        disabled={status === 'loading'}
                        class="w-full p-3 border border-gray-600 text-black rounded focus:outline-none focus:border-red-800 focus:ring-1 focus:ring-red-800 transition bg-gray-50 disabled:opacity-50" 
                        placeholder="Umówienie próby/Nagranie podcastu/Współpraca itp."
                        minlength="3"
                        required
                    >
                </div>
                
                <div>
                    <label for="message" class="block text-sm font-bold text-gray-400 mb-1">Treść wiadomości *</label>
                    <textarea 
                        id="message" 
                        bind:value={message}
                        disabled={status === 'loading'}
                        rows="6" 
                        class="w-full p-3 border border-gray-600 text-black rounded focus:outline-none focus:border-red-800 focus:ring-1 focus:ring-red-800 transition bg-gray-50 resize-y disabled:opacity-50" 
                        placeholder="Napisz nam, czego potrzebujesz!"
                        minlength="10"
                        required
                    ></textarea>
                    <div class="text-right text-gray-500 text-xs mt-1">{message.length} / 2000</div>
                </div>

                <!-- NOWOŚĆ: Ukryte pole Honeypot. Używamy opasity-0 i absolute, żeby czytniki ekranowe i boty myślały, że to normalne pole -->
                <div class="absolute opacity-0 -z-50 h-0 overflow-hidden" aria-hidden="true">
                    <label for="website_url">Strona WWW</label>
                    <input type="text" id="website_url" name="website_url" bind:value={honeypot} tabindex="-1" autocomplete="off">
                </div>
                
                <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    class="bg-red-800 text-white font-bold p-4 rounded mt-4 hover:bg-red-900 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm w-full uppercase tracking-wide"
                >
                    {status === 'loading' ? 'WYSYŁANIE...' : 'WYŚLIJ WIADOMOŚĆ'}
                </button>

                <!-- Komunikaty zwrotne pod formularzem -->
                {#if status === 'success'}
                    <div class="bg-green-900/50 border border-green-800 text-green-400 p-4 rounded text-center text-sm font-bold">
                        Dziękujemy! Wiadomość została wysłana pomyślnie. Niedługo odpowiemy!
                    </div>
                {/if}
                {#if status === 'error'}
                    <div class="bg-red-900/50 border border-red-800 text-red-400 p-4 rounded text-center text-sm font-bold">
                        {komunikatBledu}
                    </div>
                {/if}
            </form>
        </div>
        
    </div>
</div>