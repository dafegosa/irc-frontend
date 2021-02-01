import Login from './components/Login'
import 'bootswatch/dist/minty/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import PrivateRoute from '../src/components/PrivateRoute'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <Router>
      <Switch>
        <div
          className='App row justify-content-center'
          style={{
            width: '100%',
            height: '100%',
            margin: '0',
          }}
        >
          <Route exact path='/login' component={Login} />
          <PrivateRoute
            exact
            path='/dashboard/:path?/:innerpath?/:superinner?'
            component={Dashboard}
          />
          <Redirect to='login' />
        </div>
      </Switch>
    </Router>
  )
}

export default App
