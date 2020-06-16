const sanitizeExposedBody = body => {

  const sanitizedBody = JSON.parse(JSON.stringify(body));

  if (sanitizedBody.password) {

    sanitizedBody.password = '*********';

  }

  if (sanitizedBody.email) {

    sanitizedBody.email = '*********';

  }

  return JSON.stringify({ ...sanitizedBody });

};

module.exports = { sanitizeExposedBody };
