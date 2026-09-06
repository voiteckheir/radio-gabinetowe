import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ustawieniaStudia',
  title: 'Studio (Cenniki i Sprzęt)',
  type: 'document',
  fields: [
    defineField({
      name: 'tytul',
      title: 'Tytuł w panelu',
      type: 'string',
      hidden: true, 
      initialValue: 'Ustawienia Studia (Edytuj to)' // Żeby ładnie wyglądało na liście w Sanity
    }),
    
    // --- WYPOSAŻENIE ---
    defineField({
      name: 'wyposazenie',
      title: 'Wyposażenie (Lista sprzętu)',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // --- CENNIK SALI PRÓB ---
    defineField({
      name: 'cennikSala',
      title: 'Cennik: Sala prób',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'usluga', title: 'Nazwa usługi', type: 'string' },
            { name: 'cena', title: 'Cena (np. 30 zł/h)', type: 'string' }
          ]
        }
      ]
    }),

    // --- CENNIK PRACY STUDIA ---
    defineField({
      name: 'cennikPraca',
      title: 'Cennik: Praca studia',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'usluga', title: 'Nazwa usługi', type: 'string' },
            { name: 'cena', title: 'Cena (np. 80 zł/h)', type: 'string' }
          ]
        }
      ]
    })
  ]
})