import React, {useState} from 'react';
import {
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SecurityIcon from '@material-ui/icons/Security';
import DialogAccount from './DialogAccount';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '10% 0%',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'column'
  },
  listStyle: {
    width: '100%',
    maxWidth: 360,
    border: '1px solid grey',
    borderRadius: '13%',
    overflow: 'auto',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  },
  title: {
    margin: '1rem'
  }
}));

export default function Settings() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({buttonText: '', title: '', request: ''});

  const handleClose = () => {
    setOpen(false);
    setSelectedIndex(-1);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    let buttonText;
    let title;
    let request;
    if (index === 0 || index === 1) {
      if (index === 0) {
        buttonText = 'Modify';
        title = `${localStorage.getItem('username')} are you sure you want to change your password?`;
        request = 'changePassword';
      } else if (index === 1) {
        buttonText = 'Delete';
        title = `${localStorage.getItem('username')} are you sure you want to delete your account?`
        request = 'deleteAccount';
      }
      setData({buttonText: buttonText, title: title, request: request});
      handleOpen();
    }
  };
  return (<Container className={classes.root}>
    <div className={classes.listStyle}>
      <h2 className={classes.title}>Settings</h2>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
          <ListItemIcon>
            <LockIcon/>
          </ListItemIcon>
          <ListItemText primary="Change my password"/>
        </ListItem>
        <ListItem button selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
          <ListItemIcon>
            <SecurityIcon/>
          </ListItemIcon>
          <ListItemText primary="Delete my account"/>
        </ListItem>
        <ListItem button selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)} component={NavLink} to="/logout" style={{
            color: 'inherit'
          }}>
          <ListItemIcon>
            <ExitToAppIcon/>
          </ListItemIcon>
          <ListItemText primary="Logout"/>
        </ListItem>
      </List>
    </div>
    <DialogAccount request={data.request} buttonText={data.buttonText} title={data.title} handleClose={handleClose} open={open}/>
  </Container>)
}
