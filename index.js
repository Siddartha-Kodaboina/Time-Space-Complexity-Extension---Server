import express from 'express';
import bodyParser from 'body-parser';
import { GoogleGenerativeAI } from '@google/generative-ai';
import createPrompt from './createPrompt.js'; // Import the createPrompt function
import API_KEY from './config.js';
import cors from 'cors';


const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

app.post('/analyze', async (req, res) => {
  const { selectedText } = req.body;
  
  // Create the prompt
  const prompt = createPrompt(selectedText);

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = await response.text();
    console.log("called analyze and repsonding with", responseText);
    res.json({ result: responseText });
  } catch (error) {
    console.error('Error calling Gemini API:', error.message);
    res.status(500).json({ error: 'Error analyzing the code' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
