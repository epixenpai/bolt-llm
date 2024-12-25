require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { router: llmRouter } = require('./routes/llm');
const { healthCheck } = require('./routes/health');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', healthCheck);

// LLM routes
app.use('/api/llm', llmRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});