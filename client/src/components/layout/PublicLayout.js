import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthPage from './AuthPage';
import Login from '../auth/Login';
import PublicLanding from './PublicLanding';
import '../../styles/layer_cake/style.css'; // Assuming you have this stylesheet file at the same directory level

const PublicLayout= ({ pageTitle, children }) => {
    return (
        <div>
        <Switch>
          <Route exact path="/" component={PublicLanding} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    );
};

export default PublicLayout;
