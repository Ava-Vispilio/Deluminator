// Extracts text from the page and sends it to the background script
function extractText() {
    const text = document.body.innerText;
    console.log('Extracted text:', text);  // Log the text to see if it's correctly extracted
    chrome.runtime.sendMessage({ action: "processText", text });
}

extractText();
