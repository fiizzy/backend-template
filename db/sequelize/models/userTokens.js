const {
  DataTypes, Op 
} = require('sequelize'); 
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const  convertObjectToEnum  = require('../../../utils/convertObjectToEnum');
function makeModel (sequelize){
  const UserTokens = sequelize.define('userTokens',{
    id:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    userId:{ type:DataTypes.INTEGER },
    token:{ type:DataTypes.STRING },
    tokenExpiredTime:{ type:DataTypes.DATE },
    isTokenExpired:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    isActive:{ type:DataTypes.BOOLEAN },
    addedBy:{ type:DataTypes.INTEGER },
    updatedBy:{ type:DataTypes.INTEGER },
    createdAt:{ type:DataTypes.DATE },
    updatedAt:{ type:DataTypes.DATE },
    isDeleted:{ type:DataTypes.BOOLEAN }
  }
  ,{
    hooks:{
      beforeCreate: [
        async function (userTokens,options){
          userTokens.isActive = true;
          userTokens.isDeleted = false;

        },
      ],
      beforeBulkCreate: [
        async function (userTokens,options){
          if (userTokens !== undefined && userTokens.length) { 
            for (let index = 0; index < userTokens.length; index++) { 
        
              const element = userTokens[index]; 
              element.isActive = true; 
              element.isDeleted = false; 
  
            } 
          }
        },
      ],
    } 
  }
  );
  UserTokens.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    
    return values;
  };
  sequelizeTransforms(UserTokens);
  sequelizePaginate.paginate(UserTokens);
  return UserTokens;
}
module.exports = makeModel;