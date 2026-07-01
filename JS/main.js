//Variables
//open-close form
let addBtn = document.querySelector(".add-btn");
let cancel = document.querySelector(".cancel");
let saveBtn = document.querySelector(".save");
let exitIcon = document.querySelector(".fa-x");
let overlay = document.querySelector(".overlay");
//change photo
let inputPhoto = document.querySelector("#img");
let userIcon = document.querySelector(".fa-user");
let photoDiv = document.querySelector(".rounded-photo");
let photo = document.getElementById("preview");
//input validation
let form = document.querySelector("form");
let nameInput = document.querySelector("#name");
let phoneInput = document.querySelector("#phone");
let emailInput = document.querySelector("#email");
let addressInput = document.querySelector("#address");
let groupSelect = document.getElementById("Group");
let notes = document.getElementById("Notes");
let searchBar = document.querySelector("#search");
let fav = document.getElementById("Favourite");
let emrg = document.getElementById("Emergency");

let mode = "add";
let editingIndex = null;

let noContacts = document.querySelector(".no-contact-div");
let contactsCards = document.querySelector(".contacts");
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

let totalcnt = document.querySelectorAll(".total-cnt");
totalcnt.forEach((e) => (e.innerHTML = `${contacts.length}`));
contacts.forEach(renderContact);

updateContactsCards(contacts);

//Functions

//Close Form
function closeForm() {
  const fields = document.querySelectorAll(".field");
  const inputs = document.querySelectorAll("input");
  // =>remove valid and invalid classes from the inputs
  fields.forEach((field) => {
    field.classList.remove("invalid");
    field.classList.remove("valid");
  });
  // =>remove border-color from the inputs
  inputs.forEach((input) => {
    input.classList.remove("field-border");
  });
  overlay.style.display = "none";
  userIcon.style.display = "inline-block";
  inputPhoto.value = "";
  photo.removeAttribute("src");
  form.reset();
}

//validation inputs
// =>invalid
function showError(field) {
  field.classList.add("invalid");
  field.classList.remove("valid");
}
// =>valid
function showSuccess(field) {
  field.classList.add("valid");
  field.classList.remove("invalid");
}
// =>before you visit (Default)
function clearValidation(field) {
  field.classList.remove("invalid");
  field.classList.remove("valid");
}

// Don't remove styling for inputs [valid, invalid]
function listener(validateFunc, inputField) {
  inputField.addEventListener("input", () => validateFunc(inputField));
  inputField.addEventListener("blur", (e) => {
    e.target.classList.add("field-border");
  });
}

// =>>Validation name input
function validateName(nameInput) {
  const field = nameInput.closest(".field");
  const nameValue = nameInput.value.trim();
  const nameRegex = /^[A-Za-z\s]+$/;
  if (nameValue.length === 0) {
    clearValidation(field);
    return false;
  } else if (
    nameValue.length >= 3 &&
    nameValue.length <= 50 &&
    nameRegex.test(nameValue)
  ) {
    showSuccess(field);
    return true;
  } else {
    showError(field);
    return false;
  }
}

// =>>Validation email input
function validateEmail(emailInput) {
  const emailValue = emailInput.value.trim();
  const field = emailInput.closest(".field");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailValue.length === 0) {
    clearValidation(field);
    return false;
  } else if (emailRegex.test(emailValue)) {
    showSuccess(field);
    return true;
  } else {
    showError(field);
    return false;
  }
}

// =>>Validation phone input
function validatePhone(phoneInput) {
  const field = phoneInput.closest(".field");
  const phoneValue = phoneInput.value.trim();
  const phoneRegex = /^01[0125][0-9]{8}$/;
  if (phoneValue.length === 0) {
    clearValidation(field);
    return false;
  } else if (phoneRegex.test(phoneValue)) {
    showSuccess(field);
    return true;
  } else {
    showError(field);
    return false;
  }
}

// =>>Validation address input
function validateAddress(addressInput) {
  const field = addressInput.closest(".field");
  const addressValue = addressInput.value.trim();
  const addressRegex = /^[A-Za-z0-9\s,.-]+$/;
  if (addressValue.length === 0) {
    clearValidation(field);
    return false;
  } else if (addressRegex.test(addressValue) && addressValue.length >= 4) {
    showSuccess(field);
    return true;
  } else {
    showError(field);
    return false;
  }
}

function validateForm() {
  const isNameValid = validateName(nameInput);
  const isEmailValid = validateEmail(emailInput);
  const isPhoneValid = validatePhone(phoneInput);
  const isAddressValid = validateAddress(addressInput);

  return isAddressValid && isEmailValid && isNameValid && isPhoneValid;
}

//check duplicated
function isDuplicatedNumber(phoneValue) {
  return contacts.some((contact, index) => {
    return (
      contact.phone === phoneValue && (index !== editingIndex || mode === "add")
    );
  });
}

//create New contact.
function createContact() {
  // -take inputs.value =>>make object
  let contact = {
    name: nameInput.value.trim(),
    phone: phoneInput.value.trim(),
    email: emailInput.value.trim(),
    address: addressInput.value.trim(),
    relation: groupSelect.value,
    notes: notes.value.trim(),
    favourite: fav.checked,
    emergency: emrg.checked,
    photo: photo.getAttribute("src") || null,
  };
  return contact;
}

//
function updateContactsCards(arr) {
  if (arr.length === 0) {
    noContacts.style.display = "flex";
    contactsCards.style.display = "none";
  } else {
    noContacts.style.display = "none";
    contactsCards.style.display = "grid";
  }
}

//save contact
function saveContact(contact) {
  // -push contact to array and set localStorage
  contacts.push(contact);
  updateContactsCards(contacts);

  totalcnt.forEach((e) => (e.innerHTML = `${contacts.length}`));
  window.localStorage.setItem("contacts", JSON.stringify(contacts));
}

//add card contact in UI
function renderContact(contact, index) {
  // -create div and put div in HTML

  const contactCard = document.createElement("div");
  contactCard.classList.add(
    "contact",
    "rounded",
    "counters",
    "d-flex",
    "gap-10",
    "flex-column",
    "justify-center",
    "align-start",
  );
  contactCard.innerHTML = `
   <div class="d-flex align-center gap-10 justify-start">
                                <div
                                    class="con-img rounded text-center d-flex align-center justify-center position-relative overflow-hidden bold">
                                   ${
                                     contact.photo
                                       ? `<img src="${contact.photo}"alt="Photo of ${contact.name}"class="object-cover w-100 h-100 position-absolute inset-0">`
                                       : `${contact.name.slice(0, 2).toUpperCase()}`
                                   }
                                </div>
                                <div>
                                    <h2>${contact.name}</h2>
                                    <div class="d-flex align-center justify-start">
                                        <div class="con-icon"
                                            style="color:var(--blue-dark); background-color: var(--blue-light);"><i
                                                class="fa-solid fa-phone"></i>
                                        </div>
                                        <span>${contact.phone}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex align-center ">
                                <div class="con-icon envelope-static"><i class="fa-solid fa-envelope"></i></div>
                                <span>${contact.email}</span>
                            </div>
                            <div class="d-flex align-center ">
                                <div class="con-icon location"><i class="fa-solid fa-location-dot"></i></div>
                                <span>${contact.address}</span>
                            </div>
                            <span class="con-icon relation "
                                style="padding: 10px; font-size: var(--fz-12);">${contact.relation}</span>
                            <div class="d-flex align-center ">
                                <div class="con-icon envelope-static"><i class="fa-regular fa-note-sticky"></i></div>
                                <span>${contact.notes ? contact.notes : "No notes"}</span>
                            </div>    
                            <div class="line w-100" style="height: 2px; background-color: var(--bg-color);"></div>
                            <div class="d-flex align-center justify-between w-100">
                                <div class="d-flex align-center ">
                                    <div class="con-icon phone cursor-pointer"><a href="tel:+"><i class="fa-solid fa-phone"></i></a></div>
                                    <div class="con-icon envelope cursor-pointer"><a href="mailto:"><i class="fa-solid fa-envelope"></i></a></div>
                                </div>
                                <div class="d-flex align-center ">
                                    <div class="con-icon star cursor-pointer"><i class="fa-solid fa-star"></i></div>
                                    <div class="con-icon heart cursor-pointer"><i class="fa-solid fa-heart-pulse"></i>
                                    </div>
                                    <div class="con-icon pen cursor-pointer"><i class="fa-solid fa-pen"></i></div>
                                    <div class="con-icon trash cursor-pointer"><i class="fa-solid fa-trash"></i></div>
                                </div>
                            </div>
  `;
  let trashIcon = contactCard.querySelector(".trash");
  trashIcon.addEventListener("click", (e) => {
    Swal.fire({
      title: "Delete Contact?",
      text: `Are you sure you want to delete ${contact.name}? This action can't be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#177A4C",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your Contact has been deleted.",
          icon: "success",
        });
        contacts.splice(index, 1);
        totalcnt.forEach((e) => (e.innerHTML = `${contacts.length}`));
        contactCard.remove();
        updateContactsCards(contacts);
        localStorage.setItem("contacts", JSON.stringify(contacts));
      }
    });
  });

  let editIcon = contactCard.querySelector(".pen");
  editIcon.addEventListener("click", (e) => {
    mode = "edit";
    editingIndex = index;
    fillForm(contact);
    overlay.style.display = "flex";
  });

  contactsCards.appendChild(contactCard);
}

// => when open form by using editIcon
function fillForm(contact) {
  nameInput.value = contact.name;
  phoneInput.value = contact.phone;
  emailInput.value = contact.email;
  addressInput.value = contact.address;
  groupSelect.value = contact.relation;
  notes.value = contact.notes;
  fav.checked = contact.favourite;
  emrg.checked = contact.emergency;
  photo.src = contact.photo;
}

// =>>SUBMIT FORM
saveBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (validateForm()) {
    // all inputs are valid
    if (mode === "edit") {
      contacts[editingIndex] = createContact();
      closeForm();
      form.reset();
      localStorage.setItem("contacts", JSON.stringify(contacts));
      Swal.fire({
        title: "Updated!",
        text: "Contact has been updated successfully.",
        icon: "success",
      });
      mode = "add";
      editingIndex = null;
      contactsCards.innerHTML = "";
      contacts.forEach(renderContact);
    } else if (isDuplicatedNumber(phoneInput.value.trim())) {
      // =>Duplicated number
      const duplicatedContact = contacts.find(
        (contact) => contact.phone === phoneInput.value.trim(),
      );
      Swal.fire({
        title: "Duplicate Phone Number!",
        text: `A contact with phone number already exists: ${duplicatedContact.name}.`,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#C72E2E",
      });
      closeForm();
    } else {
      // => add contact
      const contact = createContact();
      saveContact(contact);
      Swal.fire({
        title: "Added",
        text: "Contact has been added successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      contactsCards.innerHTML = "";
      contacts.forEach(renderContact);
      closeForm();
    }
  } else {
    //if there is at least one input is invalid
    Swal.fire({
      icon: "error",
      title: "Invalid Operation!",
      text: "Please, edit the fields to be as required or close the form.",
      confirmButtonText: "Edit",
      showCancelButton: true,
      cancelButtonText: "Close",
      cancelButtonColor: "#C72E2E",
    }).then((result) => {
      //=>cancel button
      if (result.dismiss === Swal.DismissReason.cancel) {
        closeForm();
      }
      //edit button
      if (result.isConfirmed) {
        return;
      }
    });
  }
});

// __________________________________________________________________________
//Main Logic

// =>Open Form
addBtn.addEventListener("click", function () {
  overlay.style.display = "flex";
});

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
  const file = inputPhoto.files[0];

  if (!file) {
    userIcon.style.display = "inline-block";
    photo.removeAttribute("src");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    photo.src = e.target.result;
    userIcon.style.display = "none";
  };

  reader.readAsDataURL(file);
});

// =>UI name input
listener(validateName, nameInput);

// =>UI email input
listener(validateEmail, emailInput);

// =>UI phone input
listener(validatePhone, phoneInput);

// =>UI address input
listener(validateAddress, addressInput);

//=>>searchBar
searchBar.addEventListener("input", function () {
  const searchVal = searchBar.value.toLowerCase().trim();
  const requiredContacts = contacts.filter((contact) => {
    return (
      contact.name.toLowerCase().includes(searchVal) ||
      contact.email.toLowerCase().includes(searchVal) ||
      contact.phone.toLowerCase().includes(searchVal)
    );
  });
  contactsCards.innerHTML = "";
  updateContactsCards(requiredContacts);
  requiredContacts.forEach(renderContact);
});
