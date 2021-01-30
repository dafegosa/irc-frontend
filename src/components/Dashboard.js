import React from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const Dashboard = ({ history }) => {
  const nickName = useSelector((state) => state.user.nickName)

  return (
    <div>
      <h1> Bienvenido!!! {nickName}</h1>
      <button
        type='button'
        onClick={() => {
          localStorage.removeItem('token')
          history.push('/login')
        }}
      >
        Cerrar
      </button>
    </div>
  )
}

export default withRouter(Dashboard)
