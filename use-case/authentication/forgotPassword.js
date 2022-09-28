
const response = require('../../utils/response');
const responseStatus = require('../../utils/response/responseStatus');
const makeSendResetPasswordNotification = require('../common/sendResetPasswordNotification');
const authConstant = require('../../constants/authConstant');

/**
 * @description : send email or sms to user with OTP on forgot password
 * @param {Object} params : request body.
 * @return {Object} : response for forgotPassword {status, message, data}
 */ 
const forgotPassword = ({
  userDb ,userAuthSettingsDb 
}) => async (params) => {
  if (!params.email) {
    return response.badRequest({ message : 'Insufficient request parameters! email is required' });
  }
  let where = { email: params.email };
  where.isActive = true;where.isDeleted = false;    params.email = params.email.toString().toLowerCase();
  let user = await userDb.findOne(where);
  if (!user) {
    return response.recordNotFound();
  } 
  let sendResetPasswordNotification = makeSendResetPasswordNotification({
    userDb,
    userAuthSettingsDb
  });
  let notificationResponse = await sendResetPasswordNotification(user);
  if (notificationResponse.status == responseStatus.success) {
    let {
      resultOfEmail, resultOfSMS
    } = notificationResponse.data;
    if (resultOfEmail && resultOfSMS) {
      return response.success({ message :'otp successfully send.' });
    } else if (resultOfEmail && !resultOfSMS) {
      return response.success({ message : 'otp successfully send to your email.' });
    } else if (!resultOfEmail && resultOfSMS) {
      return response.success({ message : 'otp successfully send to your mobile number.' });
    } else {
      return response.failure({ message :'otp can not be sent due to some issue try again later' });
    }
  } else {
    return response.failure();
  }
    
};
module.exports = forgotPassword;
