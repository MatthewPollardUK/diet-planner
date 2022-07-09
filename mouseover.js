// remove buttons in 7 day container
// if button clicked then get all the buttons, then cycle through them to remove clicked content
sevenDayContainer.addEventListener('mouseenter', e => {
 const removeRecipeButton = document.querySelectorAll('.button-remove-recipe');
 removeRecipeButton.forEach(removeButton => removeButton.addEventListener('click', (remE) => {

 const recipeLabel  = remE.target.dataset.reptitle;

 console.log('i am here');

remE.srcElement.parentElement.remove();
const recipeId = remE.target.id;
const inputRecipe = document.querySelector(`.search-results-container #${recipeId}`);
let currentSearchTerm = searchVal;   // need to get this from GLOBAL VARIABLE INSTEAD???
let removeBoxSearchTerm = remE.srcElement.parentElement.dataset.search;

 if (currentSearchTerm === removeBoxSearchTerm ){
   if (inputRecipe.checked = true){
     inputRecipe.checked = false;
     }
  }

 if (removeRecipeButton.length == 7){
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




}))


})
