const { Model, QueryBuilder } = require('objection');

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

  // Omit fields for json response from model
  $formatJson(instance) {

    super.$formatJson(instance);

    delete instance.id;

    return instance;

  }

  // Add an updated value each time a model is updated
  $beforeUpdate() {

    this.updated_at = new Date().toISOString();

  }

}

module.exports = BaseModel;
