"use strict";

window.addEventListener("load", initApp);
const endpoint = "https://my-api-database-ccaf8-default-rtdb.europe-west1.firebasedatabase.app/";

function initApp() {
  console.log("initApp is running 🎉");
}

async function updateChampsGrid() {
  posts = await getChampsData();
  showChamps();
}

async function getChampsData() {
  const response = await fetch(`${endpoint}/posts.json`)
  const data = await response.json();
  const posts = prepareChamps(data);
  return posts;
}

function showChamps() {}

function showChamp() {
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
