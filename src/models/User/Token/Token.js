const BaseModel = require('models/BaseModel');
const TokenQueryBuilder = require('./token.queries');

class Token extends BaseModel {

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
        expiration: { type: 'date' },
        token     : {
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

}

module.exports = { Token };
