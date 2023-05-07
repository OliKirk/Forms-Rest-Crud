"use strict";
import { champs } from "./script.js";
function prepareChamps(dataObject) {
  const array = [];
  for (const key in dataObject) {
    const object = dataObject[key];
    object.id = key;
    array.push(object);
  }
  return array;
}

function searchChamps(searchValue) {
  searchValue = searchValue.toLowerCase();
  const results = champs.filter(checkTitle);
  function checkTitle(champ) {
    const name = champ.name.toLowerCase();
    return name.includes(searchValue);
  }
  return results;
}

function sortByChanged(event) {
  const selectedValue = event.target.value;
  if (selectedValue === "name") {
    champs.sort(compareName);
  } else if (selectedValue === "role") {
    champs.sort(compareRole);
  }
  showChamps(champs);
}

function filterByRole(inputValue) {
  inputValue = inputValue.toLowerCase();
  if (inputValue !== "") {
    let filteredList = champs.filter((champ) => champ.role.toLowerCase().includes(inputValue));
    if (filteredList.length !== 0) {
      return filteredList;
    } else {
      return (filteredList = []);
    }
  } else if (inputValue === "") {
    updateChampsGrid();
  } else {
    return champsList;
  }
}
export { prepareChamps, searchChamps, sortByChanged, filterByRole };
