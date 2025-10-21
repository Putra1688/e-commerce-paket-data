import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import useApi from '../hooks/useApi';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Chip,
  Stack,
  Divider,
  InputAdornment,
  useTheme,
  alpha
} from '@mui/material';
import {
  Close,
  AccountBalanceWallet,
  Phone,
  CheckCircle,
  Cancel,
  Warning,
  Payment
} from '@mui/icons-material';

const TransactionForm = ({ user, packageData, onClose }) => {
  const { updateBalance } = useAuth();
  const { baseUrl } = useApi('');
  const [phone, setPhone] = useState(user?.phone || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const theme = useTheme();
  const { id: packageId, name: packageName, price } = packageData;

  const handleTransaction = async () => {
    if (user.balance < price) {
      setMessage('Gagal! Saldo tidak mencukupi.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // 1. Buat Record Transaksi (POST)
      const newTransaction = {
        customerId: user.id,
        packageId: packageId,
        packageName: packageName,
        amount: price,
        phone: phone,
        date: new Date().toISOString(),
        status: 'Completed',
      };
      await axios.post(`${baseUrl}/transactions`, newTransaction);

      // 2. Kurangi Saldo Customer (PATCH/PUT)
      const newBalance = user.balance - price;
      await axios.patch(`${baseUrl}/customers/${user.id}`, {
        balance: newBalance,
      });

      // 3. Update Context
      updateBalance(newBalance);
      setMessage(`Pembelian ${packageName} ke ${phone} berhasil! Saldo baru: Rp ${newBalance.toLocaleString('id-ID')}`);

    } catch (error) {
      console.error("Transaction Error:", error);
      setMessage('Terjadi kesalahan saat memproses transaksi.');
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = message && !message.includes('Gagal') && !message.includes('tidak mencukupi');
  const isError = message && (message.includes('Gagal') || message.includes('tidak mencukupi'));

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden'
        }
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: 'white',
          py: 3
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" fontWeight="bold">
            Konfirmasi Pembelian
          </Typography>
          <IconButton
            onClick={onClose}
            disabled={loading}
            sx={{
              color: 'white',
              '&:hover': { backgroundColor: alpha('#fff', 0.1) },
              '&.Mui-disabled': { opacity: 0.5 }
            }}
          >
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          {/* Package Info */}
          <Card 
            variant="outlined"
            sx={{
              mb: 3,
              borderColor: 'primary.light',
              backgroundColor: alpha(theme.palette.primary.light, 0.05)
            }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="body2" color="primary.main" fontWeight="medium">
                  Paket Dipilih
                </Typography>
                <Chip 
                  label={packageName}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Stack>
              <Typography variant="h4" fontWeight="bold" color="text.primary">
                Rp {price.toLocaleString('id-ID')}
              </Typography>
            </CardContent>
          </Card>

          {/* Balance Info */}
          <Card 
            variant="outlined"
            sx={{ mb: 3 }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      backgroundColor: 'success.light',
                      color: 'success.main'
                    }}
                  >
                    <AccountBalanceWallet />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Saldo Tersedia
                    </Typography>
                    <Typography variant="h6" fontWeight="semibold">
                      Rp {user.balance.toLocaleString('id-ID')}
                    </Typography>
                  </Box>
                </Stack>
                <Box>
                  {user.balance >= price ? (
                    <Stack direction="row" alignItems="center" spacing={0.5} color="success.main">
                      <CheckCircle fontSize="small" />
                      <Typography variant="body2" fontWeight="medium">
                        Cukup
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack direction="row" alignItems="center" spacing={0.5} color="error.main">
                      <Cancel fontSize="small" />
                      <Typography variant="body2" fontWeight="medium">
                        Tidak Cukup
                      </Typography>
                    </Stack>
                  )}
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Divider sx={{ my: 2 }} />

          {/* Phone Input */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" fontWeight="medium" gutterBottom>
              Nomor Telepon Tujuan
            </Typography>
            <TextField
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
              placeholder="Masukkan nomor telepon"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
          </Box>

          {/* Message Alert */}
          {message && (
            <Alert 
              severity={isSuccess ? "success" : "error"}
              sx={{ mb: 3, borderRadius: 2 }}
              icon={isSuccess ? <CheckCircle /> : <Warning />}
            >
              {message}
            </Alert>
          )}

          {/* Actions */}
          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              variant="outlined"
              onClick={onClose}
              disabled={loading}
              startIcon={<Close />}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 'medium'
              }}
            >
              Batal
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={handleTransaction}
              disabled={loading || user.balance < price}
              startIcon={loading ? <CircularProgress size={20} /> : <Payment />}
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
              {loading ? 'Memproses...' : `Bayar Rp ${price.toLocaleString('id-ID')}`}
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionForm;