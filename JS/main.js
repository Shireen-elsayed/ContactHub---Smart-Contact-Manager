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


//validation inputs
function validInput(input, stat) {
  let field = input.parentElement.parentElement;
  let success = field.querySelector(".success");
  let error = field.querySelector(".error");
  let warning = field.querySelector(".warning");

  if (stat == "valid") {
    // success input
    input.style.cssText = "border-color:var(--green-dark);";
    success.style.display = "inline-block";
    error.style.display = "none";
    warning.style.display = "none";
  } else if (stat == "invalid") {
    //failed input
    input.style.cssText = "border-color:var(--red-dark);";
    error.style.display = "inline-block";
    warning.style.display = "block";
    success.style.display = "none";
  } else {
    //default input
    input.style.cssText = "border-color:var(--gray-dark);";
    success.style.display = "none";
    error.style.display = "none";
    warning.style.display = "none";
  }
}

let name = document.querySelector("#name");
let phone = document.querySelector("#phone");
let email = document.querySelector("#email");
let address = document.querySelector("#address");

validInput(name, function () {
  if (name.value.length > 1 && name.value.length < 51) return "valid";
  else return "invalid";
});
console.log(typeof "valid");
console.log(typeof function () {});



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
