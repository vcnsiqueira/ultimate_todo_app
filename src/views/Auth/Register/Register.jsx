import React, { useState, useContext } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';

import { registerUser, db } from '../../../configs/firebase/firebaseConfig';
import { doc, setDoc, Timestamp } from 'firebase/firestore';

import { AuthContext } from '../../../context/AuthContext';
import { SnackbarContext } from '../../../context/SnackbarContext';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Loader from '../../../components/Loader';

import theme from '../../../utils/theme';
import { verifyEmail, verifyPassword, verifyConfirmPassword } from '../../../utils/validators';

const Register = () => {

  const [email, setEmail] = useState({ value: '', error: false, errorMessage: '' });
  const [password, setPassword] = useState({ value: '', error: false, errorMessage: '' });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: false, errorMessage: '' });
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { openSnackbar } = useContext(SnackbarContext);

  const navigate = useNavigate();
    
  const handleRegister = async () => {
    setIsLoading(true);
    registerUser(email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Registered user: ', user);
        setDoc(doc(db, 'users', user.uid), {
          email: email.value,
          register: Timestamp.fromDate(new Date()),
        });
        navigate('/')
        setEmail('');
        setPassword('');
        openSnackbar('Usuário registrado com sucesso! Seja bem-vindo(a) ' + user.email, {
          type: 'success',
          duration: 3000,
          position: 'bottom-right',
          variant: 'filled',
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          openSnackbar(`O usuário ${email.value} já está cadastrado no sistema. Faça o login para acessar sua conta!`, {
            type: 'error',
            duration: 3000,
            position: 'bottom-right',
            variant: 'filled',
          });
        } else {
          openSnackbar('Houve um erro no cadastro! Por favor, tente novamente! Erro do sistema: ' + errorMessage , {
            type: 'error',
            duration: 3000,
            position: 'bottom-right',
            variant: 'filled',
          });
        }
      });
    setIsLoading(false);
  };

  const handleEmail = val => {
    const msg = verifyEmail(val, true);
    setEmail({
      value: val,
      error: msg.length !== 0,
      errorMessage: msg,
    });
  };

  const handlePassword = val => {
    const msg = verifyPassword(val, 6, true);
    setPassword({
      value: val,
      error: msg.length !== 0,
      errorMessage: msg,
    });
    handleConfirmPassword(confirmPassword);
  };

  const handleConfirmPassword = val => {
    const msg = verifyConfirmPassword(val, password.value, 6, true);
    setConfirmPassword({
      value: val,
      error: msg.length !== 0,
      errorMessage: msg,
    });
  };

  return (
    <>
      {!!currentUser ? (
        <Navigate to="/" />
      ) : (
        <>
          <Loader open={isLoading} />
          <div style={{
            width: '400px',
            margin: '1rem auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <h2>Registro</h2>
            <Input
              label="E-mail"
              variant="outlined"
              type="text"
              value={email.value}
              error={email.error}
              errorMessage={email.errorMessage}
              onChange={e => setEmail({ value: e.target.value, error: email.error, errorMessage: email.errorMessage })}
              onBlur={e => handleEmail(e.target.value)}
              fullWidth
              required
            />
            <Input
              label="Senha"
              variant="outlined"
              type="password"
              value={password.value}
              error={password.error}
              errorMessage={password.errorMessage}
              onChange={e => setPassword({ value: e.target.value, error: password.error, errorMessage: password.errorMessage })}
              onBlur={e => handlePassword(e.target.value)}
              fullWidth
              required
            />
            <Input
              label="Confirmar a senha"
              variant="outlined"
              type="password"
              value={confirmPassword.value}
              error={confirmPassword.error}
              errorMessage={confirmPassword.errorMessage}
              onChange={e => setConfirmPassword({ value: e.target.value, error: confirmPassword.error, errorMessage:confirmPassword.errorMessage })}
              onBlur={e => handleConfirmPassword(e.target.value)}
              fullWidth
              required
            />
            <Button 
              onClick={handleRegister}
              disabled={email.value === '' || password.value === '' || confirmPassword.value === '' || email.error || password.error || confirmPassword.error}
              fullWidth
            >
              Registrar
            </Button>
          </div> 
          <div style={{ width: '400px', margin: '0px auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', fontSize: '12px' }}>
            <p style={{ margin: '2px 0'}}>Já possui uma conta? Faça o <Link to='/login' style={{textDecoration: 'none', color: theme.primary, fontWeight: 'bold'}}>login</Link></p>
          </div>
        </>
      )}
    </>
  );
};

export default Register;