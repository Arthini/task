// Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Container } from '@mui/material';

const Header = ({ onOpenCreateTable }) => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Logo
          </Typography>
          <Button color="inherit" onClick={onOpenCreateTable}>
            Create Table
          </Button>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
