import React, { useMemo } from 'react';
import useApi from '../hooks/useApi';
import { useAuth } from '../components/AuthContext';
import { Navigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
  Fade,
  Divider,
  Avatar,
  IconButton
} from '@mui/material';
import {
  Receipt,
  CheckCircle,
  Schedule,
  Error,
  FilterList,
  GetApp,
  Add,
  History as HistoryIcon
} from '@mui/icons-material';

const TransactionHistoryPage = () => {
  const { isLoggedIn, user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Ambil transaksi hanya untuk customer yang login
  const endpoint = `transactions?customerId=${user?.id || ''}&_sort=date&_order=desc`;
  const { data: transactions, loading, error } = useApi(endpoint);

  // Proteksi Route
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Calculate stats
  const stats = useMemo(() => {
    if (!transactions) return { total: 0, success: 0, pending: 0 };
    
    return {
      total: transactions.length,
      success: transactions.filter(t => t.status?.toLowerCase() === 'success').length,
      pending: transactions.filter(t => t.status?.toLowerCase() === 'pending').length
    };
  }, [transactions]);

  const getStatusChip = (status) => {
    const statusLower = status?.toLowerCase();
    
    switch (statusLower) {
      case 'success':
        return (
          <Chip
            icon={<CheckCircle />}
            label="Berhasil"
            color="success"
            variant="outlined"
            size="small"
          />
        );
      case 'pending':
        return (
          <Chip
            icon={<Schedule />}
            label="Pending"
            color="warning"
            variant="outlined"
            size="small"
          />
        );
      case 'failed':
        return (
          <Chip
            icon={<Error />}
            label="Gagal"
            color="error"
            variant="outlined"
            size="small"
          />
        );
      default:
        return (
          <Chip
            label="Pending"
            color="default"
            variant="outlined"
            size="small"
          />
        );
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Memuat riwayat transaksi...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        py: 4,
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f5f5 0%, #e3f2fd 50%, #f3e5f5 100%)'
      }}
    >
      <Fade in timeout={800}>
        <Box>
          {/* Header Section */}
          <Box textAlign="center" mb={6}>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom 
              fontWeight="bold"
              color="text.primary"
            >
              Riwayat Transaksi Pembelian
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Lihat semua riwayat pembelian paket internet Anda dalam satu tempat
            </Typography>
          </Box>

          {/* Stats Overview */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} md={4}>
              <Card 
                elevation={2}
                sx={{ 
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                  color: 'white'
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.2)',
                        mr: 3,
                        width: 60,
                        height: 60
                      }}
                    >
                      <Receipt />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Total Transaksi
                      </Typography>
                      <Typography variant="h3" fontWeight="bold">
                        {stats.total}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card 
                elevation={2}
                sx={{ 
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                  color: 'white'
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.2)',
                        mr: 3,
                        width: 60,
                        height: 60
                      }}
                    >
                      <CheckCircle />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Berhasil
                      </Typography>
                      <Typography variant="h3" fontWeight="bold">
                        {stats.success}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card 
                elevation={2}
                sx={{ 
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #ed6c02 0%, #ff9800 100%)',
                  color: 'white'
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.2)',
                        mr: 3,
                        width: 60,
                        height: 60
                      }}
                    >
                      <Schedule />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Pending
                      </Typography>
                      <Typography variant="h3" fontWeight="bold">
                        {stats.pending}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {transactions && transactions.length > 0 ? (
            <Paper
              elevation={3}
              sx={{
                borderRadius: 3,
                overflow: 'hidden'
              }}
            >
              {/* Table Header with Actions */}
              <Box
                sx={{
                  p: 3,
                  borderBottom: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  justifyContent: 'space-between',
                  alignItems: isMobile ? 'stretch' : 'center',
                  gap: 2
                }}
              >
                <Box>
                  <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom={isMobile}>
                    Daftar Transaksi
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {transactions.length} transaksi ditemukan
                  </Typography>
                </Box>
                <Box display="flex" gap={1} flexDirection={isMobile ? 'column' : 'row'}>
                  <Button
                    startIcon={<FilterList />}
                    variant="outlined"
                    size={isMobile ? "large" : "medium"}
                  >
                    Filter
                  </Button>
                  <Button
                    startIcon={<GetApp />}
                    variant="contained"
                    size={isMobile ? "large" : "medium"}
                    sx={{
                      background: 'linear-gradient(135deg, #1976d2 0%, #7b1fa2 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1565c0 0%, #6a1b9a 100%)'
                      }
                    }}
                  >
                    Ekspor
                  </Button>
                </Box>
              </Box>

              {/* Table Container */}
              <TableContainer>
                <Table>
                  <TableHead sx={{ bgcolor: 'grey.50' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                        ID Transaksi
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                        Tanggal
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                        Paket
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                        Nomor Tujuan
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                        Harga
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow
                        key={transaction.id}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'grey.50'
                          },
                          transition: 'background-color 0.2s'
                        }}
                      >
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: 'monospace',
                              color: 'primary.main',
                              fontWeight: 'medium'
                            }}
                          >
                            #{transaction.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {transaction.date ? new Date(transaction.date).toLocaleDateString('id-ID', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            }) : 'N/A'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {transaction.date ? new Date(transaction.date).toLocaleTimeString('id-ID') : ''}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {transaction.packageName || 'Paket Tidak Dikenal'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {transaction.provider || 'Provider tidak diketahui'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{ fontFamily: 'monospace' }}
                          >
                            {transaction.phone || 'N/A'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">
                            Rp {transaction.amount ? transaction.amount.toLocaleString('id-ID') : '0'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {getStatusChip(transaction.status)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Table Footer */}
              <Box
                sx={{
                  p: 2,
                  borderTop: 1,
                  borderColor: 'divider',
                  bgcolor: 'grey.50',
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Menampilkan <Typography component="span" fontWeight="bold">{transactions.length}</Typography> transaksi
                </Typography>
                <Box display="flex" gap={1}>
                  <Button variant="outlined" size="small">
                    Sebelumnya
                  </Button>
                  <Button variant="outlined" size="small">
                    Selanjutnya
                  </Button>
                </Box>
              </Box>
            </Paper>
          ) : (
            /* Empty State */
            <Paper
              elevation={3}
              sx={{
                p: 8,
                textAlign: 'center',
                borderRadius: 3
              }}
            >
              <Box sx={{ maxWidth: 400, mx: 'auto' }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'grey.100',
                    color: 'grey.400',
                    mx: 'auto',
                    mb: 3
                  }}
                >
                  <HistoryIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                  Belum ada riwayat transaksi
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Transaksi pembelian paket internet Anda akan muncul di sini. Mulai beli paket pertama Anda!
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Add />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #1976d2 0%, #7b1fa2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1565c0 0%, #6a1b9a 100%)'
                    }
                  }}
                >
                  Beli Paket Pertama
                </Button>
              </Box>
            </Paper>
          )}
        </Box>
      </Fade>
    </Container>
  );
};

export default TransactionHistoryPage;