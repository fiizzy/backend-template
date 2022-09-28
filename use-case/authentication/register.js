const  userEntity = require('../../entities/user');
const response = require('../../utils/response');
const responseStatus = require('../../utils/response/responseStatus');
const authConstant = require('../../constants/authConstant');
const sendPasswordBySMS = require('../common/sendPasswordBySMS'); 
const sendPasswordByEmail = require('../common/sendPasswordByEmail'); 
const makeCheckUniqueFieldsInDatabase = require('../../utils/checkUniqueFieldsInDatabase');

/**
 * @description : user registration 
 * @param {Object} params : request for register
 * @return {Object} : response for register {status, message, data}
 */
const register = ({ 
  userDb, 
  createValidation,
}) => async (params) => {
  let isEmptyPassword = false;
  if (!params.password){
    isEmptyPassword = true;
    params.password = Math.random().toString(36).slice(2);
  }

  let validateSchema = await createValidation(params);
  if (!validateSchema.isValid) {
    return response.validationError({ message: validateSchema.message });
  }

  let newUser = userEntity(params);

  let checkUniqueFieldsInDatabase = makeCheckUniqueFieldsInDatabase(userDb);
  let checkUniqueFields = await checkUniqueFieldsInDatabase([ 'username', 'email' ],newUser,'REGISTER');
  if (checkUniqueFields.isDuplicate){
    return response.validationError({ message : `${checkUniqueFields.value} already exists.Unique ${checkUniqueFields.field} are allowed.` });
  }

  const result = await userDb.createOne(newUser);
  if (isEmptyPassword && params.mobileNo){
    await sendPasswordBySMS({
      mobileNo: params.mobileNo,
      password: params.password
    });
  }
  if (isEmptyPassword && params.email){
    await sendPasswordByEmail({
      email: params.email,
      password: params.password
    });
  }
  return response.success({ data :result });
    
};

module.exports = register;