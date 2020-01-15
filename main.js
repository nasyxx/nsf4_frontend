function search() {
    const res_pos = document.querySelector("#result")
    const key = document.querySelector("#q").value
    data = ans[key]
    console.log(data)
    res_pos.innerText = ""

    const summary = document.createElement("header")
    var total = 0
    if (typeof(data.total) == "number"){
        total = data.total
    } else {
        total = "Greater than " + data.total.value
    }
    summary.innerHTML = "Total: " + total + "<br />Filtered: " + data.results.length

    res_pos.appendChild(summary)


    const container = document.createElement("div")

    data.results.map((hit, iv) => {
        const result = document.createElement("div")

        // Header
        const h    = document.createElement("header")
        const h_h2 = document.createElement("h2")
        h_h2.innerText = hit._source.title
        h.appendChild(h_h2)
        result.appendChild(h)

        // Artile box
        const article = document.createElement("article")
        const para    = document.createElement("p")
        para.innerText = hit._source.content
        article.appendChild(para)

        result.appendChild(article)
        container.appendChild(result)
    })
    res_pos.appendChild(container)
    new Hilitor("container").apply(document.querySelector("#q").value)
}

window.onload = () => {
    load_visualize()
}
