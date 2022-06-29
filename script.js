
const searchForm = document.querySelector('#search-form');
const searchField  = document.querySelector('input[name="search"]');
const searchResultsContain = document.querySelector('.search-results-container');




let searchFormSubmitted = (e) => {
  e.preventDefault();
  //let myresult = e.elements["search"].value;
 let searchVal = searchField.value;
 //console.log(`this is the searchval: ${searchVal}`);

 dataRetrieve(searchVal)
}

//get input from search form
searchForm.addEventListener('submit', searchFormSubmitted )

// retrieve data
const dataRetrieve = (searchVal) => {
  let requestOptions = {
    method: 'GET',
   redirect: 'follow'
  };

  let urlToUse = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=ca7d95d0&app_key=e0d18286b748e55ba5431e957ebab929&to=5`;

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
console.log(recipies[i]);


searchResultsContain.innerHTML +=
`<div> ${recipies[i].recipe.label}    <img src=${recipies[i].recipe.images.SMALL.url} width=${recipies[i].recipe.images.SMALL.width} height=${recipies[i].recipe.images.SMALL.height} > </div>
 <div> <b> Calories: </b> ${caloriesRecipe} <a href =${recipies[i].recipe.url}> View recipe </a> </div>
 <div> col3  </div>`;

//  console.log(`Another recipe:`);
 //console.log(recipies[i]);
}

}; // close displayresults
