import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import style from './ContactsList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { phonebookSelectors, phonebookOperations } from '../../redux/phonebook';
import Modal from '../Modal/Modal';

export default function ContactsList() {
  const [openModal, setOpenModal] = useState(false);

  const handelOpenModal = ({ id, name, number }) => {
    setOpenModal(!openModal);
    setId(id);
    setName(name);
    setNumber(number);
  };

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

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
                <div>
                  <button
                    className={style.list__button}
                    onClick={() => {
                      handelOpenModal(item);
                    }}
                  >
                    Change
                  </button>
                  <button
                    className={style.list__button}
                    onClick={() => dispatch(phonebookOperations.deleteContact(item.id))}
                  >
                    Delete
                  </button>
                </div>
              </li>
            </CSSTransition>
          ))}
      </TransitionGroup>
      {isLoading && <h2>Loading...</h2>}
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          openModal={openModal}
          id={id}
          name={name}
          number={number}
        />
      )}
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
