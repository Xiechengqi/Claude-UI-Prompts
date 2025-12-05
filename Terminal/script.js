// Terminal Linux Website - Interactive JavaScript

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Typewriter Effect for Hero Title
    const typewriterElement = document.querySelector('.typewriter');
    const heroText = ((typewriterElement?.dataset?.text) || (typewriterElement?.textContent) || '').trim();
    let charIndex = 0;
    let typewriterTextNode = null;
    let heroCursor = null;

    function typeWriter() {
        if (!typewriterElement || !heroText) {
            return;
        }

        if (!typewriterTextNode) {
            typewriterTextNode = document.createTextNode('');
            heroCursor = document.createElement('span');
            heroCursor.className = 'blinking-cursor';
            heroCursor.textContent = '_';
            heroCursor.setAttribute('aria-hidden', 'true');
            heroCursor.hidden = true;

            typewriterElement.textContent = '';
            typewriterElement.appendChild(typewriterTextNode);
            typewriterElement.appendChild(heroCursor);
        }

        if (charIndex < heroText.length) {
            typewriterTextNode.textContent += heroText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else if (heroCursor) {
            heroCursor.hidden = false;
        }
    }

    if (typewriterElement && heroText && !prefersReducedMotion) {
        setTimeout(typeWriter, 500);
    } else if (typewriterElement) {
        typewriterElement.textContent = heroText;
    }

    // System Monitor Updates
    const monitorProgressBars = Array.from(document.querySelectorAll('#system-monitor .progress-bar[data-monitor]'));

    function updateSystemMonitor() {
        const usageMap = [
            { id: 'cpu-usage', min: 10, max: 40 },
            { id: 'mem-usage', min: 60, max: 80 },
            { id: 'net-usage', min: 20, max: 60 },
            { id: 'disk-usage', min: 10, max: 40 }
        ];

        usageMap.forEach(({ id, min, max }, index) => {
            const value = Math.floor(Math.random() * (max - min + 1)) + min;
            const valueEl = document.getElementById(id);
            if (valueEl) {
                valueEl.textContent = value;
            }

            const progressBar = monitorProgressBars[index];
            if (progressBar) {
                progressBar.setAttribute('aria-valuenow', value);
                const fill = progressBar.querySelector('.progress-fill');
                if (fill) {
                    fill.style.width = `${value}%`;
                }
            }
        });
    }

    // Update system monitor every 2 seconds
    setInterval(updateSystemMonitor, 2000);
    updateSystemMonitor(); // Initial update

    // Calculate and update system uptime
    function updateUptime() {
        const now = new Date();
        const bootTime = new Date(now.getTime() - (Math.random() * 30 + 1) * 24 * 60 * 60 * 1000); // 1-31 days ago
        const uptime = now - bootTime;

        const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('uptime').textContent = `${days}d ${hours}h ${minutes}m`;
    }

    updateUptime();

    // Update current time
    function updateTime() {
        const now = new Date();
        const timeString = now.toUTCString().split(' ')[4];
        document.getElementById('current-time').textContent = timeString;
    }

    setInterval(updateTime, 1000);
    updateTime();

    // Update process count
    function updateProcessCount() {
        const processCount = Math.floor(Math.random() * 50) + 220; // 220-270
        document.getElementById('process-count').textContent = processCount;
    }

    setInterval(updateProcessCount, 5000);
    updateProcessCount();

    // Update load average
    function updateLoadAverage() {
        const load1 = (Math.random() * 0.5 + 0.1).toFixed(2);
        const load5 = (Math.random() * 0.3 + 0.08).toFixed(2);
        const load15 = (Math.random() * 0.2 + 0.05).toFixed(2);
        document.getElementById('load-avg').textContent = `${load1}, ${load5}, ${load15}`;
    }

    setInterval(updateLoadAverage, 3000);
    updateLoadAverage();

    // Simulate download progress
    const downloadButton = document.querySelector('.terminal-button.primary');
    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            // Reset and animate progress bar
            const progressBar = document.querySelector('.progress-section .progress-fill');
            if (progressBar) {
                progressBar.style.width = '0%';
                progressBar.style.transition = 'none';

                setTimeout(() => {
                    progressBar.style.transition = 'width 3s ease-out';
                    progressBar.style.width = '100%';
                }, 100);
            }

            // Simulate terminal output
            const terminalOutput = document.querySelector('.terminal-output');
            if (terminalOutput) {
                const newOutput = document.createElement('p');
                newOutput.textContent = `[${new Date().toLocaleTimeString()}] Download initiated...`;
                newOutput.style.color = '#ffb000';
                terminalOutput.appendChild(newOutput);
            }
        });
    }

    // View source code button
    const sourceButton = document.querySelector('.terminal-button.secondary');
    if (sourceButton) {
        sourceButton.addEventListener('click', () => {
            const repoUrl = sourceButton.dataset.repoUrl || 'https://github.com/torvalds/linux';
            window.open(repoUrl, '_blank', 'noopener,noreferrer');
        });
    }

    // Navigation smooth scroll with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetSelector = this.getAttribute('href');
            if (!targetSelector || targetSelector === '#') {
                return;
            }

            e.preventDefault();
            const target = document.querySelector(targetSelector);
            if (target) {
                const offsetTop = Math.max(target.offsetTop - 100, 0);
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add interactive hover effects to feature panes
    document.querySelectorAll('.feature-pane').forEach(pane => {
        pane.addEventListener('mouseenter', () => {
            pane.classList.add('is-active');
        });

        pane.addEventListener('mouseleave', () => {
            pane.classList.remove('is-active');
        });
    });

    // Terminal command simulation
    function simulateTerminalCommand(command, output, delay = 1000) {
        const promptLine = document.createElement('div');
        promptLine.className = 'prompt-line';
        promptLine.innerHTML = `$ <span class="command">${command}</span>`;

        const outputLine = document.createElement('div');
        outputLine.className = 'terminal-output';
        outputLine.innerHTML = output;
        outputLine.style.display = 'none';

        setTimeout(() => {
            outputLine.style.display = 'block';
        }, delay);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to focus on "command input" simulation
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const heroSection = document.getElementById('hero');
            heroSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Ctrl/Cmd + D for download simulation
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            downloadButton?.click();
        }
    });

    // Add random system messages
    const systemMessages = [
        '[SYSTEM] Kernel module loaded successfully',
        '[NETWORK] Interface eth0: UP',
        '[SECURITY] Firewall rules updated',
        '[STORAGE] Disk check completed',
        '[SERVICE] System daemon started'
    ];

    function showRandomSystemMessage() {
        const randomMessage = systemMessages[Math.floor(Math.random() * systemMessages.length)];
        const messageElement = document.createElement('div');
        messageElement.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(10, 10, 10, 0.9);
            border: 1px solid #33ff00;
            color: #33ff00;
            padding: 8px 12px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            z-index: 9999;
            animation: fadeInOut 3s ease-in-out;
        `;
        messageElement.setAttribute('role', 'status');
        messageElement.setAttribute('aria-live', 'polite');
        messageElement.textContent = randomMessage;
        if (prefersReducedMotion) {
            messageElement.style.animation = 'none';
        }

        document.body.appendChild(messageElement);

        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }

    function queueSystemMessage() {
        const nextDelay = Math.random() * 10000 + 10000;
        setTimeout(() => {
            showRandomSystemMessage();
            queueSystemMessage();
        }, nextDelay);
    }
    queueSystemMessage();

    // Add CSS animation for fade in/out
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(20px); }
            20% { opacity: 1; transform: translateY(0); }
            80% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(style);

    // Console easter egg
    console.log('%c🐧 LINUX KERNEL TERMINAL', 'color: #33ff00; font-family: monospace; font-size: 20px; font-weight: bold;');
    console.log('%cWelcome to the Linux Kernel Terminal Website', 'color: #33ff00; font-family: monospace;');
    console.log('%cSystem Status: [OPERATIONAL]', 'color: #33ff00; font-family: monospace;');

    // Initialize everything when page loads
    console.log('[INIT] Terminal website loaded successfully');
    console.log('[INIT] All systems operational');
});