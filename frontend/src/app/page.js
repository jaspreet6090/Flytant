"use client"
import React,{useState,useEffect} from 'react'
import TodoList from './components/TodoList'
import axios from 'axios'
import TodoDetail from './components/TodoDetail'
import TodoForm from './components/TodoForm'
import { MdCreateNewFolder } from "react-icons/md";

const Home = () => {
  
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState({
    title: '',
    description: ''
  })
  const[selectedTodo, setSelectedTodo] = useState(null);
  const[visible, setVisible] = useState(false);

  const prettifyDate = (timestamp) => {
    const date = new Date(timestamp);
  
    // Options for formatting the date
    const options = {
      weekday: 'long',   // "Tuesday"
      year: 'numeric',   // "2024"
      month: 'long',     // "August"
      day: 'numeric',    // "27"
      hour: '2-digit',   // "09"
      minute: '2-digit', // "51"
      second: '2-digit', // "17"
      hour12: true       // "AM/PM"
    };
  
    // Format the date using Intl.DateTimeFormat
    return date.toLocaleString('en-US', options);
  };

  const fetchTodos = async (page = 1, limit = 10) => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos/', {
        params: { page, limit }
      });
       const prettifiedTodos = response.data.map(todo => ({
      ...todo,
      date: prettifyDate(todo.date)
    }));

    setTodos(prettifiedTodos);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
  
  const againFetchTodos = async () => {
    fetchTodos();
  };

  
  
  const addTodo = async (todo) => {
    try {
      const response = await axios.post('http://localhost:5000/api/todos/', todo);
      setTodos([...todos, response.data]);
      await fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }
  
  const deleteTodo = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
      await fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }
  
  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/todos/${id}`, updatedTodo);
      setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
      await fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }
  
  const handleAddTodo = (e) => {
    e.preventDefault();
    addTodo(todo);
    setTodo({
      title: '',
      description: ''
    });
    setVisible(!visible);
    console.log(todo);
  }
  
  const handleDeleteTodo = (id) => {
    confirm('Are you sure you want to delete this todo?') ;
    deleteTodo(id);
  }
  
  const handleUpdateTodo = (id, updatedTodo) => {
    console.log(updatedTodo , id);
    updateTodo(id, updatedTodo);
    
  }
  
  
  // handle change in form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value
    });
    
  }
  
  const handleClick = () =>{
    setVisible(!visible);
  }
  
  const handleselectedTodo = (todo) =>{
    setSelectedTodo(todo);
  }
  

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className='bg-[#F4F4F4] h-screen px-5 sm:px-10 py-10'>
      <button onClick={handleClick} className='text-white text-xl bg-black p-2 rounded-md flex gap-2 items-center'>
      <MdCreateNewFolder />
      TODO
      </button>
      {
        visible && <div className='w-full z-10 flex justify-center absolute bg-white bg-opacity-40 '>
        <TodoForm
          todo={todo}
          handleChange={handleChange}
          handleAddTodo={handleAddTodo}
          handleClick={handleClick}
        />
      </div>
      }
    

       <div className="w-full flex flex-col sm:flex-row justify-between  gap-6 mt-10">
       <TodoList todos={todos }
        selectedTodo={selectedTodo}
        
        againFetchTodos={againFetchTodos}
        handleselectedTodo={handleselectedTodo}
       />

         <TodoDetail selectedTodo={selectedTodo}
          handleDeleteTodo={handleDeleteTodo}
          handleUpdateTodo={handleUpdateTodo}
          setSelectedTodo={setSelectedTodo}
         />
       </div> 

    </div>

)
}

export default Home
