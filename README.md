# Danamon Bank AI Relationship Manager

A sophisticated AI-powered banking assistant that provides personalized financial advice and product recommendations using OpenAI GPT or Perplexity Sonar Pro.

## 🚀 Features

- **AI-Powered Conversations**: Real-time chat with advanced AI models
- **Personalized Banking**: Tailored financial advice based on customer profiles
- **Product Recommendations**: Smart suggestions for banking products
- **Secure Configuration**: API keys stored securely outside the repository
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Professional UI**: Danamon Bank branded interface

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/danamon-ai-rm.git
cd danamon-ai-rm
```

### 2. Configure API Keys

**⚠️ IMPORTANT: Never commit your actual API keys to GitHub!**

1. Copy the example configuration:
   ```bash
   cp config.js.example config.js
   ```

2. Edit `config.js` and add your actual API keys:
   ```javascript
   window.API_CONFIG = {
       openai: 'sk-your-actual-openai-key-here',
       sonar: 'pplx-your-actual-perplexity-key-here',
       provider: 'openai' // or 'sonar'
   };
   ```

### 3. Get API Keys

#### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up/Login to your account
3. Create a new API key
4. Copy the key (starts with `sk-`)

#### Perplexity API Key
1. Visit [Perplexity AI Settings](https://www.perplexity.ai/settings/api)
2. Sign up/Login to your account
3. Generate a new API key
4. Copy the key (starts with `pplx-`)

### 4. Run the Application

#### Option 1: Simple HTTP Server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have http-server installed)
npx http-server
```

#### Option 2: Live Server (VS Code)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### 5. Access the Application

Open your browser and navigate to:
- `http://localhost:8000` (if using Python server)
- The URL provided by Live Server

## 🌐 GitHub Pages Deployment

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

### 2. Access Your Live Site

Your application will be available at:
```
https://yourusername.github.io/danamon-ai-rm
```

## 🔒 Security Best Practices

### ✅ DO:
- Keep `config.js` in `.gitignore`
- Use environment variables for production
- Regularly rotate your API keys
- Monitor API usage and costs
- Use HTTPS in production

### ❌ DON'T:
- Commit API keys to version control
- Share API keys in chat/email
- Use production keys in development
- Leave API keys in browser console logs

## 📁 Project Structure

```
danamon-ai-rm/
├── index.html          # Main HTML file
├── app.js             # Application logic
├── style.css          # Styling and branding
├── config.js          # API configuration (not in git)
├── config.js.example  # Example configuration
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## 🎨 Customization

### Changing the AI Provider

Edit `config.js`:
```javascript
window.API_CONFIG = {
    // ... your API keys
    provider: 'sonar' // Change from 'openai' to 'sonar'
};
```

### Updating Customer Data

Edit the `loadCustomerData()` method in `app.js` to customize:
- Customer profile information
- Financial products
- System prompts

### Styling

Modify `style.css` to customize:
- Colors and branding
- Layout and spacing
- Typography
- Responsive design

## 🐛 Troubleshooting

### Common Issues

1. **"API_CONFIG not found" warning**
   - Make sure `config.js` exists and contains your API keys
   - Check that the file is not in `.gitignore`

2. **API calls failing**
   - Verify your API keys are correct
   - Check your API provider's status page
   - Ensure you have sufficient API credits

3. **CORS errors**
   - Make sure you're running the app through a web server
   - Don't open `index.html` directly in the browser

### Getting Help

1. Check the browser console for error messages
2. Verify your API keys are working with a simple test
3. Ensure all files are properly loaded

## 📄 License

This project is for educational and demonstration purposes. Please ensure compliance with your organization's policies and API provider terms of service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues related to:
- **OpenAI API**: [OpenAI Support](https://help.openai.com/)
- **Perplexity API**: [Perplexity Support](https://www.perplexity.ai/help)
- **This Application**: Create an issue in this repository

---

**⚠️ Security Reminder**: Never commit your actual API keys to version control. Always use the `config.js` file for local development and environment variables for production deployments.
