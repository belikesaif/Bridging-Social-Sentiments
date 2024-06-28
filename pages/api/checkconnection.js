import dbConnect from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    await dbConnect();
    res.status(200).json({ message: 'Connected to MongoDB successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to connect to MongoDB', error: error.message });
  }
}