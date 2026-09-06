import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Aktualności',
  type: 'document',
  fields: [
    defineField({
      name: 'tytul',
      title: 'Tytuł artykułu',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (link)',
      type: 'slug',
      options: { source: 'tytul', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dataPublikacji',
      title: 'Data publikacji',
      type: 'datetime',
    }),
    defineField({
      name: 'zdjecieGlowne',
      title: 'Zdjęcie główne',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'zajawka',
      title: 'Krótki opis (Zajawka)',
      type: 'text',
      description: 'Ten tekst pojawi się na stronie głównej w kafelkach.',
    }),
    defineField({
      name: 'tresc',
      title: 'Treść artykułu',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }], // Pozwala na pisanie tekstu z formatowaniem i wklejanie zdjęć
    }),
  ],
})