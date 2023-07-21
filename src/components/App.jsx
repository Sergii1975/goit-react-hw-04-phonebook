import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactsList/ContactList';

export const App = () => {
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts')) || []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);

  const [filter, setFilter] = useState('');

  const addContact = data => {
    const newContact = {
      id: nanoid(),
      ...data,
    };

    contacts.some(({ name }) => name === data.name)
      ? Notiflix.Notify.warning(`Alert, ${data.name} is already in contacts`)
      : setContacts(prevContacts => (
           [...prevContacts, newContact]));
  };

  const deleteContact = userId => {
    setContacts(prevContacts => ( prevContacts.filter(contact => contact.id !== userId)));
  };

  const handleChangeFilter = ({ currentTarget: { value } }) => {
    setFilter( value );
  };

  const getFilterContacts = () => {
    const FilterlowerCase = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(FilterlowerCase)
    );
  };

    return (
      <>
        <Section title="Phonebook">
          <ContactForm addContact={addContact} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} handleChangeFilter={handleChangeFilter} />

          <ContactList
            contacts={getFilterContacts()}
            deleteContact={deleteContact}
          />
        </Section>
      </>
    );
}
