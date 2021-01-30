import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { validateFields } from '../utils/validations'
import { createUser } from '../actions/results'
const ButtonContainer = styled.div`
  display: flex;
`
const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [warningMessage, setWarningMessage] = useState(null)
  const validateInfo = (e) => {
    e.preventDefault()
    setWarningMessage(validateFields(email, password))
    if (!warningMessage) create(email, password)
  }

  const create = (email, password) => {
    try {
      console.log('ANTES ', email + password)
      dispatch(createUser(email, password))
    } catch (err) {}
  }
  // const login = useCallback(async () => {
  //   try {
  //     const resp = await firebase
  //       .auth()
  //       .signInWithEmailAndPassword(email, password)
  //     props.history.push('/myapp')
  //     //setSuccessMessage('¡Usuario registrado exitosamente!')
  //   } catch (err) {
  //     console.error(err)
  //     if (err.code === 'auth/user-not-found') {
  //       setWarningMessage('Usuario no registrado')
  //     }
  //     if (err.code === 'auth/wrong-password') {
  //       setWarningMessage('Email o password incorrecto')
  //       setRecoverPass(true)
  //     }
  //   }
  // }, [email, password, props.history])
  // const register = useCallback(async () => {
  //   try {
  //     const resp = await firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(email, password)
  //     setSuccessMessage('¡Usuario registrado exitosamente!')
  //     await firebase.firestore().collection('users').doc(resp.user.email).set({
  //       email: resp.user.email,
  //       uid: resp.user.uid,
  //     })
  //     await firebase.firestore().collection(resp.user.uid).add({
  //       title: 'Tarea de ejemplo',
  //       body: Date.now(),
  //     })
  //     props.history.push('/myapp')
  //   } catch (err) {
  //     console.error(err)
  //     if (err.code === 'auth/invalid-email') {
  //       setWarningMessage('Email no válido')
  //     }
  //     if (err.code === 'auth/email-already-in-use') {
  //       setWarningMessage('Email ya ha sido registrado antes')
  //     }
  //   }
  // }, [email, password, props.history])
  return (
    <div className='mt-5' style={{ width: '90%' }}>
      <hr />
      <div className='row justify-content-end'>
        <div className='col-12 col-sm-8 col-med-6 col-xl-4'>
          <form onSubmit={validateInfo}>
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
                setWarningMessage(null)
              }}
              value={email}
            />
            <input
              type='password'
              className='form-control mt-1'
              placeholder='Ingrese un password'
              onChange={(e) => {
                setPassword(e.target.value)
                setWarningMessage(null)
              }}
              value={password}
            />
            <ButtonContainer>
              <button className='btn btn-success mt-2' style={{ width: '50%' }}>
                Ingresar
              </button>
              <button
                className='btn btn-warning " mt-2'
                style={{ width: '50%' }}
                type='button'
                onClick={() => {
                  setEmail('')
                  setPassword('')
                }}
              >
                Registrarme
              </button>
            </ButtonContainer>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
