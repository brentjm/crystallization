import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import { Close } from '@material-ui/icons';
import SvgIcon from '@material-ui/core/SvgIcon';
//import Stir from './stir';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '500px',
    justifyContent: 'left',
    padding: '10px',
  },
  cancelButton: {
    margin: theme.spacing(1),
    width: "50px"
  },
  okButton: {
    margin: theme.spacing(1),
    width: "50px"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  }
});


class ParameterEditor extends Component {

  state = {
    newSP: null,
  };

  updateSP = (e) => {
    console.log(e);
  }

  onSubmit = () => {
    console.log("submit");
    //{sendWebSocketCommand({
    //           "equipment": equipment,
    //           "command": command
    //         })}}
  };

  render() {
    const { classes } = this.props;
    const { isDrawerOpen, selectedParameter, handleDrawerExit, sendWebSocketCommand } = this.props;
    const equipment = Object.keys(selectedParameter)[0].split(":").slice(0, 2).join(":");
    const command = Object.keys(selectedParameter)[0].split(":").slice(2, -1).join(":") + ":SP";

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
          <h2>{equipment}</h2>
          <TextField
            id="new set point"
            label="new set point"
            className={classes.textField}
            margin="normal"
            onChange={this.updateSP}
          />
          <div>
            <Button variant="contained" color="secondary" className={classes.cancelButton} 
              aria-label="cancel" 
              onClick={handleDrawerExit}
            >
              cancel
            </Button>
            <Button variant="contained" color="primary" className={classes.okButton} 
              aria-label="set new SP" 
              onClick={this.onSubmit}
            >
              OK
            </Button>
          </div>
        </div>
      </Drawer>
    );
  }
}

export default withStyles(styles, {name: 'ParameterEditor'})(ParameterEditor);
