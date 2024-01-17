// Schemas for Swagger documentation

/**
 * @typedef User
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} email.required - The email of the user (must be unique).
 * @property {string} phoneNumber - The phone number of the user.
 * @property {string} acctNumber - The account number of the user.
 * @property {string} pin - The 4 digits pin of the user.
 * @property {string} password - The hashed password of the user.
 * @property {string} confirmPassword - The hashed confirmation password of the user.
 * @property {array} blacklist - An array of blacklisted JWT tokens for this user.
 */

// Exporting schemas for use in Swagger documentation
module.exports = {
    User: {},
  };
  