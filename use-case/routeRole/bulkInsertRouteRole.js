
/**
 *bulkInsertRouteRole.js
 */

const  routeRoleEntity = require('../../entities/routeRole');
const response = require('../../utils/response');

/**
 * @description : create multiple records in database.
 * @param {Object} dataToCreate : data for creating documents.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : created RouteRoles. {status, message, data}
 */
const bulkInsertRouteRole = ({
  routeRoleDb,createValidation 
}) => async (dataToCreate,req,res) => {
  let routeroleEntities = dataToCreate.map(item => routeRoleEntity(item));
  let createdRouteRole = await routeRoleDb.createMany(routeroleEntities);
  return response.success({ data:{ count: createdRouteRole.length } });
};
module.exports = bulkInsertRouteRole;