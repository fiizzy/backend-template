/**
 *partialUpdateRole.js
 */

const  roleEntity = require('../../entities/role');
const response = require('../../utils/response');

/**
 * @description : partially update record with data by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {obj} : updated Role. {status, message, data}
 */
const partialUpdateRole = ({ roleDb }) => async (params,req,res) => {
  let {
    dataToUpdate, query 
  } = params;
  const updatedRole = await roleDb.update(query,dataToUpdate);
  if (!updatedRole || updatedRole.length == 0){
    return response.recordNotFound();
  }
  return response.success({ data:updatedRole[0] });
};
module.exports = partialUpdateRole;