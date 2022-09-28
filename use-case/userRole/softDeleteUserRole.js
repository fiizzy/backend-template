/**
 *softDeleteUserRole.js
 */

const response = require('../../utils/response');

/**
 * @description : soft delete record from database by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response..
 * @return {Object} : deactivated UserRole. {status, message, data}
 */
const softDeleteUserRole = ({ userRoleDb }) => async (params,req,res) => {
  let {
    query, dataToUpdate 
  } = params;
  let updatedUserRole = await userRoleDb.update(query, dataToUpdate);
  if (!updatedUserRole || updatedUserRole.length == 0){
    return response.recordNotFound();
  }
  return response.success({ data:updatedUserRole[0] });
};
module.exports = softDeleteUserRole;
