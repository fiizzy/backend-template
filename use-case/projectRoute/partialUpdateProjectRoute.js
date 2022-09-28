/**
 *partialUpdateProjectRoute.js
 */

const  projectRouteEntity = require('../../entities/projectRoute');
const response = require('../../utils/response');

/**
 * @description : partially update record with data by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {obj} : updated ProjectRoute. {status, message, data}
 */
const partialUpdateProjectRoute = ({ projectRouteDb }) => async (params,req,res) => {
  let {
    dataToUpdate, query 
  } = params;
  const updatedProjectRoute = await projectRouteDb.update(query,dataToUpdate);
  if (!updatedProjectRoute || updatedProjectRoute.length == 0){
    return response.recordNotFound();
  }
  return response.success({ data:updatedProjectRoute[0] });
};
module.exports = partialUpdateProjectRoute;