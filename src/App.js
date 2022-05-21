import React from 'react';
import { doc, setDoc, Timestamp } from 'firebase/firestore';

import { registerUser, db } from './configs/firebase/firebaseConfig';

const App = () => {
  
  const handleRegister = async () => { //Initial test
    console.log('Entrou');
    registerUser('teste@gmail.com', '123456')
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid);
        setDoc(doc(db, 'users', user.uid), {
          email: 'teste@gmail.com',
          registeredAt: Timestamp.fromDate(new Date()),
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  };
  
  return (
    <div>
      <button onClick={handleRegister}>
        Submit
      </button>
    </div>
  );
}

export default App;
