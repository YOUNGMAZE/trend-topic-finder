async function getGoogleSuggestions(query){
    const url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}`
    const r = await fetch(url)
    const data = await r.json()
    return data[1]
}

async function getYouTubeSuggestions(query){
    const url = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(query)}`
    const r = await fetch(url)
    const data = await r.json()
    return data[1]
}

function scoreKeyword(word){

    let yt = 3 + Math.floor(Math.random()*5)
    let tt = 3 + Math.floor(Math.random()*5)
    let relevance = 5 + Math.floor(Math.random()*5)

    const text = word.toLowerCase()

    if(text.includes("how") || text.includes("tutorial")){
        yt += 3
    }

    if(text.includes("review")){
        yt += 2
    }

    if(text.includes("trend") || text.includes("viral")){
        tt += 3
    }

    if(text.includes("challenge")){
        tt += 3
    }

    if(text.includes("short")){
        tt += 2
    }

    yt = Math.min(10, yt)
    tt = Math.min(10, tt)

    return {relevance, yt, tt}
}

function addRow(keyword, scores){

    const table = document.querySelector("#results tbody")

    const row = document.createElement("tr")

    row.innerHTML = `
        <td>${keyword}</td>
        <td>${scores.relevance} / 10</td>
        <td>${scores.yt} / 10</td>
        <td>${scores.tt} / 10</td>
    `

    table.appendChild(row)
}

async function search(){

    const query = document.getElementById("query").value

    const table = document.querySelector("#results tbody")
    table.innerHTML = ""

    const google = await getGoogleSuggestions(query)
    const youtube = await getYouTubeSuggestions(query)

    const allKeywords = [...new Set([...google, ...youtube])]

    allKeywords.forEach(k => {
        const scores = scoreKeyword(k)
        addRow(k, scores)
    })
}