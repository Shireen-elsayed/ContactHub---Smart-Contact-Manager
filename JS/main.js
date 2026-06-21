//Variables

let addBtn = document.querySelector(".add-btn");
let cancel = document.querySelector(".cancel");
let exitIcon = document.querySelector(".fa-x");
let overlay = document.querySelector(".overlay");

//Functions

//Close Form
function closeForm() {
  overlay.style.display = "none";
}

//Main Logic

//Open Form
addBtn.onclick = function () {
  overlay.style.display = "flex";
};

//Close Form

cancel.addEventListener("click", closeForm);
exitIcon.addEventListener("click", closeForm);

// if i click on any point outside form => Close Form
overlay.addEventListener("click", function (e) {
  if (e.target === overlay) closeForm();
});

// if click Esc on the Keyboard => Close Form
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeForm();
});
