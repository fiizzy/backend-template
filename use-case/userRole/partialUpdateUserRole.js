/**
 *partialUpdateUserRole.js
 */

const  userRoleEntity = require('../../entities/userRole');
const response = require('../../utils/response');

/**
 * @description : partially update record with data by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {obj} : updated UserRole. {status, message, data}
 */
const partialUpdateUserRole = ({ userRoleDb }) => async (params,req,res) => {
  let {
    dataToUpdate, query 
  } = params;
  const updatedUserRole = await userRoleDb.update(query,dataToUpdate);
  if (!updatedUserRole || updatedUserRole.length == 0){
    return response.recordNotFound();
  }
  return response.success({ data:updatedUserRole[0] });
};
module.exports = partialUpdateUserRole;