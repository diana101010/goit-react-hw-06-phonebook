import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, updateFilter } from './contactSlice';

const ContactBook = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
    }
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    if (name === 'name') setName(value);
    else if (name === 'number') setNumber(value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const newContact = {
      name,
      number,
      id: Date.now().toString(),
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
    dispatch(updateFilter(event.target.value));
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
          name="name"
          pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
          title="Name may contain only letters, apostrophe, dash, and spaces."
          required
          value={name}
          onChange={handleInputChange}
        />
        <label>Number</label>
        <input
          style={{ width: 'fit-content' }}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses, and can start with +"
          required
          value={number}
          onChange={handleInputChange}
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

export default ContactBook;
