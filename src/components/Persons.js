const Persons = ({ contact, deleteNumber }) => {
  return (
    <li>
      {contact.name} : {contact.number}
      <button onClick={deleteNumber}>delete</button>
    </li>
  );
};

export default Persons;
