import { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { authOperations } from './redux/auth';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import SiteBar from './components/SiteBar/SiteBar';
import style from './App.module.css';

const Home = lazy(() => import('./views/Home-view/Home-view'));
const LogIn = lazy(() => import('./views/Login-view/Login-view'));
const Contacts = lazy(() => import('./views/Contacts-view/Contacts-view'));
const Register = lazy(() => import('./views/Register-view/Register-view'));

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <div className={style.wrapper}>
      <SiteBar />
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <PublicRoute path="/login" component={LogIn} restricted redirectTo={'/contacts'} />
          <PrivateRoute path="/contacts" component={Contacts} redirectTo={'/login'} />
          <PublicRoute path="/register" component={Register} restricted redirectTo={'/contacts'} />
          <PublicRoute path="/" component={Home} />
        </Switch>
      </Suspense>
    </div>
  );
}
