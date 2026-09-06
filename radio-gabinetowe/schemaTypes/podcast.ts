import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'podcast',
  title: 'Podcast',
  type: 'document',
  fields: [
    defineField({
      name: 'tytul',
      title: 'Tytuł odcinka',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
        title: 'Slug (link) ',
      type: 'slug',
      options: { source: 'tytul', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'autor',
      title: 'Autor / Prowadzący',
      type: 'string',
    }),
    defineField({
      name: 'kategoria',
      title: 'Kategoria',
      type: 'string',
      options: {
        list: ['Wywiady', 'Muzyczne', 'Rozwój', 'Podcasty', 'Projekty', 'Inne'], // Możesz to zmienić wg potrzeb
      },
    }),
    defineField({
      name: 'czas',
      title: 'Czas trwania (np. 45 min)',
      type: 'string',
    }),
    defineField({
      name: 'audioUrl',
      title: 'Link do pliku MP3 (z AzuraCast)',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'Link do YouTube (opcjonalnie)',
      type: 'url',
    }),
    defineField({
      name: 'okladka',
      title: 'Okładka odcinka',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'opis',
      title: 'Opis / Notatki do odcinka',
      type: 'text',
    }),
  ],
})