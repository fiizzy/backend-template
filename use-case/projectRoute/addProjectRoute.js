
/**
 *addProjectRoute.js
 */

const  projectRouteEntity = require('../../entities/projectRoute');
const response = require('../../utils/response');

/**
 * @description : create new record of projectRoute in database.
 * @param {Object} dataToCreate : data for create new document.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of create. {status, message, data}
 */
const addProjectRoute = ({
  projectRouteDb,createValidation 
}) => async (dataToCreate,req,res) => {
  const validateRequest = await createValidation(dataToCreate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let createdProjectRoute  = projectRouteEntity(dataToCreate);
  createdProjectRoute = await projectRouteDb.createOne(createdProjectRoute );
  return response.success({ data:createdProjectRoute });
};
module.exports = addProjectRoute;