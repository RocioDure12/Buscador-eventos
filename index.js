const form = document.querySelector("#form")
const inputSearch = document.querySelector("#input-search")
const selectMealtype = document.querySelector("#select-mealtype")
const selectDiet = document.querySelector("#select-diet")
const btnSearch = document.querySelector("#btn-search")
const cardsContainer = document.querySelector(".cards-container")
const card = document.querySelector(".card")
const btnNext = document.querySelector("#btn-next")
let currentLink
let nextLink


const loadData = (link) => {
    currentLink = link
    fetch(link)
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            nextLink = data._links.next ? data._links.next.href : null
            renderHtml(data.hits)
        })
}

loadData("https://api.edamam.com/api/recipes/v2?type=public&app_id=d76d54c6&app_key=c5f3fc901a11ea4aa0023d0a03af9e0e&imageSize=REGULAR")

const renderHtml = (data) => {
    const html = data.reduce((acc, curr) => {
        return acc + `<div data-id=${curr._links.self.href} class="card">
                        <img src=${curr.recipe.image}>
                        <h1>${curr.recipe.label}</h1>
                    </div>`
    }, "")
    cardsContainer.innerHTML += html


}

const loadNextPage = () => {
    if (nextLink) {
        loadData(nextLink)
    }
}

btnNext.onclick = () => {
    loadNextPage()
}