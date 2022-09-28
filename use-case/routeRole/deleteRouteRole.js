
/**
 *deleteRouteRole.js
 */

const response = require('../../utils/response');
    
/**
 * @description : delete record from database.
 * @param {Object} query : query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : deleted RouteRole. {status, message, data}
 */
const deleteRouteRole = ({ routeRoleDb }) => async (params, req, res) => {
  let { query } = params;
  let deletedRouteRole = await routeRoleDb.destroy(query);
  if (!deletedRouteRole || deletedRouteRole.length == 0){
    return response.recordNotFound({ });
  }
  return response.success({ data: deletedRouteRole[0] });
};

module.exports = deleteRouteRole;
