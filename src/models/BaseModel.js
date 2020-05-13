const { Model } = require('objection');

class BaseModel extends Model {

  $beforeUpdate() {
    this.updated_at = new Date().toISOString()
  }
}

module.exports = BaseModel;