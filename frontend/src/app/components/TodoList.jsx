import React from 'react'

const TodoList = ({
  todos,
  againFetchTodos,
  selectedTodo,
  handleselectedTodo
}) => {

  return (
    <div className='w-full sm:w-1/2  px-2 '>
      <div className="flex gap-2 flex-col h-[600px] overflow-y-auto py-2"> {/* Set height and make scrollable */}
        {
          todos.map((todo) => (
            <div key={todo.id}  // Use a unique identifier instead of index
              onClick={() => handleselectedTodo(todo)}
              className={`text-black bg-white p-2 rounded-md ${todo === selectedTodo ? 'border-2 border-black' : ''}`}>
              <h1 className='text-2xl font-semibold mb-1'>{todo.title}</h1>
              <p>{todo.description}</p>
              <div className="flex justify-end">
                <span className='text-gray-400'>{todo.date}</span> {/* Displaying the date */}
              </div>
            </div>
          ))
        }
      </div>
      {/* <button onClick={againFetchTodos} className='bg-blue-100 p-2 rounded-md mt-4'>Load more...</button> Improved button styling */}
    </div>
  )
}

export default TodoList
