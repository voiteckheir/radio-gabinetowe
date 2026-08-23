// src/lib/player.svelte.js
export const player = $state({
	isPlaying: false,
	volume: 0.5,

	// Zmienna określająca, czy gramy na żywo, czy podcast
	isLive: true,

	// Domyślny strumień radia (do niego będziemy wracać)
	liveStreamUrl: 'https://twoj-serwer.pl/listen/radio/radio.mp3',

	// Aktualnie odtwarzany plik (zmienia się po kliknięciu w podcast)
	streamUrl: 'https://twoj-serwer.pl/listen/radio/radio.mp3',

	// Metadane do wyświetlenia w odtwarzaczu
	currentTitle: 'Klucz do autostrady',
	currentSubtitle: 'TOMASZ HATYLAK',
	currentImage: null // <-- NOWA ZMIENNA (null oznacza brak okładki)
});
