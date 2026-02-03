import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'sgmu0lrq',
    dataset: 'production',
  },
  server: {
    hostname: 'localhost',
    port: 3333,
  },
  graphql: [
    {
      tag: 'default',
      playground: true,
      generation: 'gen3',
      nonNullDocumentFields: false,
    },
  ],
  vite: (config) => config,
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  deployment: {
    autoUpdates: true,
    appId: 'oqbkqkra05bnddqt13oqxbdr',
  },
  studioHost: 'kyusda',
})
