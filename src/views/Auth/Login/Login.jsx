import React, { useState, useContext } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';

import { loginUser, db } from '../../../configs/firebase/firebaseConfig';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';

import { AuthContext } from '../../../context/AuthContext';
import { SnackbarContext } from '../../../context/SnackbarContext';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Loader from '../../../components/Loader';

import theme from '../../../utils/theme';
import { verifyEmail, verifyPassword } from '../../../utils/validators';

const Login = () => {

  const [email, setEmail] = useState({ value: '', error: false, errorMessage: '' });
  const [password, setPassword] = useState({ value: '', error: false, errorMessage: '' });
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { openSnackbar } = useContext(SnackbarContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    await loginUser(email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
          updateDoc(doc(db, 'users', user.uid), { lastLogin: Timestamp.fromDate(new Date()) })
          //console.log('Signed in user: ', user);
          navigate('/');
          openSnackbar('Autenticação verificada! Bem vindo ' + user.email, {
            type: 'success',
            duration: 3000,
            position: 'bottom-right',
            variant: 'filled',
          });
        })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/user-not-found') {
          openSnackbar('Usuário ainda não cadastrado no sistema! Verifique se o e-mail está correto ou faça o cadastro desse usuário', {
            type: 'error',
            duration: 3000,
            position: 'bottom-right',
            variant: 'filled',
          })
        } else {
          openSnackbar('Houve um erro ao tentar realizar o acesso deste usuário! Erro do sistema: ' + errorMessage, {
            type: 'error',
            duration: 3000,
            position: 'bottom-right',
            variant: 'filled',
          })
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
    })
  }

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
            <h2>Login</h2>
            <Input
              label="E-mail"
              variant="outlined"
              type="text"
              value={email.value}
              error={email.error}
              errorMessage={email.errorMessage}
              onChange={e => setEmail({ value: e.target.value, error: email.error, errorMessage: email.errorMessage }) }
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
            <Button 
              onClick={handleLogin}
              disabled={email.value === '' || password.value === '' || email.error || password.error}
              fullWidth
            >
              Login
            </Button>
          </div>
          <div style={{ width: '400px', margin: '0px auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', fontSize: '12px' }}>
            <p style={{ margin: '2px 0'}}>Ainda não tem uma conta? <Link to='/register' style={{textDecoration: 'none', color: theme.primary, fontWeight: 'bold'}}>Registre-se</Link></p>
            <p style={{ margin: '2px 0'}}>Esqueceu a sua senha? <Link to='/reset' style={{textDecoration: 'none', color: theme.primary, fontWeight: 'bold'}}>Trocar a senha</Link></p>
          </div>
        </>
      )}
    </>
  );
};

export default Login;