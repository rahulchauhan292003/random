import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const [todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get("http://localhost:5001/api/todo/read", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTodo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const todoCreate = async () => {
    if (!newTodo) {
      alert("Todo cannot be empty!");
      return;
    }
    const token = localStorage.getItem("authToken");
    console.log("Tokenn:", token);
    if (!token) {
      console.log("no token found ,Login again");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5001/api/todo/create",
        {
          text: newTodo,
          completed: false,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTodo([...todo, res.data]);
      setNewTodo("");
      return toast.success("Create success !");
    } catch (error) {
      console.log(error);
    }
  };

  const todoStatus = async (id) => {
    const token = localStorage.getItem("authToken");
    const todos = todo.find((to) => to._id === id);
    try {
      const response = await axios.put(
        `http://localhost:5001/api/todo/update/${id}`,
        {
          ...todos,
          completed: !todos.completed,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTodo(todo.map((to) => (to._id === id ? response.data : to)));
      fetch();
      return alert("Todo updated??????!");
    } catch (error) {
      console.log(error);
      alert("Failed to update todo");
    }
  };

  const todoDelete = async (id) => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`http://localhost:5001/api/todo/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodo(todo.filter((to) => to._id !== id));
      return alert("Todo deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.success("Logout successfully");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };
  return (
    <div className="min-h-screen bg-slate-200 flex justify-center items-center ">
      <div className=" w-[380px] min-h-4 font-serif bg-white text-center rounded-lg  mt-14 p-6 mb-6">
        <h1 className="mb-4">Add a new Todo</h1>
        <div className="flex justify-between gap-2">
          <input
            type="text"
            placeholder="enter the text"
            value={newTodo}
            className="w-full outline-none border border-sky-200 ring-1 p-1 rounded-md "
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            className="text-white bg-blue-400 rounded-md p-1 hover:bg-sky-600"
            onClick={todoCreate}
          >
            Add
          </button>
        </div>
        <ul>
          {todo.map((todoItem, index) => (
            <li key={todoItem._id || index}>
              <div className="flex justify-between mt-10 ">
                <input
                  type="checkbox"
                  checked={todoItem.completed}
                  onChange={() => todoStatus(todoItem._id)}
                />
                <p className={`${todoItem.completed ? "line-through" : ""}`}>
                  {todoItem.text}
                </p>
                <button
                  className="text-white bg-red-500 hover:bg-red-600 rounded-md p-1"
                  onClick={() => todoDelete(todoItem._id)}
                >
                  Delete
                </button>
                <button className="text-white bg-red-500 hover:bg-red-600 rounded-md p-1">
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button
          className="text-white bg-red-500 hover:bg-red-600 rounded-md mt-6 p-1"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
