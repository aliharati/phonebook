const Persons = ({ list }) => {
  return (
    <ul>
      {list.map((person) => (
        <li key={person.id}>
          {person.name} : {person.number}
        </li>
      ))}
    </ul>
  );
};

export default Persons;
