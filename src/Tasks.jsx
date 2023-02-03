import React from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'

const Tasks = ({ list, removeTasks, editTasks }) => {
  // console.log(editTasks);

  return <div className='mx-4 md:mx-6 p-8 my-4 border-3 border-black'>
    <article className='p-4 m-2 flex flex-col items-center justify-center gap-4'>
      {list.map((item) => {
        const { id, title, date } = item;

        return <div className='flex p-6 m-2 gap-2 flex-col items-center justify-center rounded-lg shadow-lg shadow-slate-300 md:p-16' key={id}>
          <div className='text-lg normal-case text-center'>
            <h2>{title}</h2>
          </div>
          <div className='flex p-2 items-center justify-center font-mono text-center'>
            <small>{date}</small>
          </div>
          <div className='flex gap-4 p-4 items-center justify-center'>

            <button
              type='button'
              className='text-yellow-500'
              onClick={() => editTasks(id)}
            >
              <FaEdit />
            </button>

            <button
              type='button'
              className='text-red-500'
              onClick={() => removeTasks(id)}
            >
              <FaTrash />
            </button>

          </div>
        </div>
      })}
    </article>
  </div>
}

export default Tasks
