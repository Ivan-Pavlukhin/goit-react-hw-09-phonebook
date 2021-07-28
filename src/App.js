import { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { authOperations } from './redux/auth';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import SiteBar from './components/SiteBar/SiteBar';
import style from './App.module.css';

const Home = lazy(() => import('./views/Home-view'));
const LogIn = lazy(() => import('./views/login-view'));
const Contacts = lazy(() => import('./views/contacts-view'));
const Register = lazy(() => import('./views/register-view'));

class App extends Component {
  componentDidMount() {
    this.props.refreshUser();
  }

  render() {
    return (
      <div className={style.wrapper}>
        <SiteBar />
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <PublicRoute path="/login" component={LogIn} restricted redirectTo={'/contacts'} />
            <PrivateRoute path="/contacts" component={Contacts} redirectTo={'/login'} />
            <PublicRoute
              path="/register"
              component={Register}
              restricted
              redirectTo={'/contacts'}
            />
            <PublicRoute path="/" component={Home} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

const mapDispatchToProps = {
  refreshUser: authOperations.getCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);

// const mapPropsToState = state => ({
//   contacts: phonebookSelectors.getContacts(state),
//   filter: phonebookSelectors.getFilter(state),
// })

// const mapDispatchToState = dispatch => ({
//   changeFilter: ({ filter }) => dispatch(findContacts({ filter })),
//   deleteContact: ({ id }) => dispatch(phonebookOperations.deleteContact({ id }))
// })

// state = {
//   contacts: [ { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
//     { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
//     { id: "id-3", name: "Eden Clements", number: "645-17-79" },
//     { id: "id-4", name: "Annie Copeland", number: "227-91-26" },],
//   filter: "",
// };

// componentDidMount() {
//   const contacts = JSON.parse(localStorage.getItem('contacts'))
//   if (contacts) {
//     this.setState({contacts: contacts})
//   }
// }

// componentDidUpdate(prevProps, prevState) {
//   const prevContacts = prevState.contacts;
//   const nextContacts = this.state.contacts;

//   if (prevContacts !== nextContacts) {
//      localStorage.setItem('contacts', JSON.stringify(nextContacts))
//   }

// }

// addContact = ({ name, number }) => {
//   const contact = {
//     name,
//     number,
//     id: uuidv4(),
//   };

//   this.setState(({ contacts }) => ({
//     contacts: [contact, ...contacts],
//   }));
// };

// changeFilter = (e) => {
//   this.setState({ filter: e.currentTarget.value });
// };

// findContacts = () => {
//   const { filter, contacts } = this.state;
//   const normalizedFilter = filter.toLowerCase();
//   return contacts.filter((contact) =>
//     contact.name.toLowerCase().includes(normalizedFilter)
//   );
// };

// deleteContact = (contactId) => {
//   this.setState((prevState) => ({
//     contacts: prevState.contacts.filter(
//       (contact) => contact.id !== contactId
//     ),
//   }));
// };

// const visibleContacts = this.findContacts();
