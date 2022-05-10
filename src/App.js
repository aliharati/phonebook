import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/Form";
import Persons from "./components/Persons";
import contactService from "./services/contacts";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searched, setSearched] = useState(persons);
  const [filter, setFilter] = useState("");

  const hook = () => {
    contactService.getAll().then((contacts) => {
      setPersons(contacts);
      setSearched(contacts);
    });
  };
  useEffect(hook, []);

  const addNewNames = (event) => {
    event.preventDefault();
    if (persons.filter((person) => person === newName).length !== 0) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else if (newName === "" && newNumber === "") {
      alert("please enter a name and a number");
    } else if (newName === "") {
      alert("please enter a name for your contact");
    } else if (newNumber === "") {
      alert("please enter a number for your contact");
    } else {
      const contactObject = {
        name: newName,
        number: newNumber,
      };
      contactService.create(contactObject).then((returnedContact) => {
        setPersons(persons.concat(returnedContact));
        setSearched(persons.concat(returnedContact));
        setNewName("");
        setFilter("");
        setNewNumber("");
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
  const deleteContact = (id) => {
    contactService.deleteId(id);
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
            deleteNumber={() => deleteContact(contact.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
