const form = document.querySelector(".form")
const inputSearch = document.querySelector("#input-search")
const selectMealtype = document.querySelector("#select-mealtype")
const selectDiet = document.querySelector("#select-diet")
const btnSearch = document.querySelector("#btn-search")
const cardsContainer = document.querySelector(".cards-container")
const card = document.querySelector(".card")
const recipeInfo = document.querySelector(".card-recipe-info")
const btnNext = document.querySelector(".btn-next")
const sectionHero=document.querySelector(".hero-container")
const navBar=document.querySelector(".nav-bar")
const mainContainer=document.querySelector(".main-container")
const secRecipeInfo=document.querySelector(".section-recipe-info")
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
    cardsContainer.classList.add("display-none")
    sectionHero.classList.add("display-none")
    form.classList.add("display-none")
    navBar.classList.remove("hidden")
    secRecipeInfo.classList.remove("display-none")
    btnNext.classList.add("display-none")
    mainContainer.classList.add("padding")

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

 
const iconInicio=document.querySelector(".icon")
 iconInicio.onclick=()=>{
     secRecipeInfo.classList.add("display-none")
     navBar.classList.add("hidden") 
     cardsContainer.classList.remove("display-none")
     sectionHero.classList.remove("display-none")
     form.classList.remove("display-none")
     mainContainer.classList.remove("padding")
     btnNext.classList.remove("display-none")
    
 }

const btnMode=document.querySelector(".btn-mode")
const body= document.querySelector("body")

   
