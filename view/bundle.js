(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Store = require("./model/Store");

// UI Class: Handle UI Tasks
class UI {
  static displayContacts() {
    const contacts = Store.Store.getContacts();
    contacts.forEach(contact => UI.addContactToList(contact));
  }

  // Function to create a row and populate it with data
  static addContactToList(contact) {
    const list = document.querySelector("#phonebook-list");

    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${contact.name}</td>
          <td>${contact.phonenumber}</td>
          <td><a href="#" class="btn btn-info btn-sm update">Edit</a></td>
          <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
      `;

    list.appendChild(row);
  }

  // Function to show message on the browser after an acion is performed
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    const form = document.querySelector("#phonebook-form");
    container.insertBefore(div, form);

    //Disappear in 3 Seconds
    setTimeout(() => document.querySelector(".alert").remove(), 1000);
  }

  //method to update contact
  static updateContactList(element, shm, number, getContactToUpdate) {
    if (element.classList.contains("update")) {
      //   element.parentElement.parentElement.updateContact();

      document.getElementById("name").value = shm;
      document.getElementById("phonenumber").value = number;

      getContactToUpdate(shm, number);
      document.getElementById('btnSubmit').value = 'save changes';

      console.log(shm, number);
    }
  }

  static myFunction() {
    const node = document.getElementById("#name").value;
    const node2 = document.getElementById("#phonenumber").value;
    // var textnode = document.createTextNode("Water");
    var item = document.getElementById("#phonebook-list").childNodes[0];
    item.replaceChild(node, item);

    console.log(node);
  }

  //method to delete contact
  static deleteContact(element) {
    if (element.classList.contains("delete")) {
      element.parentElement.parentElement.remove();
    }
  }

  //method to clear form input
  static clearFields() {
    document.querySelector("#name").value = "";
    document.querySelector("#phonenumber").value = "";
  }
}

module.exports = { UI };

},{"./model/Store":2}],2:[function(require,module,exports){
const importsUI = require("../UI");

//Storage Class: Handles Storage
class Store {
  constructor() {
    if (Store.instance) {
      return Store.instance;
    }

    Store.instance = this;
    this.updateArray = [];
    this.updateValue = {
      name: "",
      phonenumber: ""
    };
  }

  static getInstance() {
    return new Store();
  }

  static getContacts() {
    let contacts;
    if (localStorage.getItem("contacts") === null) {
      contacts = [];
    } else {
      contacts = JSON.parse(localStorage.getItem("contacts"));
    }
    return contacts;
  }

  static addContact(contact) {
    // if (contact == null) {
    //   const contacts = Store.getContacts();
    //   contacts.push(contact);
    //   localStorage.setItem("contacts", JSON.stringify(contacts));
    // }

    // else {

    if (document.getElementById("btnSubmit").value === "save changes") {
      console.log(Store.getInstance().updateArray);

      Store.getInstance().updateArray.forEach((e, index) => {
        if (e["phonenumber"] == Store.getInstance().updateValue.phonenumber) {
          // console.log('indexing',index,e)
          e["name"] = document.getElementById("name").value;
          e["phonenumber"] = document.getElementById("phonenumber").value;

          console.log(e);
        }
      });

      localStorage.setItem(
        "contacts",
        JSON.stringify(Store.getInstance().updateArray)
      );
    } else {
      const contacts = Store.getContacts();
      contacts.push(contact);
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }

    document.getElementById("btnSubmit").value = "Add Contact";
  }

  //method to update contact
  static updateContact(shm, number) {
    const allContactsLocal = JSON.parse(localStorage.getItem("contacts"));
    const theArray = [];
    // console.log('arr', allContactsLocal);

    for (let [k, v] of Object.entries(allContactsLocal)) {
      Store.getInstance().updateArray.push(v);

      console.log("Key " + k + " Value " + v);

      if (v["phonenumber"] === number) {
        console.log("from ", v);
        Store.getInstance().updateValue = v;
      }
    }

    // }
  }

  static removeContact(phonenumber) {
    const contacts = Store.getContacts();

    contacts.forEach((contact, index) => {
      if (contact.phonenumber === phonenumber) {
        contacts.splice(index, 1);
      }
    });
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
}

module.exports = { Store };

},{"../UI":1}],3:[function(require,module,exports){
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

},{"../UI":1,"../model/Store":2}]},{},[3]);
