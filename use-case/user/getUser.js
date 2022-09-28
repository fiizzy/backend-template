/**
 *getUser.js
 */
 
const response = require('../../utils/response');

/**
 * @description : find record from database by id;
 * @param {Object} params : request body including option and query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : found User. {status, message, data}
 */
const getUser = ({
  userDb, filterValidation 
}) => async (params,req,res) => {
  let {
    query, options  
  } = params;
  const validateRequest = await filterValidation(options);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let foundUser = await userDb.findOne(query, options);
  if (!foundUser){
    return response.recordNotFound();
  }
  return response.success({ data:foundUser });
};
module.exports = getUser;