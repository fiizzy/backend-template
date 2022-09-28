const dayjs = require('dayjs');
const authConstant = require('../../../../constants/authConstant');
const response = require('../../../../utils/response');  
const responseHandler = require('../../../../utils/response/responseHandler');
const register = (registerUsecase) => async (req,res) => {
  try {
    req.body.userType = authConstant.USER_TYPES.User;
    let result = await registerUsecase(req.body);
    return responseHandler(res,result);
  } catch (error) {
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const forgotPassword = (forgotPasswordUsecase) => async (req ,res) => {
  try {
    let result = await forgotPasswordUsecase(req.body);
    return responseHandler(res,result);
  } catch (error) {
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }

};

const validateResetPasswordOtp = (validateResetPasswordOtpUsecase) => async (req ,res) => {
  try {
    let result = await validateResetPasswordOtpUsecase(req.body);
    return responseHandler(res,result);
  } catch (error) {
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const resetPassword = (resetPasswordUsecase) => async (req,res) => {
  try {
    let result = await resetPasswordUsecase(req.body);
    return responseHandler(res,result);
  } catch (error) {
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};
const authentication = (authenticationUsecase) => async (req,res)=>{
  try {
    let result = await authenticationUsecase(req.body, authConstant.PLATFORM.DEVICE);
    return responseHandler(res,result);
  } catch (error) {
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const logout = (logoutUsecase) => async (req,res) => {
  try {
    let user = req.user;
    let token = req.headers.authorization.replace('Bearer ', '');
    let result = await logoutUsecase(user, token,req,res);
    return responseHandler(res,result);
  } catch (error) {
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

module.exports = Object.freeze({
  register,
  authentication,
  forgotPassword,
  resetPassword,
  validateResetPasswordOtp,
  logout
});
