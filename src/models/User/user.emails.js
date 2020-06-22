const { EmailNotSentError } = require('config/errors/errorTypes');
const { errorEvent } = require('config/errors/errorEvent');
const { emailFrom, clientUrl } = require('config/variables');
const sgMail = require('config/emails');

const sender = emailClient => ({
  async sendWelcomeEmail(ctx, email, name) {

    try {

      await emailClient.send({
        to     : email,
        from   : emailFrom,
        subject: 'Thanks for joining in!',
        text   : `Welcome to the app, ${name}. Let us know how you get along with the app.`,
        html   : '<strong>Website.com</strong>',
      });

    } catch (error) {

      // Since the email is sent asynchronously we just emit an error but dont throw it
      ctx.app.emit(errorEvent, new EmailNotSentError(error), ctx);

    }

  },
  async sendResetPasswordEmail(ctx, email, token) {

    try {

      await emailClient.send({
        to     : 'bmarquiscom@gmail.com',
        from   : emailFrom,
        subject: 'Reset your password',
        html   : `
        <h2>Reset your password</h2>
        <a href="${clientUrl}/reset-password?token=${token.token}">click here</a>`,
      });

    } catch (error) {

      // Since the email is sent asynchronously we just emit an error but dont throw it
      ctx.app.emit(errorEvent, new EmailNotSentError(error), ctx);

    }

  },
  async sendCancellationEmail(ctx, email, name) {

    try {

      await emailClient.send({
        to     : email,
        from   : emailFrom,
        subject: 'Thanks for joining in!',
        text   : `Goodbye, ${name}. I hope to see you back sometime soon.`,
        html   : '<strong>Website.com</strong>',
      });

    } catch (error) {

      // Since the email is sent asynchronously we just emit an error but dont throw it
      ctx.app.emit(errorEvent, new EmailNotSentError(error), ctx);

    }

  }
});

const sendEmails = sender(sgMail);

module.exports = sendEmails;
