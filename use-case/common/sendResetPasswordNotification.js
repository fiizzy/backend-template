const dayjs = require('dayjs');
const uuid = require('uuid').v4;
const ejs = require('ejs');
const { FORGOT_PASSWORD_WITH } = require('../../constants/authConstant');
const response = require('../../utils/response');

const { sendMail } = require('../../services/email');
const { sendSMS } = require('../../services/sms');

const sendResetPasswordNotification = ({
  userDb,userAuthSettingsDb
}) => async (user,req = {},res = {}) => {
  let resultOfEmail = false;
  let resultOfSMS = false;
  let token = uuid();
  let expires = dayjs();
  expires = expires.add(FORGOT_PASSWORD_WITH.EXPIRE_TIME, 'minute').toISOString();
  await userAuthSettingsDb.update({ userId :user.id }, {
    resetPasswordCode: token,
    expiredTimeOfResetPasswordCode: expires
  });
  if (FORGOT_PASSWORD_WITH.LINK.email){

    let mailObj = {
      subject: 'Reset Password',
      to: user.email,
    };
    let viewType = '/reset-password/';
    mailObj.template = '/views/email/resetPassword';
    mailObj.data = {
      userName: user.username || '-',
      link: `http://localhost:${process.env.PORT}` + viewType + token,
      linkText: 'Reset Password',
    };
    try {
      await sendMail(mailObj);
      resultOfEmail = true;
    } catch (error) {
      console.log(error);
    }
  }
  if (FORGOT_PASSWORD_WITH.LINK.sms){
    let viewType = '/reset-password/';
    let link = `http://localhost:${process.env.PORT}${viewType + token}`;
    const msg = await ejs.renderFile(`${__basedir}/views/sms/resetPassword/html.ejs`, { link : link });
    let smsObj = {
      to:user.mobileNo,
      message:msg
    };
    try {
      await sendSMS(smsObj);
      resultOfSMS = true;
    } catch (error){
      console.log(error);
    }
  }
  return response.success({
    data :{
      resultOfEmail,
      resultOfSMS 
    } 
  });
};
module.exports = sendResetPasswordNotification;
