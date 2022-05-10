import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (contactObject) => {
  const request = axios.post(baseUrl, contactObject);
  return request.then((response) => response.data);
};

const deleteId = (id) => {
  axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, deleteId };
