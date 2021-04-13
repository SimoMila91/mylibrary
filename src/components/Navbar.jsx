import React, {
  useState,
  useContext
} from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Dialog,
  DialogContentText,
  DialogContent,
  Menu,
  MenuItem,
  Link,
  withStyles,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {
  NavLink
} from 'react-router-dom';
import '../App.css';
import logoBook from '../images/logoBook.png';
import Login from './logRegLog/Login';
import SignUp from './logRegLog/SignUp';
import {
  Context
} from '../context/Context';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FaceIcon from '@material-ui/icons/Face';
import SettingsIcon from '@material-ui/icons/Settings';


const font = "'Satisfy', cursive";

const useStyles = makeStyles((theme) => ({
  cont: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontFamily: font,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.down('xs')]: {
      fontSize: 25,
    },
  },
  customizeToolbar: {
    maxHeight: 60,
    minHeight: 46,
  },
  style: {
    background: '#dfe0d7',
    color: '#000',

  },
  logoStyle: {
    maxHeight: 50,
  },
  button: {
    position: 'absolute',
    right: 10,
  },
  notVisible: {
    flexGrow: 1,
  },
  dialogStyle: {
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      padding: '0 4rem',
    },
    maxWidth: 600,
    textAlign: 'center',
  },
  buttonScroll: {
    position: 'fixed',
    bottom: theme.spacing(10),
    right: theme.spacing(2),
  },
  linkStyle: {
    color: '#212529',
    textDecoration: 'none',
  },
  exitButton: {
    padding: 0,
  },
  mAutoPadOne: {
    margin: 'auto',
    padding: 1,
  },
  closeIconStyle: {
    fontSize: '1.8rem',
    color: 'grey',
  },
  scrollColor: {
    backgroundColor: '#64b5f6',
  },
  dialogForm: {
    paddingBottom: 5,
    textAlign: 'center',
  },
  btnForm: {
    textDecoration: 'none',
    color: '#007bff',
  },
  btnPad: {
    [theme.breakpoints.down('xs')]: {
      padding: 4,
    }
  }
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
));

function ScrollTop(props) {
  const {
    children,
    window
  } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 500,
  });

  const handleClickButton = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  return (
    <Zoom in={trigger}>
        <div onClick={handleClickButton} role="presentation" className={classes.buttonScroll}>
          {children}
        </div>
      </Zoom>
  );
}


export default function Navbar(props) {
  const classes = useStyles();

  const {
    loggedIn,
    handleOpenForm,
    open,
    handleCloseForm
  } = useContext(Context);
  const [selectedForm, setForm] = useState('Login');
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const openmenu = Boolean(anchorEl);

  const formChange = (e) => {
    e.preventDefault();
    if (selectedForm === 'Signup')
      setForm('Login');
    else
      setForm('Signup');
  };

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(false);
  };

  const handleClose = () => {
    setAnchorElMenu(false);
  };

  const handleClick = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const renderForm = () => {
    if (selectedForm === 'Signup') {
      return (
        <div>
          <SignUp handleClose={handleCloseForm} className={classes.formStyle} />
          <DialogContent className={classes.dialogForm}>
            <DialogContentText>
              Do you have an account?
              <Link href="#" className={classes.btnForm} onClick={formChange}> Login</Link>
            </DialogContentText>
          </DialogContent>
        </div>
      )
    } else {
      return (
        <div>
          <Login handleClose={handleCloseForm} />
          <DialogContent className={classes.dialogForm}>
            <DialogContentText>
              Don't you have an account?
              <Link href="#" className={classes.btnForm} onClick={formChange}> Signup</Link>
            </DialogContentText>
          </DialogContent>
        </div>
      )
    }
  };

  const menuNavbar = (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorElMenu}
      keepMounted
      open={Boolean(anchorElMenu)}
      onClose={handleClose}
    >
            <MenuItem className={classes.exitButton} onClick={handleClose}>
                <IconButton className={classes.mAutoPadOne}>
                    <ExpandLessIcon />
                </IconButton>
            </MenuItem>
            <MenuItem component={NavLink} to="/" onClick={handleClose}>
                <ListItemIcon>
                    <HomeIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Home" className={classes.linkStyle} />
            </MenuItem>
            <MenuItem  component={NavLink} to="/search" onClick={handleClose}>
                <ListItemIcon>
                    <SearchIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Books" className={classes.linkStyle} />
            </MenuItem>
            <MenuItem component={NavLink} to="/articles" onClick={handleClose}>
                <ListItemIcon>
                    <LocalLibraryIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Articles" className={classes.linkStyle} />
            </MenuItem>
            <MenuItem component={NavLink} to="/faq" onClick={handleClose}>
                <ListItemIcon>
                    <LiveHelpIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Faq" />
            </MenuItem>
        </StyledMenu>
  );

  const accountMenu = (
    <StyledMenu
            id="account-menu"
            anchorEl={anchorEl}
            keepMounted
            open={openmenu}
            onClose={handleMenuClose}
        >
            <MenuItem className={classes.exitButton} onClick={handleMenuClose}>
                <IconButton className={classes.mAutoPadOne}>
                    <ExpandLessIcon />
                </IconButton>
            </MenuItem>
            <MenuItem component={NavLink} to="/profile" onClick={handleMenuClose}>
                <IconButton>
                    <FaceIcon fontSize="small" />
                </IconButton>
                <ListItemText primary="My page" className={classes.linkStyle} />
            </MenuItem>
            <MenuItem component={NavLink} to="/settings" onClick={handleMenuClose}>
                <IconButton>
                    <SettingsIcon fontSize="small" />
                </IconButton>
                <ListItemText primary="Settings" className={classes.linkStyle} />
            </MenuItem>
            <MenuItem component={NavLink} to="/logout" onClick={handleMenuClose}>
                <IconButton>
                    <ExitToAppIcon fontSize="small" />
                </IconButton>
                <ListItemText primary="Logout" className={classes.linkStyle} />
            </MenuItem>
        </StyledMenu>
  );

  return (
    <div className={classes.cont}>
            <AppBar className={classes.style} position="static">
                <Toolbar className={classes.customizeToolbar} id="back-to-top-anchor">
                    <IconButton component={NavLink} to="/" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <img className={classes.logoStyle} src={`${logoBook}`} alt="logo" />
                    </IconButton>
                    <Typography variant="h4" className={classes.title}>
                        My Library
                    </Typography>
                    <Typography className={classes.notVisible}></Typography>
                    { loggedIn ?
                            <>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="account-menu"
                                    onClick={handleMenu}
                                    color="inherit"
                                    disableRipple
                                    className={classes.btnPad}
                                >
                                    <AccountCircle />
                                </IconButton>
                                {accountMenu}
                            </>
                            :
                            <>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="account-menu"
                                    onClick={handleOpenForm}
                                    color="inherit"
                                    disableRipple
                                    className={classes.btnPad}
                                >
                                    <AccountCircleOutlinedIcon />
                                </IconButton>
                                <Dialog
                                    justify="center"
                                    maxWidth="xl"
                                    open={open}
                                    onClose={handleCloseForm}
                                    aria-labelledby="form-dialog-title"
                                >
                                    <IconButton
                                        color="inherit"
                                        onClick={handleCloseForm}
                                        justify="flex-end"
                                        className={classes.button}
                                    >
                                        <CloseIcon className={classes.closeIconStyle} />
                                    </IconButton>
                                    {renderForm()}
                                </Dialog>
                            </>
                    }
                     <IconButton
                        aria-label="menu-mobile"
                        aria-controls="customized-menu"
                        onClick={handleClick}
                        color="inherit"
                        className={classes.btnPad}
                    >
                        <MenuIcon />
                    </IconButton>
                    {menuNavbar}
                </Toolbar>
            </AppBar>
            <ScrollTop {...props}>
                <Fab className={classes.scrollColor} size="small" aria-label="scroll back to top">
                <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </div>
  );
};