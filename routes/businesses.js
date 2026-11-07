const router = require('express').Router();
const businessesController = require('../controllers/businesses');
const { validateObjectId, validateBusinessPayload } = require('../middleware/validate');

/*
	#swagger.tags = ['Businesses']
	#swagger.responses[200] = { description: 'OK' }
	#swagger.responses[500] = { description: 'Internal Server Error' }
*/
router.get('/', businessesController.getAllBusinesses);

/*
	#swagger.tags = ['Businesses']
	#swagger.parameters['id'] = { in: 'path', description: 'Business ObjectId', required: true, type: 'string' }
	#swagger.responses[200] = { description: 'OK' }
	#swagger.responses[400] = { description: 'Bad Request' }
	#swagger.responses[404] = { description: 'Not Found' }
	#swagger.responses[500] = { description: 'Internal Server Error' }
*/
router.get('/:id', validateObjectId, businessesController.getBusinessById);

/*
	#swagger.tags = ['Businesses']
	#swagger.parameters['body'] = {
		in: 'body',
		description: 'Business payload',
		required: true,
		schema: { $ref: '#/definitions/Business' }
	}
	#swagger.responses[201] = { description: 'Created' }
	#swagger.responses[400] = { description: 'Bad Request' }
	#swagger.responses[500] = { description: 'Internal Server Error' }
*/
router.post('/', validateBusinessPayload, businessesController.createBusiness);

/*
	#swagger.tags = ['Businesses']
	#swagger.parameters['id'] = { in: 'path', description: 'Business ObjectId', required: true, type: 'string' }
	#swagger.parameters['body'] = {
		in: 'body',
		description: 'Business payload',
		required: true,
		schema: { $ref: '#/definitions/Business' }
	}
	#swagger.responses[200] = { description: 'OK' }
	#swagger.responses[201] = { description: 'Created' }
	#swagger.responses[204] = { description: 'No Content' }
	#swagger.responses[400] = { description: 'Bad Request' }
	#swagger.responses[404] = { description: 'Not Found' }
	#swagger.responses[500] = { description: 'Internal Server Error' }
*/
router.put('/:id', validateObjectId, validateBusinessPayload, businessesController.updateBusiness);

/*
	#swagger.tags = ['Businesses']
	#swagger.parameters['id'] = { in: 'path', description: 'Business ObjectId', required: true, type: 'string' }
	#swagger.responses[200] = { description: 'OK' }
	#swagger.responses[201] = { description: 'Created' }
	#swagger.responses[204] = { description: 'No Content' }
	#swagger.responses[400] = { description: 'Bad Request' }
	#swagger.responses[404] = { description: 'Not Found' }
	#swagger.responses[500] = { description: 'Internal Server Error' }
*/
router.delete('/:id', validateObjectId, businessesController.deleteBusiness);

module.exports = router;
