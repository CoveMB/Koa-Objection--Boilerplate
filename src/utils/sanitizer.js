const sanitizeExposedBody = body => {

  const sanitizedBody = JSON.parse(JSON.stringify(body));

  if (sanitizedBody.password) {

    sanitizedBody.password = '*********';

  }

  if (sanitizedBody.email) {

    sanitizedBody.email = '*********';

  }

  if (sanitizedBody.token) {

    sanitizedBody.token = '*********';

  }

  return JSON.stringify({ ...sanitizedBody });

};

module.exports = { sanitizeExposedBody };
