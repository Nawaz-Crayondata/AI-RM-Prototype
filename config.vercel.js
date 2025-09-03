// Vercel configuration file for API keys
// This file will be used by Vercel with environment variables

window.API_CONFIG = {
    // Use environment variables from Vercel
    // These will be replaced at build time by Vercel
    openai: 'sk-your-openai-api-key-here',
    sonar: 'pplx-your-perplexity-api-key-here',
    
    // Default provider
    provider: 'openai' // or 'sonar'
};
