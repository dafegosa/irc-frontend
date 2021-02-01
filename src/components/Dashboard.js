import React, { useState, useEffect, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage, getMessages, toSearch } from '../actions/results'
import io from 'socket.io-client'
import { getHour } from '../utils/functions'
import styled from 'styled-components'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #ffcf67;
  color: grey;
  border-radius: 20px;
  margin-bottom: 2%;
`
const Button = styled.button`
  background-color: #ffcf67;
  border: none;
  color: grey;
  border-radius: 20px;
  margin-left: 2%;
  margin-right: 2%;
`

const Dashboard = ({ history }) => {
  const chatContainer = React.createRef()
  const dispatch = useDispatch()
  const [body, setBody] = useState('')
  const [search, setSearch] = useState('')
  const [chat, setChat] = useState([])
  const [command, setCommand] = useState(false)
  const [index, setIndex] = useState(0)
  const nickName = useSelector((state) => state.user.nickName)
  const messages = useSelector((state) => state.messages.messages[0])
  const giphy = useSelector((state) => state.gifs.gifs[0])

  const ref = useRef()
  useEffect(() => {
    dispatch(getMessages())
  }, [])

  useEffect(() => {
    ref.current = io(process.env.REACT_APP_SERVER_URL)
    ref.current.on('welcome', (data) => console.log(data))
    ref.current.on('broadcast', (data) => {
      setChat([...chat, data])
      console.log('el chat => ', chat)
    })
    return () => {
      ref.current.close()
    }
  }, [chat])

  useEffect(() => {
    setIndex(body.indexOf('/giphy'))
    if (index !== -1) {
      setCommand(true)
      console.log('INDEX', index + 7, search)
      setSearch(body.slice(index + 7, body.length))
      if (search.length >= 2) dispatch(toSearch(search))
    } else {
      setCommand(false)
    }
  }, [body])

  const validateInfo = (e) => {
    e.preventDefault()
    if (body === '') return
    send(nickName, body)
  }

  const send = (nickName, body) => {
    try {
      dispatch(sendMessage(nickName, body))
      const hour = getHour()
      const data = {
        nickName,
        body,
        date: hour,
        img: '',
      }
      ref.current.emit('msg', data)
      setBody('')
      scrollToMyRef()
    } catch (err) {}
  }

  const sendGif = (e) => {
    console.log(e.target.src)
    const hour = getHour()
    const data = {
      nickName,
      body: '',
      date: hour,
      img: e.target.src,
    }
    ref.current.emit('msg', data)
    try {
      dispatch(sendMessage(nickName, '', e.target.src))
    } catch (error) {}

    setBody(body.slice(0, index))
  }
  const scrollToMyRef = () => {
    const scroll =
      chatContainer.current.scrollHeight - chatContainer.current.clientHeight
    chatContainer.current.scrollTo(0, scroll)
  }

  return (
    <form onSubmit={validateInfo} style={{ width: '90%' }}>
      <div className='container mt-5' style={{ overflowY: 'visible' }}>
        <Header>
          <Button> Usuario: {nickName}</Button>
          <Button
            type='button'
            onClick={() => {
              localStorage.removeItem('token')
              history.push('/login')
            }}
          >
            Salir
          </Button>
        </Header>
        <div
          class='jumbotron'
          style={{ height: '60vh', opacity: '0.9', padding: '0' }}
        >
          <div
            ref={chatContainer}
            style={{
              overflowY: 'scroll',
              height: '100%',
              borderBottomLeftRadius: '0px',
              borderBottomRightRadius: '0px',
            }}
          >
            {command
              ? !!giphy &&
                giphy.length > 0 &&
                giphy.map((gif, indx) => {
                  return (
                    <div className='item' key={indx}>
                      <img
                        src={gif.images.downsized.url}
                        onClick={(e) => sendGif(e)}
                      />
                    </div>
                  )
                })
              : !!messages &&
                messages.length > 0 &&
                messages.map((msg, indx) => {
                  return (
                    <p class='lead' style={{ margin: '0' }} key={msg._id}>
                      <span style={{ fontSize: '0.6rem', color: 'orange' }}>
                        {msg.date}
                      </span>
                      {`<${msg.nickName}> ${msg.body}`}
                      <img src={msg.img} />
                    </p>
                  )
                })}
            {!!chat &&
              chat.length > 0 &&
              chat.map((msg, indx) => {
                return (
                  <p class='lead' style={{ margin: '0' }} key={indx}>
                    <span style={{ fontSize: '0.6rem', color: 'orange' }}>
                      {msg.date}
                    </span>
                    {`<${msg.nickName}> ${msg.body}`}
                    <img src={msg.img} />
                  </p>
                )
              })}
          </div>
          <input
            type='text'
            placeholder='Escribe un mensaje'
            className='form-control mt-1'
            style={{ width: '100%', border: 'none' }}
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </div>
        <p class='row justify-content-end'>
          <button
            type='submit'
            class='btn btn-primary btn-lg'
            style={{ marginRight: '2%', marginTop: '4%' }}
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
