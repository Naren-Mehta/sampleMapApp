var express = require('express');
var router = express.Router();

var loginController = require('../controller/loginController');
var customerController = require('../controller/customerController');
var employeeController = require('../controller/employeeController');


router.get('/login/:userName', loginController.getCustomerAddress );
router.get('/customer/:address', customerController.getCustomerInformation );
router.get('/employee/:address', employeeController.getEmployeeInformation );

module.exports = router;

