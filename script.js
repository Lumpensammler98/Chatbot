const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

sendBtn.addEventListener('click', () => {
    let userText = userInput.value.trim();
    if (userText !== "") {
        displayUserMessage(userText);
        generateBotResponse(userText);
        userInput.value = "";
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

function displayUserMessage(message) {
    let messageElement = document.createElement('div');
    messageElement.className = 'user-message';
    messageElement.innerHTML = `<p>${message}</p>`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function generateBotResponse(userText) {
    let botResponse = getBotResponse(userText);
    let messageElement = document.createElement('div');
    messageElement.className = 'bot-message';
    messageElement.innerHTML = `<p>${botResponse}</p>`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function getBotResponse(input) {
    input = input.toLowerCase();

    if (input.includes('was passiert mit der kleidung') || input.includes('was passiert mit meiner kleidung')) {
        return "Ihre gespendete Kleidung wird sortiert und an Menschen in Not weitergegeben. Sie wird nicht geschreddert, sondern bekommt ein zweites Leben!";
    } else if (input.includes('versehentlich') || input.includes('falsches objekt') || input.includes('etwas falsch eingeworfen')) {
        return "Wenn Sie versehentlich etwas eingeworfen haben, das nicht in den Container gehört, kontaktieren Sie bitte unseren Kundenservice unter 01234 567890.";
    } else if (input.includes('danke') || input.includes('vielen dank')) {
        return "Gern geschehen! Wenn Sie weitere Fragen haben, stehe ich Ihnen zur Verfügung.";
    } else {
        return "Entschuldigung, ich habe Ihre Frage nicht verstanden. Können Sie sie bitte anders formulieren?";
    }
}