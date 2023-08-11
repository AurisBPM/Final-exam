import { Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const NoCustomersInfo = () => {
  const navigate = useNavigate();

  return (
    <Stack spacing={2} direction='column' alignItems='center'>
      <Typography variant='h5' sx={{ paddingTop: '2rem', textAlign: 'center' }}>
        No Registered customers
      </Typography>
      <Button
        variant='contained'
        startIcon={<AddIcon />}
        onClick={() => {
          navigate(`/add`);
        }}
      >
        Add first customer
      </Button>
    </Stack>
  );
};

export default NoCustomersInfo;
