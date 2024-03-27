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
      await collection.insertOne(data);
      res.status(200).json({ message: 'Data saved successfully', projectName: data.projectName });
    } catch (error) {
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
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
