import axios from 'axios';
import {
  fetchContactRequest,
  fetchContactSuccess,
  fetchContactError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  updateContactRequest,
  updateContactSuccess,
  updateContactError,
} from './phonebook-actions';

// axios.default.baseURL = 'http://localhost:4040';

const fetchContacts = () => dispatch => {
  dispatch(fetchContactRequest());

  axios
    .get('/contacts')
    .then(({ data }) => dispatch(fetchContactSuccess(data)))
    .catch(error => dispatch(fetchContactError(error.message)));
};

const addContact = contact => dispatch => {
  const newContact = { name: contact.name, number: contact.number };
  dispatch(addContactRequest());

  axios
    .post('/contacts', newContact)
    .then(({ data }) => dispatch(addContactSuccess(data)))
    .catch(error => dispatch(addContactError(error.message)));
};

const deleteContact = id => dispatch => {
  dispatch(deleteContactRequest());

  axios
    .delete(`/contacts/${id}`)
    .then(() => dispatch(deleteContactSuccess(id)))
    .catch(error => dispatch(deleteContactError(error.message)));
};

const updateContact = contact => dispatch => {
  const { id, name, number } = contact;
  const updateContact = { name, number };
  dispatch(updateContactRequest());

  axios
    .patch(`/contacts/${id}`, updateContact)
    .then(data => dispatch(updateContactSuccess(data)))
    .catch(error => dispatch(updateContactError(error.message)));
};

export default { addContact, deleteContact, fetchContacts, updateContact };
