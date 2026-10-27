<script lang="ts">
	import { page } from '$app/stores';

	let {
		title = 'Radio Gabinetowe | Gab In Net',
		description = 'Niezależne radio internetowe i profesjonalne studio nagrań w Lublinie. Sprawdź naszą ramówkę, najlepsze podcasty i umów się na nagrania!',
		image = 'https://radiogabinetowe.pl/og-image.webp',
		url = 'https://radiogabinetowe.pl',
		type = 'website'
	} = $props();

	// Dynamicznie pobieramy obecny adres strony, żeby wygenerować Canonical URL
	let canonicalUrl = $derived(`${url}${$page.url.pathname}`);
</script>

<svelte:head>
	<!-- Standardowe tagi dla Google -->
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph (Facebook, Messenger, LinkedIn, iMessage) -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content="Radio Gabinetowe" />

	<!-- Twitter Card (Twitter / X, Discord) -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>
