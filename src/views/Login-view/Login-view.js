import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { authOperations } from '../../redux/auth';
import style from './Login-view.module.css';

export default function LogIn() {
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handelChangeEmail = useCallback(({ target }) => {
    setEmail(target.value);
  }, []);

  const handelChangePassword = useCallback(({ target }) => {
    setPassword(target.value);
  }, []);

  const handelSubmit = useCallback(
    e => {
      e.preventDefault();

      dispatch(authOperations.login({ email, password }));

      setEmail('');
      setPassword('');
    },
    [dispatch, email, password],
  );

  return (
    <>
      <h1 className={style.form__title}>LogIn</h1>
      <form className={style.form} onSubmit={handelSubmit}>
        <label className={style.form__item}>
          Email
          <input
            className={style.form__input}
            autoComplete="off"
            type="text"
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
          Login
        </button>
      </form>
    </>
  );
}
