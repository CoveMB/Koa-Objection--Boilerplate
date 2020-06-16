const { clientUrl } = require('config/variables');

exports.cors = async(ctx, next) => {

  ctx.set('Access-Control-Allow-Headers', '*');
  ctx.set('Access-Control-Allow-Origin', clientUrl);
  ctx.set('Access-Control-Allow-Credentials', 'true');
  ctx.set('Access-Control-Allow-Methods', '*');
  await next();

};
