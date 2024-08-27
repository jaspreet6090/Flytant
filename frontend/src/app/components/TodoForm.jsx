import React from 'react'

const TodoForm = ({handleClick,
  handleAddTodo,
  todo,
  handleChange
}) => {
  return (
    <form onSubmit={handleAddTodo} className='w-full mx-10 sm:w-1/2  bg-white border border-black rounded-md h-1/2  p-6  relative mt-10   '>
      <button onClick={handleClick} className='bg-red-500 text-white p-2 rounded-md absolute top-0 right-0'>Close</button>
      <div className='flex flex-col gap-4 mt-10'>
        <label htmlFor="title">Title</label>
        <input 
        onChange={handleChange}
        type='text' name='title' placeholder='Title' value={todo.title} className='border border-gray-400 p-2 rounded-md' />
        <label htmlFor="description">Description</label>
        <textarea onChange={handleChange} name='description' value={todo.description} placeholder='Description' className='border border-gray-400 p-2 rounded-md'></textarea>
        <button type='submit' className='bg-blue-500 text-white p-2 rounded-md'>Add</button>
      </div>

    </form>
  )
}

export default TodoForm
