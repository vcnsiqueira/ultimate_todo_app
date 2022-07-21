import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { LeftSideToolbar, StyledBoxBurger } from './styles/Header.styles';

import { AuthContext } from '../../context/AuthContext';
import { SnackbarContext } from '../../context/SnackbarContext';

import { logoutUser } from '../../configs/firebase/firebaseConfig';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// import ProfileModal from '../Modals/ProfileModal';

import { Burger, User, Logout } from '../icons';

const Header = () => {
  
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  // const [openProfileModal, setOpenProfileModal] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { openSnackbar } = useContext(SnackbarContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenUserMenu = e => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNavMenu = e => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSignout = async () => {
    await logoutUser()
      .then(() => {
        console.log('User signed out');
        openSnackbar(`Usuário ${currentUser} desconectado com sucesso`, {
          type: 'success',
          duration: 3000,
          position: 'bottom-right',
          variant: 'filled',
        });
      })
      .catch((error) => {
        console.log('Erro ao tentar fazer o logout', error);
        openSnackbar('Houve um erro ao tentar desconectar o usuário! Por favor, tente novamente!', {
          type: 'error',
          duration: 3000,
          position: 'bottom-right',
          variant: 'filled',
        });
      });
    navigate('/login');
  };

  return (
    <>
      <AppBar position='static'>
        <Container maxWidth="xl">
          <Toolbar disableGutters style={{ display: 'flex', justifyContent: 'space-between' }}>
            <LeftSideToolbar>
              <StyledBoxBurger>
                <IconButton
                  size='medium'
                  onClick={handleOpenNavMenu}
                >
                  <Burger color='#FFFFFF' />
                </IconButton>
                <Popover
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  // transformOrigin={{
                  //   vertical: 'top',
                  //   horizontal: 'left',
                  // }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none'},
                  }}
                >
                  <MenuItem>
                    <Typography style={{ textAlign:'center' }} onClick={() => { navigate('/'); handleCloseNavMenu(); }}>Home</Typography>
                  </MenuItem>
                </Popover>
              </StyledBoxBurger>
              <div>
                <Typography
                  variant='h6'
                  noWrap
                  component='div'
                  style={{ fontWeight: 'bold', padding: '0px' }}
                >
                  Ultimate Todo
                </Typography>
              </div>
              <Box style={{ display: 'flex', gap: '15px' }}>
                {location.pathname === '/' ? 
                  <Link to='/' style={{ color: '#FBCB0A', fontWeight: 'bold', textDecoration: 'none' }}>
                    Home
                  </Link> :
                  <Link to='/' style={{ color: '#FBCB0A', fontWeight: 'bold', textDecoration: 'none' }}>
                    Home
                  </Link>
                }
              </Box>
            </LeftSideToolbar>
            <Box>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
              <Popover
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => { console.log('Profile modal' )}}>
                  <ListItemIcon>
                    <User color='#C4C4C4' />
                  </ListItemIcon>
                  <ListItemText>
                    Perfil
                  </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => { handleSignout(); handleCloseUserMenu(); }}>
                  <ListItemIcon>
                    <Logout color='#C4C4C4' />
                  </ListItemIcon>
                  <ListItemText>
                    Sair
                  </ListItemText>
                </MenuItem>
              </Popover>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* <ProfileModal open={openProfileModal} handleClose={() => setOpenProfileModal(false)} user={user} /> */}
    </>
  );
};

export default Header;