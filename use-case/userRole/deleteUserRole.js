
/**
 *deleteUserRole.js
 */

const response = require('../../utils/response');
    
/**
 * @description : delete record from database.
 * @param {Object} query : query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : deleted UserRole. {status, message, data}
 */
const deleteUserRole = ({ userRoleDb }) => async (params, req, res) => {
  let { query } = params;
  let deletedUserRole = await userRoleDb.destroy(query);
  if (!deletedUserRole || deletedUserRole.length == 0){
    return response.recordNotFound({ });
  }
  return response.success({ data: deletedUserRole[0] });
};

module.exports = deleteUserRole;
