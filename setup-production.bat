@echo off
REM SkillBuild AI - Production Deployment Script for Windows

setlocal enabledelayedexpansion

title SkillBuild AI - Production Setup

echo.
echo ==================================
echo SkillBuild AI - Production Setup
echo ==================================
echo.

REM Check Node.js installation
echo Checking prerequisites...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 16+
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo [OK] Node.js %NODE_VERSION% is installed

where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo [OK] npm %NPM_VERSION% is installed

echo.
echo Setting up Backend...
echo -------------------
if exist Backend (
    cd Backend
    
    REM Check if .env exists
    if not exist ".env" (
        echo [WARNING] .env file not found
        if exist ".env.example" (
            copy .env.example .env >nul
            echo [WARNING] Created .env from .env.example
            echo [INFO] Please edit Backend\.env with your production values
        ) else (
            echo [ERROR] .env.example not found
        )
    )
    
    REM Install dependencies
    echo [INFO] Installing dependencies...
    call npm install
    echo [OK] Dependencies installed
    
    REM Remove dev dependencies for production
    echo [INFO] Removing development dependencies...
    call npm prune --production
    echo [OK] Dev dependencies removed
    
    REM Audit packages
    echo [INFO] Running security audit...
    call npm audit || true
    echo [OK] Security audit complete
    
    cd ..
) else (
    echo [ERROR] Backend directory not found
    pause
    exit /b 1
)

echo.
echo Setting up Frontend...
echo ---------------------
if exist frontEnd (
    cd frontEnd
    
    REM Check if .env.production exists
    if not exist ".env.production" (
        echo [WARNING] .env.production file not found
        if exist ".env.example" (
            copy .env.example .env.production >nul
            echo [WARNING] Created .env.production from .env.example
            echo [INFO] Please edit frontEnd\.env.production with your production values
        ) else (
            echo [ERROR] .env.example not found
        )
    )
    
    REM Install dependencies
    echo [INFO] Installing dependencies...
    call npm install
    echo [OK] Dependencies installed
    
    REM Build for production
    echo [INFO] Building for production...
    call npm run build
    echo [OK] Production build complete
    
    echo [INFO] Build output is in: frontEnd\dist
    
    cd ..
) else (
    echo [ERROR] frontEnd directory not found
    pause
    exit /b 1
)

echo.
echo ==================================
echo ✅ Setup Complete!
echo ==================================
echo.
echo Next steps:
echo 1. Review and update environment variables:
echo    - Backend\.env
echo    - frontEnd\.env.production
echo.
echo 2. Deploy frontend (dist folder) to your hosting
echo.
echo 3. Start backend in production:
echo    cd Backend
echo    set NODE_ENV=production
echo    node index.js
echo.
echo 4. Or use PM2 for process management:
echo    npm install -g pm2
echo    pm2 start Backend/index.js --name "skillbuild-backend"
echo.
echo 5. Check health endpoint:
echo    curl http://localhost:5011/api/health
echo.
echo For more details, see PRODUCTION_DEPLOYMENT.md
echo.
pause
