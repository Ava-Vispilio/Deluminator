function extractMainText() {
    let text = "";
    document.querySelectorAll("p").forEach(p => text += p.innerText + " ");
    
    console.log("Extracted Text:", text);

    // Send extracted text to the background script
    chrome.runtime.sendMessage({ action: "analyzeText", text: text });
}

extractMainText();
