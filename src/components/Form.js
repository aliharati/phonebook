const PersonForm = ({
  formFunction,
  name,
  number,
  nameFunction,
  numberFunction,
}) => {
  return (
    <div>
      <form onSubmit={formFunction}>
        <div>
          name: <input value={name} onChange={nameFunction} />
        </div>
        <div>
          number: <input value={number} onChange={numberFunction} />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  );
};

export default PersonForm;
