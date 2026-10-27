// TYMCZASOWY SZTYWNY PLIK DO TESTÓW

export const aktualnosci = [
	{
		id: 1,
		slug: 'trzeci-krok-do-slawy', // <-- To będzie w pasku adresu URL
		tytul: 'TRZECI KROK DO SŁAWY',
		opis: 'Tworzysz muzykę i marzysz by nagrać...', // Skrót na stronę główną
		pelnaTresc: 'Pełny artykuł o tym jak stworzyć muzykę, długi tekst, akapity itp...'
	},
	{
		id: 2,
		slug: 'literacki-wechikul-czasu',
		tytul: 'LITERACKI WEHIKUŁ CZASU',
		opis: 'Już od dziś o 18:00 na antenie naszego radia rusza cykl Literacki wehikuł czasu – seria opowieści o znakomitych poetach...',
		pelnaTresc: 'Pełny opis o audycji literacki wechikuł czasu'
	},
	{
		id: 3,
		slug: 'premiera-bullet-haze',
		tytul: 'PREMIERA BULLET HAZE',
		opis: 'Już od dziś możecie słuchać pierwszego utworu nagranego w ramach Drugiego kroku do sławy. Przed Wami Bullet Haze...',
		pelnaTresc: 'Pełny opis o premierze utworu Bullet Haze'
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

export const dniTygodnia = [
	{ id: 1, data: '07.08', dzien: 'PT.' },
	{ id: 2, data: '08.08', dzien: 'SB.' },
	{ id: 3, data: 'Wczoraj', dzien: 'ND.' },
	{ id: 4, data: 'Dzisiaj', dzien: 'PN.' }, // Załóżmy, że to domyślny dzień
	{ id: 5, data: 'Jutro', dzien: 'WT.' },
	{ id: 6, data: '12.08', dzien: 'ŚR.' },
	{ id: 7, data: '13.08', dzien: 'CZ.' }
];

export const wszystkieAudycje = [
	// Audycje dla "Dzisiaj" (dzienId: 4)
	{
		id: 1,
		dzienId: 4,
		czas: '06:00',
		tytul: 'Poranne Witaminy',
		prowadzacy: 'Blok Muzyczny',
		obrazek: 'FOTO',
		opis: 'Najlepsza muzyka na przebudzenie...',
		linkPodcast: null
	},
	{
		id: 2,
		dzienId: 4,
		czas: '10:00',
		tytul: 'Kawał Ciężkiego Metalu',
		prowadzacy: 'Redakcja',
		obrazek: 'FOTO',
		opis: 'Dwie godziny bezkompromisowych brzmień...',
		linkPodcast: 'https://youtube.com'
	},
	// Audycja dla "Jutro" (dzienId: 5)
	{
		id: 3,
		dzienId: 5,
		czas: '13:00',
		tytul: 'Reklasycznie',
		prowadzacy: 'Blok Muzyczny',
		obrazek: 'FOTO',
		opis: 'Zupełnie nowe spojrzenie na klasykę...',
		linkPodcast: null
	},
	// Audycja dla "Wczoraj" (dzienId: 3)
	{
		id: 4,
		dzienId: 3,
		czas: '18:00',
		tytul: 'Wkraczając w film',
		prowadzacy: 'Marcin Polak',
		obrazek: 'FOTO',
		opis: 'Analiza muzyki i motywów dźwiękowych...',
		linkPodcast: 'https://youtube.com'
	}
];
