import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import Settings from './../Components/Settings.js';
import TableOfContents from '../Components/TableOfContents.js';

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(0.5),
  },
});

function Navigator(props) {
  const { classes, ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          Docs-Browser
        </ListItem>
        <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                Settings
              </ListItemText>
        </ListItem>
        <Settings 
          host = {props.host}
          org = {props.org}
          project = {props.project}
          branch = {props.branch}
          folder = {props.folder}
          file = {props.file}
          handleStateChange = {(field, value) =>
            props.handleStateChange(field, value)
          }
        />
      </List>
      <Divider className={classes.divider} />
      <ListItem className={classes.categoryHeader}>
        <ListItemText
          classes={{
            primary: classes.categoryHeaderPrimary,
          }}
          >
          Table of Contents
        </ListItemText>
      </ListItem>
      <div className={classes.item}>
        <TableOfContents
          host = {props.host}
          org = {props.org}
          project = {props.project}
          branch = {props.branch}
          folder = {props.folder}
          file = {props.file}
          handleStateChange = {(field, value) =>
            props.handleStateChange(field, value)
          }
        />
      </div>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
