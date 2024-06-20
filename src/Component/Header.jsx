import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material';
import { NavLink } from 'react-router-dom';
import logo from '../assets/SprintRunnersTeamLogo.jpg';

// Labels used for NavLink directory
const pages = ['Vendors', 'Customers', 'Products', 'Promotions'];

const LogoIcon = styled('img')({
  width: '50px',
  height: '50px',
  marginRight: '8px'
});

/**
 * ResponsiveAppBar component renders a modal dialog for adding new vendors.
 *
 * @component
 * @returns {JSX.Element} A React component representing a Web Page Header.
 */
export default function ResponsiveAppBar() {
  return (
    <AppBar sx={{ backgroundColor: '#8ca0c7' }} position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <IconButton edge='start' color='inherit' aria-label='logo'>
            <LogoIcon src={logo} alt='Team Logo' />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1, color: 'black' }}>
            Express-O
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              // eslint-disable-next-line object-curly-newline
              <Button
                key={page}
                sx={{
                  my: 2,
                  color: 'black',
                  display: 'block',
                  fontWeight: 'bold'
                }}
                LinkComponent={NavLink}
                to={`/${page.toLowerCase()}`}
                style={({ isActive }) => ({
                  fontWeight: isActive ? 'bold' : 'normal',
                  textDecoration: isActive ? 'underline' : 'none'
                })}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip>
              <IconButton sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
