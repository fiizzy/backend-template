/**
 *findAllProjectRoute.js
 */

const response = require('../../utils/response');

/**
 * @description : find all records from database based on query and options.
 * @param {Object} params : request body including option and query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : found ProjectRoute(s). {status, message, data}
 */
const findAllProjectRoute = ({
  projectRouteDb,filterValidation 
}) => async (params,req,res) => {
  let {
    options, query, isCountOnly 
  } = params;
  const validateRequest = await filterValidation(params);
  if (!validateRequest.isValid) {
    return response.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
  }
  if (isCountOnly){
    let totalRecords = await projectRouteDb.count(query);
    return response.success({ data: { totalRecords } });  
  }
  else {
    let foundProjectRoute = await projectRouteDb.paginate(query,options);
    if (!foundProjectRoute){
      return response.recordNotFound();
    }
    return response.success({ data:foundProjectRoute });
  }
};
module.exports = findAllProjectRoute;