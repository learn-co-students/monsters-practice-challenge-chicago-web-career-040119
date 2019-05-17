//When the page loads, show the first 50 monsters.
//Each monster's name, age, and description should be shown.
document.addEventListener('DOMContentLoaded', () => {
  const monsterContainer = document.querySelector('#monster-container')

  fetch('http://localhost:3000/monsters?_limit=50')
    .then(resp => resp.json())
    .then(parsedJson => {
    parsedJson.forEach(monster => monsterContainer.appendChild(displayMonster(monster)))
  })
})

function displayMonster(monster) {
  //create the nodes
  let div = document.createElement('div')
  let monsterName = document.createElement('h1')
  let monsterAge = document.createElement('h3')
  let monsterDesc = document.createElement('h3')
  //create text node - append text node to the each node
  monsterName.innerText = monster.name
  monsterAge.innerText = monster.age
  monsterDesc.innerText = monster.description
  //finally append the nodes to the div
  div.appendChild(monsterName)
  div.appendChild(monsterAge)
  div.appendChild(monsterDesc)

  return div
}
//form to create a new monster.
//You should have fields for name, age, and description, and a 'Create Monster Button'.
// When you click the button, the monster should be added to the list and saved in the API.
const monsterForm = document.querySelector('form')
monsterForm.addEventListener('submit', createMonster)

function createMonster(monster) {
  event.preventDefault()

  let monsterName = document.getElementById('name-input').value
  let monsterAge = document.getElementById('age-input').value
  let monsterDesc = document.getElementById('description-input').value

  fetch('http://localhost:3000/monsters'), {
    method: "POST",
    headers: { "Content-Type": 'application/json',
              "Accept": 'application/json'
    },
    body: JSON.stringify({
      name: monsterName,
      age: monsterAge,
      description: monsterDesc
    })
  }
}

//At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.
//To be continued...
