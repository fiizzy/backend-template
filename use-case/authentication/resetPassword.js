const dayjs = require('dayjs');
const bcrypt = require('bcrypt');
const response = require('../../utils/response');
const emailService = require('../../services/email');

/**
 * @description : reset password with code and new password
 * @param {Object} params : request body.
 * @return {Object} : response for resetPassword {status, message, data}
 */ 
const resetPassword = ({
  userDb,userAuthSettingsDb 
}) => async (params) => {
  if (!params.code || !params.newPassword) {
    return response.badRequest({ message : 'Insufficient request parameters! newPassword and code is required.' });
  }
  let userAuthSetting = await userAuthSettingsDb.findOne({ resetPasswordCode: params.code });
  //TODO : add condition for guest User

  if (userAuthSetting && userAuthSetting.expiredTimeOfResetPasswordCode) {
    if (dayjs(new Date()).isAfter(dayjs(userAuthSetting.expiredTimeOfResetPasswordCode))) {
      // link expire
      return response.badRequest({ message:'Your reset password link is expired.' });
    }
  } else {
    // invalid code
    return response.badRequest({ message :'Invalid Code' });
  }
  where = { id:userAuthSetting.userId };
  where.isActive = true;where.isDeleted = false;    let newPassword = await bcrypt.hash(params.newPassword, 8);
  const user = await userDb.update(where,{ 'password': newPassword });
  await userAuthSettingsDb.update({ id : userAuthSetting.id }, { loginRetryLimit:0 });
  let mailObj = {
    subject: 'Reset Password',
    to: user.email,
    template: '/views/email/successfulPasswordReset',
    data: {
      isWidth: true,
      email: user.email || '-',
      message: 'Your password has been changed Successfully.'
    }
  };
  await emailService.sendMail(mailObj);
  return response.success({ message :'Password reset successfully' });
};
module.exports = resetPassword;
