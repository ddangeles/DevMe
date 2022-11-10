// from material ui
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';


import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// import ProfileList from '../components/ProfileList';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import DataObjectIcon from '@mui/icons-material/DataObject';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import Collabs from '../Collabs';
import Dashboard from '../Dashboard';
import Profile from '../Profile';
import Inbox from '../Inbox';
import FindStudent from '../FindStudent';
import MyDevelopers from '../MyDevelopers';


import './style.css'

import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      main: "#052541",
    },
    secondary: {
      main: "#e6e9ec",
    },
    background: {
      default: '#052541',
      paper: '#052541',
    },
    text: {
      primary: '#e6e9ec',
    }
  },
});



const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [sections] = useState([
    { name: "Dashboard", icon: <DashboardIcon /> },
    { name: "Profile", icon: <AccountCircleIcon /> },
    { name: "Collabs", icon: <Diversity3Icon /> },
    { name: "Inbox", icon: <InboxIcon /> },
    { name: "My Developers", icon: <DataObjectIcon /> },
    { name: "Find Developers", icon: <PersonSearchIcon /> }
  ])



  const [currentSection, setCurrentSection] = useState(sections[0])

  const renderPage = () => {
    if (currentSection.name === "Dashboard") {
      return <Dashboard />
    } else if (currentSection.name === "Profile") {
      return <Profile />
    } else if (currentSection.name === "Collabs") {
      return <Collabs />
    } else if (currentSection.name === "Inbox") {
      return <Inbox />
    } else if (currentSection.name === "My Developers") {
      return <MyDevelopers />
    } else if (currentSection.name === "Find Developers") {
      return <FindStudent />
    } else {
      return <Dashboard />
    }
  }



  useEffect(() => {
    document.title = currentSection.name
  }, [currentSection])

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List >

        {sections.map((section) => (
          <ListItem key={section} disablePadding>
            <ListItemButton>
              <ListItemIcon style={{ color: '#e6e9ec' }}>
                {section.icon}
              </ListItemIcon>
              <span onClick={() => setCurrentSection(section)}> {section.name}
                <ListItemText className={currentSection.name === section.name && "active"} key={section.name}>
                </ListItemText>
              </span>
            </ListItemButton>
          </ListItem>

        )
        )}

      </List>
      <Divider />
      <div>
          {Auth.loggedIn() ? (
            <>
            <ListItemButton>
              <ListItemIcon style={{ color: '#e6e9ec' }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText onClick={logout}>
                Logout
              </ListItemText>
              </ListItemButton>
            </>
          ) : (
            <>
            </>
          )}
        </div>

      {/* <Divider />
      <List>
      {sections2.map((section) =>  (
          <ListItem key={section} disablePadding>
            <ListItemButton>
              <ListItemIcon style={{ color: '#e6e9ec'}}>
              {section.icon}
              </ListItemIcon>
              <ListItemText className={currentSection.name === section.name && "active"} key={section.name}><span onClick={() => setCurrentSection(section) }> {section.name} </span>
              </ListItemText>
            </ListItemButton>
          </ListItem>
                    
                )
                )} */}
      {/* </List> */}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          {/* <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
        </Toolbar> */}
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            className='drawerBackground'
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            className='drawerBackground'
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          {renderPage()}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
