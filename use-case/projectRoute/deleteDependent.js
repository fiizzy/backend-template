const response = require('../../utils/response');

const getDependencyCount = ({
  projectRouteDb,routeRoleDb
})=> async (filter) =>{
  let projectRoute = await projectRouteDb.findAll(filter);
  if (projectRoute.length){
    let projectRouteIds = projectRoute.map((obj) => obj.id);

    const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectRouteIds } }] };
    const routeRoleCnt =  await routeRoleDb.count(routeRoleFilter);
    let result = { routeRole :routeRoleCnt , };
    return response.success({
      message: 'No of Dependency found',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency found',
      data: {  projectRoute : 0 }
    });
  }
};

const deleteWithDependency = ({
  projectRouteDb,routeRoleDb
})=> async (filter) =>{
  let projectRoute = await projectRouteDb.findAll(filter);
  if (projectRoute.length){
    let projectRouteIds = projectRoute.map((obj) => obj.id);

    const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectRouteIds } }] };
    const routeRoleCnt =  (await routeRoleDb.destroy(routeRoleFilter)).length;
    let deleted = (await projectRouteDb.destroy(filter)).length;
    let result = { routeRole :routeRoleCnt , };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  projectRoute : 0 }
    });
  }
};

const softDeleteWithDependency = ({
  projectRouteDb,routeRoleDb
}) => async (filter,updateBody) =>{
  let projectRoute = await projectRouteDb.findAll(filter);
  if (projectRoute.length){
    let projectRouteIds = projectRoute.map((obj) => obj.id);

    const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectRouteIds } }] };
    const routeRoleCnt =  (await routeRoleDb.update(routeRoleFilter,updateBody)).length;
    let updated = (await projectRouteDb.update(filter,updateBody)).length;
    let result = { routeRole :routeRoleCnt , };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  projectRoute : 0 }
    });
  }
};
module.exports = {
  getDependencyCount,
  deleteWithDependency,
  softDeleteWithDependency
};
