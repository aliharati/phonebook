const Notification = ({ message }) => {
  const notifStyle = {
    color: "#006400",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    borderColor: "#006400",
    padding: 10,
    marginBottom: 10,
  };
  if (message === null) {
    return null;
  }

  return <div style={notifStyle}>{message}</div>;
};

export default Notification;
