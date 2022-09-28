/**
 *partialUpdateUser.js
 */

const  userEntity = require('../../entities/user');
const response = require('../../utils/response');

/**
 * @description : partially update record with data by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {obj} : updated User. {status, message, data}
 */
const partialUpdateUser = ({ userDb }) => async (params,req,res) => {
  let {
    dataToUpdate, query 
  } = params;
  const updatedUser = await userDb.update(query,dataToUpdate);
  if (!updatedUser || updatedUser.length == 0){
    return response.recordNotFound();
  }
  return response.success({ data:updatedUser[0] });
};
module.exports = partialUpdateUser;