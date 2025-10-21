import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  Fade
} from '@mui/material';
import {
  CheckCircle,
  ArrowForward,
  Bolt,
  DataUsage,
  Support
} from '@mui/icons-material';

const PackageCard = ({ packageData, onSelectPackage }) => {
  const { name, provider, price } = packageData;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    { icon: <Bolt />, text: 'Kecepatan tinggi' },
    { icon: <DataUsage />, text: 'Kuota besar' },
    { icon: <Support />, text: 'Dukungan 24/7' }
  ];

  return (
    <Fade in timeout={800}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: '1px solid',
          borderColor: 'grey.100',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 48px rgba(0,0,0,0.15)',
            borderColor: 'primary.light'
          },
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header dengan gradient */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #1976d2 0%, #7b1fa2 100%)',
            color: 'white',
            p: 3,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Efek dekoratif */}
          <Box
            sx={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }}
          />
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 'bold',
              mb: 1,
              position: 'relative',
              zIndex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {name}
          </Typography>
          <Chip
            label={provider}
            size="small"
            sx={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              fontWeight: 'medium',
              fontSize: '0.75rem',
              position: 'relative',
              zIndex: 1
            }}
          />
        </Box>

        {/* Konten utama */}
        <CardContent sx={{ p: 3, flexGrow: 1 }}>
          {/* Harga dengan penekanan visual */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 'medium', mb: 0.5 }}
            >
              Mulai dari
            </Typography>
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontWeight: 'bold',
                color: 'text.primary',
                mb: 0.5
              }}
            >
              Rp {price.toLocaleString('id-ID')}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontStyle: 'italic' }}
            >
              Harga sudah termasuk pajak
            </Typography>
          </Box>

          {/* Fitur unggulan */}
          <List dense sx={{ mb: 2 }}>
            {features.map((feature, index) => (
              <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckCircle
                    sx={{
                      color: 'success.main',
                      fontSize: '1.2rem'
                    }}
                  />
                </ListItemIcon>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  {feature.icon}
                  {feature.text}
                </Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>

        {/* Tombol aksi */}
        <CardActions sx={{ p: 3, pt: 0 }}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={() => onSelectPackage(packageData)}
            sx={{
              py: 1.5,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #1976d2 0%, #7b1fa2 100%)',
              boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)',
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #1565c0 0%, #6a1b9a 100%)',
                boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                transform: 'translateY(-1px)'
              }
            }}
          >
            Beli Sekarang
          </Button>
        </CardActions>
      </Card>
    </Fade>
  );
};

export default PackageCard;