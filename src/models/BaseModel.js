const { Model, QueryBuilder } = require('objection');

class BaseModel extends Model {

  static get QueryBuilder() {

    // This register the custom query builder
    return class BaseModelQueryBuilder extends QueryBuilder {

      async findOrCreate(data) {

        // Try to find existing Company
        let instance = await this.findOne(data);

        // If no company exist create one
        if (!instance) {

          instance = await this.insert(data);

        }

        return instance;

      }

    };

  }

  $beforeUpdate() {

    this.updated_at = new Date().toISOString();

  }

}

module.exports = BaseModel;
