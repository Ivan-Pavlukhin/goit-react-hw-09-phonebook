import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import style from './AddContact.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { phonebookSelectors, phonebookOperations } from '../../redux/phonebook';

export default function AddContact() {
  const dispatch = useDispatch();

  const contacts = useSelector(phonebookSelectors.getContacts);

  const [name, setName] = useState('');

  const handelChangeName = useCallback(({ target }) => {
    setName(target.value);
  }, []);

  const [number, setNumber] = useState('');

  const handelChangeNumber = useCallback(({ target }) => {
    setNumber(target.value);
  }, []);

  const searchRepeatName = useCallback(() => {
    const normalizedName = name.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase() === normalizedName);
  }, [name, contacts]);

  const handelSubmit = useCallback(
    e => {
      e.preventDefault();
      if (searchRepeatName().length !== 0) {
        alert(`${name} is already in contacts`);
        return;
      }

      dispatch(phonebookOperations.addContact({ name, number }));
      setName('');
      setNumber('');
    },
    [dispatch, name, number, searchRepeatName],
  );

  return (
    <form className={style.form} onSubmit={handelSubmit}>
      <label className={style.form__item}>
        Name
        <input
          className={style.form__input}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          onChange={handelChangeName}
        />
      </label>
      <label className={style.form__item}>
        Number
        <input
          className={style.form__input}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          onChange={handelChangeNumber}
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
}

AddContact.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};
