//Calling the API's-----------------------------------------------------------
//--------------------------------------------------------------------

function showInstrumentByName(){
  var instrumentForm = document.getElementById('instrument-form');

  instrumentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('instrument-name').value;

    /**
     * Fetch JSON data from family API
     * Convert JSON to JS object
     * Update results list
     */
    fetch('/api/instruments/' + name)
      .then(function(response) {
        return response.json();
      })
      .then(function(results) {
        updateNameResults(results);
      });
  });
}

function showInstrumentByFamily(){
  var instrumentForm = document.getElementById('instrument-form');

  instrumentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var family = document.getElementById('instrument-family').value;

    /*
     * Fetch JSON data from family API
     * Convert JSON to JS object
     * Update results list
     */
    fetch('/api/family/' + family)
      .then(function(response) {
        return response.json();
      })
      .then(function(results) {
        updateResults(results);
      });
  });
}

function showInstrumentByClef(){
  var instrumentForm = document.getElementById('instrument-form');

  instrumentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var clef = document.getElementById('instrument-clef').value;

    /**
     * Fetch JSON data from family API
     * Convert JSON to JS object
     * Update results list
     */
    fetch('/api/clef/' + clef)
      .then(function(response) {
        return response.json();
      })
      .then(function(results) {
        updateResults(results);
      });
  });
}

function showAllFamilies() {
    /**
     * Fetch JSON data from API
     * Convert JSON to JS object
     * Update dropdown list
     */
  fetch('/api/families')
      .then(function(response) {
        return response.json();
      })
      .then(function(results) {
        populateFamilyDropdown(results);
      });
}

function showAllClefs() {
    /**
     * Fetch JSON data from API
     * Convert JSON to JS object
     * Update dropdown list
     */
  fetch('/api/clefs')
      .then(function(response) {
        return response.json();
      })
      .then(function(results) {
        populateClefDropdown(results);
      });  
}






//Results actions------------------------------------------------------
//--------------------------------------------------------------------
function clearResults(){
  var resultsList = document.getElementById('results');
  resultsList.innerHTML = '';
}


/**
 * For each result, create a new list item and populate the list item
 * with the name of the instrument, then inject it into the results ul
 */
function updateResults(results) {
  var resultsList = document.getElementById('results');
    
  clearResults();

  for (var result of results) {
    var listItem = document.createElement('li');
    listItem.innerHTML = result.name;

    resultsList.appendChild(listItem);
  }
}

function updateNameResults(results) {
  var resultsList = document.getElementById('results');
    
  clearResults();

  for (var result of results) {
    var listItem = document.createElement('li');
    listItem.innerHTML = `
      <h3> ${ result.name } </h3>
      <h5> Family : ${ result.family } </h5>
      <h5> Pitch : ${ result.pitch } </h5>
      <h5> Sounds at : ${ result.sounds } </h5>
      <h5> Transposes : ${ result.transposes } </h5>
      <h5> Reads ${ result.clef } Clef </h5>

    `;

    resultsList.appendChild(listItem);
  }
}

function populateFamilyDropdown(results) {
  var familyDropdown = document.getElementById('dropdowns-family');

  for (var result of results) {
    var optionElement = document.createElement('option');
    var uniqueFamilyList = _.uniq(results);

    familyDropdown.innerHTML = `
        <option> ${ uniqueFamilyList[0] } </option>
        <option> ${ uniqueFamilyList[1] } </option>
        <option> ${ uniqueFamilyList[2] } </option>
        <option> ${ uniqueFamilyList[3] } </option>

    `;

    familyDropdown.appendChild(optionElement);
  }
}

function populateClefDropdown(results) {
  var clefDropdown = document.getElementById('dropdowns-clefs');
  var uniqueClefList = _.uniq(results);
  
  console.log(uniqueClefList);

  for (var result of results) {
    var optionElement = document.createElement('option');
    var uniqueClefList = _.uniq(results);

    clefDropdown.innerHTML = `
        <option> ${ uniqueClefList[0] } </option>
        <option> ${ uniqueClefList[1] } </option>
        <option> ${ uniqueClefList[3] } </option>
    `;

    clefDropdown.appendChild(optionElement);
  }  
}

















showInstrumentByName();
showInstrumentByFamily();
showInstrumentByClef();
showAllFamilies();
showAllClefs();