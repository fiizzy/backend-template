
/**
 *deleteRole.js
 */

const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeDeleteWithDependency = require('./deleteDependent').deleteWithDependency;
const response = require('../../utils/response');

/**
 * @description : delete record from database.
 * @param {Object} params : request body including query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : deleted Role. {status, message, data}
 */
const deleteRole = ({
  roleDb,routeRoleDb,userRoleDb
}) => async (params,req,res) => {
  let {
    isWarning, query 
  } = params;
  if (isWarning) {
    const getDependencyCount = makeGetDependencyCount({
      roleDb,
      routeRoleDb,
      userRoleDb
    });
    return await getDependencyCount(query);
  } else {
    const deleteWithDependency = makeDeleteWithDependency({
      roleDb,
      routeRoleDb,
      userRoleDb
    });
    return await deleteWithDependency(query);
  }
};

module.exports = deleteRole;
