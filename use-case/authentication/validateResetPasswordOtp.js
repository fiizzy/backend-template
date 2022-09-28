const dayjs = require('dayjs');
const response = require('../../utils/response');

/**
 * @description : validate OTP
 * @param {Object} params : request body.
 * @return {Object} : response for validateResetPasswordOtp  {status, message, data}
 */
const validateResetPasswordOtp = ({ userAuthSettingsDb }) => async (params) => {
  if (!params.otp) {
    return response.badRequest({ message : 'Insufficient request parameters! otp is required.' });
  }
  let userAuthSetting = await userAuthSettingsDb.findOne({ resetPasswordCode: params.otp });
  if (!userAuthSetting || !userAuthSetting.expiredTimeOfResetPasswordCode) {
    return response.badRequest({ message : 'Invalid OTP' });
  }
  // link expire
  if (dayjs(new Date()).isAfter(dayjs(userAuthSetting.expiredTimeOfResetPasswordCode))) {
    return response.badRequest({ message:'Your reset password link is expired.' });
  }
  return response.success({ message :'OTP Validated' });
};
module.exports = validateResetPasswordOtp;
