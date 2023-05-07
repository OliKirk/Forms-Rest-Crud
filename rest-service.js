"use strict";
import { prepareChamps } from "./helpers.js";
import { updateChampsGrid } from "./script.js";

const endpoint = "https://my-api-database-ccaf8-default-rtdb.europe-west1.firebasedatabase.app/";

async function getChampsData() {
  const response = await fetch(`${endpoint}/champs.json`);
  const data = await response.json();
  const champs = prepareChamps(data);
  return champs;
}

async function deleteChamp(id) {
  const response = await fetch(`${endpoint}/champs/${id}.json`, {
    method: "DELETE",
  });
  /* return response */
  if (response.ok) {
    console.log("Champs successfully deleted from Firebase 🔥");

    updateChampsGrid();
  }
}

async function updateChamp(id, name, description, image, region, sex, species, role, type) {
  console.log("update champ");
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
export { getChampsData, deleteChamp, updateChamp, createChamp };
