import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { phonebookSelectors, phonebookOperations } from '../../redux/phonebook';
import style from './Form.module.css';

export default function Form({ onSubmit, buttonValue, setOpenModal, openModal, id, name, number }) {
  const dispatch = useDispatch();
  const contacts = useSelector(phonebookSelectors.getContacts);

  const [newName, setNewName] = useState('');

  const handelChangeName = useCallback(({ target }) => {
    setNewName(target.value);
  }, []);

  const [newNumber, setNewNumber] = useState('');

  const handelChangeNumber = useCallback(({ target }) => {
    setNewNumber(target.value);
  }, []);

  const [repeatName, setRepeatName] = useState(false);

  const searchRepeatName = useCallback(() => {
    const normalizedName = newName.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase() === normalizedName);
  }, [newName, contacts]);

  const handelSubmit = e => {
    e.preventDefault();
    if (searchRepeatName().length > 1) {
      console.log('in true');
      setRepeatName(true);
      setTimeout(() => {
        setRepeatName(false);
      }, 3500);
      return;
    }

    dispatch(phonebookOperations.updateContact({ id, name: newName, number: newNumber }));
    setNewName('');
    setNewNumber('');
    handelOpenModal();
  };

  const handelOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <CSSTransition in={repeatName} timeout={500} unmountOnExit classNames={style}>
        <div className={style.notification}>
          <p>{newName} is already in contacts</p>
        </div>
      </CSSTransition>
      <form className={style.form} onSubmit={handelSubmit}>
        <label className={style.form__item}>
          Change name
          <input
            className={style.form__input}
            type="text"
            name="name"
            value={newName}
            placeholder={name}
            autoComplete="off"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            onChange={handelChangeName}
          />
        </label>
        <label className={style.form__item}>
          Change number
          <input
            className={style.form__input}
            type="tel"
            name="number"
            value={newNumber}
            placeholder={number}
            autoComplete="off"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            onChange={handelChangeNumber}
          />
        </label>
        <button className={style.form__button} type="submit">
          {buttonValue}
        </button>
      </form>
    </>
  );
}
