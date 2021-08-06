import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import animationStyle from './Animation.module.css';
import style from './ContactsList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { phonebookSelectors, phonebookOperations } from '../../redux/phonebook';

export default function ContactsList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(phonebookOperations.fetchContacts());
  }, [dispatch]);

  const contactsList = useSelector(phonebookSelectors.getVisibleContacts);
  const isLoading = useSelector(phonebookSelectors.getIsLoading);

  return (
    <>
      <TransitionGroup component="ul" className={style.list}>
        {contactsList &&
          contactsList.map(item => (
            <CSSTransition key={item.id} timeout={300} classNames={style}>
              <li className={style.item}>
                <span className={style.contact}>
                  {item.name}: {item.number}
                </span>
                <button
                  className={style.list__button}
                  onClick={() => dispatch(phonebookOperations.deleteContact(item.id))}
                >
                  Delete
                </button>
              </li>
            </CSSTransition>
          ))}
      </TransitionGroup>
      {isLoading && <h2>Loading...</h2>}
    </>
  );
}

ContactsList.propTypes = {
  contactsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};
