const router = require('express').Router();
const businessesController = require('../controllers/businesses');

/*
	#swagger.tags = ['Businesses']
*/
router.get('/', businessesController.getAllBusinesses);

/*
	#swagger.tags = ['Businesses']
	#swagger.parameters['id'] = { in: 'path', description: 'Business ObjectId', required: true, type: 'string' }
*/
router.get('/:id', businessesController.getBusinessById);

/*
	#swagger.tags = ['Businesses']
	#swagger.parameters['body'] = {
		in: 'body',
		description: 'Business payload',
		required: true,
		schema: { $ref: '#/definitions/Business' }
	}
*/
router.post('/', businessesController.createBusiness);

/*
	#swagger.tags = ['Businesses']
	#swagger.parameters['id'] = { in: 'path', description: 'Business ObjectId', required: true, type: 'string' }
	#swagger.parameters['body'] = {
		in: 'body',
		description: 'Business payload',
		required: true,
		schema: { $ref: '#/definitions/Business' }
	}
*/
router.put('/:id', businessesController.updateBusiness);

/*
	#swagger.tags = ['Businesses']
	#swagger.parameters['id'] = { in: 'path', description: 'Business ObjectId', required: true, type: 'string' }
*/
router.delete('/:id', businessesController.deleteBusiness);

module.exports = router;
