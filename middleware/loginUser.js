/**
 * loginUser.js
 * @description :: middleware that verifies JWT token of user
 */

const jwt = require('jsonwebtoken');
const response = require('../utils/response');
const { PLATFORM } = require('../constants/authConstant');
const deviceSecret = require('../config/constant').JWT.DEVICE_SECRET;
const adminSecret = require('../config/constant').JWT.ADMIN_SECRET;
const authenticateJWT = (platform) =>  (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    let secret = '';
    if (platform == PLATFORM.DEVICE){
      secret = deviceSecret;
    }
    else if (platform == PLATFORM.ADMIN){
      secret = adminSecret;
    }
    jwt.verify(token,secret, (error, user) => {
      if (error) {
        response.unAuthorized();
      }
      req.user = user;
      next();
    });
  } else {
    response.unAuthorized();
  }
};
module.exports = authenticateJWT;