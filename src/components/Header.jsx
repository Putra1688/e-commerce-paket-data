import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
  useMediaQuery,
  useTheme,
  Divider,
  Fade
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart,
  History,
  Person,
  ExitToApp,
  Visibility,
  AccountCircle,
  ExpandMore
} from '@mui/icons-material';

const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setProfileMenuAnchor(null);
    setMobileMenuOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    handleProfileMenuClose();
  };

  // Desktop Navigation Items
  const renderDesktopMenu = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {isLoggedIn ? (
        <>
          <Button
            component={Link}
            to="/packages"
            startIcon={<ShoppingCart />}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Beli Paket
          </Button>

          <Button
            component={Link}
            to="/history"
            startIcon={<History />}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Riwayat
          </Button>

          <IconButton
            onClick={handleProfileMenuOpen}
            sx={{
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)'
              }
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'primary.light',
                fontSize: '0.875rem',
                fontWeight: 'bold'
              }}
            >
              {user?.username?.charAt(0).toUpperCase()}
            </Avatar>
            <ExpandMore sx={{ ml: 0.5, fontSize: 16 }} />
          </IconButton>

          <Menu
            anchorEl={profileMenuAnchor}
            open={Boolean(profileMenuAnchor)}
            onClose={handleProfileMenuClose}
            TransitionComponent={Fade}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 200,
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
              }
            }}
          >
            <MenuItem onClick={() => handleNavigation('/profile')}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">
                  Halo, <strong>{user?.username}</strong>
                </Typography>
              </ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToApp fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <>
          <Button
            component={Link}
            to="/packages"
            startIcon={<Visibility />}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Lihat Paket
          </Button>

          <Button
            component={Link}
            to="/login"
            variant="contained"
            startIcon={<AccountCircle />}
            sx={{
              ml: 1,
              borderRadius: 3,
              px: 3,
              background: 'linear-gradient(45deg, #1565c0 30%, #7b1fa2 90%)',
              boxShadow: '0 3px 15px rgba(33, 150, 243, 0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #0d47a1 30%, #6a1b9a 90%)',
                boxShadow: '0 5px 20px rgba(33, 150, 243, 0.4)',
                transform: 'translateY(-1px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Login
          </Button>
        </>
      )}
    </Box>
  );

  // Mobile Navigation Drawer
  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
      PaperProps={{
        sx: {
          width: 280,
          borderRadius: '16px 0 0 16px'
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Menu
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <List>
          {isLoggedIn ? (
            <>
              <ListItem
                button
                onClick={() => handleNavigation('/packages')}
                sx={{ borderRadius: 2, mb: 1 }}
              >
                <ListItemIcon>
                  <ShoppingCart color="primary" />
                </ListItemIcon>
                <ListItemText primary="Beli Paket" />
              </ListItem>

              <ListItem
                button
                onClick={() => handleNavigation('/history')}
                sx={{ borderRadius: 2, mb: 1 }}
              >
                <ListItemIcon>
                  <History color="primary" />
                </ListItemIcon>
                <ListItemText primary="Riwayat" />
              </ListItem>

              <ListItem
                button
                onClick={() => handleNavigation('/profile')}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  backgroundColor: 'primary.light',
                  color: 'white'
                }}
              >
                <ListItemIcon>
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: 'white',
                      color: 'primary.main',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {user?.username?.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ color: 'white' }}>
                      Halo, {user?.username}
                    </Typography>
                  }
                />
              </ListItem>

              <ListItem
                button
                onClick={handleLogout}
                sx={{
                  borderRadius: 2,
                  color: 'error.main',
                  border: '1px solid',
                  borderColor: 'error.light'
                }}
              >
                <ListItemIcon>
                  <ExitToApp color="error" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem
                button
                onClick={() => handleNavigation('/packages')}
                sx={{ borderRadius: 2, mb: 1 }}
              >
                <ListItemIcon>
                  <Visibility color="primary" />
                </ListItemIcon>
                <ListItemText primary="Lihat Paket" />
              </ListItem>

              <ListItem
                button
                onClick={() => handleNavigation('/login')}
                sx={{
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #1565c0 30%, #7b1fa2 90%)',
                  color: 'white',
                  mt: 2
                }}
              >
                <ListItemIcon>
                  <AccountCircle sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '80px !important' }}>
        {/* Logo */}
        <Button
          component={Link}
          to="/"
          sx={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundColor: 'transparent'
            },
            transition: 'transform 0.3s ease'
          }}
        >
          Giga
        </Button>

        {/* Desktop Navigation */}
        {!isMobile && renderDesktopMenu()}

        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            onClick={handleMobileMenuToggle}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Navigation */}
      {renderMobileMenu()}
    </AppBar>
  );
};

export default Header;