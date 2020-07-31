/* eslint-disable import/order */
/* eslint-disable no-param-reassign */
const BaseModel = require('models/BaseModel');
const validateUserInput = require('./user.validations');
const UserQueryBuilder = require('./user.queries');

// This plugin allow for automatic password hashing, if you want to allow an empty password you need to pass it allowEmptyPassword (this way user can register and set their password after validating their email)
const Password = require('objection-password')({
  allowEmptyPassword: true
});

// This plugin allow for unique validation on model
const Unique = require('objection-unique')({
  fields     : [ 'email' ],
  identifiers: [ 'id' ]
});

exports.User = class User extends Password(Unique(BaseModel)) {

  static get tableName() {

    return 'user';

  }

  static get QueryBuilder() {

    // This register the custom query builder
    return UserQueryBuilder;

  }

  static get jsonSchema() {

    return {
      type    : 'object',
      required: [ 'email' ],

      properties: {
        id   : { type: 'integer' },
        uuid : { type: 'string' },
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
          from: 'user.id',
          to  : 'token.userId'
        }
      }
    };

  }

  // Omit fields for json response from model
  $formatJson(user) {

    super.$formatJson(user);

    delete user.password;
    delete user.admin;
    delete user.createdAt;
    delete user.updatedAt;

    return user;

  }

  // This hook triggers before an insert
  async $beforeInsert(queryContext) {

    // Validate before password hashing
    validateUserInput(this);

    // Here you can perform custom formatting
    // If User where to have a name you could do
    // if (this.name) {

    //   this.name = capitalize(this.name);

    // }

    // Super will take care of hashing password
    await super.$beforeInsert(queryContext);

  }

  // This hook triggers before an update
  async $beforeUpdate(opt, queryContext) {

    // Validate before password hashing
    validateUserInput(this);

    // Here you can perform custom formatting
    // If User where to have a name you could do
    // if (this.name) {

    //   this.name = capitalize(this.name);

    // }

    // Super will take care of hashing password
    await super.$beforeUpdate(opt, queryContext);

  }

  // Modifiers are reusable query snippets that can be used in various places.
  static get modifiers() {

    return {

      // Get modifiers from base class
      ...super.modifiers,

      // This modifier control the data that can be accessed depending of the authenticated user
      graphQLAccessControl(builder, user) {

        // Only the authenticated user should be accessible
        builder.where('id', user.id);

      }
    };

  }

};
