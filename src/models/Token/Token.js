const BaseModel = require('models/BaseModel');

class Token extends BaseModel {

  // Table name is the only required property.
  static get tableName() {

    return 'tokens';

  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
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

  // This object defines the relations to other models.
  static get relationMappings() {

    // One way to prevent circular references
    // is to require the model classes here.
    const User = require('models/User/User');

    return {
      user: {
        relation: Model.BelongsToOneRelation,

        // The related model. This can be either a Model subclass constructor or an
        // absolute file path to a module that exports one.
        modelClass: User,
        join      : {
          from: 'tokens.user_id',
          to  : 'users.id'
        }
      },
    };

  }

}

module.exports = Token;
