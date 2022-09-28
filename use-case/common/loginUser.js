const {
  JWT,LOGIN_ACCESS,
  PLATFORM,MAX_LOGIN_RETRY_LIMIT,LOGIN_REACTIVE_TIME
} = require('../../constants/authConstant');
const dayjs = require('dayjs');
const generateToken = require('../../utils/generateToken');
const { getDifferenceOfTwoDatesInTime } = require('../../utils/date');
const response = require('../../utils/response');
const makeGetRoleAccess = require('../common/getRoleAccess');

const loginUser = ({
  userDb,userTokensDb,userAuthSettingsDb 
})=> async (username,platform,password,roleAccess,req = {},res = {}) => {
  let where = { $or:[{ username:username },{ email:username }] };
  where.isActive = true;where.isDeleted = false;        let user = await userDb.findOne(where);
  let userAuth = await userAuthSettingsDb.findOne({ userId: user.id });
  if (user) {
    if (user.loginRetryLimit >= MAX_LOGIN_RETRY_LIMIT){
      let now = dayjs();
      if (user.loginReactiveTime){
        let limitTime = dayjs(user.loginReactiveTime);
        if (limitTime > now){
          let expireTime = dayjs().add(LOGIN_REACTIVE_TIME,'minute');
          if (!(limitTime > expireTime)){
            return response.badRequest({ message :`you have exceed the number of limit.you can login after ${getDifferenceOfTwoDatesInTime(now,limitTime)}.` });
          }   
          await userDb.update({ id :user.id },{
            loginReactiveTime:expireTime.toISOString(),
            loginRetryLimit:user.loginRetryLimit + 1  
          });
          return response.badRequest({ message : `you have exceed the number of limit.you can login after ${getDifferenceOfTwoDatesInTime(now,expireTime)}.` });
        } else {
          user = await userDb.update({ id:user.id },{
            loginReactiveTime:'',
            loginRetryLimit:0
          },{ new:true });
        }
      } else {
        // send error
        let expireTime = dayjs().add(LOGIN_REACTIVE_TIME,'minute');
        await userDb.update(user.id,{
          loginReactiveTime:expireTime.toISOString(),
          loginRetryLimit:user.loginRetryLimit + 1 
        });
        return response.badRequest({ message :`you have exceed the number of limit.you can login after ${getDifferenceOfTwoDatesInTime(now,expireTime)}.` }); 
      } 
    }
    if (password){
      const isPasswordMatched = await user.isPasswordMatch(password);
      if (!isPasswordMatched){
        await userAuthSettingsDb.update({ userId:user.id },{ loginRetryLimit:userAuth.loginRetryLimit + 1 });
        return {
          flag:true,
          data:'Incorrect Password'
        };
      }
    }
    const userData = user.toJSON();
    let token;
    if (!user.userType){
      return response.badRequest({ message :'You have not been assigned any role.' });
    }
    if ( platform == PLATFORM.DEVICE){
      if (!LOGIN_ACCESS[user.userType].includes(PLATFORM.DEVICE)){
        return response.badRequest({ message :'you are unable to access this platform' });
      }
      token = await generateToken(userData,JWT.DEVICE_SECRET);
    }
    else if ( platform == PLATFORM.ADMIN){
      if (!LOGIN_ACCESS[user.userType].includes(PLATFORM.ADMIN)){
        return response.badRequest({ message :'you are unable to access this platform' });
      }
      token = await generateToken(userData,JWT.ADMIN_SECRET);
    }
    if (userAuth && userAuth.loginRetryLimit){
      await userAuthSettingsDb.update({ userId:user.id }, {
        loginRetryLimit: 0,
        loginReactiveTime: null
      });
    }
    let expire = dayjs().add(JWT.EXPIRES_IN, 'second').toISOString();
    await userTokensDb.createOne({
      userId: user.id,
      token: token,
      tokenExpiredTime: expire 
    });
    let userToReturn = {
      ...userData,
      token 
    };
    if (roleAccess){
      const getRoleAccessData = makeGetRoleAccess({
        userRoleDb,
        routeRoleDb
      });
      userToReturn.roleAccess = await getRoleAccessData(user.id).data;
    }
    return response.success({ data:userToReturn });
  } else {
    return response.badRequest({ message :'User not exists' });
  }
        
};

module.exports = loginUser;