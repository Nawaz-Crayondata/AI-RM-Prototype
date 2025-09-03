# Vercel Deployment Guide

## 🚀 Deploy to Vercel with Secure API Keys

### Step 1: Install Vercel CLI (Optional)

```bash
npm i -g vercel
```

### Step 2: Deploy via Vercel Dashboard (Recommended)

1. **Go to [Vercel](https://vercel.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import your GitHub repository**: `Nawaz-Crayondata/AI-RM-Prototype`
5. **Click "Import"**

### Step 3: Configure Environment Variables

1. **In your Vercel project dashboard**:
   - Go to **Settings** → **Environment Variables**
   - Add the following variables:

   ```
   OPENAI_API_KEY = sk-your-actual-openai-key-here
   PERPLEXITY_API_KEY = pplx-your-actual-perplexity-key-here
   ```

2. **Set environment scope**:
   - Select **Production**, **Preview**, and **Development**
   - Click **Save**

### Step 4: Update Configuration for Vercel

Replace your `config.js` with the Vercel version:

```bash
# Backup your local config
cp config.js config.js.backup

# Use Vercel config
cp config.vercel.js config.js
```

### Step 5: Deploy

1. **Vercel will automatically deploy** when you push to GitHub
2. **Or deploy manually**:
   ```bash
   vercel --prod
   ```

### Step 6: Access Your Live Site

Your application will be available at:
```
https://ai-rm-prototype.vercel.app
```
(URL will be provided by Vercel)

## 🔒 Security Benefits

- ✅ **API keys are secure** - stored as environment variables
- ✅ **No keys in repository** - completely private
- ✅ **Automatic deployments** - updates on every push
- ✅ **Custom domains** - can add your own domain
- ✅ **HTTPS by default** - secure connections

## 🛠️ Alternative: Deploy via CLI

If you prefer using the CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables
vercel env add OPENAI_API_KEY
vercel env add PERPLEXITY_API_KEY

# Deploy to production
vercel --prod
```

## 📊 Monitoring

- **Vercel Dashboard**: Monitor deployments and performance
- **Analytics**: Built-in analytics for your app
- **Logs**: View application logs
- **Functions**: Serverless functions support

## 🔄 Continuous Deployment

Once set up:
1. **Push to GitHub** → **Automatic deployment**
2. **Environment variables** are automatically injected
3. **No manual configuration** needed for future updates

## 🚨 Troubleshooting

### Common Issues:

1. **Environment variables not working**:
   - Check variable names match exactly
   - Ensure variables are set for all environments
   - Redeploy after adding variables

2. **Build failures**:
   - Check Vercel build logs
   - Ensure all files are committed
   - Verify file paths are correct

3. **API calls failing**:
   - Verify environment variables are set
   - Check API key format
   - Monitor Vercel function logs

### Getting Help:

- **Vercel Documentation**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **Community**: https://github.com/vercel/vercel/discussions

---

**🎉 Your app will be live and secure on Vercel!**
