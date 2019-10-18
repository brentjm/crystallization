import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Close } from '@material-ui/icons';
import SvgIcon from '@material-ui/core/SvgIcon';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '500px',
    justifyContent: 'left',
    padding: '10px',
  },
});


class ParameterEditor extends Component {

  render() {
    const { classes } = this.props;
    const { isDrawerOpen, selectedEquipment, handleDrawerExit } = this.props;

    return (
      <Drawer open={isDrawerOpen} onClose={handleDrawerExit} anchor="right">
        <div
          className={classes.container}
          tabIndex={0}
          role="button"
        >
					<div align="right">
						<SvgIcon onClick={handleDrawerExit}>
							<Close/>
						</SvgIcon>
					</div>
					{selectedEquipment}
        </div>
      </Drawer>
    );
  }
}

export default withStyles(styles, {name: 'ParameterEditor'})(ParameterEditor);
