document.addEventListener("DOMContentLoaded", function () {
    const activities = [
        { name: "Deep Breathing", duration: 10 }, // 10 seconds
        { name: "Hearing", duration: 10 },
        { name: "visualization", duration: 10 },
        { name: "Mindful Journaling", duration: 10 },
        { name: "OM Chanting ", duration: 10 },
    ];

    let currentActivityIndex = 0;
    const activityText = document.getElementById("activity-text");
    const timerText = document.getElementById("timer-text");
    const startButton = document.getElementById("start-button");

    function startTimer(duration) {
        let timeLeft = duration;
        playBeepSound(); // Play an initial beep sound when the timer starts

        const timerInterval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerText.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

            if (timeLeft <= 3) {
                // Play the beep sound only during the last 3 seconds
                playBeepSound();
            }

            if (timeLeft === 0) {
                clearInterval(timerInterval);
                timerText.textContent = "";
                setTimeout(startActivity, 2000); // Delay before starting the next activity (2 seconds)
            } else {
                timeLeft--;
            }
        }, 1000); // Update every 1 second
    }

    function playBeepSound() {
        const beepSound = new Audio("beep.mp3"); // Replace with your audio file path
        beepSound.play();
    }
    document.addEventListener("DOMContentLoaded", function () {
        const subscribeButton = document.getElementById("subscribe-button");
    
        subscribeButton.addEventListener("click", () => {
            const emailInput = document.getElementById("email-input").value;
    
            fetch('/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailInput }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.message === 'Subscription successful') {
                    // Handle success (e.g., close popup, show thank you message)
                    console.log('Subscription successful');
                } else {
                    // Handle error (e.g., display an error message)
                    console.error('Subscription failed');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    });
    
    function startActivity() {
        if (currentActivityIndex < activities.length) {
            startButton.style.display = "none"; // Hide the button
            activityText.textContent = `Activity ${currentActivityIndex + 1}: ${activities[currentActivityIndex].name}`;
            startTimer(activities[currentActivityIndex].duration);
            currentActivityIndex++;
        } else {
            activityText.textContent = "CONGRATULATIONS YOU COMPLETED ALL THE ACTIVITIES";
            timerText.textContent = "";
            startButton.style.display = "none"; // Hide the button when all activities are done

            // Show the email input pop-up
            const emailPopup = document.getElementById("email-popup");
            emailPopup.style.display = "block";
        }
    }

    startButton.addEventListener("click", () => {
        startActivity();
    });

    // Handle email subscription when the subscribe button is clicked
    const subscribeButton = document.getElementById("subscribe-button");
    subscribeButton.addEventListener("click", () => {
        const emailInput = document.getElementById("email-input").value;
        // Perform subscription logic (e.g., send email to your server)

        // Close the email popup after subscription
        const emailPopup = document.getElementById("email-popup");
        emailPopup.style.display = "none";

    });

    // Handle background music (if you have a play/pause button and volume control)
    const backgroundMusic = document.getElementById("background-music");
    const playButton = document.getElementById("play-button");
    const pauseButton = document.getElementById("pause-button");
    const volumeControl = document.getElementById("volume-control");

    // Initialize UI state based on localStorage value
    const isMusicPlaying = localStorage.getItem("musicPlaying") === "true";

    if (isMusicPlaying) {
        playButton.style.display = "none"; // Hide play button if music is already playing
    } else {
        pauseButton.style.display = "none"; // Hide pause button if music is paused
    }

    playButton.addEventListener("click", () => {
        backgroundMusic.play();
        localStorage.setItem("musicPlaying", "true");
        playButton.style.display = "none";
        pauseButton.style.display = "block";
    });

    pauseButton.addEventListener("click", () => {
        backgroundMusic.pause();
        localStorage.setItem("musicPlaying", "false");
        pauseButton.style.display = "none";
        playButton.style.display = "block";
    });

    volumeControl.addEventListener("input", () => {
        backgroundMusic.volume = volumeControl.value;
    });
});
