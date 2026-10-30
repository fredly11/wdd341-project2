require('dotenv').config();
const fs = require('fs');
const path = require('path');

const swaggerAutogen = require('swagger-autogen')();

const port = process.env.PORT || 3000;
const hostSource =
  process.env.SWAGGER_HOST ||
  process.env.RENDER_EXTERNAL_URL ||
  process.env.RENDER_URL ||
  `localhost:${port}`;

const host = hostSource.replace(/^https?:\/\//, '').replace(/\/$/, '');

const doc = {
  info: {
    title: 'LaunchPad API',
    description: 'CSE 341 Project 2 - Startup dashboard API'
  },
  host,
  schemes: ['http', 'https'],
  paths: {
    '/businesses': {
      get: {
        tags: ['Businesses'],
        description: 'Get all businesses',
        responses: {
          200: { description: 'OK' },
          500: { description: 'Internal Server Error' }
        }
      },
      post: {
        tags: ['Businesses'],
        description: 'Create a business',
        parameters: [
          {
            in: 'body',
            name: 'body',
            required: true,
            schema: { $ref: '#/definitions/Business' }
          }
        ],
        responses: {
          201: { description: 'Created' },
          400: { description: 'Bad Request' },
          500: { description: 'Internal Server Error' }
        }
      }
    },
    '/businesses/{id}': {
      get: {
        tags: ['Businesses'],
        description: 'Get a business by id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: { description: 'OK' },
          400: { description: 'Bad Request' },
          404: { description: 'Not Found' },
          500: { description: 'Internal Server Error' }
        }
      },
      put: {
        tags: ['Businesses'],
        description: 'Update a business by id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'body',
            required: true,
            schema: { $ref: '#/definitions/Business' }
          }
        ],
        responses: {
          204: { description: 'No Content' },
          400: { description: 'Bad Request' },
          404: { description: 'Not Found' },
          500: { description: 'Internal Server Error' }
        }
      },
      delete: {
        tags: ['Businesses'],
        description: 'Delete a business by id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: { description: 'OK' },
          400: { description: 'Bad Request' },
          404: { description: 'Not Found' },
          500: { description: 'Internal Server Error' }
        }
      }
    }
  },
  definitions: {
    Business: {
      name: 'Sunrise Bakery',
      ownerName: 'Jamie Lopez',
      businessType: 'LLC',
      state: 'ID',
      einStatus: 'Approved',
      startDate: '2026-08-01',
      industry: 'Food & Beverage',
      notes: 'Planning first storefront launch in Boise.'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  const swaggerPath = path.resolve(__dirname, 'swagger.json');
  const swagger = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));

  const businessSchemaRef = {
    schema: { $ref: '#/definitions/Business' }
  };

  const postPath = swagger.paths?.['/businesses/']?.post;
  if (postPath) {
    postPath.parameters = [
      {
        name: 'body',
        in: 'body',
        required: true,
        ...businessSchemaRef
      }
    ];
  }

  const putPath = swagger.paths?.['/businesses/{id}']?.put;
  if (putPath) {
    const pathIdParam = {
      name: 'id',
      in: 'path',
      required: true,
      type: 'string'
    };

    putPath.parameters = [
      pathIdParam,
      {
        name: 'body',
        in: 'body',
        required: true,
        ...businessSchemaRef
      }
    ];
  }

  fs.writeFileSync(swaggerPath, JSON.stringify(swagger, null, 2));
});
