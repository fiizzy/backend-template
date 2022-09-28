/**
 *changePassword.js
 */
const bcrypt = require('bcrypt');

const response = require('../../utils/response');

/**
 * @description : change Password.
 * @param {Object} data : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of change password. {status, message, data}
 */
const changePassword = ({ userDb }) => async (data,req,res) => {

  if (!data.newPassword || !data.userId || !data.oldPassword) {
    return response.validationError({ message:'Please Provide userId and new Password and Old password' });
  }

  let password = data.newPassword;
  let oldPassword = data.oldPassword;
  let user = await userDb.findOne({ id :data.userId });
  if (!user){
    return response.badRequest({ message:'User not found.' });
  }
  let isPasswordMatch = await user.isPasswordMatch(oldPassword);
  if (!isPasswordMatch){
    return response.badRequest({ message:'Incorrect old password.' });
  }
  password = await bcrypt.hash(password, 8);
  let updatedUser = userDb.update({ id : user.id }, { 'password':password });
  if (updatedUser) {
    return response.success({ message : 'Password changed successfully.' });
  }
  return response.badRequest({ message : 'Password not updated.' });
};

module.exports = changePassword;