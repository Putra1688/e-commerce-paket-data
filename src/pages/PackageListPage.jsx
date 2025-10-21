import React, { useState } from 'react';
import useApi from '../hooks/useApi';
import PackageCard from '../components/PackageCard';
import TransactionForm from '../components/TransactionForm';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  Paper,
  alpha,
  useTheme
} from '@mui/material';
import {
  AccountBalanceWallet,
  Lock
} from '@mui/icons-material';

const PackageListPage = () => {
  const { isLoggedIn, user } = useAuth();
  const { data: packages, loading, error, refetch } = useApi('dataPackages');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  // Tampilan Loading dan Error
  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="60vh"
      >
        <Box textAlign="center">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Memuat daftar paket...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  const handleSelectPackage = (pkg) => {
    if (!isLoggedIn) {
      alert("Anda harus login untuk melanjutkan pembelian!");
      return;
    }
    setSelectedPackage(pkg);
  };

  return (
    <Box 
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)}, ${alpha(theme.palette.secondary.light, 0.1)})`,
        py: 4,
        px: { xs: 2, sm: 3, lg: 4 }
      }}
    >
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box textAlign="center" mb={6}>
          <Typography 
            variant="h3" 
            fontWeight="bold" 
            color="text.primary" 
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' }
            }}
          >
            Beli Paket Data Internet
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              maxWidth: 600, 
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            Pilih paket internet terbaik sesuai kebutuhan Anda dengan harga terjangkau
          </Typography>
        </Box>

        {/* Balance Info - Only for logged in users */}
        {isLoggedIn && (
          <Box 
            display="flex" 
            justifyContent="center" 
            mb={4}
          >
            <Card 
              sx={{ 
                maxWidth: 400, 
                width: '100%',
                borderRadius: 3,
                boxShadow: 3,
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex" alignItems="center">
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: 'success.light',
                        color: 'success.main',
                        mr: 3
                      }}
                    >
                      <AccountBalanceWallet fontSize="medium" />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Saldo Tersedia
                      </Typography>
                      <Typography variant="h4" fontWeight="bold" color="text.primary">
                        Rp {user?.balance?.toLocaleString('id-ID') || 0}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Transaction Modal */}
        {isLoggedIn && selectedPackage && (
          <TransactionForm
            user={user}
            packageData={selectedPackage}
            onClose={() => setSelectedPackage(null)}
            onSuccess={refetch}
          />
        )}

        {/* Packages Grid */}
        <Grid container spacing={3} justifyContent='center'>
          {packages.map((pkg) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pkg.id}>
              <PackageCard
                packageData={pkg}
                onSelectPackage={handleSelectPackage}
              />
            </Grid>
          ))}
        </Grid>

        {/* Login Prompt for non-logged in users */}
        {!isLoggedIn && (
          <Box textAlign="center" mt={6}>
            <Card 
              sx={{ 
                maxWidth: 400, 
                mx: 'auto',
                borderRadius: 3,
                boxShadow: 3,
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    backgroundColor: 'primary.light',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3
                  }}
                >
                  <Lock sx={{ fontSize: 32, color: 'primary.main' }} />
                </Box>
                <Typography variant="h5" fontWeight="semibold" gutterBottom>
                  Login untuk Membeli
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Login terlebih dahulu untuk melakukan pembelian paket internet
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 'medium',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                    },
                    boxShadow: 3
                  }}
                >
                  Login Sekarang
                </Button>
              </CardContent>
            </Card>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default PackageListPage;