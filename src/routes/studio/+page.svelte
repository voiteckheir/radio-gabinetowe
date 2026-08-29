<script lang="ts">
    import Seo from '$lib/Seo.svelte';
    import { onMount } from 'svelte';
    import { slide } from 'svelte/transition'; 

    // --- DANE: SLajdy ---
    const zdjeciaStudia = [
        '/uslugi/Cover fb.webp',
        '/uslugi/C0020T01.webp',
        '/uslugi/20230510_023106.webp',
        '/uslugi/20230510_023753.webp'
    ];
    
    let aktualnySlajd = $state(0);

    onMount(() => {
        const interval = setInterval(() => {
            aktualnySlajd = (aktualnySlajd + 1) % zdjeciaStudia.length;
        }, 4000);
        return () => clearInterval(interval);
    });

    // --- DANE: Usługi ---
    const kategorieUslug = [
        {
            tytul_kategorii: "NAGRANIA",
            uslugi: [
                { id: "nag-wok", tytul: "WOKALNE", img: "/uslugi/20230722_222525.webp", opis: "Profesjonalne nagrania partii wokalnych z pełnym wsparciem realizatora. Posiadamy izolowaną kabinę o doskonałej akustyce.", lista: ["Szeroki wybór mikrofonów pojemnościowych", "Korekcja barwy i intonacji (Auto-Tune / Melodyne)", "Pomoc realizatora przy interpretacji"] },
                { id: "nag-ins", tytul: "INSTRUMENTALNE", img: "/uslugi/20230510_021435.webp", opis: "W Studiu radia Gab In Net oferujemy usługę nagrywania instrumentów, która pozwala Ci wydobyć pełen potencjał swojego grania. Nie ma nic piękniejszego niż brzmienie żywych instrumentów. Niezależnie od tego, czy jesteś gitarzystą, pianistą, perkusistą czy grasz na innym instrumencie, możemy uchwycić każdy dźwięk i oddać go w pełnej krasie.\n Proces nagrywania rozpoczynamy od konsultacji, aby zrozumieć wizję artysty. Następnie ustalamy termin sesji nagraniowej. Nagrania mogą odbywać się pojedynczo lub w grupach, zależnie od potrzeb. Rozstawiamy instrumenty, rozstawiamy mikrofony i szukamy najlepszego brzmienia. Następnie, nagrywamy, aż do uzyskania satysfakcjonującego materiału. Po zakończeniu nagrywania przechodzimy do miksowania, gdzie łączymy nagrane ścieżki i nadajemy im ostateczny kształt. Na koniec, po zatwierdzeniu przez artystę, przystępujemy do masteringu, który dostosowuje utwory do standardów przemysłu muzycznego.", lista: ["Nagrania za pomocą profesjonalnych mikrofonów i przetrowników", "Dostosowanie brzmienia instrumentów do Waszego stylu muzycznegoDostosowanie brzmienia instrumentów do Waszego stylu muzycznego", "Dodanie wybranych przez Was efektów na Wasze ścieżki", "Wyrównywanie rytmiki instrumentów (również perkusyjnych)", "Poprawianie intonacji instrumentów", "Miks oraz mastering utworów", "Zmiana tonacji nagranych już ścieżek", "Pozbawianie nagrań błędów, przypadkowych uderzeń, szumu, brumienia, czy innych niechcianych zarejestrowanych dźwiękówPozbawianie nagrań błędów, przypadkowych uderzeń, szumu, brumienia, czy innych niechcianych zarejestrowanych dźwięków"] },
                { id: "nag-lek", tytul: "LEKTORSKIE", img: "/uslugi/20230722_230405.webp", opis: "Czy to dla reklamy, audiobooka, prezentacji, czy nagrania głosowego dla Twojej strony internetowej – możemy zrealizować Twoją wizję.\n Niezależnie od tego, czy potrzebujesz czystej i klarownej narracji, czy też poszukujesz czegoś bardziej kreatywnego, nasza ekipa sprosta Twoim oczekiwaniom.", lista: ["Absolutna cisza kabiny lektorskiej", "Precyzyjna edycja oddechów i mlasków", "Oddanie gotowych, zmasterowanych plików"] }
            ]
        },
        {
            tytul_kategorii: "EDYCJA",
            uslugi: [
                { id: "edy-mik", tytul: "MIKS", img: "/uslugi/20230510_022915.webp", opis: "Miks nagrania audio to proces łączenia i obróbki różnych ścieżek dźwiękowych w celu uzyskania ostatecznego miksu utworu. Polega na dostosowaniu głośności, balansu, przestrzenności i innych parametrów każdej ścieżki dźwiękowej, takich jak wokale, instrumenty i efekty dźwiękowe. W Studiu Radia Gab In Net, stawiamy nacisk na zrozumienie i pełne oddanie wizji artysty przychodzącego do nas z projektem." },
                { id: "edy-mas", tytul: "MASTERING", img: "/uslugi/20230510_023112.webp", opis: "Mastering jest procesem końcowej obróbki dźwięku, po zakończeniu etapu miksowania. Polega na dostosowaniu, optymalizacji i ujednoliceniu utworu muzycznego w celu uzyskania profesjonalnego i spójnego brzmienia na wszystkich systemach odsłuchowych.Mastering jest procesem końcowej obróbki dźwięku, po zakończeniu etapu miksowania. Polega na dostosowaniu, optymalizacji i ujednoliceniu utworu muzycznego w celu uzyskania profesjonalnego i spójnego brzmienia na wszystkich systemach odsłuchowych. \n To kluczowy etap produkcji muzycznej, który ma na celu zapewnienie, że utwór brzmi optymalnie na różnych nośnikach i urządzeniach odsłuchowych, takich jak głośniki studyjne, słuchawki, samochodowe systemy audio czy platformy streamingowe. ", lista: ["Odpowiednia głośność komercyjna (LUFS)", "Optymalizacja pod Spotify, Apple Music, YouTube", "Zapewnienie spójności całego albumu"] },
                { id: "edy-rek", tytul: "REKONSTRUKCJA / ZGRYWANIE", img: "/uslugi/20230510_024529.webp", opis: "Nie zawsze nagranie jest idealne, ale nie martw się – nasz zespół realizatorów dźwięku ma umiejętności i narzędzia, aby poprawić jakość Twojego nagrania. Bez względu na to, czy jest to utwór muzyczny, podcast, wykład, nagranie znalezione u babci na strychu czy inna forma audio, możemy pomóc Ci uczynić go profesjonalnym i odkryć ukryty potencjał.\n Niezależnie od tego, czy potrzebujesz odświeżenia starego nagrania, chcesz poprawić jakość nagrania z starego nośnika, czy też chcesz poprawić jakość nowego materiału, możemy dostosować rekonstrukcję do Twoich indywidualnych potrzeb. Nasi realizatorzy są gotowi, aby zabrać Twoje nagranie na wyższy poziom."}
            ]
        },
        {
            tytul_kategorii: "UDŹWIĘKOWIENIA",
            uslugi: [
                { id: "udz-efe", tytul: "EFEKTY DŹWIĘKOWE", img: "/uslugi/C0017T01.webp", opis: "Doskonale wiemy, jak ważne są dźwięki i efekty dźwiękowe w tworzeniu atmosfery, napięcia i emocji w produkcjach audiowizualnych. Dlatego nasz zespół realizatorów jest gotowy, aby współpracować z Tobą i stworzyć niestandardowe efekty dźwiękowe, które wzbogacą Twoje projekty i przyciągną uwagę odbiorców. \n Niech to będą zmysłowe dźwięki w filmie, tajemnicze dźwięki w słuchowisku czy wyjątkowe dźwięki dla Twojej reklamy – możemy dostarczyć Ci niezwykłe efekty dźwiękowe, które podkreślą narrację i ożywią Twoje produkcje. Dzięki naszemu doświadczeniu i nowoczesnemu sprzętowi, możemy tworzyć dźwięki z całkowitą precyzją i autentycznością.Niech to będą zmysłowe dźwięki w filmie, tajemnicze dźwięki w słuchowisku czy wyjątkowe dźwięki dla Twojej reklamy – możemy dostarczyć Ci niezwykłe efekty dźwiękowe, które podkreślą narrację i ożywią Twoje produkcje. Dzięki naszemu doświadczeniu i nowoczesnemu sprzętowi, możemy tworzyć dźwięki z całkowitą precyzją i autentycznością.", lista: ["Bogata baza własnych sampli", "Nagrania typu Foley (imitacja kroków, ubrań)", "Zaawansowana synteza dźwięku"] },
                { id: "udz-slu", tytul: "SŁUCHOWISKA", img: "/uslugi/20230510_024403.webp", opis: "Nasze studio posiada specjalistyczny sprzęt i wykwalifikowany personel, który jest gotowi nagrywać i produkować Twoje słuchowiska na najwyższym poziomie. Od momentu przyjęcia Twojego projektu aż do jego finalizacji, nasz zespół będzie dążył do jak najlepszego efektu końcowego. \n Wystarczy, że przyjdziesz do nas z gotowym scenariuszem i aktorami, a nasi specjaliści od dźwięku, nagrywania i montażu będą pracować z Tobą, aby stworzyć unikalne i niezapomniane słuchowisko. Nasze doświadczenie w branży gwarantuje, że Twoje słuchowisko będzie profesjonalne i  dopracowane.Wystarczy, że przyjdziesz do nas z gotowym scenariuszem i aktorami, a nasi specjaliści od dźwięku, nagrywania i montażu będą pracować z Tobą, aby stworzyć unikalne i niezapomniane słuchowisko. Nasze doświadczenie w branży gwarantuje, że Twoje słuchowisko będzie profesjonalne i  dopracowane. \n W Gab in Net nie tylko nagrywamy słuchowiska, ale także dostarczamy kompleksową produkcję dźwiękową, w tym postprodukcję, montaż i edycję dźwięku. Nasze studio posiada nowoczesne technologie i narzędzia, które pozwalają na stworzenie nie tylko standardowych, ale także niestandardowych dźwięków i efektów dźwiękowych, które wzbogacą Twoje słuchowisko i zapewnią niezapomniane wrażenia słuchowe.", lista: ["Reżyseria dźwięku i praca z aktorem", "Budowa przestrzeni (dźwięk 3D / Binaural)", "Montaż narracji"] },
                { id: "udz-pod", tytul: "PODCASTY", img: "/uslugi/20230510_024437.webp", opis: "Nasze studio posiada wysokiej jakości sprzęt i doświadczonych realizatorów dźwięku którzy są gotowi nagrywać i produkować Twój podcast na najwyższym poziomie. Bez względu na tematykę, którą chcesz poruszyć, jesteśmy gotowi zapewnić Ci profesjonalne nagrania i produkcję, abyś mógł dotrzeć do swoich słuchaczy w najlepszy sposób.Nasze studio posiada wysokiej jakości sprzęt i doświadczonych realizatorów dźwięku którzy są gotowi nagrywać i produkować Twój podcast na najwyższym poziomie. Bez względu na tematykę, którą chcesz poruszyć, jesteśmy gotowi zapewnić Ci profesjonalne nagrania i produkcję, abyś mógł dotrzeć do swoich słuchaczy w najlepszy sposób.", lista: ["Obsługa wieloosobowych sesji (do 4 mikrofonów)", "Czyszczenie audio ze słów-wypełniaczy (yyy, eeee)", "Dodawanie intro, outro i podkładów muzycznych"] }
            ]
        },
        {
            tytul_kategorii: "POZA STUDIEM",
            uslugi: [
                { id: "poz-liv", tytul: "REALIZACJA LIVE", img: "/uslugi/120645769_3438372566254300_4481543573945934636_n.webp", opis: "Zapewniamy kompleksową usługę realizacji dźwięku podczas wydarzeń na żywo. Dysponujemy wysokiej jakości sprzętem, w tym mikserem cyfrowym, różnorodnymi mikrofonami, potężnym nagłośnieniem aktywnym oraz innymi niezbędnymi akcesoriami. Nasi doświadczeni realizatorzy dźwięku są ekspertami w swojej dziedzinie i zapewnią, że Twoje wydarzenie będzie brzmiało perfekcyjnie. \n Nasza usługa obejmuje kompleksowe wsparcie techniczne od planowania po finalne wykonanie. Pracujemy w ścisłej współpracy z Tobą, aby zrozumieć Twoje oczekiwania i wizję dźwiękową. Nasz zespół dostosowuje swoje podejście do specyfiki wydarzenia, biorąc pod uwagę rozmiar, lokalizację i inne indywidualne potrzeby.", lista: ["Miks wydarzenia na żywo (FOH)", "Wielośladowa rejestracja koncertu na pendrive", "Mobilny system PA"] },
                { id: "poz-ter", tytul: "NAGRANIA TERENOWE", img: "/uslugi/OUTDOOR.webp", opis: "Zapraszamy do skorzystania z naszej usługi nagrywania w terenie, która pozwoli uwiecznić wyjątkowe dźwięki i atmosferę różnorodnych miejsc, wydarzeń, konferencji, sond ulicznych i tym podobnych. Dzięki naszemu profesjonalnemu podejściu i wysokiej jakości sprzętowi, jesteśmy w stanie zarejestrować autentyczne nagrania dźwiękowe, odzwierciedlające unikalne charaktery i emocje miejsca. Pozostawiając nagrania dialogów wyraźnymi i zrozumiałymi. \n Nasza usługa nagrywania dźwięku w terenie to idealne rozwiązanie dla produkcji audiowizualnych, filmów dokumentalnych, reportaży, a także innych projektów, które wymagają autentycznych dźwięków z wydarzeń społecznych.", lista: ["Wysokiej klasy rejestratory przenośne", "Mikrofony typu shotgun z osłonami przeciwwietrznymi", "Rejestracja atmosfery miasta/natury"] },
                { id: "poz-fil", tytul: "FILMY", img: "/uslugi/342991668_946763056434751_6379775735729799877_n.webp", opis: "Jeśli szukasz profesjonalnego udźwiękowienia dla swojego filmu, jesteś we właściwym miejscu. Nasi doświadczeni specjaliści w dziedzinie udźwiękowienia filmów mają szeroką wiedzę i umiejętności, aby stworzyć doskonałą ścieżkę dźwiękową, która wzbogaci Twoją produkcję. Oferujemy bogate możliwości w zakresie projektowania dźwięku, komponowania muzyki, nagrywania dialogów, efektów dźwiękowych i wiele więcej. \n Każdy film jest unikalny, dlatego zależy nam na tym, aby dobrze zrozumieć Twoją wizję i estetykę dźwiękową, która pasuje do Twojego projektu, a temat udźwiękowienia filmów jest tak obszerny, że chcielibyśmy skonsultować się z Tobą indywidualnie, aby dopasować się do Twoich potrzeb i oczekiwań.", lista: ["Obsługa tyczki (Boom operator)", "Niewidoczne mikrofony krawatowe", "Synchronizacja czasowa za pomocą klapsa"] }
            ]
        }
    ];

    let rozwinietaUsluga: string | null = $state(null);

    function toggleUsluga(id: string) {
        if (rozwinietaUsluga === id) {
            rozwinietaUsluga = null; 
        } else {
            rozwinietaUsluga = id; 
        }
    }

    const cennik_sala = [
        { id: 1, usluga_sala: "Opłata początkowa", cena_sala: "10 zł" },
        { id: 2, usluga_sala: "Sala prób", cena_sala: "30 zł/h" },
        { id: 3, usluga_sala: "Sala prób z odsłuchem dousznym (do 7 indywidualnych miksów)", cena_sala: "30 zł/h" },
        { id: 4, usluga_sala: "Mixing room", cena_sala: "20 zł/h" },
        { id: 5, usluga_sala: "Nagrywanie próby na ścieżki", cena_sala: "W cenie najmu" },
        { id: 6, usluga_sala: "Nagrywanie próby na ścieżki z realizatorem + miks", cena_sala: "+50 zł/h" },
        { id: 7, usluga_sala: "Wyporzyczenie zestawu talerzy perkusyjnych", cena_sala: "+7 zł/h" },
        { id: 8, usluga_sala: "Gitara elektryczna Vintage V100 Icon4", cena_sala: "+5 zł/h" },
        { id: 9, usluga_sala: "Gitara basowa Washburn BB4", cena_sala: "+7 zł/h" },
        { id: 10, usluga_sala: "Gitara akustyczna Fender FA-125ca", cena_sala: "+5 zł/h" },
        { id: 11, usluga_sala: "Usługi nagraniowe, pozostawienie swojego sprzętu, rozliczenia miesięczne ze zniżką", cena_sala: "wycena indywidualna" }
    ];

    const cennik_praca = [
        { id: 1, usluga_praca: "Godzina pracy studia z realizatorem (nagrania)", cena_praca: "80 zł" },
        { id: 2, usluga_praca: "Godzina pracy studia bez realizatora", cena_praca: "40 zł" },
        { id: 3, usluga_praca: "Miks (w zależności od ilości śladów/długości i skomplikowania utworu)", cena_praca: "od 150 zł" },
        { id: 4, usluga_praca: "Mastering", cena_praca: "od 100 zł" },
        { id: 5, usluga_praca: "Podcasty", cena_praca: "80 zł/h" },
        { id: 6, usluga_praca: "Rekonstrukcja/Zgrywanie z analogowych nośników", cena_praca: "od 100 zł" },
        { id: 7, usluga_praca: "Realizacja dźwięku live", cena_praca: "od 400 zł" },
        { id: 8, usluga_praca: "Nagrania terenowe", cena_praca: "80 zł/h" }
    ];

    const wyposazenie = [
        { id: 1, nazwa:  "Nagłośnienie kolumny aktywne RH Sound RHA 15/2/300P" },
        { id: 2, nazwa:  "Nagłośnienie kolumny STX + wzmacniacz Samson 1800sx" },
        { id: 3, nazwa:  "Zestaw perkusyjny PDP (centrala, werblel. hi tom, mid tom, floor tom) (talerze +7zł/h)" },
        { id: 4, nazwa:  "Wzmacniacz lampowy Bugera 333xl + paczka Marshalla 412" },
        { id: 5, nazwa:  "Combo gitarowe tranzystorowe Laney TF100" },
        { id: 6, nazwa:  "Combo Basowe Ampeg BA110" },
        { id: 7, nazwa:  "Klawiatura MIDI Alesis v61" },
        { id: 8, nazwa:  "Klawiatura MIDI M-Audio Oxygen 25" },
        { id: 9, nazwa:  "Klawiatura MIDI Keystation 61 III" },
        { id: 10, nazwa: "Gitara elektryczna Vintage V100 Icon4 (+5zł/h)" },
        { id: 11, nazwa: "Gitara basowa Washburn BB4 (+5zł/h)" },
        { id: 12, nazwa: "Gitara basowa Cort Action Bass (+5zł/h)" },
        { id: 13, nazwa: "Mikrofony dynamiczne" },
        { id: 14, nazwa: "Mikrofony pojemnościowe" },
        { id: 15, nazwa: "Statywy mikrofonowe" },
        { id: 16, nazwa: "Statywy pod comba gitarowe" },
        { id: 17, nazwa: "Mixer cyfrowy Behringer XR-18" },
        { id: 18, nazwa: "Mixer analogowy Mackie Deigns CR-1604 (16 kanałów)" },
        { id: 19, nazwa: "Laptop z DAW (Reaper)" },
        { id: 20, nazwa: "" }
    ];
</script>

<Seo 
    title="Studio | Radio Gabinetowe"
    description="Nasze studio! Umów się na próbę, nagraj swój pierwszy utwór i wiele więcej."
/> 

<section class="max-w-7xl mx-auto px-4 w-full mb-16">
    <h1 class="text-4xl md:text-5xl font-black mb-8 border-b-4 border-red-800 inline-block pb-2 uppercase tracking-wide">
        STUDIO RADIA GABINET
    </h1>
    
    <div class="relative w-full h-75 md:h-125 bg-zinc-900 rounded-lg overflow-hidden shadow-2xl border-2 border-zinc-800" aria-label="Galeria zdjęć studia">
        {#each zdjeciaStudia as zdjecie, i (i)}
            <img 
                src={zdjecie} 
                alt="" 
                aria-hidden="true"
                class="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                style="opacity: {aktualnySlajd === i ? 1 : 0};"
            />
        {/each}
        
        {#if zdjeciaStudia.length === 0}
            <div class="absolute inset-0 flex items-center justify-center text-zinc-600 font-bold tracking-widest text-xl">
                Brak zdjęć
            </div>
        {/if}
    </div>
</section>

<section class="max-w-7xl mx-auto px-4 w-full mb-20">
    <h2 class="text-3xl font-black mb-10 border-b-4 border-zinc-900 inline-block pb-2 uppercase text-gray-200">
        Nasze Usługi
    </h2>

    <div class="flex flex-col gap-12">
        {#each kategorieUslug as kategoria (kategoria.tytul_kategorii)}
            
            <div class="flex flex-col gap-6">
                <h3 class="text-2xl font-black text-red-800 tracking-wider">
                    - {kategoria.tytul_kategorii}
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {#each kategoria.uslugi as usluga (usluga.id)}
                        <button 
                            onclick={() => toggleUsluga(usluga.id)}
                            aria-expanded={rozwinietaUsluga === usluga.id ? 'true' : 'false'}
                            aria-controls="panel-{usluga.id}"
                            class="relative w-full aspect-4/3 md:aspect-video overflow-hidden border-[6px] border-[#d31a38] group bg-zinc-800 cursor-pointer shadow-lg hover:shadow-2xl transition-shadow"
                        >
                            <img 
                                src={usluga.img} 
                                alt=""
                                aria-hidden="true"
                                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>

                            <div class="absolute inset-0 flex items-center justify-center z-10 px-4">
                                <span 
                                    class="text-white font-black text-2xl md:text-3xl uppercase tracking-widest text-center"
                                    style="text-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0px 4px 10px rgba(0,0,0,0.8);"
                                >
                                    {usluga.tytul}
                                </span>
                            </div>
                        </button>
                    {/each}
                </div>

                {#if kategoria.uslugi.find(u => u.id === rozwinietaUsluga)}
                    {@const aktywna = kategoria.uslugi.find(u => u.id === rozwinietaUsluga)}
                    
                    <div id="panel-{aktywna?.id}" transition:slide={{ duration: 300 }} class="w-full">
                        <div class="bg-zinc-900 border-l-4 border-red-500 text-white p-6 md:p-8 shadow-inner mt-2">
                            
                            <div class="flex justify-between items-start mb-4">
                                <h4 class="text-2xl font-bold text-red-500">{aktywna?.tytul}</h4>
                                <button aria-label="Zamknij opis usługi" onclick={() => rozwinietaUsluga = null} class="text-zinc-500 hover:text-white transition">
                                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                                </button>
                            </div>
                            
                            <p class="text-zinc-300 text-lg leading-relaxed mb-6">
                                {aktywna?.opis}
                            </p>
                            
                            <ul class="space-y-2">
                                {#each aktywna?.lista || [] as punkt (punkt)}
                                    <li class="flex items-start gap-3 text-zinc-400">
                                        <span class="text-red-500 font-bold text-xl leading-none" aria-hidden="true">•</span>
                                        <span>{punkt}</span>
                                    </li>
                                {/each}
                            </ul>
                            
                        </div>
                    </div>
                {/if}

            </div>
        {/each}
    </div>
</section>

<!-- GŁÓWNA ZAWARTOŚĆ (Siatka 2-kolumnowa na komputerach) -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 max-w-7xl mx-auto px-4 w-full">
    
    <!-- LEWA KOLUMNA -->
    <div class="space-y-10">
        
        <section class="bg-white p-8 shadow-sm rounded-lg border-t-4 border-zinc-900">
            <h3 class="text-2xl font-bold mb-4 text-gray-900">Wyposażenie</h3>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
                {#each wyposazenie as sprzet (sprzet.id)}
                    {#if sprzet.nazwa.trim() !== ""}
                        <li>{sprzet.nazwa}</li>
                    {/if}
                {/each}
            </ul>
        </section>

        <section class="bg-red-800 text-white p-8 shadow-sm rounded-lg">
            <h3 class="text-2xl font-bold mb-4">Godziny i rezerwacje</h3>
            
            <div class="mb-6">
                <p class="font-medium text-red-200 text-sm uppercase tracking-wider mb-1">Godziny działania:</p>
                <p class="font-bold text-lg">Poniedziałek - Niedziela - 24h/dobę</p>
            </div>
            
            <div>
                <p class="font-medium text-red-200 text-sm uppercase tracking-wider mb-1">Jak umówić próbę?</p>
                <p class="text-sm text-white mb-6 leading-relaxed">
                    Sprawdź wolne terminy w grafiku obok, a następnie zadzwoń do nas lub napisz maila (korzystając z formularza w zakładce Kontakt), podając wybraną datę i godzinę.
                </p>
                <a href="/kontakt" class="inline-block bg-white te xt-red-800 font-bold py-3 px-6 rounded hover:bg-gray-100 transition shadow">
                    Przejdź do kontaktu
                </a>
            </div>
        </section>

        <section class="bg-white p-8 shadow-sm rounded-lg border border-gray-100">
            <h3 class="text-2xl font-bold mb-6 text-gray-900">Grafik Studia</h3>
            
            <div class="relative w-full overflow-hidden rounded border border-gray-300 bg-gray-50" style="padding-top: 80%;">
                <iframe 
                    src="https://calendar.google.com/calendar/embed?src=pl.polish%23holiday%40group.v.calendar.google.com&ctz=Europe%2FWarsaw&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0" 
                    class="absolute top-0 left-0 w-full h-full border-0" 
                    title="Kalendarz Studia"
                    loading="lazy"
                ></iframe>
            </div>
            <p class="text-xs text-gray-500 mt-4 text-center">Widok kalendarza odświeża się automatycznie.</p>
        </section>
    </div>

    <!-- PRAWA KOLUMNA -->
    <div class="space-y-10">
        
<!-- Cennik sali prób -->
        <section class="bg-white p-8 shadow-sm rounded-lg border border-gray-100">
            <h3 class="text-2xl font-bold mb-6 border-b-2 border-red-800 inline-block pb-1 text-gray-700">Cennik sali prób</h3>
            <ul class="space-y-4">
                {#each cennik_sala as pozycja (pozycja.id)}
                    <!-- Dodano gap-4 -->
                    <li class="flex justify-between items-center gap-4 border-b border-gray-100 pb-3">
                        <span class="text-gray-700 font-medium">{pozycja.usluga_sala}</span>
                        <!-- Dodano whitespace-nowrap oraz shrink-0 -->
                        <span class="font-bold text-red-800 text-lg whitespace-nowrap shrink-0">{pozycja.cena_sala}</span>
                    </li>
                {/each}
            </ul>
        </section>

        <!-- Cennik pracy studia -->
        <section class="bg-white p-8 shadow-sm rounded-lg border border-gray-100">
            <h3 class="text-2xl font-bold mb-6 border-b-2 border-red-800 inline-block pb-1 text-gray-700">Cennik pracy studia</h3>
            <ul class="space-y-4">
                {#each cennik_praca as pozycja (pozycja.id)}
                    <!-- Dodano gap-4 -->
                    <li class="flex justify-between items-center gap-4 border-b border-gray-100 pb-3">
                        <span class="text-gray-700 font-medium">{pozycja.usluga_praca}</span>
                        <!-- Dodano whitespace-nowrap oraz shrink-0 -->
                        <span class="font-bold text-red-800 text-lg whitespace-nowrap shrink-0">{pozycja.cena_praca}</span>
                    </li>
                {/each}
            </ul>
        </section>

    </div>
</div>