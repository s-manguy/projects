const messageInput = document.getElementById('message-input');
const result = document.getElementById('result');
const checkMessageButton = document.getElementById('check-message-btn');

checkMessageButton.addEventListener('click', () => {
    if (messageInput.nodeValue === "") {
        alert("Please enter a message.");
        return;
    }

    result.textContent = isSpam(messageInput.value) ? "Oh no! This looks like a spam message." : "This message does not seem to contain any spam.";
    
    messageInput.value = "";
});

const helpRegex = /please help|assist me/i;// the | must touch the end of the text on the left and the begging of the text on the right.

const dollarRegex = /[0-9]+ (?:hundred|thousand|million|billion)? dollars/i;

const freeRegex = /(?:\s|^)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i;

const stockRegex = /(?:\s|^)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i; // no need to use \before {([

const dearRegex = /(?:\s|^)d[e3][a@4]r fr[i1|][e3]nd(?:$|\s)/i;

const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];

// const isSpam = (msg) => msg.match(helpRegex);
// const isSpam = (msg) => helpRegex.test(msg);
const isSpam = (msg) => denyList.some((regex) => regex.test(msg));