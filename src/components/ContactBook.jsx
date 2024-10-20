import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact, setFilter } from './contactsSlice';
//import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

const ContactBook = () => {
  const dispatch = useDispatch();
  const { contacts, filter } = useSelector(state => state);
  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      JSON.parse(storedContacts).forEach(contact => {
        dispatch(addContact(contact));
      });
    }
  }, [dispatch]);

  const handleFormSubmit = event => {
    event.preventDefault();

    const newContact = {
      id: Date.now().toString(),
      name,
      number,
    };

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (existingContact) {
      alert(`${newContact.name} is already in contacts!`);
      return;
    }

    dispatch(addContact(newContact));
    setName('');
    setNumber('');
  };

  const handleFind = event => {
    dispatch(setFilter(event.target.value));
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <form
        onSubmit={handleFormSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label>Name</label>
        <input
          style={{ width: 'fit-content' }}
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <label>Number</label>
        <input
          style={{ width: 'fit-content' }}
          type="tel"
          value={number}
          onChange={e => setNumber(e.target.value)}
          required
        />
        <button
          type="submit"
          style={{ marginTop: '20px', width: 'fit-content' }}
        >
          Add Contact
        </button>
      </form>
      <h1>Contacts</h1>
      <label style={{ paddingRight: '15px' }}>Find contacts by name</label>
      <input type="text" value={filter} onChange={handleFind} />
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <button
              onClick={() => handleDeleteContact(contact.id)}
              style={{ marginLeft: '15px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function App() {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <ContactBook />
    </PersistGate>
  );
}
