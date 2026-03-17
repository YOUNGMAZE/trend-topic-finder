async function fetchSuggestions(url) {
    try {
        const proxy = "https://api.allorigins.win/raw?url=";
        const response = await fetch(proxy + encodeURIComponent(url));
        const data = await response.json();
        return data[1];
    } catch (e) {
        console.error("Error:", e);
        return [];
    }
}

async function search(){

    const query = document.getElementById("query").value;

    if(!query) return;

    const table = document.querySelector("#results tbody");
    table.innerHTML = "<tr><td colspan='4'>Loading...</td></tr>";

    const googleURL = `https://suggestqueries.google.com/complete/search?client=firefox&q=${query}`;
    const youtubeURL = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${query}`;

    const google = await fetchSuggestions(googleURL);
    const youtube = await fetchSuggestions(youtubeURL);

    const allKeywords = [...new Set([...google, ...youtube])];

    table.innerHTML = "";

    allKeywords.forEach(k => {

        let yt = Math.floor(Math.random()*10)+1;
        let tt = Math.floor(Math.random()*10)+1;
        let relevance = Math.floor(Math.random()*10)+1;

        const row = `
            <tr>
                <td>${k}</td>
                <td>${relevance}/10</td>
                <td>${yt}/10</td>
                <td>${tt}/10</td>
            </tr>
        `;

        table.innerHTML += row;
    });
}
