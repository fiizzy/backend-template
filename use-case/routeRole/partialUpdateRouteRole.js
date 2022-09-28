/**
 *partialUpdateRouteRole.js
 */

const  routeRoleEntity = require('../../entities/routeRole');
const response = require('../../utils/response');

/**
 * @description : partially update record with data by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {obj} : updated RouteRole. {status, message, data}
 */
const partialUpdateRouteRole = ({ routeRoleDb }) => async (params,req,res) => {
  let {
    dataToUpdate, query 
  } = params;
  const updatedRouteRole = await routeRoleDb.update(query,dataToUpdate);
  if (!updatedRouteRole || updatedRouteRole.length == 0){
    return response.recordNotFound();
  }
  return response.success({ data:updatedRouteRole[0] });
};
module.exports = partialUpdateRouteRole;