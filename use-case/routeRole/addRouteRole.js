
/**
 *addRouteRole.js
 */

const  routeRoleEntity = require('../../entities/routeRole');
const response = require('../../utils/response');

/**
 * @description : create new record of routeRole in database.
 * @param {Object} dataToCreate : data for create new document.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of create. {status, message, data}
 */
const addRouteRole = ({
  routeRoleDb,createValidation 
}) => async (dataToCreate,req,res) => {
  const validateRequest = await createValidation(dataToCreate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let createdRouteRole  = routeRoleEntity(dataToCreate);
  createdRouteRole = await routeRoleDb.createOne(createdRouteRole );
  return response.success({ data:createdRouteRole });
};
module.exports = addRouteRole;