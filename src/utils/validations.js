export const validateFields = (email, password, setWarningMessage) => {
  if (!email || !password) {
    return 'Olvidaste completar todos los campos'
  }
  if (password.length > 0 && password.length < 6) {
    return 'Tu contraseña es muy corta'
  }
}
