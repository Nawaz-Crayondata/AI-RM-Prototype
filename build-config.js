// Build script to populate config.json with environment variables
const fs = require('fs');
const path = require('path');

// Get environment variables
const openaiKey = process.env.OPENAI_API_KEY || 'sk-your-openai-api-key-here';
const sonarKey = process.env.PERPLEXITY_API_KEY || 'pplx-your-perplexity-api-key-here';

// Create config object
const config = {
  openai: openaiKey,
  sonar: sonarKey,
  provider: 'openai'
};

// Write to api/config.json
const configPath = path.join(__dirname, 'api', 'config.json');
fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

console.log('✅ Config file updated with environment variables');
console.log('OpenAI key length:', openaiKey.length);
console.log('Sonar key length:', sonarKey.length);
