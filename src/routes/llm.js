const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

router.post('/generate', async (req, res) => {
  try {
    const { prompt, model = 'gemini-pro' } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const genModel = genAI.getGenerativeModel({ model });
    const result = await genModel.generateContent(prompt);
    const response = await result.response;
    
    res.json({ 
      text: response.text(),
      model: model
    });
  } catch (error) {
    console.error('LLM generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate response',
      details: error.message 
    });
  }
});

module.exports = { router };