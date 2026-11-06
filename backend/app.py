#!/usr/bin/env python3
"""
FTWEB_X — Web GUI for FTBUGRECON
Made by BLOODRAVENIST
"""
import os
import sys
import subprocess
import threading
import time
from pathlib import Path
from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit

BASE_DIR = Path(__file__).parent.parent
APP_DIR = BASE_DIR.parent  # ~/PROJECT
FTBUGRECON = APP_DIR / "FTBUGRECON" / "ftbugrecon"

app = Flask(__name__, template_folder="../templates", static_folder="../static")
app.config["SECRET_KEY"] = "ftweb_x_bloodravenist_2026"
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="threading")

# Store current scan
current_scan = {"running": False, "target": None, "output": [], "process": None}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/check")
def check():
    """Check if ftbugrecon binary exists."""
    if FTBUGRECON.exists():
        return jsonify({"exists": True, "path": str(FTBUGRECON)})
    return jsonify({"exists": False, "path": str(FTBUGRECON)})

@app.route("/api/start", methods=["POST"])
def start_scan():
    """Start scan in background thread."""
    if current_scan["running"]:
        return jsonify({"error": "Scan already running"}), 400

    data = request.json
    target = data.get("target", "").strip()

    if not target:
        return jsonify({"error": "No target provided"}), 400

    if not FTBUGRECON.exists():
        return jsonify({"error": f"Binary not found: {FTBUGRECON}"}), 404

    current_scan["running"] = True
    current_scan["target"] = target
    current_scan["output"] = []

    thread = threading.Thread(target=run_scan, args=(target,))
    thread.daemon = True
    thread.start()

    return jsonify({"status": "started", "target": target})

@app.route("/api/stop", methods=["POST"])
def stop_scan():
    """Stop running scan."""
    if current_scan["process"]:
        try:
            current_scan["process"].terminate()
        except Exception:
            pass
    current_scan["running"] = False
    return jsonify({"status": "stopped"})

@app.route("/api/status")
def status():
    return jsonify({
        "running": current_scan["running"],
        "target": current_scan["target"],
        "lines": len(current_scan["output"])
    })

def run_scan(target):
    """Execute ftbugrecon and stream output via SocketIO."""
    try:
        process = subprocess.Popen(
            [str(FTBUGRECON), target],
            cwd=str(FTBUGRECON.parent),
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            bufsize=1,
            universal_newlines=True
        )
        current_scan["process"] = process

        for line in iter(process.stdout.readline, ""):
            line = line.rstrip("\n")
            current_scan["output"].append(line)
            socketio.emit("scan_output", {"line": line, "type": "output"})

        process.wait()
        socketio.emit("scan_complete", {
            "exit_code": process.returncode,
            "lines": len(current_scan["output"])
        })

    except Exception as e:
        socketio.emit("scan_output", {"line": f"ERROR: {e}", "type": "error"})
        socketio.emit("scan_complete", {"exit_code": -1, "error": str(e)})
    finally:
        current_scan["running"] = False
        current_scan["process"] = None

@socketio.on("connect")
def handle_connect():
    emit("connected", {"message": "FTWEB_X connected"})

if __name__ == "__main__":
    print("=" * 60)
    print("  FTWEB_X — Web GUI for FTBUGRECON")
    print("  Made by BLOODRAVENIST")
    print("=" * 60)

    if not FTBUGRECON.exists():
        print(f"\n[!] WARNING: ftbugrecon binary not found at {FTBUGRECON}")
        print("[!] Build it first: cd ~/PROJECT/FTBUGRECON && make\n")
    else:
        print(f"\n[+] Found binary: {FTBUGRECON}\n")

    print("[*] Starting server at http://127.0.0.1:5000\n")
    socketio.run(app, host="127.0.0.1", port=5000, debug=False, allow_unsafe_werkzeug=True)
