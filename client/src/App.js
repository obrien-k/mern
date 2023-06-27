import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import UserMenu from './components/layout/UserMenu';
import PublicLayout from './components/layout/PublicLayout';
// Redux
import { Provider } from 'react-redux';
import store from './store';


 import './styles/layer_cake/style.css';
import './App.css';
const App = () => {
  const isAuthenticated = false; // You can dynamically set this flag based on user login status

return(
  <Provider store={store}>
    <Router>
      {isAuthenticated ? (
      <Fragment>
        <Navbar />
        <UserMenu user={'admin'} pageId={1}/>
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </Fragment>) : (<PublicLayout pageTitle="Welcome to My Site">
            <Route exact path="/" component={PublicLayout} />
            <section className="container">
              <Alert />
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </section>
          </PublicLayout>)}
    </Router>
  </Provider>
)};

export default App;
