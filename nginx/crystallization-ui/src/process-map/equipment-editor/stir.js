import React, { Component } from "react";

class StirEditor extends Component {

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
          <h2>{selectedEquipment}</h2>
        </div>
      </Drawer>
    );
  }
}

export default withStyles(styles, {name: 'ParameterEditor'})(ParameterEditor);
