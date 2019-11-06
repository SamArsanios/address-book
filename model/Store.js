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
