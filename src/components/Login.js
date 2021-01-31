import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { validateFields } from '../utils/functions'
import { createUser, loginUser } from '../actions/results'
import { withRouter } from 'react-router-dom'
const ButtonContainer = styled.div`
  display: flex;
`
const Login = (props) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickName, setNickName] = useState('')
  const [warningMessage, setWarningMessage] = useState('')
  const [register, setRegister] = useState(false)

  const signinValidate = (e) => {
    e.preventDefault()
    validateInfo()
  }

  const validateInfo = () => {
    if (!email || !password) {
      setWarningMessage('Olvidaste completar todos los campos')
      return
    }
    if (register && !nickName) {
      setWarningMessage('Olvidaste completar todos los campos')
      return
    }
    if (password.length > 0 && password.length < 6) {
      setWarningMessage('Tu contraseña es muy corta')
      return
    }
    if (register) {
      create(email, password, nickName)
      setRegister(false)
    } else {
      signin(email, password)
    }
  }

  const create = (email, password, nickName) => {
    try {
      dispatch(createUser(email, password, nickName, props.history))
    } catch (err) {}
  }

  const signin = (email, password) => {
    try {
      dispatch(loginUser(email, password, props.history))
    } catch (err) {}
  }
  return (
    <div className='mt-5' style={{ width: '90%' }}>
      <hr />
      <div className='row justify-content-end'>
        <div className='col-12 col-sm-8 col-med-6 col-xl-4'>
          <form onSubmit={signinValidate}>
            {warningMessage && (
              <div class='alert alert-dismissible alert-danger'>
                <strong>Uy!</strong> {warningMessage}
              </div>
            )}
            <input
              type='email'
              className='form-control'
              placeholder='Ingrese un email'
              onChange={(e) => {
                setEmail(e.target.value)
                console.log(email)
                setWarningMessage('')
              }}
              value={email}
            />
            <input
              type='password'
              className='form-control mt-1'
              placeholder='Ingrese un password'
              onChange={(e) => {
                setPassword(e.target.value)
                setWarningMessage('')
              }}
              value={password}
            />
            {!register ? (
              <ButtonContainer>
                <button
                  className='btn btn-success mt-2'
                  style={{ width: '50%' }}
                >
                  Ingresar
                </button>
                <button
                  className='btn btn-warning " mt-2'
                  style={{ width: '50%' }}
                  type='button'
                  onClick={() => {
                    setRegister(true)
                  }}
                >
                  Registrarme
                </button>
              </ButtonContainer>
            ) : (
              <div>
                <input
                  type='text'
                  className='form-control mt-1'
                  placeholder='¿cual será tu apodo?'
                  onChange={(e) => {
                    setNickName(e.target.value)
                    setWarningMessage('')
                  }}
                  value={nickName}
                />
                <button
                  className='btn btn-warning btn-block mt-2'
                  type='button'
                  onClick={() => {
                    validateInfo()
                  }}
                >
                  Registrarme
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Login)
