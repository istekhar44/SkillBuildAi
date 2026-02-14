# SkillBuild AI Portal - Production Ready

## Overview

This is a full-stack job portal application built with Node.js/Express backend and React frontend. The application is now production-ready with all security measures, validation, and optimization in place.

## Quick Start

### Prerequisites
- Node.js 16+
- MongoDB Atlas account
- Cloudinary account
- Environment variables configured

### Backend Setup

```bash
cd Backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontEnd
npm install
npm run dev
```

## Production Deployment

### 1. Backend

```bash
cd Backend
npm install --production
NODE_ENV=production node index.js
```

Or using PM2:

```bash
pm2 start index.js --name "skillbuild" --env NODE_ENV=production
```

### 2. Frontend

```bash
cd frontEnd
npm install
npm run build
# Deploy dist/ folder to your hosting platform
```

## Environment Configuration

### Backend (.env)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/skillbuildai
JWT_SECRET=your_secret_key_here
NODE_ENV=production
PORT=5011
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
FRONTEND_URL=https://yourdomain.com
```

### Frontend (.env.production)
```env
VITE_API_URL=https://api.yourdomain.com
VITE_NODE_ENV=production
```

## Key Features

✅ **Security**
- JWT authentication with token expiration
- Secure cookie settings (httpOnly, secure, sameSite)
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Rate limiting (100 requests per 15 minutes)
- Helmet security headers
- HTTPS support

✅ **Performance**
- Gzip compression
- Code splitting in frontend
- Database indexing
- Request size limits
- Response caching headers
- Optimized builds

✅ **Error Handling**
- Comprehensive error messages
- Detailed logging in development
- Error boundaries in React
- Graceful error recovery
- Health check endpoint

✅ **Database**
- MongoDB Atlas with backups
- Indexed queries for performance
- Unique constraints on email, Aadhaar, PAN
- Connection pooling

## API Endpoints

### User Routes
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - Login user
- `POST /api/user/logout` - Logout user
- `POST /api/user/profile/update` - Update profile (requires authentication)

### Company Routes
- `GET /api/company/get` - Get all companies
- `POST /api/company/register` - Register company
- `PUT /api/company/update/:id` - Update company

### Job Routes
- `GET /api/job/get` - Get all jobs (with pagination)
- `POST /api/job/post` - Post new job
- `GET /api/job/:id` - Get job by ID
- `GET /api/admin/jobs` - Get admin jobs

### Application Routes
- `GET /api/application/get` - Get applications
- `POST /api/application/apply` - Apply for job
- `PUT /api/application/status/:id` - Update application status

### Health Check
- `GET /api/health` - Health check endpoint

## File Structure

```
Backend/
├── controllers/        # Business logic
├── models/            # Database schemas
├── routes/            # API routes
├── middleware/        # Custom middleware
├── utils/             # Helper functions
└── index.js           # Server entry point

frontEnd/
├── src/
│   ├── components/    # React components
│   ├── pages/         # Page components
│   ├── context/       # Context API
│   ├── config/        # Configuration
│   └── App.jsx        # Main app component
├── vite.config.js     # Vite configuration
└── package.json       # Dependencies
```

## Running in Production

### With PM2

1. Install PM2 globally:
   ```bash
   npm install -g pm2
   ```

2. Create ecosystem config (optional):
   ```bash
   pm2 start index.js --name "skillbuild-backend" --env NODE_ENV=production
   ```

3. Save and startup:
   ```bash
   pm2 save
   pm2 startup
   ```

### With Docker (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5011
CMD ["node", "index.js"]
```

Build and run:
```bash
docker build -t skillbuild-backend .
docker run -p 5011:5011 --env-file .env skillbuild-backend
```

## Monitoring

### Health Check
```bash
curl https://api.yourdomain.com/api/health
```

### Logs
- Backend: Check PM2 logs with `pm2 logs skillbuild-backend`
- Frontend: Check browser console and network tab

### Performance
- Monitor database queries in MongoDB Atlas
- Check API response times
- Monitor server CPU and memory usage

## Security Checklist

- [ ] Update JWT_SECRET with strong random string
- [ ] Configure HTTPS/SSL certificate
- [ ] Set proper CORS origins
- [ ] Enable rate limiting
- [ ] Set secure cookies
- [ ] Validate all inputs
- [ ] Keep dependencies updated
- [ ] Regular security audits
- [ ] Database backups enabled
- [ ] Monitor for suspicious activity

## Troubleshooting

### CORS Issues
Check that `FRONTEND_URL` in backend `.env` matches your frontend domain.

### Database Connection
Verify MongoDB connection string and IP whitelisting in MongoDB Atlas.

### Token Errors
Ensure JWT_SECRET is set correctly and hasn't changed between restarts.

### File Upload Issues
Check Cloudinary credentials and file size limits (5MB).

## Support

For detailed deployment instructions, see [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)

## License

ISC

---

**Last Updated:** 2024
**Status:** ✅ Production Ready
