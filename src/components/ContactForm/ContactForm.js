import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Text } from './ContactForm.styled';

export const ContactForm = ({addContact}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');


  const handleChange = e => {
    const { name, value } = e.target
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    addContact({ name, number});
    setName('');
    setNumber('');
  };
  
    return (
      <Form onSubmit={handleSubmit} autoComplete="off">
        <label>
          <Text>Name</Text>
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder="Enter name"
            value={name}
            onChange={handleChange}
          />
        </label>
        <label>
          <Text>Number</Text>
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            placeholder="Enter number"
            value={number}
            onChange={handleChange}
          />
        </label>
        <Button type="submit" disabled={!name || !number}>
          Add contact
        </Button>
      </Form>
    );
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};