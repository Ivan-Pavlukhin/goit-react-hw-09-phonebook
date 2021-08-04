import { useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { authSelectors, authOperations } from '../../redux/auth';
import style from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();

  const userName = useSelector(authSelectors.getUsername);
  const token = useSelector(authSelectors.getIsAuthenticated);

  const handelClick = useCallback(() => {
    dispatch(authOperations.logout(token));
  }, [dispatch, token]);

  return (
    <div className={style.nav}>
      <span>User: {userName}</span>
      <button onClick={handelClick}>Exit</button>
    </div>
  );
}

// const mapDispatchTOProps = {
//   onLogout: authOperations.logout,
// };

// const mapStateToProps = state => ({
//   userName: authSelectors.getUsername(state),
//   token: authSelectors.getIsAuthenticated(state),
// });

// export default connect(mapStateToProps, mapDispatchTOProps)(UserMenu);
