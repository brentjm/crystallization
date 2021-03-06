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

  updateSP = (event) => {
    this.setState({
      newSP: event.target.value
    });
  }

  onSubmit = (event, equipment, command) => {
    //console.log(equipment);
    //console.log(this.state["newSP"]);
    this.props.sendWebSocketCommand({
      "equipment": equipment,
      "command": command,
      "value": this.state["newSP"]
    })
  };

  render() {
    const { classes } = this.props;
    const { isDrawerOpen, selectedParameter, handleDrawerExit } = this.props;
    const equipment = selectedParameter[0];
    const command = selectedParameter[1].split(":")[0] + ":SP";

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
              onClick={(event)=>this.onSubmit(event, equipment, command)}
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
