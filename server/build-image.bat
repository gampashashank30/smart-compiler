@echo off
echo ============================================================
echo  Building gcc-runner Docker image for smart-compiler
echo ============================================================
echo.

REM Make sure Docker is running
docker info >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Docker is not running. Start Docker Desktop first.
    exit /b 1
)

echo [1/1] Building gcc-runner:latest from Dockerfile.gcc ...
docker build -f Dockerfile.gcc -t gcc-runner:latest .

if %ERRORLEVEL% EQU 0 (
    echo.
    echo [OK] Image built successfully: gcc-runner:latest
    echo.
    echo Test it with:
    echo   docker run --rm gcc-runner:latest gcc --version
) else (
    echo [ERROR] Build failed. See output above.
    exit /b 1
)
