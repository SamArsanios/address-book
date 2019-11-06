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
