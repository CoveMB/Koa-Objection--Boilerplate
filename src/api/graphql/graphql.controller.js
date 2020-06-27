const graphqlHTTP = require('koa-graphql');
const graphQlSchema  = require('config/graphql');
const { isDevelopment } = require('config/variables');
const { ImplementationMissingError } = require('config/errors/errorTypes');

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
        runBefore(result, builder) {

          try {

            builder.modify('graphQLAccessControl', ctx.authenticated.user);

          } catch (error) {

            throw new ImplementationMissingError(`graphQLAccessControl modifier for one of the model queried by the graphQL query | ${error.stack}`);

          }

        },
      });

    }
  }
})(ctx);
