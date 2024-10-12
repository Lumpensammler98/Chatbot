// Erlaubte Gegenstände
const allowedItems = [
    // Kleidung
    'hosen', 'hemden', 'blusen', 'tops', 'pullover', 't-shirts', 't shirts', 'tshirts',
    'sport- und freizeitkleidung', 'unterwäsche', 'handtaschen', 'gürtel', 'handschuhe',
    'schals', 'mützen', 'hüte', 'pelze', 'jacken', 'mäntel',
    // Schuhe (paarweise gebündelt)
    'sportschuhe', 'freizeitschuhe', 'elegante schuhe',
    // Haushaltstextilien
    'federbettdecken', 'federkissen', 'handtücher', 'tischdecken', 'vorhänge'
];

// Nicht erlaubte Gegenstände
const disallowedItems = [
    // Bisherige nicht erlaubte Gegenstände
    'elektrogeräte', 'müll', 'gefährliche stoffe', 'batterien', 'chemikalien',
    'glas', 'kunststoff', 'papier', 'restmüll', 'möbel', 'teppiche',

    // Neue Gegenstände aus Ihrer Liste
    'hygieneartikel', 'medizinischer abfall', 'masken', 'medizinisches werkzeug',
    'stoffwindeln', 'einlagen', 'nasse kleidung', 'verschmutzte kleidung', 'befleckte kleidung',
    'beschädigte kleidung', 'kuscheltiere', 'stofftiere', 'beschädigte wäsche',
    'stark abgetragene schuhe', 'beschädigte schuhe', 'nicht mehr tragbare schuhe',
    'socken', 'gummistiefel', 'skischuhe', 'hartes spielzeug', 'bauklötze', 'bausteine',
    'brettspiele', 'plastik-spielzeug', 'inlineskates', 'garne', 'spulen',
    'einzelne schuhe', 'schaumstoffkissen', 'schaumstoffdecken', 'matratzen',
    'schnittreste', 'hausmüll', 'cds', 'geschirr', 'metallprodukte', 'porzellan'
];

function checkItem(input) {
    // Vorverarbeitung der Eingabe
    input = input.replace(/[^\w\säöüß-]|_/g, "").replace(/\s+/g, " ").trim().toLowerCase();

    // Überprüfung der erlaubten Gegenstände
    for (let item of allowedItems) {
        if (input.includes(item)) {
            return {
                found: true,
                allowed: true,
                item: item
            };
        }
    }

    // Überprüfung der nicht erlaubten Gegenstände
    for (let item of disallowedItems) {
        if (input.includes(item)) {
            return {
                found: true,
                allowed: false,
                item: item
            };
        }
    }

    // Kein passender Gegenstand gefunden
    return {
        found: false
    };
}

function getBotResponse(input) {
    // Vorverarbeitung der Eingabe
    input = input.toLowerCase();

    const itemCheck = checkItem(input);

    if (itemCheck.found) {
        if (itemCheck.allowed) {
            return `Ja, ${itemCheck.item} dürfen Sie gerne in den Altkleidercontainer werfen. Vielen Dank für Ihren Beitrag!`;
        } else {
            return `Leider dürfen ${itemCheck.item} nicht in das Helppack-Paket. Bitte stellen Sie sicher, dass sich diese Gegenstände nicht in Ihrem Paket befinden. Wir möchten gute Kleidung und Accessoires weitergeben und hohe Entsorgungs- und Transportkosten vermeiden. Vielen Dank für Ihr Verständnis.`;
        }
    }

    // Weitere Schlüsselwort-Überprüfungen
    if (input.includes('was passiert mit der kleidung') || input.includes('was passiert mit meiner kleidung')) {
        return "Ihre gespendete Kleidung wird sortiert und an Menschen in Not weitergegeben. Sie wird nicht geschreddert, sondern bekommt ein zweites Leben!";
    } else if (input.includes('versehentlich') || input.includes('falsches objekt') || input.includes('etwas falsch eingeworfen') || input.includes('zurückholen') || input.includes('verloren')) {
        return "Wenn Sie versehentlich etwas eingeworfen haben, das nicht in den Container gehört, kontaktieren Sie bitte unseren Kundenservice unter 01234 567890.";
    } else if (input.includes('danke') || input.includes('vielen dank') || input.includes('dankeschön') || input.includes('super') || input.includes('gut')) {
        return "Gern geschehen! Wenn Sie weitere Fragen haben, stehe ich Ihnen zur Verfügung.";
    } else if (input.includes('was darf in den container') || input.includes('erlaubte gegenstände') || input.includes('was kann ich spenden') || input.includes('was darf ich einwerfen')) {
        return "Sie können saubere, gut erhaltene Kleidung, Schuhe (paarweise gebündelt) und Haushaltstextilien wie Handtücher und Bettwäsche spenden.";
    } else if (input.includes('was darf nicht in den container') || input.includes('nicht erlaubte gegenstände') || input.includes('was kann ich nicht spenden') || input.includes('verbotene artikel')) {
        return "Bitte werfen Sie keine Elektrogeräte, beschädigte oder verschmutzte Kleidung, Hygieneartikel oder Hausmüll in den Container. Diese Gegenstände können wir leider nicht annehmen.";
    } else {
        return "Entschuldigung, ich habe Ihre Frage nicht verstanden. Können Sie sie bitte anders formulieren oder spezifischer sein?";
    }
}

// Event Listener für den Send-Button
const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

sendBtn.addEventListener('click', () => {
    let userText = userInput.value.trim();
    if (userText !== "") {
        displayUserMessage(userText);
        setTimeout(() => {
            generateBotResponse(userText);
        }, 500); // Kleine Verzögerung für realistischeres Chat-Verhalten
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

function displayBotMessage(message) {
    let messageElement = document.createElement('div');
    messageElement.className = 'bot-message';
    messageElement.innerHTML = `<p>${message}</p>`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function generateBotResponse(userText) {
    let botResponse = getBotResponse(userText);
    displayBotMessage(botResponse);
}

// Begrüßungsnachricht anzeigen, wenn die Seite geladen wird
document.addEventListener('DOMContentLoaded', () => {
    let welcomeMessage = "Hallo! Womit kann ich Ihnen weiterhelfen? Gerne helfe ich Ihnen bei Fragen, was in den Altkleidercontainer darf und was nicht. Oder haben Sie vielleicht etwas versehentlich in den Altkleidercontainer geworfen? Gerne gebe ich Ihnen auch Auskunft darüber, was mit Ihrer guten Kleidung passiert.";
    displayBotMessage(welcomeMessage);
});