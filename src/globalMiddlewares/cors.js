const { clientUrl } = require('config/variables');

exports.cors = async(ctx, next) => {

  ctx.set('Access-Control-Allow-Origin', clientUrl);
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  await next();

};
