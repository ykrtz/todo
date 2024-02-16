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

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection('Data'); // Ensure this is your correct collection name
    const data = req.body; // This includes the unique project name and rows
    await collection.insertOne(data);
    res.status(200).json({ message: 'Data saved successfully', projectName: data.projectName });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
