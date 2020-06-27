const authenticated = require('./authenticated');
const error = require('./error');
const log = require('./log');
const validate = require('./validate');

module.exports = {
  ...authenticated,
  ...error,
  ...log,
  ...validate
};
