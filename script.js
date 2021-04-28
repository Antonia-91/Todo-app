// ------- Selectors From DOm ------- //
const addBtn = document.querySelector(".addBtn");
addBtn.addEventListener("click", addElement);

let elements = [];

// -----  GLOBAL VARIABLES ------ //
let userLoggedIn = JSON.parse(localStorage.getItem("keyToUser"));
console.log(userLoggedIn);

// -------- spara inputvalue i en array & LS -------- //
function addElement() {
  let value = document.querySelector(".addText").value.trim();
  if (value != "") {
    elements.push(value);

    localStorage.setItem("keyToElements", JSON.stringify(elements));

    display();
    console.log(localStorage);
  }
}

// -------- varje gång vi refreshar -------- //
window.onload = function () {
  if (JSON.parse(localStorage.getItem("keyToElements")) != null) {
    display();
  }
};

function display() {
  // varje gång func körs så ska den börja med att hämta från LS
  elements = JSON.parse(localStorage.getItem("keyToElements"));

  document.querySelector(".list").innerHTML = "";

  elements.forEach((element, i) => {
    document.querySelector(".list").innerHTML += `
    <div class="element"> 
    ${element} <img class="check" id="${i}" 
    src="./img/checkmark.png"/>
    <img class="trach"  id="${i}"
    src="./img/trash.webp" />
    </div>
        `;
  });
  document.querySelector(".addText").value = "";
}

// ------- global eventlisteners ------- //
document.querySelector("body").addEventListener("click", (event, index) => {
  if (event.target.matches(".trach")) {
    let index = event.target.id;
    elements.splice(index, 1);

    // local Storage - set
    localStorage.setItem("keyToElements", JSON.stringify(elements));

    // prita igen
    display();
  }

  if (event.target.matches(".check")) {
    const check = event.target.parentElement;
    check.classList.toggle("completed");

    // local Storage - set
    localStorage.setItem("keyToElements", JSON.stringify(elements));
  }
});

// ------- Handel login ------- //

// Endpotint Call
function getUser(user) {
  return fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((user) => {
      console.log(user);
      localStorage.setItem("keyToUser", JSON.stringify(user));
      return user;
    });
}
// enevtlister loginBtn
let login = document.getElementById("login-btn");

login.addEventListener("click", () => {
  let inputUsername = document.getElementById("input-username");
  let inputPassword = document.getElementById("input-password");

  if (inputUsername.value.trim() != "" && inputPassword.value.trim() != "") {
    let loginUser = {
      userName: inputUsername.value.trim(),
      password: inputPassword.value.trim(),
    };

    getUser(loginUser).then((user) => {
      userLoggedIn = user;
      updateDom(user);
    });
  }
});

//change H2 to current user
function updateDom(user) {
  document.getElementById(
    "current-user"
  ).innerHTML = `${user[0].userName}s Todo`;
}

fetch("http://localhost:3000/users")
  .then((response) => response.json())
  .then((data) => console.log(data));
