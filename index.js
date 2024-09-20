import express from 'express';
import bodyParser from 'body-parser';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import createPrompt from './createPrompt.js'; 
import {API_KEY, OPENAI_API_KEY} from './config.js';
import cors from 'cors';


const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true 
});
const model = "gpt-4o";

app.post('/analyze', async (req, res) => {
  let { selectedText } = req.body;
  selectedText = cleanSelectedText(selectedText);
  
  // Create the prompt
  const prompt = createPrompt(selectedText);

  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: [{ role: "user", content: prompt }],
    });
    const responseText = response.choices[0].message.content;

    // const genAI = new GoogleGenerativeAI(API_KEY);
    // const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // const result = await model.generateContent(prompt);
    // const response = await result.response;
    // const responseText = await response.text();
    console.log("called analyze and repsonding with", responseText);
    res.json({ result: responseText });
  } catch (error) {
    console.error('Error calling Gemini API:', error.message);
    res.status(500).json({ error: 'Error analyzing the code' });
  }
});

function allDigits(line){
  return /^\d+$/.test(line);
}

function cleanSelectedText(text) {
  // Split text by a new line character
  const textLines = text.split('\n');
  var cleanedText = "";
  for(let i = 0; i < textLines.length; i++){
    const newLine = textLines[i].replace('·', ' ').trim(); // replace '·' with '' // // strip the spaces on both sides of new
    if(allDigits(newLine) || newLine==''){
      continue;
    }
    cleanedText += newLine + '\n';
  }
  console.log(cleanedText);
  return cleanedText;

}

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
