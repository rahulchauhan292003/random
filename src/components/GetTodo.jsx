import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";


const GetTodo = ({todo, setTodo}) => {
  

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/users/read");
      setTodo(response.data);
      console.log(response);
    };
    fetchData();
  }, []);
  return (
    <div>
      {todo.map((todos) => {
        return <div key={todos._id}>
        
       
          <h1>Title:{todos.title}</h1>
          <h3>Description:{todos.description}</h3>
          </div>
})}
      
    </div>
  );
};

export default GetTodo;
