export const aktualnosci = [
	{
		id: 1,
		tytul: 'TRZECI KROK DO SŁAWY',
		opis: 'Tworzysz muzykę i marzysz by nagrać swoje numery w profesjonalnym studiu? A może działasz w młodzieżowym zespole...'
	},
	{
		id: 2,
		tytul: 'LITERACKI WEHIKUŁ CZASU',
		opis: 'Już od dziś o 18:00 na antenie naszego radia rusza cykl Literacki wehikuł czasu – seria opowieści o znakomitych poetach...'
	},
	{
		id: 3,
		tytul: 'PREMIERA BULLET HAZE',
		opis: 'Już od dziś możecie słuchać pierwszego utworu nagranego w ramach Drugiego kroku do sławy. Przed Wami Bullet Haze...'
	}
];

export const podcasty = [
	{
		id: 1,
		tytul: 'Stadion, który widział prawie wszystko',
		autor: 'Mateusz Kuźniewski',
		kategoria: 'Sport',
		czas: '27 min',
		audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
		youtubeUrl: 'https://youtube.com'
	},
	{
		id: 2,
		tytul: 'Mario z Tokio',
		autor: 'Jarosław Juszkiewicz',
		kategoria: 'Kultura i sztuka',
		czas: '18 min',
		audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
		youtubeUrl: 'https://youtube.com'
	},
	{
		id: 3,
		tytul: 'Żeby ktoś żył, ktoś inny musi umrzeć',
		autor: 'Beata Kwiatkowska',
		kategoria: 'Rozmowy i opowieści',
		czas: '39 min',
		audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
		youtubeUrl: 'https://youtube.com'
	},
	{
		id: 4,
		tytul: 'Pseudobiologia',
		autor: 'Oktawia Kromer',
		kategoria: 'Nauka',
		czas: '41 min',
		audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
		youtubeUrl: 'https://youtube.com'
	}
];

// Dane do karuzeli w Svelte 5 (używamy $state by framework reagował na zmiany)
export const bazaPartnerow = [
	{ id: 1, nazwa: 'TEATR POLONIA', logo: 'FOTO' },
	{ id: 2, nazwa: 'TEATR SZEKSPIROWSKI', logo: 'FOTO' },
	{ id: 3, nazwa: 'TEATR WSPÓŁCZESNY', logo: 'FOTO' },
	{ id: 4, nazwa: 'KINO ŻEGLARZ', logo: 'FOTO' },
	{ id: 5, nazwa: 'RADIO 357', logo: 'FOTO' },
	{ id: 6, nazwa: 'URZĄD MIASTA', logo: 'FOTO' }
];

// Nasi artyści (pierwszy z nich będzie domyślnie Artystą Miesiąca)
export const bazaArtystow = [
	{ id: 1, nazwa: 'MARQUS MARS', zdjecie: 'FOTO', slug: 'marqus-mars', gatunek: 'Rock / Gitara' },
	{ id: 2, nazwa: 'DJ VELVET SKY', zdjecie: 'FOTO', slug: 'dj-velvet-sky', gatunek: 'Elektronika' },
	{ id: 3, nazwa: 'YOENNA', zdjecie: 'FOTO', slug: 'yoenna', gatunek: 'Pop / Alternatywa' },
	{ id: 4, nazwa: 'WØJTEK', zdjecie: 'FOTO', slug: 'wojtek', gatunek: 'Hip-Hop' },
	{ id: 5, nazwa: 'WHOSMYK', zdjecie: 'FOTO', slug: 'whosmyk', gatunek: 'Indie' },
	{ id: 6, nazwa: 'MARCIN POLAK', zdjecie: 'FOTO', slug: 'marcin-polak', gatunek: 'Muzyka filmowa' }
];
