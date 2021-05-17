import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {IconButton, Button, Checkbox} from "@material-ui/core";
import {Check, Delete} from "@material-ui/icons";

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, TodoListID: string) => void
    removeTask: (taskID: string, TodoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeFilter: (value: FilterValuesType, TodoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, TodoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, TodoListID: string) => void
    changeTodoListTitle: (title: string, TodoListID: string) => void
}

function TodoList(props: TodoListPropsType) {
    const {filter} = props

    const tasksJSXElements = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        const changeTaskTitle = (title: string) =>
            props.changeTaskTitle(t.id, title, props.todoListID)
        const taskClasses : string = t.isDone ? 'is-done' : ''
        return (
            <li key={t.id}>
                <span className={taskClasses}>
                    <Checkbox
                        color={'primary'}
                        checked={t.isDone}
                        onChange={changeTaskStatus}
                    />
                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                </span>

                <IconButton
                    onClick={removeTask}
                    color={'secondary'}
                >
                    <Delete/>
                </IconButton>
            </li>
        )
    })


    const onClickAllFilter = () => props.changeFilter('all', props.todoListID)
    const onClickActiveFilter = () => props.changeFilter('active', props.todoListID)
    const onClickCompletedFilter = () => props.changeFilter('completed', props.todoListID)
    const onClickremoveTodoList = () => props.removeTodoList(props.todoListID)
    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                {/*<button onClick={onClickremoveTodoList}>X</button>*/}
                <IconButton onClick={onClickremoveTodoList} color={'secondary'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <ul style={{listStyle: 'none', paddingLeft: '0px'}}>
                {tasksJSXElements}
            </ul>
            <div>
                <Button
                    style={{marginLeft: '3px'}}
                    size={'small'}
                    variant={filter === 'all' ? 'contained' : 'outlined'}
                    color={'primary'}

                    onClick={onClickAllFilter}>
                    All</Button>
                <Button
                    style={{marginLeft: '3px'}}
                    size={'small'}
                    variant={filter === 'active' ? 'contained' : 'outlined'}
                    color={'primary'}
                    onClick={onClickActiveFilter}>
                    Active</Button>
                <Button
                    style={{marginLeft: '3px'}}
                    size={'small'}
                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                    color={'primary'}
                    onClick={onClickCompletedFilter}>
                    Completed</Button>
            </div>
        </div>
    )
}

export default TodoList;