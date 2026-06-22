//Variables
//open-close form
let addBtn = document.querySelector(".add-btn");
let cancel = document.querySelector(".cancel");
let exitIcon = document.querySelector(".fa-x");
let overlay = document.querySelector(".overlay");
//change photo
let inputPhoto = document.querySelector("#img");
let userIcon = document.querySelector(".fa-user");
let photoDiv = document.querySelector(".rounded-photo");
let photo = document.getElementById("preview");
//input validation

//Functions

//Close Form
function closeForm() {
  overlay.style.display = "none";
}


//Main Logic

// =>Open Form
addBtn.onclick = function () {
  overlay.style.display = "flex";
};

// =>Close Form
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

// =>Put image in the div instead of userIcon
inputPhoto.addEventListener("change", function () {
  let file = inputPhoto.files[0];
  if (file) {
    photo.src = URL.createObjectURL(file);
    console.log(photo.src);

    userIcon.style.display = "none";
  }
});
