import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';

import TodoList from '../TodoList';

import { useDispatch, useSelector } from 'react-redux';
import { createTask, getState, showAlert } from './todoSlice';

const TodoForm = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const loader = useSelector(getState);

  const [value, _value] = useState("");

    return (
        <div className={classes.mainInput}>
            <Input
            placeholder=" Add to list.."
            startAdornment={<AddIcon color="secondary" />}
            color="secondary"
            value={value}
            onKeyPress={event => {
                if (event.key === "Enter" && (value.trim().length)) {
                  dispatch(createTask(value));
                  dispatch(showAlert({alert:true, message:"Task Added!"}))
                  _value("")
                }
                else if(event.key === "Enter" && !(value.trim().length)){
                    dispatch(showAlert({alert:true, message:"Invalid Data!"}))
                }
            }}
            onChange={e => {
                _value(e.target.value)
            }}
            />
            <Snackbar
                autoHideDuration={2000}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                open={loader.alert}
                onClose={() => dispatch(showAlert({alert:false, message:""}))
            }
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{loader.message}</span>}
            />
            
            <TodoList  />
        </div>
    )
}

export default TodoForm

const useStyles = makeStyles((theme) => ({
    mainInput: {
      marginTop: 70,
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    [theme.breakpoints.up('md')]:{
        width: '40%'
    },
    [theme.breakpoints.down('sm')]:{
        width: '90%'
    },
    },
}));