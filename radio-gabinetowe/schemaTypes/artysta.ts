import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'artysta',
  title: 'Artyści',
  type: 'document',
  fields: [
    defineField({
      name: 'nazwa',
      title: 'Nazwa / Pseudonim',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (link)',
      type: 'slug',
      options: { source: 'nazwa', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gatunek',
      title: 'Gatunek muzyczny',
      type: 'string',
    }),
    defineField({
      name: 'zdjecie',
      title: 'Zdjęcie artysty',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'opis',
      title: 'Opis',
      type: 'text',
    }),
    defineField({
      name: 'facebook',
      title: 'Link do Facebooka',
      type: 'url',
    }),
    defineField({
      name: 'instagram',
      title: 'Link do Instagrama',
      type: 'url',
    }),
    defineField({
      name: 'artystaMiesiaca',
      title: 'Artysta Miesiąca',
      type: 'boolean',
      description: 'Zaznacz, jeśli ten artysta ma być głównym kafelkiem na stronie głównej!',
    }),
  ],
})