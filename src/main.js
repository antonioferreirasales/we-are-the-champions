import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const endorsementTextEl = document.querySelector("#endorsement-text")
const buttonEl = document.querySelector("#publish-bttn")
const endorsementListEl = document.querySelector("#endorsement-list")

const appSettings = {
  databaseURL:"https://playground-938d9-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsDB = ref(database, "endorsements")



buttonEl.addEventListener("click", function() {
  let currentInput = endorsementTextEl.value
  push(endorsementsDB, currentInput)
  clearInputField()
})


function clearInputField() {
  endorsementTextEl.value = ""
}

function clearEndorsementList() {
  endorsementListEl.innerHTML = ""
}

onValue(endorsementsDB, function(snapshot) {
  if(snapshot.exists()) {
    clearEndorsementList()
    let itemsArray = Object.entries(snapshot.val())
    for (let i = 0; i < itemsArray.length; i++) {
      appendItem(itemsArray[i])
    }
  } else {
    endorsementListEl.innerHTML = `<h4 id="no-items">No items in the snapshot.<h4>`
  }
}) 

function appendItem(input) {
  const itemKey = input[0]
  const itemValue = input[1]
  const listElement = document.createElement("li")
  listElement.textContent = itemValue
  endorsementListEl.appendChild(listElement) 
}