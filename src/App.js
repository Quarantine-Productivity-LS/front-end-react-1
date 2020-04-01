import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import TaskList from './components/TaskList'
import FormikLoginPage from './components/LoginPage'
import FormikRegisterPage from './components/Register'
import './App.css';

const App = () => {
  return (
    <div className="appPage">
      <Header/>
      <Switch>
        <PrivateRoute path="/tasks" component={TaskList} />
        <Route path="/register"><FormikRegisterPage /></Route>
        <Route path="/"><FormikLoginPage /></Route>
      </Switch>
    </div>
  );
}

export default App;
