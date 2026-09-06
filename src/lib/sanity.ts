import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'cr2o6oj0', // Za chwilę go podmienimy!
  dataset: 'production',
  useCdn: true, // Zapewnia szybsze ładowanie strony z pamięci podręcznej (Cache)
  apiVersion: '2024-01-01', 
});