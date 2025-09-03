# Deployment Guide

## 🚀 GitHub Pages Deployment

### Step 1: Prepare Your Repository

1. **Create a new repository** on GitHub:
   - Go to [GitHub](https://github.com)
   - Click "New repository"
   - Name it `danamon-ai-rm` (or your preferred name)
   - Make it **Public** (required for free GitHub Pages)
   - Don't initialize with README (we already have one)

2. **Initialize and push your code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Danamon AI Relationship Manager"
   git branch -M main
   git remote add origin https://github.com/yourusername/danamon-ai-rm.git
   git push -u origin main
   ```

### Step 2: Configure Your API Keys

**⚠️ CRITICAL: Never commit your actual API keys!**

1. **Create your local config file**:
   ```bash
   cp config.js.example config.js
   ```

2. **Edit config.js with your actual keys**:
   ```javascript
   window.API_CONFIG = {
       openai: 'sk-your-actual-openai-key-here',
       sonar: 'pplx-your-actual-perplexity-key-here',
       provider: 'openai'
   };
   ```

3. **Verify config.js is in .gitignore**:
   ```bash
   git status
   # config.js should NOT appear in the list
   ```

### Step 3: Enable GitHub Pages

1. **Go to repository settings**:
   - Navigate to your repository on GitHub
   - Click the **Settings** tab

2. **Configure Pages**:
   - Scroll down to **Pages** section (left sidebar)
   - Under **Source**, select **Deploy from a branch**
   - Choose **main** branch
   - Select **/ (root)** folder
   - Click **Save**

3. **Wait for deployment**:
   - GitHub will build and deploy your site
   - This usually takes 1-2 minutes
   - You'll see a green checkmark when ready

### Step 4: Access Your Live Site

Your application will be available at:
```
https://yourusername.github.io/danamon-ai-rm
```

## 🔒 Security Considerations

### For Public Repositories

Since GitHub Pages requires public repositories, consider these security measures:

1. **Use API Key Restrictions**:
   - Set up domain restrictions in your API provider dashboard
   - Limit API keys to specific domains
   - Monitor usage regularly

2. **Consider Alternative Hosting**:
   - **Netlify**: Supports private repos and environment variables
   - **Vercel**: Great for static sites with secure config
   - **Firebase Hosting**: Google's hosting solution

### For Production Use

1. **Use Environment Variables**:
   ```javascript
   // For Netlify/Vercel
   window.API_CONFIG = {
       openai: process.env.OPENAI_API_KEY,
       sonar: process.env.PERPLEXITY_API_KEY,
       provider: 'openai'
   };
   ```

2. **Implement Rate Limiting**:
   - Add client-side rate limiting
   - Monitor API usage
   - Set up alerts for unusual activity

## 🛠️ Alternative Deployment Options

### Netlify Deployment

1. **Connect your GitHub repository**:
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository

2. **Configure environment variables**:
   - Go to Site settings → Environment variables
   - Add your API keys as environment variables
   - Update your code to use `process.env.VARIABLE_NAME`

3. **Deploy**:
   - Netlify will automatically deploy on every push
   - Your site will be available at `https://your-site-name.netlify.app`

### Vercel Deployment

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Configure environment variables**:
   - Go to your project dashboard
   - Add environment variables
   - Redeploy

## 📊 Monitoring and Maintenance

### API Usage Monitoring

1. **Set up alerts**:
   - Monitor daily/monthly usage
   - Set spending limits
   - Get notified of unusual activity

2. **Regular maintenance**:
   - Rotate API keys periodically
   - Review and update dependencies
   - Monitor for security updates

### Performance Optimization

1. **Minimize API calls**:
   - Implement caching where appropriate
   - Use efficient prompts
   - Consider response streaming

2. **User experience**:
   - Add loading states
   - Implement error handling
   - Provide fallback options

## 🚨 Troubleshooting

### Common Issues

1. **Site not loading**:
   - Check GitHub Pages status
   - Verify repository is public
   - Check for build errors

2. **API calls failing**:
   - Verify API keys are correct
   - Check CORS settings
   - Monitor API provider status

3. **Styling issues**:
   - Check CSS file paths
   - Verify all assets are committed
   - Test in different browsers

### Getting Help

- Check GitHub Pages documentation
- Review your API provider's status page
- Test locally before deploying
- Use browser developer tools for debugging

---

**Remember**: Always keep your API keys secure and never commit them to version control!
