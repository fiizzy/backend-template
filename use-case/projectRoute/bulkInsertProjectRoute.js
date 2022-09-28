
/**
 *bulkInsertProjectRoute.js
 */

const  projectRouteEntity = require('../../entities/projectRoute');
const response = require('../../utils/response');

/**
 * @description : create multiple records in database.
 * @param {Object} dataToCreate : data for creating documents.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : created ProjectRoutes. {status, message, data}
 */
const bulkInsertProjectRoute = ({
  projectRouteDb,createValidation 
}) => async (dataToCreate,req,res) => {
  let projectrouteEntities = dataToCreate.map(item => projectRouteEntity(item));
  let createdProjectRoute = await projectRouteDb.createMany(projectrouteEntities);
  return response.success({ data:{ count: createdProjectRoute.length } });
};
module.exports = bulkInsertProjectRoute;