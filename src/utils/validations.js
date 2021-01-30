export const validateFields = (email, password, nickName, register) => {
  if (!email || !password) return 'Olvidaste completar todos los campos'
  if (password.length > 0 && password.length < 6)
    return 'Tu contraseña es muy corta'
  if (register && !nickName) return 'Olvidaste completar todos los campos'
  return ''
}
