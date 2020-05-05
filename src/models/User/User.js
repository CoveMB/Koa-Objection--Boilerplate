// const { passwordValidation, emailValidation } = require('./user.validations');
// const { deletesUsersTasks } = require('./user.utils');
// const {
//   hashPassword, findByCredentials, generateAuthToken, revokeAuthToken, revokeAllAuthTokens
// } = require('./credential.utils');

// // The schema that define the User model
// const userSchema = new mongoose.Schema({

//   isAdmin: {
//     type: Boolean, default: false
//   },
//   name: {
//     type    : String,
//     required: true,
//     trim    : true
//   },
//   password: {
//     type    : String,
//     required: true,
//     trim    : true,
//     validate(password) {

//       // Validate password before hashing
//       passwordValidation(password);

//     }
//   },
//   email: {
//     type     : String,
//     unique   : true,
//     required : true,
//     trim     : true,
//     lowercase: true,
//     validate(email) {

//       // Validate email
//       emailValidation(email);

//     }
//   },
//   age   : { type: Number, },
//   tokens: [
//     {
//       token: {
//         type: String, required: true
//       }
//     }
//   ]
// });

// /**
//  * User relationships
//  */

// // Create virtual ref for user's tasks
// userSchema.virtual('tasks', {
//   ref         : 'Task',
//   localField  : '_id',
//   foreignField: 'owner'
// });

// /**
//  * User JSON
//  */

// // Prevent from returning password and tokens when we return a user
// userSchema.methods.toJSON = function() {

//   const userObject = this.toObject();

//   delete userObject.password;
//   delete userObject.tokens;
//   delete userObject.isAdmin;

//   return userObject;

// };

// /**
//  * User methods
//  */

// // Find a user depending of the passed credentials
// userSchema.statics.findByCredentials = findByCredentials;

// // Generate a JWT token for the user
// userSchema.methods.generateAuthToken = generateAuthToken;

// // Revoke a JWT token for the user
// userSchema.methods.revokeAuthToken = revokeAuthToken;

// // Revoke all JWT token for the user
// userSchema.methods.revokeAllAuthTokens = revokeAllAuthTokens;

// /**
//  * User middleware
//  */

// // Hash the password before any saving (during create and update)
// userSchema.pre('save', hashPassword);

// // Delete the user's tasks on delete
// userSchema.pre('remove', deletesUsersTasks);

// // Create the model
// const User = mongoose.model('User', userSchema);

// module.exports = User;
