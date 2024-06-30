import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import {Link} from 'react-router-dom';
import logo from '../ImagesIcon/cansIcon.png';
import menuBarIcon from '../ImagesIcon/menubaricon.png';
import '../Styles/AppBar.css';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, backgroundColor:'#1c1d1def'}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{padding:'30px'}}>
          <ListItemButton style={{justifyContent:'center',margin:'3px'}} className='list-btn'>
            <Link to='/home' className='s-nav-btn'>HOME</Link>
          </ListItemButton>
          <ListItemButton style={{justifyContent:'center',margin:'3px'}} className='list-btn'>
            <Link to='/order' className='s-nav-btn'>ORDER</Link>
          </ListItemButton>
          <ListItemButton style={{justifyContent:'center',margin:'3px'}} className='list-btn'>
            <Link to='/returncan/:id' className='s-nav-btn'>RETURN CAN</Link>
          </ListItemButton>
          <ListItemButton style={{justifyContent:'center',margin:'3px'}} className='list-btn'>
            <Link to='/report/:id' className='s-nav-btn'>REPORT</Link>
          </ListItemButton>
          <ListItemButton style={{justifyContent:'center',margin:'3px 0px'}} className='list-btn'>
            <Link to='/pending' className='s-nav-btn'>PENDING</Link>
          </ListItemButton>
          <ListItemButton style={{justifyContent:'center',margin:'3px 0px'}} className='list-btn'>
            <a href='https://docs.google.com/spreadsheets/d/11RVlATUi8cN8EmpBfqV7VS_S8-ISwjlOaGi4kobuA3k/edit?gid=0#gid=0' target='_blank' className='s-nav-btn'>DEL HISTORY</a>
          </ListItemButton>
      </List>
    </Box>
  );
  const anchor = 'bottom'

  
  return (
    <div>
      
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      
    
    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
      <AppBar style={{backgroundColor:'#053A63'}} position="static">
        <Toolbar style={{display:'flex',justifyContent:'space-between'}}>
          
          
          {/*<Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
            
          </Search>*/}
          
          <IconButton
            style={{width:'100%'}}
            size="medium"
            edge="end"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(anchor, true)}
          >
            <img style={{marginRight:'80%'}} height={40} width={50} src ={logo}/>
            <img height={20} width={20} src={menuBarIcon}/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  );
}
