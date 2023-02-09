import React, { useState, useEffect } from "react";
import Tasks from "./Tasks";
import Alert from "./Alert";

function getLocalStorage() {
  let list = localStorage.getItem('list');

  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  }
  else {
    return [];
  }
}
function App() {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [editing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: '', msg: '' });
  const [showModal, setShowModal] = useState(false);
  let date = new Date();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      setAlert(true, 'danger', 'Please enter a task')
    }
    else if (title && editing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: title, date: time || date.toLocaleString() };
          }
          return item;
        })
      );
      setTitle("");
      setTime('');
      setEditID(null);
      setIsEditing(false);
      setShowModal(false)
      showAlert(true, "emerald-500", "value changed");
    }
    else {
      const newList = { id: date.getTime(), title: title, date: time || date.toLocaleString() };
      setList([...list, newList])
      setShowModal(false)
      setTitle('');
      setTime('');
      showAlert(true, "emerald-500", "Task added");

    }
  }

  const clearTasks = () => {
    showAlert(true, "red-500", "empty list");
    setList([]);
  }

  const removeTasks = (id) => {
    showAlert(true, 'red-500', 'item removed');
    setList(list.filter(list => list.id !== id))
  }

  const editTasks = (id) => {
    const specificItem = list.find(item => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setTitle(specificItem.title);
    setShowModal(true)
  }

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list])
  return (
    <>
      <div className="p-8 flex items-center justify-center text-center">
        <button
          className=" bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => {
            setShowModal(true)
          }}
        >
          Add Tasks
        </button>
      </div>

      {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

      {list.length > 0 && <Tasks list={list} removeTasks={removeTasks} editTasks={editTasks} />}

      <div
        className="text-red-500 text-xl text-center cursor-pointer my-6"
        onClick={clearTasks}
      >Clear Tasks</div>


      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-6"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Tasks Manager
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form onSubmit={handleSubmit} className="m-2 p-2">
                  <label htmlFor="tasks" className="block px-2 mt-8 text-center font-3xl font-extrabold ">Add Task</label>
                  <input onChange={(e) => setTitle(e.target.value)} value={title}
                    type="text"
                    name="task"
                    id="tasks"
                    placeholder="Add Task"
                    required
                    className="m-6 px-4 py-2 outline-2 border-3 border-slate-900 bg-slate-200 rounded-sm" />

                  <input onChange={(e) => setTime(e.target.value)} value={time}
                    type="text"
                    placeholder="date"
                    className="m-6 px-4 py-2 outline-2 border-3 border-slate-900 bg-slate-200 rounded-sm" />

                  <button type="submit"
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mx-6 md:mx-1"
                  // onClick={() => setShowModal(false)}
                  >
                    {editing ? 'Edit' : 'Add Task'}
                  </button>
                </form>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>

                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );

}

export default App;