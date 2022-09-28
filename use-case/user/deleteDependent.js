const response = require('../../utils/response');

const getDependencyCount = ({
  userDb,userAuthSettingsDb,userTokensDb,userRoleDb
})=> async (filter) =>{
  let user = await userDb.findAll(filter);
  if (user.length){
    let userIds = user.map((obj) => obj.id);

    const userFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const userCnt =  await userDb.count(userFilter);

    const userAuthSettingsFilter = { '$or': [{ userId : { '$in' : userIds } },{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const userAuthSettingsCnt =  await userAuthSettingsDb.count(userAuthSettingsFilter);

    const userTokensFilter = { '$or': [{ userId : { '$in' : userIds } },{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const userTokensCnt =  await userTokensDb.count(userTokensFilter);

    const userRoleFilter = { '$or': [{ userId : { '$in' : userIds } }] };
    const userRoleCnt =  await userRoleDb.count(userRoleFilter);
    let result = {
      user :userCnt + 1,
      userAuthSettings :userAuthSettingsCnt ,
      userTokens :userTokensCnt ,
      userRole :userRoleCnt ,
    };
    return response.success({
      message: 'No of Dependency found',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency found',
      data: {  user : 0 }
    });
  }
};

const deleteWithDependency = ({
  userDb,userAuthSettingsDb,userTokensDb,userRoleDb
})=> async (filter) =>{
  let user = await userDb.findAll(filter);
  if (user.length){
    let userIds = user.map((obj) => obj.id);

    const userFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const userCnt =  (await userDb.destroy(userFilter)).length;

    const userAuthSettingsFilter = { '$or': [{ userId : { '$in' : userIds } },{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const userAuthSettingsCnt =  (await userAuthSettingsDb.destroy(userAuthSettingsFilter)).length;

    const userTokensFilter = { '$or': [{ userId : { '$in' : userIds } },{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const userTokensCnt =  (await userTokensDb.destroy(userTokensFilter)).length;

    const userRoleFilter = { '$or': [{ userId : { '$in' : userIds } }] };
    const userRoleCnt =  (await userRoleDb.destroy(userRoleFilter)).length;
    let deleted = (await userDb.destroy(filter)).length;
    let result = {
      user :userCnt + deleted,
      userAuthSettings :userAuthSettingsCnt ,
      userTokens :userTokensCnt ,
      userRole :userRoleCnt ,
    };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  user : 0 }
    });
  }
};

const softDeleteWithDependency = ({
  userDb,userAuthSettingsDb,userTokensDb,userRoleDb
}) => async (filter,updateBody) =>{
  let user = await userDb.findAll(filter);
  if (user.length){
    let userIds = user.map((obj) => obj.id);

    const userFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const userCnt =  (await userDb.update(userFilter,updateBody)).length;

    const userAuthSettingsFilter = { '$or': [{ userId : { '$in' : userIds } },{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const userAuthSettingsCnt =  (await userAuthSettingsDb.update(userAuthSettingsFilter,updateBody)).length;

    const userTokensFilter = { '$or': [{ userId : { '$in' : userIds } },{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const userTokensCnt =  (await userTokensDb.update(userTokensFilter,updateBody)).length;

    const userRoleFilter = { '$or': [{ userId : { '$in' : userIds } }] };
    const userRoleCnt =  (await userRoleDb.update(userRoleFilter,updateBody)).length;
    let updated = (await userDb.update(filter,updateBody)).length;
    let result = {
      user :userCnt + updated,
      userAuthSettings :userAuthSettingsCnt ,
      userTokens :userTokensCnt ,
      userRole :userRoleCnt ,
    };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  user : 0 }
    });
  }
};
module.exports = {
  getDependencyCount,
  deleteWithDependency,
  softDeleteWithDependency
};
