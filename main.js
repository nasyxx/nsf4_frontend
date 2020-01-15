function get_user(){
    return document.cookie.match(new RegExp("(^| )who=([^;]+)"))[2]
}

function init_cookie(){
    axios.get("http://localhost:8080", {withCredentials: true})
        .then(res => {
            console.log("user: " + get_user())
        })
}


function search() {
    const res_pos = document.querySelector("#result")
    axios.get("http://localhost:8080/q", {
        withCredentials: true,
        params: {
            key:    document.querySelector("#q").value,
            filter: document.querySelector("#filter").value
        }})
        .then(res => {
            data = res.data
            console.log(data)
            res_pos.innerText = ""

            const summary = document.createElement("header")
            var total = 0
            if (typeof(data.total) == "number"){
                total = data.total
            } else {
                total = data.total.value
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

                // rate box
                const section = document.createElement("section")
                const lable = document.createElement("label")
                lable.innerText = "relevance:"
                lable.classList.add("rate")
                section.appendChild(lable)

                const select = document.createElement("select")
                select.id = "rate-" + iv
                select.classList.add("rate")
                select.classList.add("rate-c")
                Array(5).fill().map((_, value) => {
                    const o = document.createElement("option")
                    o.value = value
                    o.innerText = value
                    select.appendChild(o)
                })
                select.value = hit.rate || 0
                section.appendChild(select)

                const rate_b = document.createElement("button")
                rate_b.id = "submit-rate-" + iv
                rate_b.classList.add("rate")
                rate_b.classList.add("rate-c")
                rate_b.innerText = "Submit"
                rate_b.addEventListener("click", () => {
                    axios.post("http://localhost:8080/rate", {
                        query: document.querySelector("#q").value,
                        ans: hit, rate: parseInt(select.value)
                    }, {withCredentials: true})
                        .then(res => {
                            if (res.status == 1) {
                                throw "Error"
                            }})
                        .catch(e => console.log(e.response))
                })
                section.appendChild(rate_b)

                article.appendChild(section)
                result.appendChild(article)
                container.appendChild(result)
            })
            res_pos.appendChild(container)
            new Hilitor("container").apply(document.querySelector("#q").value)
        })
}

window.onload = () => {
    init_cookie()
    load_visualize()
}
