document.addEventListener("DOMContentLoaded", async function () {
    const resultsList = document.getElementById("results");
    const percentageElement = document.getElementById("percentage");

    // Ask content script to extract text from the webpage
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => document.body.innerText, // Extracts all page text
        }, async (results) => {
            if (!results || !results[0] || !results[0].result) {
                percentageElement.textContent = "Failed to extract text.";
                return;
            }

            const extractedText = results[0].result;
            console.log("Extracted text:", extractedText);

            try {
                // Send extracted text to FastAPI for prediction
                const response = await fetch("http://localhost:8000/predict/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams({ text: extractedText }),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                console.log("Received prediction:", data);

                // Display prediction in popup
                const fakeNewsProbability = (data.probability * 100).toFixed(2);
                percentageElement.textContent = `${fakeNewsProbability}% `;

                // Append the prediction result
                resultsList.innerHTML = `<li>${data.prediction === "Class 1" ? "This text is likely fake news." : "This text is likely not fake news."}</li>`;

                // Request search results from background script
                chrome.runtime.sendMessage({ action: "getSearchResults" }, (response) => {
                    console.log('Received search results:', response);  // Log the response to check results
                    if (response && response.results) {
                        // Append search results
                        resultsList.innerHTML += response.results.map(
                            (r) => `<li><a href="${r.link}" target="_blank">${r.title}</a></li>`
                        ).join("");
                    } else {
                        resultsList.innerHTML += "<li>No search results found.</li>";
                    }
                });

            } catch (error) {
                console.error("Failed to get prediction:", error);
                percentageElement.textContent = "Failed to fetch prediction.";
            }
        });
    });
});

console.log("Popup script loaded!");
