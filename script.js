"use strict";

const endpoint = "https://my-api-database-ccaf8-default-rtdb.europe-west1.firebasedatabase.app/";
let champs;

window.addEventListener("load", initApp);

function initApp() {
  console.log("initApp is running 🎉");
  updateChampsGrid();
  // document.querySelector("#dialog-update-btn").addEventListener("click", updateChamp());
}

async function updateChampsGrid() {
  champs = await getChampsData();
  showChamps(champs);
}

async function getChampsData() {
  // VI ÆNDRER champs TIL CHAMPS NÅR VI OGSÅ GØR DET I VORES FIREBASE :)))
  const response = await fetch(`${endpoint}/champs.json`);
  const data = await response.json();
  const champs = prepareChamps(data);
  return champs;
}

function showChamps(listOfChamps) {
  document.querySelector("#champ-data").innerHTML = ""; // reset the content of section#posts

  for (const champ of listOfChamps) {
    showChamp(champ); // for every post object in listOfPosts, call showPost
  }
}

function showChamp(champ) {
  const champHTML = /*html*/ `
    <article class="grid-item">
        <div class ="body">        
        <img src=${champ.image}>
        <h2>${champ.name}</h2>
        </div>
        <div class="btns">
            <button class="update-btn">Update</button>
            <button class="delete-btn">Delete</button>
        </div>
    </article>`;
  document.querySelector("#champ-data").insertAdjacentHTML("beforeend", champHTML);
  document.querySelector("#champ-data article:last-child .delete-btn").addEventListener("click", deleteChampClicked);
  document.querySelector("#champ-data article:last-child .update-btn").addEventListener("click", updateChampClicked);
  document.querySelector("#champ-data article:last-child .body").addEventListener("click", openChampDialog);

  function openChampDialog() {
    console.log("Open dialog / detail view");
    const myHTML = /*HTML*/ `<article id="champinfo"> 
    <h2>Name: ${champ.name}</h2>
    <img class="champinfo-img" src=${champ.image}>
    <p>description: ${champ.description}</p>
    <p>region: ${champ.region}</p>
    <p>sex: ${champ.sex}</p>
    <p>species: ${champ.species}</p>
    <p>role: ${champ.role}</p>
    <p>type: ${champ.type}</p>
<button id="close-btn">Close</button>
    </article>`;
    document.querySelector("#dialog-detail-view").insertAdjacentHTML("beforeend", myHTML);
    document.querySelector("#dialog-detail-view").showModal();
    document.querySelector("#close-btn").addEventListener("click", closeDialog);
  }
  function closeDialog() {
    console.log("closeDialog");
    document.querySelector("#dialog-detail-view").close();
    document.querySelector("#champinfo").remove();
  }

  function deleteChampClicked(params) {
    console.log("deleteChampClicked");
    document.querySelector("#dialog-delete-champ").showModal();
  }

  function updateChampClicked(champObject) {
    document.querySelector("#dialog-update-champ").showModal();
    console.log("updateChampClicked");
    const name = `${champObject.name} Uppdated`;
    const description = "Her er jeg";
    const image = "";
    const region = "";
    const sex = "";
    const species = "";
    const role = "";
    const type = "";
    document.querySelector("#dialog-update-btn").addEventListener("click", function () {
      updateChamp(champ);
    });
  }

  /* async function viewChamp() {
    // muligt tilføjelse af update- og deletechamp hvis layout trænges
  } */
}

function prepareChamps(dataObject) {
  const array = [];
  for (const key in dataObject) {
    const object = dataObject[key];
    object.id = key;
    array.push(object);
  }
  return array;
}

async function deleteChamp(id) {
  const response = await fetch(`${endpoint}/champs/${id}.json`, {
    method: "DELETE",
  });
  if (response.ok) {
    console.log("Champs successfully deleted from Firebase 🔥");

    updateChampsGrid();
  }
}

async function updateChamp(name, description, image, region, sex, species, role, type) {
  const champToUpdate = {
    name,
    description,
    image,
    region,
    sex,
    species,
    role,
    type,
  };
  const json = JSON.stringify(champToUpdate);
  const response = await fetch(`${endpoint}/champs/${id}.json`, {
    method: "PUT",
    body: json,
  });

  // function prepareUpdateChampsData(champ) {
  // const name
  // }

  if (response.ok) {
    updateChampsGrid();
  }
}

async function createChamp(name, description, image, region, sex, species, role, type) {
  const newChamp = {
    name,
    description,
    image,
    region,
    sex,
    species,
    role,
    type,
  };
  const champJson = JSON.stringify(newChamp);
  const response = await fetch(`${endpoint}/champs.json`, {
    method: "POST",
    body: champJson,
  });
  if (response.ok) {
    console.log("New champ succesfully added to Firebase 🔥");
    updateChampsGrid();
  }
}

function searchChamps() {}

function filterChamps() {}

function closeChampDialog() {}
