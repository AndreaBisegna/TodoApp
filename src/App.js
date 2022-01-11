import React, {useState, useEffect} from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Typography from "@material-ui/core/Typography";
import './App.css';

const LOCAL_STORAGE_KEY = "react-todo-app"


function App() {
  const [todos, setTodos] = useState([]);

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));

  },[todos])

  useEffect(()=>{
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storageTodos){
      setTodos(storageTodos);
    }
  },[]);

  const addTodo = (todo) => {
    setTodos([todo, ...todos]);
  }


  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo => {
        if(todo.id === id){
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      })
    )
  }
  
  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }
  
  
  return (
    <div className="App">
    <Typography style={{padding:16}} variant="h1">
      React Todo App
    </Typography>
      <TodoForm addTodo={addTodo}/>
      <TodoList todos={todos} toggleComplete={toggleComplete} removeTodo={removeTodo}/>
    </div>
  );
}

export default App;
