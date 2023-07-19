import { Component } from 'react';
import { Button, Form, Input, Text } from './ContactForm.styled';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { addContact } = this.props;
    addContact({ ...this.state });
    this.setState({ name: '', number: '' });
  };
  

  render() {
    const { name, number } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} autoComplete="off">
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
            onChange={this.handleChange}
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
            onChange={this.handleChange}
          />
        </label>
        <Button type="submit" disabled={!name || !number}>
          Add contact
        </Button>
      </Form>
    );
  }
}