// Sample user data
const users = {
    Natasch: { username: "Natasch", password: "Ilovehim", submissions: [] },
    Bubu: { username: "Bubu", password: "Iloveher", submissions: [] }
};

let currentUser = null;

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (users[username] && users[username].password === password) {
        currentUser = users[username];
        localStorage.setItem('currentUser', username); // Store current user in localStorage
        document.getElementById('auth').style.display = 'none';
        document.getElementById('profile').style.display = 'block';
        document.getElementById('LogedUser').value = currentUser.username || username;
        displaySubmissions();
    } else {
        alert('Invalid username or password');
    }
});

let isListening = false; // To track whether it's listening or not

// Check if the browser supports the Web Speech API
if (!('webkitSpeechRecognition' in window)) {
    alert("Your browser does not support speech recognition. Please use Google Chrome.");
} else {
    // Create a new speech recognition object
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true; // Keep listening until stopped
    recognition.interimResults = false; // Only return final results
    recognition.lang = 'en-US'; // Set the language

    // Start or stop speech recognition
    function toggleRecognition() {
        const startButton = document.getElementById("startButton"); // Get the button element
        if (isListening) {
            recognition.stop(); // Stop recognition
            startButton.innerText = "Press to Speak"; // Update button text
            console.log("Speech recognition stopped.");
        } else {
            recognition.start(); // Start recognition
            startButton.innerText = "Press to Stop"; // Update button text
            console.log("Speech recognition started...");
        }
        isListening = !isListening; // Toggle the listening state
    }

    // When speech is recognized
    recognition.onresult = function(event) {
        const transcript = event.results[event.resultIndex][0].transcript; // Get the recognized speech
        console.log("Recognized Speech: ", transcript); // Log recognized speech
        const textArea = document.getElementById("question5"); // Target textarea
        textArea.value += transcript + " "; // Append recognized speech in the textarea
    };

    // If speech recognition ends (either because the user stopped speaking or it stopped naturally)
    recognition.onend = function() {
        console.log("Speech recognition ended.");
        if (isListening) {
            console.log("Restarting speech recognition...");
            recognition.start(); // Automatically restart listening if still in listening mode
        }
    };

    // If an error occurs
    recognition.onerror = function(event) {
        console.error("Speech recognition error: ", event.error);
        
        // Handle specific error types
        if (event.error === "not-allowed") {
            alert("Microphone access denied. Please allow microphone access.");
        } else if (event.error === "no-speech") {
            console.log("No speech detected. Restarting recognition...");
            if (isListening) {
                recognition.start(); // Restart recognition if still listening
            }
        } else {
            console.log("An error occurred: ", event.error);
        }
        
        // Reset listening state if required
        if (event.error !== "no-speech") {
            isListening = false; // Stop listening on other errors
            document.getElementById("startButton").innerText = "Press to Speak"; // Reset button text
        }
    };
}
