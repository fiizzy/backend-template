const express =  require('express');
const router =  express.Router();
router.use('/device/auth',require('./auth'));

module.exports = router;
