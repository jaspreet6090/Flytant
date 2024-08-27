'use client'

import React, { useState, useEffect } from 'react';

const TodoDetail = ({
  selectedTodo,
  handleDeleteTodo,
  handleUpdateTodo,
  setSelectedTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableTodo, setEditableTodo] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (selectedTodo) {
      setEditableTodo({
        title: selectedTodo.title,
        description: selectedTodo.description,
      });
    }
  }, [selectedTodo]);

  const handleEditChange = (e) => {
    setEditableTodo({
      ...editableTodo,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateClick = () => {
    handleUpdateTodo(selectedTodo._id, editableTodo);
    handleClick();
    setIsEditing(false);
  };

  const handleDiscardClick = () => {
    setEditableTodo({
      title: selectedTodo.title,
      description: selectedTodo.description,
    });
    setIsEditing(false);
  };

  const handleClick = () => {
    setSelectedTodo(null);
  }

  return (
    
      selectedTodo && (
        <div className='w-full absolute sm:relative sm:w-1/2 bg-white p-9 h-1/2  '>
     {
      selectedTodo && <div className="flex justify-end">
     <button onClick={handleClick} className='bg-red-500 text-white p-2 rounded-md mb-1'>Close</button>
     </div>
     }
      {selectedTodo ? (
        isEditing ? (
          <>
            <input
              type="text"
              name="title"
              value={editableTodo.title}
              onChange={handleEditChange}
              className='w-full p-2 mb-2 text-black border border-gray-400 rounded-md'
            />
            <textarea
              name="description"
              value={editableTodo.description}
              onChange={handleEditChange}
              className='w-full p-2 text-black border border-gray-400 rounded-md'
            />
            <div className='flex justify-end gap-2 mt-4'>
              <button onClick={handleUpdateClick} className='bg-green-500 px-4 py-2 rounded-md text-white'>
                Save
              </button>
              <button onClick={handleDiscardClick} className='bg-red-500 px-4 py-2 rounded-md text-white'>
                Discard
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className='text-2xl font-semibold'>{selectedTodo.title}</h1>
            <p>{selectedTodo.description}</p>
            <div className='flex justify-end'>
              <span className='text-gray-400'>
                {selectedTodo.date}
              </span>
            </div>
            <div className='flex justify-end gap-2 mt-4'>
              <button onClick={() => setIsEditing(true)} className='bg-blue-500 px-4 py-2 rounded-md text-white'>
                Update
              </button>
              <button onClick={() => {handleDeleteTodo(selectedTodo._id);
                handleClick();
              }} className='bg-red-500 px-4 py-2 rounded-md text-white'>
                Delete
              </button>
            </div>
          </>
        )
      ) : (
        <div className='hidden sm:block'></div>
      )}
    </div>
      )
    
  );
};

export default TodoDetail;
