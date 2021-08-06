import { Link } from 'react-router-dom';
import style from './AuthNav.module.css';

export function AuthNav() {
  return (
    <div className={style.container__flex}>
      <Link to="/login">LogIn</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}
