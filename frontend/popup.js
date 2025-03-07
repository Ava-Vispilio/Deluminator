chrome.storage.local.get("extractedText", (data) => {
    if (chrome.runtime.lastError) {
        console.error("Error retrieving text:", chrome.runtime.lastError);
    } else {
        document.getElementById("result").innerText = data.extractedText || "No text extracted.";
    }
});
