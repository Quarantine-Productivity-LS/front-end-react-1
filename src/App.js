import React from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { PrivateRoute } from './utils/PrivateRoute'
import Header from './components/Header'
import TaskList from './components/TaskList'
import Logbook from './components/Logbook'
import Considerations from './components/Considerations'
import FormikLoginPage from './components/LoginPage'
import FormikRegisterPage from './components/Register'
import './App.css';

const App = () => {
  const { push } = useHistory();
  const pushUser = url => {
    push(url);
  }
  return (
    <div className="appPage">
      <Header/>
      <Switch>
        <PrivateRoute path="/tasks" component={TaskList} />
        <PrivateRoute path="/logbook" component={Logbook} />
        <PrivateRoute path="/considerations" component={Considerations} />
        <Route path="/register"><FormikRegisterPage pushUser={pushUser}/></Route>
        <Route path="/"><FormikLoginPage pushUser={pushUser}/></Route>
      </Switch>
    </div>
  );
}

export default App;
