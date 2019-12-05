import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '500px',
    justifyContent: 'left',
    padding: '10px',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  }
}));

const onValueSubmit = () => {
  console.log("test");
}

export default function Stir(props) {
  const classes = useStyles();
  const { selectedParameter } = props;
  return (
    <div>
        <TextField
          id="new set point"
          label="new set point"
          className={classes.textField}
          margin="normal"
        />
    </div>
  );
}


