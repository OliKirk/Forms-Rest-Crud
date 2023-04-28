"use strict";

window.addEventListener("load", initApp);
const endpoint = "https://my-api-database-ccaf8-default-rtdb.europe-west1.firebasedatabase.app/";

// skift post til champs

function initApp() {
  console.log("initApp is running 🎉");
  updateChampsGrid();
}

async function updateChampsGrid() {
  champs = await getChampsData();
  showChamps(champs);
}

async function getChampsData() {
  const response = await fetch(`${endpoint}/posts.json`);
  const data = await response.json();
  const posts = prepareChamps(data);
  return champs;
}

function showChamps(ListOfChamps) {
  document.querySelector("#champ-data").innerHTML = ""; // reset the content of section#posts

  for (const champ of listOfChamps) {
    showPost(champ); // for every post object in listOfPosts, call showPost
  }
}

function showChamp(champObject) {
  const champHTML = /*html*/ `
    <article class="grid-item">
        <img src="${champObject.image}">
        <h2>${champObject.name}</h2>
        <div class="btns">
            <button class="update-btn">Update</button>
            <button class="delete-btn">Delete</button>
        </div>
    </article>`;
  document.querySelector("#champ-data").insertAdjacentHTML("beforeend", champHTML);
  document.querySelector("#champ-data article:last-child .btn-delete").addEventListener("click", deleteChampClicked);
  document.querySelector("#champ-data article:last-child .btn-update").addEventListener("click", updateChampClicked);
  function openChampDialog() {}

  function deleteChampClicked(params) {
    console.log("deleteChampClicked");
  }

  function updateChampClicked(params) {
    console.log("updateChampClicked");
  }

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
