import React, {useEffect} from 'react'
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, Tooltip, Checkbox, CircularProgress, InputAdornment, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import clsx from "clsx";

import { selectTodo, selectLoader, deleteTask, fetchTasks, completeTask, unCompleteTask, editTask , editTaskPost, showAlert } from '../TodoForm/todoSlice';

const TodoList = (props) => {

    const classes = useStyles();
    const todos = useSelector(selectTodo);
    const loader = useSelector(selectLoader);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasks())
    }, [dispatch]);

    return (
        loader ? 
            <CircularProgress color="secondary" className={classes.loader} />
        :
        todos.map((task,index) => (
            <div className={classes.element} key={index}>
                    <Input
                        key={index}
                        id="input-with-icon-adornment"
                        className={task.completed_at != null ? classes.description : ""}
                        value={task.description}
                        disableUnderline={true}
                        onChange={e => {
                            const newTodos = [...todos];
                            newTodos[index] = {...newTodos[index], description: e.target.value};
                            dispatch( editTask(newTodos) )
                        }}
                        onKeyPress={event => {
                            if (event.key === "Enter" && (event.target.value.trim().length)) {
                              dispatch(editTaskPost(task.id, event.target.value))
                            }
                            else if(event.key === "Enter" && !(event.target.value.trim().length)){
                              dispatch(showAlert({alert:true, message:"Invalid Data!"}))
                            }
                        }}
                        startAdornment={
                            <InputAdornment position="start">
                                <Checkbox
                                    color="secondary"
                                    checked={task.completed_at != null}
                                    onChange={() => {
                                        task.completed_at == null ?
                                        dispatch(completeTask(task.id))
                                        :
                                        dispatch(unCompleteTask(task.id))
                                    }}
                                />
                            </InputAdornment>
                        }
                    />

                    <Tooltip title="Delete task" placement="top">
                        <IconButton
                            aria-label="delete"
                            onClick={() => dispatch(deleteTask(task.id))}
                            className={clsx(classes.clearIndicator, {
                                [classes.unclearIndicator]: task.description.length > 0
                            })}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
            </div>
        )) 
    )
}

export default TodoList

const useStyles = makeStyles((theme) => ({
    loader: {
        alignSelf: 'center',
        marginTop: '20px'
    },
    element: {
    [theme.breakpoints.up('sm')]:{
        width: '100%'
    },
    [theme.breakpoints.down('xs')]:{
        width: '100%'
    },
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      "&:hover $unclearIndicator, & .Mui-focused $unclearIndicator": {
        visibility: "visible"
      }
    },
    description: {
        textDecoration: 'line-through', 
        color: 'grey',
    },
    unclearIndicator: {},
    clearIndicator: {
        [theme.breakpoints.up('sm')]: {
            visibility: "hidden"
        }
    }
}));