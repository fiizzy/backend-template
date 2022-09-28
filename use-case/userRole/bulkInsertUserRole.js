
/**
 *bulkInsertUserRole.js
 */

const  userRoleEntity = require('../../entities/userRole');
const response = require('../../utils/response');

/**
 * @description : create multiple records in database.
 * @param {Object} dataToCreate : data for creating documents.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : created UserRoles. {status, message, data}
 */
const bulkInsertUserRole = ({
  userRoleDb,createValidation 
}) => async (dataToCreate,req,res) => {
  let userroleEntities = dataToCreate.map(item => userRoleEntity(item));
  let createdUserRole = await userRoleDb.createMany(userroleEntities);
  return response.success({ data:{ count: createdUserRole.length } });
};
module.exports = bulkInsertUserRole;