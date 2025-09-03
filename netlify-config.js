// Netlify configuration for environment variables
// This file will be used by Netlify to inject environment variables

window.API_CONFIG = {
    // Use environment variables from Netlify
    openai: process.env.OPENAI_API_KEY || 'sk-your-openai-api-key-here',
    sonar: process.env.PERPLEXITY_API_KEY || 'pplx-your-perplexity-api-key-here',
    
    // Default provider
    provider: 'openai' // or 'sonar'
};
