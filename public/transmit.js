// transmit.js - Logic for the elusive TRANSMIT button trap.

(function() {
    let transmitClicksRequired = 20;
    let currentTransmitClicks = 0;
    let transmitActive = false;

    document.addEventListener("DOMContentLoaded", () => {
        const transmitBtn = document.getElementById("transmit-btn");
        const titleInput = document.getElementById("transmit-title");
        const categoryInput = document.getElementById("transmit-category");
        const editorInput = document.getElementById("journalEditor");
        const flashMessage = document.getElementById("flash-message");

        if (!transmitBtn || !titleInput || !categoryInput || !editorInput) return;

        transmitBtn.addEventListener("click", function(e) {
            e.preventDefault();

            // Validate form before starting the annoying minigame
            if (!transmitActive) {
                if (!titleInput.value.trim() || categoryInput.value === "" || !editorInput.value.trim()) {
                    alert("SYSTEM ERROR: CANNOT TRANSMIT EMPTY LOG. PLEASE FILL ALL FIELDS AND SELECT A CATEGORY.");
                    return;
                }
                
                // Form is valid - start the trap
                transmitActive = true;
                currentTransmitClicks = 0;
                
                // Change appearance and position
                transmitBtn.style.position = "fixed";
                transmitBtn.style.zIndex = "100000";
                transmitBtn.style.width = "auto";
                
                relocateButton();
                updateButtonText();
                
            } else {
                // Game in progress
                currentTransmitClicks++;
                
                if (currentTransmitClicks >= transmitClicksRequired) {
                    // Minigame won - Redirect to final story page
                    window.location.href = '/story';
                } else {
                    // Proceed to next level of annoyance
                    relocateButton();
                    updateButtonText();
                    
                    // Exponential shake math 
                    // e.g. clicks=1 -> multiplier ~1.2. clicks=19 -> multiplier ~15.
                    const shakeIntensity = Math.pow(1.15, currentTransmitClicks);
                    const shakeSpeed = Math.min(3, 1 + (currentTransmitClicks * 0.1)); // Speeds up the animation slightly
                    
                    // Calculate a hotter red background color exponentially
                    // Start at dark camo #1a1e15 (rgb 26, 30, 21), ends near bright red #ff0000
                    const redVal = Math.min(255, 26 + (Math.pow(1.3, currentTransmitClicks) * 2));
                    const otherVal = Math.max(0, 30 - (currentTransmitClicks * 2));
                    const bgColor = `rgb(${redVal}, ${otherVal}, ${otherVal})`;
                    
                    // Apply to body
                    document.body.style.setProperty('--shake-intensity', shakeIntensity);
                    document.body.style.setProperty('--shake-speed', shakeSpeed);
                    document.body.style.setProperty('--shake-bg', bgColor);
                    
                    document.body.classList.add('shake-screen');
                    
                    setTimeout(() => {
                        document.body.classList.remove('shake-screen');
                        // Restore body to default
                        document.body.style.removeProperty('--shake-intensity');
                        document.body.style.removeProperty('--shake-speed');
                        document.body.style.removeProperty('--shake-bg');
                    }, 400 + (currentTransmitClicks * 10)); // Shake lasts slightly longer each time
                }
            }
        });

        function relocateButton() {
            // Randomly position the button inside the visible viewport
            const btnWidth = transmitBtn.offsetWidth || 150;
            const btnHeight = transmitBtn.offsetHeight || 60;
            
            const maxX = window.innerWidth - btnWidth - 20;
            const maxY = window.innerHeight - btnHeight - 20;
            
            const randomX = Math.max(10, Math.floor(Math.random() * maxX));
            const randomY = Math.max(10, Math.floor(Math.random() * maxY));
            
            transmitBtn.style.left = randomX + "px";
            transmitBtn.style.top = randomY + "px";
            
            // Add some erratic rotation just to make clicking it even worse
            const rotation = (Math.random() - 0.5) * 30; // -15 to +15 degrees
            transmitBtn.style.transform = `rotate(${rotation}deg)`;
        }

        function updateButtonText() {
            const clicksLeft = transmitClicksRequired - currentTransmitClicks;
            transmitBtn.innerText = `TRANSMIT (${clicksLeft} LEFT)`;
            
            // Getting desperate styling colors
            if (clicksLeft <= 5) {
                transmitBtn.style.backgroundColor = "#8a0303";
                transmitBtn.style.color = "white";
            } else if (clicksLeft <= 10) {
                transmitBtn.style.backgroundColor = "#c4a000";
                transmitBtn.style.color = "black";
            } else {
                transmitBtn.style.backgroundColor = "#c0c0c0"; // default
                transmitBtn.style.color = "black";
            }
        }
    });
})();
