#!/bin/bash
# FTWEB_X — Startup Script
# Made by BLOODRAVENIST

cd "$(dirname "$0")"

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  FTWEB_X — Web GUI for FTBUGRECON                        ║"
echo "║  Made by BLOODRAVENIST                                    ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Check venv
if [ ! -d "venv" ]; then
    echo "[*] Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate

# Install dependencies
if [ ! -f "venv/.installed" ]; then
    echo "[*] Installing dependencies..."
    pip install -q --upgrade pip
    pip install -q -r backend/requirements.txt
    touch venv/.installed
fi

# Check ftbugrecon binary
if [ ! -f "../FTBUGRECON/ftbugrecon" ]; then
    echo "[!] WARNING: ftbugrecon binary not found"
    echo "[!] Build it first: cd ../FTBUGRECON && make"
    echo ""
fi

# Start server
echo "[*] Starting FTWEB_X server..."
echo "[*] Opening browser at http://127.0.0.1:5000"
echo ""

# Auto-open browser after 2 seconds
(sleep 2 && xdg-open http://127.0.0.1:5000 2>/dev/null || sensible-browser http://127.0.0.1:5000 2>/dev/null || echo "[!] Could not open browser automatically") &

python3 backend/app.py
