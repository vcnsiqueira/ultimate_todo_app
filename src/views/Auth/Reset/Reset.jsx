import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { resetPassword } from '../../../configs/firebase/firebaseConfig';

import { SnackbarContext } from '../../../context/SnackbarContext';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Loader from '../../../components/Loader';

import { verifyEmail } from '../../../utils/validators';

import theme from '../../../utils/theme';

const Reset = () => {
    
  const [email, setEmail] = useState({ value: '', error: false, errorMessage: '' });
  const [isLoading, setIsLoading] = useState(false);

  const { openSnackbar } = useContext(SnackbarContext);

  const handleReset = () => {
    setIsLoading(true);
    resetPassword(email)
      .then(() => {
        console.log('Sending email to user');
        openSnackbar(`E-mail enviado para ${email.valu} para alterar a senha`, {
          type: 'success',
          duration: 3000,
          position: 'bottom-right',
          variant: 'filled',
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/invalid-value-(email),-starting-an-object-on-a-scalar-field') {
          openSnackbar('Este e-mail não está cadastrado no sistema!', {
            type: 'error',
            duration: 3000,
            position: 'bottom-right',
            variant: 'filled',
          });
        } else {
          openSnackbar('Houve um erro na tentativa de alteração da senha. Erro do sistema: ' + errorMessage, { 
            type: 'error',
            duration: 3000,
            position: 'bottom-right',
            variant: 'filled',
          })
        };
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
    
  return (
    <>
      <Loader open={isLoading} />
      <div style={{
        width: '400px',
        margin: '1rem auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h2>Esqueci a Senha</h2>
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
        <Button 
          onClick={handleReset}
          disabled={email.value === '' || email.error}
          fullWidth
        >
          Enviar
        </Button>
        <div style={{ width: '400px', margin: '0px auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', fontSize: '12px' }}>
          <p style={{ margin: '2px 0'}}>Voltar para <Link to='/login' style={{textDecoration: 'none', color: theme.primary, fontWeight: 'bold'}}>Login</Link></p>
        </div>
      </div>
    </>
  );
};

export default Reset;