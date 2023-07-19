import { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactsList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      { id: 'id-5', name: 'Steven King', number: '123-45-67' },
    ],
    filter: '',
  };

  addContact = data => {
    const { contacts } = this.state;
    const newContact = {
      id: nanoid(),
      ...data,
    };

    contacts.some(({ name }) => name === data.name)
      ? Notiflix.Notify.warning(`Alert, ${data.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact],
        }));
  };

  deleteContact = userId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== userId),
    }));
  };

  handleChangeFilter = ({ currentTarget: { value } }) => {
    this.setState({ filter: value });
  };

  getFilterContacts = () => {
    const { filter, contacts } = this.state;
    const FilterlowerCase = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(FilterlowerCase)
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(contacts)
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts })
    }
    // console.log(parsedContacts)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
   
  }

  render() {
    const { filter } = this.state;

    return (
      <>
        <Section title="Phonebook">
          <ContactForm addContact={this.addContact} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} handleChangeFilter={this.handleChangeFilter} />

          <ContactList
            contacts={this.getFilterContacts()}
            deleteContact={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}
