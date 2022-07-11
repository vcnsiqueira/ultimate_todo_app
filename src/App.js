import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { ListsProvider } from './context/ListsContext';
import { TodosProvider } from './context/TodosContext';
import { ModalProvider } from './context/ModalContext/ModalContext';
import { SnackbarProvider } from './context/SnackbarContext';

import Login from './views/Auth/Login';
import Register from './views/Auth/Register';
import Reset from './views/Auth/Reset';
import Lists from './views/Lists/Lists';
import TodoList from './views/TodoList';

import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';

const App = () => {
  return (
    <AuthProvider>
      <ListsProvider>
        <TodosProvider>
          <ModalProvider>
            <SnackbarProvider>
              <Router>
                <Routes>
                  <Route exact path="/register" element={<Register />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/reset" element={<Reset />} />
                  <Route exact path="/" element={
                    <PrivateRoute>
                      <Header />
                      <Lists />
                    </PrivateRoute>}
                  />
                  <Route exact path="/:id" element={
                    <PrivateRoute>
                      <Header />
                      <TodoList />
                    </PrivateRoute>}
                  />
                </Routes>
              </Router>
            </SnackbarProvider>
          </ModalProvider>
        </TodosProvider>
      </ListsProvider>
    </AuthProvider>
  );
}

export default App;
