# Deployment Guide

This guide will help you deploy your Loan Calculator application to Vercel without any MIME type issues.

## Deploying to Vercel

### Method 1: Using the Vercel Dashboard

1. Push your code to a GitHub repository
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Click "Deploy"

### Method 2: Using the Vercel CLI

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy your project:
   ```bash
   vercel
   ```

4. Follow the prompts and select the appropriate options:
   - Set up and deploy: Yes
   - Link to existing project: Select your project or create a new one
   - Override settings: No (the vercel.json file will be used)

5. To deploy to production:
   ```bash
   vercel --prod
   ```

## Troubleshooting MIME Type Issues

If you encounter MIME type issues after deployment:

1. Make sure your `vercel.json` file is properly configured (already done in this project)
2. Rebuild and redeploy your project:
   ```bash
   npm run build
   vercel --prod
   ```

3. Clear your browser cache and try again

4. If issues persist, try the following:
   - Check the Network tab in your browser's developer tools to see which files are causing MIME type issues
   - Ensure all JavaScript files are being served with the correct MIME type (`application/javascript`)
   - Try deploying to Netlify as an alternative (this project includes a `netlify.toml` file for this purpose)

## Verifying Your Deployment

After deployment, verify that:

1. The application loads correctly
2. All JavaScript modules load without MIME type errors
3. All features work as expected

If you encounter any issues, check the Vercel deployment logs for more information.
