# Aurora

## Concept
An interactive audio-visual synthesizer with aurora borealis-inspired visuals that respond to musical notes played via keyboard.

## Color Palette
- Primary: `#0f0524`, `#1a0933` (Deep purple gradients)
- Aurora Colors: 
  - `#8e44ad` (Purple)
  - `#3498db` (Blue)
  - `#e74c3c` (Red)
- Note Colors:
  - C4: `#FF2D75` (Pink)
  - D4: `#FF9E2D` (Orange)
  - E4: `#FFEB2D` (Yellow)
  - F4: `#2DFF46` (Green)
  - G4: `#2DD2FF` (Light Blue)
  - A4: `#7D2DFF` (Purple)
  - B4: `#FF2DEB` (Magenta)
  - C5: `#FFFFFF` (White)

## Typography
- Primary Font: `Rajdhani` 
- Fallback: `Arial, sans-serif`

## Visual Elements
1. **Aurora Background**:
   - Multi-layered radial gradients
   - Slow rotational animation
   - Blur effects for dreamy appearance

2. **Note Particles**:
   - Circular elements that spawn on note triggers
   - Physics-based movement with collisions
   - Color-coded to match notes
   - Gradual fade-out

3. **Metronome Pulse**:
   - White circular pulse from center
   - Synchronized with beat

## Interaction
- Keyboard keys A-K play musical notes
- M toggles metronome
- +/- adjusts tempo (40-240 BPM)
- Click start screen to initialize audio context

## Technical Stack
- Tone.js for audio synthesis
- Canvas API for visuals
- Web Audio API integration