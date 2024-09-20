import dotenv from 'dotenv';
dotenv.config();
const API_KEY = process.env.API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export {API_KEY, OPENAI_API_KEY};
