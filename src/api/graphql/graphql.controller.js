const graphqlHTTP = require('koa-graphql');
const graphQlSchema  = require('config/graphql');
const { isDevelopment } = require('config/variables');

// The user the the parameter comes from the authenticated middleware
exports.graphql = graphqlHTTP({
  schema  : graphQlSchema,
  graphiql: isDevelopment, // Will activate graphql only in development
  pretty  : true
});
