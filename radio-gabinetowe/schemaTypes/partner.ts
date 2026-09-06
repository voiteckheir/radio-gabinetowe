import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'partner',
  title: 'Partnerzy (Współprace)',
  type: 'document',
  fields: [
    defineField({
      name: 'nazwa',
      title: 'Nazwa Partnera',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})