const API_KEY = "YOUR_API_KEY";
const SEARCH_ENGINE_ID = "YOUR_CUSTOM_SEARCH_ENGINE_ID";


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "processText") {
        const text = message.text;
        const topWords = getTopFrequentWords(text);
        console.log('Top 5 frequent words:', topWords);

        // Send text to FastAPI for prediction first
        fetch("http://127.0.0.1:8000/predict/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({ text: text }) // FastAPI expects Form data
        })
        .then(response => response.json())
        .then(data => {
            console.log("Prediction result:", data);
            
            // Here you can decide how to use the prediction result
            // For example, logging or displaying it in the popup
            const prediction = data.prediction;  // Assuming "prediction" is the prediction result

            // If you want to show the prediction in the popup (or somewhere else), do it here
            
            // Continue with Google search after prediction
            searchGoogle(topWords);
        })
        .catch(error => {
            console.error("Error during prediction:", error);
            searchGoogle(topWords); // Proceed with search even if prediction fails
        });
    }
});

// This listens for the message to retrieve search results
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message received in background:', message);  // Log the incoming message
    if (message.action === "getSearchResults") {
        chrome.storage.session.get("searchResults", (data) => {
            console.log('Fetched search results:', data); // Log the stored search results
            sendResponse({ results: data.searchResults || [] });
        });
        return true; // Keep the message channel open
    }
});

let searchResults = []; // Store search results globally

// Find top 5 frequent words
function getTopFrequentWords(text) {
    let words = text.toLowerCase().match(/\b[a-zA-Z]{4,}\b/g) || [];
    let frequency = {};
    
    words.forEach(word => frequency[word] = (frequency[word] || 0) + 1);

    return Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(entry => entry[0]);
}

// Perform Google Search
async function searchGoogle(terms) {
    if (!terms.length) return;

    const query = terms.join(" ");
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${API_KEY}&cx=${SEARCH_ENGINE_ID}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = (data.items || []).slice(0, 3).map(item => ({
            title: item.title,
            link: item.link
        }));

        // Store results in session storage
        console.log('Search results:', results); // Check if the results are being fetched correctly
        await chrome.storage.session.set({ searchResults: results });

    } catch (error) {
        console.error("Search failed:", error);
        await chrome.storage.session.set({ searchResults: [] });
    }
}
