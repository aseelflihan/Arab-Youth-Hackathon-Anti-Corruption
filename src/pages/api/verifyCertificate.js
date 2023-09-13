// pages/api/verifyCertificate.js
import axios from 'axios';

// Simple database simulation
const database = {
  "aseel flihan": 526,
  // Add more entries as required
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { imageUrl } = req.body;

  try {
    const response = await axios.post(
      `YOUR_AZURE_TEXT_ANALYTICS_ENDPOINT_URL_HERE`,
      {
        documents: [
          {
            language: "en",
            id: "1",
            text: imageUrl // This assumes you're sending the image content or URL
          }
        ]
      },
      {
        headers: {
          'Ocp-Apim-Subscription-Key': 'YOUR_AZURE_TEXT_ANALYTICS_KEY_HERE'
        }
      }
    );

    const extractedText = response.data.documents[0]?.text;

    if (!extractedText) {
      return res.status(400).json({ error: "Couldn't extract text from the image." });
    }

    const number = extractedText.match(/\d+/)[0];
    const name = extractedText.replace(/\d+/g, '').trim();

    if (database[name] === parseInt(number, 10)) {
      return res.status(200).json({ valid: true, message: "The certificate is valid." });
    }

    return res.status(400).json({ valid: false, message: "The certificate is not valid." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
