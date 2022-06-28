
const searchForm = document.querySelector('#search-form');
const searchField  = document.querySelector('input[name="search"]')




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
const displayResults = (res) => {

//console.log(`this is here`);
//console.log(res);
for (var i = 0, len = 5; i < len; i++ ){
  console.log(`Another recipe:`);
  console.log(res[i]['recipe']['label']);
}

}; // close displayresults
