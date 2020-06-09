const BaseModel = require('models/BaseModel');
const validateUserInput = require('./user.validations');
const UserQueryBuilder = require('./user.queries');
const {
  generateAuthToken, revokeAuthToken, revokeAllAuthTokens
} = require('./credential.utils');
const { capitalize } = require('utils');

// This plugin allow for automatic password hashing
const Password = require('objection-password')();

// This plugin allow for unique validation on model
const Unique = require('objection-unique')({
  fields     : [ 'email' ],
  identifiers: [ 'id' ]
});

class User extends Password(Unique(BaseModel)) {

  static get tableName() {

    return 'users';

  }

  static get QueryBuilder() {

    // This register the custom query builder
    return UserQueryBuilder;

  }

  static get jsonSchema() {

    return {
      type    : 'object',
      required: [ 'email', 'password' ],

      properties: {
        id   : { type: 'integer' },
        email: {
          type: 'string', minLength: 1, maxLength: 255
        },
        password: {
          type: 'string', minLength: 1, maxLength: 255
        },
        admin: {
          type: 'boolean'
        }
      }
    };

  }

  static get relationMappings() {

    const {
      Token
      // eslint-disable-next-line global-require
    } = require('models');

    return {
      tokens: {
        relation  : BaseModel.HasManyRelation,
        modelClass: Token,
        join      : {
          from: 'users.id',
          to  : 'tokens.user_id'
        }
      }
    };

  }

  // Omit fields for json response from model
  $formatJson(user) {

    super.$formatJson(user);

    delete user.password;
    delete user.admin;
    delete user.created_at;
    delete user.updated_at;

    return user;

  }

  // This hook triggers before an insert
  async $beforeInsert(queryContext) {

    // Validate before password hashing
    validateUserInput(this);

    if (this.country) {

      this.country = capitalize(this.country);

    }

    if (this.name) {

      this.name = capitalize(this.name);

    }

    // Super will take care of hashing password
    await super.$beforeInsert(queryContext);

  }

  // This hook triggers before an update
  async $beforeUpdate(opt, queryContext) {

    // Validate before password hashing
    validateUserInput(this);

    if (this.country) {

      this.country = capitalize(this.country);

    }

    if (this.name) {

      this.country = capitalize(this.name);

    }

    // Super will take care of hashing password
    await super.$beforeUpdate(opt, queryContext);

  }

  // Modifiers are reusable query snippets that can be used in various places.
  static get modifiers() {

    return {};

  }

  // Generate an auth token for the user
  async generateAuthToken() {

    const token = await generateAuthToken(this);

    return token;

  }

  // Revoke an auth token from the user
  async revokeAuthToken(token) {

    await revokeAuthToken(this, token);

  }

  // Revoke all auth tokens from the user
  async revokeAllAuthTokens() {

    await revokeAllAuthTokens(this);

  }

}

module.exports = User;
