import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './utils/PrivateRoute'
import Header from './components/Header'
import TaskList from './components/TaskList'
import LoginPage from './components/LoginPage'
import './App.css';

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <PrivateRoute path="/tasks" component={TaskList} />
        <Route path="/"><LoginPage /></Route>
      </Switch>
    </div>
  );
}

export default App;