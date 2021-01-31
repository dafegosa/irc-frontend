import React, { useState, useEffect, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage } from '../actions/results'
import io from 'socket.io-client'

const Dashboard = ({ history }) => {
  const dispatch = useDispatch()
  const [body, setBody] = useState('')
  const nickName = useSelector((state) => state.user.nickName)
  const ref = useRef()
  useEffect(() => {
    ref.current = io(process.env.REACT_APP_SERVER_URL)
    ref.current.on('welcome', (data) => console.log(data))
    ref.current.on('broadcast', (data) => console.log('broadcast', data))
    return () => {
      ref.current.close()
    }
  }, [])

  const validateInfo = (e) => {
    e.preventDefault()
    if (body === '') return
    send(nickName, body)
  }
  const send = (nickName, body) => {
    try {
      dispatch(sendMessage(nickName, body))
      ref.current.emit('msg', body)
    } catch (err) {}
  }
  return (
    <form onSubmit={validateInfo}>
      <div className='container mt-5'>
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
        <div
          class='jumbotron'
          style={{ height: '60vh', opacity: '0.9', padding: '0' }}
        >
          <div style={{ overflowY: 'scroll', height: '90%' }}>
            <p class='lead' style={{ height: '60%' }}>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
          </div>

          <input
            type='text'
            placeholder='Escribe un mensaje'
            style={{ width: '100%', border: 'none' }}
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </div>
        <p class='row justify-content-end'>
          <button
            type='submit'
            class='btn btn-primary btn-lg'
            href='#'
            role='button'
          >
            Enviar
          </button>
        </p>
      </div>
    </form>
  )
}

export default withRouter(Dashboard)
