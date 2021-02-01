import Login from './components/Login'
import React from 'react'
import 'bootswatch/dist/minty/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import PrivateRoute from '../src/components/PrivateRoute'
import Dashboard from './components/Dashboard'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/login' component={Login} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <Redirect to='login' />
        </Switch>
      </Router>
    )
  }
}

export default App
