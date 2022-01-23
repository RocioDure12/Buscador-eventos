const form = document.querySelector(".form")
const inputSearch = document.querySelector("#input-search")
const selectMealtype = document.querySelector("#select-mealtype")
const selectDiet = document.querySelector("#select-diet")
const btnSearch = document.querySelector("#btn-search")
const cardsContainer = document.querySelector(".cards-container")
const card = document.querySelector(".card")
const recipeInfo = document.querySelector(".card-recipe-info")
const btnNext = document.querySelector(".btn-next")
const sectionHero = document.querySelector(".hero-container")
const navBar = document.querySelector(".nav-bar")
const mainContainer = document.querySelector(".main-container")
const secRecipeInfo = document.querySelector(".section-recipe-info")
let currentLink
let nextLink
const views = document.querySelectorAll(".view")
const loading=document.querySelector(".loading")

const showViews = (element) => {
    element.classList.remove("display-none")
}

const hideViews = () => {
    for (let i = 0; i < views.length; i++) {
        views[i].classList.add("display-none")
    }
}


const loadData = (link) => {
    loading.classList.remove("display-none")
    currentLink = link
    fetch(link)
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            nextLink = data._links.next ? data._links.next.href : null
            renderHtml(data.hits)
            loading.classList.add("display-none")
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

    const cards = document.querySelectorAll(".card")
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        card.onclick = () => {
            showDetails(data[i])
        }
    }
}
const loadNextPage = () => {
    if (nextLink) {
        loadData(nextLink)
    }
}

btnNext.onclick = () => {
    loadNextPage()
}

form.onsubmit = (e) => {
    e.preventDefault()
    cardsContainer.innerHTML = ""
    const searchType = selectDiet.value ? `&health=${selectDiet.value}` : ""
    loadData(`https://api.edamam.com/api/recipes/v2?type=public&q=${inputSearch.value}&app_id=d76d54c6&app_key=c5f3fc901a11ea4aa0023d0a03af9e0e${searchType}&mealType=${selectMealtype.value}&imageSize=REGULAR`)

}

const showDetails = (curr) => {
    console.log(curr)
    hideViews()
    showViews(navBar)
    showViews(secRecipeInfo)

    recipeInfo.innerHTML = `<div class="">
    <h1 id="titulo">${curr.recipe.label}</h1>
<img id="imagen" src=${curr.recipe.images.SMALL.url}>
<h3>Ingredients</h3>
<div id="ingredients">${curr.recipe.ingredientLines}</div>
<h3>Diet Labels</h3>
<div id="dietLabels">${curr.recipe.dietLabels}</div>
<h3>Instructions</h3>
<p>See full recipe on </p>
<div id="url"><a href='${curr.recipe.url}'>Link here</a></div> 
</div>`
}


const iconInicio = document.querySelector(".icon")
iconInicio.onclick = () => {
hideViews()
showViews(sectionHero)
showViews(mainContainer)
showViews(form)
showViews(cardsContainer)

}

//const btnMode=document.querySelector(".btn-mode")
//const body= document.querySelector("body")


