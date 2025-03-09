document.addEventListener("DOMContentLoaded", async function () {
    const resultsList = document.getElementById("results");

    // Request results from background script
    chrome.runtime.sendMessage({ action: "getSearchResults" }, (response) => {
        console.log('Received response:', response);  // Log the response to check results
        if (response && response.results) {
            resultsList.innerHTML = response.results.map(
                (r) => `<li><a href="${r.link}" target="_blank">${r.title}</a></li>`
            ).join("");
        } else {
            resultsList.innerHTML = "<li>No results found.</li>";
        }
    });
});
