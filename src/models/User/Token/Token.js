const BaseModel = require('models/BaseModel');
const TokenQueryBuilder = require('./token.queries');

exports.Token = class Token extends BaseModel {

  static get tableName() {

    return 'token';

  }

  static get QueryBuilder() {

    // This register the custom query builder
    return TokenQueryBuilder;

  }

  static get jsonSchema() {

    return {
      type    : 'object',
      required: [ 'token' ],

      properties: {
        id    : { type: 'integer' },
        userId: { type: 'integer' },
        device: {
          type: 'string', minLength: 1, maxLength: 255
        },

        // expiration: { type: 'string' },
        token: {
          type: 'string', minLength: 1, maxLength: 255
        },
      }
    };

  }

  static get relationMappings() {

    // eslint-disable-next-line global-require
    const { User } = require('models');

    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,

        modelClass: User,
        join      : {
          from: 'token.user_id',
          to  : 'user.id'
        }
      },
    };

  }

  // Modifiers are reusable query snippets that can be used in various places.
  static get modifiers() {

    return {
      orderByCreation(builder) {

        builder.orderBy('created_at');

      },
      graphQLAccessControl(builder, user) {

        builder.where('user_id', user.id);

      }
    };

  }

};
