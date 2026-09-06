<script>
    import { onMount } from 'svelte';

    // TUTAJ PODMIENISZ ADRES IP NA TEN Z UBUNTU
    const RADIO_IP = "http://192.168.0.53"; 
    
    const audioUrl = `${RADIO_IP}/listen/gab_in_net/radio.mp3`;
    const apiUrl = `${RADIO_IP}/api/nowplaying/gab_in_net`;

    let nowPlaying = null;

    // Funkcja pobierająca dane z AzuraCast
    async function fetchNowPlaying() {
        try {
            const response = await fetch(apiUrl);
            nowPlaying = await response.json();
        } catch (error) {
            console.error("Błąd połączenia z AzuraCast:", error);
        }
    }

    // Jak tylko komponent się załaduje, pobierz dane i ustaw interwał
    onMount(() => {
        fetchNowPlaying();
        
        // Odpytuj AzuraCast co 15 sekund (15000 ms), by aktualizować okładkę i tytuł
        const interval = setInterval(fetchNowPlaying, 15000);
        
        return () => clearInterval(interval);
    });
</script>

<div class="radio-player">
    <h2>Radio Gabinetowe (Gab In Net)</h2>

    {#if nowPlaying}
        <!-- Wyświetlamy okładkę i tytuł na podstawie danych z API -->
        <img 
            src={nowPlaying.now_playing.song.art} 
            alt="Okładka albumu" 
            style="width: 250px; border-radius: 10px;"
        />
        <h3>{nowPlaying.now_playing.song.title}</h3>
        <p>{nowPlaying.now_playing.song.artist}</p>
        
        <p><small>Słuchaczy: {nowPlaying.listeners.current}</small></p>
    {:else}
        <p>Ładowanie danych ze studia...</p>
    {/if}

    <!-- Zwykły HTML-owy odtwarzacz wpięty pod strumień MP3 -->
    <audio controls src={audioUrl}></audio>
</div>

<style>
    .radio-player {
        text-align: center;
        font-family: sans-serif;
        padding: 2rem;
        background: #f4f4f9;
        border-radius: 15px;
        max-width: 400px;
        margin: 0 auto;
    }
</style>