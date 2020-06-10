const BaseModel = require('models/BaseModel');

class Token extends BaseModel {

  static get tableName() {

    return 'tokens';

  }

  static get jsonSchema() {

    return {
      type    : 'object',
      required: [ 'token' ],

      properties: {
        id    : { type: 'integer' },
        userId: { type: 'integer' },
        token : {
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
          from: 'tokens.user_id',
          to  : 'users.id'
        }
      },
    };

  }

}

module.exports = { Token };
