/**
 *softDeleteRouteRole.js
 */

const response = require('../../utils/response');

/**
 * @description : soft delete record from database by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response..
 * @return {Object} : deactivated RouteRole. {status, message, data}
 */
const softDeleteRouteRole = ({ routeRoleDb }) => async (params,req,res) => {
  let {
    query, dataToUpdate 
  } = params;
  let updatedRouteRole = await routeRoleDb.update(query, dataToUpdate);
  if (!updatedRouteRole || updatedRouteRole.length == 0){
    return response.recordNotFound();
  }
  return response.success({ data:updatedRouteRole[0] });
};
module.exports = softDeleteRouteRole;
