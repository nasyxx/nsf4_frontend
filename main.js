function get_user(){
    return document.cookie.match(new RegExp("(^| )who=([^;]+)"))[2]
}

function init_cookie(){
    axios.get("http://localhost:8080", {withCredentials: true})
        .then(res => {
            console.log("user: " + get_user())
        })
}
let stop_value
function check_stop_word(){

    if (document.getElementById("s_open").checked === true){
        return stop_value = false
    }else if (document.getElementById("s_close").checked === true){
        return stop_value = true
    }
    search()
}


function search() {
    const res_pos = document.querySelector("#result")
    axios.get("http://localhost:8080/q", {
        withCredentials: true,
        params: {
            key:    document.querySelector("#q").value,
            filter: document.querySelector("#filter").value,
            nsw:  stop_value
        }})
        .then(res => {
            res_data = res.data
            console.log(res_data)
            res_pos.innerText = ""

            const summary = document.createElement("header")
            var total = 0
            if (typeof(res_data.total) == "number"){
                total = res_data.total
            } else {
                total = "Greater than " + res_data.total.value
            }
            summary.innerHTML = "Total: " + total + "<br />Filtered: " + res_data.results.length

            res_pos.appendChild(summary)


            const container = document.createElement("div")

            res_data.results.map((hit, iv) => {
                const result = document.createElement("div")

                // Header
                const h    = document.createElement("header")
                const h_h2 = document.createElement("h2")
                const h_h2_a = document.createElement("a")
                h_h2_a.innerText = hit._source.title
                h_h2_a.href = "http://localhost:8764/" + hit._source.path
                h_h2.appendChild(h_h2_a)
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
            new Hilitor("container").apply(res_data.query)
        })
}

window.onload = () => {
    init_cookie()
    load_visualize()

}

const Open_newPage = () =>{
    if (document.getElementById("select_map").value === "water_map"){
        window.open('water-map.html')
    }else if (document.getElementById("select_map").value === "bio_map"){
        window.open("bio-map.html")
    }
}
