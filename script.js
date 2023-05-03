"use strict";

const endpoint = "https://my-api-database-ccaf8-default-rtdb.europe-west1.firebasedatabase.app/";
let champs;

window.addEventListener("load", initApp);

function initApp() {
  console.log("initApp is running 🎉");
  updateChampsGrid();
  document.querySelector("#create-champ-btn").addEventListener("click", showCreateChampDialog);
  document.querySelector("#form-create-champ .btn-cancel").addEventListener("click", createCancelClicked); 
  document.querySelector("#form-create-champ").addEventListener("submit", createChampClicked);
  document.querySelector("#form-delete-champ").addEventListener("submit", deleteChampClicked);
  document.querySelector("#form-delete-champ .btn-cancel").addEventListener("click", deleteCancelClicked); // filter / imput
  document.querySelector("#form-update-champ").addEventListener("submit", updateChampClicked);
  document.querySelector("#select-sort-by").addEventListener("change", sortByChanged);
  document.querySelector("#input-search").addEventListener("keyup", inputSearchChanged);
  document.querySelector("#input-search").addEventListener("search", inputSearchChanged);
}

async function updateChampsGrid() {
  console.log("update grid");
  champs = await getChampsData();
  showChamps(champs);
}

async function getChampsData() {
  const response = await fetch(`${endpoint}/champs.json`);
  const data = await response.json();
  const champs = prepareChamps(data);
  return champs;
}

function showChamps(listOfChamps) {
  document.querySelector("#champ-data").innerHTML = "";
  for (const champ of listOfChamps) {
    showChamp(champ);
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
  document.querySelector("#champ-data article:last-child .delete-btn").addEventListener("click", deleteClicked);
  document.querySelector("#champ-data article:last-child .update-btn").addEventListener("click", updateClicked);
  document.querySelector("#champ-data article:last-child .body").addEventListener("click", openChampDialog);

  function openChampDialog() {
    console.log("Open dialog / detail view");
    const myHTML = /*HTML*/ `<article id="champinfo"> 
    <h2>Name: ${champ.name}</h2>
    <img class="champinfo-img" src=${champ.image}>
    <p>Description: ${champ.description}</p>
    <p>Region: ${champ.region}</p>
    <p>Sex: ${champ.sex}</p>
    <p>Species: ${champ.species}</p>
    <p>Role: ${champ.role}</p>
    <p>Type: ${champ.type}</p>
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
  function updateClicked() {
    console.log("update clicked");
    const updateForm = document.querySelector("#form-update-champ");
    updateForm.description.value = champ.description;
    updateForm.image.value = champ.image;
    updateForm.region.value = champ.region;
    updateForm.sex.value = champ.sex;
    updateForm.species.value = champ.species;
    updateForm.role.value = champ.role;
    updateForm.type.value = champ.type;
    updateForm.setAttribute("data-id", champ.id);
    document.querySelector("#dialog-update-champ").showModal();
  }

  function deleteClicked() {
    console.log("deleteClicked");
    document.querySelector("#dialog-delete-champ-name").textContent = champ.title;
    document.querySelector("#form-delete-champ").setAttribute("data-id", champ.id);
    document.querySelector("#dialog-delete-champ").showModal();
  }
}

function updateChampClicked(event) {
  console.log("update champ clicked");
  const form = event.target;
  const name = form.name.value;
  const description = form.description.value;
  const image = form.image.value;
  const region = form.region.value;
  const sex = form.sex.value;
  const species = form.species.value;
  const role = form.role.value;
  const type = form.type.value;
  const id = form.getAttribute("data-id");
updateChamp(id, name, description, image, region, sex, species, role, type);
}

function showCreateChampDialog() {
  console.log("create champ clicked");
  document.querySelector("#dialog-create-champ").showModal();
}

function deleteCancelClicked() {
  document.querySelector("#dialog-delete-champ").close();
}

function createCancelClicked() {
  document.querySelector("#dialog-create-champ").close();
}

async function createChampClicked(event) {
  const form = event.target;
  const name = form.name.value;
  const description = form.description.value;
  const image = form.image.value;
  const region = form.region.value;
  const sex = form.sex.value;
  const species = form.species.value;
  const role = form.role.value;
  const type = form.type.value;
  const response = await createChamp(name, description, image, region, sex, species, role, type);
  if (response.ok) {
    updateChampsGrid();
    form.reset();
  }
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

function deleteChampClicked(event) {
  const id = event.target.getAttribute("data-id");
  deleteChamp(id);
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

async function updateChamp(id, name, description, image, region, sex, species, role, type) {
  console.log("update champ")
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
  const champJson = JSON.stringify(champToUpdate);
  const response = await fetch(`${endpoint}/champs/${id}.json`, {
    method: "PUT",
    body: champJson,
  });
/* return response; */
  if (response.ok) {
    updateChampsGrid();
  } 
}

async function createChamp(name, description, image, region, sex, species, role, type) {
  console.log("create champ");
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
  return response;
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

function inputSearchChanged(event) {
  const value = event.target.value;
  const champsShow = searchChamps(value);
  showChamps(champsShow);
}

function compareName(champ1, champ2) {
  console.log("compare name")
  return champ1.name.localeCompare(champ2.name);
}

function compareRole(champ1, champ2) {
  return champ1.role.localeCompare(champ2.role);
}