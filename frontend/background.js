chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "analyzeText") {
        chrome.storage.local.set({ extractedText: message.text }, function() {
            if (chrome.runtime.lastError) {
                console.error("Storage Error:", chrome.runtime.lastError);
            } else {
                console.log("Text stored successfully.");
            }
        });
    }
});
