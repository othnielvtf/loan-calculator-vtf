#!/bin/bash

# This script is used by Vercel to build the application

# Install dependencies
npm install

# Build the application
npm run build

# Create a Vercel-specific _headers file in the dist directory
cat > dist/_headers << EOL
# Headers for all files
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer-when-downgrade

# Headers for JavaScript files
/assets/*.js
  Content-Type: application/javascript; charset=utf-8

# Headers for CSS files
/assets/*.css
  Content-Type: text/css; charset=utf-8
EOL

# Create a Vercel-specific _redirects file in the dist directory
cat > dist/_redirects << EOL
/* /index.html 200
EOL

echo "Build completed successfully!"
