import { nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import { FormAddContact, Contacts, Filter } from './';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      debugger;
      setContacts(JSON.parse(contacts));
    }
  }, []);

  useEffect(() => {
    const newContacts = JSON.stringify(contacts);
    debugger;
    localStorage.setItem('contacts', newContacts);
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const isNameInContacts = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isNameInContacts) {
      alert('Не можна!!!');
      return false;
    }
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    setContacts([...contacts, newContact]);
    return true;
  };

  const deleteContact = idToDelete => {
    setContacts(contacts.filter(({ id }) => id !== idToDelete));
  };

  const updateFilter = filterValue => {
    setFilter(filterValue.toLowerCase().trim());
  };

  const filterContacts = () => {
    return filter
      ? contacts.filter(({ name }) => name.toLowerCase().includes(filter))
      : contacts;
  };

  return (
    <div>
      <FormAddContact addContact={addContact} />
      <Contacts contacts={filterContacts()} deleteContact={deleteContact}>
        <Filter filterHandler={updateFilter} />
      </Contacts>
    </div>
  );
};

export default App;
