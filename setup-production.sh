#!/bin/bash

# SkillBuild AI - Production Deployment Script
# This script helps with setting up the application for production

set -e

echo "🚀 SkillBuild AI - Production Setup"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print success messages
print_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

# Function to print warning messages
print_warning() {
  echo -e "${YELLOW}⚠ $1${NC}"
}

# Function to print error messages
print_error() {
  echo -e "${RED}✗ $1${NC}"
}

# Check Node.js installation
echo "Checking prerequisites..."
if ! command -v node &> /dev/null; then
  print_error "Node.js is not installed. Please install Node.js 16+"
  exit 1
fi
print_success "Node.js $(node -v) is installed"

if ! command -v npm &> /dev/null; then
  print_error "npm is not installed"
  exit 1
fi
print_success "npm $(npm -v) is installed"

echo ""
echo "Setting up Backend..."
echo "-------------------"

# Backend setup
if [ -d "Backend" ]; then
  cd Backend
  
  # Check if .env exists
  if [ ! -f ".env" ]; then
    print_warning ".env file not found. Creating from .env.example..."
    if [ -f ".env.example" ]; then
      cp .env.example .env
      print_warning "Please edit Backend/.env with your production values"
    else
      print_error ".env.example not found"
    fi
  fi
  
  # Install dependencies
  print_warning "Installing dependencies..."
  npm install --silent
  print_success "Dependencies installed"
  
  # Remove dev dependencies for production
  print_warning "Removing development dependencies..."
  npm prune --production --silent
  print_success "Dev dependencies removed"
  
  # Audit packages
  print_warning "Running security audit..."
  npm audit || true
  print_success "Security audit complete"
  
  cd ..
else
  print_error "Backend directory not found"
  exit 1
fi

echo ""
echo "Setting up Frontend..."
echo "---------------------"

# Frontend setup
if [ -d "frontEnd" ]; then
  cd frontEnd
  
  # Check if .env.production exists
  if [ ! -f ".env.production" ]; then
    print_warning ".env.production file not found. Creating from .env.example..."
    if [ -f ".env.example" ]; then
      cp .env.example .env.production
      print_warning "Please edit frontEnd/.env.production with your production values"
    else
      print_error ".env.example not found"
    fi
  fi
  
  # Install dependencies
  print_warning "Installing dependencies..."
  npm install --silent
  print_success "Dependencies installed"
  
  # Build for production
  print_warning "Building for production..."
  npm run build --silent
  print_success "Production build complete"
  
  print_warning "Build output is in: frontEnd/dist"
  
  cd ..
else
  print_error "frontEnd directory not found"
  exit 1
fi

echo ""
echo "=================================="
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. Review and update environment variables:"
echo "   - Backend/.env"
echo "   - frontEnd/.env.production"
echo ""
echo "2. Deploy frontend (dist folder) to your hosting"
echo ""
echo "3. Start backend in production:"
echo "   cd Backend"
echo "   NODE_ENV=production node index.js"
echo ""
echo "4. Or use PM2 for process management:"
echo "   npm install -g pm2"
echo "   pm2 start Backend/index.js --name 'skillbuild-backend'"
echo ""
echo "5. Check health endpoint:"
echo "   curl http://localhost:5011/api/health"
echo ""
echo "For more details, see PRODUCTION_DEPLOYMENT.md"
echo ""
