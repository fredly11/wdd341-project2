require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const { initDb } = require('./db/connect');

const app = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

app.use('/', require('./routes'));

let swaggerDocument;
try {
  swaggerDocument = require('./swagger.json');
} catch (error) {
  console.warn('swagger.json not found. Run "npm run swagger" to generate it.');
}

if (swaggerDocument) {
  app.get('/api-docs.json', (req, res) => {
    const runtimeSwaggerDoc = {
      ...swaggerDocument,
      host: req.get('host'),
      schemes: [req.protocol]
    };

    res.json(runtimeSwaggerDoc);
  });

  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(null, {
      swaggerOptions: {
        url: '/api-docs.json'
      }
    })
  );
}

app.get('/', (req, res) => {
  res.status(200).json({ message: 'LaunchPad API is running.' });
});

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  });
