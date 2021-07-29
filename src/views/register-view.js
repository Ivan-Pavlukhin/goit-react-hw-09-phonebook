import { Component, useCallback, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { authOperations } from '../redux/auth';

// const mapDispatchToProps = {
//   onRegister: authOperations.register,
// };

// export default connect(null, mapDispatchToProps)(Register);

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
    <form onSubmit={handelSubmit}>
      <h1>Register</h1>
      <label>
        Name
        <input
          type="text"
          value={name}
          name="name"
          autoComplete="off"
          onChange={handelChangeName}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={email}
          name="email"
          autoComplete="off"
          onChange={handelChangeEmail}
        />
      </label>
      <label>
        Password
        <input type="password" value={password} name="password" onChange={handelChangePassword} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}

// class Register extends Component {
//   state = {
//     name: '',
//     email: '',
//     password: '',
//   };

//   render() {

//   }
// }
