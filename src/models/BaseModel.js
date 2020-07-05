const { Model } = require('objection');
const BaseModelQueryBuilder = require('./BaseModel.queries');

// const BaseModelQueryBuilder = require('./BaseModel.queries');

class BaseModel extends Model {

  static get QueryBuilder() {

    // This register the custom query builder
    return BaseModelQueryBuilder;

  }

  // Add an updated value each time a model is updated
  $beforeUpdate() {

    this.updated_at = new Date().toISOString();

  }

}

module.exports = BaseModel;
