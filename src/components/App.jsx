import { nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import { FormAddContact, Contacts, Filter } from './';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
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
