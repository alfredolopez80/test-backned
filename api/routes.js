var controller = require('./controller');
var express = require('express');
var router = express.Router();

router.route('/')
	.get(controller.getTest);

router.route('/oai/bnb')
	.get(controller.getBnb);

router.route('/oai/bnb/fee')
	.get(controller.getBnbFee);

router.route('/oai/matic')
	.get(controller.getMatic);

router.route('/oai/matic/fee')
	.get(controller.getMaticFee);

router.route('/oai/usd/matic')
	.get(controller.getUsdMatic);

router.route('/oai/usd/bnb')
	.get(controller.getUsdBnb);

// router.route('/oai/rewards/bnb')
// 	.post(controller.getRewardsBnb);

router.route('/oai/rewards/matic')
	.post(controller.postRewardsMatic);

router.route('*')
	.get(controller.get404);

module.exports = router;
