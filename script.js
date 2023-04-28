"use strict";

window.addEventListener("load", initApp);
const endpoint = "https://my-api-database-ccaf8-default-rtdb.europe-west1.firebasedatabase.app/";

function initApp() {
  console.log("initApp is running 🎉");
  updateChampsGrid();
}

async function updateChampsGrid() {
  posts = await getChampsData();
  showChamps();
}

async function getChampsData() {
  // VI ÆNDRER POSTS TIL CHAMPS NÅR VI OGSÅ GØR DET I VORES FIREBASE :)))
  const response = await fetch(`${endpoint}/posts.json`)
  const data = await response.json();
  const posts = prepareChamps(data);
  return posts;
}

function showChamps() {}

function showChamp() {
  const html = /*html*/`
    <article class = "grid-item">
    <img>
    /*etcetc*/
    <div class="btns">
      <button class="btn-delete"></button>
      <button class="btn-update"></button>
    </div>
    </article>
  `

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

function createChamp() {}

function serchChamps() {}

function filterChamps() {}

function closeChampDialog() {}
