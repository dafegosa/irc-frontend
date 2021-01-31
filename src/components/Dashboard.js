import React, { useState, useEffect, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage } from '../actions/results'
import io from 'socket.io-client'

const Dashboard = ({ history }) => {
  const chatContainer = React.createRef()
  const dispatch = useDispatch()
  const [body, setBody] = useState('')
  const [chat, setChat] = useState([])
  const nickName = useSelector((state) => state.user.nickName)
  const ref = useRef()
  useEffect(() => {
    ref.current = io(process.env.REACT_APP_SERVER_URL)
    ref.current.on('welcome', (data) => console.log(data))
    ref.current.on('broadcast', (data) => {
      // chat.push(data)
      setChat([...chat, data])
      console.log('el chat => ', chat)
    })
    return () => {
      ref.current.close()
    }
  }, [chat])

  const validateInfo = (e) => {
    e.preventDefault()
    if (body === '') return
    send(nickName, body)
  }
  const send = (nickName, body) => {
    try {
      dispatch(sendMessage(nickName, body))
      ref.current.emit('msg', `<${nickName}> ${body}`)
      setBody('')
      scrollToMyRef()
    } catch (err) {}
  }
  const scrollToMyRef = () => {
    const scroll =
      chatContainer.current.scrollHeight - chatContainer.current.clientHeight
    chatContainer.current.scrollTo(0, scroll)
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
          <div
            ref={chatContainer}
            style={{ overflowY: 'scroll', height: '90%' }}
          >
            {!!chat &&
              chat.length > 0 &&
              chat.map((msg, indx) => {
                return (
                  <p class='lead' style={{ margin: '0' }} key={indx}>
                    {msg}
                  </p>
                )
              })}
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
