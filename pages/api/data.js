import Cors from 'cors';
import { connectToDatabase } from '../../mongoclient';

const cors = Cors({
  methods: ['POST', 'HEAD'],
  origin: true,
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  const db = await connectToDatabase();
  const collection = db.collection('Data'); // Use your actual collection name

  if (req.method === 'POST') {
    try {
      const data = req.body;
      // Use updateOne with upsert: true to update or insert if not exists
      const updateResult = await collection.updateOne(
        { projectName: data.projectName }, // Filter document by projectName
        { $set: data }, // Update the existing document or set a new one
        { upsert: true } // Create a new document if one doesn't exist
      );
      
      if (updateResult.upsertedCount > 0) {
        res.status(201).json({ message: 'Data inserted successfully', projectName: data.projectName });
      } else {
        res.status(200).json({ message: 'Data updated successfully', projectName: data.projectName });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const { projectName } = req.query; // Get projectName from the query string
      const data = await collection.findOne({ projectName: projectName });
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: 'Data not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
