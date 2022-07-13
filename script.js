
const searchForm = document.querySelector('#search-form');
const searchField  = document.querySelector('input[name="search"]');
const healthDropdown = document.getElementById('healthList');
const healthDropdownFirst = document.getElementById('healthList')[0].innerHTML;
const caloriesList = document.getElementById('caloriesList');
const caloriesDropdownFirst = document.getElementById('caloriesList')[0].innerHTML;
const searchResultsContain = document.querySelector('.search-results-container');
const sevenDayContainer = document.querySelector('.seven-day-container');
const searchErrorMessage = document.getElementById('error-message');

let searchVal;
const recipesInCal = [];

console.log(searchField)


const searchFormSubmitted = (e) => {
  e.preventDefault();

//searchVal = searchField.value;


//get health option selection if selected
const healthListOption = document.forms['search-form'].healthList.value;
const maxNumberCalories = document.forms['search-form'].caloriesList.value;


   if (searchForm.checkValidity()) {
     //document.getElementById("error-message").innerHTML = "input is ok";
     searchVal = searchField.value;
      searchResultsContain.innerHTML = '';
     dataRetrieve(searchVal, healthListOption, maxNumberCalories);
    searchErrorMessage.innerHTML = '';
   } else {
     searchErrorMessage.innerHTML = 'Search field must not be empty';
   }

} //close searchFormSubmitted



//get input from search form
searchForm.addEventListener('submit', searchFormSubmitted )

// retrieve data
const dataRetrieve = (searchVal, healthListOption, maxNumberCalories) => { //b1
  const requestOptions = { //b2
    method: 'GET',
   redirect: 'follow'
 }; //b1


 console.log(`health list option: ${healthListOption}`);
 console.log(`max number of calories: ${maxNumberCalories}`);

const healthOption = healthDropdownFirst === healthListOption ? '' : `&health=${healthListOption}`;
const caloriesAmount = caloriesDropdownFirst === maxNumberCalories ? '' : `&calories=${maxNumberCalories}`;
console.log(caloriesAmount);

  const urlToUse = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchVal}&app_id=ca7d95d0&app_key=e0d18286b748e55ba5431e957ebab929&random=true&dishType=Main%20course${healthOption}${caloriesAmount}`;



//&from=0&to=4'   //&random=true
fetch(urlToUse, requestOptions)
 .then(response => response.text())
 .then(result => { //b2
const resultParsed = JSON.parse(result);
//console.log(resultParsed.hits);
const hitsFromSearch = resultParsed.hits;

displayResults(hitsFromSearch, searchVal)
}) //b1

 .catch(error => console.log('error', error));
}  //dataRetrieve closed // b0


const displayResults = (recipies, searchVal) => { //b1
let noOfRecipes;

if (recipies.length >= 0 && recipies.length <= 4){
  noOfRecipes = recipies.length;
}else {
  noOfRecipes = 5;
}


//check to see if any recipes in calendar, if they are, then need to make sure recipes arent duplicated

for (let i = 0; i < noOfRecipes; i++ ){ //b2+
let caloriesRecipe = Math.floor(recipies[i].recipe.calories / recipies[i].recipe.yield);  //number
//console.log(recipies[i]);


searchResultsContain.innerHTML +=
`<div> ${recipies[i].recipe.label}    <img src=${recipies[i].recipe.images.SMALL.url} width=${recipies[i].recipe.images.SMALL.width} height=${recipies[i].recipe.images.SMALL.height} > </div>
 <div> <b> Calories: </b> ${caloriesRecipe} <a href ="${recipies[i].recipe.url}" target="_blank" > View recipe </a> </div>
 <div class="recipe-checkbox"> <input type="checkbox" data-checkbox="${i}" id="${searchVal}-recipe-${i}" name="recipe-${i}"> <label for="recipe-${i}"> Add to 7 day calendar </label> </div>`

} // close for //b1




  const resultsCheckboxes = document.querySelectorAll('.recipe-checkbox > input[type="checkbox"]');
     resultsCheckboxes.forEach(recipeCheckbox => recipeCheckbox.addEventListener('change', (e) => { //b2
  const currentRecipe = e.target.dataset.checkbox;
     const noRecipesinCal = sevenDayContainer.querySelectorAll('.recipe').length;
       const recipes = searchResultsContain.querySelectorAll('.recipe-checkbox input');
  const searchFormSelect =     searchForm.querySelector('input');
    const searchButtonSelect =   searchForm.querySelector('button');


       if (e.target.checked) { //b3
          if(noRecipesinCal == 6){ //b4
//console.log('number is 7')
         const caloriesCurrentRecipe = Math.floor(recipies[currentRecipe].recipe.calories / recipies[currentRecipe].recipe.yield);
         sevenDayContainer.innerHTML +=
         ` <div class="recipe" id="${searchVal}-recipe-${currentRecipe}" data-search="${searchVal}">
         ${recipies[currentRecipe].recipe.label}
         <a href =${recipies[currentRecipe].recipe.url}> View recipe </a>
         <b> calories: </b> ${caloriesCurrentRecipe}
         <button type="button" class="button-remove-recipe" data-repTitle="${recipies[currentRecipe].recipe.label}" id="${searchVal}-recipe-${currentRecipe}" >Remove</button>
          </div>   `;

          console.log('this is in the seven limit reached function');
          // push title of recipe to titlesRecipesInCalendar
          recipesInCal.push(recipies[currentRecipe].recipe.label);
          console.log(recipesInCal);


        Array.from(recipes).forEach(recipeCheck => { //b5
        if (recipeCheck.checked == false){ //b6
        recipeCheck.disabled = true;
      } // b5
    }) //b4
        // disable search field
         searchFormSelect.disabled = true;
         searchButtonSelect.disabled = true;

         // disable healthDropdown
         healthList.disabled = true;
         caloriesList.disabled = true;


} else if (noRecipesinCal < 6){ //b4

 //console.log('6 or less')
 const caloriesCurrentRecipe = Math.floor(recipies[currentRecipe].recipe.calories / recipies[currentRecipe].recipe.yield);
//add hypens between words in recipe title
const recipeLabel = recipies[currentRecipe].recipe.label;
const dataTitleHypens = recipeLabel.replace(/[^A-Za-z0-9]/g, '-');
//console.log(dataTitleHypens);



 sevenDayContainer.innerHTML +=
 ` <div class="recipe" id="${searchVal}-recipe-${currentRecipe}" data-search="${searchVal}" data-repTitle="${recipies[currentRecipe].recipe.label}">
 ${recipies[currentRecipe].recipe.label}
 <a href ="${recipies[currentRecipe].recipe.url}" target="_blank"> View recipe </a>
 <b> calories: </b> ${caloriesCurrentRecipe} <button type="button" class="button-remove-recipe" data-repTitle="${recipies[currentRecipe].recipe.label}" data-titlehypens="${dataTitleHypens}" id="${searchVal}-recipe-${currentRecipe}" >Remove</button> </div>   `;


//const specificButton = document.querySelector('.button-remove-recipe');
//specificButton.addEventListener('click', removeSelectedRecipeButton);



  // push title of recipe to titlesRecipesInCalendar
  recipesInCal.push(recipies[currentRecipe].recipe.label);
  console.log(recipesInCal)

} // close else if for number of recipes

// add event listener to all the checked
const listenTo = document.querySelectorAll('.button-remove-recipe')
listenTo.forEach(removeButton => removeButton.addEventListener('click', removeSelectedRecipeButton))


} else { // if target not checked ////b3
// need to check if no. boxes
if (noRecipesinCal == 7){ //b4
  Array.from(recipes).forEach(recipeCheck => { //b5
  if (recipeCheck.disabled){ //b6
    recipeCheck.disabled = false;
  } //b5
}) //b4
  searchFormSelect.disabled = false;
  searchButtonSelect.disabled = false;
  healthList.disabled = false;
  caloriesList.disabled = false;
} //b3

console.log('before unticked');
console.log(recipesInCal);
const recipeId  = e.target.id;
const recipeLabel = recipies[currentRecipe].recipe.label;
if (recipesInCal.indexOf(recipeLabel > -1)){ //b4
recipesInCal.splice(recipesInCal.indexOf(recipeLabel), 1)
} //b3
console.log('after unticked');
console.log(recipesInCal);

const sevenDayRecipe = document.querySelector(`#seven-day #${recipeId}`);
if(sevenDayRecipe !== null ){ //b4
sevenDayRecipe.remove();
} //close if not sevenDayRecipe
} // close else line  on 154

}) // close event listener //b1
) // close for each

}; // close displayresults //b0

function removeSelectedRecipeButton(e){
//remove recipe from 7 day container
e.srcElement.parentElement.remove();

// remove recipe from recipesInCal
const recipeLabel = e.target.dataset.reptitle;
if (recipesInCal.indexOf(recipeLabel > -1)){
recipesInCal.splice(recipesInCal.indexOf(recipeLabel), 1)
}

//if checkbox is checked, then uncheck it
const recipeId = e.target.id;
const inputRecipe = document.querySelector(`.search-results-container #${recipeId}`);
if(inputRecipe !== null){
if (inputRecipe.checked = true){
  inputRecipe.checked = false;
  }
}

//if recipies in cal 6
if (recipesInCal.length == 6){
  const recipes = searchResultsContain.querySelectorAll('.recipe-checkbox input'); // NEEED THIS ANYMORE???
  searchForm.querySelector('input').disabled = false;
  searchForm.querySelector('button').disabled = false;
  healthList.disabled = false;
  caloriesList.disabled = false;
  Array.from(recipes).forEach(recipeCheck => {
  if (recipeCheck.disabled){
    recipeCheck.disabled = false;
  }
  })

}


}
