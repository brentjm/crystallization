import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '200px',
    justifyContent: 'left',
    padding: '10px',
  },
});


class MainMenu extends Component {

  render() {
    const { classes } = this.props;
    const { isDrawerOpen, handleNavigationMenuClick } = this.props;

    return (
      <Drawer open={isDrawerOpen} onClose={handleNavigationMenuClick}>
        <div
          className={classes.container}
          tabIndex={0}
          role="button"
          onClick={handleNavigationMenuClick}
          onKeyDown={handleNavigationMenuClick}
        >
          <List>
            <ListItem button>
              <ListItemText>
                <p><Link to='/'>Home</Link></p>
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText>
                <p><Link to='/ProcessMap'>ProcessMap</Link></p>
              </ListItemText>
            </ListItem>
          </List>
        </div>
      </Drawer>
    );
  }
}

export default withStyles(styles, {name: 'MainMenu'})(MainMenu);
