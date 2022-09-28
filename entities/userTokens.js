module.exports = (userTokens) => {

  let newUserTokens = { 
    id: userTokens.id,
    userId: userTokens.userId,
    token: userTokens.token,
    tokenExpiredTime: userTokens.tokenExpiredTime,
    isTokenExpired: userTokens.isTokenExpired,
    isActive: userTokens.isActive,
    addedBy: userTokens.addedBy,
    updatedBy: userTokens.updatedBy,
    createdAt: userTokens.createdAt,
    updatedAt: userTokens.updatedAt,
    isDeleted: userTokens.isDeleted,
  };

  // remove undefined values
  if (newUserTokens.id){
    Object.keys(newUserTokens).forEach(key =>{
      if (newUserTokens[key] === undefined) return newUserTokens[key] = null;
    });
  } else {
    Object.keys(newUserTokens).forEach(key => newUserTokens[key] === undefined && delete newUserTokens[key]);
  }

  // To validate Entity uncomment this block

  /*
   * const validate = (newUserTokens) => {
   *   if (!newUserTokens.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * 
   * validate(newUserTokens) 
   */
  return Object.freeze(newUserTokens);
};
