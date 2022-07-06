
const searchForm = document.querySelector('#search-form');
const searchField  = document.querySelector('input[name="search"]');
const searchResultsContain = document.querySelector('.search-results-container');
const sevenDayContainer = document.querySelector('.seven-day-container');

let searchVal;




let searchFormSubmitted = (e) => {
  e.preventDefault();
  //let myresult = e.elements["search"].value;
searchVal = searchField.value;
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

displayResults(hitsFromSearch, searchVal)
 })

 .catch(error => console.log('error', error));
}

//dataRetrieve();
const displayResults = (recipies, searchVal) => {

//console.log(`this is here`);
//console.log(res);
for (var i = 0, len = 5; i < len; i++ ){
let caloriesRecipe = Math.floor(recipies[i].recipe.calories / recipies[i].recipe.yield);  //number
//console.log(recipies[i]);


searchResultsContain.innerHTML +=
`<div> ${recipies[i].recipe.label}    <img src=${recipies[i].recipe.images.SMALL.url} width=${recipies[i].recipe.images.SMALL.width} height=${recipies[i].recipe.images.SMALL.height} > </div>
 <div> <b> Calories: </b> ${caloriesRecipe} <a href =${recipies[i].recipe.url}> View recipe </a> </div>
 <div class="recipe-checkbox"> <input type="checkbox" data-checkbox="${i}" id="${searchVal}-recipe-${i}" name="recipe-${i}"> <label for="recipe-${i}"> Add to 7 day calendar </label> </div>`

} // close for




  let resultsCheckboxes = document.querySelectorAll('.recipe-checkbox > input[type="checkbox"]');
     resultsCheckboxes.forEach(recipeCheckbox => recipeCheckbox.addEventListener('change', (e) => {
  let currentRecipe = e.target.dataset.checkbox;
     const noRecipesinCal = sevenDayContainer.querySelectorAll('.recipe').length;
       const recipes = searchResultsContain.querySelectorAll('.recipe-checkbox input');
  const searchFormSelect =     searchForm.querySelector('input');
    const searchButtonSelect =   searchForm.querySelector('button');

       if (e.target.checked) {
          if(noRecipesinCal == 6){
//console.log('number is 7')
         let caloriesCurrentRecipe = Math.floor(recipies[currentRecipe].recipe.calories / recipies[currentRecipe].recipe.yield);
         sevenDayContainer.innerHTML +=
         ` <div class="recipe" id="${searchVal}-recipe-${currentRecipe}" data-search="${searchVal}">
         ${recipies[currentRecipe].recipe.label}
         <a href =${recipies[currentRecipe].recipe.url}> View recipe </a>
         <b> calories: </b> ${caloriesCurrentRecipe}
         <button type="button" class="button-remove-recipe" id="${searchVal}-recipe-${currentRecipe}" >Remove</button>
          </div>   `;

          console.log('this is in the seven limit reached function');
        Array.from(recipes).forEach(recipeCheck => {
        if (recipeCheck.checked == false){
        recipeCheck.disabled = true;
        }
        })
        // disable search field
         searchFormSelect.disabled = true;
         searchButtonSelect.disabled = true;

} else if (noRecipesinCal < 6){

 //console.log('6 or less')
 let caloriesCurrentRecipe = Math.floor(recipies[currentRecipe].recipe.calories / recipies[currentRecipe].recipe.yield);
 sevenDayContainer.innerHTML +=
 ` <div class="recipe" id="${searchVal}-recipe-${currentRecipe}" data-search="${searchVal}">
 ${recipies[currentRecipe].recipe.label}
 <a href =${recipies[currentRecipe].recipe.url}> View recipe </a>
 <b> calories: </b> ${caloriesCurrentRecipe}
 <button type="button" class="button-remove-recipe" id="${searchVal}-recipe-${currentRecipe}" >Remove</button>
  </div>   `;
}
// close else if for number of recipes

} else { // if target not checked
// need to check if no. boxes
if (noRecipesinCal == 7){
  Array.from(recipes).forEach(recipeCheck => {
  if (recipeCheck.disabled){
    recipeCheck.disabled = false;
  }
  })
  searchFormSelect.disabled = false;
  searchButtonSelect.disabled = false;
}


const recipeId  = e.target.id;
const sevenDayRecipe = document.querySelector(`#seven-day #${recipeId}`);
if(sevenDayRecipe !== null ){
sevenDayRecipe.remove();
} //close if

} // close else checked
}) // close event listener
) // close for each
}; // close displayresults



// remove buttons in 7 day container
// if button clicked then get all the buttons, then cycle through them to remove clicked content
sevenDayContainer.addEventListener('mouseenter', (e) => {

const removeRecipeButton = document.querySelectorAll('.button-remove-recipe');
//console.log(removeRecipeButton);
  if (removeRecipeButton.length > 0){
removeRecipeButton.forEach(removeButton => removeButton.addEventListener('click', (remE) => {
remE.srcElement.parentElement.remove();
const recipeId = remE.target.id;
const inputRecipe = document.querySelector(`.search-results-container #${recipeId}`);
let currentSearchTerm = searchVal;   // need to get this from GLOBAL VARIABLE INSTEAD???
let removeBoxSearchTerm = remE.srcElement.parentElement.dataset.search;

if (currentSearchTerm === removeBoxSearchTerm ){
  if (inputRecipe.checked = true){
    inputRecipe.checked = false;
  } // close checked if
} //close term comparison if


//})) // close event listener function. close parameter close for each
if (removeRecipeButton.length == 7){
const recipes = searchResultsContain.querySelectorAll('.recipe-checkbox input');
searchForm.querySelector('input').disabled = false;
searchForm.querySelector('button').disabled = false;
Array.from(recipes).forEach(recipeCheck => {
if (recipeCheck.disabled){
  recipeCheck.disabled = false;
} // close if
}) // close foreach
} // close if length 7

})) //test

} // close if removerecipebutton length greater than 0;
}) // close mouseenter









  // disabled unticked checkboxes in search

  //disabled search bar
