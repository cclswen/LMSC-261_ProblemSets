document.addEventListener('DOMContentLoaded', async function() {
    // Create container
    const container = document.createElement('div');
    container.id = 'container';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #121212;
        overflow: hidden;
    `;
    document.body.appendChild(container);

    // Create canvas
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    
    // Canvas setup
    function resizeCanvas() {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const ctx = canvas.getContext('2d');
    
    // Audio setup
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    
    // Metronome setup
    const metronomeClick = new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 10,
        oscillator: { type: "square" },
        envelope: {
            attack: 0.001,
            decay: 0.1,
            sustain: 0.01,
            release: 0.01,
            attackCurve: "exponential"
        }
    }).toDestination();
    
    let bpm = 120;
    Tone.Transport.bpm.value = bpm;
    let metronomeLoop = null;
    let isMetronomeOn = false;
    
    function setupMetronome() {
        if (metronomeLoop) metronomeLoop.dispose();
        
        metronomeLoop = new Tone.Loop(time => {
            metronomeClick.triggerAttackRelease("C6", "16n", time);
            createMetronomePulse();
        }, "4n").start(0);
    }
    
    function toggleMetronome() {
        isMetronomeOn = !isMetronomeOn;
        if (isMetronomeOn) {
            setupMetronome();
            Tone.Transport.start();
        } else {
            Tone.Transport.stop();
        }
        updateUI();
    }
    
    // Visual elements
    class VisualElement {
        constructor(x, y, radius, color, velocity) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.velocity = velocity || {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            };
            this.life = 3000 + Math.random() * 2000;
            this.createdAt = Date.now();
        }
        
        update(elements) {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            
            // Wall collisions
            if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
                this.velocity.x = -this.velocity.x * 0.8;
            }
            if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
                this.velocity.y = -this.velocity.y * 0.8;
            }
            
            // Element collisions
            for (const element of elements) {
                if (element !== this) {
                    const dx = element.x - this.x;
                    const dy = element.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < this.radius + element.radius) {
                        // Simple collision response
                        const angle = Math.atan2(dy, dx);
                        const speed = Math.sqrt(this.velocity.x**2 + this.velocity.y**2);
                        this.velocity.x = Math.cos(angle + Math.PI) * speed * 0.8;
                        this.velocity.y = Math.sin(angle + Math.PI) * speed * 0.8;
                    }
                }
            }
        }
        
        draw() {
            const age = Date.now() - this.createdAt;
            const opacity = 1 - (age / this.life);
            
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    // Visual state
    let activeNotes = new Set();
    let visualElements = [];
    
    // Key mapping
    const keyMap = {
        'a': { note: 'C4', color: '#FF2D75' },
        's': { note: 'D4', color: '#FF9E2D' },
        'd': { note: 'E4', color: '#FFEB2D' },
        'f': { note: 'F4', color: '#2DFF46' },
        'g': { note: 'G4', color: '#2DD2FF' },
        'h': { note: 'A4', color: '#7D2DFF' },
        'j': { note: 'B4', color: '#FF2DEB' },
        'k': { note: 'C5', color: '#FFFFFF' }
    };
    
    function createVisualElements(noteData) {
        // Create particles at random positions instead of center
        for (let i = 0; i < 8; i++) {
            // Random position within canvas
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = 5 + Math.random() * 10;
            
            visualElements.push(new VisualElement(
                x, y,
                radius,
                noteData.color,
                { 
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 2
                }
            ));
        }
    }
    
    function createMetronomePulse() {
        // Metronome pulse still comes from center
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        visualElements.push(new VisualElement(
            centerX, centerY,
            15,
            '#FFFFFF',
            { x: 0, y: 0 }
        ));
    }
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Clear canvas
        ctx.fillStyle = 'rgba(18, 18, 18, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw elements
        for (let i = visualElements.length - 1; i >= 0; i--) {
            const element = visualElements[i];
            element.update(visualElements);
            element.draw();
            
            // Remove old elements
            if (Date.now() - element.createdAt > element.life) {
                visualElements.splice(i, 1);
            }
        }
    }
    
    // Start animation
    animate();
    
    // UI Update
    function updateUI() {
        instructions.innerHTML = `
            <div>Play: A-K | Metronome: M (${isMetronomeOn ? 'ON' : 'OFF'}) | BPM: ${bpm} (+/-)</div>
            <div>Current: ${Array.from(activeNotes).join(', ') || 'None'}</div>
        `;
    }
    
    // Instructions
    const instructions = document.createElement('div');
    instructions.style.cssText = `
        position: absolute;
        bottom: 20px;
        left: 0;
        right: 0;
        text-align: center;
        color: white;
        font-family: Arial, sans-serif;
        background: rgba(0,0,0,0.7);
        padding: 10px;
    `;
    container.appendChild(instructions);
    updateUI();
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        const noteData = keyMap[e.key.toLowerCase()];
        if (noteData && !activeNotes.has(noteData.note)) {
            activeNotes.add(noteData.note);
            synth.triggerAttack(noteData.note);
            createVisualElements(noteData);
            updateUI();
        }
        
        if (e.key === 'm') toggleMetronome();
        if (e.key === '+' || e.key === '=') {
            bpm = Math.min(240, bpm + 5);
            Tone.Transport.bpm.value = bpm;
            updateUI();
        }
        if (e.key === '-' || e.key === '_') {
            bpm = Math.max(40, bpm - 5);
            Tone.Transport.bpm.value = bpm;
            updateUI();
        }
    });
    
    document.addEventListener('keyup', (e) => {
        const noteData = keyMap[e.key.toLowerCase()];
        if (noteData && activeNotes.has(noteData.note)) {
            activeNotes.delete(noteData.note);
            synth.triggerRelease(noteData.note);
            updateUI();
        }
    });
    
    // Start screen
    const initOverlay = document.createElement('div');
    initOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0,0.9);
        color: white;
        font-family: Arial, sans-serif;
        z-index: 100;
    `;
    initOverlay.innerHTML = `
        <h1>AURORA</h1>
        <p>Press any key to start</p>
        <div style="margin-top: 30px;">
            <div>Keys A-K: Play notes</div>
            <div>M: Toggle metronome</div>
            <div>+/-: Adjust tempo</div>
        </div>
    `;
    container.appendChild(initOverlay);
    
    // Start audio context
    initOverlay.addEventListener('click', async () => {
        await Tone.start();
        initOverlay.style.display = 'none';
    });
});