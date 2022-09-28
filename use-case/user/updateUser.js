/**
 *updateUser.js
 */

const  userEntity = require('../../entities/user');
const response = require('../../utils/response');

/**
 * @description : update record with data by id.
 * @param {Object} params : request body including query and data.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : updated User. {status, message, data}
 */
const updateUser = ({
  userDb, updateValidation
}) => async (params,req,res) => {
  let {
    dataToUpdate, query 
  } = params;
  const validateRequest = await updateValidation(dataToUpdate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let updatedUser = userEntity(dataToUpdate);
  updatedUser = await userDb.update(query,updatedUser);
  if (!updatedUser || updatedUser.length == 0){
    return response.recordNotFound();
  }
  return response.success({ data:updatedUser[0] });
};
module.exports = updateUser;