# Production Deployment Guide

## SkillBuild AI Portal - Production Ready Setup

This guide covers everything needed to deploy the SkillBuild AI portal to production.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Backend Deployment](#backend-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Database Configuration](#database-configuration)
6. [Security Checklist](#security-checklist)
7. [Monitoring & Logging](#monitoring--logging)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Node.js 16+ installed
- MongoDB Atlas account (or self-hosted MongoDB)
- Cloudinary account for image/file storage
- SSL/TLS certificate
- Domain name
- Hosting platform (AWS, Heroku, DigitalOcean, etc.)

---

## Environment Setup

### Backend Environment Variables (.env)

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/skillbuildai?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_super_secret_jwt_key_generate_strong_random_string

# Server
PORT=5011
NODE_ENV=production

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
FRONTEND_URL=https://yourdomain.com

# Session
SESSION_TIMEOUT=86400000
```

### Frontend Environment Variables (.env.production)

```env
VITE_API_URL=https://api.yourdomain.com
VITE_NODE_ENV=production
VITE_ENABLE_ANALYTICS=true
```

### Important Notes:

- **Never commit .env files** to version control
- Use strong, random JWT_SECRET (use `openssl rand -base64 32`)
- Keep Cloudinary credentials secure
- Use environment-specific URLs

---

## Backend Deployment

### 1. Install Dependencies

```bash
cd Backend
npm install
```

### 2. Build Optimization

```bash
# Remove development dependencies
npm prune --production

# Verify production dependencies
npm list --production
```

### 3. Database Preparation

```bash
# Create indexes for frequently queried fields
node scripts/createIndexes.js
```

### 4. Start Server in Production

```bash
# Using Node directly
NODE_ENV=production node index.js

# Using PM2 for process management (recommended)
npm install -g pm2
pm2 start index.js --name "skillbuild-backend" --env NODE_ENV=production
pm2 save
pm2 startup
```

### 5. PM2 Ecosystem Configuration (Optional)

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      name: 'skillbuild-backend',
      script: './index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5011,
      },
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
```

Start with: `pm2 start ecosystem.config.js`

---

## Frontend Deployment

### 1. Build for Production

```bash
cd frontEnd
npm install
npm run build
```

The `dist/` folder contains production-ready files.

### 2. Deployment Options

#### Option A: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Option B: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Option C: Traditional Server (Nginx/Apache)

**Nginx Configuration:**

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    root /var/www/skillbuild/dist;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "max-age=0, no-cache, no-store, must-revalidate";
    }

    # API proxy
    location /api/ {
        proxy_pass http://localhost:5011;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

---

## Database Configuration

### MongoDB Atlas Setup

1. Create a cluster on MongoDB Atlas
2. Create a database user with strong password
3. Whitelist IP addresses
4. Use connection string with proper URI format
5. Enable backups and monitoring

### Connection String Format

```
mongodb+srv://username:password@cluster-name.mongodb.net/database-name?retryWrites=true&w=majority
```

### Create Indexes

```javascript
// utils/createIndexes.js
import mongoose from 'mongoose';
import User from '../models/user.model.js';
import Company from '../models/company.model.js';
import Job from '../models/job.model.js';
import Application from '../models/application.model.js';

const createIndexes = async () => {
  await User.collection.createIndex({ email: 1 }, { unique: true });
  await User.collection.createIndex({ adharcard: 1 }, { unique: true });
  await User.collection.createIndex({ pancard: 1 }, { unique: true });
  
  await Company.collection.createIndex({ name: 1 });
  await Job.collection.createIndex({ title: 1 });
  await Job.collection.createIndex({ companyId: 1 });
  await Application.collection.createIndex({ userId: 1 });
  await Application.collection.createIndex({ jobId: 1 });
};

export default createIndexes;
```

---

## Security Checklist

- [ ] Remove development dependencies
- [ ] Set secure JWT_SECRET (32+ characters)
- [ ] Enable HTTPS/SSL
- [ ] Set secure cookie flags (httpOnly, secure, sameSite)
- [ ] Validate all user inputs
- [ ] Use rate limiting (already implemented)
- [ ] Add CORS restrictions to known domains
- [ ] Remove console logging in production
- [ ] Set proper database indexes
- [ ] Enable MongoDB backups
- [ ] Use environment variables for secrets
- [ ] Regular security audits with `npm audit`
- [ ] Keep dependencies updated
- [ ] Implement request logging
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Disable X-Powered-By header
- [ ] Set security headers (Helmet already enabled)

---

## Monitoring & Logging

### Application Logging

```javascript
// Add to index.js
const logger = (message, level = 'info') => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
};
```

### Health Checks

- Set up automated health check on `/api/health` endpoint
- Configure monitoring alerts
- Track uptime and response times

### Error Tracking

Use services like:
- **Sentry** for error tracking
- **LogRocket** for session replay
- **New Relic** for performance monitoring
- **Datadog** for comprehensive monitoring

---

## Troubleshooting

### Issue: CORS Errors

**Solution:** Update `FRONTEND_URL` in backend `.env` file

```env
FRONTEND_URL=https://yourdomain.com
```

### Issue: Database Connection Fails

**Solution:** Verify MongoDB connection string and IP whitelist

```bash
# Test connection
mongosh "your-connection-string"
```

### Issue: Static Files Not Loading

**Solution:** For Nginx, verify the correct root path and enable gzip

```nginx
root /var/www/skillbuild/dist;
gzip on;
```

### Issue: Token Expiration

**Solution:** Clear cookies and re-login

```javascript
// Automatic token refresh can be added to API interceptor
```

### Issue: High Memory Usage

**Solution:** Enable clustering and load balancing

```javascript
import cluster from 'cluster';
import os from 'os';

const numCPUs = os.cpus().length;
if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
}
```

---

## Performance Optimization

### Frontend

- [ ] Enable code splitting in Vite
- [ ] Compress assets with gzip
- [ ] Use lazy loading for routes
- [ ] Implement image optimization
- [ ] Use CDN for static assets

### Backend

- [ ] Enable compression middleware
- [ ] Implement response caching
- [ ] Use database indexes
- [ ] Implement rate limiting
- [ ] Use connection pooling for database

---

## Rollback Procedure

1. Keep previous deployment backup
2. Use git tags for versions: `git tag -a v1.0.0 -m "Production Release v1.0.0"`
3. Use PM2 for quick restarts: `pm2 start index.js`
4. Maintain database backups for quick recovery

---

## Support & Further Help

- Check logs: `pm2 logs`
- Review error messages carefully
- Enable detailed logging in development mode
- Monitor performance metrics regularly

---

Last Updated: 2024
