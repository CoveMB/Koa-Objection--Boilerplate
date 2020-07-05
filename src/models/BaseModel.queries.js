const { QueryBuilder } = require('objection');

class BaseModelQueryBuilder extends QueryBuilder {

  async findOrCreate(data) {

    // Try to find existing instance
    let instance = await this.findOne(data);

    // If no instance exist create one
    if (!instance) {

      instance = await this.insert(data);

    }

    return instance;

  }

  async findByUuid(uuid) {

    // Try to find existing instance by it's uuid
    return this.findOne({ uuid });

  }

}

module.exports = BaseModelQueryBuilder;
