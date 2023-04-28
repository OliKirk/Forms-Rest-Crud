"use strict";

window.addEventListener("load", initApp);
const endpoint =
  "https://my-api-database-ccaf8-default-rtdb.europe-west1.firebasedatabase.app/";

function initApp() {
  console.log("initApp is running 🎉");
  updateChampsGrid();
}

async function updateChampsGrid() {
  champs = await getChampsData();
  showChamps();
}

async function getChampsData() {
  // VI ÆNDRER champs TIL CHAMPS NÅR VI OGSÅ GØR DET I VORES FIREBASE :)))
  const response = await fetch(`${endpoint}/champs.json`)
  const data = await response.json();
  const champs = prepareChamps(data);
  return champs;
}

function showChamps() {}

function showChamp() {
  const champHTML = /*html*/ `
    <article class="grid-item">
        <img src="${champObject.image}">
        <h2>${champObject.name}</h2>
        <div class="btns">
            <button class="update-btn">Update</button>
            <button class="delete-btn">Delete</button>
        </div>
    </article>`;
  document
    .querySelector("#champ-data")
    .insertAdjacentHTML("beforeend", champHTML);
  function openChampDialog() {}

  function deleteChampClicked(params) {}

  function updateChampClicked(params) {}

  async function viewChamp() {
    // muligt tilføjelse af update- og deletechamp hvis layout trænges
  }
}

function prepareChamps() {}

function deleteChamp() {}

function updateChamp() {}

async function createChamp(navn,description,image,region,sex,species,role,type) {
  const newChamp = {navn,description,image,region,sex,species,role,type};
  const champJson = JSON.stringify(newChamp);
  const response = await fetch(`${endpoint}/champs.json`, {
          method: "POST",
          body: champJson,
      });
      if (response.ok) {
          console.log("New champ succesfully added to Firebase 🔥");
          updatechampsGrid();
      }
}

function searchChamps() {}

function filterChamps() {}

function closeChampDialog() {}
