import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import {
  Box,
  Card,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Container,
  Alert,
  CircularProgress,
  Link,
  Paper,
  Fade,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  Login,
  Security
} from '@mui/icons-material';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const API_BASE_URL = 'https://my-json-server.typicode.com/Putra1688/e-commerce-paket-data';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Cek User dari db.json
      const response = await axios.get(`${API_BASE_URL}/customers?username=${username}`);
      
      if (response.data.length === 1) {
        // User ditemukan. Login sukses
        const user = response.data[0];
        login(user);
        navigate('/packages');
      } else {
        // User tidak ditemukan
        setError('Username tidak ditemukan.');
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container 
      component="main" 
      maxWidth="sm" 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 50%, #e8f5e8 100%)'
      }}
    >
      <Fade in timeout={800}>
        <Box sx={{ width: '100%' }}>
          {/* Header Card */}
          <Card
            sx={{
              background: 'linear-gradient(135deg, #1976d2 0%, #7b1fa2 100%)',
              color: 'white',
              textAlign: 'center',
              p: 4,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                backgroundColor: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            >
              <Login sx={{ fontSize: 40, color: 'primary.main' }} />
            </Box>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              Selamat Datang
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Masuk ke akun Anda
            </Typography>
          </Card>

          {/* Form Card */}
          <Paper
            sx={{
              p: 4,
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              borderTop: 'none'
            }}
          >
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              {/* Error Alert */}
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    animation: 'pulse 0.5s ease-in-out',
                    '@keyframes pulse': {
                      '0%': { transform: 'scale(1)' },
                      '50%': { transform: 'scale(1.02)' },
                      '100%': { transform: 'scale(1)' }
                    }
                  }}
                >
                  {error}
                </Alert>
              )}

              {/* Username Field */}
              <TextField
                fullWidth
                id="username"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                margin="normal"
                variant="outlined"
                placeholder="Masukkan username (coba: budi)"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    transition: 'all 0.2s',
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      }
                    }
                  }
                }}
              />

              {/* Password Field */}
              <TextField
                fullWidth
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                margin="normal"
                variant="outlined"
                placeholder="Masukkan password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        disabled={loading}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    transition: 'all 0.2s',
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      }
                    }
                  }
                }}
              />
              
              <Typography 
                variant="caption" 
                color="text.secondary" 
                sx={{ display: 'block', mb: 3 }}
              >
                * Mode simulasi - password tidak divalidasi
              </Typography>

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading || !username || !password}
                size="large"
                startIcon={loading ? <CircularProgress size={20} /> : <Login />}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #1976d2 0%, #7b1fa2 100%)',
                  boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                    background: 'linear-gradient(135deg, #1565c0 0%, #6a1b9a 100%)',
                  },
                  '&:disabled': {
                    transform: 'none',
                    boxShadow: 'none'
                  }
                }}
              >
                {loading ? 'Memproses...' : 'Masuk'}
              </Button>

              {/* Footer Links */}
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Belum punya akun?{' '}
                  <Link 
                    component="button" 
                    type="button" 
                    variant="body2"
                    sx={{ fontWeight: 'bold' }}
                  >
                    Daftar sekarang
                  </Link>
                </Typography>
                
                <Link 
                  component="button" 
                  type="button" 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Lupa password?
                </Link>
              </Box>
            </Box>
          </Paper>

          {/* Bottom Text */}
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center" 
            sx={{ mt: 3, px: 2 }}
          >
            Dengan masuk, Anda menyetujui{' '}
            <Link component="button" type="button" variant="body2">
              Syarat & Ketentuan
            </Link>
            {' '}dan{' '}
            <Link component="button" type="button" variant="body2">
              Kebijakan Privasi
            </Link>
          </Typography>

          {/* Security Badge */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Security sx={{ fontSize: 16, color: 'success.main', mr: 1 }} />
            <Typography variant="caption" color="text.secondary">
              Sistem terjamin dan aman
            </Typography>
          </Box>
        </Box>
      </Fade>
    </Container>
  );
};

export default LoginForm;