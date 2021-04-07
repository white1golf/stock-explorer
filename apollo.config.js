module.exports = {
  client: {
    service: {
      name: 'my-app',
      // URL to the GraphQL API
      url: 'http://localhost:3000/graphql',
    },
    includes: ['src/**/*.{js,jsx,ts,tsx,vue,gql}'],
  },
};
