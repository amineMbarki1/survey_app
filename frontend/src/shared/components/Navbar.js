import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Toolbar,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  AppBar,
  Container,
  Typography,
  IconButton,
} from '@mui/material';

import { Logout, Person } from '@mui/icons-material';
import { deepPurple } from '@mui/material/colors';

const Navbar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar>
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            sx={{ flexGrow: 1, color: 'white', textDecoration: 'none' }}
            variant="h6"
            component={Link}
            to="/"
          >
            My Surveys
          </Typography>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ bgcolor: deepPurple[700] }}>{props.user?.name?.[0].toUpperCase()}</Avatar>
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon onClick={props.logout}>
                <Logout />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
