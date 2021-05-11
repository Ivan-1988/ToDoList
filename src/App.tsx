import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
//BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>( [
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1] : [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todoListID_2] : [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Meat', isDone: true},
            {id: v1(), title: 'Bread', isDone: false}
        ]

    })

    function removeTask(taskID: string, TodoListID: string) {
        tasks[TodoListID] = tasks[TodoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    function addTask(title: string, TodoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [TodoListID]: [newTask, ...tasks[TodoListID]]})
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, TodoListID: string) {
        tasks[TodoListID] = tasks[TodoListID].map(t => (t.id === taskID ? {...t, isDone: newIsDoneValue} : t))
        setTasks({...tasks})
    }

    function changeTaskTitle(taskID: string, newTitle: string, TodoListID: string) {
        tasks[TodoListID] = tasks[TodoListID].map(t => (t.id === taskID ? {...t, title: newTitle} : t))
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValuesType, TodoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === TodoListID ? {...tl, filter: value} : tl))
    }

    function removeTodoList(todoListID: string){
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    function addTodoList (title: string){
        const newTodoListID = v1()
        const newTodoList: TodoListType = {id: newTodoListID, title, filter: 'all'}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }

    function changeTodoListTitile(title: string, TodoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === TodoListID ? {...tl, title: title} : tl))
    }

//UI
    const getTasksForTodoList = (todoList: TodoListType) => {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    };

    const todoListsComponents = todoLists.map(tl => {
        return(
            <TodoList
                key={tl.id}
                todoListID = {tl.id}
                title={tl.title}
                tasks={getTasksForTodoList(tl)}
                filter={tl.filter}
                addTask={addTask}
                removeTask={removeTask}
                removeTodoList={removeTodoList}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitile}
            />
        )
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todoListsComponents}
        </div>
    );
}

export default App;
