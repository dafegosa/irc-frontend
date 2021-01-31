export const validateFields = (email, password, nickName, register) => {
  if (!email || !password) return 'Olvidaste completar todos los campos'
  if (password.length > 0 && password.length < 6)
    return 'Tu contraseña es muy corta'
  if (register && !nickName) return 'Olvidaste completar todos los campos'
  return ''
}

export const getDate = () => {
  const today = new Date()
  return (
    today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
  )
}

export const getHour = () => {
  const today = new Date()
  return today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
}
