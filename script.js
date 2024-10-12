// Erlaubte Gegenstände
const allowedItems = [
    // Kleidung
    'hose', 'hemd', 'bluse', 'top', 'pullover',
    't-shirt', 't shirt', 'tshirt', 'shirt', 'shirts',
    'sport- und freizeitkleidung', 'unterwäsche', 'handtasche', 'handtaschen', 'gürtel', 'handschuh', 'handschuhe',
    'schal', 'schals', 'mütze', 'mützen', 'hut', 'hüte', 'pelz', 'pelze', 'jacke', 'jacken', 'mantel', 'mäntel',
    // Schuhe (paarweise gebündelt)
    'sportschuh', 'sportschuhe', 'freizeitschuh', 'freizeitschuhe', 'elegante schuh', 'elegante schuhe', 'schuh', 'schuhe',
    // Haushaltstextilien
    'federbettdecke', 'federbettdecken', 'federkissen', 'handtuch', 'handtücher', 'tischdecke', 'tischdecken', 'vorhang', 'vorhänge'
];

// Nicht erlaubte Gegenstände
const disallowedItems = [
    // Bisherige nicht erlaubte Gegenstände
    'elektrogerät', 'elektrogeräte', 'müll', 'gefährliche stoffe', 'batterie', 'batterien', 'chemikalien',
    'glas', 'kunststoff', 'papier', 'restmüll', 'möbelstück', 'möbelstücke', 'teppich', 'teppiche', 'besteck', 'kleiderbügel',
    'arbeitskleidung', 'bilder', 'kabel', 'bücher', 'spiel', 'spiele', 'essen', 'süßes', 'plastik',
    // Neue Gegenstände
    'hygieneartikel', 'medizinischer abfall', 'masken', 'maske', 'medizinisches werkzeug',
    'stoffwindel', 'stoffwindeln', 'einlage', 'einlagen', 'nasse kleidung', 'verschmutzte kleidung', 'befleckte kleidung',
    'beschädigte kleidung', 'beschädigte wäsche',
    'stark abgetragene schuhe', 'beschädigte schuhe', 'nicht mehr tragbare schuhe',
    'socke', 'socken', 'gummistiefel', 'skischuh', 'skischuhe', 'hartes spielzeug', 'bauklotz', 'bauklötze', 'baustein', 'bausteine',
    'brettspiel', 'brettspiele', 'plastik-spielzeug', 'spielzeug', 'spielzeuge', 'spielware', 'inlineskate', 'garn', 'spule',
    'einzelner schuh', 'einzelne schuhe', 'schaumstoffkissen', 'schaumstoffdecken', 'matratze', 'matratzen',
    'schnittrest', 'hausmüll', 'cd', 'cds', 'geschirr', 'metall','Lumpen', 'porzellan', 'kaputter schuh', 'kaputte schuhe'
];

function preprocessInput(input) {
    // Entfernt Satzzeichen und wandelt in Kleinbuchstaben um
    return input.replace(/[^\w\säöüß-]|_/g, "").replace(/\s+/g, " ").toLowerCase();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function checkItem(input) {
    // Vorverarbeitung der Eingabe
    const processedInput = preprocessInput(input);
    const inputWords = processedInput.split(' ');

    // Überprüfung der erlaubten Gegenstände
    for (let word of inputWords) {
        if (allowedItems.includes(word)) {
            return {
                found: true,
                allowed: true,
                item: word
            };
        }
    }

    // Überprüfung der nicht erlaubten Gegenstände
    for (let word of inputWords) {
        if (disallowedItems.includes(word)) {
            return {
                found: true,
                allowed: false,
                item: word
            };
        }
    }

    // Kein passender Gegenstand gefunden
    return {
        found: false
    };
}

function getBotResponse(input) {
    // Keine Vorverarbeitung hier, um die Originalwörter für die Antwort zu behalten
    const processedInput = preprocessInput(input);

    // Überprüfung auf spezifische Gegenstände
    const itemCheck = checkItem(input);

    if (itemCheck.found) {
        const itemName = capitalizeFirstLetter(itemCheck.item);
        if (itemCheck.allowed) {
            // Zusätzliche Information bei Schuhen
            if (itemCheck.item.includes('schuh')) {
                return `Ja, ${itemName} dürfen Sie gerne in den Altkleidercontainer werfen. Bitte beachten Sie, dass Schuhe paarweise gebündelt sein sollten. Vielen Dank für Ihren Beitrag!`;
            } else {
                return `Ja, ${itemName} dürfen Sie gerne in den Altkleidercontainer werfen. Vielen Dank für Ihren Beitrag!`;
            }
        } else {
            return `Leider dürfen ${itemName} nicht in den Altkleidercontainer. Bitte stellen Sie sicher, dass sich diese Gegenstände nicht in Ihrem Kleidersack befinden. Wir möchten gute Kleidung und Accessoires weitergeben, um einen Beitrag in der Welt zu leisten. Vielen Dank für Ihr Verständnis.`;
        }
    }

    // Beantwortung der Frage nach erlaubten Gegenständen
    if (
        processedInput.includes('was darf in den altkleidercontainer rein') ||
        processedInput.includes('was darf in den altkleidercontainer') ||
        processedInput.includes('was darf rein') ||
        processedInput.includes('was kann ich spenden') ||
        processedInput.includes('was darf ich einwerfen')
    ) {
        return "Sie können saubere, gut erhaltene Kleidung wie Hosen, Hemden, Blusen, Shirts, Pullover, Jacken, Mäntel sowie Schuhe (paarweise gebündelt) und Haushaltstextilien wie Handtücher, Bettwäsche und Vorhänge einwerfen.";
    }

    // Beantwortung der Frage nach nicht erlaubten Gegenständen
    if (
        processedInput.includes('was darf nicht in den altkleidercontainer') ||
        processedInput.includes('was darf nicht in den altkleidercontainer rein') ||
        processedInput.includes('was darf nicht rein') ||
        processedInput.includes('nicht erlaubte gegenstände') ||
        processedInput.includes('was kann ich nicht spenden') ||
        processedInput.includes('verbotene artikel')
    ) {
        return "Bitte werfen Sie keine Elektrogeräte, beschädigte oder verschmutzte Kleidung, Spielzeug, Hygieneartikel oder Hausmüll in den Container. Diese Gegenstände können wir leider nicht annehmen.";
    }

    // Weitere Schlüsselwort-Überprüfungen
    if (
        processedInput.includes('was passiert mit der kleidung') ||
        processedInput.includes('wird meine Kleidung wirklich weitergetragen') ||
        processedInput.includes('geschreddert') ||
        processedInput.includes('Schredder') ||
        processedInput.includes('verbrannt') ||
        processedInput.includes('was passiert mit der kleidung') ||
        processedInput.includes('Umwelt')
    ) {
        return "Wir als zertifizierter Entsorgungsfachbetrieb sammeln Ihre Kleidung ein. Ihre gute, abgegebene Kleidung wird dann sorgfältig sortiert und an Menschen in der ganzen Welt weitergegeben. Sie wird nicht geschreddert, sondern bekommt ein zweites Zuhause! Ihrer Kleidung ein zweites Leben zu schenken ist unsere Mission ❤️";
    } else if (
        processedInput.includes('versehentlich') ||
        processedInput.includes('falsch objekt') ||
        processedInput.includes('etwas falsch eingeworfen') ||
        processedInput.includes('zurückholen') ||
        processedInput.includes('verloren') ||
        processedInput.includes('schlüssel verloren') ||
        processedInput.includes('etwas verloren')
    ) {
        return "Wenn Sie versehentlich etwas eingeworfen haben, das nicht in den Container gehört, kontaktieren Sie bitte unseren Kundenservice unter 0171 4504840.";
    } else if (
        processedInput.includes('danke') ||
        processedInput.includes('vielen dank') ||
        processedInput.includes('dankeschön') ||
        processedInput.includes('super') ||
        processedInput.includes('gut')
    ) {
        return "Gern geschehen! Wenn Sie weitere Fragen haben, stehe ich Ihnen zur Verfügung.";
    } else if (
        processedInput.includes('container voll') ||
        processedInput.includes('Altkleidercontainer voll') ||
        processedInput.includes('behälter voll') ||
        processedInput.includes('kleidercontainer voll')
    ) {
        return "Vielen Dank für die Information. Wir werden uns darum kümmern, den Container so schnell wie möglich zu leeren.";
    } else {
        return "Entschuldigung, ich habe Ihre Frage nicht verstanden. Können Sie sie bitte anders formulieren oder spezifischer sein? Falls ich Ihren beschriebenen Gegenstand nicht finden konnte, wenden Sie die folgende Faustregel an: Geben Sie nur solche Sachen in den Altkleidercontainer, die Sie auch gewissenlos Ihrem besten Freund oder Ihrer besten Freundin verschenken würden.";
    }
}

// Event Listener für den Send-Button
document.addEventListener('DOMContentLoaded', () => {
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

    // Begrüßungsnachricht anzeigen
    let welcomeMessage = "Hallo! Womit kann ich Ihnen weiterhelfen? Gerne helfe ich Ihnen bei Fragen, was in den Container rein darf und was nicht. Bei bei welchem Kleidungsstück sind Sie sich unsicher? 
    Oder haben Sie vielleicht etwas versehentlich in den Altkleidercontainer geworfen? 
    Gerne informiere ich Die darüber, was mit Ihrer guten Kleidung passiert. 
    Falls der Container voll ist, können Sie dies auch gerne mitteilen. Unser Team wird sich dann darum kümmern.";
    displayBotMessage(welcomeMessage);
});