
const searchForm = document.querySelector('#search-form');
const searchField  = document.querySelector('input[name="search"]');
const searchResultsContain = document.querySelector('.search-results-container');
const sevenDayContainer = document.querySelector('.seven-day-container');






let searchFormSubmitted = (e) => {
  e.preventDefault();
  //let myresult = e.elements["search"].value;
 let searchVal = searchField.value;
 //console.log(`this is the searchval: ${searchVal}`);
searchResultsContain.innerHTML = '';
 dataRetrieve(searchVal);

}

//get input from search form
searchForm.addEventListener('submit', searchFormSubmitted )

// retrieve data
const dataRetrieve = (searchVal) => {
  let requestOptions = {
    method: 'GET',
   redirect: 'follow'
  };

  let urlToUse = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchVal}&app_id=ca7d95d0&app_key=e0d18286b748e55ba5431e957ebab929&to=5`;

fetch(urlToUse, requestOptions)
 .then(response => response.text())
 .then(result => {
let resultParsed = JSON.parse(result);
//console.log(resultParsed.hits);
let hitsFromSearch = resultParsed.hits;

displayResults(hitsFromSearch)
 })

 .catch(error => console.log('error', error));
}

//dataRetrieve();
const displayResults = (recipies) => {

//console.log(`this is here`);
//console.log(res);
for (var i = 0, len = 5; i < len; i++ ){
let caloriesRecipe = Math.floor(recipies[i].recipe.calories / recipies[i].recipe.yield);  //number
//console.log(recipies[i]);


searchResultsContain.innerHTML +=
`<div> ${recipies[i].recipe.label}    <img src=${recipies[i].recipe.images.SMALL.url} width=${recipies[i].recipe.images.SMALL.width} height=${recipies[i].recipe.images.SMALL.height} > </div>
 <div> <b> Calories: </b> ${caloriesRecipe} <a href =${recipies[i].recipe.url}> View recipe </a> </div>
 <div class="recipe-checkbox"> <input type="checkbox" data-checkbox="${i}" id="recipe-${i}" name="recipe-${i}"> <label for="recipe-${i}"> Add to 7 day calendar </label> </div>`;

} // close for

  let resultsCheckboxes = document.querySelectorAll('.recipe-checkbox > input[type="checkbox"]');
     resultsCheckboxes.forEach(recipeCheckbox => recipeCheckbox.addEventListener('change', (e) => {
       if (e.target.checked) {
        let currentRecipe = e.target.dataset.checkbox;
sevenDayContainer.innerHTML +=
` <div class="recipe">${recipies[currentRecipe].recipe.label}  </div>   `

} else {
  console.log(`Checkbox is not checked: ${e.target}`);
}  // close if else
}) // close event listener
) // close for each



}; // close displayresults
