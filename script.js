"use strict";

const endpoint = "https://my-api-database-ccaf8-default-rtdb.europe-west1.firebasedatabase.app/";
let champs;

window.addEventListener("load", initApp);

function initApp() {
  console.log("initApp is running 🎉");
  updateChampsGrid();
  // document.querySelector("#dialog-update-btn").addEventListener("click", updateChamp());
document
  .querySelector("#create-champ-btn")
  .addEventListener("click", showCreateChampDialog)
document
  .querySelector("#form-create-champ")
  .addEventListener("submit", createChampClicked)
document
  .querySelector("#form-delete-champ")
  .addEventListener("submit", deleteChampClicked);
document
  .querySelector("#form-delete-champ .btn-cancel")
  .addEventListener("click", deleteCancelClicked);  // filter / imput
document
  .querySelector("#select-sort-by")
  .addEventListener("change", sortByChanged);
document
  .querySelector("#input-search")
  .addEventListener("keyup", inputSearchChanged);
document
  .querySelector("#input-search")
  .addEventListener("search", inputSearchChanged);
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
  document.querySelector("#champ-data article:last-child .delete-btn").addEventListener("click", deleteClicked);
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

  function deleteClicked() {
    console.log("deleteClicked");
    document.querySelector("#dialog-delete-champ-name").textContent = champ.title;
    document.querySelector("#form-delete-champ").setAttribute("data-id", champ.id);
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

function showCreateChampDialog() {
  console.log("create champ clicked");
  document.querySelector("#dialog-create-champ").showModal();
}

function deleteCancelClicked() {
  document.querySelector("#dialog-delete-champ").close(); // close dialog
}
function createCancelClicked(){
  document.querySelector("#dialog-create-champ").close()
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
  /* if (response.ok) {
    console.log("New champ succesfully added to Firebase 🔥");
    updateChampsGrid();
  } */
  return response
}

// ============= Filter / sort by ===============

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

  if (selectedValue === "title") {
    champs.sort(compareTitle);
  } else if (selectedValue === "body") {
    champs.sort(compareBody);
  }

  showChamps(champs);
}

function inputSearchChanged(event) {
  const value = event.target.value;
  const champsShow = searchChamps(value);
  showChamps(champsShow);
}

function compareTitle(champ1, champ2) {
  return champ1.title.localeCompare(champ2.title);
}

function compareBody(champ1, champ2) {
  return champ1.body.localeCompare(champ2.body);
}
