const addBtn = document.querySelector(".addBtn");
addBtn.addEventListener("click", addElement);

let elements = [];

// -- spara inputvalue i en array & LS-- //
function addElement() {
  let value = document.querySelector(".addText").value.trim();
  if (value != "") {
    elements.push(value);

    localStorage.setItem("keyToElements", JSON.stringify(elements));

    display();
    console.log(localStorage);
  }
}

// -- varje gång vi refreshar -- //
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

// global eventlisteners
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
