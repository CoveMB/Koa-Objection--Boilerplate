const authenticated = require('./authenticated');
const cors = require('./cors');
const error = require('./error');
const log = require('./log');
const validate = require('./validate');

module.exports = {
  ...authenticated,
  ...cors,
  ...error,
  ...log,
  ...validate
};
