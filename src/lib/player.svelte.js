// src/lib/player.svelte.js

import { PUBLIC_RADIO_HOST, PUBLIC_STATION_SLUG } from '$env/static/public';

const defaultStream = `${PUBLIC_RADIO_HOST}/listen/${PUBLIC_STATION_SLUG}/radio.mp3`;

export const player = $state({
	isPlaying: false,
	volume: 0.5,

	// Zmienna określająca, czy gramy na żywo, czy podcast
	isLive: true,

	// Domyślny strumień radia (do niego będziemy wracać)
	liveStreamUrl: defaultStream,

	// Aktualnie odtwarzany plik (zmienia się po kliknięciu w podcast)
	streamUrl: defaultStream,

	// Metadane do wyświetlenia w odtwarzaczu
	currentTitle: 'Łączenie z serwerem...',
	currentSubtitle: 'Gab In Net',
	currentImage: null // <-- NOWA ZMIENNA (null oznacza brak okładki)
});
