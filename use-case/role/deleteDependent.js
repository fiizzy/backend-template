const response = require('../../utils/response');

const getDependencyCount = ({
  roleDb,routeRoleDb,userRoleDb
})=> async (filter) =>{
  let role = await roleDb.findAll(filter);
  if (role.length){
    let roleIds = role.map((obj) => obj.id);

    const routeRoleFilter = { '$or': [{ roleId : { '$in' : roleIds } }] };
    const routeRoleCnt =  await routeRoleDb.count(routeRoleFilter);

    const userRoleFilter = { '$or': [{ roleId : { '$in' : roleIds } }] };
    const userRoleCnt =  await userRoleDb.count(userRoleFilter);
    let result = {
      routeRole :routeRoleCnt ,
      userRole :userRoleCnt ,
    };
    return response.success({
      message: 'No of Dependency found',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency found',
      data: {  role : 0 }
    });
  }
};

const deleteWithDependency = ({
  roleDb,routeRoleDb,userRoleDb
})=> async (filter) =>{
  let role = await roleDb.findAll(filter);
  if (role.length){
    let roleIds = role.map((obj) => obj.id);

    const routeRoleFilter = { '$or': [{ roleId : { '$in' : roleIds } }] };
    const routeRoleCnt =  (await routeRoleDb.destroy(routeRoleFilter)).length;

    const userRoleFilter = { '$or': [{ roleId : { '$in' : roleIds } }] };
    const userRoleCnt =  (await userRoleDb.destroy(userRoleFilter)).length;
    let deleted = (await roleDb.destroy(filter)).length;
    let result = {
      routeRole :routeRoleCnt ,
      userRole :userRoleCnt ,
    };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  role : 0 }
    });
  }
};

const softDeleteWithDependency = ({
  roleDb,routeRoleDb,userRoleDb
}) => async (filter,updateBody) =>{
  let role = await roleDb.findAll(filter);
  if (role.length){
    let roleIds = role.map((obj) => obj.id);

    const routeRoleFilter = { '$or': [{ roleId : { '$in' : roleIds } }] };
    const routeRoleCnt =  (await routeRoleDb.update(routeRoleFilter,updateBody)).length;

    const userRoleFilter = { '$or': [{ roleId : { '$in' : roleIds } }] };
    const userRoleCnt =  (await userRoleDb.update(userRoleFilter,updateBody)).length;
    let updated = (await roleDb.update(filter,updateBody)).length;
    let result = {
      routeRole :routeRoleCnt ,
      userRole :userRoleCnt ,
    };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  role : 0 }
    });
  }
};
module.exports = {
  getDependencyCount,
  deleteWithDependency,
  softDeleteWithDependency
};
