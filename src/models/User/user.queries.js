const { QueryBuilder } = require('objection');

// const bcrypt = require('bcryptjs');
const { LoginError } = require('errors/errorTypes');

class UserQueryBuilder extends QueryBuilder {

  async findByCredentials(ctx, { email, password }) {

    const user = await this.first().where('email', email);

    if (!user) {

      ctx.throw(new LoginError());

    }

    const authenticated = await user.verifyPassword(password);

    if (!authenticated) {

      ctx.throw(new LoginError());

    }

    return user;

  }

}

module.exports = UserQueryBuilder;
