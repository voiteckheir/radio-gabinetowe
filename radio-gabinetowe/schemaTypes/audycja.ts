import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'audycja',
  title: 'Audycje (Ramówka)',
  type: 'document',
  fields: [
    defineField({
      name: 'tytul',
      title: 'Tytuł audycji',
      type: 'string',
      description: 'Musi być podobny do tego w AzuraCast (nie martw się o wielkość liter czy kropki na początku).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'prowadzacy',
      title: 'Prowadzący',
      type: 'string',
    }),
    defineField({
      name: 'obrazek',
      title: 'Okładka audycji',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'opis',
      title: 'Opis audycji',
      type: 'text',
    }),
    defineField({
      name: 'linkPodcast',
      title: 'Link do podcastu (opcjonalnie)',
      type: 'url',
    }),
  ],
})