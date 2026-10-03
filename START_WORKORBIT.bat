@echo off
title WorkOrbit SaaS 2.0 - Local Dev Server
cd /d "%~dp0"
echo ========================================================
echo       WORKORBIT SAAS 2.0 - NEXT-GEN ENTERPRISE HRMS
echo ========================================================
echo.
echo Checking database and starting dev server...
echo URL: http://localhost:3000
echo.
npm run dev
pause
