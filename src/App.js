import React from 'react'
import { Switch, Route } from 'react-router-dom'
import TaskList from './components/TaskList'
import FormikLoginPage from './components/LoginPage'
import './App.css';

const App = () => {
  return (
    <div>
      <Switch>
        {/* todo: TaskList route needs to be private */}
        <Route path="/tasks"><TaskList /></Route>
        <Route path="/"><FormikLoginPage /></Route>
      </Switch>
    </div>
  );
}

export default App;