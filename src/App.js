import React from 'react'
import { Switch, Route } from 'react-router-dom'
import TaskList from './components/TaskList'
import LoginPage from './components/LoginPage'
import './App.css';

const App = () => {
  return (
    <div>
      <Switch>
        {/* todo: TaskList route needs to be private */}
        <Route path="/tasks"><TaskList /></Route>
        <Route path="/"><LoginPage /></Route>
      </Switch>
    </div>
  );
}

export default App;