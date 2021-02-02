import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TodoForm from './component/TodoForm';

import './App.css';


function App() {
  const classes = useStyles();

  return (
    <div className={["App", classes.container].join(" ")}>
      <AppBar color="secondary">
        <Toolbar className={classes.header}>
          <Typography variant="h5" className={classes.headerText} >TinyList</Typography>
        </Toolbar>
      </AppBar>
      <TodoForm />
    </div>
  );
}

export default App;

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
    },
  },
  container : {
    width:"100%",
    display:"flex",
    justifyContent:"center"
  },
  headerText: {
    padding: theme.spacing(1),
  }
}));