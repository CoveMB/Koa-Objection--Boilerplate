const { clientUrl } = require('./variables');

exports.corsOptions = {
  'Access-Control-Allow-Origin': clientUrl
};
