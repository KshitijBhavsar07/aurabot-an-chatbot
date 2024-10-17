const sendButton = document.getElementById('send-button');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const clearButton = document.getElementById('clear-button'); 
const emoji = document.getElementById('emoji');

let activeEmojis = []; 


const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!🤪",
    "I told my wife she was drawing her eyebrows too high. She looked surprisedsurprised🤩.",
    "🤥Why don’t skeletons fight each other? They don’t have the guts.",
    "What do you call fake spaghetti?🤫 An impasta!",
    "Why did the scarecrow win an award?🫣 Because he was outstanding in his field!"
];


const relaxationTips = [
    "Take a deep breath in... and out. Try this 3 times to feel relaxed.",
    "Why not take a quick stretch? It will refresh your mind!",
    "How about listening to some calming music?",
    "Close your eyes for a minute and visualize a calm place like a beach or forest."
];


const activities = [
    "Would you like to play a quick trivia quiz?",
    "How about a fun fact? Did you know the Eiffel Tower can be 15 cm taller during the summer?",
    "Let me know if you want to hear a joke!"
];


sendButton.addEventListener('click', sendMessage);
clearButton.addEventListener('click', clearChat); 

function sendMessage() {
    const userMessage = userInput.value.trim().toLowerCase();
    if (userMessage) {
        appendMessage(userMessage, 'user-message');
        userInput.value = ''; 

        
        createRandomEmoji();

        // Simulate bot response after a short delay
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            appendMessage(botResponse, 'bot-message');
        }, 500);
    }
}

// Function to append a message to the chat box
function appendMessage(message, className) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
}

// Function to create a random emoji that moves from top to bottom
function createRandomEmoji() {
    const emojis = ['😊', '😂', '😎', '🥳', '🤔', '🙃', '😍', '🎉','👽','🙄','🤬','🤪'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    const emojiDiv = document.createElement('div');
    emojiDiv.innerHTML = randomEmoji;
    emojiDiv.className = 'random-emoji';
    document.body.appendChild(emojiDiv);

    // Position the emoji randomly at the top
    const chatContainer = document.querySelector('.chat-container');
    const x = Math.random() * (chatContainer.offsetWidth - 50);
    emojiDiv.style.left = `${x}px`;
    emojiDiv.style.top = `-50px`; // Start just above the container

    // Animate the emoji moving down
    emojiDiv.animate([
        { transform: 'translateY(0)' }, // Start position
        { transform: `translateY(${chatContainer.offsetHeight + 50}px)` } // End position
    ], {
        duration: 1500, // Animation duration
        easing: 'ease-in-out',
        fill: 'forwards' // Retain the last frame
    });

    activeEmojis.push(emojiDiv); // Add to active emojis array

    // Remove the emoji after animation
    setTimeout(() => {
        document.body.removeChild(emojiDiv);
        activeEmojis = activeEmojis.filter(emoji => emoji !== emojiDiv); // Clean up the array
    }, 2000);
}

// Get bot response based on user input
function getBotResponse(userMessage) {
    if (userMessage.includes("joke") || userMessage.includes("tell me a joke")) {
        return tellJoke();
    } else if (userMessage.includes("relax") || userMessage.includes("stress")) {
        return getRelaxationTip();
    } else if (userMessage.includes("activity") || userMessage.includes("fun")) {
        return suggestActivity();
    } else {
        return  "Heyboy🧐I'm here to help you relax! You can ask me for a joke, a fun activity, or a relaxation tip.";
    }
}

// Return a random joke
function tellJoke() {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    return randomJoke;
}

// Return a random relaxation tip
function getRelaxationTip() {
    const randomTip = relaxationTips[Math.floor(Math.random() * relaxationTips.length)];
    return randomTip;
}

// Suggest a fun activity
function suggestActivity() {
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    return randomActivity;
}

// Function to clear chat and emojis
function clearChat() {
    // Clear chat messages
    chatBox.innerHTML = '';
    // Remove all active emojis
    activeEmojis.forEach(emoji => document.body.removeChild(emoji));
    activeEmojis = []; // Reset the active emojis array
}
