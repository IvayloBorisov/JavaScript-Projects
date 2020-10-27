
const API_KEY = '28401306183d4a22b39cdcc805a796c9 ';
const BASE_URL = "https://api.spoonacular.com/recipes/";

const allRecipes = document.querySelector('.meals');

const loadDietRecipes = dietRecipes => {

    const dietRecipesDiv = document.querySelector('.diet-recipes');
    const imageDiv = document.createElement('div');
    const rightArrow = document.querySelector('.material-icons.right');
    dietRecipes.map(recipe => {
        imageDiv.innerHTML += `<img src="${ recipe.image }" alt="diet-recipe"/>`;
    });
    dietRecipesDiv.appendChild(imageDiv);
    imageDiv.insertAdjacentElement('afterend', rightArrow);
}

const getDietRecipes = async () => {
     const fetchDietRecipes = await fetch(`${ BASE_URL }complexSearch?diet&apiKey=${ API_KEY }`);
     const { results } = await fetchDietRecipes.json();
    
     loadDietRecipes(results);
     return results;
}

getDietRecipes();

const loadRecipes = recipesData => {
    allRecipes.innerHTML = '';
    allRecipes.innerHTML = '<h3>Random Recipes</h3>';
    
    recipesData.map((recipe, index) => {
        const singleRecipe = document.createElement('div');
        singleRecipe.classList.add('meal');
        singleRecipe.innerHTML = `
                                 <div class="meal-header">
                                    <img src="${ recipe.image }" alt="${ recipe.title }">
                                  </div>
                                  <div class="meal-body accordion-container">
                                    <input type="radio" id="accordion${ index }" name="accordion" class="accordion-input">
                                    <label for="accordion${ index }" class="accordion-label">${ recipe.title }</label>
                                    <div class="accordion-content">
                                        <p>${ recipe.instructions }</p>                                       
                                    </div>                                       
                                  </div>`;

        allRecipes.appendChild(singleRecipe);
    });
  
}

const getRandomRecipes = async () => {
    const fetchData = await fetch(`${ BASE_URL }random?number=10&apiKey=${ API_KEY }`);
    const { recipes } = await fetchData.json();

    loadRecipes(recipes);
    return recipes;
}

// Accordion scroll
async function accordionScroll() {
    await getRandomRecipes();
    const label = document.querySelectorAll('label');
    label.forEach(item => {
        item.addEventListener('click', (event) => {
            const meal = event.path[2];
            meal.scrollIntoView();
       });
    });
}

accordionScroll();

const nextButton = document.querySelector('.btn-next');
nextButton.addEventListener('click', () => {
    getRandomRecipes();
    window.scrollTo(0, 0);
});

const btnSearch = document.querySelector('.btn-search');
btnSearch.addEventListener('click', () => {

    let searchInput = document.querySelector('header input');
    searchRecipe(searchInput.value);
    searchInput = '';
});

const searchRecipe = async (word) => {
 
    const ingredientsStr = `findByIngredients?ingredients=${ word }&number=10&apiKey=`;
    const getSearchedRecipes = await fetch(`${ BASE_URL }${ ingredientsStr }${ API_KEY }`);
    const response = await getSearchedRecipes.json();

    loadRecipes(response, true);
    return response;
}

// Carousel slider

const rightArrow = document.querySelector('.material-icons.right');
const leftArrow = document.querySelector('.material-icons.left');

rightArrow.addEventListener('click', () => {
    const dietImage = document.querySelector('.diet-recipes img:first-child');
    const imageWidth = parseFloat(getComputedStyle(dietImage).width) + 8;
    document.querySelector('.diet-recipes > div').scrollLeft -= imageWidth;
});

leftArrow.addEventListener('click', () => {
    const dietImage = document.querySelector('.diet-recipes img:first-child');
    const imageWidth = parseFloat(getComputedStyle(dietImage).width) + 8;
    document.querySelector('.diet-recipes > div').scrollLeft += imageWidth;
    
});








