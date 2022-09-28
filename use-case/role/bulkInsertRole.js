
/**
 *bulkInsertRole.js
 */

const  roleEntity = require('../../entities/role');
const response = require('../../utils/response');

/**
 * @description : create multiple records in database.
 * @param {Object} dataToCreate : data for creating documents.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : created Roles. {status, message, data}
 */
const bulkInsertRole = ({
  roleDb,createValidation 
}) => async (dataToCreate,req,res) => {
  let roleEntities = dataToCreate.map(item => roleEntity(item));
  let createdRole = await roleDb.createMany(roleEntities);
  return response.success({ data:{ count: createdRole.length } });
};
module.exports = bulkInsertRole;