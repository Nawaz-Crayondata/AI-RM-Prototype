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
  
  // Log for debugging (remove in production)
  console.log('Environment check:', {
    hasOpenAI: !!openaiKey,
    hasSonar: !!sonarKey,
    openaiLength: openaiKey ? openaiKey.length : 0
  });
  
  res.status(200).json({
    openai: openaiKey || 'sk-your-openai-api-key-here',
    sonar: sonarKey || 'pplx-your-perplexity-api-key-here',
    provider: 'openai'
  });
}
