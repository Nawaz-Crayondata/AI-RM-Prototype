// Vercel API route to serve configuration
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  
  // Get environment variables
  const openaiKey = process.env.OPENAI_API_KEY;
  const sonarKey = process.env.PERPLEXITY_API_KEY;
  
  // Log for debugging
  console.log('Environment check:', {
    hasOpenAI: !!openaiKey,
    hasSonar: !!sonarKey,
    openaiLength: openaiKey ? openaiKey.length : 0,
    openaiKey: openaiKey ? openaiKey.substring(0, 10) + '...' : 'undefined'
  });
  
  // Use actual environment variables or fallback to the ones from config.js
  const fallbackOpenAI = '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';
  const fallbackSonar = 'pplx-your-perplexity-api-key-here';
  
  res.status(200).json({
    openai: openaiKey || fallbackOpenAI,
    sonar: sonarKey || fallbackSonar,
    provider: 'openai'
  });
}
