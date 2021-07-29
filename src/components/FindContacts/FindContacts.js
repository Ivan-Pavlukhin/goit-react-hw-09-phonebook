import PropTypes from 'prop-types';
import style from './FindContacts.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { phonebookSelectors, findContacts } from '../../redux/phonebook';

export default function FindContacts() {
  const dispatch = useDispatch();
  const value = useSelector(phonebookSelectors.getFilter);

  return (
    <>
      <h1>Contacts</h1>
      <label>
        Find contacts by name
        <input
          className={style.input}
          type="text"
          value={value}
          onChange={e => dispatch(findContacts(e.currentTarget.value))}
        />
      </label>
    </>
  );
}

FindContacts.propsTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
