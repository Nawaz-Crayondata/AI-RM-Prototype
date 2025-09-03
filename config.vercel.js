// Vercel configuration file for API keys
// This file will be used by Vercel with environment variables

window.API_CONFIG = {
    // Use environment variables from Vercel
    openai: process.env.OPENAI_API_KEY || 'sk-your-openai-api-key-here',
    sonar: process.env.PERPLEXITY_API_KEY || 'pplx-your-perplexity-api-key-here',
    
    // Default provider
    provider: 'openai' // or 'sonar'
};
