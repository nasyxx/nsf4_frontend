function get_user(){
    return document.cookie.match(new RegExp("(^| )who=([^;]+)"))[2]
}

function init_cookie(){
    axios.get("http://localhost:8080", {withCredentials: true})
        .then(res => {
            console.log("user: " + get_user())
        })
}
let stop_value = true
function check_stop_word(){

    if (document.getElementById("s_open").checked === true){
        return stop_value = false
    }else if (document.getElementById("s_close").checked === true){
        return stop_value = true
    }
    search()
}


function search(qualifiedName, value) {
    const res_pos = document.querySelector("#result")
    res_pos.innerHTML = ""

    // Related persons query
    axios.get("http://localhost:8080/pq", {
        withCredentials: true,
        params: {
            key: document.querySelector("#q").value
        }})
        .then(persons => {
            const people = document.querySelector("#cards") || document.createElement("section")
            people.innerHTML = ""
            people.id = "cards"

            res_pos.appendChild(people)

            console.log(persons)

            persons.data.map(person => {
                const card     = document.createElement("section")
                card.classList.add("card")

                const name     = document.createElement("h3")
                const title    = document.createElement("p")
                const homepage = document.createElement("a")

                name.innerText     = person.firstname + " " + person.lastname
                title.innerText    = person.job_title
                homepage.innerText = "homepage"
                homepage.href      = person.homepage
                homepage.target    =  '_blank'

                Array.from([name, title, homepage]).map(item => card.appendChild(item))

                if (person.works_at_name){
                    const works_at     = document.createElement("a")
                    works_at.innerHTML = "<span class='highlight'>At</span> " + person.works_at_name
                    works_at.href      = person.works_at_url
                    works_at.target    = '_blank'
                    card.appendChild(works_at)
                }
                if (person.works_on_name){
                    const works_on = person.works_on_url ? document.createElement("a") : document.createElement("p")
                    if (person.works_on_url){
                        works_on.href   = person.works_on_url
                        works_on.target = '_blank'
                    }
                    works_on.innerHTML = "<span class='highlight'>On</span> " + person.works_on_name
                    card.appendChild(works_on)

                    if (person.works_on_desc){
                        const works_on_desc     = document.createElement("p")
                        works_on_desc.innerText = person.works_on_decs
                        card.appendChild(works_on_desc)
                    }
                }
                if (person.from_){
                    const from_     = document.createElement("p")
                    from_.innerText = person.from_
                    from_.classList.add("from")
                    card.appendChild(from_)
                }
                people.appendChild(card)
            })
        })
    load_visualize()
    // QA query
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

            const summary = document.querySelector("#summary") || document.createElement("section")
            summary.id    = "summary"
            summary.classList.add("bb")
            var total = 0
            if (typeof(res_data.total) == "number"){
                total = res_data.total
            } else {
                total = "Greater than " + res_data.total.value
            }
            summary.innerHTML = "Total: " + total + "<br />Filtered: " + res_data.results.length

            res_pos.appendChild(summary)


            const container = document.querySelector("#query_container") || document.createElement("div")
            container.id    = "query_container"

            res_data.results.map((hit, iv) => {
                const result = document.createElement("div")
                result.setAttribute("data-aos", "fade-up")
                result.setAttribute("data-aos-anchor-placemen", "center-bottom")
                // Header
                const h    = document.createElement("header")
                const h_h2 = document.createElement("h2")
                const h_h2_a = document.createElement("a")
                h_h2_a.innerText = hit._source.title
                h_h2_a.href = "http://localhost:8764/" + hit._source.path
                h_h2.appendChild(h_h2_a)
                h.appendChild(h_h2)
                result.appendChild(h)

                // Article box
                const article = document.createElement("article")
                const para    = document.createElement("p")
                para.innerText = hit._source.content
                article.appendChild(para)

                // rate box
                const section = document.createElement("section")
                section.classList.add("bb")

                const lable = document.createElement("label")
                lable.innerText = "relevance:"
                lable.classList.add("rate")
                section.appendChild(lable)

                const rate = document.createElement("div")
                rate.id = "rate-" + iv
                rate.classList.add("rate")
                rate.classList.add("rate-c")
                Array(5).fill().map((_, value) => {
                    const o = document.createElement("img")
                    o.src = 'img/star-off.png'
                    o.alt = 'star'
                    rate.appendChild(o)
                })
                const imgs = Array.from(rate.children)

                const mute_star = "img/star-off.png"
                const shining_star = "img/star-on.png"

                imgs.map((img, i) => {
                    img.setAttribute("score", i + 1)
                    img.onclick = e => {
                        const srcEl = e.target
                        const score = srcEl.getAttribute("score")
                        imgs.map((img, j) => {
                            img.src = j < score ? shining_star : mute_star
                        })
                    }
                })

                const score = parseInt(hit.rate) || 0
                imgs.map((img, j) => {
                    img.src = j < score ? shining_star : mute_star
                })

                section.appendChild(rate)
                const rate_b = document.createElement("button")
                rate_b.id = "submit-rate-" + iv
                rate_b.classList.add("rate")
                rate_b.classList.add("rate-c")
                rate_b.innerText = "Submit"
                rate_b.addEventListener("click", () => {
                    axios.post("http://localhost:8080/rate", {
                        query: document.querySelector("#q").value,
                        ans: hit, rate: parseInt(score)
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

    window.scrollTo(0, document.querySelector("#inp").offsetTop)
}

window.onload = () => {
    init_cookie()
    load_visualize()
    AOS.init()
}
