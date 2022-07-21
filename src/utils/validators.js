export const verifyEmail = (value, required = false) => {
  if (value.length === 0) return required ? 'Este campo não pode estar vazio' : '';
  const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailReg.test(value)) return 'Informe um email válido';
  return '';
};

export const verifyPassword = (value, minLength, required) => {
  if (required) {
    if (value.length === 0) return 'Este campo não pode estar vazio';
    if (value.length < minLength) return 'A senha deve ter no mínimo 6 caracteres';
  }
  return '';
};

export const verifyConfirmPassword = (value, actualValue, minLength, required) => {
  if (required) {
    if (value !== actualValue) return 'A senha não é a mesma informada no campo Senha'
    if (value.length === 0) return 'Este campo não pode estar vazio';
    if (value.length < minLength) return 'A senha deve ter no mínimo 6 caracteres';
  }
  return '';
};

export const verifyEmptyField = (value, required) => {
  if (value.length === 0) return required ? 'Este campo não pode estar vazio' : '';
  return '';
};

export const verifyNegativeField = (value, required) => {
  if (value <= 0) return required ? 'Este campo não pode ser negativo' : '';
  return '';
};