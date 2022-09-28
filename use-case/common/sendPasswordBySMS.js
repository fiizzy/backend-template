const response = require('../../utils/response');
const sendSMS = require('../../services/sms');
const ejs = require('ejs');

const sendPasswordBySMS = async (user,req = {},res = {}) => {
  const msg = await ejs.renderFile(`${__basedir}/views/sms/initialPassword/html.ejs`, { password: user.password });
  let smsObj = {
    to: user.mobileNo,
    message: msg
  };
  let result = await sendSMS(smsObj);
  return response.success({ data :result });
};
module.exports = sendPasswordBySMS;