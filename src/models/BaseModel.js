/* eslint-disable consistent-return */
const { Model, QueryBuilder } = require('objection');
const { ImplementationMissingError } = require('config/errors/errorTypes');
const { isFromGraphqlQuery } = require('./model.utils');

class BaseModel extends Model {

  static get QueryBuilder() {

    // This register the custom query builder
    return class BaseModelQueryBuilder extends QueryBuilder {

      async findOrCreate(data) {

        // Try to find existing instance
        let instance = await this.findOne(data);

        // If no instance exist create one
        if (!instance) {

          instance = await this.insert(data);

        }

        return instance;

      }

    };

  }

  static async validateGQLControlImplementation(hooksArguments) {

    if (isFromGraphqlQuery(hooksArguments)) {

      try {

        return this.accessControlGraphQLQuery(hooksArguments);

      } catch (error) {

        throw new ImplementationMissingError(`accessControlGraphQLQuery function for the ${this.name} model, ${error}`);

      }

    }

  }

  static async afterInsert(hooksArguments) {

    await super.beforeInsert(hooksArguments);

    return this.validateGQLControlImplementation(hooksArguments);

  }

  static async afterUpdate(hooksArguments) {

    await super.beforeInsert(hooksArguments);

    return this.validateGQLControlImplementation(hooksArguments);

  }

  static async afterDelete(hooksArguments) {

    await super.beforeInsert(hooksArguments);

    return this.validateGQLControlImplementation(hooksArguments);

  }

  static async afterFind(hooksArguments) {

    await super.beforeInsert(hooksArguments);

    return this.validateGQLControlImplementation(hooksArguments);

  }

  $beforeUpdate() {

    this.updated_at = new Date().toISOString();

  }

}

module.exports = BaseModel;
