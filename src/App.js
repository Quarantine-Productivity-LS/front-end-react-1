import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './utils/PrivateRoute'
import Header from './components/Header'
import TaskList from './components/TaskList'
import FormikLoginPage from './components/LoginPage'
import './App.css';

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <PrivateRoute path="/tasks" component={TaskList} />
        <Route path="/"><FormikoginPage /></Route>
      </Switch>
    </div>
  );
}

export default App;