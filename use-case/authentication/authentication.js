
const response = require('../../utils/response');
const makeLoginUser = require('../common/loginUser'); 

/**
 * @description : login with username and password
 * @param {Object} params : request body.
 * @param {Number} platform : platform identification.
 * @return {Object} : response for authentication {status, message, data}
 */
const authentication = ({
  userDb,userTokensDb,userAuthSettingsDb 
}) => async (params, platform) => {
  let {
    username,password
  } = params;
  if (!username || !password){
    return response.badRequest({ message : 'Insufficient request parameters! username and password is required.' });
  }
  let roleAccess = null;
  if (params.includeRoleAccess){
    roleAccess = params.includeRoleAccess;
  }
  const loginUser = makeLoginUser({
    userDb,
    userTokensDb,
    userAuthSettingsDb
  });
  return result = await loginUser(username, platform, password, roleAccess);
};
module.exports = authentication;