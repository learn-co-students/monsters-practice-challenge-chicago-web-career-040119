/// Global Variables ///
const monsterContainer = document.getElementById("monster-container");
const forward = document.getElementById("forward");
const back = document.getElementById("back");
const form = document.getElementById("monster-form");
let currentPage = 0;


/// GET Request ///
fetch("http://localhost:3000/monsters")
  .then( resp => resp.json() )
  .then( monsters => {
    createElements(monsters);
    limit50(currentPage);
  });

function postReq() {
  let name = document.getElementById("name");
  let age = document.getElementById("age");
  let description = document.getElementById("description");
  let formData = {
    name: name.value,
    age: age.value,
    description: description.value
  }

  let postObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch("http://localhost:3000/monsters", postObj)
    .then( resp => resp.json() )
    .catch( errors => document.body.innerHTML = errors.message );
};


function createElements(monsters) {
  for (monster of monsters) {
    let div = document.createElement("div");
    let name = document.createElement("h2");
    let age = document.createElement("h4");
    let bio = document.createElement("p");
    name.innerHTML = monster.name;
    age.innerHTML = `Age: ${Math.round(monster.age)}`;
    bio.innerHTML = `Bio: ${monster.description}`;
    div.style.display = "none";
    div.appendChild(name);
    div.appendChild(age);
    div.appendChild(bio);
    monsterContainer.appendChild(div);
  }
};

function limit50(input) {
  allDivs = monsterContainer.children
  for (let i = 0; i < allDivs.length; i ++) {
    i >= input * 50 && i < (input + 1) * 50 ? allDivs[i].style.display = "block" : allDivs[i].style.display = "none"
  };
};

function forwardClick() {
  let totalPageCount = (Math.ceil(monsterContainer.childElementCount / 50)) - 1;
  if (currentPage < totalPageCount) {
    currentPage += 1;
    limit50(currentPage);
  }
};

function backClick() {
  if (currentPage > 0) {
    currentPage -= 1;
    limit50(currentPage);
  }
};

/// EVENT LISTENERS ///
forward.addEventListener("click", forwardClick);
back.addEventListener("click", backClick);
form.addEventListener("submit", postReq );
