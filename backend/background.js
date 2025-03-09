const API_KEY = "YOUR_API_KEY";
const SEARCH_ENGINE_ID = "YOUR_CUSTOM_SEARCH_ENGINE_ID";


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "processText") {
        const text = message.text;
        const topWords = getTopFrequentWords(text);
        console.log('Top 5 frequent words:', topWords);
        searchGoogle(topWords);
    }
});

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

        // Store results in storage
        console.log('Search results:', results); // Check if the results are being fetched correctly
        await chrome.storage.session.set({ searchResults: results });

    } catch (error) {
        console.error("Search failed:", error);
        await chrome.storage.session.set({ searchResults: [] });
    }
}

