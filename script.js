// Erlaubte Gegenstände
const allowedItems = [
    // Kleidung
    'hose', 'hemd', 'bluse', 'top', 'pullover',
    't-shirt', 't shirt', 'tshirt', 'shirt',
    'sport- und freizeitkleidung', 'unterwäsche', 'handtasche', 'gürtel', 'handschuh',
    'schal', 'mütze', 'hut', 'pelz', 'jacke', 'mantel','wolldecke','dessous','bettwäsche','Anzug','socken',
    'Pantoffel','kuscheltier', 'stofftier',
    // Schuhe (paarweise gebündelt)
    'sportschuh', 'freizeitschuh', 'elegante schuh', 'schuhe',
    // Haushaltstextilien
    'federbettdecke', 'federkissen', 'handtuch', 'tischdecke', 'vorhang'
];

// Nicht erlaubte Gegenstände
const disallowedItems = [
    // Bisherige nicht erlaubte Gegenstände
    'elektrogerät', 'müll', 'gefährliche stoff', 'batterie', 'chemikalien',
    'glas', 'kunststoff', 'papier', 'restmüll', 'möbelstück', 'teppich','Besteck','Kleiderbügel',
    'Arbeitskleidung','Bilder','Kabel','Bücher','Spiel''Essen','Süsses','plastik',
    // Neue Gegenstände
    'hygieneartikel', 'medizinischer abfall', 'maske', 'medizinisches werkzeug',
    'stoffwindel', 'einlage', 'nasse kleidung', 'verschmutzte kleidung', 'befleckte kleidung',
    'beschädigte kleidung',  'beschädigte wäsche',
    'stark abgetragene schuh', 'beschädigte schuh', 'nicht mehr tragbare schuh',
    'socke', 'gummistiefel', 'skischuh', 'hartes spielzeug', 'bauklotz', 'baustein',
    'brettspiel', 'plastik-spielzeug', 'spielzeug', 'spielware', 'inlineskate', 'garn', 'spule',
    'einzelner schuh', 'schaumstoffkissen', 'schaumstoffdecke', 'matratze',
    'schnittrest', 'hausmüll', 'cd', 'geschirr', 'metallprodukt', 'porzellan' 'kaputter schuh'
];

function preprocessInput(input) {
    // Entfernt Satzzeichen und wandelt in Kleinbuchstaben um
    input = input.replace(/[^\w\säöüß-]|_/g, "").replace(/\s+/g, " ").toLowerCase();
    
    // Zerlegt die Eingabe in Wörter
    let words = input.split(' ');

    // Entfernt einfache Pluralendungen
    words = words.map(word => {
        return word.replace(/(e|en|er|n|s)$/i, '');
    });

    // Fügt die Wörter wieder zusammen
    return words.join(' ');
}

function checkItem(input) {
    // Vorverarbeitung der Eingabe
    input = preprocessInput(input);

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
    input = preprocessInput(input);

    // Überprüfung auf spezifische Gegenstände
    const itemCheck = checkItem(input);

    if (itemCheck.found) {
        if (itemCheck.allowed) {
            return `Ja, ${itemCheck.item} dürfen Sie gerne in den Altkleidercontainer werfen. Vielen Dank für Ihre Spende!`;
        } else {
            return `Leider dürfen ${itemCheck.item} nicht in den Altkleidercontainer. Bitte stellen Sie sicher, dass sich diese Gegenstände nicht in Ihrem Kleidersack befinden. Wir möchten gute Kleidung und Accessoires weitergeben um einen Beitrag in der Welt zu leisten. Vielen Dank für Ihr Verständnis.`;
        }
    }

    // Beantwortung der Frage nach erlaubten Gegenständen
    if (input.includes('was darf in den altkleidercontainer rein') || input.includes('was darf in den altkleidercontainer') || input.includes('was kann ich spenden') || input.includes('was darf ich einwerfen')) {
        return "Sie können saubere, gut erhaltene Kleidung wie Hosen, Hemden, Blusen, Shirts, Pullover, Jacken, Mäntel, sowie Schuhe (paarweise gebündelt) und Haushaltstextilien wie Handtücher, Bettwäsche und Vorhänge spenden.";
    }

    // Beantwortung der Frage nach nicht erlaubten Gegenständen
    if (input.includes('was darf nicht in den altkleidercontainer') || input.includes('was darf nicht in den altkleidercontainer rein') || input.includes('nicht erlaubte gegenstände') || input.includes('was kann ich nicht spenden') || input.includes('verbotene artikel')) {
        return "Bitte werfen Sie keine Elektrogeräte, beschädigte oder verschmutzte Kleidung, Spielzeug, Hygieneartikel oder Hausmüll in den Container. Diese Gegenstände können wir leider nicht annehmen.";
    }

    // Weitere Schlüsselwort-Überprüfungen
    if (input.includes('was passiert mit der kleidung') || input.includes('was passiert mit meiner kleidung')) {
        return "Ihre gespendete Kleidung wird sortiert und an Menschen in Not weitergegeben. Sie wird nicht geschreddert, sondern bekommt ein zweites Leben!";
    } else if (input.includes('versehentlich') || input.includes('falsch objekt') || input.includes('etwas falsch eingeworfen') || input.includes('zurückholen') || input.includes('verloren')) {
        return "Wenn Sie versehentlich etwas eingeworfen haben, das nicht in den Container gehört, kontaktieren Sie bitte unseren Kundenservice unter 01234 567890.";
    } else if (input.includes('danke') || input.includes('vielen dank') || input.includes('dankeschön') || input.includes('super') || input.includes('gut')) {
        return "Gern geschehen! Wenn Sie weitere Fragen haben, stehe ich Ihnen zur Verfügung.";
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