// FTWEB_X — Frontend Logic
// Made by BLOODRAVENIST

// ═══════════════════════════════════════════
// MATRIX RAIN BACKGROUND
// ═══════════════════════════════════════════
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#9F4FFF';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ═══════════════════════════════════════════
// APP LOGIC
// ═══════════════════════════════════════════
const socket = io();
const output = document.getElementById('output');
const targetInput = document.getElementById('target');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const clearBtn = document.getElementById('clearBtn');
const scanStatus = document.getElementById('scanStatus');
const scanTarget = document.getElementById('scanTarget');
const lineCount = document.getElementById('lineCount');
const elapsed = document.getElementById('elapsed');
const serverStatus = document.getElementById('serverStatus');
const binaryStatus = document.getElementById('binaryStatus');

let lines = 0;
let startTime = null;
let timerInterval = null;

// Check binary existence
fetch('/api/check')
    .then(r => r.json())
    .then(data => {
        if (data.exists) {
            binaryStatus.innerHTML = '<span class="dot ok"></span> BINARY: READY';
        } else {
            binaryStatus.innerHTML = '<span class="dot err"></span> BINARY: NOT FOUND';
        }
    });

// Socket connection
socket.on('connect', () => {
    serverStatus.innerHTML = '<span class="dot ok"></span> SERVER: CONNECTED';
});

socket.on('disconnect', () => {
    serverStatus.innerHTML = '<span class="dot err"></span> SERVER: DISCONNECTED';
});

socket.on('scan_output', (data) => {
    addLine(data.line, data.type);
});

socket.on('scan_complete', (data) => {
    scanStatus.textContent = 'COMPLETE';
    startBtn.disabled = false;
    stopBtn.disabled = true;
    if (timerInterval) clearInterval(timerInterval);
    addLine('', 'info');
    addLine('═══════════════════════════════════════════════════', 'header');
    addLine('SCAN COMPLETE', 'success');
    addLine('Exit code: ' + data.exit_code, 'info');
    addLine('Total lines: ' + data.lines, 'info');
    addLine('═══════════════════════════════════════════════════', 'header');
});

function addLine(text, type = 'output') {
    const div = document.createElement('div');
    div.className = 'term-line term-' + type;
    if (type === 'output' || type === 'success') {
        div.innerHTML = '<span class="term-prompt">$</span> ' + escapeHtml(text);
    } else {
        div.textContent = text;
    }
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
    lines++;
    lineCount.textContent = lines;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Start button
startBtn.addEventListener('click', async () => {
    const target = targetInput.value.trim();
    if (!target) {
        addLine('ERROR: Enter a target first', 'error');
        return;
    }

    lines = 0;
    lineCount.textContent = '0';
    output.innerHTML = '';
    addLine('Starting scan on: ' + target, 'info');
    addLine('═══════════════════════════════════════════════════', 'header');

    startBtn.disabled = true;
    stopBtn.disabled = false;
    scanStatus.textContent = 'RUNNING';
    scanTarget.textContent = target;

    startTime = Date.now();
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        const sec = Math.floor((Date.now() - startTime) / 1000);
        const min = Math.floor(sec / 60);
        elapsed.textContent = String(min).padStart(2, '0') + ':' + String(sec % 60).padStart(2, '0');
    }, 1000);

    try {
        const resp = await fetch('/api/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ target })
        });
        const data = await resp.json();
        if (data.error) {
            addLine('ERROR: ' + data.error, 'error');
            startBtn.disabled = false;
            stopBtn.disabled = true;
            scanStatus.textContent = 'ERROR';
        }
    } catch (e) {
        addLine('ERROR: ' + e.message, 'error');
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
});

// Stop button
stopBtn.addEventListener('click', async () => {
    await fetch('/api/stop', { method: 'POST' });
    addLine('Scan stopped by user', 'warning');
    scanStatus.textContent = 'STOPPED';
    startBtn.disabled = false;
    stopBtn.disabled = true;
    if (timerInterval) clearInterval(timerInterval);
});

// Clear button
clearBtn.addEventListener('click', () => {
    output.innerHTML = '';
    lines = 0;
    lineCount.textContent = '0';
    scanStatus.textContent = 'IDLE';
    scanTarget.textContent = '—';
    elapsed.textContent = '00:00';
    addLine('Terminal cleared. Ready for new scan.', 'info');
});

// Enter key to start
targetInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !startBtn.disabled) {
        startBtn.click();
    }
});
