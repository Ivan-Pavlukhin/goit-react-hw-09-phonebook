import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../redux/auth';

// const mapDispatchToProps = {
//   onLogin: authOperations.login,
// };

// export default connect(null, mapDispatchToProps)(LogIn);

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
    <form onSubmit={handelSubmit}>
      <h1>LogIn</h1>
      <label>
        Email
        <input type="text" value={email} name="email" onChange={handelChangeEmail} />
      </label>
      <label>
        Password
        <input type="password" value={password} name="password" onChange={handelChangePassword} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
