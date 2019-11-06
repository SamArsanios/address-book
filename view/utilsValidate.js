const handlesUI = require("../UI");
const Store = require("../model/Store");

//Phone Book Class: Represents a phone book
class Contact {
  constructor(name, phonenumber) {
    this.name = name;
    this.phonenumber = phonenumber;
  }
}

//Event: Display Phonebook
document.addEventListener("DOMContentLoaded", handlesUI.UI.displayContacts);

//Event: Add a contact
document.querySelector("#phonebook-form").addEventListener("submit", e => {
  //prevent submit
  e.preventDefault();

  //Get form values
  const name = document.querySelector("#name").value;
  const phonenumber = document.querySelector("#phonenumber").value;

  //Validate
  if (name === "" || phonenumber === "") {
    handlesUI.UI.showAlert("Please fill in all the fields.", "danger");
  } else {
    //Instantiate contact
    const contact = new Contact(name, phonenumber);

    console.log(contact);

    //Adding contact to handlesUI.UI
    handlesUI.UI.addContactToList(contact);

    // Add contact to Store
    Store.Store.addContact(contact);
    document.querySelector("#phonebook-list").textContent = '';
    handlesUI.UI.addContactToList(contact);
      

    //Update

    //show success message
    handlesUI.UI.showAlert("Contact added Successfully", "success");

    //Clear all Fields
    handlesUI.UI.clearFields();
  }
});

//Event: Update a contact

// document.querySelector("#phonebook-list").addEventListener("click", e => {
//   console.log(e.target);
// });
//Event: Remove a Contact
document.querySelector("#phonebook-list").addEventListener("click", e => {
  console.log(e.target);
  // // console.log(
  //   e.target.parentElement.previousElementSibling.previousElementSibling
  // );

  // console.log(e.target.parentElement.previousElementSibling);
  //Update contact form


  

  console.log(
    handlesUI.UI.updateContactList(
      e.target,
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent,
      e.target.parentElement.previousElementSibling.textContent
  ,
  
  Store.Store.updateContact
  )
  );



  // handlesUI.UI.showAlert("Contact Updated", "update");

  //Delete contact from from handlesUI.UI
  handlesUI.UI.deleteContact(e.target);

  //Delete contact from store
  Store.Store.removeContact(
    e.target.parentElement.previousElementSibling.previousElementSibling
      .textContent
  );

  //show success message
  handlesUI.UI.showAlert("Contact Removed", "success");
  //Clear all Fields
});

//get input element
let searchInput = document.getElementById("searchInput");

// add event listener
searchInput.addEventListener("keyup", filterNames);

function filterNames() {
  // console.log("Searching...");

  // Get value of input
  let filterValue = document.getElementById("searchInput").value;
  console.log(filterValue);

  //get names
  let row = document.getElementById("phonebook-list");

  // get items
  let names = row.querySelectorAll("tr");

  //loop through collection-item
  for (let i = 0; i < names.length; i++) {
    let a = names[i].getElementsByTagName("a")[0];

    if (a.innerHTML.indexOf(filterValue) > -1) {
      names[i].style.display = "";
    } else {
      names[i].style.display = "none";
    }
  }
}
