import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { authOperations } from '../../redux/auth';
import style from './Register-view.module.css';

export default function Register() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handelChangeName = useCallback(({ target: { value } }) => {
    setName(value);
  }, []);

  const handelChangeEmail = useCallback(({ target: { value } }) => {
    setEmail(value);
  }, []);

  const handelChangePassword = useCallback(({ target: { value } }) => {
    setPassword(value);
  }, []);

  const handelSubmit = useCallback(
    e => {
      e.preventDefault();

      dispatch(authOperations.register({ name, password, email }));

      setName('');
      setPassword('');
      setEmail('');
    },
    [dispatch, name, password, email],
  );

  return (
    <>
      <h1 className={style.form__title}>Register</h1>
      <form className={style.form} onSubmit={handelSubmit}>
        <label className={style.form__item}>
          Name
          <input
            className={style.form__input}
            autoComplete="off"
            type="text"
            value={name}
            name="name"
            onChange={handelChangeName}
          />
        </label>
        <label className={style.form__item}>
          Email
          <input
            className={style.form__input}
            autoComplete="off"
            type="email"
            value={email}
            name="email"
            onChange={handelChangeEmail}
          />
        </label>
        <label className={style.form__item}>
          Password
          <input
            className={style.form__input}
            autoComplete="off"
            type="password"
            value={password}
            name="password"
            onChange={handelChangePassword}
          />
        </label>
        <button className={style.form__button} type="submit">
          Register
        </button>
      </form>
    </>
  );
}
