import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    position: 'relative'
  },
});


class Home extends Component {

  render() {

    const { classes } = this.props;
    return (
      <div className={classes.container}>
        Home
      </div>
    );
  }
}

export default withStyles(styles, {name: 'Home'})(Home);
