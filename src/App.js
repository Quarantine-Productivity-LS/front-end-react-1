import React from 'react'
import { Switch, Route } from 'react-router-dom'
import TaskList from './components/TaskList'
import FormikLoginPage from './components/LoginPage'
import FormikRegisterPage from './components/Register'
import './App.css';
import Header from './components/Header'

const App = () => {
  return (
    <div>
      <Header/>
      <Switch>
        {/* todo: TaskList route needs to be private */}
        <Route path="/tasks"><TaskList /></Route>
        <Route exact path="/"><FormikLoginPage /></Route>
        <Route path="/register"><FormikRegisterPage /></Route>
      </Switch>
    </div>
  );
}

export default App;