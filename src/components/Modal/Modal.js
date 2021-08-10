import { useEffect } from 'react';
import Form from '../Form/Form';
import style from './Modal.module.css';
export default function Modal({ setOpenModal, openModal, id, name, number }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        setOpenModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return function clearEvent() {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setOpenModal]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      setOpenModal(false);
    }
  };

  return (
    <div className={style.backdrop} onClick={handleBackdropClick}>
      <div>
        <Form
          buttonValue={'Change contact'}
          setOpenModal={setOpenModal}
          openModal={openModal}
          id={id}
          name={name}
          number={number}
        />
      </div>
    </div>
  );
}
