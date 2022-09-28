
/**
 *addUserRole.js
 */

const  userRoleEntity = require('../../entities/userRole');
const response = require('../../utils/response');

/**
 * @description : create new record of userRole in database.
 * @param {Object} dataToCreate : data for create new document.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of create. {status, message, data}
 */
const addUserRole = ({
  userRoleDb,createValidation 
}) => async (dataToCreate,req,res) => {
  const validateRequest = await createValidation(dataToCreate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let createdUserRole  = userRoleEntity(dataToCreate);
  createdUserRole = await userRoleDb.createOne(createdUserRole );
  return response.success({ data:createdUserRole });
};
module.exports = addUserRole;