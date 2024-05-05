import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


const HomePage = () => {
  return (
    <div style={{ flexGrow: 1, height: '100vh', position: 'relative' }}>
      <Grid container spacing={3} style={{ padding: '24px', textAlign: 'center' }}>
        <Grid item xs={12}>
          <Typography variant="h3" style={{ color: 'blue', marginBottom: '16px' }}>
            Welcome to SpaceTune
          </Typography>
        </Grid>
      </Grid>
      
    </div>
  );
};

export default HomePage;
