import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router} from 'react-router-dom';
import MainRouter from './router';
import MenuAppBar from './app-bar';
import MainMenu from './menu';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    justifyContent: 'left',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    positon: 'relative',
    height: 'calc(100vh - 64px)',
    width: '100vw',
  }
});


class Main extends Component {

  state = {
    isDrawerOpen: false
  };

  handleNavigationMenuClick = () => {
    this.setState({
      isDrawerOpen: !this.state.isDrawerOpen
    });
  }

  render() {
    const { classes } = this.props;
    const { isDrawerOpen } = this.state;
    return (
      <div className={classes.container}>
        <Router>
          <MenuAppBar 
            handleNavigationMenuClick={this.handleNavigationMenuClick}
          />
          <MainMenu
            isDrawerOpen={isDrawerOpen}
            handleNavigationMenuClick={this.handleNavigationMenuClick}
          />
          <div className="body">
            <MainRouter />
          </div>
        </Router>
      </div>
    );
  }
}

export default withStyles(styles, {name: 'Main'})(Main);
