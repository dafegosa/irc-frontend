import { Redirect, Route } from 'react-router-dom'

function PrivateRoute(props) {
  const token = localStorage.getItem('token')
  console.log(props)
  if (!token) {
    return <Redirect to='/login' />
  }
  return <Route {...props} />
}

export default PrivateRoute
