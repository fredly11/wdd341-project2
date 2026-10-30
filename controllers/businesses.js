const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const requiredFields = [
  'name',
  'ownerName',
  'businessType',
  'state',
  'einStatus',
  'startDate',
  'industry',
  'notes'
];

const validateBusiness = (payload) => {
  const missingFields = requiredFields.filter(
    (field) => payload[field] === undefined || payload[field] === null || payload[field] === ''
  );

  if (missingFields.length > 0) {
    return `Missing required fields: ${missingFields.join(', ')}`;
  }

  return null;
};

const buildBusinessPayload = (body) => ({
  name: body.name,
  ownerName: body.ownerName,
  businessType: body.businessType,
  state: body.state,
  einStatus: body.einStatus,
  startDate: body.startDate,
  industry: body.industry,
  notes: body.notes
});

const getAllBusinesses = async (req, res) => {
  try {
    const db = getDb();
    const businesses = await db.collection('businesses').find().toArray();
    return res.status(200).json(businesses);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch businesses.', error: error.message });
  }
};

const getBusinessById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid business id.' });
    }

    const db = getDb();
    const business = await db.collection('businesses').findOne({ _id: new ObjectId(id) });

    if (!business) {
      return res.status(404).json({ message: 'Business not found.' });
    }

    return res.status(200).json(business);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch business.', error: error.message });
  }
};

const createBusiness = async (req, res) => {
  try {
    const validationMessage = validateBusiness(req.body);
    if (validationMessage) {
      return res.status(400).json({ message: validationMessage });
    }

    const db = getDb();
    const businessPayload = buildBusinessPayload(req.body);
    const result = await db.collection('businesses').insertOne(businessPayload);

    return res.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create business.', error: error.message });
  }
};

const updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid business id.' });
    }

    const validationMessage = validateBusiness(req.body);
    if (validationMessage) {
      return res.status(400).json({ message: validationMessage });
    }

    const db = getDb();
    const businessPayload = buildBusinessPayload(req.body);

    const result = await db
      .collection('businesses')
      .updateOne({ _id: new ObjectId(id) }, { $set: businessPayload });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Business not found.' });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update business.', error: error.message });
  }
};

const deleteBusiness = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid business id.' });
    }

    const db = getDb();
    const result = await db.collection('businesses').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Business not found.' });
    }

    return res.status(200).json({ message: 'Business deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete business.', error: error.message });
  }
};

module.exports = {
  getAllBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness
};
