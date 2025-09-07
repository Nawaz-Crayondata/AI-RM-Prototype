// Test script to verify API configuration endpoint
// Run this with: node test-api.js

const https = require('https');
const http = require('http');

function testApiEndpoint(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        
        client.get(url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const config = JSON.parse(data);
                    resolve({
                        status: res.statusCode,
                        config: config,
                        success: res.statusCode === 200
                    });
                } catch (error) {
                    reject(new Error(`Failed to parse JSON: ${error.message}`));
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

async function runTest() {
    const baseUrl = process.argv[2] || 'https://ai-rm-prototype.vercel.app';
    const apiUrl = `${baseUrl}/api/config`;
    
    console.log(`🧪 Testing API endpoint: ${apiUrl}`);
    console.log('=' .repeat(50));
    
    try {
        const result = await testApiEndpoint(apiUrl);
        
        console.log(`Status: ${result.status}`);
        console.log('Response:', JSON.stringify(result.config, null, 2));
        
        if (result.success) {
            const { openai, sonar, provider } = result.config;
            
            console.log('\n📊 Analysis:');
            console.log(`- Provider: ${provider}`);
            console.log(`- OpenAI Key: ${openai ? (openai.length > 20 ? '✅ Valid length' : '❌ Too short') : '❌ Missing'}`);
            console.log(`- Sonar Key: ${sonar ? (sonar.length > 20 ? '✅ Valid length' : '❌ Too short') : '❌ Missing'}`);
            
            if (openai && openai !== 'sk-your-openai-api-key-here' && openai.length > 20) {
                console.log('✅ OpenAI API key appears to be configured correctly');
            } else {
                console.log('❌ OpenAI API key is not properly configured');
            }
        } else {
            console.log('❌ API endpoint returned an error');
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

runTest();
