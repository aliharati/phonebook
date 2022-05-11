import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/Form";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import Error from "./components/Error";
import contactService from "./services/contacts";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searched, setSearched] = useState(persons);
  const [filter, setFilter] = useState("");
  const [notif, setNotif] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const hook = () => {
    contactService.getAll().then((contacts) => {
      setPersons(contacts);
      setSearched(contacts);
    });
  };
  useEffect(hook, []);

  const addNewNames = (event) => {
    event.preventDefault();
    if (persons.filter((person) => person.name === newName).length !== 0) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const contact = persons.find((person) => person.name === newName);
        const changedContact = { ...contact, number: newNumber };
        contactService
          .update(contact.id, changedContact)
          .then((returnedContact) => {
            setPersons(
              persons.map((person) =>
                person.id !== contact.id ? person : returnedContact
              )
            );
            setSearched(
              persons.map((person) =>
                person.id !== contact.id ? person : returnedContact
              )
            );
            setNewName("");
            setFilter("");
            setNewNumber("");
          })
          .catch((error) => {
            giveErrorNotif(changedContact.name);
            contactService.getAll().then((contacts) => {
              setPersons(contacts);
              setSearched(contacts);
            });
          });
      }
      setNewName("");
      setNewNumber("");
    } else if (newName === "" && newNumber === "") {
      alert("please enter a name and a number");
    } else if (newName === "") {
      alert("please enter a name for your contact");
    } else if (newNumber === "") {
      alert("please enter a number for your contact");
    } else {
      let newId = uuidv4();
      const contactObject = {
        name: newName,
        number: newNumber,
        id: newId,
      };
      contactService.create(contactObject).then((returnedContact) => {
        setPersons(persons.concat(returnedContact));
        setSearched(persons.concat(returnedContact));
        setNewName("");
        setFilter("");
        setNewNumber("");
        giveAddNotif(returnedContact.name);
      });
    }
  };
  const handleNewName = (event) => {
    setNewName(event.target.value);
  };
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const filterContacts = (event) => {
    setFilter(event.target.value);
    setSearched(
      persons.filter((person) =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };
  const deleteContact = (id, name) => {
    let itemIndex = persons.findIndex((contact) => contact.id === id);
    let newContacts = [].concat(persons);
    newContacts.splice(itemIndex, 1);
    if (window.confirm(`Delete ${name} ?`)) {
      contactService.deleteId(id);
      setPersons(newContacts);
      setSearched(newContacts);
    }
  };
  const giveAddNotif = (name) => {
    setNotif(`Added ${name}`);
    setTimeout(() => {
      setNotif(null);
    }, 5000);
  };

  const giveErrorNotif = (name) => {
    setErrorMessage(
      `Information of ${name} has already been removed from server`
    );
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notif} />
      <Error message={errorMessage} />
      <Filter value={filter} changeFunction={filterContacts} />

      <h2>add a new</h2>
      <PersonForm
        formFunction={addNewNames}
        name={newName}
        number={newNumber}
        nameFunction={handleNewName}
        numberFunction={handleNewNumber}
      />

      <h2>Numbers</h2>
      <ul>
        {searched.map((contact) => (
          <Persons
            key={contact.id}
            contact={contact}
            deleteNumber={() => deleteContact(contact.id, contact.name)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
