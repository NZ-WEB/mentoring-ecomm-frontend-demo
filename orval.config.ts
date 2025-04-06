export default {
  api: {
    output: {
      mode: 'tags-split',
      target: 'src/api/api.ts',
      schemas: 'src/api/model',
      client: 'vue-query',
      mock: true,
      override: {
        mutator: {
          path: './src/api/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
    input: {
      target: 'http://localhost:3000/swagger/yaml',
    },
  },
};
