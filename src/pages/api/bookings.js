import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'https://tablebookingbackend-rdfv.onrender.com/api/bookings';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const response = await axios.post(BACKEND_URL, req.body);
      res.status(201).json(response.data);
    } else if (req.method === 'GET') {
      const { date, time } = req.query;
      const response = await axios.get(BACKEND_URL, { params: { date, time } });
      res.status(200).json(response.data);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error occurred:', error.response || error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
