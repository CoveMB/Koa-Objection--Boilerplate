const graphqlHTTP = require('koa-graphql');
const graphQlSchema  = require('config/graphql');
const { isDevelopment } = require('config/variables');

// The user the the parameter comes from the authenticated middleware
exports.graphql = async ctx => graphqlHTTP({
  schema     : graphQlSchema,
  graphiql   : isDevelopment, // Will activate graphql only in development
  formatError: error => {

    // Throw error from context instead of return in it in the graphQl query result
    ctx.throw(error);

  },
  context  : ctx,
  pretty   : true,
  rootValue: {
    async onQuery(query) {

      query.context({
        user          : ctx.authenticated.user,
        isGraphqlQuery: true
      });

    }
  }
})(ctx);
