<!-- src/lib/Seo.svelte -->
<script lang="ts">
    let {
        title = 'Radio Gabinetowe | Gab In Net',
        description = 'Niezależne radio internetowe i profesjonalne studio nagrań w Lublinie. Sprawdź naszą ramówkę, najlepsze podcasty i umów się na nagrania!',
        // UWAGA: Facebook i inne boty wymagają absolutnego, pełnego adresu URL do obrazka!
        image = 'https://twojadomena.pl/og-image.webp', 
        url = 'https://twojadomena.pl',
        type = 'website'
    } = $props();
</script>

<svelte:head>
    <!-- Standardowe tagi dla Google -->
    <title>{title}</title>
    <meta name="description" content={description} />

    <!-- Open Graph (Facebook, Messenger, LinkedIn, iMessage) -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content={type} />
    <meta property="og:site_name" content="Radio Gabinetowe" />

    <!-- Twitter Card (Twitter / X, Discord) -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
</svelte:head>