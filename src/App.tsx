import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
//BLL:
    const [tasks, setTasks] = useState <Array<TaskType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Water', isDone: false}
    ])

    const [filter, setFilter] = useState <FilterValuesType>('all')

    function removeTask(taskID: number) {
       const filteredTasks = tasks.filter(t => t.id !== taskID)
        // console.log(tasks)
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValuesType){
        setFilter(value)
    }

//UI
    const getTasksForTodoList = () => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    };

    return (
        <div className="App">
           <TodoList
               title={'What to learn'}
               tasks={getTasksForTodoList()}
               removeTask={removeTask}
               changeFilter={changeFilter}
           />
        </div>
    );
}

export default App;
